import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import AuthLayout from "../Layouts/AuthLayout.vue";
import MainLayout from "../Layouts/MainLayout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/",
    component: AuthLayout,
    children:[
      {
        path: "/",
        name: "Login",
        component: Login
      },
    ]
  },
  {
    path: "/home",
    redirect: "/home",
    component: MainLayout,
    children:[
      {
        path: "/exceptionmanagement",
        name: "ExecptionManagement",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ExecptionManagement.vue")
          
      },
      {
        path: "/newrequest",
        name: "ExceptionRequest",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ExceptionRequest.vue")
          
      }, 
      {
        path: "/users",
        name: "Users",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Users.vue")
          
      },
      {
        path: "/exceptionmanagement/:id",
        name: "ViewExceptionRequest",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ViewExceptionRequest.vue")
          
      },
       {
        path: "/exceptionmanagementread/:id",
        name: "ViewExceptionReadOnly",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/ViewExceptionReadOnly.vue")
          
      },
      {
        path: "/home",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Home.vue")
          
      },
       {
        path: "/gettingstarted",
        name: "GettingStarted",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/GettingStarted.vue")
          
      }
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
