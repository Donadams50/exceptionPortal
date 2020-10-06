<template>
    <div id="rollover">
        
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
         <v-dialog v-model="changestatus" width="500" persistent>
           <v-card class="pa-12 mx-auto" id="login" max-width="500" elevation="7">
              <v-system-bar light color="#ffffff" class="mt-n5">
                <v-spacer></v-spacer>
                    <v-btn icon @click="cstatus()">
                        <v-icon color="red">mdi-close</v-icon>
                     </v-btn>
                </v-system-bar>
                <div class="text-center text-h6   mt-5 mb-4" > Change request status </div>
                <v-form ref="form">
                   <v-card-text>
                 
                      <v-row class="mx-1">   
                        <v-col cols="12" md="12">                
                            <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Status</p>
                              <v-select
       v-model="getRequest.RequestStatus.S"
       :items="itemssta"  
        item-value ="Type"
         item-text="Type"

        
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
                               <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Comment</p>
                            <v-textarea  :rules="[inputRule]"  color="rgb(40, 31, 71)"   v-model="comment2"  filled></v-textarea>                       
                        </v-col>
                      </v-row> 
                    </v-card-text>
                     <v-card-actions>
                        <div class="mx-auto">
                          <v-btn   class="text-center"  :loading="loading6"  rounded  @click="finalChangeStatus()">
                             <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Save  
                             </div>
                            </v-btn>                        
                        </div>
                     </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
  <!-- end of dialog -->
  <!-- coment -->
 <v-dialog v-model="commentchange" width="500" persistent>
           <v-card class="pa-12 mx-auto" id="login" max-width="500" elevation="7">
              <v-system-bar light color="#ffffff" class="mt-n5">
                <v-spacer></v-spacer>
                    <v-btn icon @click="cc()">
                        <v-icon color="red">mdi-close</v-icon>
                     </v-btn>
                </v-system-bar>
                <div class="text-center text-h6   mt-5 mb-4" > Comment the changes you made </div>
                <v-form ref="form">
                   <v-card-text>
                 
                      <v-row class="mx-1">   
                        <v-col cols="12" md="12">                
                        
                               <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Comment</p>
                            <v-textarea   :rules="[inputRule]" color="rgb(40, 31, 71)"   v-model="comment1"  filled></v-textarea>                       
                        </v-col>
                      </v-row> 
                    </v-card-text>
                     <v-card-actions>
                        <div class="mx-auto">
                          <v-btn   class="text-center" :loading="loading5"  rounded  @click="finalChange()">
                             <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Save  
                             </div>
                            </v-btn>                        
                        </div>
                     </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
  <!-- comment -->
   
          <v-card class="mx-5 mt-3">
          <div style="text-align:left ;font-weight:bold; margin-left: 10px; font-size: 30px">
               <v-btn  router-link to="/exceptionmanagement" icon class="hidden-xs-only">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      </div>
              <v-card-title>
                
                    <div class="text-h6  ml-1 "> View request</div>
                    <v-spacer> </v-spacer>
                    
                
              </v-card-title>
            <v-card-text class="ml-5">
           
              
                               
                  <v-form ref="form" v-model="isFormValid"> 
              <v-row class="mx-15">
               
               <v-col cols="12" md="4">
                
                
                  <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Exception id</p>
                <v-text-field readonly :rules="[inputRule]" solo v-model="getRequest.RequestID.S"  style="border-radius:0px;" placeholder="Exception id" ></v-text-field>
                   
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Exception type</p>
                      <v-select
       v-model="getRequest.ExceptionType.S"
       :items="items"  
        item-value ="Type"
         item-text="Type"
         @input="up($event)"
