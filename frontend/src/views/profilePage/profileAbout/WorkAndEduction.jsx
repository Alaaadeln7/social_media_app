import { PlusCircle } from "lucide-react";
import { useState } from "react";
import WorkForm from "./WorkForm";

export default function WorkAndEduction() {
  const [toggle, setToggle] = useState(false);
  // console.log(toggle);
  return (
    <div className="p-10 flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <h1 className="text-1xl text-primary">Work</h1>
        {toggle ? (
          <button
            onClick={() => setToggle(!toggle)}
            className="flex gap-2 hover:text-primary transition-colors"
          >
            <PlusCircle />
            <p>add work space</p>
          </button>
        ) : (
          <WorkForm setToggle={setToggle} toggle={toggle} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-1xl text-primary">faculty</h1>
        <button className="flex gap-2 hover:text-primary transition-colors">
          <PlusCircle />
          <p>add faculty</p>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-1xl text-primary">Secondary school</h1>
        <button className="flex gap-2 hover:text-primary transition-colors">
          <PlusCircle />
          <p>Secondary school</p>
        </button>
      </div>
    </div>
  );
}
