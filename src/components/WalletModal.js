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
// import { CHAIN_ID, SITE_ERROR, SMARTCONTRACT_ABI_ERC20, SMARTCONTRACT_ADDRESS_ERC20 } from '../../config'

export default function WalletModal({ open, setOpen }) {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 640,
    bgcolor: '#333',
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
      window.ethereum.request({ method: "eth_requestAccounts" });
    }
  }

  return (
    <Modal
      open={open}
      // onClose={close}
      style={{ backdropFilter: "blur(3px)" }}
    >
      <Box sx={style} className="modal-box">
        <h1>Wallet Modal</h1>
        <ConnectButton onClick={connectMetaMask} disabled={false}>
          Binance
          {/* {connected ?
            signerAddress.slice(0, 4) + "..." + signerAddress.slice(39, 42) :
            "Connect"
          } */}
        </ConnectButton>

        <ConnectButton onClick={() => { }} disabled={false}>
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