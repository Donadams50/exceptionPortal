import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/exceptionmanagement",
    name: "ExecptionManagement",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
      
  }
];

const router = new VueRouter({
  routes
});

export default router;
