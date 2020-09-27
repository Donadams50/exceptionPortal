<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
     <v-row justify="center">
    <v-dialog  v-model="dialog" persistent max-width="500px">
      <v-card style="box-shadow: 0px 4px 22px rgba(86, 2, 2, 0.19);  ">
           <v-card-title>
          <span color="rgb(40, 31, 71)" class="headline">You session has expired, </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="username" label="User Id" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <!-- <v-text-field v-model="password" label="Password*" @keyup="Login()" required ></v-text-field> -->
                <p style="text-align:left; color: white; font-family:Lato; margin-bottom:-1px">Password</p>
                <v-text-field   v-model="password" style="border-radius:0px;" label="Password"
                 :rules="[rules.required, rules.min]"
            
                placeholder="Your Password" ></v-text-field>
                <p style="text-align:right; color: black; font-size: 15px; font-weight: 200px; font-family:Lato; margin-top:-5px">Login into another account?</p>
              </v-col>
             
            </v-row>
          </v-container>
          
        </v-card-text>
        <v-card-actions>
           <div id="loginbutton">   
                    <v-btn rounded   @click="Login()" color="rgb(40, 31, 71)" class="text-capitalize pl-7 pr-7 " style="font-family: Lato;" dark large>Submit</v-btn>
                
            </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </v-app>
     
   

</template>

<script>
import axios from 'axios'


export default {
  name: 'App',
  data: () => ({
      username:"",
      dialog: false,
      password: " ",
      show3: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 5 || 'Min 5 characters',
        },
  
  }),
  
    methods :{
       Login(){
          alert(this.username)
           alert(this.password)
          let newLogin = {
        username :this.username,
        password :this.password
 }
         
           this.$store.dispatch('Login', newLogin)
          .then((success)=>{
              console.log(success.data);
              alert(success.data);
               this.dialog = false;
                  
             
          })
          .catch((error)=>{
              console.log(error)
              
               alert(error)
                
          })

         
               
          }
      },
//    created: function () {
//     axios.interceptors.response.use(null, error => {
//       console.log(error.response)
//         if (error.response.status === 401) {
//           this.$store.dispatch('LogOut');
//          //  this.dialog = true;
//         this.$router.push('/')
//         }

//         return Promise.reject(error);
// });
// }

};
</script>
<style >
#app {
  font-family: 'Avenir', 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
