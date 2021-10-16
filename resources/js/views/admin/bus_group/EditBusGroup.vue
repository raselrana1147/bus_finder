<template>
    <div id="edit-bus-group">
        <div class="row">
            <div class="col-md-12">

                <div id="success_message"></div>

                <div id="error_message"></div>

                <div class="card card-primary">
                    <div class="card-header">Edit Bus Group</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="editBusGroup">

                            <div class="form-group row">
                                <label class="control-label">Bus Group Name</label>
                                <input type="text" v-model="editBusGroupData.bus_group_name" name="bus_group_name" class="form-control">
                                <span v-if="errors.bus_group_name" class="red--text">{{errors.bus_group_name[0]}}</span>
                            </div>

                            <div class="form-group">
                                <router-link to="/dashboard/bus_group" class="btn btn-warning">Back</router-link>
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
        name: "EditBusGroup",
        title: "Bus Finder - EditBusGroup",
        data(){
          return{
            errors: {}
          }
        },

        computed: {
          ...mapState({
                editBusGroupData: state => state.busGroup.bus_group,
                message: state => state.busGroup.success_message
          })
        },

        mounted(){
          this.getEditBusGroupData(this.$route.params.id);
        },

        methods: {
          ...mapActions({
                getEditBusGroupData: 'busGroup/edit_bus_group'
          }),

          editBusGroup: async function(){
            try {
              let id = this.$route.params.id;
              let formData = new FormData();
              formData.append('bus_group_name', this.editBusGroupData.bus_group_name);

              await this.$store.dispatch('busGroup/update_bus_group', {id:id, data:formData}).then(() => {
                this.$swal.fire({
                  toast: true,
                  position: 'top-end',
                  icon: 'success',
                  title: this.message,
                  showConfirmButton: false,
                  timer: 1500
                });
                this.getEditBusGroupData(id);
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
        },
    }
</script>