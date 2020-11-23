import Vue from "vue";
import AWSAppSyncClient from "aws-appsync";
import VueApollo from "vue-apollo";
const dotenv = require('dotenv');
dotenv.config();
const config = {
  url: "https://portal-test12.auth.us-east-1.amazoncognito.com/login?client_id=5eoa483o47202no3ornn79rrbh&response_type=code&scope=email+openid",
  region: "us-east-1",
  auth: {
    type: "AMAZON_COGNITO_USER_POOLS",
    jwtToken: async () => {
      const currentSession = await Vue.prototype.$Amplify.Auth.currentSession();
      return currentSession.getAccessToken().getJwtToken();
    }
  }
};
const options = {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    }
  }
};

const defaultClient = new AWSAppSyncClient(config, options);

const apolloProvider = new VueApollo({ defaultClient });

Vue.use(VueApollo);

export default apolloProvider;