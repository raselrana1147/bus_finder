<template>
    <div id="login">
        <div class="login-box">
            <div class="login-logo">
                <a href=""><b>Bus Finder</b>Login</a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Sign in to start your session</p>

                    <form v-on:submit.prevent="login">
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" name="email" v-model="loginData.email" placeholder="Email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <span v-if="errors.email" class="text-danger">{{errors.email[0]}}</span>

                        <div class="input-group mb-3">
                            <input type="password" class="form-control" name="password" v-model="loginData.password" placeholder="Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <span v-if="errors.password" class="text-danger">{{errors.password[0]}}</span>

                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember">
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <div class="social-auth-links text-center mb-3">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                        </a>
                    </div>
                    <!-- /.social-auth-links -->

                    <p class="mb-1">
                        <a href="">I forgot my password</a>
                    </p>
                    <p class="mb-0">
                        <router-link to="register" class="text-center">Register a new membership</router-link>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
        <!-- /.login-box -->
    </div>
</template>

<script>
    export default{
        name: "Login",
        title: "Bus Finder - Login",
        data(){
            return{
                loginData:{
                    email: '',
                    password: ''
                },

                errors: {}
            }
        },

        methods: {
          login: async function(){
            try {
              let formData = new FormData();
              formData.append('email', this.loginData.email);
              formData.append('password', this.loginData.password);

              await this.$store.dispatch('login', formData).then(() => {
                this.$router.push('/dashboard');

                this.loginData = {};
              })
            }catch (e){
              switch (e.response.status)
              {
                case 422:
                  this.errors = e.response.data.errors;
                  break;
                default:
                  this.$swal.fire({
                    icon: 'error',
                    text: 'Oops',
                    title: e.response.data.error,
                  });
                  break;
              }
            }

          }
        }
    }
</script>