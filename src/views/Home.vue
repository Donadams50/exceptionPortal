<template>
     <div id="registeruser" >
               <Navbar/>
               
    
    
      
    
            
                           <v-toolbar flat  color="">
                            <div style="font-size:20px;  " class="text-h6 mt-7 mx-auto "> Raise security and platform exception request and get your application exempted from specific restriction </div>
                             <!-- <v-spacer></v-spacer> -->
                             <!-- <v-btn rounded   class=" text-none mt-5 mr-5" @click="newUser()">
                            <div style="font-size:13px;   text-align:right;" class=" mx-1 "> 
                                Add new user
                            </div>
                            </v-btn> -->
                            </v-toolbar>

                 <v-card class="mt-8 mx-3">
  
              <v-card-title>
              <div style="font-size:20px; font-weight: bold; text-align:center;" class="text-h6  mx-auto "> Instruction for portal usage </div>
               
                
              </v-card-title>
              <v-card-text>
                  <p style="font-size:16px; font-family: Poppins  text-align:center;" class=" mt-3 mx-auto "> The portal enables requester to raise security and platform exception.
                      Platform exception request on approval will ensure compliance engine would bypass requested rule for respective 
                      application. The items with status <b color="Red">approved</b> in this portal will not be modified /terminated/actioned
                      upon by the requester. Every request will be assigned a status of <b>Awaiting-response</b>authomatically. The exception with <b>Awaiting-status</b> state would still be actioned upon by ratifier. Only ratifier would 
                      would have te priviledge to convert the status of the bypass items to <b>approved</b> after thorough validations.
                      Every entry in this website is time limited depending on the underlying mechanism of approval. If applicationteams have to extend the request before expiry, raise a new extension request in portal which 
                      is followed by approval process. Only CRE'S are eligible for filling exception request
                      </p>
              </v-card-text>
              <v-row class="text-center pb-10 mt-12 mb-10">
             <v-col cols="12" md="12">
              <div  style=" " class="text-center ">
               <v-btn text-color="rgb(40, 31, 71)" rounded class="text-none" :loading ="loading"  @click="submit()"    >
                   Get Started</v-btn >
                  </div> 
                  </v-col>              
                  </v-row>
            </v-card>
                         
          </div>
</template>

<script>
import  Navbar from '../components/Navbar'
export default {
    components: {
        Navbar
    },
      data(){
        
    return{
      usid : '',
      newuser: false,
      newuseredit: false,
      deletedialog: false,
     
         
           
      
      loading: false,
      loading1: false,
      load: false,
       numberRule: val => {
      if(val < 0 || val=== "") return 'Please enter a positive number'
      return true
    },
      inputRule: val1 => {
      if( val1 === "") return 'Field cannot be empty'
      return true
    },
    emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
    searchword:"",
    ename:'',
    eemail: '',
    euserType: '',
       name:"",
       userType: '',
      email: "",
       items: ['admin', 'role_operations', 'role_developer', 'exception_manager'],
        text: " ",
      text1: " ",
       modal: '',
        snackbar: false,
         snackbar1: false,
        timeout: 6000,
        x: null,
        y: 'top',
        
      
  
    }
  },
   mounted () { 
     
    if(this.$store.state.LOGIN_SUCCESS.length === 0){
          this.$router.push({
         path: "/",
        })
    } else{

    } 
      
       

 
          },
      computed: {
             allusers(){
    
                       return this.$store.state.alUsers
                              }
            
                   },
    methods: {
      newUser(){
       this.newuser = true
      },
      onlyForCurrency ($event) {
     // console.log($event.keyCode); //keyCodes value
     let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

     // only allow number and one dot
     if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || this.amount.indexOf('.') != -1)) { // 46 is dot
      $event.preventDefault();
     }

     // restrict to 2 decimal places
     if(this.amount!=null && this.amount.indexOf(".")>-1 && (this.amount.split('.')[1].length > 1)){
     $event.preventDefault();
     }
   },
submit(){
             setTimeout(() => {
        this.$router.push({
         path: "/newrequest",
        });
      }, 1000)
  //newrequest
}
  
      
  
      

    },
    
}
</script>
<style scoped>
#pagename h3{
  text-align:left;
  padding-left: 30px;
  padding-top: 13px;
  color: #111;
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 22px;
}

</style>