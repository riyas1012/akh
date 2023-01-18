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
        </style>
    @endpush
    <div align="center" class="bg1">
        <div class="container">
            <div class="row" style="float: right;margin-bottom:50px;">
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
                    href="{{ route('logout') }}" title="Logout">Logout</a>
            </div>
            <div class="row" style="margin-bottom:50px;">

            </div>
            <div class="col-md-12" style="text-align: center;">
                <img src="{{ asset('assets/images/logo.png') }}" style="text-align: center; height: 218px;width:175px;">
            </div><br>
            <div class="col-md-12" style="text-align: center;">
                <h2>{{ __('page_labels.retail') }}</h2>
            </div>
            <div class="col-md-12" style="text-align: center;">
                <h3>{{ __('page_labels.application') }}</h3>
            </div>
            <div class="card  col-md-10 login-card" style="background-color: transparent !important;">
                <div class="card-body">
                    <div class="messages">
                        @if (count($errors) > 0)
                            <div class="alert alert-danger">
                                <ul style="text-align: left;">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        @if (session('success'))
                            <div class="alert alert-success">
                                <ul style="text-align: left;">
                                    <li>{{ session('success') }}</li>
                                </ul>
                            </div>
                        @endif
                    </div>
                    <div id="login" align="center">
                        <form class="form-horizontal" action="{{ route('retail.application.submit') }}"
                            method="post" name="userApplicationForm" id="userApplicationForm"
                            enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <fieldset>
                                <div class="row mt-3">
                                    <label class="floating-label label-required">{{ __('page_labels.unique_id') }}</label>
                                    <br>
                                    <input type="text" class="form-control" name="application_number"
                                        id="application_number" value="{{ session()->get('application_number') }}"
                                        autocomplete="off" readonly
                                        style="width: 150px;display: block;margin-right: auto;margin-left: auto;text-align: center;">
                                </div>
                            </fieldset>
                            <fieldset>
                                <!-- First & Last Name -->
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.first_name') }}</label>
                                        <input type="text" class="form-control" name="first_name" id="first_name"
                                            value="{{ $user->first_name }}" autocomplete="off" disabled>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.surname') }}</label>
                                        <input type="text" class="form-control" name="last_name" id="last_name"
                                            value="{{ $user->last_name }}" autocomplete="off" disabled>
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
                                            class="floating-label label-required">{{ __('page_labels.years_of_experience') }}</label>
                                        <select name="year_of_experience_id" id="year_of_experience_id" class="form-control"
                                            style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($years_of_experiences as $yearsItem)
                                                <option value="{{ $yearsItem->id }}"
                                                    @if (old('year_of_experience_id') == $yearsItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $yearsItem->arabic : $yearsItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.company_activity_type') }}</label>
                                        <select name="company_activity_type_id" id="company_activity_type_id"
                                            class="form-control" style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($company_activity_type as $companyActivityItem)
                                                <option value="{{ $companyActivityItem->id }}"
                                                    @if (old('company_activity_type_id') == $companyActivityItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $companyActivityItem->arabic : $companyActivityItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset id="existing_branch_div" style="display: none;">
                                <div class="row mt-3">
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
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.retail_types') }}</label>
                                        <select name="retail_type_id" id="retail_type_id" class="form-control"
                                            style="padding: 0px;">
                                            <option value="">{{ __('page_labels.select') }}</option>
                                            @foreach ($retail_types as $retailTypesItem)
                                                <option value="{{ $retailTypesItem->id }}"
                                                    @if (old('fb_type_id') == $retailTypesItem->id) selected @endif>
                                                    {{ session()->get('locale') == 'ar' ? $retailTypesItem->arabic : $retailTypesItem->english }}
                                                </option>
                                            @endforeach
                                        </select>
                                    </div>
                                    <div class="col-md-4" id="retail_other_div" style="display:none;">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.other_type') }}</label>
                                        <input type="text" class="form-control" name="other_type"
                                            id="other_type" value="{{ old('other_type') }}"
                                            placeholder="{{ __('page_labels.other_type') }}" autocomplete="off">
                                    </div>
                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <div class="col-md-4">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.concept_name') }}</label>
                                        <input type="text" class="form-control" name="concept_name" id="concept_name"
                                            value="{{ old('concept_name') }}"
                                            placeholder="{{ __('page_labels.concept_name') }}" autocomplete="off">
                                    </div>
                                    <div class="col-md-4">
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
                                            class="floating-label label-required">{{ __('page_labels.retail_existing_ktcc') }}</label>
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
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.specify_footprint') }}</label>
                                        <input type="text" name="specify_ktcc" id="specify_ktcc"
                                            value="{{ old('specify_ktcc') }}" class="form-control">
                                    </div>
                                    <div class="col-md-6">
                                        <label
                                            class="floating-label label-required">{{ __('page_labels.attach_kiosk') }}</label>
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
                            <fieldset id="commericial_upload_div" style="display: none;">
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

                                    <label class="floating-label"><input type="checkbox" value="Yes"
                                            @if (old('declaration') == 'Yes') checked @endif name="declaration"
                                            id="declaration"> {{ __('page_labels.declaration_subtitle') }}</label>
                                    <br>
                                    <label id="declaration-error" class="error" for="declaration"></label>

                                </div>
                            </fieldset>
                            <fieldset>
                                <div class="row mt-3">
                                    <button type="submit" class="btn btn-primary"
                                        style="display: block;margin-right: auto;margin-left: auto;text-align: center;">Submit</button>
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
                var company_activity_type_id = "{!! old('company_activity_type_id') !!}"
                if (company_activity_type_id == 6) {
                    $("#existing_branch_div").hide();
                    $('#home_business_upload_div').show();
                    $("#commericial_upload_div").hide();
                } else if (company_activity_type_id == "") {
                    $("#existing_branch_div").hide();
                    $('#home_business_upload_div').hide();
                    $("#commericial_upload_div").hide();
                } else {
                    $("#existing_branch_div").show();
                    $('#home_business_upload_div').hide();
                    $("#commericial_upload_div").show();
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

                var retail_type_id = "{!! old('retail_type_id') !!}"

                if (retail_type_id == 13) {
                    $("#retail_other_div").show();
                } else {
                    $("#retail_other_div").hide();
                }


            });
        </script>
        <script>
            $('#company_activity_type_id').on('change', function() {
                if (this.value == 6) {
                    $("#existing_branch_div").hide();
                    $('#home_business_upload_div').show();
                    $("#commericial_upload_div").hide();
                } else if (this.value == "") {
                    $("#existing_branch_div").hide();
                    $('#home_business_upload_div').hide();
                    $("#commericial_upload_div").hide();
                } else {
                    $("#existing_branch_div").show();
                    $('#home_business_upload_div').hide();
                    $("#commericial_upload_div").show();
                }
            });
            $('#ktcc_id').on('change', function() {
                if (this.value == 1) {
                    $("#ktcc_div").hide();
                } else if (this.value == "") {
                    $("#ktcc_div").hide();
                } else {
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

            $('#retail_type_id').on('change', function() {
                if (this.value == 13) {
                    $("#retail_other_div").show();
                } else {
                    $("#retail_other_div").hide();
                }
            });
        </script>

        <script>
            $().ready(function() {
                $('#userApplicationForm').validate({
                    rules: {
                        year_of_experience_id: {
                            required: true
                        },
                        company_activity_type_id: {
                            required: true
                        },
                        retail_type_id: {
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
                        },
                        owner_partners_qid: {
                            required: true,
                        },
                        declaration: {
                            required: true
                        },
                        home_business_license: {
                            required: {
                                depends: function(element) {
                                    return $("#company_activity_type_id option:selected").val() == 6;
                                }
                            }
                        },
                        commercial_document: {
                            required: {
                                depends: function(element) {
                                    return $("#company_activity_type_id option:selected").val() != 6 && $(
                                        "#company_activity_type_id option:selected").val() != "";
                                }
                            }
                        },
                        trade_license: {
                            required: {
                                depends: function(element) {
                                    return $("#company_activity_type_id option:selected").val() != 6 && $(
                                        "#company_activity_type_id option:selected").val() != "";
                                }
                            }
                        },
                        company_computer_card: {
                            required: {
                                depends: function(element) {
                                    return $("#company_activity_type_id option:selected").val() != 6 && $(
                                        "#company_activity_type_id option:selected").val() != "";
                                }
                            }
                        },
                        existing_branche_id: {
                            required: {
                                depends: function(element) {
                                    return $("#company_activity_type_id option:selected").val() != 6 && $(
                                        "#company_activity_type_id option:selected").val() != "";
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
                            }
                        },
                        kitchen_footprint_area_id: {
                            required: {
                                depends: function(element) {
                                    return $("#central_kitchen_id option:selected").val() == 1;
                                }
                            }
                        },
                        other_type: {
                            required: {
                                depends: function(element) {
                                    return $("#retail_type_id option:selected").val() == 13;
                                }
                            }
                        }
                    },
                    messages: {
                        year_of_experience_id: {
                            required: "{{ __('jq_validation.year_of_experience') }}",
                        },
                        company_activity_type_id: {
                            required: "{{ __('jq_validation.company_activity_type') }}",
                        },
                        retail_type_id: {
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
                        },
                        owner_partners_qid: {
                            required: "{{ __('jq_validation.qid') }}",
                        },
                        declaration: {
                            required: "{{ __('jq_validation.declaration') }}",
                        },
                        home_business_license: {
                            required: "{{ __('jq_validation.home_business_license') }}",
                        },
                        commercial_document: {
                            required: "{{ __('jq_validation.commercial_document') }}",
                        },
                        trade_license: {
                            required: "{{ __('jq_validation.trade_license') }}",
                        },
                        company_computer_card: {
                            required: "{{ __('jq_validation.company_computer_card') }}",
                        },
                        existing_branche_id: {
                            required: "{{ __('jq_validation.existing_branche') }}",
                        },
                        specify_ktcc: {
                            required: "{{ __('jq_validation.specify_ktcc') }}",
                        },
                        ktcc_image: {
                            required: "{{ __('jq_validation.ktcc_image') }}",
                        },
                        kitchen_footprint_area_id: {
                            required: "{{ __('jq_validation.kitchen_footprint_area') }}",
                        },
                        other_type: {
                            required: "{{ __('jq_validation.other_type') }}",
                        }

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
