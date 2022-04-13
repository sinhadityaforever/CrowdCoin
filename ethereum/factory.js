import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0xcD90ced76a279DB0CE348C254c4f968495DFd7Df'
);

export default instance;