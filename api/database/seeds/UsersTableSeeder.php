<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)->create([
            'email' => 'admin@test.com',
            'password' => bcrypt('Test@123')
        ]);
<<<<<<< HEAD
        factory(\App\Models\User::class, 1000)->create();
=======
        factory(User::class, 500)->create();
>>>>>>> 2aa77cb60f8706e87a79a8bd5b55f64dae87a568
    }
}
