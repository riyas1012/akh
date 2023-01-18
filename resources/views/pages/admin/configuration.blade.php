@extends('layouts.admin.app')

@section('content')
@push('stylesheet')
    <style>
        .error{
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
                                <h4>Configuration</h4>
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
                            <form class="form-horizontal" action="{{ route('admin.configuration.update') }}" method="post"
                                name="registerForm" id="registerForm">
                                {{ csrf_field() }}
                                <fieldset>
                                    <!-- First & Last Name -->
                                    <div class="row mt-3">
                                        <div class="col-md-8">
                                            <label
                                                class="floating-label label-required">User Application Site Status</label>
                                                <select name="application_site_status" id="application_site_status" class="form-control">
                                                    <option value="1" @if($configuration->value == '1') selected @endif>Active</option>
                                                    <option value="0" @if($configuration->value == '0') selected @endif> Inactive</option>
                                                </select>
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div class="row mt-3">
                                        <button type="submit" class="btn btn-primary" style="background: goldenrod !important;margin:auto;">
                                            Update
                                        </button>
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

                $('#registerForm').validate({
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
