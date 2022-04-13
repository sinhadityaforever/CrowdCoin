import React from 'react'
import 'semantic-ui-css/semantic.min.css';
import web3 from '../../../../ethereum/web3';
import Campaign from '../../../../ethereum/campaign';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import {useState} from 'react'
import Layout from '../../../../components/layout';
import Link from 'next/link';

function NewRequest({address}) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const onSubmit = async(e)=>{
    e.preventDefault();
    const campaign = Campaign(address);
    try {
      setIsLoading(true);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({from: accounts[0]});
        setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message)
      setIsLoading(false);
    }
  }
  return (
    <Layout>
      <Link href={`/campaigns/requests/${address}`}>
      <a>
        Back
      </a>
      </Link>
      <h3>Create a Request</h3>
    <Form error onSubmit={onSubmit}>
      <Form.Field>
        <label>Description</label>
        <Input
        value={description}
        onChange={e=>setDescription(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Value in Ether</label>
        <Input
        value={value}
        onChange={e=>setValue(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Recipient</label>
        <Input
        value={recipient}
        onChange={e=>setRecipient(e.target.value)}
        />
      </Form.Field>
      { errorMessage &&
      <Message error header="Oops!" content={errorMessage}></Message>}
      <Button loading={isLoading} primary>Create!</Button>
    </Form>

    </Layout>
  )
}
NewRequest.getInitialProps= async(props)=>{
  const address = props.query.address;
  return {address};
}
export default NewRequest