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
Route::group(['middleware'=>'json.response'],function (){
    Route::post('/login',[\App\Http\Controllers\Auth\ApiAuthController::class,'login'])->name('login.api');
    Route::post('/register',[\App\Http\Controllers\Auth\ApiAuthController::class,'register'])->name('register.api');
});

Route::middleware('auth:api')->group(function () {
    Route::apiResource('/post', \App\Http\Controllers\PostController::class);
    Route::post('/logout',[\App\Http\Controllers\Auth\ApiAuthController::class,'logout'])->name('logout.api');
    Route::apiResource('/comment',\App\Http\Controllers\CommentController::class);
    Route::apiResource('/like',\App\Http\Controllers\LikeController::class);
    Route::apiResource('/profile',\App\Http\Controllers\ProfileController::class);
    Route::apiResource('/follower',\App\Http\Controllers\FollowerController::class);
    Route::get('/user',function (Request $request){
        return $request->user();
    });

});
