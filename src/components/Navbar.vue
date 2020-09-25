<template>
  <nav>
   <!-- <v-navigation-drawer app clipped-left floating v-model="drawer" class="nav white lighten-2" dark disable-resize-watcher>
         
          
          <v-layout column align-center>
                <v-flex class="black--text mt-8  font-weight-bold" dark>
                   TonyKing   Admin
                </v-flex>
          </v-layout>
          
          <v-avatar size="60px"  class="mt-4" @click="home()" style="pointer:cursor"  >
           <v-img class="" size="15px"  src="/fakeimg.jpg" ></v-img>
               </v-avatar>
               

          <v-layout column align-center>
                <v-flex class="black--text mt-8  font-weight-light" dark>
                   Admin
                </v-flex>
          </v-layout> 

            <v-list dense nav class="mt-19" >
              <v-list-item router-link to="/dashboard">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">mdi-home</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title style="color:black; font-size:14px" >
                  Home
                </v-list-item-title> 
                
              </v-item-content>
            </v-list-item>
          <v-list-item @click="logout()">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title style="color:rgb(40, 31, 71); font-size:14px" >
                 New request
                </v-list-item-title>
                
              </v-item-content>
            </v-list-item>
            <v-list-item router-link to="/newuser" >
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">mdi-account-plus</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title style="color:rgb(40, 31, 71); font-size:14px" >
                 Add user
                </v-list-item-title>
                
              </v-item-content>
            </v-list-item>
            
          

           
         
          
          </v-list>
        </v-navigation-drawer> -->
   <v-app-bar class="mx-2" clipped app color="rgb(40, 31, 71)">
       <v-app-bar-nav-icon color="white" @click="drawer = !drawer" class="hidden-md-and-up "></v-app-bar-nav-icon>
      <v-toolbar-title class="headline ">
        <span class="white--text">Exception Portal  </span>
      </v-toolbar-title>
      <v-spacer></v-spacer> 
       <v-btn icon class="hidden-sm-and-down mr-5 white--text text-none">
          Jessica Jones
        <!-- <v-icon>mdi-apps</v-icon> -->
      </v-btn>
    <v-btn icon class=" hidden-sm-and-down ml-5 white--text text-none">
          Admin
        <!-- <v-icon>mdi-apps</v-icon> -->
      </v-btn>
      <v-btn icon class=" ml-5 white--text" router-link to="/login">
        <v-icon>mdi-logout</v-icon> 
      </v-btn>
    </v-app-bar>
     <v-navigation-drawer  app clipped-left v-model="drawer" color="white" floating >     
          <v-layout column align-center>
              <v-flex class="mt-6">
                  <v-avatar size="80" class="avatarC">
                    
                      <v-img class="" size="20px" aspect-ratio="1" src="/fakeimg.jpg" alt="/account.png" lazy-src="/fakeimg.jpg"></v-img>
                  </v-avatar>
              </v-flex>
          </v-layout>   
          <v-list dense nav class="mt-6">
            <v-list-item router-link to="/dashboard">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">home</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title class="listColor">
                  Home
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
             <v-list-item router-link to="/users">
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
 

        
          
            <!-- <v-btn color="rgb(40, 31, 71)" text class="ml-6 mb-4"  @click="LogOut()"  >Sign Out
              <v-icon right>mdi-logout</v-icon>
            </v-btn> -->
            <v-divider class="mt-5"></v-divider>
            <p  style="margin-left: -60px;" class="mt-3 ">Documentation </p>
             <div style="display:flex; margin-left: 30px; font-size:15px " >
              <v-icon style="margin-top: -15px" color="rgb(40, 31, 71)">mdi-open-in-new</v-icon>
               <p  style="" class=" ml-5 ">Getting started </p>
           </div>
            
            <!-- <v-list-item router-link to="/manualcredit">
              <v-list-item-icon>
                <v-icon color="rgb(40, 31, 71)">person</v-icon>
              </v-list-item-icon>
              <v-item-content>
                <v-list-item-title >
                 Getting started
                </v-list-item-title>
              </v-item-content>
            </v-list-item> -->
          
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