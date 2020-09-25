<template>
  <div id="loginform">
     <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        color="green"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
     <v-snackbar
      v-model="snackbar1"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      {{ text1 }}
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-form id="logform" >
      <div >
            <div id="loginheader">
             
                <h2>Exception portal</h2>
            </div>
            <div id="loginfields">
                <p style="text-align:left; color: white; font-family:Lato; margin-bottom:-1px">Email</p>
                <v-text-field  v-model="userid"  style="border-radius:0px;" label="User Id" placeholder="Email" ></v-text-field>
                <p style="text-align:left; color: white; font-family:Lato; margin-bottom:-1px">User name</p>
                <v-text-field  v-model="name"  style="border-radius:0px;" label="User Id" placeholder="User name" ></v-text-field>

                <!-- <v-text-field v-model="password" style="border-radius:0px;" label="Password" :append-icon="show3 ? 'mdi-eye' :'mdi-eye-off'"
                 :rules="[rules.required, rules.min]"
                 :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            hint="At least 5 characters"
            value=""
            class="input-group--focused"
            @click:append="show3 = !show3"
                placeholder="Your Password" ></v-text-field> -->
                <p style="text-align:right; color: black; font-size: 12px; font-weight: 200px; font-family:Lato; margin-top:-20px">Forgot Password?</p>
            </div>
            <div id="loginbutton">   
                    <v-btn rounded :loading ="loading"  @click="Login()" color="rgb(40, 31, 71)" class="text-capitalize pl-7 pr-7 " style="font-family: Lato;" dark large>Login</v-btn>
                
            </div>
             </div>
        </v-form>

   


</div>
  
</template>

<script>


export default {
  name: 'Login',

   data () {
      return {
        loading: false,
           text: "",
      text1: "",
       mode: '',
        snackbar: false,
         snackbar1: false,
        timeout: 6000,
        x: null,
        y: 'top',
        name:"",  
        show3: false,
        userid: '',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 5 || 'Min 5 characters',
        },
      }
    },

    methods :{
       Login(){
  this.loading = true
     this.$router.push({ path: "/exceptionmanagement"})
//           let newLogin = {
//         username :this.username,
//         password: this.password,      
//  }
         
//            this.$store.dispatch('Login', newLogin)
//           .then((success)=>{
//               console.log(success.data);
//             this.loading= false;
//                    this.$router.push({ path: "/dashboard"})
             
//           })
//           .catch((error)=>{
              
//               console.log(error.response.data.errorMessage)
//                //alert(error)
//                if(error.response.status === 401){
//                  console.log(error.response.status)
//                  this.loading= false;
//                this.text1 = "Invalid username or password"
//                 this.snackbar1 = true
//                }else{
//                  this.loading= false;
//                this.text1 = error.response.data.errorMessage
//                 this.snackbar1 = true
//                 // console.log(error.response.data.data)
//                }
               
//           })

         
               
          }
      }   
 
}
</script>
<style scoped>
#logform{
    background-color : white; 
     max-width: 500px;
    margin: auto;
    padding: 3.125rem;
    border-radius: 6px;
    height:460px;
}
#loginform{
    background: url(/backgroundLogin.png);
    background-size: cover;
    background-position: center;
    min-height:60vh;
    padding: 7.375rem;
}
#loginheader{
    padding-bottom: 30px;
    text-align: center;
}
#loginbutton{
    padding-bottom: 0px;
    text-align: center;
    margin-top: 70px;
}
#loginheader h2{
    color:rgb(40, 31, 71);
  
}

#loginfields{
    width:90%;
    margin-left: 10px;
}
/* @media only screen and (max-width: 480px) {
  #loginform {
    padding: 5.975rem;
  }
} */
@media only screen and (max-width: 768px) {
  #loginform {
    padding: 1.175rem;
  }
}
</style>
