<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Draft;
use App\Helper\OTP;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

          $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'email' => 'required|unique:users',
            'phone' => 'required|unique:users',
            'password' => 'required',
        ]);

              

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                    $otp=rand(99999,10000);

                    $info_phone=Draft::where('phone',$request->phone)->first();
                    $info_email=Draft::where('email',$request->email)->first();

                    if (!is_null($info_phone)) {

                        $info_phone->name        =$request->name;
                        $info_phone->email       =$request->email;
                        $info_phone->phone       =$request->phone;
                        $info_phone->user_role_id=$request->user_role_id;
                        $info_phone->password    =$request->password;
                        $info_phone->otp         =$otp;
                        $info_phone->save();

                         $message="Please use this ".$otp." OTP to continue your registration process";
                         $to=$request->phone;

                         OTP::send_otp($message,$to);

                    }elseif(!is_null($info_email)){

                        $info_email->name        =$request->name;
                        $info_email->email       =$request->email;
                        $info_email->phone       =$request->phone;
                        $info_email->user_role_id=$request->user_role_id;
                        $info_email->password    =$request->password;
                        $info_email->otp         =$otp;
                        $info_phone->save();

                         $message="Please use this ".$otp." OTP to continue your registration process";
                         $to=$request->phone;
                         OTP::send_otp($message,$to);
                         
                    }else{

                        $draft              =new Draft();
                        $draft->name        =$request->name;
                        $draft->email       =$request->email;
                        $draft->phone       =$request->phone;
                        $draft->user_role_id=$request->user_role_id;
                        $draft->password    =$request->password;
                        $draft->otp         =$otp;
                        $draft->save();

                         $message="Please use this ".$otp." OTP to continue your registration process";
                         $to=$request->phone;

                         OTP::send_otp($message,$to);
                }

                DB::commit();
                return \response()->json([
                    'message' => 'You have benn sent an OTP',
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

    public function confirm_registration(Request $request){

         $request->validate([
            'otp' => 'required',
            'phone'=>'required'
        ]);

         $draft=Draft::where('phone',$request->phone)
         ->where('otp',$request->otp)
         ->orderBy('id','DESC')->first();

         if (!is_null($draft)) {

             $user=new User();
             $user->name=$draft->name;
             $user->email=$draft->email;
             $user->phone=$draft->phone;
             $user->password=bcrypt($draft->password);
             $user->user_role_id=$draft->user_role_id;
             $user->save();
             $draft->delete();

             return \response()->json([
                'message' => "Your registration completed successfully",
                'status_code' => 200
             ],Response::HTTP_OK);

         }else{
            return \response()->json([
                'message' => "Credentials did not match",
                'status_code' => 500
             ],Response::HTTP_INTERNAL_SERVER_ERROR);
        }
         
        
    }

    public function exist_phone(Request $request){
        $request->validate([
            'phone_number' => 'required',
        ]);

        $data=User::where('phone',$request->phone_number)->first();

        if (!is_null($data)) {
             return response()->json([
                    'message' => "this user already taken",
                    'code'=>1,
                    'status_code' => 200
                ],Response::HTTP_OK);
        }else{
                return response()->json([
                    'message' => "This is available for registration",
                    'code'=>0,
                    'status_code' => 200
                ],Response::HTTP_OK);   
        }
    }
}
