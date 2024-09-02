import { useContext, useEffect } from "react";
import { GlobalContext } from "../Root";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";

const PlayerMove = () => {
  const global = useContext(GlobalContext);
  const { signAndSubmitTransaction, connect, connected } = useWallet();

  const navigate = useNavigate();
  const { gameID, setisloading, isRegistered, walletAddress } = global!;

  useEffect(() => {
    if (!isRegistered) {
      alert("Please connect/register your wallet first");
      navigate("/");
    }
    if (!connected) {
      connect("Petra" as WalletName<"Petra">);
    }
  }, []);
  const playerSelect = async (choice: number) => {
    setisloading(true);

    try {
      const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::set_player_move",
          functionArguments: [gameID, choice],
        },
      });

      // await aptos.waitForTransaction({ transactionHash: response.hash });
      setisloading(false);
      navigate("/opponentsMove");
      console.log(response);
    } catch (e) {
      alert("Something went wrong");
      setisloading(false);
      console.log(e);
    }
  };

  return (
    <>
      <p className="text-black text-5xl mb-10 font-nerko">Game Id: {gameID}</p>
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
  );
};

export default PlayerMove;