:disabled="this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'exception_manager' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'role_operations' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'Visitor'"
          
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
      <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Expiration date</p>
       <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="true"
        :nudge-right="40"
        transition="scale-transition"
       
        offset-y
        :disabled="this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'role_developer' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'role_operations' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'Visitor'"
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="getRequest.ExceptionLifetime.S"
           solo
            
            readonly
           
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
        @input="up($event)"
          v-model="getRequest.ExceptionLifetime.S" 
        
        >       
        </v-date-picker>
        
      </v-menu>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Requestor</p>
                <v-text-field @input="up($event)" readonly solo :rules="[inputRule]" v-model="getRequest.RequestorName.S"  style="border-radius:0px;" placeholder="requestor" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Department </p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]" v-model="getRequest.Department.S"  style="border-radius:0px;" placeholder="Department" ></v-text-field>       
                     
                   
                     <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Application code</p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]"  v-model="getRequest.ApplicationCode.S"  style="border-radius:0px;" placeholder="Application code" ></v-text-field>
                 
                   <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Description</p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]"  v-model="getRequest.Description.S"  style="border-radius:0px;" placeholder="Description" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Comments </p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]" v-model="getRequest.Comments.S"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>
                       
                     
                
                </v-col>
   <v-col cols="12" md="5">
               
     <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Business need</p>
     <v-text-field @input="up($event)" solo :rules="[inputRule]" v-model="getRequest.BusinessNeed.S"  style="border-radius:0px;" placeholder="Business need" ></v-text-field>
                    
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Division</p>
                      <v-select
       v-model="getRequest.Division.S"
       :items="items1"  
        item-value ="Type"
         item-text="Type"
        @input="up($event)"
         
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Risk level</p>
                      <v-select
       v-model="getRequest.RiskLevel.S"
       :items="items2"  
        item-value ="Type"
         item-text="Type"
        @input="up($event)"
        
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Rationale</p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]" v-model="getRequest.Rationale.S"  style="border-radius:0px;" placeholder="Rationale" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Impacted rules </p>
                <v-text-field @input="up($event)" :disabled="this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'role_developer' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'role_operations' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S === 'Visitor'"  solo :rules="[inputRule]" v-model="getRequest.ImpactedRules.S"  style="border-radius:0px;" placeholder="Impacted rules" ></v-text-field>
             <div v-if="getRequest.ExceptionType.S==='Security'">
             <p v-if="getRequest.ExceptionType.S=== 'Security' " style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Xman </p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]" v-model="getRequest.xmanID.S"  style="border-radius:0px;" placeholder="Xman" ></v-text-field>       
              </div>       
          <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Back to normal state  </p>
                <v-text-field solo :rules="[inputRule]" v-model="getRequest.BackToNormalState.S"  style="border-radius:0px;" placeholder="Back to normal state" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Mitigation </p>
                <v-text-field @input="up($event)" solo :rules="[inputRule]" v-model="getRequest.Mitigation.S"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>
              <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Aws account </p>
                <v-text-field  @input="up($event)"  solo :rules="[inputRule]" v-model="getRequest.AwsAccount.S"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>
                  
                </v-col>
                   <v-col cols="12" md="3" lg="3" xl="3" sm="12">
                        <v-card class="mx-2"   >
           <div style="display:flex;  font-size:20px  "  >
          
          <p style=" font-size:25px font-weight:bold ; margin-top:10px"  class=" ml-2 "> Status :  </p>
          <p  class=" ml-2 " style="font-size:15px  ; margin-top:10px "> {{getRequest.RequestStatus.S}}  </p>
      
      </div>
       

 <div class=" text-center ">
    <v-row  >
         <v-col cols="12"   md="12" sm="6" xs="6">
            <v-btn :loading ="loading2"  v-if="this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='admin'||this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='exception_manager'" class="text-center"  rounded  @click="changeStatus()">
                 <div style="font-size:13px;   text-align:right;" class="  mx-3 text-capitalize"> 
                                Change 
               </div>
            </v-btn>
         </v-col>
        
    </v-row>
 </div>
 </v-card>
                   </v-col>    
              </v-row>
              <div style="text-align:left ;font-weight:bold; font-size: 30px">
               <v-btn  router-link to="/exceptionmanagement" icon class="hidden-xs-only">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      </div>
                 <v-row class="text-center">
             <v-col cols="12" md="8">
              <div  style=" " class="text-center ">
               <v-btn :disabled="!isFormValid || this.changeInput ===false"  rounded class="text-none" :loading ="loading" rounde @click="commentChange()"    >
                   Update</v-btn >
                  </div> 
                  </v-col>    
                          
                  </v-row>
               </v-form> 
               
            </v-card-text>
          </v-card>
            <v-row class="mx-5">

  <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6">

    <div class="text-h6 mt-5 " style="font-size:20px ; font-weight: bold"> Request History </div>
     <v-expansion-panels class="mt-5" accordion>
     <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate>
              History Log
          <template v-slot:actions>
           <v-icon >$expand</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>

          <div v-if="getHistory.length=== 0" class="text-h6 mt-5 " style="font-size:20px ; font-weight: bold"> No History </div>
          <v-timeline class="mt-5 ml-15" dense clipped>
     

     
      <v-timeline-item 
        v-for="(item, i) in getHistory"
        :key="i"
        
        class="mb-2"  
        icon-color="rgb(40, 31, 71)"
        fill-dot
        small
      >
        <v-row  style="">
          <v-col no-gutters  cols="6" style="font-weight: bold; margin-left: -10px">Update by:</v-col>  <v-col cols="6" style="margin-left: -10px">{{item.update_champion.S}}</v-col>
          <!-- <v-col cols="12" style="margin-top:-10px">{{item.status}} </v-col> -->
          <v-col no-gutters  cols="6" style="font-weight: bold; margin-left: -10px">Comment:</v-col>  <v-col cols="6" style="margin-left: -5px">{{item.comment.S}}</v-col>
            <v-col no-gutters  cols="6" style="font-weight: bold;margin-left: -10px">Date:</v-col>  <v-col cols="6" style="margin-left: -20px">{{item.date_timestamp.S}}</v-col>
        </v-row>
      </v-timeline-item>

      

      </v-timeline>
        </v-expansion-panel-content>
      </v-expansion-panel>
       </v-expansion-panels >
    
  </v-col>  
