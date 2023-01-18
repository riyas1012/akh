@extends('layouts.admin.app')

@section('content')

@push('stylesheet')
    <style>
        .error{
            color: red;
        }
    </style>
@endpush
    <div align="center" class="bg1">
        <div class="container">
            <div class="card  col-md-5 login-card">
                <div class="card-header">Login</div>
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
                        <form class="form-horizontal" action="{{route('admin.login')}}" method="post" id="loginForm">
                            {{ csrf_field() }}
                            <fieldset>
                                <div class="form-group">
                                    <div class="col-sm-12  text-left">
                                        <label class="label-required">Username</label>
                                        <input type="text" class="form-control" id="user_name" name="user_name"
                                            placeholder="Type your Username" autocomplete="off" value="{{old('user_name')}}" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-sm-12 text-left">
                                        <label class="label-required">Password</label>

                                        <input type="password" class="form-control" id="password" name="password"
                                            placeholder="Type your Password" autocomplete="off" />
                                    </div>
                                </div>
                                <!--  <div class="text-left"><a href='#'>Forgot Password</a></div> -->
                                <div class="form-group">
                                    <div class="col-sm-offset-2 col-sm-10">
                                        <button type="submit" class="button">Login</button>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <!-- card-body -->
            </div>
        </div>
    </div>

    @push('scripts')
        <script>
        $().ready(function() {

            jQuery.validator.addMethod("emailExt", function(value, element, param) {
    return value.match(/^[a-zA-Z0-9_\.%\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/);
},"{{__('jq_validation.invalid_email')}}");

                $('#loginForm').validate({
                    rules: {
                        user_name: {
                            required : true,
                        },
                        password: {
                            required : true,
                        }
                    },
                    messages: {
                        user_name: {
                            required : "User name field is required"
                        },
                        password: {
                            required : "Password field is required",
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
