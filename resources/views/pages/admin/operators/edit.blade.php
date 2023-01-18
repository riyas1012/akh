@extends('layouts.admin.app')

@section('content')
    @push('stylesheet')
        <style>
            .error {
                color: red;
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
                                <h4>Edit Admin</h4>
                            </div>
                            <div class="col-md-6">
                                <a href="{{ route('admin.operators') }}" class="btn pull-right"
                                    style="background-color: goldenrod !important;color:white;">
                                    All Admins
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
                        <div id="login" style="width: 500px;margin: auto;">
                            <form class="form-horizontal" action="{{ route('admin.operators.update',['operator_id'=>$operator_id]) }}" method="post"
                                name="editForm" id="editForm">
                                {{ csrf_field() }}
                                <fieldset>
                                    <!-- First & Last Name -->
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">User Name</label>
                                            <input type="text" class="form-control" name="user_name" id="user_name"
                                                value="{{ $admin->user_name }}" autocomplete="off">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">Full Name</label>
                                            <input type="text" class="form-control" name="full_name" id="full_name"
                                                value="{{ $admin->name }}" autocomplete="off">
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <!-- Phone & Email -->
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">Email</label>
                                            <input type="email" class="form-control" name="email" id="email"
                                                value="{{ $admin->email }}" autocomplete="off">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">Contact Number</label>
                                            <input type="text" class="form-control" name="contact_number"
                                                id="contact_number" value="{{ $admin->contact_number }}" autocomplete="off">
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">Admin Type</label>
                                            <select name="operator_admin_type" id="operator_admin_type" class="form-control">
                                                <option value="">Select Admin Type</option>
                                                <option value="Super Admin"
                                                    @if ($admin->admin_type == "Super Admin") selected @endif>Super Admin</option>
                                                <option value="Admin" @if ($admin->admin_type == "Admin") selected @endif>
                                                    Admin</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">Status</label>
                                            <select name="status" id="status" class="form-control">
                                                <option value="0" @if ($admin->status == 0) selected @endif>
                                                    Inactive</option>
                                                <option value="1" @if ($admin->status == 1) selected @endif>
                                                    Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label class="floating-label label-required">Is Password Set</label>
                                            <select name="is_password_set" id="is_password_set" class="form-control" disabled>
                                                <option value="0"
                                                    @if ($admin->is_password_set == '0') selected @endif>Password Not Created</option>
                                                <option value="1" @if ($admin->is_password_set == '1') selected @endif>
                                                    Password Created</option>
                                            </select>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="row mt-3">
                                        <button type="submit" class="btn btn-primary"
                                            style="background: goldenrod !important;margin:auto;">
                                            Update</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @push('scripts')
        <script>
            $().ready(function() {

                jQuery.validator.addMethod("emailExt", function(value, element, param) {
                    return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
                }, "Please enter valid Email format.");

                $.validator.addMethod('numericOnly', function(value) {
                    return /^[0-9]+$/.test(value);
                }, "numeric value only allowed.");

                $('#editForm').validate({
                    rules: {
                        full_name: {
                            required: true
                        },
                        user_name: {
                            required: true
                        },
                        email: {
                            required: true,
                            emailExt: true
                        },
                        contact_number: {
                            required: true,
                            numericOnly: true
                        },
                        admin_type: {
                            required: true,
                        },

                    },
                    messages: {
                        full_name: {
                            required: "first name field is required"
                        },
                        user_name: {
                            required: "user name field is required"
                        },
                        email: {
                            required: "email field is required"
                        },
                        contact_number: {
                            required: "contact number field is required"
                        },
                        admin_type: {
                            required: "please selcte admin type"
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
