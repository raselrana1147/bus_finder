import store from '../store';

import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
    {
        path: "/dashboard",
        component: () => import('../views/admin/AdminHome.vue'),
        children: [
          {
              path: "",
              name: "Dashboard",
              component: () => import('../views/admin/Dashboard.vue')
          },

          {
            path: "bus_group",
            name: "BusGroup",
            component: () => import('../views/admin/bus_group/BusGroup.vue')
          },

          {
            path: "add_bus_group",
            name: "AddBusGroup",
            component: () => import('../views/admin/bus_group/AddBusGroup.vue')
          },

          {
            path: "edit_bus_group/:id",
            name: "EditBusGroup",
            component: () => import('../views/admin/bus_group/EditBusGroup.vue')
          },

          {
            path: "user",
            name: "User",
            component: () => import('../views/admin/users/User.vue')
          },

          {
            path: "add_user",
            name: "AddUser",
            component: () => import('../views/admin/users/AddUser.vue')
          },

          {
            path: "edit_user/:id",
            name: "EditUser",
            component: () => import('../views/admin/users/EditUser.vue')
          },

          {
            path: "bus_owner",
            name: "BusOwner",
            component: () => import('../views/admin/bus_owner/BusOwner.vue')
          },

          {
            path: "add_bus_owner",
            name: "AddBusOwner",
            component: () => import('../views/admin/bus_owner/AddBusOwner.vue')
          },

          {
            path: "edit_bus_owner/:id",
            name: "EditBusOwner",
            component: () => import('../views/admin/bus_owner/EditBusOwner.vue')
          },

          {
            path: "bus_assign",
            name: "BusList",
            component: () => import('../views/admin/bus_list/BusList.vue')
          },
          {
            path: "add_bus_assign",
            name: "AddBusList",
            component: () => import('../views/admin/bus_list/AddBusList.vue')
          },
          {
            path: "edit_bus_assign/:id",
            name: "EditBusList",
            component: () => import('../views/admin/bus_list/EditBusList.vue')
          },

          {
            path: "bus_root",
            name: "BusRoot",
            component: () => import('../views/admin/bus_root/BusRoot.vue')
          },
          {
            path: "add_bus_root",
            name: "AddBusRoot",
            component: () => import('../views/admin/bus_root/AddBusRoot.vue')
          },
          {
            path: "edit_bus_root/:id",
            name: "EditBusRoot",
            component: () => import('../views/admin/bus_root/EditBusRoot.vue')
          },

          {
            path: "bus_driver_assign",
            name: "BusDriver",
            component: () => import('../views/admin/bus_driver/BusDriver.vue')
          },
          {
            path: "assign_driver/:id",
            name: "AssignDriver",
            component: () => import('../views/admin/bus_driver/AssignDriver.vue')
          },
          {
            path: "Add_bus_driver_assign/:id",
            name: "AddBusDriver",
            component: () => import('../views/admin/bus_driver/AddBusDriver.vue')
          },
          {
            path: "edit_bus_driver_assign/:user_id/:id",
            name: "EditBusDriver",
            component: () => import('../views/admin/bus_driver/EditBusDriver.vue')
          }
        ],
          beforeEnter(to, from, next){
            if (!store.getters['AuthToken']){
              return next({
                name: 'Login'
              });
            }else {
              next();
            }
          },
    },


    {
        path: "/",
        name: "Login",
        component: () => import('../views/auth/Login.vue'),
          beforeEnter(to, from, next){
            if(!store.state.token)
            {
              next();
            }else {
              next('/dashboard');
            }
          }
    },

    {
        path: "/register",
        name: "NewRegister",
        component: () => import('../views/auth/NewRegister.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes,
    linkExactActiveClass: "active"
});

export default router;