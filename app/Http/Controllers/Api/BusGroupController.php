<?php

namespace App\Http\Controllers\Api;

use App\BusGroup;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class BusGroupController extends Controller
{
    public function index(Request $request)
    {
        $columns = ['id', 'bus_group_name'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = BusGroup::select('id', 'bus_group_name')->orderBy($columns[$column], $dir);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                $query->where('bus_group_name', 'like', '%' . $searchValue . '%');
            });
        }

        $projects = $query->paginate($length);

        //dd($projects);

        return response()->json([
            'data' => $projects,
            'draw' => $request->input('draw'),
            'status_code' => 200
        ],Response::HTTP_OK);

    }

    public function getBusGroupData()
    {
        $bus_group = BusGroup::latest()->get();

        if (!is_null($bus_group)) {
           return \response()->json([
               'bus_groups' => $bus_group,
               'status_code' => 200
           ],Response::HTTP_OK);
        }else{
          return \response()->json([
              'messsage' => "No data found",
              'status_code' => 500
          ],Response::HTTP_INTERNAL_SERVER_ERROR);

        }

    }

    public function store(Request $request)
    {
        $request->validate([
            'bus_group_name' => 'required|unique:bus_groups'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                $bus_group = new BusGroup();

                $bus_group->bus_group_name = $request->bus_group_name;

                $bus_group->save();

                DB::commit();

                return response()->json([
                    'bus_group' => $bus_group,
                    'message' => 'Bus Group added successful',
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
        $bus_group = BusGroup::findOrFail($id);

        return \response()->json([
            'bus_group' => $bus_group,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function update(Request $request,$id)
    {
        $request->validate([
            'bus_group_name' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //update group

                $bus_group = BusGroup::findOrFail($id);

                $bus_group->bus_group_name = $request->bus_group_name;

                $bus_group->save();

                DB::commit();

                return \response()->json([
                    'bus_group' => $bus_group,
                    'message' => 'Bus group update successful',
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
        $bus_group = BusGroup::findOrFail($id);
        $bus_group->delete();

        return \response()->json([
            'message' => 'Bus group destroy successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }
}
