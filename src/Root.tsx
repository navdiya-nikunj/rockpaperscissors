import { createContext, useEffect, useState } from "react";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import Router from "./Router";
import axios from "axios";
interface GlobalContextType {
  isloading: boolean;
  setisloading: (isLoading: boolean) => void;
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
  activePart: number;
  setActivePart: (activePart: number) => void;
  isRegistered: boolean;
  setIsRegistered: (isRegistered: boolean) => void;
  gameID: number;
  setGameID: (gameID: number) => void;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
const Root = () => {
  const [isloading, setisloading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [activePart, setActivePart] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);
  const [gameID, setGameID] = useState<number>(0);

  useEffect(() => {
    const walletAddress = localStorage.getItem("walletAddress");
    setWalletAddress(walletAddress || "");
  }, []);

  useEffect(() => {
    const checkforRegistration = async () => {
      const options = {
        method: "POST",
        url: "https://api.testnet.aptoslabs.com/v1/view",
        headers: { "Content-Type": "application/json" },
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::get_player",
          type_arguments: [],
          arguments: [walletAddress],
        },
      };
      try {
        setisloading(true);
        const { data } = await axios.request(options);
        console.log("Data", data);
        setisloading(false);
        if (data[0] === 1) {
          setIsRegistered(true);
        }
        console.log(data);
      } catch (error) {
        setisloading(false);
        console.error(error);
      }
    };

    const getLatestGame = async () => {
      const options = {
        method: "POST",
        url: "https://api.testnet.aptoslabs.com/v1/view",
        headers: { "Content-Type": "application/json" },
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::get_game_count",
          type_arguments: [],
          arguments: [walletAddress],
        },
      };
      try {
        setisloading(true);
        const { data } = await axios.request(options);
        console.log("Data", data);
        setGameID(data[data.length - 1]);
        setisloading(false);
        console.log(data);
      } catch (error) {
        setisloading(false);
        console.error(error);
      }
    };
    console.log("walletAddress changed");
    if (walletAddress) {
      console.log("walletAddress");
      checkforRegistration();
      getLatestGame();
    }
  }, [walletAddress]);
  return (
    <GlobalContext.Provider
      value={{
        isloading,
        setisloading,
        walletAddress,
        setWalletAddress,
        activePart,
        setActivePart,
        isRegistered,
        setIsRegistered,
        gameID,
        setGameID,
      }}
    >
      <AptosWalletAdapterProvider
        onError={(error) => {
          console.log("error", error);
        }}
      >
        <Router />
      </AptosWalletAdapterProvider>
    </GlobalContext.Provider>
  );
};

export default Root;
