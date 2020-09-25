<template>
    <div id="rollover">
      <Navbar/>
        
     <v-card class="mx-5 mt-3">        
              <v-card-title>
               
                    <div class="text-h6 my-2 ml-1 "> Exception form</div>
                  
                
              </v-card-title>
            <v-card-text class="ml-5">
           
              
                               
                  <v-form ref="form"> 
              <v-row class="mx-15">
               
               <v-col cols="12" md="5">
                
                
                  <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Exception id</p>
                <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Exception id" ></v-text-field>
                   
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Exception type</p>
                      <v-select
       v-model="etype"
       :items="items"  
        item-value ="Type"
         item-text="Type"

         class=" primary--text" color="primary"
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
      <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Exception type</p>
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
         @input="pickdate"
        >       
        </v-date-picker>
        
      </v-menu>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Requestor</p>
                <v-text-field solo  v-model="userid"  style="border-radius:0px;" placeholder="requestor" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Department </p>
                <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Department" ></v-text-field>       
                     
                   
                     <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Application code</p>
                <v-text-field solo  v-model="userid"  style="border-radius:0px;" placeholder="Application code" ></v-text-field>
                  <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Application number</p>
                <v-text-field solo  v-model="userid"  style="border-radius:0px;" placeholder="Application number" ></v-text-field>
                    
                   <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Description</p>
                <v-text-field solo  v-model="userid"  style="border-radius:0px;" placeholder="Description" ></v-text-field>
                </v-col>
   <v-col cols="12" md="5">
               
     <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Business need</p>
     <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Business need" ></v-text-field>
                    
                       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Division</p>
                      <v-select
       v-model="dtype"
       :items="items1"  
        item-value ="Type"
         item-text="Type"

         class=" primary--text" color="primary"
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
        <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Risk level</p>
                      <v-select
       v-model="rtype"
       :items="items2"  
        item-value ="Type"
         item-text="Type"

         class=" primary--text" color="primary"
         :rules="[v => !!v || 'Item is required']"
        solo
        
       
      ></v-select>
       <p style="text-align:left; color: black; font-family:Lato; margin-bottom:-1px">Rationale</p>
                <v-text-field solo  v-model="userid"  style="border-radius:0px;" placeholder="Rationale" ></v-text-field>
               <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Impacted rules </p>
                <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Impacted rules" ></v-text-field>
             <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px">Xman </p>
                <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Xman" ></v-text-field>       
                     
          <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Back to normal state  </p>
                <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Back to normal state" ></v-text-field>
                 <p style="text-align:left; color:black;  font-family:Lato; margin-bottom:-1px"> Mitigation </p>
                <v-text-field solo v-model="userid"  style="border-radius:0px;" placeholder="Mitigation" ></v-text-field>        
                     
                
                  
                </v-col>
                       
              </v-row>
                 <v-row class="text-center">
             <v-col cols="12" md="10">
              <div  style=" " class="text-center ">
               <v-btn  rounded class="text-none" :loading ="loading" rounde @click="submit()"    >
                   Request</v-btn >
                  </div> 
                  </v-col>              
                  </v-row>
               </v-form> 
               
            </v-card-text>
          </v-card>>             
       
    
     

    </div>
