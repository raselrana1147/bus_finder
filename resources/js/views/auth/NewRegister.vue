<template>
    <div id="new-register">
        <div class="register-box" style="margin-top: 90px">
            <div class="register-logo">
                <a href=""><b>Bus Finder</b>Register</a>
            </div>

            <div class="card">
                <div class="card-body register-card-body">
                    <p class="login-box-msg">Register a new membership</p>

                    <form v-on:submit.prevent="register">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" name="name" v-model="registerData.name" placeholder="Full name">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>

                        </div>
                        <span v-if="errors.name" class="text-danger">{{errors.name[0]}}</span>

                        <div class="input-group mb-3">
                            <input type="email" class="form-control" name="email" v-model="registerData.email" placeholder="Email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>

                        </div>
                        <span v-if="errors.email" class="text-danger">{{errors.email[0]}}</span>

                        <div class="input-group mb-3">
                            <input type="number" class="form-control" name="phone" v-model="registerData.phone" placeholder="Phone">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-phone"></span>
                                </div>
                            </div>

                        </div>
                        <span v-if="errors.phone" class="text-danger">{{errors.phone[0]}}</span>

                        <div class="input-group mb-3">
                            <select name="user_role_id" class="form-control" v-model="registerData.user_role_id">
                                <option value="">Select Role</option>
                                <option value="2">Driver</option>
                                <option value="3">Bus Owner</option>
                                <option value="4">Customer</option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <input type="password" class="form-control" name="password" v-model="registerData.password" placeholder="Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>

                        </div>
                        <span v-if="errors.password" class="text-danger">{{errors.password[0]}}</span>

                        <div class="input-group mb-3">
                            <input type="password" class="form-control" name="password_confirmation" v-model="registerData.password_confirmation" placeholder="Retype password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>

                        </div>
                        <span v-if="errors.password_confirmation" class="text-danger">{{errors.password_confirmation[0]}}</span>

                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" name="terms" value="agree">
                                    <label for="agreeTerms">
                                        I agree to the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Register</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <div class="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i>
                            Sign up using Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i>
                            Sign up using Google+
                        </a>
                    </div>

                    <router-link to="/" class="text-center">I already have a membership</router-link>
                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>
        <!-- /.register-box -->
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default{
      name: "NewRegister",
      title: "Bus Finder - Register",
      data(){
        return{
          registerData: {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            user_role_id: ''
          },

          errors: {}
        }
      },

      computed: {
        ...mapState({
            message: state => state.success_message
        })
      },

      methods: {
        register: async function(){
          try {
            let formData = new FormData();
            formData.append('name', this.registerData.name);
            formData.append('email', this.registerData.email);
            formData.append('phone', this.registerData.phone);
            formData.append('user_role_id', this.registerData.user_role_id);
            formData.append('password', this.registerData.password);
            formData.append('password_confirmation', this.registerData.password_confirmation);

            await this.$store.dispatch('add_user', formData).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.registerData = {};

              this.$router.push('/');
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