<?php

namespace App\Http\Controllers\Api;

use App\BusGroup;
use App\BusOwner;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class BusOwnerController extends Controller
{
    public function index(Request $request)
    {
        $columns = ['id', 'bus_group_name','owner_name','assign_date'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = DB::table('bus_owners')
                        ->select(
                            'bus_owners.id as id',
                            'bus_owners.assign_date as assign_date',
                            'bus_groups.bus_group_name as bus_group_name',
                            'users.name as owner_name'

                        )
                        ->join('bus_groups','bus_owners.bus_group_id','=','bus_groups.id')
                        ->join('users','bus_owners.owner_id','=','users.id')
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

    public function getBusOwnerData()
    {
        $bus_owners = DB::table('bus_owners')
                        ->select(
                            'bus_owners.id as id',
                            'bus_owners.assign_date as assign_date',
                            'bus_groups.bus_group_name as bus_group_name',
                            'users.name as owner_name'

                        )
                        ->join('bus_groups','bus_owners.bus_group_id','=','bus_groups.id')
                        ->join('users','bus_owners.owner_id','=','users.id')
                        ->orderBy('bus_owners.id','desc')
                        ->get();
        if (!is_null($bus_owners)) {
            return \response()->json([
            'bus_owners' => $bus_owners,
            'status_code' => 200
          ],Response::HTTP_OK);
        }else{
              return \response()->json([
              'message' => "No data found",
              'status_code' => 500
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        
    }

    public function getBusGroup()
    {
        $bus_group = BusGroup::latest()->get();

        return response()->json([
            'bus_groups' => $bus_group,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function getBusOwner()
    {
        $owners = User::where('user_role_id','=',3)->latest()->get();

        return response()->json([
            'owners' => $owners,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'owner_id' => 'required',
            'assign_date' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create owner

                $bus_onwer = new BusOwner();

                $bus_onwer->bus_group_id = $request->bus_group_id;
                $bus_onwer->owner_id = $request->owner_id;
                $bus_onwer->assign_date = $request->assign_date;

                $bus_onwer->save();

                DB::commit();

                return \response()->json([
                    'bus_owner' => $bus_onwer,
                    'message' => 'Bus Owner Added Successful',
                    'status_code' => 200
                ],Response::HTTP_OK);
            }catch (QueryException $e){
                DB::rollBack();

                $error = $e->getMessage();

                return \response()->json([
                    'error' => $error,
                    'status_code' => 200
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function edit($id)
    {
        $bus_owner = BusOwner::findOrFail($id);

        return \response()->json([
            'bus_owner' => $bus_owner,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'owner_id' => 'required',
            'assign_date' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create owner

                $bus_onwer = BusOwner::findOrFail($id);

                $bus_onwer->bus_group_id = $request->bus_group_id;
                $bus_onwer->owner_id = $request->owner_id;
                $bus_onwer->assign_date = $request->assign_date;

                $bus_onwer->save();

                DB::commit();

                return \response()->json([
                    'bus_owner' => $bus_onwer,
                    'message' => 'Bus Owner Updated Successful',
                    'status_code' => 200
                ],Response::HTTP_OK);
            }catch (QueryException $e){
                DB::rollBack();

                $error = $e->getMessage();

                return \response()->json([
                    'error' => $error,
                    'status_code' => 200
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function destroy($id)
    {
        $bus_owner = BusOwner::findOrFail($id);
        $bus_owner->delete();

        return \response()->json([
            'message' => 'Bus Owner deleted successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }
}
