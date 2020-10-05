<template>
  <nav>
 
   <v-app-bar class="mx-2" clipped app color="rgb(40, 31, 71)">
       <v-app-bar-nav-icon color="white" @click="drawer = !drawer" class="hidden-md-and-up "></v-app-bar-nav-icon>
      <v-toolbar-title class="headline ">
        <span class="white--text">Exception Portal  </span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
        
       <v-btn text color="rgb(40, 31, 71)" class="hidden-sm-and-down  white--text text-none">
          {{userdetails.user_NAME.S}}
        <!-- <v-icon>mdi-apps</v-icon> -->
      </v-btn>
      
    <v-btn text color="rgb(40, 31, 71)" class=" hidden-sm-and-down  white--text text-none">
          {{userdetails.user_ROLE.S}}
        <!-- <v-icon>mdi-apps</v-icon> -->
      </v-btn>
      
      <v-btn  text color="rgb(40, 31, 71)"  class="text-none  white--text" @click="LogOut()">  
       Sign out
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      
    </v-app-bar>
     <v-navigation-drawer  app clipped-left v-model="drawer" color="white" floating >     
          <v-layout column align-center>
                <v-flex class="">
                <v-avatar size="70" class=""> 
                 <v-img  src="/logoException.jpeg" alt="/logoException.jpeg" lazy-src="/logoException.jpeg" contain></v-img>
                    <!-- //  <v-img class="" size="10px" aspect-ratio="1" src="/logoException.jpeg" alt="/account.png" lazy-src="/fakeimg.jpg"></v-img> -->
                  </v-avatar> 
              </v-flex>
          </v-layout>   
          <v-list dense nav class="mt-6">
            <v-list-item router-link to="/home">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">home</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title class="listColor">
                  Home
                </v-list-item-title>
              </v-item-content>
            </v-list-item>
            
              <v-list-item router-link to="/newrequest">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">mdi-laptop</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title >
                 Exception Request  
                </v-list-item-title>
              </v-item-content>
            </v-list-item>
            <v-list-item router-link to="/exceptionmanagement" >
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">mdi-database</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title class="listColor">
                 Exception Management
                </v-list-item-title>
              </v-item-content>
            </v-list-item>
             <v-list-item router-link to="/users" v-if="userdetails.user_ROLE.S==='admin'">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">person</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title >
                 User Management  
                </v-list-item-title>
              </v-item-content>
            </v-list-item>
            
          </v-list>
 

        
          
            
            <v-divider class="mt-5"></v-divider>
            <p  style="margin-left: -60px;" class="mt-3 ">Documentation </p>
            <v-list dense nav >
              <v-list-item router-link to="/gettingstarted">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">mdi-open-in-new</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title >
                Getting started 
                </v-list-item-title>
              </v-item-content>
            </v-list-item>
           
            
         </v-list>
          
      </v-navigation-drawer>
    </nav> 
</template>

<script>
export default {
  data(){
     return{
           right: null,
           drawer: null,
           messages: 2,
          
        }
  },
  computed: {
             userdetails(){
    
                       return this.$store.state.LOGIN_SUCCESS[0]
                              }
            
                   },
   methods :{
       LogOut(){

   
         
           this.$store.dispatch('LogOut')
          .then(() => {
         this.$router.push('/')
        })
           
         
               
          }
      }  
  }
  </script>

  <style scoped>
.switchSize{
    text-transform: capitalize;
}
.profileName{
  text-transform: uppercase;
  color: #5F5D5D;
  font-size: 35px;
  line-height: 43px;
}
.avatarC{
  border: 3px solid rgb(21, 23, 26);
}
.listColor{
  color: rgb(40, 31, 71);
}

</style>