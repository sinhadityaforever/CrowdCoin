
import React, { Component } from 'react'
import factory from '../ethereum/factory'
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout';

export default class CampaignIndex extends Component {



  static async getInitialProps(){
    const campaigns = await factory.methods.getDeployedCampaigns().call();
     
    return {campaigns};
  }

  
   
  
  

  
  render() {
    const items = this.props.campaigns.map(address=>{
      return {
        header: address,
        description: <a href={`/campaigns/${address}`}>View Campaign</a>,
        fluid: true
      }
    });

    return (
      <Layout>
    <div>
      <h3>Open Campaigns</h3>
    <div><Card.Group items= {items}/>
    <a href="/campaigns/new">
    <Button floated='right' content="Create Campaign" icon = "add circle" primary></Button></a>
    </div>
    </div>
    </Layout>)
   
  }
}
