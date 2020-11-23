import Vue from "vue";
import Router from "vue-router";
import MainLayout from "../Layouts/MainLayout.vue";
import Home from "../views/Home.vue";
import Users from "../views/Users.vue";
import ExecptionManagement from "../views/ExecptionManagement.vue";
import ExceptionRequest from "../views/ExceptionRequest.vue";
import ViewExceptionReadOnly from "../views/ViewExceptionReadOnly.vue";
import GettingStarted from "../views/GettingStarted.vue";
import ViewExceptionRequest from "../views/ViewExceptionRequest.vue";

Vue.use(Router);



import auth from '../app/auth';
//import LogoutSuccess from '@/components/LogoutSuccess';
  // app/user-info-store';
import UserInfoApi from '../app/user-info-api';
//import ErrorComponent from '@/components/Error';



function requireAuth(to, from, next) {
  
    if (!auth.auth.isUserSignedIn()) {  
      alert("jj")
   // this.$store.state.loggedIn = true
      next({
      path: '/login',
     query: { redirect: to.fullPath }, 
      });
    
     } 
    else {
    alert("hh")
    next()
    UserInfoApi.getUserInfo().then(response => {
    // this.$store.state.loggedIn = true
    // this.$store.state.cognitoInfo = response
      console.log(response)
       next();
    });
      
  }
}

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
  
    { 
          
          path: "/exceptionmanagement",      
          name: "ExecptionManagement",
          component: ExecptionManagement,
          beforeEnter: requireAuth
        },
        {
          path: "/newrequest",
          name: "ExceptionRequest",
          component: ExceptionRequest,
          beforeEnter: requireAuth
            
        }, 
        {
          path: "/users",
          name: "Users",
          component: Users,
          beforeEnter: requireAuth
            
        },
        {
          path: "/exceptionmanagement/:id",
          name: "ViewExceptionRequest",
          component: ViewExceptionRequest,
          beforeEnter: requireAuth
            
        },
         {
          path: "/exceptionmanagementread/:id",
          name: "ViewExceptionReadOnly",
          component: ViewExceptionReadOnly,
          beforeEnter: requireAuth
            
        },
        {
          path: "/",
          name: "Home",
          component: Home,
         beforeEnter: requireAuth
            
          
        
            
        },
         {
          path: "/gettingstarted",
          name: "GettingStarted",
          component: GettingStarted,
          beforeEnter: requireAuth
            
        },
      
    {
            path: '/login',  beforeEnter(to, from, next){          
          auth.auth.getSession() 
      
      }

    },
    
    
    // {
    //   path: '/logout', component: ,  beforeEnter(to, from, next){
    //     auth.logout();
    //     next();
    //   }

    // },
   
  ]
})
// const routes = [
//   {
//     path: "/",
//     redirect: "/",
//     component: AuthLayout,
//     children:[
//       {
//         path: "/",
//         name: "Login",
//         component: Login
//       },
//     ]
//   },
  
  
//];

// const router = new VueRouter({
//   routes
// });

// export default router;
