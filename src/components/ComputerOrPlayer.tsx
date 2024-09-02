import { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { WalletName, useWallet } from "@aptos-labs/wallet-adapter-react";
import { GlobalContext } from "../Root";
import { useNavigate } from "react-router-dom";

const ComputerOrPlayer = () => {
  const { signAndSubmitTransaction, connect, connected } = useWallet();
  const navigate = useNavigate();
  const global = useContext(GlobalContext);
  const { walletAddress, setisloading, setGameID, gameID, isRegistered } =
    global!;
  useEffect(() => {
    if (!isRegistered) {
      alert("Please connect your wallet first");
      navigate("/");
    } else {
      if (!connected) {
        connect("Petra" as WalletName<"Petra">);
      }
    }
  }, []);

  const [isPlayer, setIsplayer] = useState(false);
  const [opponent, setOpponent] = useState("");
  const handleStartGame = async () => {
    if (isPlayer) {
      if (!opponent) {
        alert("Please enter the wallet address of your opponent");
        return;
      }
    }

    setisloading(true);
    try {
      const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::start_game",
          functionArguments: [
            isPlayer ? 2 : 1,
            opponent === "" ? walletAddress : opponent,
          ],
        },
      });
      setisloading(false);
      setGameID(Number(gameID) + 1);
      navigate("/playerMove");
      console.log(response);
      return;
    } catch (e) {
      alert(e);
      setisloading(false);
      console.log(e);
    }
  };

  return (
    <>
      <p className="text-black text-5xl mb-10 font-nerko">
        Select your opponent 🥊
      </p>
      <div>
        {isPlayer ? (
          <>
            <input
              type="text"
              placeholder="Enter the wallet address of your opponent"
              className="border-2 border-gray-500 p-2 text-lg rounded-lg w-[50%] mt-5"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
            />
            <Button
              text="Submit Address"
              handler={handleStartGame}
              classname="mt-5"
            />
          </>
        ) : (
          <>
            <Button
              text="Computer 🖥️"
              handler={handleStartGame}
              classname="mb-5"
            />
            <Button
              text="Player 🥷"
              handler={() => {
                setIsplayer(true);
              }}
              classname=""
            />
          </>
        )}
      </div>
    </>
  );
};

export default ComputerOrPlayer;
