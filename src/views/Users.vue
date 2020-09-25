<template>
     <div id="registeruser" >
               <Navbar/>
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
                       <v-btn   class="text-center" :loading="loading"  rounded  @click="deleteDialog()">
                            <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Proceed  
                            </div>
                             </v-btn>
                        
                    </div>
                </v-card-actions>
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
                :items="desserts"
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
        @click="editBeneficiary(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteUser(item)"
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
      newuser: false,
      deletedialog: false,
      desserts: [
            {
             id: '001',
            name: "Jerry Adams ",
            userid: "jadams@gmail.com",
            role: "Admin",
           
            
            
          },
           {
             id: '002',
            name: "Lincoln Bolt ",
            userid: "linbolt@gmail.com",
            role: "role_operations",
          },
            {
            id: '003',
            name: "Matt Florence ",
            userid: "florence@gmail.com",
            role: "role_developer",
           
            
            
          },
           
          {
             id: '004',
            name: "Ojo Shina ",
            userid: "sumgo@gmail.com",
            role: "Admin",
           
            
            
          },
          {
             id: '005',
            name: "Alia Sholz ",
            userid: "sholz@gmail.com",
            role: "request_manager",
           
            
            
          },
           
             {
            id: '006',
            name: "Micheal Trolz ",
            userid: "mic@gmail.com",
            role: "Admin",
            
            
          },
             {
          id: '007',
            name: "Tunny Cruiz ",
            userid: "tun@gmail.com",
            role: "role_operations",
            
            
          },
         
           
        ],
       headers: [
        
         
        {
         text: ' Id',
          align: 'left',
          sortable: false,
          value: 'id',
        },
           { text: 'Name', value: 'name' },
         { text: 'User id', value: 'userid' },
          { text: 'Role ', value: 'role', sortable: false },
          
           { text: '', value: 'action', sortable: false, }

       
        ],
    
       valid: true,
      loading: false,
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
       name:"",
       userType: '',
      email: "",
       items: ['Admin', 'Role-operation', 'Role-developer', 'Request manager'],
        text: "Succesfully Posted Manual credit ",
      text1: " Manual credit not succesfull",
       modal: '',
        snackbar: false,
         snackbar1: false,
        timeout: 6000,
        x: null,
        y: 'top',
        
      
  
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
      addUser(){

                if (this.$refs.form.validate()){
                  alert("yes")}
              },
  
      deleteUser(){
                  this.deletedialog = true
                },
 postManualCredit(){
      //  alert(this.interswitchRef); 
      if (this.$refs.form.validate()){
          this.loading = true;
             if(this.type === "Credit"){
               this.source =  this.bank_name;
                this.recipient = "ASTRA_PAY";
                this.subtype= "MANUAL_CREDIT";
                                    }
               else if(this.type === "Debit"){
               this.source =  "ASTRA_PAY";
                this.recipient = this.bank_name;
                 this.subtype= "MANUAL_DEBIT";
                  }
                //    alert(this.type);
                //   alert(this.subtype);
                // alert(this.recipient);
                // alert(this.source);
            
          let newManualCredit = {
                      interswitchRef : this.interswitchRef,
                      amount: parseFloat(this.amount) * 100 ,
                      subtype: this.subtype,
                      extraInfo :this.extraInfo,
                      type: this.type,
                      source: this.source ,
                      recipient: this.recipient,
                      note:this.note
                }
         
           this.$store.dispatch('postCredit', newManualCredit)
          .then((success)=>{
              console.log(success.data);
              this.loading = false;
            //  alert(success.data);
               this.snackbar = true
                this.amount = " ",
                this.note =" ",
                this.interswitchRef = " ",
                this.bank_name = " "
             this.$router.push({ path: "/transactions"})
              
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
              this.loading = false;
                alert(error)
                this.snackbar1 = true
          })
      }
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