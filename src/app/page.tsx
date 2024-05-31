"use client";
import type { NextPage } from "next";
import { ConnectButton } from "thirdweb/react";
import { client } from "../lib/client";
import { generatePayload, isLoggedIn, login, logout } from "./actions/auth";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";
import { sepolia, mainnet } from "thirdweb/chains";

const wallets = [
	createWallet("io.metamask"),
	createWallet("com.coinbase.wallet"),
	walletConnect(),
	inAppWallet({
		auth: { options: ["email", "google", "apple", "facebook", "phone"] },
	}),
];

const ConnectButtonPage: NextPage = () => {
	return (
		<ConnectButton
			client={client}
			wallets={wallets}
			showAllWallets={false}
			chains={[mainnet, sepolia]}
			onConnect={async (wallet) => {
				console.log("Connected wallet:", wallet);
			}}
			connectButton={{
				label: "Connect wallet",
				className: "thirdweb-connect-button",
			}}
			connectModal={{
				title: "Connect Challenge wallet",
			}}
			signInButton={{
				className: "thirdweb-connect-button",
			}}
			auth={{
				isLoggedIn: async (address) => {
					console.log("checking if logged in!", { address });
					return await isLoggedIn();
				},
				doLogin: async (params) => {
					console.log("logging in!");
					await login(params);
				},
				getLoginPayload: async ({ address }) =>
					generatePayload({ address }),
				doLogout: async () => {
					console.log("logging out!");
					await logout();
				},
			}}
		/>
	);
};

export default ConnectButtonPage;
