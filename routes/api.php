<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth', 'namespace' => 'Api\Auth'], function (){

    Route::post('login', 'LoginController@login');

    Route::post('register', 'RegisterController@register');
    Route::post('confirm_register', 'RegisterController@confirm_registration');
    Route::post('exist_phone', 'RegisterController@exist_phone');

    Route::group(['middleware' => 'auth:api'], function (){

        Route::post('logout', 'LoginController@logout');

        Route::get('me', 'LoginController@me');

    });

    //Route::post('forgetPassword', 'ForgetPasswordController@forgetPassword');

    //Route::post('changePassword', 'ChangePasswordController@saveResetPassword');

});

Route::group(['middleware' => 'auth:api', 'namespace' => 'Api'], function (){

    /*bus group route start*/
   Route::get('bus_group','BusGroupController@getBusGroupData');
   Route::get('bus_group/getData','BusGroupController@index');
   Route::post('bus_group/store', 'BusGroupController@store');
   Route::get('bus_group/edit/{id}', 'BusGroupController@edit');
   Route::post('bus_group/update/{id}', 'BusGroupController@update');
   Route::delete('bus_group/destroy/{id}', 'BusGroupController@destroy');
   /*bus group route end*/

   /*bus owner assign route start*/
   Route::get('bus_owner','BusOwnerController@index');

   Route::get('bus_owner/get_bus_owner','BusOwnerController@getBusOwnerData');
   Route::get('bus_owner/get_bus_group','BusOwnerController@getBusGroup');
   Route::get('bus_owner/get_owner','BusOwnerController@getBusOwner');
   Route::post('bus_owner/store','BusOwnerController@store');
   Route::get('bus_owner/edit/{id}','BusOwnerController@edit');
   Route::post('bus_owner/update/{id}','BusOwnerController@update');
   Route::delete('bus_owner/destroy/{id}','BusOwnerController@destroy');
   /*bus owner assign route end*/

   /*bus assign start*/
    Route::get('bus_list','BusAssignController@index');
    Route::get('bus_list/get_bus_data','BusAssignController@getBusData');
    Route::get('bus_list/get_bus_list','BusAssignController@getBusList');
    Route::get('bus_list/get_owner_data/{bus_group_id}','BusAssignController@getOwnerData');
    Route::post('bus_list/store','BusAssignController@store');
    Route::get('bus_list/edit/{id}','BusAssignController@edit');
    Route::post('bus_list/update/{id}','BusAssignController@update');
    Route::delete('bus_list/destroy/{id}','BusAssignController@destroy');
   /*bus assign end*/

   /*bus root assign routes start*/
   Route::get('bus_root','BusRootController@index');
   Route::get('bus_root/get_bus_root','BusRootController@getBusRoot');
   Route::post('bus_root/store','BusRootController@store');
   Route::get('bus_root/edit/{id}','BusRootController@edit');
   Route::post('bus_root/update/{id}','BusRootController@update');
   Route::delete('bus_root/destroy/{id}','BusRootController@destroy');
   /*bus root assign routes end*/

   /*bus driver assign routes start*/
   Route::get('bus_driver','BusDriverController@index');
   Route::get('bus_driver/get_assign_data/{id}','BusDriverController@getAssignData');
   Route::get('bus_driver/get_assign_bus_number/{bus_group_id}','BusDriverController@getBusNumber');
   Route::get('bus_driver/get_current_driver/{id}','BusDriverController@getCurrentDriver');
   Route::post('bus_driver/store','BusDriverController@store');
   Route::get('bus_driver/edit/{id}','BusDriverController@edit');
   Route::get('bus_driver/get_all_bus_number','BusDriverController@getAllBusNumber');
   Route::post('bus_driver/update/{id}','BusDriverController@update');
   Route::delete('bus_driver/destroy/{id}','BusDriverController@destroy');
   /*bus driver assign routes end*/

   /*user route start*/
    Route::get('user','UserController@index');
    Route::post('user/store','UserController@store');
    Route::get('user/edit/{id}','UserController@edit');
    Route::post('user/update/{id}','UserController@update');
    Route::delete('user/destroy/{id}','UserController@destroy');
    Route::post('user/status_change/{id}','UserController@statusChange');
   /*user route end*/
});
