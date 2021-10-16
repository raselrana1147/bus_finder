<?php

namespace App\Http\Controllers\Api;

use App\BusAssign;
use App\BusOwner;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class BusAssignController extends Controller
{
    public function index(Request $request)
    {
        $columns = ['id', 'bus_group_name','owner_name','bus_number','assign_date'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = DB::table('bus_assigns')
            ->select(
                'bus_assigns.id as id',
                'bus_assigns.assign_date as assign_date',
                'bus_assigns.bus_number as bus_number',
                'bus_groups.bus_group_name as bus_group_name',
                'users.name as owner_name'

            )
            ->join('bus_groups','bus_assigns.bus_group_id','=','bus_groups.id')
            ->join('users','bus_assigns.owner_id','=','users.id')
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

    public function getBusData()
    {
        $bus_assign =  DB::table('bus_assigns')
                        ->select(
                            'bus_assigns.id as id',
                            'bus_assigns.assign_date as assign_date',
                            'bus_assigns.bus_number as bus_number',
                            'bus_groups.bus_group_name as bus_group_name',
                            'u1.name as owner_name',
                            'u1.id as owner_id',
                            'bus_drivers.bus_assign_id as bus_assign_id',
                            'u2.name as driver_name',
                            'u2.id as driver_id'

                        )
                        ->leftJoin('bus_groups','bus_assigns.bus_group_id','=','bus_groups.id')
                        ->leftJoin('users as u1','bus_assigns.owner_id','=','u1.id')
                        ->leftJoin('bus_drivers','bus_assigns.id','=','bus_drivers.bus_assign_id')
                        ->leftJoin('users as u2','bus_drivers.bus_driver_id','=','u2.id')
                        ->orderBy('bus_assigns.id','desc')
                        ->get();

        $new_bus_assign = [];

        foreach ($bus_assign as $key => $ba){
            $new_bus_assign[$ba->owner_id][] =  $ba;
        }

        if (!is_null($new_bus_assign)) {
            return \response()->json([
                'bus_assign' => $new_bus_assign,
                'status_code'=>200
            ],Response::HTTP_OK);
        }else{
            return \response()->json([
                'message' => 'No data found',
                'status_code'=>500
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        
    }

    public function getOwnerData($id)
    {
        $owner = DB::table('bus_owners')
                    ->select(
                        'bus_owners.id as id',
                        'bus_owners.bus_group_id as bus_group_id',
                        'bus_owners.owner_id as owners_id',
                        'users.name as owner_name'
                    )
                    ->join('users','bus_owners.owner_id','=','users.id')
                    ->where('bus_owners.bus_group_id',$id)
                    ->first();

        return response()->json([
            'owner' => $owner,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'bus_number' => 'required',
            'assign_date' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create bus list

                $bus_list = new BusAssign();

                $bus_list->bus_group_id = $request->bus_group_id;
                $bus_list->owner_id = $request->owner_id;
                $bus_list->bus_number = $request->bus_number;
                $bus_list->assign_date = $request->assign_date;

                $bus_list->save();

                DB::commit();

                return \response()->json([
                    'bus_list' => $bus_list,
                    'message' => 'Bus Assign successful',
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
        $bus_list = DB::table('bus_assigns')
                        ->select(
                            'bus_assigns.id as id',
                            'bus_assigns.bus_group_id as bus_group_id',
                            'bus_assigns.owner_id as owner_id',
                            'bus_assigns.bus_number as bus_number',
                            'bus_assigns.assign_date as assign_date',
                            'users.name as owner_name'
                        )
                        ->join('users','bus_assigns.owner_id','=','users.id')
                        ->where('bus_assigns.id',$id)
                        ->first();

        return \response()->json([
            'bus_list' => $bus_list,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function update(Request $request,$id)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'bus_number' => 'required',
            'assign_date' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create bus list

                $bus_list = BusAssign::findOrFail($id);

                $bus_list->bus_group_id = $request->bus_group_id;
                $bus_list->owner_id = $request->owner_id;
                $bus_list->bus_number = $request->bus_number;
                $bus_list->assign_date = $request->assign_date;

                $bus_list->save();

                DB::commit();

                return \response()->json([
                    'bus_list' => $bus_list,
                    'message' => 'Bus Assign Updated Successful',
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
        $bus_list = BusAssign::findOrFail($id);
        $bus_list->delete();

        return \response()->json([
            'message' => 'Bus assign deleted successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }
}
