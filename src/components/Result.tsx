import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../Root";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const Result = () => {
  const global = useContext(GlobalContext);
  const { connect, connected, isLoading } = useWallet();
  const [game, setGame] = useState<Array<number>>([]);
  const navigate = useNavigate();
  const { gameID, isRegistered, walletAddress } = global!;
  console.log("Game");
  useEffect(() => {
    if (!isRegistered) {
      // alert("Please connect/register your wallet first");
      // navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!connected && isRegistered && !isLoading) {
      alert("Wallet not connected in Result");
      connect("Petra" as WalletName<"Petra">);
    }
  }, [connected]);

  useEffect(() => {
    const getGame = async () => {
      const options = {
        method: "POST",
        url: "https://api.testnet.aptoslabs.com/v1/view",
        headers: { "Content-Type": "application/json" },
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::get_game",
          type_arguments: [],
          arguments: [walletAddress, gameID.toString()],
        },
      };
      try {
        // setisloading(true);
        const { data } = await axios.request(options);
        console.log("Data", data);
        setGame(data);
        // setisloading(false);
        console.log(data);
      } catch (error) {
        // setisloading(false);
        console.error(error);
      }
    };
    getGame();
  }, []);

  return (
    <>
      <p className="text-black text-5xl mb-10 font-nerko">Game Id: {gameID}</p>
      {game[5] === 3 && (
        <p className="text-black text-5xl font-nerko mb-10 animate-pulse">
          It's draw 🤝
        </p>
      )}
      {game[5] === 1 && (
        <p className="text-black text-5xl font-nerko mb-10 animate-bounce">
          You won 🥳
        </p>
      )}
      {game[5] === 2 && (
        <p className="text-black text-5xl font-nerko mb-10">
          You lost 🥲 {game[1] !== game[2] && <span>Player 2 won</span>}
        </p>
      )}
      <p className="text-black text-3xl font-nerko mb-10">
        Your Move :{" "}
        {game[3] === 1
          ? "🪨"
          : game[3] === 2
          ? "📃"
          : game[3] === 3
          ? "✂️"
          : "Null"}
      </p>
      <p className="text-black text-3xl font-nerko mb-10">
        {game[1] === game[2] ? "Computer Move" : "Player 2 Move"} :
        {game[4] === 1
          ? "🪨"
          : game[4] === 2
          ? "📃"
          : game[4] === 3
          ? "✂️"
          : "Null"}
      </p>
      <Button text="Play Again" handler={() => navigate("/")} classname="" />
    </>
  );
};

export default Result;
