import { Box, Checkbox, IconButton, Modal } from "@mui/material"
import { useState } from "react"
import { ClipLoader } from "react-spinners"
import { SMARTCONTRACT_ABI, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS, SMARTCONTRACT_ADDRESS_ERC20 } from "../../config"
import CostSlider from "./CostSlider"
import { BigStakeButton, BpCheckedIcon, BpIcon, ConnectButton } from "./styleHook"
import { errorAlert, successAlert, warningAlert } from "./toastGroup"
import Web3Modal from "web3modal"
import { ethers, providers } from "ethers"
import { providerOptions } from '../hook/connectWallet'
import { PublicKey } from "@solana/web3.js"
// import { CHAIN_ID, SITE_ERROR, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS_ERC20 } from '../../config'

export default function WalletModal({ open, setOpen, setAccount }) {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius: "12px",
    p: 4,
  }

  const connectBinance = async () => {
      // setLoading(true)
      // if (await checkNetwork()) {
        const web3Modal = new Web3Modal({
          network: 'mainnet', // optional
          cacheProvider: true,
          providerOptions, // required
        })
        const provider = await web3Modal.connect()
        const web3Provider = new providers.Web3Provider(provider)
  
        const signer = web3Provider.getSigner()
        const address = await signer.getAddress()
  
        const contract_20 = new ethers.Contract(
          SMARTCONTRACT_ADDRESS_ERC20,
          SMARTCONTRACT_ABI_ERC20,
          signer
        )
  
        const bal = await contract_20.balanceOf(address)
        setSignerBalance(ethers.utils.formatEther(bal))
        // setLoading(false)
        // setConnected(true)
        // setSignerAddress(address)
  
        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
          // setSignerAddress(accounts[0])
        });
  
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
          window.location.reload()
        });
      // }
    
  }

  const connectMetaMask = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log('accounts', accounts)
      setAccount(accounts[0])
    }
  }

  const connectPhantomWallet = async () => {
    try {
      const resp = await window.solana.connect();
      const pubKey = new PublicKey(resp.publicKey);
      console.log('pub key', pubKey.toBase58())
      setAccount(pubKey.toBase58())
      // const balance = await connection.getBalance(pubKey);
      // balance / 1e9; // Convert from lamports to SOL

    } catch (err) {
      console.error('Error connecting to Phantom:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      style={{ backdropFilter: "blur(3px)" }}
    >
      <Box sx={style} className="modal-box">
        <h1 style={{ color: 'black', marginLeft: '5px' }} >Wallet Modal</h1>
        <ConnectButton onClick={connectMetaMask} disabled={false}>
          Binance
          {/* {connected ?
            signerAddress.slice(0, 4) + "..." + signerAddress.slice(39, 42) :
            "Connect"
          } */}
        </ConnectButton>

        <ConnectButton onClick={connectPhantomWallet} disabled={false}>
          Solana
          {/* {connected ?
            signerAddress.slice(0, 4) + "..." + signerAddress.slice(39, 42) :
            "Connect"
          } */}
        </ConnectButton>


      </Box>
    </Modal>
  )
}