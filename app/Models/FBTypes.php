<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FBTypes extends Model
{
    use HasFactory;
    protected $table = 'f_b_types';


    public function other_option()
    {
        return $this->hasMany(OtherOptions::class);
    }
}
