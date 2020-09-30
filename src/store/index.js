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
    LOGIN_SUCCESS: [],
    allException: [],
    myException: [],
    myExceptionReal: [],
    singleRequest: [],
    history: []
   

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
      
      allException(state, allException) {
            let array = allException.data
      for (let i = 0; i < array.length; i++) {
        array[i].role = state.LOGIN_SUCCESS[0].user_ROLE.S
      }
        state.allException = array

      },
      
      myException(state, myException) {
        
         
     
        state.myException = myException
      
      },
      
      singleRequest(state, singleRequest) {
        state.singleRequest = singleRequest.data
      
      },
      
      history(state, history) {
        state.history = history.data
      
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
          //   .delete('https://x084zktapc.execute-api.us-east-1.amazonaws.com/Test/?user_ID=sumbomatic@gmail.com')  
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
   //to get all transaction
   loadallException ({ commit }) {
  
    return new Promise ((resolve, reject)=>{
     axios.get('https://aynuytxoo3.execute-api.us-east-1.amazonaws.com/Test/' )  
     
    .then((data)=>{
   //   console.log(data)
      resolve(data)
      commit('allException', data)
    })
    .catch((error)=>{
      reject(error)
      // alert(error)
    });
     
      });
  
  },
  
   //to get all transaction
   loadMyException ({ commit }, userId) {
   
    return new Promise ((resolve, reject)=>{
     axios.get('https://aynuytxoo3.execute-api.us-east-1.amazonaws.com/Test/?SearchKey=RequestorID&SearchValue='+userId+'' )  
     
    .then((data)=>{
      console.log('first')
      

       resolve(data)
     
     let array = data.data
            console.log(array.length)
      let emptyObject = {
          
        }
        let emptyArray = []
      
      for (let i = 0; i < array.length; i++) {
        
       emptyObject.RequestID = array[i].RequestID.S
        emptyObject.ExceptionType = array[i].ExceptionType.S
         emptyObject.RequestorName = array[i].RequestorName.S
         emptyObject.Division = array[i].Division.S
         emptyObject.ApplicationCode = array[i].ApplicationCode.S
         emptyObject.ExceptionLifetime = array[i].ExceptionLifetime.S
         emptyObject.RequestStatus = array[i].RequestStatus.S
      
         emptyArray.push(emptyObject)
        
      }
    //  console.log(emptyArray)
    // console.log(this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S)
     // commit('myException', data)
      commit('myException', emptyArray)
    })
    .catch((error)=>{
      reject(error)
      // alert(error)
    });
     
      });
  
  },

    loadSingleRequest ({ commit }, requestId) {
   
    return new Promise ((resolve, reject)=>{
     axios.get('https://aynuytxoo3.execute-api.us-east-1.amazonaws.com/Test/?SearchKey=RequestID&SearchValue='+requestId+'' )  
     
    .then((data)=>{
     // console.log('second')
      

       resolve(data)
     
    
    
      commit('singleRequest', data)
    })
    .catch((error)=>{
      reject(error)
      // alert(error)
    });
     
      });
  
  },
  //
    loadHistory ({ commit }, requestId) {
   
    return new Promise ((resolve, reject)=>{
     axios.get('https://d9ntc5522m.execute-api.us-east-1.amazonaws.com/Test/?RequestID='+requestId+'' )  
     
    .then((data)=>{
      console.log('second')
      console.log(data)

      

       resolve(data)
     
    
    
      commit('history', data)
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
