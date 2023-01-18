<html @if ($details['locale'] == 'ar') dir="rtl" lang="ar" @else lang="en-US" @endif>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        table,
        td,
        th {
            border: 1px solid;
        }

        table {
            border-collapse: collapse;
        }
    </style>
</head>

<body  @if ($details['locale'] == 'en') dir="ltr" @else dir="rtl" @endif >

    <div >

        <table style="margin-top:60px;">
            <tbody>
                <tr>
                    <td>
                        {{ __('email.unique_id') }}
                    </td>
                    <td>
                        {{ $user_application->application_number }}
                    </td>
                </tr>
                <tr >
                    <td>
                        {{ __('email.applicat_user_name') }}
                    </td>
                    <td>
                        {{ $user_application->first_name }} / {{ $user_application->surname }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.applicat_email') }}
                    </td>
                    <td>
                        {{ $user->email }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.phone_number') }}
                    </td>
                    <td>
                        {{ $user->phone_number }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.submission_date') }}
                    </td>
                    <td>
                        {{ \Carbon\Carbon::parse($user_application->created_at)->format('d-m-Y') }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.concept_name') }}
                    </td>
                    <td>
                        {{ $user_application->concept_name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.company_activity_type') }}
                    </td>
                    <td>
                        @php
                            $company_activity_array = [];
                        @endphp
                        @foreach ($user_application->other_options->where('option_name','company_activity_type') as $item)
                            @php
                                array_push($company_activity_array,$item->company_activity_types->english);
                            @endphp
                        @endforeach
                        @php
                            $company_activity_name = implode(',',$company_activity_array);
                        @endphp
                        {{ $company_activity_name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.fb_ethnicity_type') }}
                    </td>
                    <td>
                        @php
                            $fb_type_array = [];
                        @endphp
                        @foreach ($user_application->other_options->where('option_name','fb_type') as $item)
                            @php
                                array_push($fb_type_array,$item->fb_types->english);
                            @endphp
                        @endforeach
                        @php
                            $fb_type_name = implode(',',$fb_type_array);
                        @endphp
                        {{ $fb_type_name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.other_fb__cuisine_type') }}
                    </td>
                    <td>
                        @if ($user_application->other_fb_cousine != null)
                            {{ $user_application->other_fb_cousine }}
                        @else
                            -
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.fb_offering_type') }}
                    </td>
                    <td>
                        @php
                            $fb_offer_type_array = [];
                        @endphp
                        @foreach ($user_application->other_options->where('option_name','fb_offer_type') as $item)
                            @php
                                array_push($fb_offer_type_array,$item->fb_offer_types->english);
                            @endphp
                        @endforeach
                        @php
                            $fb_offer_type_name = implode(',',$fb_offer_type_array);
                        @endphp
                        {{ $fb_offer_type_name }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.other_fb__offering_type') }}
                    </td>
                    <td>
                        @if ($user_application->other_type != null)
                            {{ $user_application->other_type }}
                        @else
                            -
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.existing_branches') }}
                    </td>
                    <td>
                        @if ($user_application->existing_branche_id != null)
                            {{ $user_application->existing_branches->english }}
                        @else
                            -
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.breif_description') }}
                    </td>
                    <td>
                        {{ $user_application->description }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.years_of_experience') }}
                    </td>
                    <td>
                        {{ $user_application->year_of_experience->english }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.unit_type') }}
                    </td>
                    <td>
                        {{ $user_application->unit_type->english }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.ktcc') }}
                    </td>
                    <td>
                        {{ $user_application->ktcc->english }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.footprint_ktcc') }}
                    </td>
                    <td>
                        {{ $user_application->specify_ktcc }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.central_kitchen') }}
                    </td>
                    <td>
                        {{ $user_application->central_kitchen->english }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.number_of_employees') }}
                    </td>
                    <td>
                        {{ $user_application->number_of_employess->english }}
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.concept_presentation') }}
                    </td>
                    <td>
                        <a
                            href="{{ route('download', ['type' => 'companyprofile', 'unique_id' => $user_application->application_number]) }}">
                            Download Link
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.ktcc_image') }}
                    </td>
                    <td>
                        @if ($user_application->ktcc_image_path == null)
                            -
                        @else
                            <a
                                href="{{ route('download', ['type' => 'ktccimage', 'unique_id' => $user_application->application_number]) }}">
                                Download Link
                            </a>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.commercial_registration') }}
                    </td>
                    <td>

                        @if ($user_application->commercial_documnet_path == null)
                            -
                        @else
                            <a
                                href="{{ route('download', ['type' => 'commercial', 'unique_id' => $user_application->application_number]) }}">
                                Download Link
                            </a>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.trade_license') }}
                    </td>
                    <td>
                        @if ($user_application->trade_licence_doc_path == null)
                            -
                        @else
                            <a
                                href="{{ route('download', ['type' => 'trade', 'unique_id' => $user_application->application_number]) }}">
                                Download Link
                            </a>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.computer_card') }}
                    </td>
                    <td>
                        @if ($user_application->company_card_doc_path == null)
                            -
                        @else
                            <a
                                href="{{ route('download', ['type' => 'computercard', 'unique_id' => $user_application->application_number]) }}">
                                Download Link
                            </a>
                        @endif
                    </td>
                </tr>
                <tr>
                    <td>
                        {{ __('email.QID') }}
                    </td>
                    <td>
                        @if ($user_application->qid_path == null)
                            -
                        @else
                            <a
                                href="{{ route('download', ['type' => 'qid', 'unique_id' => $user_application->application_number]) }}">
                                Download Link
                            </a>
                        @endif
                    </td>
                </tr>
                {{-- <tr>
                    <td>
                        {{ __('email.home_business_license') }}
                    </td>
                    <td>
                        @if ($user_application->home_business_license_path == null)
                            -
                        @else
                            <a
                                href="{{ route('download', ['type' => 'homebusiness', 'unique_id' => $user_application->application_number]) }}">
                                Download Link
                            </a>
                        @endif
                    </td>
                </tr> --}}
            </tbody>
        </table>
        <p>{{__('email.wish_you_the_best')}}</p>
    </div>

</body>

</html>
