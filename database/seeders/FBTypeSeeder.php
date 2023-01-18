<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FBTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $className = 'FBTypeSeeder';
        if(DB::table('seeders')->where('name',$className)->count() == 0){
            $insertArray = array(
                array(
                    'english' => 'Moroccan',
                    'arabic' => ' مغربي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Egyptian',
                    'arabic' => 'مصري',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Levantine',
                    'arabic' => 'مأكوالت شامية',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Italian',
                    'arabic' => 'إيطالي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'French',
                    'arabic' => 'فرنسي ',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Qatari/Khaliji',
                    'arabic' => 'قطري / خليجي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Peruvian',
                    'arabic' => 'بيرو',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Lebanese',
                    'arabic' => ' لبناني',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Turkish',
                    'arabic' => 'تركي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Healthy',
                    'arabic' => 'صحي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Mexican',
                    'arabic' => ' مكسيكي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Japanese',
                    'arabic' => 'ياباني ',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Chinese',
                    'arabic' => ' صينى',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Indian',
                    'arabic' => 'هندي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Vietnamese',
                    'arabic' => 'فيتنامي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Korean',
                    'arabic' => 'كوري',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Eastern European',
                    'arabic' => 'أوروبي شرقي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'International',
                    'arabic' => 'عالمي',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
                array(
                    'english' => 'Other',
                    'arabic' => 'اخرى',
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ),
            );

            DB::table('f_b_types')->insert($insertArray);
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
