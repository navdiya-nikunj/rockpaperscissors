import { useContext } from "react";

import { GlobalContext } from "./Root";
import { Outlet } from "react-router-dom";

function App() {
  const global = useContext(GlobalContext);
  const { isloading } = global!;

  return (
    <div className="bg-paperBg h-[100vh] w-[100vw] bg-cover bg-no-repeat flex justify-center">
      {isloading ? (
        <div className="flex flex-col justify-center content-center w-[100%] ml-40">
          <p className="text-black text-5xl font-nerko mb-10 ">Loading?? 🔃</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center content-center w-[100%] ml-40">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
