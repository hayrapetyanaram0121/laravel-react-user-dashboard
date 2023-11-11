<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register',[AuthController::class,'register']);
Route::post('login', [AuthController::class,'login']);
Route::post('refresh', [AuthController::class,'refresh']);
Route::post('logout', [AuthController::class,'logout']);

Route::controller(UserController::class)->group(function () {
    Route::get('user', 'index');
    Route::post('user', 'store');
    Route::get('user/{id}', 'show');
    Route::put('user/{id}', 'update');
    Route::delete('user/{id}', 'destroy');
    Route::post('user/delete-many', 'destroy_many');
}); 