<template>
    <div id="edit-bus-driver">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Edit Bus Assign To Driver</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="editBusAssignDriver">

                            <div class="form-group row">
                                <label class="control-label">Bus Group</label>
                                <select name="bus_group_id" v-model="editBusDriver.bus_group_id" class="form-control" v-on:change='getBusNumber()'>
                                    <option value="">Chose Bus Group</option>
                                    <option v-for="bus in bus_groups" :key="bus.id" :value="bus.id">{{ bus.bus_group_name }}</option>
                                </select>
                                <span v-if="errors.bus_group_id" class="text-danger">{{errors.bus_group_id[0]}}</span>
                            </div>

                            <div class="form-group row" v-if="editBusDriver">
                                <label class="control-label">Bus Number</label>
                                <select name="bus_assign_id" v-model="editBusDriver.bus_assign_id" class="form-control">
                                    <option value="">Chose Bus Number</option>
                                    <option v-for="bn in bus_numbers" :value="bn.id" v-if="editBusDriver.bus_group_id == bn.bus_group_id ? true : false">{{ bn.bus_number }}</option>
                                </select>
                            </div>


                            <div class="form-group row">
                                <label class="control-label">Driver name</label>
                                <input type="text" :value="current_driver.name" class="form-control">
                            </div>


                            <div class="form-group row">
                                <label class="control-label">Assign Date</label>
                                <input type="date" name="assign_date" v-model="editBusDriver.assign_date" class="form-control">
                            </div>


                            <div class="form-group">
                                <router-link :to="`/dashboard/assign_driver/${this.editBusDriver.bus_driver_id}`" class="btn btn-warning">Back</router-link>
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
      name: "EditBusDriver",
      title: "Bus Finder - Edit Bus Finder",
      data(){
        return{
          errors: {}
        }
      },

      computed: {
        ...mapState({
          current_driver: state => state.bus_driver.current_driver,
          editBusDriver: state => state.bus_driver.bus_assign_to_d,
          bus_number: state => state.bus_driver.bus_number,
          bus_numbers: state => state.bus_driver.all_bus_numbers,
          bus_groups: state => state.bus_owner.bus_groups,
          message: state => state.bus_driver.success_message
        })
      },

      mounted(){
        this.getBusGroups();
        this.getEditBusAssign(this.$route.params.id)
        this.getAllBusNumber();
        this.getDriver(this.$route.params.user_id)
      },

      methods: {
        ...mapActions({
          getBusGroups: 'bus_owner/get_bus_gourp',
          getEditBusAssign: 'bus_driver/getEditBusAssign',
          getDriver: 'bus_driver/get_Assign_driver',
        }),

        getAllBusNumber: async function(){
          try {
            let bus_group_id = this.$route.params.id;

            await this.$store.dispatch('bus_driver/get_all_bus_number', bus_group_id);

          } catch (e) {
            console.log(e);
          }
        },

        getBusNumber: async function () {
          try {
            let bus_group_id = this.editBusDriver.bus_group_id;

            await this.$store.dispatch('bus_driver/get_bus_number', bus_group_id);
            this.editBusDriver.bus_assign_id = '';
          } catch (e) {
            console.log(e);
          }

        },

        editBusAssignDriver: async function(){
          try {
            let id = this.$route.params.id;
            let user_id = this.$route.params.user_id;

            let formData = new FormData();
            formData.append('bus_group_id', this.editBusDriver.bus_group_id);
            formData.append('bus_assign_id', this.editBusDriver.bus_assign_id);
            formData.append('bus_driver_id', user_id);
            formData.append('assign_date', this.editBusDriver.assign_date);

            await this.$store.dispatch('bus_driver/update_bus_driver', {id:id, data:formData}).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.getEditBusAssign(id);
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