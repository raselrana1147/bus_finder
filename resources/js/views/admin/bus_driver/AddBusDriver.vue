<template>
    <div id="add-bus-driver">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Add Bus Assign To Driver</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="addBusAssignDriver">

                            <div class="form-group row">
                                <label class="control-label">Bus Group</label>
                                <select name="bus_group_id" v-model="busAssignData.bus_group_id" class="form-control" v-on:change='getBusNumber()'>
                                    <option value="">Chose Bus Group</option>
                                    <option v-for="bus in bus_groups" :key="bus.id" :value="bus.id">{{ bus.bus_group_name }}</option>
                                </select>
                                <span v-if="errors.bus_group_id" class="text-danger">{{errors.bus_group_id[0]}}</span>
                            </div>
                            
                            <div class="form-group row">
                                <label class="control-label">Bus Number</label>
                                <select name="bus_assign_id" v-model="busAssignData.bus_assign_id" class="form-control">
                                    <option value="">Chose Bus Number</option>
                                    <option v-for="bn in bus_number" :key="bn.id" :value="bn.id">{{ bn.bus_number }}</option>
                                </select>
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Driver name</label>
                                <input type="text" :value="current_driver.name" class="form-control">
                            </div>


                            <div class="form-group row">
                                <label class="control-label">Assign Date</label>
                                <input type="date" name="assign_date" v-model="busAssignData.assign_date" class="form-control">
                            </div>


                            <div class="form-group">
                                <router-link :to="`/dashboard/assign_driver/${this.$route.params.id}`" class="btn btn-warning">Back</router-link>
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
      name: "AddBusDriver",
      title: "Bus Finder - Add Bus Driver",
      data(){
        return{
          busAssignData:{
            bus_group_id: '',
            bus_assign_id: '',
            assign_date: ''
          },

          errors: {}
        }
      },
      computed: {
        ...mapState({
          current_driver: state => state.bus_driver.current_driver,
          bus_number: state => state.bus_driver.bus_number,
          bus_groups: state => state.bus_owner.bus_groups,
          message: state => state.bus_driver.success_message
        })
      },

      mounted(){
        this.getBusGroups();
        this.getDriver(this.$route.params.id)
      },

      methods: {
        ...mapActions({
          getBusGroups: 'bus_owner/get_bus_gourp',
          getDriver: 'bus_driver/get_Assign_driver',
        }),

        getBusNumber: async function(){
          try {
            let bus_group_id = this.busAssignData.bus_group_id;

            await this.$store.dispatch('bus_driver/get_bus_number', bus_group_id);
          }catch (e){
            console.log(e);
          }

        },

        addBusAssignDriver: async function(){
          try {
            let id = this.$route.params.id;
            let formData = new FormData();
            formData.append('bus_group_id', this.busAssignData.bus_group_id);
            formData.append('bus_assign_id', this.busAssignData.bus_assign_id);
            formData.append('bus_driver_id', id);
            formData.append('assign_date', this.busAssignData.assign_date);

            await this.$store.dispatch('bus_driver/add_bus_driver_to_assign', formData).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.busAssignData = {};
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