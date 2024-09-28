<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\NewsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/',[AdminController::class,'dashboard']);
Route::get('/cinema-news', [NewsController::class, 'cinema'])->name('cinema.news');
Route::get('/sports-news', [NewsController::class, 'sports'])->name('sports.news');
Route::get('/technology', [NewsController::class, 'technology'])->name('technology.news');
Route::get('/reviews', [NewsController::class, 'reviews'])->name('reviews');
Route::get('/health', [NewsController::class, 'health'])->name('health.news');

Route::post('/cinema-news',[NewsController::class,'storeCineNews'])->name('storeCineNews');
Route::post('/sports-news',[NewsController::class,'storeSportsNews'])->name('storeSportsNews');
Route::post('technology/', [NewsController::class, 'store'])->name('storeTechNews');

Route::post('/reviews/add_reviews', [NewsController::class,'storeReviews'])->name('storereviews');
Route::post('/health/add_health',[NewsController::class,'storeHealth'])->name('storeHealth');

Route::get('/cinema/views',[NewsController::class,'viewCinema'])->name('cinema.views');




// routes/web.php

Route::get('/cinema-news/edit/{id}', [NewsController::class, 'edit'])->name('cinema.news.edit');
Route::post('/cinema-news/update/{id}', [NewsController::class, 'update'])->name('cinema.news.update');
Route::delete('/cinema-news/delete/{id}', [NewsController::class, 'destroy'])->name('cinema.news.delete');


Route::get('Admin/Sports/viewSports', [NewsController::class, 'viewSports'])->name('Admin.Sports.viewSports');
Route::get('Admin/Sports/edit/{id}', [NewsController::class, 'editSports'])->name('Admin.Sports.editSports');
Route::post('Admin/Sports/update/{id}', [NewsController::class, 'updateSports'])->name('Admin.Sports.updateSports');
Route::delete('Admin/Sports/delete/{id}', [NewsController::class, 'destroySports'])->name('Admin.Sports.destroySports');


Route::get('Admin/Technologies/viewTechnologies',[NewsController::class,'viewTechnologies'])->name('Admin.Technologies.viewTechnologies');
Route::get('Admin/Technologies/edit/{id}', [NewsController::class, 'editTechnology'])->name('admin.technology.edit');
Route::post('Admin/Technologies/update/{id}', [NewsController::class, 'updateTechnology'])->name('admin.technology.update');
Route::delete('Admin/Technologies/delete/{id}', [NewsController::class, 'destroyTechnology'])->name('admin.technology.destroy');


Route::get('/reviews/viewReviews', [NewsController::class, 'showReviews'])->name('Admin.Reviews.viewReviews');
Route::get('/reviews/{id}/edit', [NewsController::class, 'editReviews'])->name('Admin.Reviews.editReview');
Route::post('/reviews/{id}', [NewsController::class, 'updateReviews'])->name('Admin.Reviews.update');
Route::delete('/reviews/{id}', [NewsController::class, 'destroyReviews'])->name('Admin.Reviews.destroyReview');


Route::get('/health/news', [NewsController::class, 'showHealth'])->name('Admin.Health.viewHealth');
Route::get('/health/news/{id}/edit', [NewsController::class, 'editHealth'])->name('Admin.Health.editHealth');
Route::put('/health/news/{id}', [NewsController::class, 'updateHealth'])->name('Admin.Health.updateHealth');
Route::delete('/health/news/{id}', [NewsController::class, 'destroyHealth'])->name('Admin.Health.destroyHealth');
