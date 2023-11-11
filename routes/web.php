<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/{path?}', function () {
    return view('index');
});
// Route::get('/', [App\Http\Controllers\AdminController::class, 'index'])->name('admin');

// Route::get('/sign-up', function () {
//     return view('signup');
// })->name('sign-up');

// Route::get('/login', function () {
//     return view('login');
// })->name('login');


// Route::get('{path?}', function () {
//     return view('404');
// })->name('404');


// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
