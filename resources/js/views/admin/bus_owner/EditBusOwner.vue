<template>
    <div id="edit-bus-owner">
        <div class="row">
            <div class="col-md-12">

                <div class="card card-primary">
                    <div class="card-header">Edit Bus Owner</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="editBusOwner">

                            <div class="form-group row">
                                <label class="control-label">Bus Group</label>
                                <select name="bus_group_id" v-model="editBusOwnerData.bus_group_id" class="form-control">
                                    <option value="">Chose Bus Group</option>
                                    <option v-for="bus in bus_groups" :key="bus.id" :value="bus.id">{{ bus.bus_group_name }}</option>
                                </select>
                                <span v-if="errors.bus_group_id" class="text-danger">{{errors.bus_group_id[0]}}</span>
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Owner</label>
                                <select name="owner_id" v-model="editBusOwnerData.owner_id" class="form-control">
                                    <option value="">Chose Owner</option>
                                    <option v-for="owner in owners" :key="owner.id" :value="owner.id">{{ owner.name }}</option>
                                </select>
                                <span v-if="errors.owner_id" class="text-danger">{{errors.owner_id[0]}}</span>
                            </div>

                            <div class="form-group row">
                                <label class="control-label">Date</label>
                                <input type="date" name="assign_date" v-model="editBusOwnerData.assign_date" class="form-control">
                                <span v-if="errors.assign_date" class="text-danger">{{errors.assign_date[0]}}</span>
                            </div>

                            <div class="form-group">
                                <router-link to="/dashboard/bus_owner" class="btn btn-warning">Back</router-link>
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
      name: "EditBusOwner",
      title: "Bus Finder - EditBusOwner",
      data(){
        return{
          errors: {}
        }
      },

      computed: {
        ...mapState({
          editBusOwnerData: state => state.bus_owner.bus_owner,
          bus_groups: state => state.bus_owner.bus_groups,
          owners: state => state.bus_owner.owners,
          message: state => state.bus_owner.success_message
        })
      },

      mounted(){
        this.getBusGroups();
        this.getOwner();
        this.getEditBusOwner(this.$route.params.id);
      },

      methods: {
        ...mapActions({
          getEditBusOwner: 'bus_owner/edit_bus_owner',
          getBusGroups: 'bus_owner/get_bus_gourp',
          getOwner: 'bus_owner/get_owner',
        }),

        editBusOwner: async function(){
          try {
            let id = this.$route.params.id;
            let formData = new FormData();
            formData.append('bus_group_id', this.editBusOwnerData.bus_group_id);
            formData.append('owner_id', this.editBusOwnerData.owner_id);
            formData.append('owner_id', this.editBusOwnerData.owner_id);
            formData.append('assign_date', this.editBusOwnerData.assign_date);

            await this.$store.dispatch('bus_owner/update_bus_owner', {id:id, data:formData}).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.getEditBusOwner(id);
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