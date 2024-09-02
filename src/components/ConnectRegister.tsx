import { useContext, useEffect } from "react";
import Button from "./Button";
import { WalletName, useWallet } from "@aptos-labs/wallet-adapter-react";

import { GlobalContext } from "../Root";
import { useNavigate } from "react-router-dom";
const ConnectRegister = () => {
  const navigate = useNavigate();
  const global = useContext(GlobalContext);
  const {
    setisloading,
    walletAddress,
    setWalletAddress,
    isRegistered,
    setIsRegistered,
  } = global!;
  const { connect, disconnect, connected, account, signAndSubmitTransaction } =
    useWallet();
  useEffect(() => {
    if (account && connected) {
      setWalletAddress(account.address.toString());
      localStorage.setItem("walletAddress", account.address.toString());
    }
  }, [connected, account, setWalletAddress]);

  const handleConnect = async () => {
    try {
      setisloading(true);
      // Change below to the desired wallet name instead of "Petra"
      if (!connected) {
        connect("Petra" as WalletName<"Petra">);
      }
      console.log("Connected to wallet:", account);
      setisloading(false);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert("couldn't connect");
      setisloading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      if (connected) {
        disconnect();
      }
      localStorage.removeItem("walletAddress");
      setWalletAddress("");
      console.log("Disconnected from wallet");
    } catch (error) {
      console.error("Failed to disconnect from wallet:", error);

      alert("Something went wrong");
      setisloading(false);
    }
  };

  const handleStart = async () => {
    console.log("Start game");
    navigate("/start");
  };

  const handleRegister = async () => {
    setisloading(true);
    if (!account) {
      setisloading(false);
      alert("Wallet is not connected");
      return;
    }
    try {
      const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::initialize_player",
          functionArguments: [],
        },
      });
      setisloading(false);
      setIsRegistered(true);
      console.log(response);
    } catch (e) {
      alert("Something went wrong");
      setisloading(false);
      console.log(e);
    }
  };

  return (
    <>
      <p className="text-black text-5xl animate-bounce  mb-10 font-nerko">
        Welcome to Rock 🪨, Paper 📃, Scissors ✂️
      </p>
      {!walletAddress ? (
        <Button text="Connect Wallet" handler={handleConnect} classname="" />
      ) : (
        <div className="w-[100%] flex flex-col ">
          <p className="text-black text-3xl font-nerko mb-5 flex-shrink">
            Connected to: {walletAddress}
          </p>
          <div className="flex">
            <Button
              text="Disconnect ❌"
              handler={handleDisconnect}
              classname="mr-5"
            />
            {isRegistered ? (
              <Button text="Start game 🏁" handler={handleStart} classname="" />
            ) : (
              <Button
                text="Register 📝"
                handler={handleRegister}
                classname=""
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConnectRegister;
