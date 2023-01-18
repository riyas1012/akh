<?php

namespace App\Jobs;

use App\Http\Controllers\Api\SendMailController;

class SendEmailJob extends Job
{

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public $details;
    public $uniqueId;
    public $mailType;
    public function __construct($details,$mailType,$uniqueId)
    {
        $this->details = $details;
        $this->mailType = $mailType;
        $this->uniqueId = $uniqueId;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $sendMailController = new SendMailController;

        if($this->mailType == 'otpmail')
        {
            $sendMailController->sendOtpMail($this->details);
        }
        elseif($this->mailType == 'resetpasswordmail'){
            $sendMailController->sendResetMail($this->details);
        }
        elseif($this->mailType == 'registermail'){
            $sendMailController->sendUserRegisterMail($this->details);
        }
        elseif($this->mailType == 'userapplication'){
            $sendMailController->sendUserapplicationMail($this->details);
        }
        elseif($this->mailType == 'fbuserapplication'){
            $sendMailController->sendFBUserApplicationMail($this->details);
        }
        elseif($this->mailType == 'admin_register_password'){
            $sendMailController->sendAdminCreatePassword($this->details);
        }
        elseif($this->mailType == 'admin_application_mail'){
            $sendMailController->sendAdminApplicantionMail($this->details);
        }
    }
}
