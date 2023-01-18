@extends('layouts.admin.app')

@section('content')
    @push('stylesheet')
        <link rel="stylesheet"
            href="{{ asset('ad_assets/assets/datatables/DataTables-1.10.21/css/dataTables.bootstrap4.min.css') }}">
        <link rel="stylesheet" href="{{ asset('ad_assets/assets/datatables/DataTables-1.10.21/css/jquery.dataTables.min.css') }}">
        <link rel="stylesheet" href="{{ asset('ad_assets/assets/datatables/Buttons-1.6.3/css/buttons.dataTables.min.css') }}">
        <style>
            .dt-buttons {
                margin-left: 10px;
            }
        </style>
    @endpush
    @include('layouts.admin.header')

    <div class="container" style="padding: 30px 0px;margin-left: 120px;">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default" style="width: 120%;">
                    <div class="panel-heading" style="height: 50px;
                    padding: 5px;margin-bottom: 20px;">
                        <h4>All Applications</h4>
                    </div>
                    <div class="panel-body">
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
                        <div class="row" style="margin-bottom: 20px;">
                            <div class="col-md-2">
                                <select name="company_activity_type_id" id="company_activity_type_id" class="form-control"
                                    style="padding: 0px;" onchange="getSelectedValues()">
                                    <option value="" selected>Select Company Activity Type</option>
                                    @foreach ($company_activity_type as $companyActivityItem)
                                        <option value="{{ $companyActivityItem->id }}">
                                            {{ $companyActivityItem->english }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select name="fb_offer_type_id" id="fb_offer_type_id" class="form-control"
                                    style="padding: 0px;" onchange="getSelectedValues()">
                                    <option value="" selected>Select F&B Offering Type</option>
                                    @foreach ($fb_offer_types as $fbOfferTypesItem)
                                        <option value="{{ $fbOfferTypesItem->id }}">
                                            {{ $fbOfferTypesItem->english }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select name="fb_type_id" id="fb_type_id" class="form-control" style="padding: 0px;"
                                    onchange="getSelectedValues()">
                                    <option value="" selected>Select F&B Cuisine Type</option>
                                    @foreach ($fb_types as $fbTypesItem)
                                        <option value="{{ $fbTypesItem->id }}">
                                            {{ $fbTypesItem->english }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-3">
                                <select name="unit_type_id" id="unit_type_id" class="form-control" style="padding: 0px;"
                                    onchange="getSelectedValues()">
                                    <option value="" selected>Select Types of Units required</option>
                                    @foreach ($unit_types as $unitTypesItem)
                                        <option value="{{ $unitTypesItem->id }}">
                                            {{ $unitTypesItem->english }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select name="status" id="status" class="form-control" onchange="getSelectedValues()">
                                    <option value="" selected>Select Status Type</option>
                                    <option value="Submitted">Submitted</option>
                                    <option value="Under Review">Under Review</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Need more information">Need more information</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" style="margin-bottom: 20px;">
                            <div class="col-md-2">
                                <select name="score_condition" id="score_condition" class="form-control">
                                    <option value="" selected>Select Score Condition</option>
                                    <option value="equal">Equal</option>
                                    <option value="lessthan">Less than</option>
                                    <option value="greaterthan">Greater than</option>
                                    <option value="inbetween">In Between</option>
                                </select>
                            </div>
                            <div class="col-md-2" id="score_div" style="display: none;">
                                <select name="score" id="score" class="form-control" onchange="getSelectedValues()">
                                    <option value="" selected>Select Score</option>
                                    @for ($i = 1; $i <= 100; $i++)
                                        <option value={{ $i }}>{{ $i }}</option>
                                    @endfor
                                </select>
                            </div>
                            <div class="col-md-2" id="score_inbetween_div" style="display: none;">
                                <select name="score_inbetween" id="score_inbetween" class="form-control"
                                    onchange="getSelectedValues()">
                                    <option value="" selected>Select Score</option>
                                    @for ($i = 1; $i <= 100; $i++)
                                        <option value={{ $i }}>{{ $i }}</option>
                                    @endfor
                                </select>
                            </div>
                        </div>
                        <table id="application_datatable" class="table table-striped table-bordered">
                            <thead style="white-space: nowrap;">
                                <tr>
                                    <th>
                                        Date of Application
                                    </th>
                                    <th>
                                        Application Number
                                    </th>
                                    <th>
                                        Concept Name
                                    </th>
                                    <th>
                                        Applicant Name
                                    </th>
                                    <th>
                                        Year of Experience
                                    </th>
                                    <th>
                                        Company Activity Type
                                    </th>
                                    <th>
                                        Existing Branch
                                    </th>
                                    <th>
                                        F&B Offering Type
                                    </th>
                                    <th>
                                        Other F&B Offering Type
                                    </th>
                                    <th>
                                        Phone Number
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        F&B Cuisine
                                    </th>
                                    <th>
                                        Other F&B Cuisine
                                    </th>
                                    <th>
                                        Types of Units Required
                                    </th>
                                    <th>
                                        Brief Description
                                    </th>
                                    <th>
                                        Number of Employees
                                    </th>
                                    <th>
                                        Existing F&B kiosk/Food truck/cart/container/Caravan/Trolley
                                    </th>
                                    <th>
                                        Footprint required for kiosk/food truck/cart/container/caravan/Trolley
                                    </th>
                                    <th>
                                        Existing Kiosk/Cart/Truck/Caravan/Trolley/Container image
                                    </th>
                                    <th>
                                        Central Kitchen
                                    </th>
                                    <th>
                                        Kitchen Footprint Area
                                    </th>
                                    <th>
                                        Concept Presentation
                                    </th>
                                    <th>
                                        Commercial Registration
                                    </th>
                                    <th>
                                        Trade License
                                    </th>
                                    <th>
                                        Computer Card
                                    </th>
                                    <th>
                                        QID
                                    </th>
                                    <th>
                                        Status Changed By
                                    </th>
                                    <th>
                                        Score
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {{-- <tbody>
                                @foreach ($applications as $application)
                                    <tr>
                                        <td>
                                            {{ \Carbon\Carbon::parse($application->created_at)->format('d-m-y') }}
                                        </td>

                                        <td>
                                            {{ $application->application_number }}
                                        </td>

                                        <td>
                                            {{ $application->concept_name }}
                                        </td>

                                        <td>
                                            {{ $application->first_name . ' ' . $application->surname }}
                                        </td>
                                        <td>
                                            {{ $application->year_of_experience->english }}
                                        </td>
                                        <td>
                                            @if ($application->company_activity_type_id != null)
                                                {!! $application->company_activity_type->english !!}
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
                                        <td>
                                            @if ($application->existing_branche_id != null)
                                                {{ $application->existing_branches->english }}
                                            @else
                                                -
                                            @endif
                                        </td>
                                        <td>
                                            @if ($application->fb_offer_type_id != null)
                                                {!! $application->fb_offer_types->english !!}
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
                                        <td>
                                            @if ($application->other_type != null)
                                                {{ $application->other_type }}
                                            @else
                                                -
                                            @endif
                                        </td>
                                        <td>
                                            {{ $application->users->phone_number }}
                                        </td>
                                        <td>
                                            {{ $application->users->email }}
                                        </td>
                                        <td>
                                            @if ($application->fb_type_id != null)
                                                {!! $application->fb_types->english !!}
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
                                        <td>
                                            @if ($application->other_fb_cousine != null)
                                                {{ $application->other_fb_cousine }}
                                            @else
                                                -
                                            @endif
                                        </td>
                                        <td>
                                            {{ $application->unit_type->english }}
                                        </td>

                                        <td>
                                            {{ $application->description }}
                                        </td>
                                        <td>
                                            {{ $application->number_of_employess->english }}
                                        </td>
                                        <td>
                                            {{ $application->ktcc->english }}
                                        </td>
                                        <td>
                                            {{ $application->specify_ktcc }}
                                        </td>
                                        <td>
                                            @if ($application->ktcc_image_path == null)
                                                -
                                            @else
                                                <a
                                                    href="{{ config('global.user_url') . '/downoad-document/ktccimage' . '/' . $application->application_number }}">
                                                    {{ config('global.user_url') . '/downoad-document/ktccimage' . '/' . $application->application_number }}
                                                </a>
                                            @endif
                                        </td>
                                        <td>
                                            {{ $application->central_kitchen->english }}
                                        </td>
                                        <td>
                                            @if ($application->kitchen_footprint_area_id != null)
                                                {{ $application->kitchen_footprint->english }}
                                            @else
                                                -
                                            @endif

                                        </td>
                                        <td>
                                            <a
                                                href="{{ config('global.user_url') . '/downoad-document/companyprofile' . '/' . $application->application_number }}">
                                                {{ config('global.user_url') . '/downoad-document/companyprofile' . '/' . $application->application_number }}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href="{{ config('global.user_url') . '/downoad-document/commercial' . '/' . $application->application_number }}">

                                                {{ config('global.user_url') . '/downoad-document/commercial' . '/' . $application->application_number }}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href="{{ config('global.user_url') . '/downoad-document/trade' . '/' . $application->application_number }}">

                                                {{ config('global.user_url') . '/downoad-document/trade' . '/' . $application->application_number }}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href="{{ config('global.user_url') . '/downoad-document/computercard' . '/' . $application->application_number }}">

                                                {{ config('global.user_url') . '/downoad-document/computercard' . '/' . $application->application_number }}
                                            </a>
                                        </td>
                                        <td>
                                            <a
                                                href="{{ config('global.user_url') . '/downoad-document/qid' . '/' . $application->application_number }}">

                                                {{ config('global.user_url') . '/downoad-document/qid' . '/' . $application->application_number }}
                                            </a>
                                        </td>
                                        <td>
                                            @if ($application->updated_admin_id != null)
                                                {{ $application->admins->name }}
                                            @else
                                                -
                                            @endif
                                        </td>
                                        <td>
                                            {{ $application->score }}
                                        </td>
                                        <td>
                                            {{ $application->status }}
                                        </td>
                                        <td>
                                            <a
                                                href="{{ route('admin.applications.details', ['application_number' => $application->application_number]) }}">
                                                <i class="fa fa-eye"></i>
                                            </a>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody> --}}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script src="{{ asset('ad_assets/assets/datatables/DataTables-1.10.21/js/jquery.dataTables.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/Buttons-1.6.3/js/dataTables.buttons.min.js') }} "></script>
        <script src="{{ asset('ad_assets/assets/datatables/Buttons-1.6.3/js/buttons.flash.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/JSZip-2.5.0/jszip.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/pdfmake-0.1.36/pdfmake.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/pdfmake-0.1.36/vfs_fonts.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/Buttons-1.6.3/js/buttons.html5.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/Buttons-1.6.3/js/buttons.print.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/DataTables-1.10.21/js/dataTables.bootstrap4.min.js') }}"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
        {{-- <script src="{{ asset('ad_assets/assets/datatables/Responsive-2.2.5/js/dataTables.responsive.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/Responsive-2.2.5/js/responsive.bootstrap4.min.js') }}"></script> --}}
        <script type="text/javascript">
            $(document).ready(function() {
                // $('#application_datatable').DataTable({
                //     "scrollX": true,
                //     "order": [
                //         [0, "asc"]
                //     ],
                //     dom: 'lBfrtip',
                //     // columnDefs: [ { type: 'date', 'targets': [0] } ],
                //     "columnDefs": [{
                //         "type": "date",
                //         "render": function(data, type, row, meta) {
                //             var DateCreated = moment(data, 'DD.MM.YYYY').format('YYYY-MM-DD');
                //             return DateCreated;
                //         },
                //         "targets": 0
                //     }, ],
                //     buttons: [
                //         'copyHtml5',
                //         'excelHtml5',
                //         'csvHtml5',
                //     ]
                //     // dom: 'Bfrtip',
                //     // buttons: [
                //     //     'copyHtml5',
                //     //     'excelHtml5',
                //     //     'csvHtml5',
                //     // ]
                // });

                getSelectedValues();
            });
        </script>
        <script>
            $('#score_condition').on('change', function() {
                if (this.value != "") {
                    if (this.value == 'inbetween') {
                        $("#score_div").show();
                        $("#score_inbetween_div").show();
                        var selectedScore = $('#score option:selected').val()
                        var scoreInbetween = $('#score_inbetween option:selected').val()
                        if (selectedScore != "" && scoreInbetween != "") {
                            getSelectedValues();
                        }
                    } else {
                        $("#score_div").show();
                        $("#score_inbetween_div").hide();
                        var selectedScore = $('#score option:selected').val()
                        if (selectedScore != "") {
                            getSelectedValues();
                        }
                    }
                } else {
                    $("#score_div").hide();
                    $("#score_inbetween_div").hide();
                }

            });

            function getSelectedValues() {
                if ($.fn.DataTable.isDataTable("#application_datatable")) {
                    $('#application_datatable').DataTable().clear().destroy();
                }
                if ($("#score_condition option:selected").val() == 'inbetween') {
                    var selectedScore = $('#score option:selected').val();
                    var scoreInbetween = $('#score_inbetween option:selected').val();
                    if (selectedScore == "" || scoreInbetween == "") {
                        alert("Please select both score values")
                        $('#application_datatable').DataTable({
                            "scrollX": true,
                            "order": [
                                [0, "asc"]
                            ],
                            dom: 'lBfrtip',
                            // columnDefs: [ { type: 'date', 'targets': [0] } ],
                            "columnDefs": [{
                                "type": "date",
                                "render": function(data, type, row, meta) {
                                    var DateCreated = moment(data, 'DD.MM.YYYY').format('YYYY-MM-DD');
                                    return DateCreated;
                                },
                                "targets": 0
                            }, ],
                            buttons: [
                                'copyHtml5',
                                'excelHtml5',
                                'csvHtml5',
                            ]
                            // dom: 'Bfrtip',
                            // buttons: [
                            //     'copyHtml5',
                            //     'excelHtml5',
                            //     'csvHtml5',
                            // ]
                        });
                        return;
                    }

                }
                $('#application_datatable').DataTable({
                    "processing": true,
                    "scrollX": true,
                    "serverSide" : true,
                    "ajax": {
                        "url": "{{ route('admin.applications.search') }}",
                        "data": {
                            "_token": "{{ csrf_token() }}",
                            "fb_type_id": $("#fb_type_id option:selected").val(),
                            "unit_type_id": $("#unit_type_id option:selected").val(),
                            "company_activity_type_id": $("#company_activity_type_id option:selected").val(),
                            "fb_offer_type_id": $("#fb_offer_type_id option:selected").val(),
                            "status": $("#status option:selected").val(),
                            'score_condition': $('#score_condition option:selected').val(),
                            'score': $('#score option:selected').val(),
                            'score_inbetween': $('#score_inbetween option:selected').val(),
                        },
                        "type": "POST",
                    },
                    "order": [
                        [0, "asc"]
                    ],
                    dom: 'lBfrtip',
                    // columnDefs: [ { type: 'date', 'targets': [0] } ],
                    "columns" : [
                        { data : 'created_at' , name : 'created_at'},
                        { data : 'application_number' , name : 'application_number'},
                        { data : 'concept_name' , name : 'concept_name'},
                        { data : 'applicant_name' , name : 'applicant_name'},
                        { data : 'year_of_experience' , name : 'year_of_experience'},
                        { data : 'company_activity_name' , name : 'company_activity_name'},
                        { data : 'existing_branch' , name : 'existing_branch'},
                        { data : 'fb_offer_type_name' , name : 'fb_offer_type_name'},
                        { data : 'fb_offer_other' , name : 'fb_offer_other'},
                        { data : 'phone_number' , name : 'phone_number'},
                        { data : 'email' , name : 'email'},
                        { data : 'fb_type_name' , name : 'fb_type_name'},
                        { data : 'fb_cusine_other' , name : 'fb_cusine_other'},
                        { data : 'unit_type' , name : 'unit_type'},
                        { data : 'description' , name : 'description'},
                        { data : 'number_of_employess' , name : 'number_of_employess'},
                        { data : 'ktcc' , name : 'ktcc'},
                        { data : 'specify_ktcc' , name : 'specify_ktcc'},
                        { data : 'ktcc_image_path' , name : 'ktcc_image_path'},
                        { data : 'central_kitchen' , name : 'central_kitchen'},
                        { data : 'kitchen_footprint_area' , name : 'kitchen_footprint_area'},
                        { data : 'company_profile' , name : 'company_profile'},
                        { data : 'commercial' , name : 'commercial'},
                        { data : 'trade' , name : 'trade'},
                        { data : 'computercard' , name : 'computercard'},
                        { data : 'qid' , name : 'qid'},
                        { data : 'admin_name' , name : 'admin_name'},
                        { data : 'score' , name : 'score'},
                        { data : 'status' , name : 'status'},
                        { data : 'action' , name : 'action'},
                    ],
                    "columnDefs": [{
                        "type": "date",
                        "render": function(data, type, row, meta) {
                            var DateCreated = moment(data, 'DD.MM.YYYY').format('YYYY-MM-DD');
                            return DateCreated;
                        },
                        "targets": 0
                    }, ],
                    buttons: [
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                    ]
                });
            }
        </script>
    @endpush
@endsection
