<nav class="navbar navbar-dark navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand border-right" href="#">Forsa2022</a>
        </div>
        <ul class="nav nav-pills">
            <li class="{{ Route::is('admin.dashboard') ? 'active' : '' }}">
                <a href="{{ route('admin.dashboard') }}">
                    <b>Dashboard</b>
                </a>
            </li>
            @if (session()->get('admin_type') == 'Super Admin')
                <li
                    class="{{ Route::is('admin.operators', 'admin.operators.add', 'admin.operators.edit') ? 'active' : '' }}">
                    <a href="{{ route('admin.operators') }}">
                        <b>Admins</b>
                    </a>
                </li>
                <li class="{{ Route::is('admin.configuration') ? 'active' : '' }}">
                    <a href="{{ route('admin.configuration') }}">
                        <b>Configuration</b>
                    </a>
                </li>
            @endif
            <li class="{{ Route::is('admin.applications', 'admin.applications.details') ? 'active' : '' }}">
                <a href="{{ route('admin.applications') }}">
                    <b>Applications</b>
                </a>
            </li>
        </ul>
        <div class="login-user">
            <div class="dropdown">
                <a class=" dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" user-action>
                    <i class="fa fa-user-circle-o" aria-hidden="true"> </i>{{ session()->get('admin_name') }}
                    <b class="caret"></b>
                </a>
                <!-- <i class="fa fa-user"></i> -->
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                    {{-- <a class="dropdown-item" href="#">Setting</a> --}}
                    <a class="dropdown-item" href="{{ route('admin.logout') }} ">Logout</a>
                </div>
            </div>

        </div>
    </div>
</nav>
