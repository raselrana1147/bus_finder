<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login()
    {

        $loginField = request()->input('email');

        $credentials = null;

        if ($loginField !== null) {

            $loginType = filter_var($loginField, FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
           
            // my code
           //  $field = filter_var($request->input('username'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

            request()->merge([$loginType => $loginField]);

            $user = User::where('email', $loginField)->orwhere('phone', $loginField)->first();

            if (!is_null($user)) {
                 if ($user->user_role_id == 1 || $user->user_role_id == 2 || $user->user_role_id == 3 || $user->user_role_id == 4){
                     $credentials = request([$loginType, 'password']);

                if (! $token = auth()->attempt($credentials)) {
                    return response()->json(['result' => 'Unauthorized'], 401);
                }

            }else{
                return response()->json([
                    'message' => 'Invalid email and password'
                ]);
             }
            }else{
                return response()->json([
                    'message' => 'Invalid credentials',
                    'status_code'=>500
                ],Response::HTTP_INTERNAL_SERVER_ERROR);
            }

           

        }else {
            return response()->json([
                'message' => 'Input field can not empty'
            ]);
        }

        return $this->respondWithToken($token);

    }

    public function refresh()
    {
        return $this->respondWithToken(\auth()->refresh());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json([
            'message' => 'Logout successful',
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function me()
    {
        $user = \auth()->user();

        return \response()->json([
            'user' => $user,
            'status_code' => 200
        ],Response::HTTP_OK);
    }

    public function respondWithToken($token)
    {
        return response()->json([
            'user' => auth()->user(),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }
}
