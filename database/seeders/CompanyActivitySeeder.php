<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompanyActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $className = 'CompanyActivitySeeder';
        if(DB::table('seeders')->where('name',$className)->count() == 0){
            $insertArray = array(
                array(
                    'english' => 'Restaurant',
                    'arabic' =>'المطاعم',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Coffee shop',
                    'arabic' => 'المقاهي (كوفي شوب)',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B kiosk',
                    'arabic' => 'الأكشاك',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B cart/trolley',
                    'arabic' => 'عربات الطعام',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'F&B Container',
                    'arabic' => 'حاويات الأغذية والمشروبات',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Home Business',
                    'arabic' => 'أصحاب المشاريع المنزلية',
                    'type' => 'FB',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Outlet',
                    'arabic' =>'متاجر البيع',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Caravan',
                    'arabic' =>'الكرافانات',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Truck',
                    'arabic' =>'الشاحنات',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Kiosk',
                    'arabic' =>'الاكشاك',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Cart/Trolley',
                    'arabic' =>'العربات',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Container',
                    'arabic' =>'الحاويات',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Home Business',
                    'arabic' => 'أصحاب المشاريع المنزلية',
                    'type' => 'Retail',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
            );

            DB::table('company_activity_types')->insert($insertArray);
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
