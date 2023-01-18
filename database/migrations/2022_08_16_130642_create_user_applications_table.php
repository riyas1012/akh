<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_applications', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('application_number')->unique();
            $table->bigInteger('year_of_experience_id')->unsigned();
            $table->bigInteger('company_activity_type_id')->unsigned();
            $table->bigInteger('existing_branche_id')->unsigned()->nullable();
            $table->bigInteger('fb_type_id')->unsigned()->nullable();
            $table->string('concept_name')->nullable();
            $table->bigInteger('unit_type_id')->unsigned();
            $table->text('description')->nullable();
            $table->bigInteger('number_of_employee_id')->unsigned();
            $table->bigInteger('ktcc_id')->unsigned();
            $table->string('specify_ktcc')->nullable();
            $table->string('ktcc_image_name')->nullable();
            $table->string('ktcc_image_path')->nullable();
            $table->bigInteger('central_kitchen_id')->unsigned()->nullable();
            $table->bigInteger('kitchen_footprint_area_id')->unsigned()->nullable();
            $table->string('commpany_profile_doc_name')->nullable();
            $table->string('company_profile_doc_path')->nullable();
            $table->string('commercial_document_name')->nullable();
            $table->string('commercial_documnet_path')->nullable();
            $table->string('trade_licence_doc_name')->nullable();
            $table->string('trade_licence_doc_path')->nullable();
            $table->string('company_card_doc_name')->nullable();
            $table->string('company_card_doc_path')->nullable();
            $table->string('home_business_license_name')->nullable();
            $table->string('home_business_license_path')->nullable();
            $table->string('qid_name')->nullable();
            $table->string('qid_path')->nullable();
            $table->tinyInteger('declaration')->default(0);
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('year_of_experience_id')->references('id')->on('years_of_experiences')->onDelete('cascade');
            $table->foreign('company_activity_type_id')->references('id')->on('company_activity_types')->onDelete('cascade');
            $table->foreign('existing_branche_id')->references('id')->on('existing_branches')->onDelete('cascade');
            $table->foreign('fb_type_id')->references('id')->on('f_b_types')->onDelete('cascade');
            $table->foreign('unit_type_id')->references('id')->on('unit_types')->onDelete('cascade');
            $table->foreign('number_of_employee_id')->references('id')->on('number_of_employees')->onDelete('cascade');
            $table->foreign('ktcc_id')->references('id')->on('ktcc')->onDelete('cascade');
            $table->foreign('central_kitchen_id')->references('id')->on('central_kitchens')->onDelete('cascade');
            $table->foreign('kitchen_footprint_area_id')->references('id')->on('kitchen_footprint_areas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_applications');
    }
}
