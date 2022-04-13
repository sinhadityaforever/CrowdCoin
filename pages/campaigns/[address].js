import React from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import { useRouter } from "next/router";
import 'semantic-ui-css/semantic.min.css';
import web3 from '../../ethereum/web3'
import ContributeForm from "../../components/ContributeForm";
import Link from "next/link";


export default function CampaignShow({ address ,minimumContribution, balance, requestsCount, approversCount, manager }) {
  

  const items = [{
    header: manager,
    meta: "Address of Manager",
    description: "Manager created this campaign and can create requests to withdraw money",
    style: { overflowWrap: "break-word" }
  },
  {
    header: minimumContribution,
    meta: "Minimum Contribution (wei)",
    description: "You must contribute at least this much wei to become an approver"
  },
  {
    header: requestsCount,
    meta: "Total number of requests",
    description: "A request tries to withdraw money from the contract."
  },
  {
    header: approversCount,
    meta: "Total number of approvers",
    description: "Number of people who have already donated"
  },
  {
    header: web3.utils.fromWei(balance, 'ether'),
    meta: "Campaign Balance (ether)",
    description: "The balance is how much money this campaign has left to spend"
  },
  ];
 
  return (
    <Layout>
      <div>
        
        <h3>Campaign View</h3>
        <Grid>
          <Grid.Row>
          <Grid.Column width={10}>
          <Card.Group items={items}/>
         
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
          <Grid.Column width={6}>
          <ContributeForm address={address} ></ContributeForm>
          </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
          <Link href={`/campaigns/requests/${address}`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
          </Grid.Column>
          </Grid.Row>
        </Grid>
        
        
      </div>
    </Layout>
  );
}
 
CampaignShow.getInitialProps = async (props) => {
  
  const address = props.query.address;
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();
 
  return { 
    address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4]
   };
}