import Link from 'next/link';
import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import Layout from '../../../components/layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

function RequestsView({address, requests, requestCount, approversCount}) {
  const {Header, Row, HeaderCell, Body} = Table;
  return (
    <div>
      <Layout>
        <h3>Requests View</h3>
        <Link href={`/campaigns/requests/new/${address}`}>
        <a>
          <Button primary floated='right' style={{marginBottom: 10}}>Add Request</Button>
        </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
          {requests.map((request, index)=>{
          return <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount ={approversCount}
          ></RequestRow>
        })}
          </Body>
        </Table>
        <div>Found {requestCount} requests</div>
      </Layout>
    </div>
  )
}

RequestsView.getInitialProps = async(props)=>{
  const address = props.query.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount)).fill().map((ele, index)=>{
      return campaign.methods.requests(index).call()
    })
  )
  return {address, requests, requestCount, approversCount};

}

export default RequestsView