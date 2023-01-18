<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NumberOfEmployeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $className = 'NumberOfEmployeesSeeder';
        if(DB::table('seeders')->where('name',$className)->count() == 0){
            $insertArray = array(
                array(
                    'english' => 'More than 15 employees',
                    'arabic' => 'اكثر من 15 عامل',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => '10-15',
                    'arabic' => '10-15',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => '5-10',
                    'arabic' => '5-10',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => '1-5',
                    'arabic' => '1-5',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => '0',
                    'arabic' => '0',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
            );

            DB::table('number_of_employees')->insert($insertArray);
            $seedingInsertArray = array(
                array(
                    'name' => $className,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                )
            );
            DB::table('seeders')->insert($seedingInsertArray);
        }
    }
}
