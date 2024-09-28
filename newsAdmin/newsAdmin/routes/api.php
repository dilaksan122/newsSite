<?php

use App\Http\Controllers\AdminApi\NewsApiControllers;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/api/cinema-news', [NewsApiControllers::class, 'fetchAllCinemaNews'])->name('api.fetchAllCinemaNews');
Route::get('/api/cinema-news/{slug}', [NewsApiControllers::class, 'fetchCinemaNewsBySlug'])->name('api.fetchCinemaNewsBySlug');


Route::get('/api/sports-news', [NewsApiControllers::class, 'fetchAllSportsNews'])->name('api.fetchAllSportsNews');

// Route to fetch sports news by ID
Route::get('/api/sports-news/{slug}', [NewsApiControllers::class, 'fetchSportsNewsBySlug'])->name('api.fetchSportsNewsById');

Route::get('/api/technology-news', [NewsApiControllers::class, 'fetchAllTechnologyNews'])->name('api.fetchAllTechnologyNews');

Route::get('/api/technology-news/{slug}', [NewsApiControllers::class, 'fetchTechnologyNewsBySlug'])->name('api.fetchTechnologyNewsById');

Route::get('/api/reviews', [NewsApiControllers::class, 'fetchAllReviews'])->name('api.fetchAllReviews');
Route::get('/api/health', [NewsApiControllers::class, 'fetchAllHealth'])->name('api.fetchAllHealth');

Route::get('/api/reviews/{slug}',[NewsApiControllers::class,'fetchAllReviewsById'])->name('api.fetchAllReviewsById');
Route::get('/api/health/{slug}',[NewsApiControllers::class,'fetchAllHealthById'])->name('api.fetchAllHealthById');

Route::post('/contact/send', [ContactController::class, 'sendMail']);

Route::get('/reviews', [NewsApiControllers::class, 'getReviewsByCategory']);

Route::post('/api/comments', [CommentController::class, 'store']);

Route::post('/technology-news/comments', [CommentController::class, 'storeComm']);

Route::post('/sports/comments', [CommentController::class, 'storeSports']);

Route::post('/health/comments', [CommentController::class, 'storeHealth']);

Route::post('/cinema/comments', [CommentController::class, 'storeCinema']);