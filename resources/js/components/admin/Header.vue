<template>
    <div id="admin-header">
        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">

                <!-- Notifications Dropdown Menu -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-bell"></i>
                        <span class="badge badge-warning navbar-badge">0</span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-item dropdown-header">15 Notifications</span>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div class="dropdown-divider"></div>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="fa fa-angle-double-down"></i>
                    </a>

                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-item dropdown-header">Admin</span>
                        <div class="dropdown-divider"></div>
                        <router-link to="/dashboard/profile" class="dropdown-item"><span class="fa fa-user"></span> Profile</router-link>
                        <router-link to="/dashboard/change_password" class="dropdown-item"><span class="fa fa-lock"></span> Change Password</router-link>
                        <a class="dropdown-item" v-on:click="logout" style="cursor: pointer"><i class="fas fa-sign-out-alt"></i> Logout</a>
                        <div class="dropdown-divider"></div>

                    </div>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->

    </div>
</template>

<script>
    export default{
      name: "Header",
      methods: {
        logout: async function(){
          try {
            this.$store.dispatch('logout').then(() => {
              this.$router.push('/');
            })
          }catch (e){
            console.log(e);
          }
        }
      }
    }
</script>