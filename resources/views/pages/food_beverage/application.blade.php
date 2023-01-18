@extends('layouts.base')

@section('content')
    @push('stylesheet')
        <style>
            .error {
                color: red;
            }

            .label-required::after {
                content: '*';
                color: #e1251b;
                position: absolute;
                margin-left: 4px;
                font-size: 16px;
            }

            .selection {
                width: 400px;
            }
        </style>
    @endpush
    <div align="center" class="bg1">
        <div class="container">
            <div class="row" style="float: right;">
                <p>
                    <span class="language selected" id="english">
                        <b>
                            <a href="{{ route('lang', ['locale' => 'en']) }}" class=""
                                @if (session()->get('locale') == 'en') style="color:black;" @endif>English</a>
                        </b>
                    </span>
                    <span> | </span>
                    <span class="language" id="arabic">
                        <b>
                            <a href="{{ route('lang', ['locale' => 'ar']) }}"
                                @if (session()->get('locale') == 'ar') style="color:black;" @endif>
                                العربية
                            </a>
                        </b>
                    </span>
                </p>
            </div>
            <div class="row" style="margin-bottom:50px;">

            </div>
            <div class="row" style="float: right;margin-bottom:50px;">
                <a class="btn btn-primary" style="background:#1c3667 !important;margin:0px 20px;"
                    href="{{ route('logout') }}" title="{{ __('page_labels.logout') }}">{{ __('page_labels.logout') }}</a>
            </div>
            <div class="row" style="margin-bottom:50px;">

            </div>
            <div class="col-md-12" style="text-align: center;">
                <img src="{{ asset('assets/images/logo.png') }}" style="text-align: center; height: 218px;width:175px;">
            </div><br>
            <div class="col-md-12" style="text-align: center;">
                <h2>{{ __('page_labels.concessions_application') }}</h2>
            </div>
            {{-- <div class="col-md-12" style="text-align: center;">
                <h3>{{ __('page_labels.application') }}</h3>
            </div> --}}
            <div class="card  col-md-10 login-card" style="background-color: transparent !important;">
                <div class="card-body">
                    <div class="messages">
                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                @if (session()->get('locale') == 'en')
                                    <ul style="text-align: left;">
                                    @else
                                        <ul style="text-align: right;">
                                @endif
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                                </ul>
                            </div>
                        @endif
                        @if (session('success'))
                            <div class="alert alert-success">
                                @if (session()->get('locale') == 'en')
                                    <ul style="text-align: left;">
                                    @else
                                        <ul style="text-align: right;">
                                @endif
                                <li>{{ session('success') }}</li>
                                </ul>
                            </div>
                        @endif
                    </div>
                    <div id="login" align="center">
                        <form class="form-horizontal" action="{{ route('food.beverage.application.submit') }}"
                            method="post" name="userApplicationForm" id="userApplicationForm"
                            enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <fieldset>
                                <div class="row mt-3">
                                    <label class=""
                                        style="margin: auto;">{{ __('page_labels.please_fill_below_fields') }}</label>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <label class="floating-label">{{ __('page_labels.unique_id') }}</label>
                                    <br>
                                    <input type="text" class="form-control" name="application_number"
                                        id="application_number" value="{{ session()->get('application_number') }}"
                                        autocomplete="off" readonly style="width: 150px;margin:0px 20px;">
                                </div>
                            </fieldset>
                            <fieldset>
                                <!-- First & Last Name -->
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.first_name') }}</label>
                                        <input type="text" class="form-control" name="first_name" id="first_name"
                                            value="{{ old('first_name') }}" autocomplete="off">
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.surname') }}</label>
                                        <input type="text" class="form-control" name="last_name" id="last_name"
                                            value="{{ old('last_name') }}" autocomplete="off">
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label class="floating-label label-required">{{ __('page_labels.email') }}</label>
                                        <input type="text" class="form-control" name="email" id="email"
                                            value="{{ $user->email }}" autocomplete="off" disabled>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.phone_number') }}</label>
                                        <input type="text" class="form-control" name="phone_number" id="phone_number"
                                            value="{{ $user->phone_number }}" autocomplete="off" disabled>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.company_activity_type') }}</label>
                                        <select multiple name="company_activity_type_id[]" id="company_activity_type_id"
                                            class="form-control" style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($company_activity_type as $companyActivityItem)
                                                <option value="{{ $companyActivityItem->id }}"
                                                    @if (old('company_activity_type_id') == $companyActivityItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $companyActivityItem->arabic : $companyActivityItem->english }}
                                                </option>
                                            @endforeach
                                        </select><br>
                                        <label id="company_activity_type_id-error" class="error"
                                            for="company_activity_type_id"></label>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.years_of_experience') }}</label>
                                        <select name="year_of_experience_id" id="year_of_experience_id"
                                            class="form-control" style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($years_of_experiences as $yearsItem)
                                                <option value="{{ $yearsItem->id }}"
                                                    @if (old('year_of_experience_id') == $yearsItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $yearsItem->arabic : $yearsItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    {{-- <div class="col-md-6" id="existing_branch_div" style="display: none;"> --}}
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.existing_branches') }}</label>
                                        <select name="existing_branche_id" id="existing_branche_id" class="form-control"
                                            style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($existing_branches as $existingBranchesItem)
                                                <option value="{{ $existingBranchesItem->id }}"
                                                    @if (old('existing_branche_id') == $existingBranchesItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $existingBranchesItem->arabic : $existingBranchesItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.unit_type') }}</label>
                                        <select name="unit_type_id" id="unit_type_id" class="form-control"
                                            style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($unit_types as $unitTypesItem)
                                                <option value="{{ $unitTypesItem->id }}"
                                                    @if (old('unit_type_id') == $unitTypesItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $unitTypesItem->arabic : $unitTypesItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>

                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.concept_name') }}</label>
                                        <input type="text" class="form-control" name="concept_name" id="concept_name"
                                            value="{{ old('concept_name') }}"
                                            placeholder="{{ __('page_labels.concept_name') }}" autocomplete="off">
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.fb_cuisines') }}</label>
                                        <select multiple name="fb_type_id[]" id="fb_type_id" class="form-control"
                                            style="padding: 0px;">
                                            {{-- <option value="">{{ __('page_labels.select') }}</option> --}}
                                            @foreach ($fb_types as $fbTypesItem)
                                                <option value="{{ $fbTypesItem->id }}"
                                                    @if (old('fb_type_id') == $fbTypesItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $fbTypesItem->arabic : $fbTypesItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <br>
                                        <label id="fb_type_id-error" class="error" for="fb_type_id"></label>
                                    </div>

                                </div>
                            </fieldset>
                            <fieldset id="fb_other_cuisines_div" style="display:none;">
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.other_cuisine_type') }}</label>
                                        <input type="text" class="form-control" name="other_cuisine_type"
                                            id="other_cuisine_type" value="{{ old('other_cuisine_type') }}"
                                            placeholder="{{ __('page_labels.other_cuisine_type') }}" autocomplete="off">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">

                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.fb_offering_type') }}</label>
                                        <select multiple name="fb_offer_type_id[]" id="fb_offer_type_id"
                                            class="form-control" style="padding: 0px;">
                                            @foreach ($fb_offer_types as $fbOfferTypesItem)
                                                <option value="{{ $fbOfferTypesItem->id }}"
                                                    @if (old('fb_offer_type_id') == $fbOfferTypesItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $fbOfferTypesItem->arabic : $fbOfferTypesItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                        <br>
                                        <label id="fb_offer_type_id-error" class="error" for="fb_offer_type_id"></label>
                                    </div>
                                    <div class="col-md-6" id="fb_other_div" style="display:none;">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.other_type') }}</label>
                                        <input type="text" class="form-control" name="other_type" id="other_type"
                                            value="{{ old('other_type') }}"
                                            placeholder="{{ __('page_labels.other_type') }}" autocomplete="off">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <label
                                        class="floating-label label-required">{{ __('page_labels.breif_description') }}</label>
                                    <textarea name="description" id="description" cols="10" rows="10" class="form-control"
                                        style="resize: none;">{{ old('description') }}</textarea>
                                    </select>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.number_of_employees') }}</label>
                                        <select name="number_of_employee_id" id="number_of_employee_id"
                                            class="form-control" style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($no_of_employees as $no_of_employees_item)
                                                <option value="{{ $no_of_employees_item->id }}"
                                                    @if (old('number_of_employee_id') == $no_of_employees_item->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $no_of_employees_item->arabic : $no_of_employees_item->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.existing_kiosk') }}</label>
                                        <select name="ktcc_id" id="ktcc_id" class="form-control"
                                            style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($ktcc as $ktccItem)
                                                <option value="{{ $ktccItem->id }}"
                                                    @if (old('ktcc_id') == $ktccItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $ktccItem->arabic : $ktccItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>

                                </div>
                            </fieldset>
                            <fieldset id="ktcc_div"style="display: none;">
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label class="floating-label label-required" id="specify_ktcc_label"></label>
                                        <input type="text" name="specify_ktcc" id="specify_ktcc"
                                            value="{{ old('specify_ktcc') }}" class="form-control">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="floating-label label-required" id="ktcc_image_label"></label>
                                        <input type="file" name="ktcc_image" id="ktcc_image" class="form-control">
                                    </div>

                                </div>
                            </fieldset>

                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.central_kitchen') }}</label>
                                        <select name="central_kitchen_id" id="central_kitchen_id" class="form-control"
                                            style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($central_kitchen as $centralKitchenItem)
                                                <option value="{{ $centralKitchenItem->id }}"
                                                    @if (old('central_kitchen_id') == $centralKitchenItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $centralKitchenItem->arabic : $centralKitchenItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-md-6" id="cetral_kitchen_div" style="display: none;">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.kitchen_footprint_area') }}</label>
                                        <select name="kitchen_footprint_area_id" id="kitchen_footprint_area_id"
                                            class="form-control" style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($kitchen_footprint as $kitchenFootprintItem)
                                                <option value="{{ $kitchenFootprintItem->id }}"
                                                    @if (old('kitchen_footprint_area_id') == $kitchenFootprintItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $kitchenFootprintItem->arabic : $kitchenFootprintItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>


                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <h3 class="floating-label label-required">{{ __('page_labels.upload_documents') }}
                                    </h3>
                                </div>

                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required"><b>{{ __('page_labels.company_profie') }}</b></label>
                                        <label class="floating-label">{{ __('page_labels.company_profie_title') }}</label>
                                        <input type="file" name="company_profile" id="company_profile"
                                            class="form-control">
                                    </div>

                                </div>
                            </fieldset>
                            {{-- <fieldset id="commericial_upload_div" style="display: none;"> --}}
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required"><b>{{ __('page_labels.commercial_register') }}</b></label>
                                        <input type="file" name="commercial_document" id="commercial_document"
                                            class="form-control">
                                    </div>
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required"><b>{{ __('page_labels.trade_license') }}</b></label>
                                        <input type="file" name="trade_license" id="trade_license"
                                            class="form-control">
                                    </div>
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required"><b>{{ __('page_labels.company_computer_card') }}</b></label>
                                        <input type="file" name="company_computer_card" id="company_computer_card"
                                            class="form-control">
                                    </div>

                                </div>
                            </fieldset>
                            <fieldset id="home_business_upload_div" style="display: none;">
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required"><b>{{ __('page_labels.home_business_license') }}</b></label>
                                        <input type="file" name="home_business_license" id="home_business_license"
                                            class="form-control">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required"><b>{{ __('page_labels.owner_partners_QID') }}</b></label>
                                        <input type="file" name="owner_partners_qid" id="owner_partners_qid"
                                            class="form-control">
                                    </div>

                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <label
                                        class="floating-label label-required"><b>{{ __('page_labels.declaration') }}</b></label>
                                </div>
                                <div class="row mt-3">
                                    @if (session()->get('locale') == 'en')
                                        <label class="floating-label" style="text-align: left;">
                                            <input type="checkbox" value="Yes"
                                                @if (old('declaration') == 'Yes') checked @endif name="declaration"
                                                id="declaration">
                                            {{ __('page_labels.declaration_subtitle') }}
                                            <a target="_blank"
                                                href="{{ asset('Privacy_Policy.pdf') }}"><u>{{ __('page_labels.privacy_policy') }}
                                                </u></a>
                                            <a target="_blank"
                                                href="{{ asset('Terms_Conditions.pdf') }}"><u>{{ __('page_labels.terms_of_use') }}
                                                </u></a>
                                            {{ __('page_labels.and') }}
                                            <a target="_blank"
                                                href="{{ asset('Cookies_Notice.pdf') }}"><u>{{ __('page_labels.cookie_notice') }}</u></a>
                                        </label>
                                    @else
                                        <label class="floating-label" style="text-align: right;">
                                            {{ __('page_labels.declaration_subtitle') }}
                                            <a target="_blank"
                                                href="{{ asset('Privacy_Policy.pdf') }}"><u>{{ __('page_labels.privacy_policy') }}
                                                </u></a>
                                            <a target="_blank"
                                                href="{{ asset('Terms_Conditions.pdf') }}"><u>{{ __('page_labels.terms_of_use') }}
                                                </u></a>
                                            {{ __('page_labels.and') }}
                                            <a target="_blank"
                                                href="{{ asset('Cookies_Notice.pdf') }}"><u>{{ __('page_labels.cookie_notice') }}</u></a>
                                            <input type="checkbox" value="Yes"
                                                @if (old('declaration') == 'Yes') checked @endif name="declaration"
                                                id="declaration">
                                    @endif
                                    <br>
                                    <label id="declaration-error" class="error" for="declaration"></label>

                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <button type="submit" class="btn btn-primary"
                                        style="display: block;margin-right: auto;margin-left: auto;text-align: center;">{{ __('page_labels.submit_button') }}</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script>
            $(document).ready(function() {
                $("#company_activity_type_id").select2({
                    placeholder: "{{ __('page_labels.select') }}",
                    maximumSelectionLength: 3,
                    tokenSeparators: [','],
                }).on('change', function(e) {
                    $(this).valid();
                });

                $("#fb_type_id").select2({
                    placeholder: "{{ __('page_labels.select') }}",
                    maximumSelectionLength: 3,
                    tokenSeparators: [','],
                }).on('change', function(e) {
                    if ($('#fb_type_id').val() != "") {
                        $('#fb_type_id').on("select2:select", function(e) {
                            var otherText = 0;
                            $.each($(this).find(":selected"), function(i, item) {
                                if ($(item).val() == 19) {
                                    otherText = 1;
                                }
                            });
                            if (otherText == 1) {
                                $("#fb_type_id").val(19).trigger('change');
                                $("#fb_type_id").select2({
                                    placeholder: "{{ __('page_labels.select') }}",
                                    maximumSelectionLength: 1,
                                    tokenSeparators: [','],
                                    language: {
                                        maximumSelected: function(e) {
                                            var t = "You can only select " + e.maximum +
                                                " item";
                                            e.maximum != 1 && (t += "s");
                                            return t + ' when you clik Others';
                                        }
                                    }
                                });
                                $("#fb_other_cuisines_div").show();
                            } else {
                                $("#fb_type_id").select2({
                                    placeholder: "{{ __('page_labels.select') }}",
                                    maximumSelectionLength: 3,
                                    tokenSeparators: [','],
                                });
                                $("#fb_other_cuisines_div").hide();
                            }
                        });
                    } else {
                        $("#fb_other_cuisines_div").hide();
                    }
                    $(this).valid();
                });

                $("#fb_offer_type_id").select2({
                    placeholder: "{{ __('page_labels.select') }}",
                    maximumSelectionLength: 3,
                    tokenSeparators: [','],
                }).on('change', function(e) {
                    if ($('#fb_offer_type_id').val() != "") {
                        $('#fb_offer_type_id').on("select2:select", function(e) {
                            var otherFbOfferTypet = 0;
                            $.each($(this).find(":selected"), function(i, item) {
                                if ($(item).val() == 12) {
                                    otherFbOfferTypet = 1;
                                }
                            });
                            if (otherFbOfferTypet == 1) {
                                $("#fb_offer_type_id").val(12).trigger('change');
                                $("#fb_offer_type_id").select2({
                                    maximumSelectionLength: 1,
                                    tokenSeparators: [','],
                                    language: {
                                        maximumSelected: function(e) {
                                            var t = "You can only select " + e.maximum +
                                                " item";
                                            e.maximum != 1 && (t += "s");
                                            return t + ' when you clik Others';
                                        }
                                    }
                                });
                                $("#fb_other_div").show();
                            } else {
                                $("#fb_offer_type_id").select2({
                                    placeholder: "{{ __('page_labels.select') }}",
                                    maximumSelectionLength: 3,
                                    tokenSeparators: [','],
                                });
                                $("#fb_other_div").hide();
                            }
                        });
                    } else {
                        $("#fb_other_div").hide();
                    }
                    $(this).valid();

                });

                var company_activity_type_id = {!! json_encode(old('company_activity_type_id')) !!}

                if (company_activity_type_id != null && company_activity_type_id.length != 0) {
                    $("#company_activity_type_id").val(company_activity_type_id).trigger('change');
                    $("#company_activity_type_id").select2({
                        maximumSelectionLength: 3,
                        tokenSeparators: [','],
                    });
                }
                var ktcc_id = "{!! old('ktcc_id') !!}"
                if (ktcc_id == 1) {
                    $("#ktcc_div").hide();
                } else if (ktcc_id == "") {
                    $("#ktcc_div").hide();
                } else {
                    $("#ktcc_div").show();
                }

                var central_kitchen_id = "{!! old('central_kitchen_id') !!}"
                if (central_kitchen_id == 1) {
                    $("#cetral_kitchen_div").show();
                } else {
                    $("#cetral_kitchen_div").hide();
                }

                var fb_type_id = {!! json_encode(old('fb_type_id')) !!}
                if (fb_type_id != null && fb_type_id.length != 0) {
                    var fb_type_idotherText = 0;
                    $.each(fb_type_id, function(index, item) {

                        if (item == 19) {
                            fb_type_idotherText = 1;
                        }
                    });
                    if (fb_type_idotherText == 1) {
                        $("#fb_type_id").val(fb_type_id).trigger('change');
                        $("#fb_type_id").select2({
                            maximumSelectionLength: 1,
                            language: {
                                maximumSelected: function(e) {
                                    var t = "You can only select " + e.maximum + " item";
                                    e.maximum != 1 && (t += "s");
                                    return t + ' when you clik Others';
                                }
                            }
                        });
                        $("#fb_other_cuisines_div").show();
                    } else {
                        $("#fb_type_id").val(fb_type_id).trigger('change');
                        $("#fb_type_id").select2({
                            maximumSelectionLength: 3,
                            tokenSeparators: [','],
                        });
                        $("#fb_other_cuisines_div").hide();
                    }
                }

                var fb_offer_type_id = {!! json_encode(old('fb_offer_type_id')) !!}
                if (fb_offer_type_id != null && fb_offer_type_id.length != 0) {
                    var fb_offer_otherText = 0;
                    $.each(fb_offer_type_id, function(index, item) {
                        if (item == 12) {
                            fb_offer_otherText = 1;
                        }
                    });
                    if (fb_offer_otherText == 1) {
                        $("#fb_offer_type_id").val(12).trigger('change');
                        $("#fb_offer_type_id").select2({
                            maximumSelectionLength: 1,
                            tokenSeparators: [','],
                            language: {
                                maximumSelected: function(e) {
                                    var t = "You can only select " + e.maximum +
                                        " item";
                                    e.maximum != 1 && (t += "s");
                                    return t + ' when you clik Others';
                                }
                            }
                        });
                        $("#fb_other_div").show();
                    } else {
                        $("#fb_offer_type_id").val(fb_offer_type_id).trigger('change');
                        $("#fb_offer_type_id").select2({
                            placeholder: "{{ __('page_labels.select') }}",
                            maximumSelectionLength: 3,
                            tokenSeparators: [','],
                        });
                        $("#fb_other_div").hide();
                    }
                }


            });
        </script>
        <script>
            // $('#company_activity_type_id').on('change', function() {
            //     if (this.value == 6) {
            //         $("#existing_branch_div").hide();
            //         $('#home_business_upload_div').show();
            //         $("#commericial_upload_div").hide();
            //     } else if (this.value == "") {
            //         $("#existing_branch_div").hide();
            //         $('#home_business_upload_div').hide();
            //         $("#commericial_upload_div").hide();
            //     } else {
            //         $("#existing_branch_div").show();
            //         $('#home_business_upload_div').hide();
            //         $("#commericial_upload_div").show();
            //     }
            // });
            $('#ktcc_id').on('change', function() {
                if (this.value == 1) {
                    $("#ktcc_div").hide();
                } else if (this.value == "") {
                    $("#ktcc_div").hide();
                } else {
                    if (this.value == 2) {
                        $("#specify_ktcc_label").text("{{ __('page_labels.kiosk_specify_label') }}");
                        $("#ktcc_image_label").text("{{ __('page_labels.kiosk_image_label') }}");
                    } else if (this.value == 3) {
                        $("#specify_ktcc_label").text("{{ __('page_labels.truck_specify_label') }}");
                        $("#ktcc_image_label").text("{{ __('page_labels.truck_image_label') }}");
                    } else if (this.value == 4) {
                        $("#specify_ktcc_label").text("{{ __('page_labels.cart_specify_label') }}");
                        $("#ktcc_image_label").text("{{ __('page_labels.cart_image_label') }}");
                    } else if (this.value == 5) {
                        $("#specify_ktcc_label").text("{{ __('page_labels.container_specify_label') }}");
                        $("#ktcc_image_label").text("{{ __('page_labels.container_image_label') }}");
                    } else if (this.value == 6) {
                        $("#specify_ktcc_label").text("{{ __('page_labels.caravan_specify_label') }}");
                        $("#ktcc_image_label").text("{{ __('page_labels.caravan_image_label') }}");
                    }
                    $("#ktcc_div").show();
                }
            });

            $('#central_kitchen_id').on('change', function() {
                if (this.value == 1) {
                    $("#cetral_kitchen_div").show();
                } else {
                    $("#cetral_kitchen_div").hide();
                }
            });




            // $('#fb_offer_type_id').on('change', function() {
            //     if (this.value == 12) {
            //         $("#fb_other_div").show();
            //     } else {
            //         $("#fb_other_div").hide();
            //     }
            // });
        </script>

        <script>
            $().ready(function() {

                // jQuery.validator.addMethod("emailExt", function(value, element, param) {
                //     return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
                // }, "{{ __('jq_validation.invalid_email') }}");

                // $.validator.addMethod('numericOnly', function(value) {
                //     return /^[0-9]+$/.test(value);
                // }, "{{ __('jq_validation.phone_number_integer') }}");


                $.validator.addMethod('filesizekb', function(value, element, param) {
                    return this.optional(element) || (element.files[0].size <= param)
                }, "{{ __('jq_validation.file_size_kb') }}");

                $.validator.addMethod('filesizemb', function(value, element, param) {
                    return this.optional(element) || (element.files[0].size <= param * 1000000)
                }, "{{ __('jq_validation.file_size_mb') }}");

                $('#userApplicationForm').validate({
                    rules: {
                        first_name: {
                            required: true
                        },
                        last_name: {
                            required: true
                        },
                        // email: {
                        //     required: true,
                        //     emailExt: true
                        // },
                        // phone_number: {
                        //     required: true,
                        //     numericOnly: true
                        // },
                        year_of_experience_id: {
                            required: true
                        },
                        'company_activity_type_id[]': {
                            required: true
                        },
                        'fb_type_id[]': {
                            required: true
                        },
                        concept_name: {
                            required: true,
                        },
                        unit_type_id: {
                            required: true,
                        },
                        description: {
                            required: true,
                        },
                        number_of_employee_id: {
                            required: true,
                        },
                        ktcc_id: {
                            required: true,
                        },
                        central_kitchen_id: {
                            required: true,
                        },
                        company_profile: {
                            required: true,
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizemb: 10,
                        },
                        owner_partners_qid: {
                            required: true,
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        declaration: {
                            required: true
                        },
                        home_business_license: {
                            required: {
                                depends: function(element) {
                                    return $("#company_activity_type_id option:selected").val() == 6;
                                }
                            },
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        commercial_document: {
                            required: {
                                depends: function(element) {
                                    // return $("#company_activity_type_id option:selected").val() != 6 && $(
                                    //     "#company_activity_type_id option:selected").val() != "";
                                    return $("#company_activity_type_id option:selected").val() != 6
                                }
                            },
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        trade_license: {
                            required: {
                                depends: function(element) {
                                    // return $("#company_activity_type_id option:selected").val() != 6 && $(
                                    //     "#company_activity_type_id option:selected").val() != "";
                                    return $("#company_activity_type_id option:selected").val() != 6
                                }
                            },
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        company_computer_card: {
                            required: {
                                depends: function(element) {
                                    // return $("#company_activity_type_id option:selected").val() != 6 && $(
                                    //     "#company_activity_type_id option:selected").val() != "";
                                    return $("#company_activity_type_id option:selected").val() != 6
                                }
                            }
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        existing_branche_id: {
                            required: {
                                depends: function(element) {
                                    // return $("#company_activity_type_id option:selected").val() != 6 && $(
                                    //     "#company_activity_type_id option:selected").val() != "";
                                    return $("#company_activity_type_id option:selected").val() != 6
                                }
                            }
                        },
                        specify_ktcc: {
                            required: {
                                depends: function(element) {
                                    return $("#ktcc_id option:selected").val() != 1 && $(
                                        "#ktcc_id option:selected").val() != "";
                                }
                            }
                        },
                        ktcc_image: {
                            required: {
                                depends: function(element) {
                                    return $("#ktcc_id option:selected").val() != 1 && $(
                                        "#ktcc_id option:selected").val() != "";
                                }
                            },
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        kitchen_footprint_area_id: {
                            required: {
                                depends: function(element) {
                                    return $("#central_kitchen_id option:selected").val() == 1;
                                }
                            }
                        },
                        'fb_offer_type_id[]': {
                            required: true
                        },
                        other_type: {
                            required: {
                                depends: function(element) {
                                    return $("#fb_offer_type_id option:selected").val() == 12;
                                }
                            }
                        },
                        other_cuisine_type: {
                            required: {
                                depends: function(element) {
                                    return $("#fb_type_id option:selected").val() == 19;
                                }
                            }
                        }
                    },
                    messages: {
                        first_name: {
                            required: "{{ __('jq_validation.first_name') }}",
                        },
                        last_name: {
                            required: "{{ __('jq_validation.last_name') }}",
                        },
                        // email: {
                        //     required: "{{ __('jq_validation.email') }}",
                        //     emailExt: "{{ __('jq_validation.invalid_email') }}"
                        // },
                        // phone_number: {
                        //     required: "{{ __('jq_validation.phone_number') }}",
                        // },
                        year_of_experience_id: {
                            required: "{{ __('jq_validation.year_of_experience') }}",
                        },
                        'company_activity_type_id[]': {
                            required: "{{ __('jq_validation.company_activity_type') }}",
                        },
                        'fb_type_id[]': {
                            required: "{{ __('jq_validation.fb_type') }}",
                        },
                        concept_name: {
                            required: "{{ __('jq_validation.concept_name') }}",
                        },
                        unit_type_id: {
                            required: "{{ __('jq_validation.unit_type') }}",
                        },
                        description: {
                            required: "{{ __('jq_validation.description') }}",
                        },
                        number_of_employee_id: {
                            required: "{{ __('jq_validation.number_of_employee') }}",
                        },
                        ktcc_id: {
                            required: "{{ __('jq_validation.ktcc') }}",
                        },
                        central_kitchen_id: {
                            required: "{{ __('jq_validation.central_kitchen') }}",
                        },
                        company_profile: {
                            required: "{{ __('jq_validation.company_profile') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        owner_partners_qid: {
                            required: "{{ __('jq_validation.qid') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        declaration: {
                            required: "{{ __('jq_validation.declaration') }}",
                        },
                        home_business_license: {
                            required: "{{ __('jq_validation.home_business_license') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        commercial_document: {
                            required: "{{ __('jq_validation.commercial_document') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        trade_license: {
                            required: "{{ __('jq_validation.trade_license') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        company_computer_card: {
                            required: "{{ __('jq_validation.company_computer_card') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        existing_branche_id: {
                            required: "{{ __('jq_validation.existing_branche') }}",
                        },
                        specify_ktcc: {
                            required: "{{ __('jq_validation.specify_ktcc') }}",
                        },
                        ktcc_image: {
                            required: "{{ __('jq_validation.ktcc_image') }}",
                            extension: "{{ __('jq_validation.valid_extension') }}",
                        },
                        kitchen_footprint_area_id: {
                            required: "{{ __('jq_validation.kitchen_footprint_area') }}",
                        },
                        'fb_offer_type_id[]': {
                            required: "{{ __('jq_validation.fb_offer_type') }}",
                        },
                        other_type: {
                            required: "{{ __('jq_validation.other_type') }}",
                        },
                        other_cuisine_type: {
                            required: "{{ __('jq_validation.other_type') }}",
                        },

                    },
                    submitHandler: function(form) {
                        form.submit();
                    }

                    // any other options and/or rules
                });
            });
        </script>
    @endpush
@endsection
