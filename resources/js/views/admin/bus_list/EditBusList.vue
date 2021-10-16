<template>
    <div id="edit-bus-list">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Edit Bus Assign</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="editBusLists">

                            <div class="form-group row">
                                <label class="control-label">Bus Group</label>
                                <select name="bus_group_id" v-model="editBusList.bus_group_id" class="form-control" v-on:change='getOwner()'>
                                    <option value="">Chose Bus Group</option>
                                    <option v-for="bus in bus_groups" :key="bus.id" :value="bus.id">{{ bus.bus_group_name }}</option>
                                </select>
                                <span v-if="errors.bus_group_id" class="text-danger">{{errors.bus_group_id[0]}}</span>
                            </div>

                            <!--<div class="form-group row">-->
                                <!--<label class="control-label">Owner</label>-->
                                <!--<select name="bus_group_id" v-model="editBusList.owner_id" class="form-control">-->
                                    <!--<option value="">Chose Owner</option>-->
                                    <!--<option :value="owner.id" v-if="editBusList.bus_group_id === owner.bus_group_id ? true : ''">{{ owner.owner_name }}</option>-->
                                <!--</select>-->
                            <!--</div>-->

                            <div class="form-group row">
                                <label class="control-label">Owner</label>
                                <input type="text" v-model="editBusList.owner_name" class="form-control">
                                <input type="hidden" v-model="editBusList.owner_id" class="form-control">
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Bus Number</label>
                                <input type="text" name="bus_number" v-model="editBusList.bus_number" class="form-control">
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Date</label>
                                <input type="date" name="assign_date" v-model="editBusList.assign_date" class="form-control">
                                <span v-if="errors.assign_date" class="text-danger">{{errors.assign_date[0]}}</span>
                            </div>

                            <div class="form-group">
                                <router-link to="/dashboard/bus_assign" class="btn btn-warning">Back</router-link>
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
      name: "EditBusList",
      title: "Bus Finder - Edit Bus List",
      data(){
        return{
          errors: {}
        }
      },

      computed: {
        ...mapState({
          editBusList: state => state.bus_list.bus_list,
          bus_groups: state => state.bus_owner.bus_groups,
          owner: state => state.bus_list.owner,
          message: state => state.bus_list.success_message
        })
      },

      created(){
        this.getBusGroups();
      },

      mounted(){
        this.getBusList(this.$route.params.id);
      },

      methods: {
        ...mapActions({
          getBusGroups: 'bus_owner/get_bus_gourp',
          getBusList: 'bus_list/edit_bus_list'
        }),

        getOwner: async function () {
          try {
            let bus_group_id = this.editBusList.bus_group_id;

            await this.$store.dispatch('bus_list/get_owner_info', bus_group_id);
          } catch (e) {
            console.log(e);
          }
        },

        editBusLists: async function(){
          try {
            let id = this.$route.params.id;
            let formData = new FormData();
            formData.append('bus_group_id', this.editBusList.bus_group_id);
            formData.append('owner_id', this.editBusList.owner_id);
            formData.append('bus_number', this.editBusList.bus_number);
            formData.append('assign_date', this.editBusList.assign_date);

            await this.$store.dispatch('bus_list/update_bus_list', {id:id, data:formData}).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });
              this.getBusList(id);
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