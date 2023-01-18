<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KitchenFootprintArea extends Model
{
    use HasFactory;

    public function user_applications(){
        return $this->hasMany(UserApplication::class);
    }
}
