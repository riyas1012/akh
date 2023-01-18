<?php

namespace Database\Seeders;

use App\Models\FbOfferingType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(CompanyActivitySeeder::class);
        $this->call(YearExperienceSeeder::class);
        $this->call(ExistingBranchesSeeder::class);
        $this->call(FBTypeSeeder::class);
        $this->call(UnitTypesSeeder::class);
        $this->call(NumberOfEmployeesSeeder::class);
        $this->call(KtccSeeder::class);
        $this->call(CentralKitchenSeeder::class);
        $this->call(KitchenFootprintSeeder::class);
        $this->call(FbOfferingTypeSeeder::class);
        $this->call(RetailTypeSeeder::class);
        $this->call(ConfigurationSeeder::class);
    }
}
