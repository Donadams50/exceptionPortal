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
    creditdashboard:{},
    debitdashboard:{},
    transactions:[],
    data:[],
    token: localStorage.getItem("token") ||"",
    leadbalance:{}

  },
  plugins: [vuexLocalStorage.plugin],
  // getters: {
  //   isAuthenticated: state => !!state.token && state.token !=null,
  // },
  mutations: {
      // manual credit/debit
      mutatePostCredit(state, data) {
        state.data = data.data
      
      },
       //get all transaction
       CONFIGURATIONTRANSACTIONS(state, transactions) {
      state.transactions = transactions.data
    },
    //get the count for debit in a day
    DebitDashboard(state, debitdashboard) {
      state.debitdashboard = debitdashboard.data
    },
     //get the count for debit in a day
    CreditDashboard(state, creditdashboard) {
      state.creditdashboard = creditdashboard.data
    },

      // gets all categories
      LOGIN_SUCCESS(state, data) {
        state.data = data.data
      //  console.log(state.componentItems)
      },

      TOKEN (state, token){
        state.token = token
      },
      leadBalance(state, data) {
        state.leadbalance = data.data
      },

  },
  actions: {
     //to post a manual credit/debit
    postCredit ({commit}, newManualCredit ) {
      axios.defaults.headers.common['Token'] = localStorage.getItem("token")
        return new Promise ((resolve, reject)=>{
        axios
          .post('/asteroid/webapi/secure/interswitch/lead_account/transactions' , newManualCredit)  
          .then((data) => {
            console.log(data)
            resolve(data)
           commit('mutatePostCredit', data)
              }) 
              .catch((error)=>{
                
                console.log(error)
                reject(error)
               
              });
        });   
    },
    //to get all transaction
  loadTransactions ({ commit }, payload) {
  //  alert(payload.from_date)
  //   console.log(payload)
    axios.defaults.headers.common['Token'] = localStorage.getItem("token")
    return new Promise ((resolve, reject)=>{
     // serviceCharge = await axios.get(''+baseUrl+'/asteroid/webapi/3ptwebapp/service_charge?performed_by='+customerId+'&origin='+origin+'&amount='+amount+'' , {headers: headers})  
     axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions?subtype='+payload.subtype+'&from_date='+payload.from_date+'&to_date='+payload.to_date+'' )  
     //axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions' )  
    .then((data)=>{
      console.log(data)
      resolve(data)
      commit('CONFIGURATIONTRANSACTIONS', data)
    })
    .catch((error)=>{
      reject(error)
      // alert(error)
    });
     
      });
  
  },
   //to post Login to the database
 Login({commit}, newLogin ) { 
  console.log(newLogin)
   let data={}
  return new Promise ((resolve, reject)=>{
  axios
    .post('/asteroid/webapi/login', data,
      {auth:{username:newLogin.username, password:newLogin.password}}) 
    .then((data) => {
     const token  = data.data.token;
     console.log(data)
     console.log(token)
     localStorage.setItem("token", token)
     axios.defaults.headers.common['Token'] = localStorage.getItem("token") || token 
    
          commit('LOGIN_SUCCESS', data)
           commit('TOKEN', token)
           resolve(data)
        }) 
        .catch(function (response){
       //   console.log(response)
          localStorage.removeItem("token") // if the request fails, remove any possible user token if possible
          reject(response)
       
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

 //to get the balance of lead account
 loadLeadAccount ({ commit }) {
   
  axios.defaults.headers.common['Token'] = localStorage.getItem("token")
  return new Promise ((resolve, reject)=>{
  axios.get('/asteroid/webapi/secure/interswitch/lead_account/balance' )
  .then((data)=>{
    console.log(data)
    resolve(data)
    commit('leadBalance', data)
  })
  .catch((error)=>{
    reject(error)
    // alert(error)
  });
   
    });

},
  //to get THE COUNT OF AL DEBIT IN A DAY
  loadDebitDashboard ({ commit }) {
    var today = new Date();
    var timestamp=new Date(today).getTime();
      var todate=new Date(timestamp).getDate();
      var tomonth=new Date(timestamp).getMonth()+1;
      var toyear=new Date(timestamp).getFullYear();
      var Start_Date =  toyear+'-'+tomonth+'-'+todate
    //alert(Start_Date)
     axios.defaults.headers.common['Token'] = localStorage.getItem("token")
     return new Promise ((resolve, reject)=>{
     
    axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions/count?type=DEBIT&from_date='+Start_Date+'&to_date='+Start_Date+' ' )  
    //  axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions/count?type="DEBIT"' ) 
     .then((data)=>{
       console.log(data)
       resolve(data)
       commit('DebitDashboard', data)
     })
     .catch((error)=>{
       reject(error)
       // alert(error)
     });
      
       });
   
   },
    //to get all transaction
  loadCreditDashboard ({ commit }) {
  
    var today = new Date();
    var timestamp=new Date(today).getTime();
      var todate=new Date(timestamp).getDate();
      var tomonth=new Date(timestamp).getMonth()+1;
      var toyear=new Date(timestamp).getFullYear();
      var Start_Date = toyear+'-'+tomonth+'-'+todate
   // alert(Start_Date)
    axios.defaults.headers.common['Token'] = localStorage.getItem("token")
    return new Promise ((resolve, reject)=>{
     // serviceCharge = await axios.get(''+baseUrl+'/asteroid/webapi/3ptwebapp/service_charge?performed_by='+customerId+'&origin='+origin+'&amount='+amount+'' , {headers: headers})  
    axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions/count?type=CREDIT&from_date='+Start_Date+'&to_date='+Start_Date+' ' ) 
    // axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions/count?type="CREDIT"' )
    
     //axios.get('/asteroid/webapi/secure/interswitch/lead_account/transactions' )  
    .then((data)=>{
      console.log(data)
      resolve(data)
      commit('CreditDashboard', data)
    })
    .catch((error)=>{
      reject(error)
      // alert(error)
    });
     
      });
  
  }

  },

  modules: {}
});
