<template>
     <div id="registeruser" >
              
               <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :color="green"
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
    <v-dialog v-model="deletedialog" width="500" persistent>
            <v-card class="pa-12 mx-auto" id="login" max-width="500" elevation="7">
                <v-system-bar light color="#ffffff" class="mt-n5">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="deletedialog=false">
                        <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-system-bar>
                
                <v-card-text>
                  <div class="text-center mt-5 mb-4" style="">Are you sure you want to delete this user?</div>
                </v-card-text>
                <v-card-actions>

                    <div class="mx-auto">
                       <v-btn   class="text-center" :loading="load"  rounded  @click="deleteDialog()">
                            <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Proceed  
                            </div>
                             </v-btn>
                        
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="newuseredit" width="500" persistent>
            <v-card class="pa-12 mx-auto" id="login" max-width="500" elevation="7">
                <v-system-bar light color="#ffffff" class="mt-n5">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="newuseredit=false">
                        <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-system-bar>
                 <div class="text-center text-h6   mt-5 mb-4" > Edit user details </div>
                  <v-form ref="form">
                <v-card-text>
                 
                     <v-row class="mx-1">
              
               <v-col cols="12" md="12">                
                    <v-text-field  color="rgb(40, 31, 71)" prepend-inner-icon="person" :rules="[inputRule]" v-model="name" label="User name" filled></v-text-field>
                       <!-- <v-text-field  readonly prepend-inner-icon="email"   :rules='emailRules'   color="rgb(40, 31, 71)"   v-model="email" label="Email/User id"  filled></v-text-field> -->
                      <v-select
                      :rules="[v => !!v || 'Item is required']"
                                 prepend-inner-icon="person"
                                v-model="userType"
                              :items="items"  
                                item-value ="Type"
                                item-text="Type"
                                filled
 
                              label="User role"
                                   @input='RefreshTransaction'
       
                                      ></v-select>
                      
              </v-col>
                
               

          </v-row>
                 
              
                </v-card-text>
                 <v-card-actions>

                    <div class="mx-auto">
                       <v-btn   class="text-center" :loading="loading1"  rounded  @click="updateUsers()">
                            <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Submit  
                            </div>
                             </v-btn>
                        
                    </div>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    <v-dialog v-model="newuser" width="500" persistent>
            <v-card class="pa-12 mx-auto" id="login" max-width="500" elevation="7">
                <v-system-bar light color="#ffffff" class="mt-n5">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="newuser=false">
                        <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-system-bar>
                 <div class="text-center text-h6   mt-5 mb-4" > Add new user </div>
                  <v-form ref="form">
                <v-card-text>
                 
                     <v-row class="mx-1">
              
               <v-col cols="12" md="12">                
                    <v-text-field  color="rgb(40, 31, 71)" prepend-inner-icon="person" :rules="[inputRule]" v-model="name" label="User name" filled></v-text-field>
                       <v-text-field  prepend-inner-icon="email"   :rules='emailRules'   color="rgb(40, 31, 71)"   v-model="email" label="Email/User id"  filled></v-text-field>
                      <v-select
                      :rules="[v => !!v || 'Item is required']"
                                 prepend-inner-icon="person"
                                v-model="userType"
                              :items="items"  
                                item-value ="Type"
                                item-text="Type"
                                filled
 
                              label="User role"
                                   @input='RefreshTransaction'
       
                                      ></v-select>
                      
              </v-col>
                
               

          </v-row>
                 
              
                </v-card-text>
                 <v-card-actions>

                    <div class="mx-auto">
                       <v-btn   class="text-center" :loading="loading"  rounded  @click="addUser()">
                            <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Submit  
                            </div>
                             </v-btn>
                        
                    </div>
                </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
            
                           <v-toolbar flat  color="">
                            <!-- <div class="text-h6 mt-5 ml-5 "> Users </div> -->
                             <v-spacer></v-spacer>
                             <v-btn rounded   class=" text-none mt-5 mr-5" @click="newUser()">
                            <div style="font-size:13px;   text-align:right;" class=" mx-1 "> 
                                Add new user
                            </div>
                            </v-btn>
                            </v-toolbar>

                 <v-card class="mt-5 mx-5">
  
              <v-card-title>
              <div class="text-h6  ml-5 "> Users </div>
                <v-spacer></v-spacer>
                <div  class="primary--text">
                  <v-text-field class=" mr-7 ml-3 primary--text" color="primary" placeholder="Search users" v-model="searchWord" @keyup="searchComponent()" prepend-inner-icon="mdi-magnify" ></v-text-field>
                </div>
                
              </v-card-title>
              
              <v-data-table
                :headers="headers"
                :items="allusers"
                :search="searchWord"
                no-data-text='No recent user'
              >
               <!-- <template v-slot:item.action="{ item }">
                    <v-btn text  @click=" viewFeedback(item.id)" style="border: 1px #13095e solid; color:#13095e" class="text-none" small>View</v-btn>
                </template> -->
               <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editUser(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteUsers(item)"
      >
        mdi-delete
      </v-icon>
    </template>
                
              </v-data-table>
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
      desserts: [
           
         
           
        ],
       headers: [
        
         
        // {
        //  text: ' Id',
        //   align: 'left',
        //   sortable: false,
        //   value: 'id',
        // },
           { text: 'Name', value: 'user_NAME' },
         { text: 'User id', value: 'user_ID' },
          { text: 'Role ', value: 'user_ROLE', sortable: false },
          
           { text: '', value: 'action', sortable: false, }

       
        ],
    
       valid: true,
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
if(this.$store.state.LOGIN_SUCCESS.length > 0){
    if(this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='admin'){
           this.$store.dispatch('loadUsers')
       .then(()=>{
             console.log(this.$store.state.alUsers)
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
    } else{
this.$router.push({
         path: "/",
        })
    } 
  }else{
this.$router.push({
         path: "/",
        })
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
     

   updateUsers(){
     if (this.$refs.form.validate()){
       this.loading1 = true
 let   body={

            user_ID: this.email,
            user_NAME: this.name,
            user_ROLE: this.userType
                  }
                  console.log(body)
                           
           this.$store.dispatch('updateUserDetails', body)
          .then((success)=>{
              console.log(success.data);
              this.loading1 = false;
              this.$store.dispatch('loadUsers')
            //  alert(success.data);
            this.text = "User details  updated succesfully"
               this.snackbar = true
               this.email = ""
               this.name= ""
               this.userType = ""
                this.newuseredit = false
          
              
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
              this.loading1 = false;
                alert(error)
                this.text1 = "User details not updated succesfully"
                this.snackbar1 = true
          })
     }

   },
      addUser(){

                if (this.$refs.form.validate()){
                  //alert("yes")
                  this.loading = true
           let   body={

            user_ID: this.email,
            user_NAME: this.name,
            user_ROLE: this.userType
                  }
                  console.log(body)
                           
           this.$store.dispatch('addUser', body)
          .then((success)=>{
              console.log(success.data);
              this.loading = false;
              this.$store.dispatch('loadUsers')
            //  alert(success.data);
            this.text = "User added succesfully"
               this.snackbar = true
               this.email = ""
               this.name= ""
               this.userType = ""
                this.newuser = false
          
              
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
              this.loading = false;
                alert(error)
                this.text1 = "User not succesfully"
                this.snackbar1 = true
          })
                  
                  
                  }
              },
  
      deleteUsers(usidd){
        //alert(usidd.user_ID)
        this.usid = usidd.user_ID
                  this.deletedialog = true
                },
           deleteDialog(){
            // alert(this.usid)
            this.load = true
           this.$store.dispatch('deleteUser', this.usid)
          .then((success)=>{
              console.log(success.data);
              this.load = false;
              this.$store.dispatch('loadUsers')
               this.deletedialog = false
            this.text = "User deleted succesfully"
               this.snackbar = true
               // this.newuser = false
          
              
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
              this.load = false;
                alert(error)
                this.text1 = "User not deleted "
                this.snackbar1 = true
          })
           } ,    
 editUser(item){
 // alert(item.user_ID) 
   this.newuseredit = true
        this.email = item.user_ID
        this.name= item.user_NAME
        this.userType = item.user_ROLE
      
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