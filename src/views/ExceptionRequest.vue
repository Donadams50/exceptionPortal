<template>

    <div id="rollover">
   <Navbar/>
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
      :color="red"
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
     <v-card class="mx-5 mt-3">        
              <v-card-title>
               
                    <div class="text-h6 my-2 ml-1 "> Exception form</div>
                  
                
              </v-card-title>
            <v-card-text class="ml-5">
           
              
                               
                  <v-form ref="form" v-model="isFormValid" > 
              <v-row class="mx-15">
               
               <v-col cols="12" md="5">
                
                
                  <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Exception id</p>
                <v-text-field :rules="[inputRule]" readonly solo v-model="exceptionId"  style="border-radius:0px;" placeholder="Exception id" ></v-text-field>
                   
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Exception type</p>
                      <v-select
       v-model="ExceptionType"
       :items="items"  
        item-value ="Type"
         item-text="Type"

         class=" primary--text" color="primary"
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
      <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Expiration Date</p>
       <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
        color="primary"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="fromdate"
           solo
            
            readonly
            color="primary"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="fromdate" 
        
        >       
        </v-date-picker>
        
      </v-menu>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Requestor</p>
                <v-text-field :rules="[inputRule]" solo readonly  v-model="this.$store.state.LOGIN_SUCCESS[0].user_NAME.S"  style="border-radius:0px;" placeholder="requestor" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Department </p>
                <v-text-field :rules="[inputRule]" solo v-model="Department"  style="border-radius:0px;" placeholder="Department" ></v-text-field>       
                     
                   
                     <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Application code</p>
                <v-text-field solo :rules="[inputRule]" v-model="ApplicationCode"  style="border-radius:0px;" placeholder="Application code" ></v-text-field>
                
                    
                   <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Description</p>
                <v-text-field solo :rules="[inputRule]" v-model="Description"  style="border-radius:0px;" placeholder="Description" ></v-text-field>
                   <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Comments</p>
                <v-text-field solo :rules="[inputRule]"  v-model="Comments"  style="border-radius:0px;" placeholder="Comments" ></v-text-field>
                <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Aws account </p>
                <v-text-field :rules="[inputRule]" solo v-model="AwsAccount"  style="border-radius:0px;" placeholder="Aws account" ></v-text-field >       
                     
                </v-col>
   <v-col cols="12" md="5">
               
     <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Business need</p>
     <v-text-field :rules="[inputRule]" solo v-model="BusinessNeed"  style="border-radius:0px;" placeholder="Business need" ></v-text-field>
                    
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Division</p>
                      <v-select
       v-model="Division"
       :items="items1"  
        item-value ="Type"
         item-text="Type"

         class=" primary--text" color="primary"
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Risk level</p>
                      <v-select
       v-model="RiskLevel"
       :items="items2"  
        item-value ="Type"
         item-text="Type"

         class=" primary--text" color="primary"
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Rationale</p>
                <v-text-field solo :rules="[inputRule]" v-model="Rationale"  style="border-radius:0px;" placeholder="Rationale" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Impacted rules </p>
                <v-text-field :rules="[inputRule]" solo v-model="ImpactedRules"  style="border-radius:0px;" placeholder="Impacted rules" ></v-text-field>
             <p v-if="this.ExceptionType=== 'Security' " style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Xman id </p>
                <v-text-field  v-if="this.ExceptionType=== 'Security' "  :rules="[inputRule]" solo v-model="xmanID"  style="border-radius:0px;" placeholder="Xman" ></v-text-field>       
                     
          <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Back to normal state  </p>
                <v-text-field :rules="[inputRule]" solo v-model="BackToNormalState"  style="border-radius:0px;" placeholder="Back to normal state" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Mitigation </p>
                <v-text-field :rules="[inputRule]" solo v-model="Mitigation"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>
                
                
                  
                </v-col>
                       
              </v-row>
                 <v-row class="text-center">
             <v-col cols="12" md="10">
              <div  style=" " class="text-center ">
               <v-btn :disabled="!isFormValid" rounded class="text-none" :loading ="loading6" rounde @click="request()"    >
                   Request</v-btn >
                  </div> 
                  </v-col>              
                  </v-row>
               </v-form> 
               
            </v-card-text>
          </v-card>           
       
    
     

    </div>
