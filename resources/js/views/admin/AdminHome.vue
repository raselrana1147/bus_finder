<template>
    <div id="admin-home">
        <div class="wrapper">
            <Header />

            <Sidebar />

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <!-- Content Header (Page header) -->
                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="m-0 text-dark">Welcome Bus Finder</h1>
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                                    <li class="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                <!-- /.content-header -->

                <!-- Main content -->
                <section class="content">
                    <div class="container-fluid">

                        <!-- Main row -->
                        <router-view></router-view>
                        <!-- /.row -->
                    </div><!--/. container-fluid -->
                </section>
                <!-- /.content -->
            </div>
            <!-- /.content-wrapper -->

            <SFooter/>
        </div>
    </div>
</template>

<script>
      import Header from '../../components/admin/Header.vue';
      import Sidebar from '../../components/admin/Sidebar.vue';
      import SFooter from '../../components/admin/Footer.vue';

    export default{
      name: "AdminHome",
      title: "Bus Finder",
      components: {
        Header,
        Sidebar,
        SFooter
      }
    }
</script>