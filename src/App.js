import React, { Component } from 'react';
import './App.css';
import {
  withAuthenticator
} from 'aws-amplify-react';
import Amplify from 'aws-amplify';
import config from './config'
import { API, graphqlOperation } from 'aws-amplify'

Amplify.configure(config)

 
const query =  `query Query {
  organization(id: "abc123") {
    companies{
      id name
    }
    id
    name
  }
  
}
`
class App extends Component {
  state = { organizations: [ ] }
  async componentDidMount(){
   const data = await API.graphql(graphqlOperation(query)) 
    this.setState({
      organization: data.data.organization.name,
      organizations: data.data.organization.companies
    })
 }

  render() {

  return ( 
    <div className = "App" >
    <header className = "App-header" >
     <p className ="page-title"> Organizations: </p> 
     <div className="org-name">
     {
       <p>{this.state.organization}</p>
     }
     </div>
     <div className="list">
       {
       this.state.organizations.map((company, index ) => (
         <p  key={index}>{company.id}:  {company.name}</p>
       ))
     }
     </div>
     </header>
     </div>
  );
}
} 

export default withAuthenticator(App, { includeGreetings: true } )
