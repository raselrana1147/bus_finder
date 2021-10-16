<template>
    <div id="edit-user">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Edit Users</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="editUsers">

                            <div class="row">

                                <strong class="col-md-12">User Credential Edit</strong>
                                <hr>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Name</label>
                                    <input type="text" v-model="user.name" name="name" class="form-control">
                                    <span v-if="errors.name" class="text-danger">{{errors.name[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Email</label>
                                    <input type="text" v-model="user.email" name="email" class="form-control">
                                    <span v-if="errors.email" class="text-danger">{{errors.email[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Password</label>
                                    <input type="password" v-model="user.password" name="password" class="form-control">
                                    <span v-if="errors.password" class="text-danger">{{errors.password[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Password Confirmation</label>
                                    <input type="password" v-model="user.password_confirmation" name="password_confirmation" class="form-control">
                                    <span v-if="errors.email" class="text-danger">{{errors.password_confirmation[0]}}</span>
                                </div>

                            </div>

                            <div class="row">
                                <strong class="col-md-12">User Role </strong>
                                <hr>

                                <div class="form-group col-md-12">
                                    <label class="control-label">Role</label>
                                    <select name="user_role_id" v-model="user.user_role_id" class="form-control">
                                        <option value="">Select User Role</option>
                                        <option value="2">Driver</option>
                                        <option value="3">Owner</option>
                                        <option value="4">Customer</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row">
                                <strong class="col-md-12">User Other Information Edit</strong>
                                <hr>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Phone</label>
                                    <input type="text" v-model="user.phone" name="phone" id="phone" class="form-control">
                                    <span v-if="errors.phone" class="text-danger">{{errors.phone[0]}}</span>
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">NID</label>
                                    <input type="text" v-model="user.nid" name="nid" id="nid" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">City</label>
                                    <input type="text" v-model="user.city" name="city" id="city" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">State</label>
                                    <input type="text" v-model="user.state" name="state" id="state" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Postal Code</label>
                                    <input type="text" v-model="user.post_code" name="post_code" id="post_code" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Zone/Area</label>
                                    <input type="text" v-model="user.zone" name="zone" id="zone" class="form-control">
                                </div>

                                <div class="form-group col-md-6">
                                    <label class="control-label">Address</label>
                                    <input type="text" v-model="user.address" name="address" id="address" class="form-control">
                                </div>
                            </div>

                            <div class="form-group row col-md-12">
                                <label class="control-label">Image</label>
                                <input type="file" name="image" class="form-control" v-on:change="editAttachImage" ref="editCategoryImage">
                                <input type="hidden" name="current_image" v-model="user.image">
                                <br><br>

                                <div>
                                    <img :src="showImage(user.image)" ref="editCategoryImageDisplay" width="100px" height="100px">
                                </div>
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
    import {mapState, mapActions} from 'vuex';

    export default{
      name: "EditUser",
      title: "Bus Finder - Edit User",
      data(){
        return{
          file: '',
          errors: {}
        }
      },

      computed: {
        ...mapState({
            user: state => state.user_setup.user,
            message: state => state.user_setup.success_message
        })
      },

      mounted(){
        this.getEditUser(this.$route.params.id);
      },

      methods: {
        ...mapActions({
            getEditUser: 'user_setup/edit_user'
        }),

        showImage(img){
          let server_Path = this.$store.state.serverPath;
          return server_Path + "/assets/admin/uploads/user_image/"+img;
        },

        editAttachImage: function () {
          this.file = this.$refs.editCategoryImage.files[0];
          let reader = new FileReader();
          reader.addEventListener('load', function () {
            this.$refs.editCategoryImageDisplay.src = reader.result;
          }.bind(this),false);
          reader.readAsDataURL(this.file);
        },


        editUsers: async function(){
            try {

              let id = this.$route.params.id;
              let formData = new FormData();
              formData.append('name', this.user.name);
              formData.append('email', this.user.email);
              formData.append('phone', this.user.phone);
              formData.append('password', this.user.password);
              formData.append('password_confirmation', this.user.password_confirmation);
              formData.append('nid', this.user.nid);
              formData.append('address', this.user.address);
              formData.append('city', this.user.city);
              formData.append('state', this.user.state);
              formData.append('post_code', this.user.post_code);
              formData.append('zone', this.user.zone);
              formData.append('current_image', this.user.image);
              formData.append('image', this.file);
              formData.append('user_role_id', this.user.user_role_id);

              await this.$store.dispatch('user_setup/update_user', {id:id, data:formData}).then(() => {
                this.$swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'success',
                  title: this.message,
                  showConfirmButton: false,
                  timer: 1500
                });

                this.getEditUser(id);
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