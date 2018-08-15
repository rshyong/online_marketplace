import { Connect, SimpleSigner, } from 'uport-connect'

export const uport = new Connect('Online Marketplace', {
    clientId: '2ofytfeL8TpPffEra1xeeqSDXT5SSEDti6G',
    network: 'rinkeby',
    signer: SimpleSigner('52b7f915de0aaddd4cc120a29f5313d2cf959bf45a50b5d03786194ace021dfe')
});

export const web3 = uport.getWeb3()