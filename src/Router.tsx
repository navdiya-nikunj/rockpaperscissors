import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ConnectRegister from "./components/ConnectRegister";
import ComputerOrPlayer from "./components/ComputerOrPlayer";
import PlayerMove from "./components/PlayerMove";
import OpponentsMove from "./components/OpponentsMove";
import FinalizeGame from "./components/FinalizeGame";
import Result from "./components/Result";
import Player2Move from "./components/Player2Move";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App}>
          <Route path="/" Component={ConnectRegister} />
          <Route path="/start" Component={ComputerOrPlayer} />
          <Route path="/playermove" Component={PlayerMove} />
          <Route path="/opponentsMove" Component={OpponentsMove} />
          <Route path="/finalizeGame" Component={FinalizeGame} />
          <Route path="/result" Component={Result} />
          <Route
            path="/opponentsMove/:address/:gameID"
            Component={Player2Move}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
