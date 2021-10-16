<template>
    <div id="add-user">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Add Users</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="addUsers">

                            <div class="row">

                                <strong class="col-md-12">User Credential Setup</strong>
                                <hr>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Name</label>
                                    <input type="text" v-model="userData.name" name="name" class="form-control">
                                    <span v-if="errors.name" class="text-danger">{{errors.name[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Email</label>
                                    <input type="text" v-model="userData.email" name="email" class="form-control">
                                    <span v-if="errors.email" class="text-danger">{{errors.email[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Password</label>
                                    <input type="password" v-model="userData.password" name="password" class="form-control">
                                    <span v-if="errors.password" class="text-danger">{{errors.password[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Password Confirmation</label>
                                    <input type="password" v-model="userData.password_confirmation" name="password_confirmation" class="form-control">
                                    <span v-if="errors.email" class="text-danger">{{errors.password_confirmation[0]}}</span>
                                </div>

                            </div>
                            
                            <div class="row">
                                <strong class="col-md-12">User Role </strong>
                                <hr>
                                
                                <div class="form-group col-md-12">
                                    <label class="control-label">Role</label>
                                    <select name="user_role_id" v-model="userData.user_role_id" class="form-control">
                                        <option value="">Select User Role</option>
                                        <option value="2">Driver</option>
                                        <option value="3">Owner</option>
                                        <option value="4">Customer</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <strong class="col-md-12">User Other Information Setup</strong>
                                <hr>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Phone</label>
                                    <input type="text" v-model="userData.phone" name="phone" id="phone" class="form-control">
                                    <span v-if="errors.phone" class="text-danger">{{errors.phone[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">NID</label>
                                    <input type="text" v-model="userData.nid" name="nid" id="nid" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">City</label>
                                    <input type="text" v-model="userData.city" name="city" id="city" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">State</label>
                                    <input type="text" v-model="userData.state" name="state" id="state" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Postal Code</label>
                                    <input type="text" v-model="userData.post_code" name="post_code" id="post_code" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Zone/Area</label>
                                    <input type="text" v-model="userData.zone" name="zone" id="zone" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Address</label>
                                    <input type="text" v-model="userData.address" name="address" id="address" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row col-md-12">
                                <label class="control-label">Image</label>
                                <input type="file" name="image" class="form-control" v-on:change="attachImage" ref="newCategoryImage">

                                <br><br>

                                <div v-if="userData.image">
                                    <img src="" ref="newCategoryImageDisplay" width="100px" height="100px">
                                </div>

                                <div v-else></div>
                            </div>


                            <div class="form-group">
                                <router-link to="/dashboard/user" class="btn btn-warning">Back</router-link>
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default{
      name: "AddUser",
      title: "Bus Finder - Add User",
      data(){
        return{
          userData:{
            name: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            image: '',
            nid: '',
            address: '',
            city: '',
            state: '',
            post_code: '',
            zone: '',
            user_role_id: ''
          },

          errors: {}
        }
      },

      computed: {
        ...mapState({
            message: state => state.user_setup.success_message
        })
      },

      methods: {
        attachImage: function(){
          //to use some file todo
          this.userData.image = this.$refs.newCategoryImage.files[0];
          let reader = new FileReader();
          reader.addEventListener('load', function () {
            this.$refs.newCategoryImageDisplay.src = reader.result;
          }.bind(this),false);
          reader.readAsDataURL(this.userData.image);
        },

        addUsers: async function(){
          try {
            let formData = new FormData();
            formData.append('name', this.userData.name);
            formData.append('email', this.userData.email);
            formData.append('phone', this.userData.phone);
            formData.append('password', this.userData.password);
            formData.append('password_confirmation', this.userData.password_confirmation);
            formData.append('nid', this.userData.nid);
            formData.append('address', this.userData.address);
            formData.append('city', this.userData.city);
            formData.append('state', this.userData.state);
            formData.append('post_code', this.userData.post_code);
            formData.append('zone', this.userData.zone);
            formData.append('image', this.userData.image);
            formData.append('user_role_id', this.userData.user_role_id);

            await this.$store.dispatch('user_setup/add_user', formData).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.userData = {};
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