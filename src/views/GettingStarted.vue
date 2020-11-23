<template>
     <div id="registeruser" >
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

   
            
                           <v-toolbar flat  color="">
                            <div style="font-size:20px;  " class="text-h6 mt-7 mx-5 "> <b> Getting Started </b> </div>
                            
                            </v-toolbar>

                <div class="ml-5">
               <div style="font-size:15px;  text-align:left; " class="text-h6 mt-3 ml-12 "> i. Overview</div>
                <div style="font-size:15px;  text-align:left; " class="text-h6 mt-4 ml-12 "> ii. Authentication</div>
                  <div style="font-size:15px;  text-align:left; " class="text-h6 mt-4 ml-12 "> iii. Feedback </div>
     </div>
           <div style="font-size:15px;  text-align:left;" class="text-h6  ml-10 mx-auto mt-4 ">Let's walk through core concepts to ease the usage of this portal. </div>

          <div style="font-size:20px; text-align:left" class="text-h6 mt-7 mx-10"> <b> Overview </b> </div>

           <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 "> The portal enables requester to raise security and platform exception.
             Platform exception request on approval will ensure compliance engine would bypass requested rule for respective 
                      application. 
           </div>
         <div style="font-size:20px; text-align:left; " class="text-h6 mt-7 mx-10"> <b> Authentication </b> </div>

            <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 "> The portal enables requester to raise security and platform exception.
              This portal is authenticated with One-Login. User having access to One-Login will be authorised to raise request
              and view their requests . 
              Permissions on portal are restricted depending on user role. 
              <ul> 
                <li>Role-Operations</li>
                <li>Role-Developer </li>
                <li>Exception Manager</li> 
                <li>Admin</li> 
              </ul> 

              Access control varies with each role. User not desgnated with any of these roles wont be able to edit/update request . 
              Such users need to get in touch with role-operations or role-developers for further assistance.

            </div>
            
            <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 ">
             <b> Role-Operation </b> : This role wil be able to raise request and see all the requests raised by requestors.</div>
             <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 ">
             <b> Role-Developer </b> : Role-Developer will be able to update/edit request details but wont be able to update reuqest status .</div>
             <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 ">
             <b> Exception-Manager </b> : This role can only update status of request and expiration date of request.</div>
           <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 ">
             <b> Admin </b> : Admin is elite role with full access on every action. Admin can only add and delete user. User management section is not visible to any other role. </div>
            <div style="font-size:15px;  text-align:left; " class="text-h6  ml-12 mx-auto mt-4 ">
              ** All users can delete or update there own requests till status is "Awaiting-Review".
            </div>
          
            <div style="font-size:20px; text-align:justify; " class="text-h6 mt-7 mx-10"> <b> Feedback </b> </div>
            
                       
                       <p style="text-align:left; color: black; font-family:Lato; margin-top: 10px; margin-bottom:-1px"  class="text-h6  ml-12 mx-auto mt-4 "></p>
                            <v-form ref="form" v-model="isFormValid" >
                            <v-textarea style="margin-right: 100px; margin-left:50px " placeholder="Post your feedback"   :rules="[inputRule]" color="rgb(40, 31, 71)"   v-model="feedback"  filled></v-textarea>
          
                        <div class="mx-auto">
                          <v-btn  :disabled="!isFormValid" class="text-center mb-10" :loading="loading"  rounded  @click="postFeedback()">
                             <div style="font-size:13px; font-weight:800;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Submit 
                             </div>
                            </v-btn>                        
                        </div>
                        </v-form>
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
       inputRule: val1 => {
      if( val1 === "") return 'Field cannot be empty'
      return true
    },
     loading: false,
     snackbar: false,
     snackbar1: false,
     text: '',
     text1: '',
     isFormValid: false,
     feedback: ''
      
    
        
      
  
    }
  },
   mounted () { 
    
       

 
          },
      computed: {
            
            
                   },
    methods: {
      postFeedback(){
if (this.$refs.form.validate()){
            
            
          this.loading = true
           let data =
                    {
                    feedback: this.feedback,
                    userID: this.$store.state.LOGIN_SUCCESS[0].user_ID.S
                   
                    }
                    console.log(data)
                  this.$store.dispatch('createFeedback', data)
                          .then((success)=>{
                            console.log(success)
                               //alert("success")
                               this.loading = false
                                 this.text = "Feed back posted succesfully"
                                  this.snackbar = true
                                  this.feedback = ""
                                    // setTimeout(() => {
                                    //   this.$router.push({
                                    //   path: "/exceptionmanagement",
                                    //   });
                                    // }, 3000)
                                  // this.$store.dispatch('loadSingleRequest', requestid) 
                                  //  this.$store.dispatch('loadHistory', requestid)
                              
                            })
                              .catch((error)=>{
                            
                                  console.log(error)
                                    this.loading = false;
                                  alert(error)
                                  this.text1 = "Feed back not succesfully posted"
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
