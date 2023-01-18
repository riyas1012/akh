<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOtherOptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('other_options', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_application_id')->unsigned();
            $table->string('option_name');
            $table->bigInteger('option_id')->unsigned();
            $table->timestamps();
            $table->foreign('user_application_id')->references('id')->on('user_applications')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('other_options');
    }
}
