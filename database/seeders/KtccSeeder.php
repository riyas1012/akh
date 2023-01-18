<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KtccSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $className = 'KtccSeeder';
        if(DB::table('seeders')->where('name',$className)->count() == 0){
            $insertArray = array(
                array(
                    'english' => 'No',
                    'arabic' => 'لا',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B kiosk',
                    'arabic' => 'كشك طعام',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B Truck',
                    'arabic' => 'شاحنة طعام',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B cart/Trolley',
                    'arabic' => 'عربة طعام متنقلة',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B Container',
                    'arabic' => 'حاوية طعام',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B Caravan',
                    'arabic' => 'كارافان طعام',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'No',
                    'arabic' => 'لا',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Kiosk',
                    'arabic' => 'كشك',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Truck',
                    'arabic' => 'شاحنة',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Cart/Trolley',
                    'arabic' => 'عربة',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Caravan',
                    'arabic' => 'كارافان',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Container',
                    'arabic' => 'حاوية',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
            );

            DB::table('ktcc')->insert($insertArray);
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
