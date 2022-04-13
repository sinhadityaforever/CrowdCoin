import React, {useState} from 'react'
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {useRouter} from 'next/router';


function ContributeForm({address}) {
  const router = useRouter();
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit= async(e)=>{
    e.preventDefault();
    setIsLoading(true)
    const campaign = Campaign(address);
    try {
     const accounts = await web3.eth.getAccounts();
     await campaign.methods.contribute().send({
       from: accounts[0], 
       value: web3.utils.toWei(value, 'ether')
     });
     setIsLoading(false);
     router.replace(`/campaigns/${address}`)
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form error onSubmit={onSubmit}>
        <Form.Field>
          <label>Amount to Contribute</label>
        <Input
        label="ether" labelPosition='right'
        onChange={e=>{setValue(e.target.value)}}
        >
        </Input>
        </Form.Field>
        {errorMessage && <Message error header="Oops!" content={errorMessage}></Message>}
        <Button loading={isLoading} primary>Contribute!</Button>
      </Form>
    </div>
  )
}

export default ContributeForm