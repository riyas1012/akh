@extends('layouts.admin.app')

@section('content')
    @push('stylesheet')
        <style>
            .error {
                color: red;
            }

            textarea {
                resize: none;
            }
        </style>
    @endpush
    @include('layouts.admin.header')

    <div class="container" style="padding: 30px 0px;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 50px;
                    padding: 5px;margin-bottom: 20px;">
                        <div class="row">
                            <div class="col-md-6">
                                <h4>Application Details</h4>
                            </div>
                            <div class="col-md-6">
                                <a href="{{ route('admin.applications') }}" class="btn pull-right"
                                    style="background-color: goldenrod !important;color:white;">
                                    All Applications
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
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
                        <div id="login" style="margin: auto;">
                            <form class="form-horizontal"
                                action="{{ route('admin.applications.details.edit', ['application_number' => $application_number]) }}"
                                method="post" name="editForm" id="editForm" enctype="multipart/form-data">
                                {{ csrf_field() }}
                                <table id="application_datatable" class="table table-striped table-bordered"
                                    style="margin-top:60px;border-collapse: separate;
                            border-spacing: 0 15px;">
                                    <thead>
                                        <tr>
                                            <th colspan="3" style="text-align: center;">
                                                Application Form
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Application number
                                            </td>
                                            <td colspan="2">
                                                {{ $application->application_number }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Applicant Username
                                            </td>
                                            <td colspan="2">
                                                {{ $application->first_name }} / {{ $application->surname }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Applicant Email
                                            </td>
                                            <td colspan="2">
                                                {{ $application->users->email }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Phone Number
                                            </td>
                                            <td colspan="2">
                                                {{ $application->users->phone_number }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Submission Date
                                            </td>
                                            <td colspan="2">
                                                {{ \Carbon\Carbon::parse($application->created_at)->format('d-m-Y') }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Concept Name
                                            </td>
                                            <td colspan="2">
                                                {{ $application->concept_name }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Company activity type
                                            </td>
                                            <td colspan="2">
                                                @if ($application->company_activity_type_id != null)
                                                    {{ $application->company_activity_type->english }}
                                                @else
                                                    @php
                                                        $company_activity_array = [];
                                                    @endphp
                                                    @foreach ($application->other_options->where('option_name', 'company_activity_type') as $item)
                                                        @php
                                                            array_push($company_activity_array, $item->company_activity_types->english);
                                                        @endphp
                                                    @endforeach
                                                    @php
                                                        $company_activity_name = implode(',', $company_activity_array);
                                                    @endphp
                                                    {{ $company_activity_name }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                F&B Cuisine Type
                                            </td>
                                            <td colspan="2">
                                                @if ($application->fb_type_id != null)
                                                    {{ $application->fb_types->english }}
                                                @else
                                                    @php
                                                        $fb_type_array = [];
                                                    @endphp
                                                    @foreach ($application->other_options->where('option_name', 'fb_type') as $item)
                                                        @php
                                                            array_push($fb_type_array, $item->fb_types->english);
                                                        @endphp
                                                    @endforeach
                                                    @php
                                                        $fb_type_name = implode(',', $fb_type_array);
                                                    @endphp
                                                    {{ $fb_type_name }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Other Cusine Type
                                            </td>
                                            <td colspan="2">
                                                @if ($application->other_fb_cousine != null)
                                                    {{ $application->other_fb_cousine }}
                                                @else
                                                    -
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                F&B Offering Type
                                            </td>
                                            <td colspan="2">
                                                @if ($application->fb_offer_type_id != null)
                                                    {{ $application->fb_offer_types->english }}
                                                @else
                                                    @php
                                                        $fb_offer_type_array = [];
                                                    @endphp
                                                    @foreach ($application->other_options->where('option_name', 'fb_offer_type') as $item)
                                                        @php
                                                            array_push($fb_offer_type_array, $item->fb_offer_types->english);
                                                        @endphp
                                                    @endforeach
                                                    @php
                                                        $fb_offer_type_name = implode(',', $fb_offer_type_array);
                                                    @endphp
                                                    {{ $fb_offer_type_name }}
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Other Offering Type
                                            </td>
                                            <td colspan="2">
                                                @if ($application->other_type != null)
                                                    {{ $application->other_type }}
                                                @else
                                                    -
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {{ __('email.existing_branches') }}
                                            </td>
                                            <td colspan="2">
                                                @if ($application->existing_branche_id != null)
                                                    {{ $application->existing_branches->english }}
                                                @else
                                                    -
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Breif branches
                                            </td>
                                            <td colspan="2">
                                                {{ $application->description }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Years of experience in the local market
                                            </td>
                                            <td colspan="2">
                                                {{ $application->year_of_experience->english }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Type of unit required
                                            </td>
                                            <td colspan="2">
                                                {{ $application->unit_type->english }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Existing F&B kiosk/Food truck/cart/container/Caravan / Trolley
                                            </td>
                                            <td colspan="2">
                                                {{ $application->ktcc->english }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Footprint required for kiosk/food truck/cart/container/caravan/Trolley
                                            </td>
                                            <td colspan="2">
                                                {{ $application->specify_ktcc }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Existing operational central kitchen
                                            </td>
                                            <td colspan="2">
                                                {{ $application->central_kitchen->english }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Available number of employees with valid health certificates
                                            </td>
                                            <td colspan="2">
                                                {{ $application->number_of_employess->english }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Concept Presentation
                                            </td>
                                            <td>
                                                <a
                                                    href="{{ config('global.user_url') . '/downoad-document/companyprofile' . '/' . $application->application_number }}">
                                                    Download Document
                                                </a>
                                            </td>
                                            <td>
                                                <fieldset>


                                                    <input type="file" name="company_profile" id="company_profile"
                                                        class="form-control">
                                                </fieldset>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Existing Kiosk/Cart/Truck/Caravan/Trolley/Container image
                                            </td>
                                            <td>
                                                @if ($application->ktcc_image_path == null)
                                                    -
                                                @else
                                                    <a
                                                        href="{{ config('global.user_url') . '/downoad-document/ktccimage' . '/' . $application->application_number }}">
                                                        Download Document
                                                    </a>
                                                @endif
                                            </td>
                                            <td>
                                                @if ($application->ktcc_image_path == null)
                                                    -
                                                @else
                                                    <fieldset>
                                                        <input type="file" name="ktcc_image" id="ktcc_image"
                                                            class="form-control">
                                                    </fieldset>
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Commercial Registration
                                            </td>
                                            <td>

                                                @if ($application->commercial_documnet_path == null)
                                                    -
                                                @else
                                                    <a
                                                        href="{{ config('global.user_url') . '/downoad-document/commercial' . '/' . $application->application_number }}">
                                                        Download Document
                                                    </a>
                                                @endif
                                            </td>
                                            <td>
                                                @if ($application->commercial_documnet_path == null)
                                                    -
                                                @else
                                                    <fieldset>
                                                        <input type="file" name="commercial_document"
                                                            id="commercial_document" class="form-control">
                                                    </fieldset>
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Trade License
                                            </td>
                                            <td>
                                                @if ($application->trade_licence_doc_path == null)
                                                    -
                                                @else
                                                    <a
                                                        href="{{ config('global.user_url') . '/downoad-document/trade' . '/' . $application->application_number }}">
                                                        Download Document
                                                    </a>
                                                @endif
                                            </td>
                                            <td>
                                                @if ($application->trade_licence_doc_path == null)
                                                    -
                                                @else
                                                    <fieldset>
                                                        <input type="file" name="trade_license" id="trade_license"
                                                            class="form-control">
                                                    </fieldset>
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Computer Card
                                            </td>
                                            <td>
                                                @if ($application->company_card_doc_path == null)
                                                    -
                                                @else
                                                    <a
                                                        href="{{ config('global.user_url') . '/downoad-document/computercard' . '/' . $application->application_number }}">
                                                        Download Document
                                                    </a>
                                                @endif
                                            </td>
                                            <td>
                                                @if ($application->company_card_doc_path == null)
                                                    -
                                                @else
                                                    <fieldset>
                                                        <input type="file" name="company_computer_card"
                                                            id="company_computer_card" class="form-control">
                                                    </fieldset>
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                QID
                                            </td>
                                            <td>
                                                @if ($application->qid_path == null)
                                                    -
                                                @else
                                                    <a
                                                        href="{{ config('global.user_url') . '/downoad-document/qid' . '/' . $application->application_number }}">
                                                        Download Document
                                                    </a>
                                                @endif
                                            </td>
                                            <td>
                                                @if ($application->qid_path == null)
                                                    -
                                                @else
                                                    <fieldset>
                                                        <input type="file" name="owner_partners_qid"
                                                            id="owner_partners_qid" class="form-control">
                                                    </fieldset>
                                                @endif
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style="text-align: center;color:red;">
                                                <h4>For Admin use only</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Score
                                            </td>
                                            <td colspan="2">
                                                <select name="score" id="score" class="form-control"
                                                    style="width: 250px;">
                                                    @for ($i = 1; $i <= 100; $i++)
                                                        <option value={{ $i }}
                                                            @if ($application->score == $i) selected @endif>
                                                            {{ $i }}</option>
                                                    @endfor
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Status
                                            </td>
                                            <td colspan="2">
                                                <select name="status" id="status" class="form-control"
                                                    style="width: 250px;">
                                                    <option value="Submitted"
                                                        @if ($application->status == 'Submitted') selected @endif>Submitted
                                                    </option>
                                                    <option value="Under Review"
                                                        @if ($application->status == 'Under Review') selected @endif>Under Review
                                                    </option>
                                                    <option value="Shortlisted"
                                                        @if ($application->status == 'Shortlisted') selected @endif>Shortlisted
                                                    </option>
                                                    <option value="Approved"
                                                        @if ($application->status == 'Approved') selected @endif>Approved
                                                    </option>
                                                    <option value="Rejected"
                                                        @if ($application->status == 'Rejected') selected @endif>Rejected</option>
                                                    <option value="Need more information"
                                                        @if ($application->status == 'Need more information') selected @endif>Need more
                                                        information</option>
                                                </select>
                                            </td>
                                            {{-- <td>
                                                <fieldset id="reason_field" style="display: none;">

                                                    <input type="text" class="form-control" name="reason"
                                                        id="reason" placeholder="Reason" value="{{ old('reason') }}"
                                                        autocomplete="off" style="border: 1px solid;">

                                                </fieldset>
                                            </td> --}}
                                        </tr>
                                        <tr id="english_tr" style="display:none;">
                                            <td>
                                                Mail Message English
                                            </td>
                                            <td colspan="2">
                                                <fieldset id="approved_fieldset_en">
                                                    <textarea name="approved_message_en" id="approved_message_en" cols="60" rows="10">Congratulations! you have completed the first step and your application has been shortlisted for final admission.</textarea>
                                                </fieldset>
                                                <fieldset id="need_more_info_fieldset_en">
                                                    <textarea name="need_more_info_en" id="need_more_info_en" cols="60" rows="10">Thank you for submitting your application; you are few steps away from completing your application; please resubmit the following:</textarea>
                                                </fieldset>
                                                <fieldset id="rejected_fieldset_en">
                                                    <textarea name="rejected_en" id="rejected_en" cols="60" rows="10">Thank you for submitting your application; unfortunately, your application was unsuccessful.</textarea>
                                                </fieldset>
                                            </td>
                                        </tr>
                                        <tr id="arabic_tr" style="display:none;">
                                            <td>
                                                Mail Message Arabic
                                            </td>
                                            <td colspan="2">
                                                <fieldset id="approved_fieldset_ar">
                                                    <textarea dir="rtl" name="approved_message_ar" id="approved_message_ar" cols="60" rows="10">تهانينا! لقد أكملت الخطوة الأولى بنجاح وتم إدراج طلبك ضمن اللائحة النهائية المرجحة للقبول.</textarea>
                                                </fieldset>
                                                <fieldset id="need_more_info_fieldset_ar">
                                                    <textarea dir="rtl" name="need_more_info_ar" id="need_more_info_ar" cols="60" rows="10">شكرا لك على تقديم طلبك ؛ أنت على بعد خطوات قليلة من إكمال طلبك ؛ الرجاء إعادة إرسال ما يلي:</textarea>
                                                </fieldset>
                                                <fieldset id="rejected_fieldset_ar">
                                                    <textarea dir="rtl" name="rejected_ar" id="rejected_ar" cols="60" rows="10">شكرا لك على تقديم طلبك ؛ عذراً ، لم يتم إدراج طلبك ضمن اللائحة النهائية.</textarea>
                                                </fieldset>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style="text-align: center">
                                                <fieldset>
                                                    <button type="submit" class="btn btn-primary"
                                                        style="background: goldenrod !important;margin:auto;">
                                                        Update</button>
                                                </fieldset>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script>
            $(document).ready(function() {
                var status = {!! json_encode($application->status) !!}
                if (status == "Rejected" || this.value == 'Need more information' || this.value == "Approved") {
                    $('#english_tr').show();
                    $('#arabic_tr').show();
                    if (status == "Rejected") {
                        $("#rejected_fieldset_en").show();
                        $("#rejected_fieldset_ar").show();
                        $("#approved_fieldset_en").hide();
                        $("#approved_fieldset_ar").hide();
                        $("#need_more_info_fieldset_en").hide();
                        $("#need_more_info_fieldset_ar").hide();
                    } else if (status == "Need more information") {
                        $("#rejected_fieldset_en").hide();
                        $("#rejected_fieldset_ar").hide();
                        $("#approved_fieldset_en").hide();
                        $("#approved_fieldset_ar").hide();
                        $("#need_more_info_fieldset_en").show();
                        $("#need_more_info_fieldset_ar").show();
                    } else if (status == "Approved") {
                        $("#rejected_fieldset_en").hide();
                        $("#rejected_fieldset_ar").hide();
                        $("#approved_fieldset_en").show();
                        $("#approved_fieldset_ar").show();
                        $("#need_more_info_fieldset_en").hide();
                        $("#need_more_info_fieldset_ar").hide();
                    } else {
                        $('#english_tr').hide();
                        $('#arabic_tr').hide();
                        $("#rejected_fieldset_en").hide();
                        $("#rejected_fieldset_ar").hide();
                        $("#approved_fieldset_en").hide();
                        $("#approved_fieldset_ar").hide();
                        $("#need_more_info_fieldset_en").hide();
                        $("#need_more_info_fieldset_ar").hide();
                    }
                }
            });
        </script>
        <script>
            $('#status').on('change', function() {
                // if (this.value == "Rejected" || this.value == 'Need more information') {
                //     $('#reason_field').show();
                // } else {
                //     $('#reason_field').hide();
                // }
                if (this.value == "Rejected" || this.value == 'Need more information' || this.value == "Approved") {
                    $('#english_tr').show();
                    $('#arabic_tr').show();
                    if (this.value == "Rejected") {
                        $("#rejected_fieldset_en").show();
                        $("#rejected_fieldset_ar").show();
                        $("#approved_fieldset_en").hide();
                        $("#approved_fieldset_ar").hide();
                        $("#need_more_info_fieldset_en").hide();
                        $("#need_more_info_fieldset_ar").hide();
                    } else if (this.value == "Need more information") {
                        $("#rejected_fieldset_en").hide();
                        $("#rejected_fieldset_ar").hide();
                        $("#approved_fieldset_en").hide();
                        $("#approved_fieldset_ar").hide();
                        $("#need_more_info_fieldset_en").show();
                        $("#need_more_info_fieldset_ar").show();
                    } else if (this.value == "Approved") {
                        $("#rejected_fieldset_en").hide();
                        $("#rejected_fieldset_ar").hide();
                        $("#approved_fieldset_en").show();
                        $("#approved_fieldset_ar").show();
                        $("#need_more_info_fieldset_en").hide();
                        $("#need_more_info_fieldset_ar").hide();
                    } else {
                        $('#english_tr').hide();
                        $('#arabic_tr').hide();
                        $("#rejected_fieldset_en").hide();
                        $("#rejected_fieldset_ar").hide();
                        $("#approved_fieldset_en").hide();
                        $("#approved_fieldset_ar").hide();
                        $("#need_more_info_fieldset_en").hide();
                        $("#need_more_info_fieldset_ar").hide();
                    }
                } else {
                    $('#english_tr').hide();
                    $('#arabic_tr').hide();
                    $("#rejected_fieldset_en").hide();
                    $("#rejected_fieldset_ar").hide();
                    $("#approved_fieldset_en").hide();
                    $("#approved_fieldset_ar").hide();
                    $("#need_more_info_fieldset_en").hide();
                    $("#need_more_info_fieldset_ar").hide();
                }
            });
        </script>
        <script>
            $().ready(function() {
                $.validator.addMethod('filesizekb', function(value, element, param) {
                    return this.optional(element) || (element.files[0].size <= param)
                }, "{{ __('jq_validation.file_size_kb', [], 'en') }}");

                $.validator.addMethod('filesizemb', function(value, element, param) {
                    return this.optional(element) || (element.files[0].size <= param * 1000000)
                }, "{{ __('jq_validation.file_size_mb', [], 'en') }}");

                $('#editForm').validate({
                    rules: {
                        status: {
                            required: true
                        },
                        approved_message_en: {
                            required: {
                                depends: function(element) {
                                    return $("#status option:selected").val() == 'Approved';
                                }
                            },
                        },
                        approved_message_ar: {
                            required: {
                                depends: function(element) {
                                    return $("#status option:selected").val() == 'Approved';
                                }
                            },
                        },
                        need_more_info_en: {
                            required: {
                                depends: function(element) {
                                    return $("#status option:selected").val() == 'Need more information';
                                }
                            },
                        },
                        need_more_info_ar: {
                            required: {
                                depends: function(element) {
                                    return $("#status option:selected").val() == 'Need more information';
                                }
                            },
                        },
                        rejected_en: {
                            required: {
                                depends: function(element) {
                                    return $("#status option:selected").val() == 'Rejected';
                                }
                            },
                        },
                        rejected_ar: {
                            required: {
                                depends: function(element) {
                                    return $("#status option:selected").val() == 'Rejected';
                                }
                            },
                        },
                        commercial_document: {
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        trade_license: {
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        company_computer_card: {
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        ktcc_image: {
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                        company_profile: {
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizemb: 10,
                        },
                        owner_partners_qid: {
                            extension: "jpg,jpeg,png,pdf,doc,docx",
                            filesizekb: 512000,
                        },
                    },
                    messages: {
                        status: {
                            required: "Please select status"
                        },
                        approved_message_en: {
                            required: "Please enter approved english message",
                        },
                        approved_message_ar: {
                            required: "Please enter approved arabic message",
                        },
                        need_more_info_en: {
                            required: "Please enter need more info english message",
                        },
                        need_more_info_ar: {
                            required: "Please enter need more info arabic message",
                        },
                        rejected_en: {
                            required: "Please enter rejected english message",
                        },
                        rejected_ar: {
                            required: "Please enter rejected arabic message",
                        },
                        commercial_document: {
                            extension: "{{ __('jq_validation.valid_extension', [], 'en') }}",
                        },
                        trade_license: {
                            extension: "{{ __('jq_validation.valid_extension', [], 'en') }}",
                        },
                        company_computer_card: {
                            extension: "{{ __('jq_validation.valid_extension', [], 'en') }}",
                        },
                        ktcc_image: {
                            extension: "{{ __('jq_validation.valid_extension', [], 'en') }}",
                        },
                        company_profile: {
                            extension: "{{ __('jq_validation.valid_extension', [], 'en') }}",
                        },
                        owner_partners_qid: {
                            extension: "{{ __('jq_validation.valid_extension', [], 'en') }}",
                        },
                    },
                    submitHandler: function(form) {
                        form.submit();
                    }
                });
            });
        </script>
    @endpush
@endsection
