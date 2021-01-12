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
                    <v-btn icon @click="changestatus=false">
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
                                Change  
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
                    <v-btn icon @click="commentchange=false">
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
                                Change  
                             </div>
                            </v-btn>                        
                        </div>
                     </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
  <!-- comment -->
          <v-card class="mx-5 mt-3">
            <div style="text-align:left ;font-weight:bold; font-size: 30px">
               <v-btn  router-link to="/exceptionmanagement" icon class="hidden-xs-only">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      </div>
              <v-card-title>
              
                    <div class="text-h6 my-2 ml-1 "> View request</div>
                    <v-spacer> </v-spacer>
                    
                
              </v-card-title>
            <v-card-text class="ml-5">
           
              
                               
                  <v-form ref="form"> 
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
          readonly
         
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
      <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Expiration date</p>
       <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        
        offset-y
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
          v-model="getRequest.ExceptionLifetime.S" 
        
         readonly
        >       
        </v-date-picker>
        
      </v-menu>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Requestor</p>
                <v-text-field readonly readonly solo :rules="[inputRule]" v-model="getRequest.RequestorName.S"  style="border-radius:0px;" placeholder="requestor" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Department </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.Department.S"  style="border-radius:0px;" placeholder="Department" ></v-text-field>       
                     
                   
                     <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Application code</p>
                <v-text-field  readonly solo :rules="[inputRule]"  v-model="getRequest.ApplicationCode.S"  style="border-radius:0px;" placeholder="Application code" ></v-text-field>
                 
                   <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Description</p>
                <v-text-field readonly solo :rules="[inputRule]"  v-model="getRequest.Description.S"  style="border-radius:0px;" placeholder="Description" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Comments </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.Comments.S"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Aws account </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.AwsAccount.S"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>        
                     
                
                </v-col>
   <v-col cols="12" md="5">
               
     <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Business need</p>
     <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.BusinessNeed.S"  style="border-radius:0px;" placeholder="Business need" ></v-text-field>
                    
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Division</p>
                      <v-select
       v-model="getRequest.Division.S"
       :items="items1"  
        item-value ="Type"
         item-text="Type"
          readonly
         
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Risk level</p>
                      <v-select
       v-model="getRequest.RiskLevel.S"
       :items="items2"  
        item-value ="Type"
         item-text="Type"
        readonly
         
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Rationale</p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.Rationale.S"  style="border-radius:0px;" placeholder="Rationale" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Impacted rules </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.ImpactedRules.S"  style="border-radius:0px;" placeholder="Impacted rules" ></v-text-field>
             <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Xman </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.xmanID.S"  style="border-radius:0px;" placeholder="Xman" ></v-text-field>       
                     
          <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Back to normal state  </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.BackToNormalState.S"  style="border-radius:0px;" placeholder="Back to normal state" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Mitigation </p>
                <v-text-field readonly solo :rules="[inputRule]" v-model="getRequest.Mitigation.S"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>
              
                  
                </v-col>
                   <v-col cols="12" md="3" lg="3" xl="3" sm="12">
                        <v-card class="mx-2"   >
           <div style="display:flex;  font-size:20px  "  >
          
          <p style=" font-size:15px ; font-family:Lato; margin-top:10px"  class=" ml-2 "> Status :  </p>
          <p  class=" ml-3 " style="font-size:15px  ; margin-top:10px "> {{getRequest.RequestStatus.S}}  </p>
    
      </div>
       

 <div class=" text-center ">
   
 </div>
 </v-card>
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
          <v-col no-gutters  cols="6" style="font-weight: bold; margin-left: -40px">Update by:</v-col>  <v-col cols="6" style="margin-left: -10px">{{item.update_champion.S}}</v-col>
          <!-- <v-col cols="12" style="margin-top:-10px">{{item.status}} </v-col> -->
          <v-col no-gutters  cols="6" style="font-weight: bold; margin-left: -40px">Comment:</v-col>  <v-col cols="6" style="margin-left: -5px">{{item.comment.S}}</v-col>
            <v-col no-gutters  cols="6" style="font-weight: bold;margin-left: -40px">Date:</v-col>  <v-col cols="6" style="margin-left: -20px">{{item.date_timestamp.S}}</v-col>
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
          
      ]
     
    }),
  
            
                  
    mounted() {
      // alert(this.trans)
      // alert(this.value)
          
      
//           //alert(requestid)
        
 if(this.$store.state.LOGIN_SUCCESS.length > 0){
     let  requestid = this.$route.params.id
          this.$store.dispatch('loadHistory', requestid)
       .then(()=>{
         console.log("OH")
             console.log(this.$store.state.history)
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
          
   this.$store.dispatch('loadSingleRequest', requestid)  
       .then(()=>{
//         if(this.$store.state.LOGIN_SUCCESS[0].user_ID.S===this.$store.state.singleRequest[0].RequestorID.S || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='admin'|| this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='exception_manager'){
//              console.log("Welcome")
//              console.log(this.$store.state.singleRequest)
//               } else{
// this.$router.push({
//          path: "/",
//         })
//     } 
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
      
 }else{
this.$router.push({
         path: "/",
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
