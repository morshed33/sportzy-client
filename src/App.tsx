import { FC } from "react";
import { Button } from "./components/ui/button";

const App: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-4xl">WELCOME TO THE SPORTZY</p>
        <Button>Click ME</Button>
      </div>
    </>
  );
};

export default App;
