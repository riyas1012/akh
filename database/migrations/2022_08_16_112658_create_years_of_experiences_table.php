<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateYearsOfExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('years_of_experiences', function (Blueprint $table) {
            $table->id();
            $table->string('english');
            $table->string('arabic');
            $table->tinyInteger('status')->default(1)->comment('0->inactive, 1-> active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('years_of_experiences');
    }
}
