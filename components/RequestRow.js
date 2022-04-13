import React from 'react'
import { Table, Button} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';



function RequestRow({id, request, approversCount, address}) {

  const onApprove = async ()=>{
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    const readyToFinalize = request.approvalCount > approversCount/2;
    await  campaign.methods.approveRequest(id).send({
      from: accounts[0]
    })
  }
  const onFinalize = async()=>{
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    })
  }
  const {Row, Cell} = Table;
  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Cell>
        {id}
      </Cell>
      <Cell>
      {request.description}
      </Cell>
      <Cell>
        {web3.utils.fromWei(request.value, 'ether')}
      </Cell>
      <Cell>
        {request.recipient}
      </Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        { request.complete ? null :
        <Button onClick={onApprove} color='green' basic>Approve</Button>
        }
      </Cell>
      <Cell>
        { request.complete ?  null :
        <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
        }</Cell>
    </Row>

  )
}

export default RequestRow;