</v-row>           
       
    
     

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
        sta: 'Implemented',
         changestatus: false,
         commentchange: false,
        itemssta: [ 'Awaiting-Review', 'Approved', 'Rejected', 'Implemented', 'Deprecated'],
        ebusinessneed: 'lifting of truck',
        eid: "EXP0002",
        etype: 'Platform',
        erequestor: 'Tunny cruiz',
        edepartment: 'Mechanical department',
        eacode: '123456',
        eanumber: '0987849393',
        edescription: 'The request is for a business need',
        edivision: 'Div C',
        erisklevel: 'Medium',
        erationale: 'No rationale',
        emitigation: 'Experienced',
        eimpactedrules: 'A very longrules',
        exman: 'Block diagram',
      items1: [ 'Div A', 'Div B', 'Div C', 'Aircraft' ],
      items2: ['Not Assessed', 'Low', 'Medium', 'High', 'Critical'],
      text: " ",
      text1: "",
      fromdate: new Date().toISOString().substr(0, 10),
      todate: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu: false,
      modal: false,
      snackbar: false,
      snackbar1: false,
      timeout: 6000,
      transtype:'',
      comment1: '',
      comment2: '',
      items: ['Platform', 'Security', ],
       mode: '',
        x: null,
        y: 'top',
      dialog: false,
       dialog1: false,  
       loading5: false,
       loading6: false,
      desserts: [],
      items4: [
          
      ],
      isFormValid: false,
     changeInput : false
    }),
  
            
                  
    mounted() {
      // alert(this.trans)
      // alert(this.value)
           if(this.$store.state.LOGIN_SUCCESS.length > 0){
         let  requestid = this.$route.params.id
          //alert(requestid)
        this.$store.dispatch('loadSingleRequest', requestid)  
       .then(()=>{
        if(this.$store.state.LOGIN_SUCCESS[0].user_ID.S===this.$store.state.singleRequest[0].RequestorID.S || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='admin'|| this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='exception_manager'){
             console.log("Welcome")
             console.log(this.$store.state.singleRequest)
              } else{
this.$router.push({
         path: "/",
        })
    } 
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
          this.$store.dispatch('loadHistory', requestid)
       .then(()=>{
         console.log("OH")
             console.log(this.$store.state.history)
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
          
   
           }
     

     
    },

    computed: {
         getRequest(){
          return  this.$store.state.singleRequest[0]
         },
         getHistory(){
          return  this.$store.state.history
         }
    },

    watch: {
    
    },

    created () {
      
    },

    methods: {
      cstatus(){
          let  requestid = this.$route.params.id
           this.$store.dispatch('loadSingleRequest', requestid) 
            this.changestatus = false
           
      },
      up(event){
        this.changeInput = true
       //   alert(event.length)
   //alert("up")
      },
           cc(){
           this.commentchange=false
           let  requestid = this.$route.params.id
           this.$store.dispatch('loadSingleRequest', requestid) 
           },
      commentChange(){
       
        if (this.$store.state.singleRequest[0].ExceptionType.S === 'Platform'){
               this.commentchange = true
        }else{
         if (this.$store.state.singleRequest[0].xmanID.S === 'None'){
          alert('Xman id field cant be None')
         }else{
          this.commentchange = true
         }
         }
        
      },
        changeStatus(){
      this.changestatus = true
        },
      finalChangeStatus(){
     //   alert(this.$store.state.singleRequest[0].RequestStatus.S,)
if (this.$refs.form.validate()){
            //alert(this.$store.state.singleRequest[0].Rationale.S)
            
          this.loading6 = true
           let data =
                    {
                    RequestID:this.$store.state.singleRequest[0].RequestID.S,
                    Rationale: this.$store.state.singleRequest[0].Rationale.S,
                    ImpactedRules: this.$store.state.singleRequest[0].ImpactedRules.S,
                    RequestorName: this.$store.state.singleRequest[0].RequestorName.S,
                    BackToNormalState: this.$store.state.singleRequest[0].BackToNormalState.S,
                    Comments: this.$store.state.singleRequest[0].Comments.S,
                    BusinessNeed: this.$store.state.singleRequest[0].BusinessNeed.S,
                    RiskLevel: this.$store.state.singleRequest[0].RiskLevel.S,
                    xmanID: this.$store.state.singleRequest[0].xmanID.S,
                    Description: this.$store.state.singleRequest[0].Description.S,
                    ExceptionType: this.$store.state.singleRequest[0].ExceptionType.S,
                    Division: this.$store.state.singleRequest[0].Division.S,
                    Mitigation: this.$store.state.singleRequest[0].Mitigation.S,
                    Department: this.$store.state.singleRequest[0].Department.S,
                    ExceptionLifetime: this.$store.state.singleRequest[0].ExceptionLifetime.S,
                    ApplicationCode: this.$store.state.singleRequest[0].ApplicationCode.S,
                    AwsAccount: this.$store.state.singleRequest[0].AwsAccount.S,
                    RequestStatus: this.$store.state.singleRequest[0].RequestStatus.S,
                    RequestUpdateComments:this.comment2,
                    RequestorID: this.$store.state.singleRequest[0].RequestorID.S,
                    CurrentUser: this.$store.state.LOGIN_SUCCESS[0].user_ID.S
                    }
                    
                  this.$store.dispatch('updateRequest', data)
                          .then((success)=>{
                            console.log(success)
                               //alert("success")
                               this.loading6 = false
                                 this.text = "Status changed succesfully"
                                  this.snackbar = true
                                  this.changestatus = false
                                  let  requestid = this.$route.params.id
                                  this.$store.dispatch('loadSingleRequest', requestid) 
                                   this.$store.dispatch('loadHistory', requestid)
                                   this.comment2 = ""
                                   this.changeInput = false
                              
                            })
                              .catch((error)=>{
                            
                                  console.log(error)
                                    this.loading6 = false;
                                  alert(error)
                                  this.text1 = "Status not succesfully changed"
                                  this.snackbar1 = true
                                  
                              }) 

          }            

      },

        finalChange(){
          if (this.$refs.form.validate()){
            //alert(this.$store.state.singleRequest[0].Rationale.S)
            
          this.loading5 = true
           let data =
                    {
                    RequestID:this.$store.state.singleRequest[0].RequestID.S,
                    Rationale: this.$store.state.singleRequest[0].Rationale.S,
                    ImpactedRules: this.$store.state.singleRequest[0].ImpactedRules.S,
                    RequestorName: this.$store.state.singleRequest[0].RequestorName.S,
                    BackToNormalState: this.$store.state.singleRequest[0].BackToNormalState.S,
                    Comments: this.$store.state.singleRequest[0].Comments.S,
                    BusinessNeed: this.$store.state.singleRequest[0].BusinessNeed.S,
                    RiskLevel: this.$store.state.singleRequest[0].RiskLevel.S,
                    xmanID: this.$store.state.singleRequest[0].xmanID.S,
                    Description: this.$store.state.singleRequest[0].Description.S,
                    ExceptionType: this.$store.state.singleRequest[0].ExceptionType.S,
                    Division: this.$store.state.singleRequest[0].Division.S,
                    Mitigation: this.$store.state.singleRequest[0].Mitigation.S,
                    Department: this.$store.state.singleRequest[0].Department.S,
                    ExceptionLifetime: this.$store.state.singleRequest[0].ExceptionLifetime.S,
                    ApplicationCode: this.$store.state.singleRequest[0].ApplicationCode.S,
                    AwsAccount: this.$store.state.singleRequest[0].AwsAccount.S,
                    RequestStatus: this.$store.state.singleRequest[0].RequestStatus.S,
                    RequestUpdateComments:this.comment1,
                    RequestorID: this.$store.state.singleRequest[0].RequestorID.S,
                    CurrentUser: this.$store.state.LOGIN_SUCCESS[0].user_ID.S
                    }
                    
                  this.$store.dispatch('updateRequest', data)
                          .then((success)=>{
                            console.log(success)
                         //      alert("success")
                               this.loading5 = false
                                 this.text = "Request details  updated succesfully"
                                  this.snackbar = true
                                  this.commentchange = false
                                  let  requestid = this.$route.params.id
                                  this.$store.dispatch('loadSingleRequest', requestid) 
                                   this.$store.dispatch('loadHistory', requestid)
                                  this.comment1 = ""
                                  this.changeInput = false
                            })
                              .catch((error)=>{
                            
                                  console.log(error)
                                    this.loading5 = false;
                                  alert(error)
                                  this.text1 = "Request details not updated succesfully"
                                  this.snackbar1 = true
                                  
                              }) 

          }            

        },
     
       

      

 

 


      


    


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