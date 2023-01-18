@extends('layouts.admin.app')

@section('content')
@push('stylesheet')
<link rel="stylesheet"
href="{{ asset('ad_assets/assets/datatables/DataTables-1.10.21/css/dataTables.bootstrap4.min.css') }}">
<link rel="stylesheet" href="{{ asset('ad_assets/assets/datatables/DataTables-1.10.21/css/jquery.dataTables.min.css') }}">
<link rel="stylesheet" href="{{ asset('ad_assets/assets/datatables/Buttons-1.6.3/css/buttons.dataTables.min.css') }}">
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
                                <h4>All Admins</h4>
                            </div>
                            <div class="col-md-6">
                                <a href="{{ route('admin.operators.add') }}" class="btn pull-right"
                                    style="background-color: goldenrod !important;color:white;">
                                    Add Admin
                                </a>
                            </div>
                        </div>
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
                        <table id="operator_datatable" class="table table-striped table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th>
                                        User Name
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Contact Number
                                    </th>
                                    <th>
                                        Admin Type
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>
                                        Created At
                                    </th>
                                    <th>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($admins as $admin)
                                    <tr>
                                        <td>
                                            {{ $admin->user_name }}
                                        </td>

                                        <td>
                                            {{ $admin->name }}
                                        </td>

                                        <td>
                                            {{ $admin->email }}
                                        </td>

                                        <td>
                                            {{ $admin->contact_number }}
                                        </td>

                                        <td>
                                            {{ $admin->admin_type }}
                                        </td>

                                        <td>
                                            {{ $admin->status == 1 ? 'Active' : 'Inactive' }}
                                        </td>

                                        <td>
                                            {{ \Carbon\Carbon::parse($admin->created_at)->format('d-m-y') }}
                                        </td>

                                        <td>
                                            <a href="{{route('admin.operators.edit',['operator_id' => Crypt::encrypt($admin->id)])}}">
                                                <i class="fa fa-edit"></i>
                                            </a>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
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
        {{-- <script src="{{ asset('ad_assets/assets/datatables/Responsive-2.2.5/js/dataTables.responsive.min.js') }}"></script>
        <script src="{{ asset('ad_assets/assets/datatables/Responsive-2.2.5/js/responsive.bootstrap4.min.js') }}"></script> --}}
    <script type="text/javascript">
        $(document).ready(function() {
            $('#operator_datatable').DataTable({
                "order": [
                    [6, "desc"]
                ],
                // dom: 'Bfrtip',
                // buttons: [
                //     'copyHtml5',
                //     'excelHtml5',
                //     'csvHtml5',
                // ]
            });
        });
    </script>
    @endpush
@endsection
