<?php

namespace App\Http\Controllers\Api;

use App\BusAssign;
use App\BusDriver;
use App\BusGroup;
use App\BusRoot;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Firestore;
use Google\Cloud\Firestore\FirestoreClient;

class BusDriverController extends Controller
{
    public function index(Request $request)
    {
        $columns = ['id','image', 'name','email','phone','role_name'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = DB::table('users')
            ->select(
                'users.id as id',
                'users.user_role_id as user_role_id',
                'users.name as name',
                'users.email as email',
                'users.phone as phone',
                'user_role.role_name as role_name',
                'user_info.image as image'

            )
            ->join('user_role','users.user_role_id','=','user_role.id')
            ->leftJoin('user_info','users.id','=','user_info.user_id')
            ->where('users.user_role_id','=',2)
            ->orderBy($columns[$column], $dir);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                $query->where('name', 'like', '%' . $searchValue . '%');
            });
        }

        $projects = $query->paginate($length);


        return response()->json([
            'data' => $projects,
            'draw' => $request->input('draw'),
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function getAssignData(Request $request, $id)
    {
        $columns = ['id','bus_group_name', 'bus_number','driver_name','assign_date'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = DB::table('bus_drivers')
            ->select(
                'bus_drivers.id as id',
                'bus_groups.bus_group_name as bus_group_name',
                'bus_assigns.bus_number as bus_number',
                'users.name as driver_name',
                'users.id as driver_id',
                'bus_drivers.assign_date as assign_date'

            )
            ->leftJoin('bus_groups','bus_drivers.bus_group_id','=','bus_groups.id')
            ->leftJoin('bus_assigns','bus_drivers.bus_assign_id','=','bus_assigns.id')
            ->leftJoin('users','bus_drivers.bus_driver_id','=','users.id')
            ->where('bus_drivers.bus_driver_id','=',$id)
            ->orderBy($columns[$column], $dir);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                $query->where('name', 'like', '%' . $searchValue . '%');
            });
        }

        $projects = $query->paginate($length);


        return response()->json([
            'data' => $projects,
            'draw' => $request->input('draw'),
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function getBusNumber($id)
    {
        $bus_number = BusAssign::select('id','bus_number','bus_group_id')->where('bus_group_id',$id)->get();

        return \response()->json([
            'bus_number' => $bus_number,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function getAllBusNumber(Request $request)
    {
        $bus_group_id = $request->input('bus_group_id');

        $bus_driver = BusDriver::where('id',$bus_group_id)->first();

        $bus_number = BusAssign::select('id','bus_number','bus_group_id')->get();

        return \response()->json([
            'bus_number' => $bus_number,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function getCurrentDriver($id)
    {
        $driver = User::findOrFail($id);

        return \response()->json([
            'driver' => $driver,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'bus_assign_id' => 'required',
            'assign_date' => 'required'
        ]);

        if ($request->isMethod('post'))
        {

            DB::beginTransaction();


            $bus_assigns = BusDriver::where('bus_assign_id', $request->bus_assign_id)->first();

            if ($bus_assigns){
                return \response()->json([
                    'error' => 'This bus assign already another driver',
                    'status_code' => 500
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            try{
                //create assign driver

                $bus_driver = new BusDriver();

                $bus_driver->bus_group_id = $request->bus_group_id;

                $bus_driver->bus_assign_id = $request->bus_assign_id;
                $bus_driver->bus_driver_id = $request->bus_driver_id;
                $bus_driver->assign_date = $request->assign_date;

                $bus_driver->save();

                $id = DB::getPdo()->lastInsertId();

                $driver_name = User::where('id',$request->bus_driver_id)->first();

                $bus_group = BusGroup::where('id',$request->bus_group_id)->first();

                $bus_assign = BusAssign::where('id', $request->bus_assign_id)->first();

                $bus_root = BusRoot::where('bus_group_id', $request->bus_group_id)->first();


                $data = array(
                    'id' => $id,
                    'driver_id' => $request->bus_driver_id,
                    'driver_name' => $driver_name->name,
                    'driver_phone_number' => $driver_name->phone,
                    'bus_company_name' => $bus_group->bus_group_name,
                    'bus_number' => $bus_assign->bus_number,
                    'root_point' => $bus_root->root_point_name,
                    'longitude' => $bus_root->longitude,
                    'latitude' => $bus_root->latitude
                );

                $firestore = (new Factory)
                    ->withServiceAccount(__DIR__.'/FirebaseKey.json')
                    ->createFirestore();
                    $database = $firestore->database();

                    $collection = $database->collection('driver');
                    $user = $collection->document($id);

                    // Save a document
                    $user->set($data);

                DB::commit();


                return \response()->json([
                    'bus_driver' => $bus_driver,
                    'message' => 'Bus Driver added successful',
                    'status_code' => 200
                ],Response::HTTP_OK);

            }catch (QueryException $e){
                DB::rollBack();

                $error = $e->getMessage();

                return \response()->json([
                    'error' => $error,
                    'status_code' => 500
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function edit($id)
    {
        $bus_drive = BusDriver::findOrFail($id);

        return \response()->json([
            'bus_drive' => $bus_drive,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'bus_assign_id' => 'required',
            'assign_date' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{
                //create assign driver

                $bus_driver = BusDriver::findOrFail($id);

                $bus_driver->bus_group_id = $request->bus_group_id;
                $bus_driver->bus_assign_id = $request->bus_assign_id;
                $bus_driver->bus_driver_id = $request->bus_driver_id;
                $bus_driver->assign_date = $request->assign_date;

                $bus_driver->save();

                $driver_name = User::where('id',$request->bus_driver_id)->first();

                $bus_group = BusGroup::where('id',$request->bus_group_id)->first();

                $bus_assign = BusAssign::where('id', $request->bus_assign_id)->first();

                $bus_root = BusRoot::where('bus_group_id', $request->bus_group_id)->first();

                $update_data = array(
                    'driver_id' => $request->bus_driver_id,
                    'driver_name' => $driver_name->name,
                    'driver_phone_number' => $driver_name->phone,
                    'bus_company_name' => $bus_group->bus_group_name,
                    'bus_number' => $bus_assign->bus_number,
                    'root_point' => $bus_root->root_point_name,
                    'longitude' => $bus_root->longitude,
                    'latitude' => $bus_root->latitude
                );

               

                $firestore = (new Factory)
                ->withServiceAccount(__DIR__.'/FirebaseKey.json')
                ->createFirestore();

                $database = $firestore->database();

                $collection = $database->collection('driver');
              
                $documents = $collection->documents();

                $token = [];

                foreach ($documents as $key => $document){
                    if ($document->exists()) {
                        if ($document['driver_id'] == $request->bus_driver_id){
                            $token[] = $key;
                        }
                    } else {
                        printf('Document %s does not exist!' . PHP_EOL, $snapshot->id());
                    }
                }

               
                 $string = implode('|',$token);

                $update_collection = $database->collection('driver')->document($string);

                $update_collection->set([
                    'driver_id' => $request->bus_driver_id,
                    'driver_name' => $driver_name->name,
                    'driver_phone_number' => $driver_name->phone,
                    'bus_company_name' => $bus_group->bus_group_name,
                    'bus_number' => $bus_assign->bus_number,
                    'root_point' => $bus_root->root_point_name,
                    'longitude' => $bus_root->longitude,
                    'latitude' => $bus_root->latitude
                ]);

                DB::commit();

                return \response()->json([
                    'fetchData' => $documents,
                    'bus_driver' => $bus_driver,
                    'message' => 'Bus Driver updated successful',
                    'status_code' => 200
                ],Response::HTTP_OK);
            }catch (QueryException $e){
                DB::rollBack();

                $error = $e->getMessage();

                return \response()->json([
                    'error' => $error,
                    'status_code' => 500
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function destroy($id)
    {
        $bus_driver = BusDriver::findOrFail($id);
        $bus_driver->delete();

        $token = [];

        $factory = (new Factory)
            ->withServiceAccount(__DIR__.'/FirebaseKey.json')
            ->withDatabaseUri('https://bus-finder-57486-default-rtdb.firebaseio.com');

        $database = $factory->createDatabase();

        $ref = 'driver/';

        $fetchData = $database->getReference($ref)->getValue();

        foreach ($fetchData as $key => $data){
            if ($data['driver_id'] == $bus_driver->bus_driver_id){
                $token[] = $key;
            }
        }

        $string = implode('|',$token);

        $ref = "driver/".$string;
        $deleteData = $database->getReference($ref)->remove();

        return \response()->json([
            'message' => 'Bus Driver Destroy Successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }
}
