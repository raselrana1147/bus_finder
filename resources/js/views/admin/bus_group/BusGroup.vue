<template>
    <div id="bus-group">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <router-link to="/dashboard/add_bus_group" class="btn btn-sm btn-primary  float-right"><i class="fas fa-plus"></i> Add New</router-link>
                        <h3 class="card-title">Bus Group</h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">

                        <div class="mb-3">

                            <div class="float-left">
                                <label>
                                    Show
                                    <select name="example_length" aria-controls="example" v-model="tableData.length" @change="getBusGroups()">
                                        <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                                    </select>
                                    entries
                                </label>
                            </div>

                            <div class="float-right">
                                <label for="">Search:
                                    <input class="input" type="text" v-model="tableData.search" placeholder="Search Table" @input="getBusGroups()">
                                </label>
                            </div>

                        </div>


                        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
                            <tbody>
                            <tr v-show="bus_groups.length" v-for="(bus,index) in bus_groups" :key="bus.id">
                                <td>{{index + 1}}</td>
                                <td>{{bus.bus_group_name }}</td>
                                <td>
                                    <router-link :to="`/dashboard/edit_bus_group/${bus.id}`" class="btn btn-info btn-sm"><i class="fa fa-edit"></i></router-link>
                                    <button v-on:click="deleteBusGroup(bus)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>

                            <tr v-show="!bus_groups.length">
                                <td colspan="3">
                                    <div class="alert alert-danger" role="alert">
                                        Sorry: (No Data Found)
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </datatable>

                        <pagination :pag="pag" :offset="5" @paginate="getBusGroups();"></pagination>
                    </div>
                    <!-- /.card-body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import DataTable from '../../../components/datatable/Datatable.vue';
  import Pagination from '../../../components/datatable/Pagination.vue';

  import {mapState, mapActions} from 'vuex';

    export default{
        name: "BusGroup",
        title: "Bus Finder - BusGroup",
        components: { datatable: DataTable, pagination: Pagination },
        data(){
          let sortOrders = {};
          let columns = [
            {label: '#Sl', name: 'id' },
            {label: 'Bus Group name', name: 'bus_group_name'},
            {label: 'Action', name: 'action'},
          ];
          columns.forEach((column) => {
            sortOrders[column.name] = -1;
          });

          return{
            columns: columns,
            sortKey: 'id',
            sortOrders: sortOrders,
            perPage: ['10', '20', '30','25','50','100'],
            tableData: {
              draw: 0,
              length: 10,
              search: '',
              column: 0,
              dir: 'desc',
            },
            pagination: {
              last_page: '',
              current_page: 1,
              total: '',
              last_page_url: '',
              next_page_url: '',
              prev_page_url: '',
              from: '',
              to: ''
            },
          }
        },

        computed: {
          ...mapState({
                bus_groups: state => state.busGroup.bus_groups,
                pag: state => state.busGroup.pagination,
                message: state => state.busGroup.success_message
          })
        },

        mounted(){
          this.getBusGroups();
        },

      methods: {

        getBusGroups: async function(){
          this.tableData.draw++;
          try {
            let params = new URLSearchParams();
            params.append('page', this.pagination.current_page);
            params.append('draw', this.tableData.draw);
            params.append('length', this.tableData.length);
            params.append('search', this.tableData.search);
            params.append('column', this.tableData.column);
            params.append('dir', this.tableData.dir);

            await this.$store.dispatch('busGroup/get_bus_gourps', params);

          }catch (error){
            console.log(error);
          }
        },

        sortBy(key) {
          this.sortKey = key;
          this.sortOrders[key] = this.sortOrders[key] * -1;
          this.tableData.column = this.getIndex(this.columns, 'name', key);
          this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
          this.getBusGroups();
        },

        getIndex(array, key, value) {
          return array.findIndex(i => i[key] == value)
        },

        deleteBusGroup: async function(bus){
          try {
            await this.$store.dispatch('busGroup/delete_bus_group', bus.id).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.getBusGroups();
            })
          }catch (e){
            console.log(e);
          }
        }

      }
    }
</script>