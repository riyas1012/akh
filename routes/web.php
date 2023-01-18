<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\FoodBeverageController;
use App\Http\Controllers\HomeController;
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

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::middleware(['site-enable'])->group(function () {
    Route::get('lang/{locale}', [HomeController::class, 'lang'])->name('lang');
    
    Route::get('account-verification/{activation_key}', [HomeController::class, 'accountVerification'])->name('account.verification');

    Route::get('food-beverage/forgot-password', [FoodBeverageController::class, 'forgotPassword'])->name('forgot.password');
    Route::get('food-beverage/reset-password/{reset_token}', [FoodBeverageController::class, 'resetPassword'])->name('reset.password');
    Route::post('food-beverage/reset-password/update/{reset_token}', [FoodBeverageController::class, 'resetPasswordUpdate'])->name('reset.password.update');
    Route::post('food-beverage/forgot-password-link', [FoodBeverageController::class, 'forgotPasswordLink'])->name('forgot.password.link');

    Route::get('food-beverage', [FoodBeverageController::class, 'index'])->name('food.beverage');
    Route::get('food-beverage/register', [FoodBeverageController::class, 'register'])->name('food.beverage.register');
    Route::post('food-beverage/store', [FoodBeverageController::class, 'store'])->name('food.beverage.store');
    Route::post('food-beverage/login', [FoodBeverageController::class, 'login'])->name('food.beverage.login');
    Route::middleware(['auth_user'])->group(function () {
        Route::get('otp', [HomeController::class, 'getOtpPage'])->name('otp');
        Route::get('otp-resend', [HomeController::class, 'otpResend'])->name('otp.resend');
        Route::post('otp-verification', [HomeController::class, 'otpVerification'])->name('otp.verification');
        Route::get('food-beverage/application', [FoodBeverageController::class, 'application'])->name('food.beverage.application');
        Route::post('food-beverage/application/submit', [FoodBeverageController::class, 'saveApplication'])->name('food.beverage.application.submit');
        Route::get('logout', [HomeController::class, 'logout'])->name('logout');
    });
});
Route::get('downoad-document/{type}/{unique_id}', [HomeController::class, 'download'])->name('download');
Route::get('/siteclosed', [HomeController::class, 'siteClosed'])->name('site_closed');

Route::prefix('/admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::post('login', [AdminController::class, 'login'])->name('admin.login');
    Route::get('password/{password_key}', [AdminController::class, 'createPassword'])->name('admin.password');
    Route::post('password/{password_key}/create', [AdminController::class, 'updatePassword'])->name('admin.password.update');
    Route::middleware(['auth_admin'])->group(function () {
        Route::get('dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('logout', [AdminController::class, 'logout'])->name('admin.logout');
        Route::get('operators', [AdminController::class, 'operators'])->name('admin.operators');
        Route::get('operators/add', [AdminController::class, 'operatorsAdd'])->name('admin.operators.add');
        Route::post('operators/store', [AdminController::class, 'operatorsStore'])->name('admin.operators.store');
        Route::get('operators/{operator_id}/edit', [AdminController::class, 'operatorEdit'])->name('admin.operators.edit');
        Route::post('operators/{operator_id}/update', [AdminController::class, 'operatorUpdate'])->name('admin.operators.update');
        Route::get('applications', [AdminController::class, 'applications'])->name('admin.applications');
        Route::get('applications/{application_number}', [AdminController::class, 'applicationDetails'])->name('admin.applications.details');
        Route::post('applications/{application_number}/edit', [AdminController::class, 'applicationDetailsEdit'])->name('admin.applications.details.edit');
        Route::post('application/search', [AdminController::class, 'applicationSearch'])->name('admin.applications.search');
        Route::get('configuration', [AdminController::class, 'configuration'])->name('admin.configuration');
        Route::post('configuration/update', [AdminController::class, 'updateConfiguration'])->name('admin.configuration.update');
    });
});