</template>
<script>
import  Navbar from '../components/Navbar'
export default {
     components: {
        Navbar
    },

    data: () => ({
     
      items1: [ 'Div A', 'Div B', 'Div C', 'Othhers' ],
      items2: ['Not assesed', 'Low', 'Medium', 'High', 'Critical'],
      text: " ",
      text1: " Manual credit not succesfull",
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
      dialog: false,
       dialog1: false,  
      desserts: [],
     
    }),
    
    mounted() {
      // alert(this.trans)
      // alert(this.value)
      if(this.trans === "All"){
        let payload = {
                      from_date: this.fromdate,
                      to_date: this.todate,
                      subtype: ''                                
                  }
                  
      this.$store.dispatch('loadTransactions', payload)
       .then((success)=>{
              console.log(success.data);
             console.log( this.$store.state.transactions);
              this.desserts = this.$store.state.transactions;
             
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
                // alert(error)
              
          })
      }
      else{
let payload = {
                      from_date: this.fromdate,
                      to_date: this.todate,
                      subtype: this.trans                 
            }
            
      this.$store.dispatch('loadTransactions', payload)
       .then((success)=>{
              console.log(success.data);
             console.log( this.$store.state.transactions);
              this.desserts = this.$store.state.transactions;
             
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
                // alert(error)
              
          })
}

     
    },

    computed: {
   headers() {
      let headers = [
  

        {
         text: 'Id',
          align: 'left',
          sortable: false,
          value: 'id',
        }
      ]
for(var j in this.value){
                if( this.value[j]=== "Amount"){
                 
               
                headers.push( { text: 'Amount', value: 'amount' })
                }else if( this.value[j]=== "Date"){                   
                    headers.push( { text: 'Date', value: 'actionDate' })
                }
                 else if( this.value[j]=== "Trans-ref"){                                 
                  headers.push( { text: 'Trans-ref', value: 'interswitchRef', sortable: false })
                }
                else if( this.value[j]=== "Type"){                   
                     headers.push({ text: 'Type', value: 'type' })
                }
                else if(this.value[j]=== "Sub-type"){                   
                    headers.push( { text: 'Sub-type', value: 'subType' })
                }
                else if( this.value[j]=== "Recipient"){                   
                    headers.push({ text: 'Recipient', value: 'recipient' })
                }
                   else if( this.value[j]=== "Source"){                   
                   headers.push( { text: 'Source', value: 'source' })
                }
                  
                  else if( this.value[j]=== "Initial-Balance"){                   
                  headers.push( { text: 'Initial-Balance', value: 'initialBalance' })
                }
                   else if( this.value[j]=== "Final-Balance"){                   
                   headers.push({ text: 'Final-Balance', value: 'finalBalance' })
                }
                else if( this.value[j]=== "Terminal"){                   
                   headers.push({ text: 'Terminal', value: 'terminal' })
                }
                
            }
   
     
      return headers
    }
    },

    watch: {
    
    },

    created () {
      this.initialize()
    },

    methods: {
      pickDate(){
  this.menu2= false;
  // alert(this.todate)
  // alert(this.fromdate)
   this.RefreshTransaction()
        
      },
         pickDate1(){
  this.menu= false;
  // alert(this.todate)
  // alert(this.fromdate)
   this.RefreshTransaction()
        
      },

       toggle () {
        this.$nextTick(() => {
          if (this.likesAllFruit) {
            this.selectedFruits = []
          } else {
            this.selectedFruits = this.fruits.slice()
          }
        })
      },
      initialize () {
        this.desserts = [
         
          
        ]
      },

 

 RefreshTransaction() {

        if(this.trans === "All"){
        let payload = {
                      from_date: this.fromdate,
                      to_date: this.todate ,
                      subtype: ""                                 
                  }
                  
      this.$store.dispatch('loadTransactions', payload)
       .then((success)=>{
              console.log(success.data);
             console.log( this.$store.state.transactions);
              this.desserts = this.$store.state.transactions;
             
              
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
                // alert(error)
              
          })
      }
      else{
      //  alert(this.trans)
  let payload = {
                      from_date: this.fromdate,
                      to_date: this.todate,
                      subtype: this.trans                 
            }
            
      this.$store.dispatch('loadTransactions', payload)
       .then((success)=>{
              console.log(success.data);
             console.log( this.$store.state.transactions);
              this.desserts = this.$store.state.transactions;
             
             
          })
          .catch((error)=>{
            console.log("yee")
              console.log(error)
                // alert(error)
              
          })
}
      },

submit() {
      
       this.dialog1 = false;
        let newTransaction = {
               transtype: this.transtype,
               //category: this.category
          }
         // console.log(newComponent)
          this.$store.dispatch('postNewTransaction', newTransaction)
          .then((success)=>{
              console.log(success.data);
             
               this.snackbar = true
             
          })
          .catch((error)=>{
              console.log(error.data)
               alert(error)
                this.snackbar1 = true
          })
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