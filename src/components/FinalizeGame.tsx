import { useContext, useEffect } from "react";
import Button from "./Button";
import { GlobalContext } from "../Root";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

const FinalizeGame = () => {
  const global = useContext(GlobalContext);
  const { signAndSubmitTransaction, connect, connected } = useWallet();

  const navigate = useNavigate();
  const { gameID, setisloading, isRegistered, walletAddress } = global!;

  useEffect(() => {
    if (!isRegistered) {
      alert("Please connect/register your wallet first");
      //   navigate("/");
    }
    if (!connected) {
      connect("Petra" as WalletName<"Petra">);
    }
  }, []);

  const viewResult = async () => {
    setisloading(true);

    try {
      const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::finalize_game_results",
          functionArguments: [gameID],
        },
      });

      // await aptos.waitForTransaction({ transactionHash: response.hash });

      setisloading(false);
      navigate("/result");
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
        The result is out now ✨ Excited?? 😁
      </p>
      <div className="flex">
        <Button
          text="View Result"
          handler={() => {
            viewResult();
          }}
          classname="p-5"
        />
      </div>
    </>
  );
};

export default FinalizeGame;
