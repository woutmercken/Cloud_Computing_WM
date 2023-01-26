<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class spelerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('speler')->truncate();
        $faker = \Faker\Factory::create();
        for($i = 0; $i < 75; $i++){
            DB::table('speler')->insert([
                'naam' => $faker->name,
                'goals' => rand(10,500),
                'assists' => rand(10,500),
                'rode kaarten' => rand(0,50)
            ]);
        }
    }
}
