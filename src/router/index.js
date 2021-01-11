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
import  jwt from  "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from 'axios'
import store from '../store';
Vue.use(Router);
//store.sat.config



import auth from '../app/auth';
//import LogoutSuccess from '@/components/LogoutSuccess';
  // app/user-info-store';
import index from '../store/index';




async function requireAuth (to, from, next) {
  return new Promise((resolve,reject)=>{
  
  
    if (auth.auth.isUserSignedIn()) { 
      alert("ii") 
      console.log("kk")
      console.log(auth.auth.isUserSignedIn())
   // this.$store.state.loggedIn = true
      next({
      path: '/login',
    // query: { redirect: to.fullPath }, 
      });
    
     } 
    else {
      console.log(auth.auth)
  console.log(auth.auth.getSession() )
  console.log(auth.auth.signInUserSession.getAccessToken())
  console.log(auth.auth.isUserSignedIn())
  console.log(auth.auth.getCurrentUser())
  console.log(location.href.replace(location.origin, ''))
  const url = window.location.href
  const namew = "id_token"
  name = namew.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  // if (!results) return null;
  // if (!results[2]) return '';
  // return decodeURIComponent(results[2].replace(/\+/g, ' '));
  console.log(results)
  console.log(results[2])
  console.log(decodeURIComponent(results[2].replace(/\+/g, ' ')))
  window.stop();
  const token= results[2]
  const jwk = {
  
      "alg": "RS256",
      "e": "AQAB",
      "kid": "BLts9xaB7u2smwHGez6xcFr7mfm/kaOozU+DBaf2v/U=",
      "kty": "RSA",
      "n": "3y5WUAc4_J4knqCux_RIPGJ70BuszoHVEo99AIbf9jqk07_G_pYCLntsDlmTeXhShvdbhhdns77B3ClAIvJZ7YMB2dV4jB7Megoq2VWsSISuRp9mgHaFlEFWNJ0wmiOZVS6hHsC3iwpeZCYYkaeUTaXUKACtohEk6332Nq5q62HWm2GVqrgA_1IqohbcKX7YILm8r0bjtX6Lz5x9YkUZKt1FU_yVpK9s5G8Nxk7OC7DFoOA0SPxT6tDm5DN5T2XZt0e8RdFPlxzrv2SXvmkpEkzLOJfEFaTvsFGYygwm3GWpHv3C-Kqntghsu2TIWONZ5anla0Xc5ANuSnmvf0_xiQ",
      "use": "sig"
    
      }
    
  
  const pem = jwkToPem(jwk);
   jwt.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
     if(err){
      //console.log (decodedToken)
      console.log ("omo error")
      alert (err)
     }else{
      return new Promise ((resolve, reject)=>{
        axios
          .get('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID='+decodedToken.email+'') 
          .then((data) => {
            console.log("data yes")
            console.log(decodedToken)
           console.log(data.data.Items[0])
           const userData = data.data.Items[0]
          const loginStatus = true
          store.state.loggedIn = loginStatus
           let user_ID= {
            S: userData.user_ID.S
          }
          let user_NAME= {
            S: userData.user_NAME.S
          }
          let user_ROLE= {
            S: userData.user_ROLE.S
          }
           let details = []
          let details1 = {
            user_ID: user_ID,
            user_NAME: user_NAME,
            user_ROLE: user_ROLE

          }
          details.push(details1)
          store.state.LOGIN_SUCCESS = details
                
              }) 
              .catch((error)=>{
                reject(error)
                // alert(error)
                 let user_ID= {
                  S: decodedToken.email
                }
                let user_NAME= {
                  S: decodedToken.email
                }
                let user_ROLE= {
                  S: 'Visitor'
                }
                 let details = []
                let details1 = {
                  user_ID: user_ID,
                  user_NAME: user_NAME,
                  user_ROLE: user_ROLE

                }
                details.push(details1)
                store.state.LOGIN_SUCCESS = details
              });
        }); 
      
       
      next()
     }
     
 });
   // alert("gg")
   // getParameterByName()
    // this.$store.state.loggedIn = true
    // this.$store.state.cognitoInfo = response
 
     //  next();
    
    next()
   
      
  }
})
  
}
async function requireAuth5 (to, from, next) {

  
  
    if (auth.auth.isUserSignedIn()) { 
      alert("ii") 
      console.log("kk")
      console.log(auth.auth.isUserSignedIn())
   // this.$store.state.loggedIn = true
      next({
      path: '/login',
    // query: { redirect: to.fullPath }, 
      });
    
     } 
    else {
      
    next()
   
      
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
          beforeEnter: requireAuth5
        },
        {
          path: "/newrequest",
          name: "ExceptionRequest",
          component: ExceptionRequest,
          beforeEnter: requireAuth5
            
        }, 
        {
          path: "/users",
          name: "Users",
          component: Users,
          beforeEnter: requireAuth5
            
        },
        {
          path: "/exceptionmanagement/:id",
          name: "ViewExceptionRequest",
          component: ViewExceptionRequest,
          beforeEnter: requireAuth5
            
        },
         {
          path: "/exceptionmanagementread/:id",
          name: "ViewExceptionReadOnly",
          component: ViewExceptionReadOnly,
          beforeEnter: requireAuth5
            
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
          beforeEnter: requireAuth5
            
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
