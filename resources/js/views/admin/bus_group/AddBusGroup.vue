<template>
    <div id="add-bus-group">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Add Bus Group</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="addBusGroup">

                            <div class="form-group row">
                                <label class="control-label">Bus Group Name</label>
                                <input type="text" v-model="busGroupData.bus_group_name" name="bus_group_name" id="bus_group_name" class="form-control">
                                <span v-if="errors.bus_group_name" class="text-danger">{{errors.bus_group_name[0]}}</span>
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
    import {mapState} from 'vuex';

    export default{
        name: "AddBusGroup",
        title: "Bus Finder - Add BusGroup",
        data(){
          return{
            busGroupData:{
              bus_group_name: ''
            },

            errors: {}
          }
        },

        computed: {
          ...mapState({
                message: state => state.busGroup.success_message
          })
        },

        methods: {
          addBusGroup: async function(){
                try {
                  let formData = new FormData();
                  formData.append('bus_group_name', this.busGroupData.bus_group_name);

                  await this.$store.dispatch('busGroup/add_bus_group', formData).then(() => {
                    this.$swal.fire({
                      toast: true,
                      position: 'top-end',
                      icon: 'success',
                      title: this.message,
                      showConfirmButton: false,
                      timer: 1500
                    });

                    this.busGroupData = {};

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