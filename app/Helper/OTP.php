<?php
namespace App\Helper;

class OTP
{
	
	public static function send_otp($message,$to){
		 $username="artificialsoft";
                $password="artisoft@bd#321";
                $sender="8809612440560";
                $message=$message;
                $code="88";
                $api="http://api.icombd.com/api/v2/sendsms/plaintext";

                $curl = curl_init();

                 $credential =[
                     "username"=>$username,
                     "password"=>$password,
                     "sender"=>$sender,
                     "message"=>$message,
                     "to"=>$code.$to
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

                  $response = curl_exec($curl);
                 return $response;
	}
}