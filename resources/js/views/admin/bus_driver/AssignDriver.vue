<template>
    <div id="assign-driver">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <router-link :to="`/dashboard/Add_bus_driver_assign/${this.$route.params.id}`" class="btn btn-sm btn-primary  float-right"><i class="fas fa-plus"></i> Add New</router-link>
                        <h3 class="card-title">Bus Assign Driver List </h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">

                        <div class="mb-3">

                            <div class="float-left">
                                <label>
                                    Show
                                    <select name="example_length" aria-controls="example" v-model="tableData.length" @change="getAssignDriver()">
                                        <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                                    </select>
                                    entries
                                </label>
                            </div>

                            <div class="float-right">
                                <label for="">Search:
                                    <input class="input" type="text" v-model="tableData.search" placeholder="Search Table" @input="getAssignDriver()">
                                </label>
                            </div>

                        </div>


                        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
                            <tbody>
                            <tr v-show="assign_driver.length" v-for="(user,index) in assign_driver" :key="user.id">
                                <td>{{index + 1}}</td>
                                <td>{{user.bus_group_name }}</td>
                                <td>{{user.bus_number }}</td>
                                <td>{{user.driver_name }}</td>
                                <td>{{user.assign_date }}</td>
                                <td>
                                    <router-link :to="`/dashboard/edit_bus_driver_assign/${user.driver_id}/${user.id}`" class="btn btn-info btn-sm"><i class="fa fa-edit"></i></router-link>
                                    <button v-on:click="deleteBusAssignDriver(user)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>

                            <tr v-show="!assign_driver.length">
                                <td colspan="7">
                                    <div class="alert alert-danger" role="alert">
                                        Sorry: (No Data Found)
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </datatable>

                        <pagination :pag="pag" :offset="5" @paginate="getAssignDriver();"></pagination>
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
      name: "AssignDriver",
      title: "Bus Finder - Assign Driver",
      components: { datatable: DataTable, pagination: Pagination },
      data(){
        let sortOrders = {};
        let columns = [
          {label: '#Sl', name: 'id' },
          {label: 'Bus Group Name', name: 'bus_group_name'},
          {label: 'Bus Number', name: 'bus_number'},
          {label: 'Driver Name', name: 'driver_name'},
          {label: 'Assign Date', name: 'assign_date'},
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
          assign_driver: state => state.bus_driver.bus_assign_to_driver,
          pag: state => state.bus_driver.pagination
        })

      },

      mounted(){
        this.getAssignDriver();
      },

      methods: {

        getAssignDriver: async function () {
          this.tableData.draw++;
          try {
            let id = this.$route.params.id;

            let param = new URLSearchParams();
            param.append('page', this.pagination.current_page);
            param.append('draw', this.tableData.draw);
            param.append('length', this.tableData.length);
            param.append('search', this.tableData.search);
            param.append('column', this.tableData.column);
            param.append('dir', this.tableData.dir);

            await this.$store.dispatch('bus_driver/get_assign_driver', {id:id, data:param});

          } catch (error) {
            console.log(error);
          }
        },

        sortBy(key) {
          this.sortKey = key;
          this.sortOrders[key] = this.sortOrders[key] * -1;
          this.tableData.column = this.getIndex(this.columns, 'name', key);
          this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
          this.getAssignDriver();
        },

        getIndex(array, key, value) {
          return array.findIndex(i => i[key] == value)
        },

        deleteBusAssignDriver: async function(user){
          try {
            await this.$store.dispatch('bus_driver/delete_bus_driver', user.id).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });

              this.getAssignDriver();
            })
          }catch (e){
            console.log(e);
          }
        }

      }
    }
</script>