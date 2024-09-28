import { useState, useEffect } from 'react'
import '../styles/style.scss'
import { ToastContainer } from 'react-toastify'
import Loading from '../components/Loading'
import Moralis from 'moralis'
import { APP_ID, SERVER_URL, SITE_ERROR } from '../../config'
import {  errorAlertCenter,errors } from '../components/toastGroup'
import AppWalletProvider from '../components/WalletProvider'

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false)
  const [hAlert, setHAlert] = useState(true)


  useEffect(()=>{
    try{
      // Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
      // Moralis.initialize(APP_ID)
      // Moralis.serverURL = SERVER_URL
      Moralis.start({
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNiYjJmMDcwLTZkM2EtNDBiNi1iMWFjLTFmYmM4YjRjMjRlZCIsIm9yZ0lkIjoiMjU4MTYwIiwidXNlcklkIjoiMjYyMTU1IiwidHlwZUlkIjoiZTc5YzM5ZTEtMjE2ZS00YWI0LWFkYzItN2ZkOWI4MjAxNGFiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjczNjExMDgsImV4cCI6NDg4MzEyMTEwOH0.TxKmvdcWExygHahlwjW0FxC_vX6pX64y7I8NzTN6MsQ"
      });
    }
    catch(e) {
      errorAlertCenter(SITE_ERROR[1]);
    }
  },[])
  return (
    <>
    {/* <AppWalletProvider> */}
      <Component {...pageProps}
        startLoading={() => setPageLoading(true)}
        closeLoading={() => setPageLoading(false)}
        headerAlert={hAlert}
        closeAlert={() => setHAlert(false)}
      />
         {/* </AppWalletProvider> */}
      <ToastContainer style={{ fontSize: 14, padding: '5px !important', lineHeight: '15px' }} />
      <Loading loading={pageLoading} />
   
    </>
  )
}

export default MyApp
