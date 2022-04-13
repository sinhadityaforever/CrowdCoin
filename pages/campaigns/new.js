import React from 'react'
import Layout from '../../components/Layout'
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { useState } from 'react';
import factory from "../../ethereum/factory"
import web3 from '../../ethereum/web3'
import {useRouter} from 'next/router';

function CampaignNew() {
  const router = useRouter();
  const [minimumContribution, setMinimumContribution] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit= async (event) =>{
    setIsLoading(true);
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
    await factory.methods.createCampaign(minimumContribution)
      .send({
        from: accounts[0]
      })
      setIsLoading(false);
      router.replace('/')
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
    

  }
  return (
    <div>
      <Layout>
    <h3>Create a campaign</h3>
    <Form error onSubmit={onSubmit}>
      <Form.Field>
        <label>Minimum Contribution</label>
        <Input label="wei" labelPosition='right' value={minimumContribution} onChange={e=>{setMinimumContribution(e.target.value)}}></Input>
      </Form.Field>
      {errorMessage && <Message error header="Oops!" content={errorMessage}/>}
      <Button loading={isLoading} primary>Create</Button>
    </Form>
      </Layout>
    </div>
  )
}

export default CampaignNew