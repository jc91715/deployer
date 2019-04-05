<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware'=>'auth:api','as' => 'api.admin.', 'prefix' => 'admin'],function(){
    Route::resource('spaces', 'SpaceController');
    Route::resource('spaces/{space}/projects', 'ProjectController');
    Route::resource('spaces/{space}/projects/{project}/deployments', 'DeploymentController');
    Route::resource('spaces/{space}/tasks', 'TaskController');
    Route::resource('spaces/{space}/servers', 'ServerController');
});