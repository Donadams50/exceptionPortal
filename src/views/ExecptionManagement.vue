<template>
  <div class="about">
    <Navbar/>
    <v-dialog v-model="deletedialog" width="500" persistent>
            <v-card class="pa-12 mx-auto" id="login" max-width="500" elevation="7">
                <v-system-bar light color="#ffffff" class="mt-n5">
                    <v-spacer></v-spacer>
                    <v-btn icon @click="deletedialog=false">
                        <v-icon color="red">mdi-close</v-icon>
                    </v-btn>
                </v-system-bar>
                
                <v-card-text>
                  <div class="text-center mt-5 mb-4" style="">Are you sure you want to delete this exception?</div>
                </v-card-text>
                <v-card-actions>

                    <div class="mx-auto">
                       <v-btn   class="text-center" :loading="loading3"  rounded  @click="deleteDialog()">
                            <div style="font-size:13px; font-weight:400;  text-align:right;" class="  mx-3 text-capitalize"> 
                                Proceed  
                            </div>
                             </v-btn>
                        
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <div id="pagename">
                <!-- <v-toolbar flat  color="">
                            <div style="font-size:25px; " class=" mt-5 ml-5 "> Dashboard  </div>
                             <v-spacer></v-spacer>
                             <v-btn rounded   class="hidden-sm-and-down mt-5 mr-5" @click="addUser()">
                            <div style="font-size:15px;   text-align:right;" class=" mx-1 text-none"> 
                                Add user
                            </div>
                            </v-btn>
                            <v-btn rounded   class="hidden-sm-and-down mt-5 mr-5" @click="addBranch()">
                            <div style="font-size:15px;   text-align:right;" class=" mx-1 text-none "> 
                                New exception
                            </div>
                            </v-btn>
                            </v-toolbar> -->
  </div>
 <!-- display cards -->
        <!-- <div class="mt-8">
            <v-row class="mx-8">
                <v-col cols="12" xs="12" md="4">
                    <v-card  max-width="344" height="170" style="box-shadow: 0px 4px 22px rgba(86, 2, 2, 0.19);">
                        <v-card-text>
                            
                            
                           
                        </v-card-text>
                        
                        
                    </v-card>
                </v-col>
                  <v-col cols="12" xs="12" md="4">
                    <v-card  max-width="344" height="170" style="box-shadow: 0px 4px 22px rgba(86, 2, 2, 0.19); ">
                        <v-card-text>
                             
                           
                        </v-card-text>
                     
                        
                    </v-card>
                </v-col>
                  <v-col cols="12" xs="12" md="4">
                    <v-card  max-width="344" height="170" style="box-shadow: 0px 4px 22px rgba(86, 2, 2, 0.19); ">
                        <v-card-text>
                         
                        </v-card-text>
                        
                        
                    </v-card>
                </v-col>
            </v-row>
        </div> -->
         <div class="mx-2">
        <v-tabs  class="mt-5 ">
    <v-tab>My exceptions</v-tab>
    <v-tab-item class="mx-2"> 
         <v-toolbar flat  color="">
                            
            <div>  </div>
                <v-spacer></v-spacer>
                <div  class="primary--text">
                  <v-text-field class=" mr-7 ml-3 primary--text" color="primary" placeholder="Search for exception" v-model="searchWord1" @keyup="searchComponent()" prepend-inner-icon="mdi-magnify" ></v-text-field>
                </div>
        </v-toolbar>     
       <v-data-table
                :headers="headers"
                :items="myException"
                :search="searchWord1"
                no-data-text='No recent exception'
              >
                  <template v-slot:item.action="{ item }">
                    <v-btn text  @click=" viewException(item.RequestID)" style="border: 1px #13095e solid; color:#13095e" class="text-none mr-3" small>View</v-btn>
                    <v-btn text  v-if="item.RequestStatus==='Awaiting-Review'" @click=" deleteException(item.RequestID)" style="border: 1px #13095e solid; color:#13095e" class="text-none" small>Delete</v-btn>
               </template>
                
              </v-data-table>
              
              
      </v-tab-item>
    
    <v-tab>All exceptions</v-tab>
    <v-tab-item class="mx-5"> 
     <v-toolbar flat  color="">
                            
       <div>  </div>
                <v-spacer></v-spacer>
                <div  class="primary--text">
                  <v-text-field class=" mr-7 ml-3 primary--text" color="primary" placeholder="Search for exception" v-model="searchWord" @keyup="searchComponent()" prepend-inner-icon="mdi-magnify" ></v-text-field>
                </div>
    </v-toolbar>

      <v-data-table
                :headers="headers1"
                :items="allException"
                :search="searchWord"
                no-data-text='No recent exception'
              >
                  <template v-slot:item.action="{ item }">
                    <v-btn text  @click=" viewExceptionRead(item.RequestID)" style="border: 1px #13095e solid; color:#13095e" class="text-none mr-3" small>View</v-btn>
                    <v-btn text v-if="item.role==='admin'" @click="deleteException(item.RequestID)" style="border: 1px #13095e solid; color:#13095e" class="text-none" small>Delete</v-btn>
               </template>
                
              </v-data-table>
        
        
              
      </v-tab-item>
  </v-tabs> 
  </div>
        <!-- <v-card class="mt-8 mx-5">
  
              <v-card-title>
               <div> All exceptions </div>
                <v-spacer></v-spacer>
                <div  class="primary--text">
                  <v-text-field class=" mr-7 ml-3 primary--text" color="primary" placeholder="Search exception" v-model="searchWord" @keyup="searchComponent()" prepend-inner-icon="mdi-magnify" ></v-text-field>
                </div>
                
              </v-card-title>
              
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="searchWord"
                no-data-text='No recent exception'
              >
                  <template v-slot:item.action="{ item }">
                    <v-btn text  @click=" viewConfiguration(item.label)" style="border: 1px #13095e solid; color:#13095e" class="text-none mr-3" small>View</v-btn>
                    <v-btn text  @click=" deleteConfiguration(item.id)" style="border: 1px #13095e solid; color:#13095e" class="text-none" small>Delete</v-btn>
  
                
              </v-data-table>
            </v-card> -->
         <!-- <div class=" title ml-6 mt-6 ">
           Recents Transactions
         </div>
           <v-divider></v-divider>
            <v-data-table 
    :headers="headers"
    :items="desserts"
    sort-by="Id"
    class="elevation-1 mx-5 mt-5 " 
  >
   

     </v-data-table>-->

  </div> 
