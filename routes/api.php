<?php

use Illuminate\Http\Request;
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


Route::apiResource('/post', \App\Http\Controllers\PostController::class);
Route::apiResource('/user',\App\Http\Controllers\UserController::class);
Route::apiResource('/comment',\App\Http\Controllers\CommentController::class);
Route::apiResource('/like',\App\Http\Controllers\LikeController::class);
//Route::prefix('/user')->group(function (){
//
//});
//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
