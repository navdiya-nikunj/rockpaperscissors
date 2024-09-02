import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { GlobalContext } from "../Root";
import { useWallet, WalletName } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button";

const OpponentsMove = () => {
  const global = useContext(GlobalContext);
  const { signAndSubmitTransaction, connect, connected, isLoading } =
    useWallet();
  const [isPlayer, setIsplayer] = useState(false);

  const navigate = useNavigate();
  const { gameID, setisloading, isRegistered, walletAddress } = global!;

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

  useLayoutEffect(() => {
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
        if (data[1] !== data[2]) {
          setIsplayer(true);
        }
        // setisloading(false);
        console.log(data);
      } catch (error) {
        // setisloading(false);
        console.error(error);
      }
    };

    getGame();
  }, []);
  const OpponentsMovehandler = async () => {
    setisloading(true);

    try {
      const response = await signAndSubmitTransaction({
        sender: walletAddress,
        data: {
          function:
            "0x8483163b77cf369c5d0d1090ebd4fef740fa361df453a512889c393c0ba651c2::RPS::randomly_set_computer_move",
          functionArguments: [gameID],
        },
      });

      setisloading(false);
      navigate("/finalizeGame");
      console.log(response);
    } catch (e) {
      alert("Something went wrong");
      setisloading(false);
      console.log(e);
    }
  };

  return (
    <>
      <p className="text-black text-5xl mb-10 font-nerko">Game Id: {gameID}</p>\
      {isPlayer ? (
        <>
          <p className="text-black text-5xl font-nerko mb-10">
            Ask your opponent to make his move using this
            <u>
              <a
                href={`http://localhost:5173/opponentsMove/${walletAddress}/${gameID}`}
              >
                {" "}
                Link{" "}
              </a>
            </u>
          </p>
          <p className="text-black text-3xl font-nerko mb-10">
            Once they Play thier move
            <u>
              <span
                onClick={() => {
                  navigate("/finalizeGame");
                }}
              >
                Click Here
              </span>
            </u>
          </p>
        </>
      ) : (
        <>
          <p className="text-black text-5xl font-nerko mb-10">
            What computer is thinking?? 🤔
          </p>
          <div className="flex">
            <Button
              text="Computer move"
              handler={() => {
                OpponentsMovehandler();
              }}
              classname="p-5"
            />
          </div>
        </>
      )}
    </>
  );
};

export default OpponentsMove;
