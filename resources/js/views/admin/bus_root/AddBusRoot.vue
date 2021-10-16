<template>
    <div id="add-bus-root">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Add Bus Root</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="addBusRoot">

                            <div class="form-group row">
                                <label class="control-label">Bus Group</label>
                                <select name="bus_group_id" v-model="busRootData.bus_group_id" class="form-control">
                                    <option value="">Chose Bus Group</option>
                                    <option v-for="bus in bus_groups" :key="bus.id" :value="bus.id">{{ bus.bus_group_name }}</option>
                                </select>
                                <span v-if="errors.bus_group_id" class="text-danger">{{errors.bus_group_id[0]}}</span>
                            </div>


                            <div class="form-group row">
                                <label class="control-label">Root Point Name</label>
                                <input type="text" name="root_point_name" v-model="busRootData.root_point_name" class="form-control">
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Longitude</label>
                                <input type="text" name="longitude" v-model="busRootData.longitude" class="form-control">
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Latitude</label>
                                <input type="text" name="latitude" v-model="busRootData.latitude" class="form-control">
                            </div>

                            <div class="form-group">
                                <router-link to="/dashboard/bus_root" class="btn btn-warning">Back</router-link>
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
      name: "AddBusRoot",
      title: "Bus Finder - Add Bus Root",
      data(){
        return{
          busRootData: {
            bus_group_id: '',
            root_point_name: '',
            longitude: '',
            latitude: ''
          },

          errors: {}
        }
      },
      computed: {
        ...mapState({
          bus_groups: state => state.bus_owner.bus_groups,
          message: state => state.bus_root.success_message
        })
      },

      mounted(){
        this.getBusGroups();
      },

      methods: {
        ...mapActions({
          getBusGroups: 'bus_owner/get_bus_gourp',
        }),

        addBusRoot: async function(){
          try {
            let formData = new FormData();
            formData.append('bus_group_id', this.busRootData.bus_group_id);
            formData.append('root_point_name', this.busRootData.root_point_name);
            formData.append('longitude', this.busRootData.longitude);
            formData.append('latitude', this.busRootData.latitude);

            await this.$store.dispatch('bus_root/add_bus_root', formData).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.busRootData = {};
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