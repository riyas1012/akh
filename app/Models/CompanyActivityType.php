<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyActivityType extends Model
{
    use HasFactory;

    protected $table = 'company_activity_types';

    public function other_option()
    {
        return $this->hasMany(OtherOptions::class);
    }
}
