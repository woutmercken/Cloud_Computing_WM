<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\spelerController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/spelers', [spelerController::class, "allSpelers"]);
Route::get('/goals', [spelerController::class, "totalGoals"]);
Route::get('/assists', [spelerController::class, "totalAssists"]);
Route::get('/rodeKaarten', [spelerController::class, "totalKaarten"]);
Route::get('/spelers/{id}', [spelerController::class, "getSpeler"]);
Route::get('/assists/{min}/{max}', [spelerController::class, "minMaxAssists"]);
Route::get('/rodeKaarten/{min}/{max}', [spelerController::class, "minMaxKaarten"]);
Route::get('/goals/{min}/{max}', [spelerController::class, "minMaxGoals"]);