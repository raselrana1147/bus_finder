<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $columns = ['id', 'name','email','phone','role_name','is_active'];

        $length = $request->input('length');
        $column = $request->input('column');
        $dir = $request->input('dir');
        $searchValue = $request->input('search');

        $query = DB::table('users')
                                ->select(
                                    'users.id as id',
                                    'users.name as name',
                                    'users.email as email',
                                    'users.phone as phone',
                                    'user_role.role_name as role_name',
                                    'users.is_active as is_active'
                                )
                                ->join('user_role','users.user_role_id','=','user_role.id')
                                ->where('users.user_role_id', 2)
                                ->orWhere('users.user_role_id', 3)
                                ->orWhere('users.user_role_id', 4)
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

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required|unique:users',
            'password' => 'required|confirmed'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create user

                $user = new User();

                $user->name = $request->name;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->user_role_id = $request->user_role_id;
                $user->password = bcrypt($request->password);

                $user->save();

                $last_id = DB::getPdo()->lastInsertId();

                if($request->hasFile('image')){
                    if ($request->file('image')->isValid()) {
                        $image_name = date('mdYHis') . uniqid() . $request->file('image')->getClientOriginalName();
                        $path = public_path().'/assets/admin/uploads/user_image/';
                        $request->file('image')->move($path,$image_name);
                    }
                }

                DB::table('user_info')->insert([
                    'user_id' => $last_id,
                    'image' => $image_name,
                    'nid' => $request->nid,
                    'address' => $request->address,
                    'city' => $request->city,
                    'state' => $request->state,
                    'post_code' => $request->post_code,
                    'zone' => $request->zone,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);

                DB::commit();

                return \response()->json([
                    'user' => $user,
                    'message' => 'User created successful',
                    'status_code' => 200
                ],Response::HTTP_OK);


            }catch (QueryException $e){
                DB::rollBack();

                $error = $e->getMessage();

                return response()->json([
                    'error' => $error,
                    'status_code' => 500
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function edit($id)
    {
        $user = DB::table('users')
                    ->select(
                        'users.id as id',
                        'users.name as name',
                        'users.email as email',
                        'users.phone as phone',
                        'users.user_role_id as user_role_id',
                        'user_info.image as image',
                        'user_info.nid as nid',
                        'user_info.address as address',
                        'user_info.city as city',
                        'user_info.state as state',
                        'user_info.post_code as post_code',
                        'user_info.zone as zone'
                    )
                    ->leftJoin('user_info','users.id','=','user_info.user_id')
                    ->where('users.id', $id)
                    ->first();

        return \response()->json([
            'user' => $user,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'password' => 'required|confirmed'
        ]);

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                //create user

                $user = User::findOrFail($id);

                $user->name = $request->name;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->user_role_id = $request->user_role_id;
                $user->password = bcrypt($request->password);

                $user->save();

                //$last_id = DB::getPdo()->lastInsertId();

                if($request->hasFile('image')){
                    if ($request->file('image')->isValid()) {
                        $image_name = date('mdYHis') . uniqid() . $request->file('image')->getClientOriginalName();
                        $path = public_path().'/assets/admin/uploads/user_image/';
                        $request->file('image')->move($path,$image_name);
                    }
                }else{
                    $image_name  = $request->current_image;
                }

                DB::table('user_info')->where('user_info.user_id',$id)->update([
                    'user_id' => $user->id,
                    'image' => $image_name,
                    'nid' => $request->nid,
                    'address' => $request->address,
                    'city' => $request->city,
                    'state' => $request->state,
                    'post_code' => $request->post_code,
                    'zone' => $request->zone,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);

                DB::commit();

                return \response()->json([
                    'user' => $user,
                    'message' => 'User Updated successful',
                    'status_code' => 200
                ],Response::HTTP_OK);


            }catch (QueryException $e){
                DB::rollBack();

                $error = $e->getMessage();

                return response()->json([
                    'error' => $error,
                    'status_code' => 500
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);


        $user_info =  DB::table('user_info')->where('user_info.user_id', $user->id)->first();

        if ($user_info->id){
            $path = public_path().'/assets/admin/uploads/user_image/'.$user_info->image;
            unlink($path);
        }

        $user_info->delete();


        $user->delete();

        return \response()->json([
            'message' => 'User deleted successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function statusChange($id)
    {
        $user = User::findOrFail($id);


        if ($user->is_active == 0)
        {
            DB::table('users')->where('users.id',$id)->update(['is_active' => 1]);

            return \response()->json([
                'user' => $user,
                'message' => 'User is active',
                'status_code' => 200
            ],Response::HTTP_OK);
        }else{
            DB::table('users')->where('users.id',$id)->update(['is_active' => 0]);

            return \response()->json([
                'message' => 'User is inactive',
                'status_code' => 200
            ],Response::HTTP_OK);
        }
    }
}
