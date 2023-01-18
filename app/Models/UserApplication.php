<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class UserApplication extends Model
{
    use HasFactory;

    protected $table = 'user_applications';

    public function company_activity_type(){
        return $this->belongsTo(CompanyActivityType::class);
    }

    public function fb_types(){
        return $this->belongsTo(FBTypes::class,'fb_type_id');
    }

    public function fb_offer_types(){
        return $this->belongsTo(FbOfferingType::class,'fb_offer_type_id');
    }

    public function other_options(){
        return $this->hasMany(OtherOptions::class,'user_application_id');
    }

    public function existing_branches(){
        return $this->belongsTo(ExistingBranches::class,'existing_branche_id');
    }

    public function year_of_experience(){
        return $this->belongsTo(YearsOfExperience::class);
    }

    public function unit_type(){
        return $this->belongsTo(UnitTypes::class);
    }

    public function ktcc(){
        return $this->belongsTo(FbKtcc::class);
    }

    public function central_kitchen(){
        return $this->belongsTo(CentralKitchen::class);
    }

    public function number_of_employess(){
        return $this->belongsTo(NumberOfEmployees::class,'number_of_employee_id');
    }

    public function kitchen_footprint(){
        return $this->belongsTo(KitchenFootprintArea::class,'kitchen_footprint_area_id');
    }

    public function admins(){
        return $this->belongsTo(Admin::class,'updated_admin_id');
    }

    public function users(){
        return $this->belongsTo(User::class,'user_id');
    }


}
