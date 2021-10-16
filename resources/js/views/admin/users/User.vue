<template>
    <div id="user">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <router-link to="/dashboard/add_user" class="btn btn-sm btn-primary  float-right"><i class="fas fa-plus"></i> Add New</router-link>
                        <h3 class="card-title">User </h3>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body">

                        <div class="mb-3">

                            <div class="float-left">
                                <label>
                                    Show
                                    <select name="example_length" aria-controls="example" v-model="tableData.length" @change="getUser()">
                                        <option v-for="(records, index) in perPage" :key="index" :value="records">{{records}}</option>
                                    </select>
                                    entries
                                </label>
                            </div>

                            <div class="float-right">
                                <label for="">Search:
                                    <input class="input" type="text" v-model="tableData.search" placeholder="Search Table" @input="getUser()">
                                </label>
                            </div>

                        </div>


                        <datatable :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy">
                            <tbody>
                            <tr v-show="users.length" v-for="(user,index) in users" :key="user.id">
                                <td>{{index + 1}}</td>
                                <td>{{user.name }}</td>
                                <td>{{user.email }}</td>
                                <td>{{user.phone }}</td>
                                <td>{{user.role_name }}</td>
                                <td>
                                    <div v-if="user.is_active === 0">
                                        <label class="switch patch">
                                            <input type="checkbox" class="status_toggle" v-model="user.is_active" @click="changeUserStatue(user)">
                                            <span class="slider"></span>
                                        </label>
                                    </div>

                                    <div v-else>
                                        <label class="switch patch">
                                            <input type="checkbox" class="status_toggle" v-model="user.is_active" @click="changeUserStatue(user)">
                                            <span class="slider"></span>
                                        </label>
                                    </div>
                                </td>
                                <td>
                                    <router-link :to="`/dashboard/edit_user/${user.id}`" class="btn btn-info btn-sm"><i class="fa fa-edit"></i></router-link>
                                    <button v-on:click="deleteUser(user)" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i></button>
                                </td>
                            </tr>

                            <tr v-show="!users.length">
                                <td colspan="3">
                                    <div class="alert alert-danger" role="alert">
                                        Sorry: (No Data Found)
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </datatable>

                        <pagination :pag="pag" :offset="5" @paginate="getUser();"></pagination>
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
      name: "User",
      title: "Bus Finder - Users",
      components: { datatable: DataTable, pagination: Pagination },
      data(){
        let sortOrders = {};
        let columns = [
          {label: '#Sl', name: 'id' },
          {label: 'Name', name: 'name'},
          {label: 'Email', name: 'email'},
          {label: 'Phone', name: 'phone'},
          {label: 'Role', name: 'role_name'},
          {label: 'Status', name: 'is_active'},
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
          users: state => state.user_setup.users,
          pag: state => state.user_setup.pagination,
          message: state => state.user_setup.success_message
        })

      },

      mounted(){
        this.getUser();
      },

      methods: {

        getUser: async function(){
          this.tableData.draw++;
              try {
                let params = new URLSearchParams();
                params.append('page', this.pagination.current_page);
                params.append('draw', this.tableData.draw);
                params.append('length', this.tableData.length);
                params.append('search', this.tableData.search);
                params.append('column', this.tableData.column);
                params.append('dir', this.tableData.dir);

                await this.$store.dispatch('user_setup/get_user', params);

              }catch (error){
                console.log(error);
              }
        },

        sortBy(key) {
          this.sortKey = key;
          this.sortOrders[key] = this.sortOrders[key] * -1;
          this.tableData.column = this.getIndex(this.columns, 'name', key);
          this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc';
          this.getUser();
        },

        getIndex(array, key, value) {
          return array.findIndex(i => i[key] == value)
        },

        changeUserStatue(user){
          try {
            let id = user.id;
             this.$store.dispatch('user_setup/change_status', id).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });
              this.getUser();
            })
          }catch (e){
            console.log(e);
          }
        },

        deleteUser: async function(user){
          try {
            await this.$store.dispatch('user_setup/delete_user', user.id).then(() => {
              this.$swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: this.message,
                showConfirmButton: false,
                timer: 1500
              });
              this.getUser();
            })
          }catch (e){
            console.log(e);
          }
        }
      }
    }
</script>

<style scoped>
    /* Basic Rules */
    .switch input {
        display:none;
    }
    .switch {
        display:inline-block;
        width:55px;
        height:25px;
        margin:8px;
        transform:translateY(50%);
        position:relative;
    }
    /* Style Wired */
    .slider {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        border-radius:30px;
        box-shadow:0 0 0 2px #777, 0 0 4px #777;
        cursor:pointer;
        border:4px solid transparent;
        overflow:hidden;
        transition:.4s;
    }
    .slider:before {
        position:absolute;
        content:"";
        width:100%;
        height:100%;
        background:#777;
        border-radius:30px;
        transform:translateX(-30px);
        transition:.4s;
    }

    input:checked + .slider:before {
        transform:translateX(30px);
        background:limeGreen;
    }
    input:checked + .slider {
        box-shadow:0 0 0 2px limeGreen,0 0 2px limeGreen;
    }

    /* Style Flat */
    .switch.flat .slider {
        box-shadow:none;
    }
    .switch.flat .slider:before {
        background:#FFF;
    }
    .switch.flat input:checked + .slider:before {
        background:white;
    }
    .switch.flat input:checked + .slider {
        background:limeGreen;
    }
    .patch{
        margin-top: -25px;
    }
</style>