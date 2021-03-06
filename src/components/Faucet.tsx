import { useState } from 'react';
import { ethers } from 'ethers'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Message from './Message';
import { tokenAddress } from '../constants';

const Faucet = (props: any) => {

  const [balance, setBalance] = useState()
  const [showBalance, setShowBalance] = useState(false)

  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, provider);
      const balance = await contract.balanceOf(account);
      setBalance(balance.toString());
      setShowBalance(true);
    }
  }

  async function faucet() {
    if (typeof window.ethereum !== 'undefined') {
      const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, props.tokenContract.abi, signer);
      contract.faucet(account[0], 100);
    }
  }
  return (
    <div>
      <Card style={{ background: "rgba(227, 104, 222, 0.71)" }}>
        <Card.Body>
          <Card.Subtitle>
            Recieve FCT ERC20 to your wallet
          </Card.Subtitle>
          <br />
          <div className="d-grid gap-2">
            <Button className='w-100 mb-3' onClick={faucet}>Get FCT Token!</Button>
            {showBalance ? <Message balance={balance} /> : null}
            <Button className='w-100' onClick={getBalance} variant="warning">Check My Balance</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Faucet