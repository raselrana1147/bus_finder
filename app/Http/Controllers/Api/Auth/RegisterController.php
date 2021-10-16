<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;


class RegisterController extends Controller
{
    public function register(Request $request)
    {

          $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'phone' => 'required|unique:users',
            'password' => 'required',
        ]);

              

        if ($request->isMethod('post'))
        {
            DB::beginTransaction();

            try{

                $otp=rand(99999,10000);
         
                $username="artificialsoft";
                $password="artisoft@bd#321";
                $sender="8809612440560";
                $message="please OTP".$otp;
                $code="88";
                $api="http://api.icombd.com/api/v2/sendsms/plaintext";

                $curl = curl_init();

                 $credential =[
                     "username"=>$username,
                     "password"=>$password,
                     "sender"=>$sender,
                     "message"=>$message,
                     "to"=>$code.$request->phone
                 ];

                 curl_setopt_array($curl, array(
                 CURLOPT_URL =>$api,
                 CURLOPT_RETURNTRANSFER => true,
                 CURLOPT_ENCODING =>"",
                 CURLOPT_MAXREDIRS => 10,
                 CURLOPT_TIMEOUT => 30,
                 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                 CURLOPT_CUSTOMREQUEST => "POST",
                 CURLOPT_POSTFIELDS => json_encode($credential),
                 CURLOPT_HTTPHEADER => array(
                 "Content-Type: application/json",
                 ),
                 ));

                   Session::forget("phone_otp");
                   Session::forget("user_info");
                

                   Session::put("phone_otp", $otp);
                  
                   $info=array(
                               'name'=>$request->name,
                               'email'=>$request->email,
                               'phone'=>$request->phone,
                               'user_role_id'=>$request->user_role_id,
                               'password'=>$request->password
                           );

                   Session::put("user_info", $info);

                   curl_exec($curl);
                 
               
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
        ]);


          $get_opt= Session::get("phone_otp");

         if (Session::has("phone_otp")) {
             $get_opt= Session::get("phone_otp");
             if ($get_opt !="") {

                 if ($get_opt==$request->otp) {
                     $info=Session::get('user_info');
                     $user=new User();
                     $user->name=$info['name'];
                     $user->email=$info['email'];
                     $user->password=bcrypt($info['password']);
                     $user->phone=$info['phone'];
                     $user->user_role_id=$info['user_role_id'];
                     $user->save();

                     Session::forget("phone_otp");
                     Session::forget("user_info");

                     return \response()->json([
                     'message' => "Successfully registered",
                     'status_code' => 200
                    ],Response::HTTP_OK);

                 }else{
                     return \response()->json([
                     'message' => "Your Provided OTP not match",
                     'status_code' => 500
                    ],Response::HTTP_INTERNAL_SERVER_ERROR);
                }
             }
             
         }else{
           
             return \response()->json([
                    'message' => "You did not send any OTP",
                    'status_code' => 400
                 ]);
        }
    }

    public function exist_phone(Request $request){
        $request->validate([
            'phone_number' => 'required',
        ]);

        $data=User::where('phone',$request->phone_number)->first();

        if (!is_null($data)) {
             return response()->json([
                    'message' => 1,
                    'status_code' => 200
                ],Response::HTTP_OK);
        }else{
                return response()->json([
                    'message' => 0,
                    'status_code' => 200
                ],Response::HTTP_OK);   
        }
    }
}