</template>
<script>
import  Navbar from '../components/Navbar'
export default {
     components: {
        Navbar
    },

    data: () => ({
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
     
      items1: [ 'Div A', 'Div B', 'Div C', 'Aircraft'],
      items2: ['Not assesed', 'Low', 'Medium', 'High', 'Critical'],
      text: " ",
      text1: " ",
      fromdate: new Date().toISOString().substr(0, 10),
      todate: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu: false,
      modal: false,
      snackbar: false,
      snackbar1: false,
      timeout: 6000,
      transtype:'',
      items: ['Platform', 'Security', ],
       mode: '',
        x: null,
        y: 'top',
        exceptionId:'',
        Rationale: "",
        ImpactedRules: '',
      
        BackToNormalState: '',
        Comments: '',
        BusinessNeed: '',
        RiskLevel: '',
        xmanID: '',
        Description: '',
        ExceptionType: '',
        Division: '',
        Mitigation: '',
        Department: '',
        ExceptionLifetime: '',
        ApplicationCode: '',
        AwsAccount: '',
        RequestStatus: '',
        loading6: false,
        isFormValid: false
        
   
     
    }),
    
   
    
    mounted () { 
        
 
      
       
    if(this.$store.state.LOGIN_SUCCESS.length > 0){
          
         this.exceptionId = 'EXP-'+this.getExceptionCode()+''
             console.log(this.$store.state.alUsers)
          
      
    } else{
this.$router.push({
         path: "/",
        })
    } 
      
       

 
        
    },

    computed: {
   
    },

    watch: {
    
    },

    

    methods: { 
       request(){
       // alert(this.$store.state.singleRequest[0].RequestStatus.S,)
if (this.$refs.form.validate()){
          //  alert(this.fromdate)
            
          this.loading6 = true
           let data =
                    {
                    RequestID:this.exceptionId,
                    Rationale: this.Rationale,
                    ImpactedRules: this.ImpactedRules,
                    RequestorName: this.$store.state.LOGIN_SUCCESS[0].user_NAME.S,
                    BackToNormalState: this.BackToNormalState,
                    Comments: this.Comments,
                    BusinessNeed: this.BusinessNeed,
                    RiskLevel: this.RiskLevel,
                    xmanID: this.xmanID,
                    Description: this.Description,
                    ExceptionType: this.ExceptionType,
                    Division: this.Division,
                    Mitigation: this.Mitigation,
                    Department: this.Department,
                    ExceptionLifetime: this.fromdate,
                    ApplicationCode: this.ApplicationCode,
                    AwsAccount: this.AwsAccount,
                    RequestStatus: "Awaiting-Review",
                    RequestorID: this.$store.state.LOGIN_SUCCESS[0].user_ID.S
                   
                    }
                    console.log(data)
                  this.$store.dispatch('createRequest', data)
                          .then((success)=>{
                            console.log(success)
                               //alert("success")
                               this.loading6 = false
                                 this.text = "Request created succesfully"
                                  this.snackbar = true
                                    setTimeout(() => {
                                      this.$router.push({
                                      path: "/exceptionmanagement",
                                      });
                                    }, 3000)
                                  // this.$store.dispatch('loadSingleRequest', requestid) 
                                  //  this.$store.dispatch('loadHistory', requestid)
                              
                            })
                              .catch((error)=>{
                            
                                  console.log(error)
                                    this.loading6 = false;
                                  alert(error)
                                  this.text1 = "Request not succesfully created"
                                  this.snackbar1 = true
                                  
                              }) 

          }            

      },
     
 getExceptionCode(){
    var numbers = "0123456789";

    var chars= "9768532104";
  
    var code_length = 8;
    var number_count = 4;
    var letter_count = 4;
  
    var code = '';
  
    for(var i=0; i < code_length; i++) {
       var letterOrNumber = Math.floor(Math.random() * 2);
       if((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
          letter_count--;
          var rnum = Math.floor(Math.random() * chars.length);
          code += chars[rnum];
       }
       else {
          number_count--;
          var rnum2 = Math.floor(Math.random() * numbers.length);
          code += numbers[rnum2];
       }
    }
return code
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