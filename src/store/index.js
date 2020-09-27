import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'
import VueAxios from 'vue-axios'
 import VuexPersist from 'vuex-persist'

Vue.use(Vuex);
Vue.use(VueAxios, axios)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => state,
})

export default new Vuex.Store({
  state: {
    alUsers:[],
    LOGIN_SUCCESS: []
   

  },
  plugins: [vuexLocalStorage.plugin],
  // getters: {
  //   isAuthenticated: state => !!state.token && state.token !=null,
  // },
  mutations: {
      // manual credit/debit
      mutateUser(state, mutateUser) {
        state.mutateUser = mutateUser.data.Items
      
      },
      alUsers(state, alUsers) {
        state.alUsers = alUsers.data.Items
      
      },
      
      LOGIN_SUCCESS(state, LOGIN_SUCCESS) {
        state.LOGIN_SUCCESS = LOGIN_SUCCESS.data.Items
      
      },
       
     

  },
  actions: {
     //to add mew user
     addUser ({commit}, body ) {
       //alert("body")
     // axios.defaults.headers.common['Token'] = localStorage.getItem("token")
        return new Promise ((resolve, reject)=>{
        axios
          .post('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/' , body)  
          .then((data) => {
            console.log(data)
            resolve(data)
           commit('mutateUser', data)
              }) 
              .catch((error)=>{
                alert(error)
                console.log(error)
                reject(error)
               
              });
        });   
    },
     //to add mew user
  //    deleteUser ( {commit}, userId ) {
  //     alert(userId)
  //     console.log(userId)
  //       return new Promise ((resolve, reject)=>{
  //        axios
  //       .delete('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID='+userId+'')  
  //     //   .delete('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID=sumboma@gmail.com')  
  //     //   // https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID=sumboma@gmail.com
  //     //    .then((data) => {
  //        console.log(data)
  //          resolve(pay)
  //          commit('mutateUser', data)
  //            }) 
  //            .catch((error)=>{
  //              //alert(error)
  //              console.log(error)
  //              reject(error)
              
  //            });
         
  //  },
   deleteUser ( {commit}, userId ) {
    //alert("body")
        // axios.defaults.headers.common['Token'] = localStorage.getItem("token")
           return new Promise ((resolve, reject)=>{
           axios
             .delete('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID='+userId+'')   
             .then((data) => {
               console.log(data)
               resolve(data)
             commit('mutateUser', data)
                 }) 
                 .catch((error)=>{
                   alert(error)
                   console.log(error)
                   reject(error)
                  
                 });
           });   
       },
   updateUserDetails ( {commit}, body ) {
//alert("body")
    // axios.defaults.headers.common['Token'] = localStorage.getItem("token")
       return new Promise ((resolve, reject)=>{
       axios
         .post('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/' , body)  
         .then((data) => {
           console.log(data)
           resolve(data)
         commit('mutateUser', data)
             }) 
             .catch((error)=>{
               alert(error)
               console.log(error)
               reject(error)
              
             });
       });   
   },
    //to get all transaction
    loadUsers ({ commit }) {
  
    return new Promise ((resolve, reject)=>{
     axios.get('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/' )  
     
    .then((data)=>{
      console.log(data)
      resolve(data)
      commit('alUsers', data)
    })
    .catch((error)=>{
      reject(error)
      // alert(error)
    });
     
      });
  
  },
   //to post Login to the database
 Login({commit}, userId ) { 
 // alert(userId)
   
  return new Promise ((resolve, reject)=>{
  axios
    .get('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID='+userId+'') 
    .then((data) => {
  
     console.log(data)
   
 //    axios.defaults.headers.common['Token'] = localStorage.getItem("token") || token 
    
          commit('LOGIN_SUCCESS', data)
          
           resolve(data)
        }) 
        .catch((error)=>{
          reject(error)
           alert(error)
        });
  });   
},
LogOut:()=>{
  //alert("start");
  localStorage.removeItem("token")
  localStorage.removeItem("vuex")
        // remove the axios default header
  delete axios.defaults.headers.common['Token']
//alert("finish");
},




  },

  modules: {}
});
