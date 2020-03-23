import React from 'react';
import Amplify, { Auth } from 'aws-amplify'
import config from './config'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH' 
    },
    API: {
    graphql_headers: async () => {
        const currentSession = await Auth.currentSession();
        return { Authorization: currentSession.getIdToken().getJwtToken() };
        }
    }
})


let myAppConfig = {
    aws_appsync_graphqlEndpoint: config.graphql.URL,
    aws_appsync_region: config.graphql.REGION,
    aws_appsync_authenticationType: config.graphql.AUTHENTICATION_TYPE
}

Amplify.configure(myAppConfig)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
