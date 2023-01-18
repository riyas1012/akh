<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KitchenFootprintSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $className = 'KitchenFootprintSeeder';
        if(DB::table('seeders')->where('name',$className)->count() == 0){
            $insertArray = array(
                array(
                    'english' => 'Less than 50 SQM',
                    'arabic' => 'مساحة 50 متر مربع او اقل',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Less than 200 SQM',
                    'arabic' => 'مساحة 200 متر مربع او اقل',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'More than 200 SQM',
                    'arabic' => 'أكبر من 200 متر مربع ',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
            );

            DB::table('kitchen_footprint_areas')->insert($insertArray);
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
