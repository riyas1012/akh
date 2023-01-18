<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRetailTypeIdUserApplications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_applications', function (Blueprint $table) {
            $table->bigInteger('retail_type_id')->unsigned()->after('existing_branche_id')->nullable();
            $table->foreign('retail_type_id')->references('id')->on('retail_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_applications', function (Blueprint $table) {
            //
        });
    }
}
