/* eslint-disable */
import {CognitoAuth, StorageHelper} from 'amazon-cognito-auth-js';
import IndexRouter from '../router/index'
import UserInfoApi from './user-info-api';


const CLIENT_ID = "5gul6il2bkp93j0eg9uoeb90vs";
const APP_DOMAIN = "portal-test12.auth.us-east-1.amazoncognito.com";
const REDIRECT_URI = "http://localhost:8080";
const USERPOOL_ID = "us-east-1_lzKMtdILH";
const REDIRECT_URI_SIGNOUT = "http://localhost:8080/logout";
const APP_URL = "http://localhost:8080"

var authData = {
    ClientId : CLIENT_ID, // Your client id here
    AppWebDomain : APP_DOMAIN,
    TokenScopesArray : ['openid', 'email'],
    RedirectUriSignIn : REDIRECT_URI,
    RedirectUriSignOut : REDIRECT_URI_SIGNOUT,
    UserPoolId : USERPOOL_ID,
}

var auth = new CognitoAuth(authData);
auth.userhandler = {
    
    onSuccess: function(result) {
        console.log("On Success result", result);
      //  this.$store.state.loggedIn = true
      auth.getSession();
      IndexRouter.push('/');
        UserInfoApi.getUserInfo().then(response => {
            IndexRouter.push('/home');
        });
        
        
    },
    onFailure: function(err) {
        console.log("ii")
        console.log(err)
       // this.$store.state.loggedIn = true
       
        
    }
};

function getUserInfoStorageKey(){
    var keyPrefix = 'CognitoIdentityServiceProvider.' + auth.getClientId();
    var tokenUserName = auth.signInUserSession.getAccessToken().getUsername();
    var userInfoKey = keyPrefix + '.' + tokenUserName + '.userInfo';
    return userInfoKey;
}

var storageHelper = new StorageHelper();
var storage = storageHelper.getStorage();
export default{
    auth: auth,
    login(){
        console.log("On Success result");
        
        auth.getSession();
        console.log(auth.getSession())

    },
    logout(){
        if (auth.isUserSignedIn()) {
            var userInfoKey = this.getUserInfoStorageKey();
            auth.signOut();

            storage.removeItem(userInfoKey);
        }
    },
    getUserInfoStorageKey,

}