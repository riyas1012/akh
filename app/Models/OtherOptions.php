<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class OtherOptions extends Model
{
    use HasFactory;

    public function user_application(){
        return $this->belongsTo(UserApplication::class);
    }

    public function company_activity_types() {
        return $this->belongsTo(CompanyActivityType::class,'option_id');
    }

    public function fb_types() {
        return $this->belongsTo(FBTypes::class,'option_id');
    }

    public function fb_offer_types() {
        return $this->belongsTo(FbOfferingType::class,'option_id');
    }
}
