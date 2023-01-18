<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConfigurationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $className = 'ConfigurationSeeder';
        if(DB::table('seeders')->where('name',$className)->count() == 0){
            $insertArray = array(
                array(
                    'name' => 'AKH_APPLICATION_EMAIL',
                    'value' => 'activationpopups@akh.com.qa',
                    'description' => 'AKH Application Submit Email Id',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'name' => 'SC_APPLICATION_EMAIL',
                    'value' => 'riyas.1012@gmail.com',
                    'description' => 'Retail Application Submit Email Id',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
            );

            DB::table('configurations')->insert($insertArray);
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
