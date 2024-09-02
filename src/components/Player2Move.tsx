import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { GlobalContext } from "../Root";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";

const Player2Move = () => {
  const global = useContext(GlobalContext);
  const { setisloading } = global!;
  const { signAndSubmitTransaction, connect, account } = useWallet();
  const [isconnected, setisconnected] = useState(false);
  const [moveCompleted, setMoveCompleted] = useState(false);
  const [gameID, setGameID] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const url = window.location.href;
    const urlParts = url.split("/");
    const gameID = urlParts[urlParts.length - 1];
    const address = urlParts[urlParts.length - 2];
    setGameID(gameID);
    setAddress(address);
  }, []);

  const handleConnect = async () => {
    try {
      setisloading(true);
      // Change below to the desired wallet name instead of "Petra"
      connect("Petra" as WalletName<"Petra">);
      setisconnected(true);
      console.log("Connected to wallet:", account);
      setisloading(false);
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert("couldn't connect");
      setisloading(false);
    }
  };
  const playerSelect = async (choice: number) => {
    setisloading(true);

    try {
      const response = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::set_opponent_move",
          functionArguments: [gameID, choice, address],
        },
      });

      // await aptos.waitForTransaction({ transactionHash: response.hash });
      setisloading(false);
      alert("Your move is submitted");
      setMoveCompleted(true);
      console.log(response);
    } catch (e) {
      alert(e);
      setisloading(false);
      console.log(e);
    }
  };

  return (
    <>
      {isconnected ? (
        <>
          {!moveCompleted ? (
            <>
              <p className="text-black text-5xl mb-10 font-nerko">
                Game Id: {gameID}
              </p>
              <p className="text-black text-5xl font-nerko mb-10">
                Select Your choice 🤔
              </p>
              <div className="flex">
                <Button
                  text="Hard as Rock 🪨"
                  handler={() => {
                    playerSelect(1);
                  }}
                  classname="p-5"
                />
                <Button
                  text="Smart as Paper 📃"
                  handler={() => {
                    playerSelect(2);
                  }}
                  classname="mx-5 p-5"
                />
                <Button
                  text="Sharp as Scissors ✂️"
                  handler={() => {
                    playerSelect(3);
                  }}
                  classname="p-5"
                />
              </div>
            </>
          ) : (
            <p className="text-black text-5xl font-nerko mb-10">
              Your move is completed
            </p>
          )}
        </>
      ) : (
        <>
          <p className="text-black text-5xl mb-10 font-nerko">
            Connect your wallet:
          </p>
          <Button text="Connect Wallet" handler={handleConnect} classname="" />
        </>
      )}
    </>
  );
};

export default Player2Move;
