<template>
    <div id="bus-driver">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Bus Driver List </h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">

                        <div class="mb-3">

                            <div class="float-left">
                                <label>
                                    Show
                                    <select name="example_length" aria-controls="example" v-model="tableData.length" @change="getDriver()">
                                        <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                                    </select>
                                    entries
                                </label>
                            </div>

                            <div class="float-right">
                                <label for="">Search:
                                    <input class="input" type="text" v-model="tableData.search" placeholder="Search Table" @input="getDriver()">
                                </label>
                            </div>

                        </div>


                        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
                            <tbody>
                            <tr v-show="driver.length" v-for="(user,index) in driver" :key="user.id">
                                <td>{{index + 1}}</td>
                                <td>
                                    <span v-if="user.image !== null">
                                        <img :src="showImage(user.image)" alt="" width="50px" height="50px">
                                    </span>

                                    <span v-else>No Image Found</span>
                                </td>
                                <td>{{user.name }}</td>
                                <td>{{user.email }}</td>
                                <td>{{user.phone }}</td>
                                <td>{{user.role_name }}</td>
                                <td>
                                    <router-link :to="`/dashboard/assign_driver/${user.id}`" class="btn btn-primary btn-sm"><i class="fa fa-plus"></i></router-link>
                                </td>
                            </tr>

                            <tr v-show="!driver.length">
                                <td colspan="7">
                                    <div class="alert alert-danger" role="alert">
                                        Sorry: (No Data Found)
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </datatable>

                        <pagination :pag="pag" :offset="5" @paginate="getDriver();"></pagination>
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
      name: "BusDriver",
      title: "Bus Finder - Bus Driver",
      components: { datatable: DataTable, pagination: Pagination },
      data(){
        let sortOrders = {};
        let columns = [
          {label: '#Sl', name: 'id' },
          {label: 'Image', name: 'image'},
          {label: 'Name', name: 'name'},
          {label: 'Email', name: 'email'},
          {label: 'Phone', name: 'phone'},
          {label: 'Role', name: 'role_name'},
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
          driver: state => state.bus_driver.bus_drivers,
          pag: state => state.bus_driver.pagination
        })

      },

      mounted(){
        this.getDriver();
      },

      methods: {

        getDriver: async function () {
          this.tableData.draw++;
          try {
            let params = new URLSearchParams();
            params.append('page', this.pagination.current_page);
            params.append('draw', this.tableData.draw);
            params.append('length', this.tableData.length);
            params.append('search', this.tableData.search);
            params.append('column', this.tableData.column);
            params.append('dir', this.tableData.dir);

            await this.$store.dispatch('bus_driver/get_driver', params);

          } catch (error) {
            console.log(error);
          }
        },

        sortBy(key) {
          this.sortKey = key;
          this.sortOrders[key] = this.sortOrders[key] * -1;
          this.tableData.column = this.getIndex(this.columns, 'name', key);
          this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
          this.getDriver();
        },

        getIndex(array, key, value) {
          return array.findIndex(i => i[key] == value)
        },

        showImage(img){
          let serverPath = this.$store.state.serverPath;
          return serverPath+'/assets/admin/uploads/user_image/'+img
        }
      }
    }
</script>