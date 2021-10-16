<?php

namespace App\Http\Controllers\Api;

use App\BusRoot;
use App\Http\Controllers\Controller;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class BusRootController extends Controller
{
    public function index(Request $request)
    {
        $columns = ['id','bus_group_name','root_point_name','longitude','latitude'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = DB::table('bus_roots')
            ->select(
                'bus_roots.id as id',
                'bus_roots.root_point_name as root_point_name',
                'bus_roots.longitude as longitude',
                'bus_roots.latitude as latitude',
                'bus_groups.bus_group_name as bus_group_name'

            )
            ->join('bus_groups','bus_roots.bus_group_id','=','bus_groups.id')
            ->orderBy($columns[$column], $dir);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                $query->where('bus_group_name', 'like', '%' . $searchValue . '%');
            });
        }

        $projects = $query->paginate($length);


        return response()->json([
            'data' => $projects,
            'draw' => $request->input('draw'),
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function getBusRoot()
    {
        $bus_root =  DB::table('bus_roots')
                        ->select(
                            'bus_roots.id as id',
                            'bus_roots.root_point_name as root_point_name',
                            'bus_roots.longitude as longitude',
                            'bus_roots.latitude as latitude',
                            'bus_groups.bus_group_name as bus_group_name',
                            'bus_groups.id as bus_group_id'

                        )
                        ->join('bus_groups','bus_roots.bus_group_id','=','bus_groups.id')
                        ->orderBy('bus_roots.id','desc')
                        ->get();

        $new_bus_root = [];

        foreach ($bus_root as $key => $br){
            $new_bus_root[$br->bus_group_id][] = $br;
        }

        if (!is_null($new_bus_root)) {
            return \response()->json([
                'bus_root' => $new_bus_root,
                'status_code'=>200
            ],Response::HTTP_OK);
        }else{
            return \response()->json([
                'message' =>'No data found',
                'status_code'=>500
            ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }

       
    }

    public function store(Request $request)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'root_point_name' => 'required',
            'longitude' => 'required',
            'latitude' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create bus root
                $bus_root = new BusRoot();

                $bus_root->bus_group_id = $request->bus_group_id;
                $bus_root->root_point_name = $request->root_point_name;
                $bus_root->longitude = $request->longitude;
                $bus_root->latitude = $request->latitude;

                $bus_root->save();

                DB::commit();

                return \response()->json([
                    'bus_root' => $bus_root,
                    'message' => 'Bus root added successful',
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
        $bus_root = BusRoot::findOrFail($id);

        return \response()->json([
            'bus_root' => $bus_root,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function update(Request $request,$id)
    {
        $request->validate([
            'bus_group_id' => 'required',
            'root_point_name' => 'required',
            'longitude' => 'required',
            'latitude' => 'required'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create bus root
                $bus_root = BusRoot::findOrFail($id);

                $bus_root->bus_group_id = $request->bus_group_id;
                $bus_root->root_point_name = $request->root_point_name;
                $bus_root->longitude = $request->longitude;
                $bus_root->latitude = $request->latitude;

                $bus_root->save();

                DB::commit();

                return \response()->json([
                    'bus_root' => $bus_root,
                    'message' => 'Bus root updated successful',
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
        $bus_root = BusRoot::findOrFail($id);
        $bus_root->delete();

        return \response()->json([
            'message' => 'Bus root destroy successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }
}
