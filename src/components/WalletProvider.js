"use client";

import React, { useMemo } from "react";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import { SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

// require("@solana/wallet-adapter-react-ui/styles.css");

export default function AppWalletProvider({
  children,
}) {
  // Set the network (Devnet, Testnet, or Mainnet)
  const network = WalletAdapterNetwork.Devnet;

  // Use Solana's cluster URL for the chosen network
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize wallets to use, adding more if needed
//   const wallets = useMemo(
//     () => [
//       new SolflareWalletAdapter(),
//     ],
//     [network]
//   );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider 
        // wallets={wallets} 
      autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