</template>

<script>
import  Navbar from '../components/Navbar'
//import { mapState }from 'vuex'
export default {
  components: {
        Navbar
    },
     

     computed: {
        
     },

     data () {
      return {
        searchWord:'',
        searchWord1: '',
       deletedialog: false,
       headers: [
         
        {
         text: 'Exception id',
          align: 'left',
          sortable: false,
          value: 'RequestID',
        },
           { text: 'Exception type', value: 'ExceptionType' },
         { text: 'Requestor', value: 'RequestorName' },
          { text: 'Division', value: 'Division', sortable: false },
          { text: 'App Code', value: 'ApplicationCode' },
          
          { text: 'Exception Lifetime', value: 'ExceptionLifetime' },
          { text: 'Status', value: 'RequestStatus' },
            { text: '', value: 'action', sortable: false, }
        ],
         headers1: [
         
        {
         text: 'Exception id',
          align: 'left',
          sortable: false,
          value: 'RequestID',
        },
           { text: 'Exception type', value: 'ExceptionType' },
         { text: 'Requestor', value: 'RequestorName' },
          { text: 'Division', value: 'Division', sortable: false },
        
          
          { text: 'Exception Lifetime', value: 'ExceptionLifetime' },
          { text: 'Status', value: 'RequestStatus' },
            { text: '', value: 'action', sortable: false, }
        ],
       
         desserts: [
           
              

        ],
        desserts2: [
          

        ]
      }
    },
    mounted () { 
      let userId =  this.$store.state.LOGIN_SUCCESS[0].user_ID.S
   
           this.$store.dispatch('loadallException')
       .then(()=>{
             console.log(this.$store.state.allException)
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
          
            this.$store.dispatch('loadMyException', userId)
       .then(()=>{
            // console.log(this.$store.state.myException)
          
         })
          .catch((error)=>{
         
              console.log(error)
                 alert(error)
              
          }) 
   
      
       

 
          },
          computed: {
             allException(){
    
                       return this.$store.state.allException
                              },

             myException(){
    
                       return this.$store.state.myException
                              }
            
                   },
    methods:{
          viewException(id){
            this.loading = true
            this.$router.push({ path: `/exceptionmanagement/${id}`})
   //  this.$router.push({ path: "/exceptionmanagement/"})
          },
           viewExceptionRead(id){
             this.loading = true
             if(this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='admin' || this.$store.state.LOGIN_SUCCESS[0].user_ROLE.S==='exception_manager'){
           
            this.$router.push({ path: `/exceptionmanagement/${id}`})
             }else{
                
            this.$router.push({ path: `/exceptionmanagementread/${id}`})
             }
   //  this.$router.push({ path: "/exceptionmanagement/"})
          },
          
          deleteException(){
            this.deletedialog = true
          }
      
      
      
    
    }
  
}
</script>

<style scoped>

#dashboard{
    background-color: #FDF8F8;
    font-family: 'Lato', sans-serif;
}
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

