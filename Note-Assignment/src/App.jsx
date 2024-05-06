import React, {useState} from "react";
import Slider from "./components/Slider";
import AddNoteWraper from "./components/AddNoteWraper";
import {Outlet} from "react-router-dom";

function App() {
  const [operWraper, setOperWraper] = useState(false);
  return (
    <>
      <div>
        <div>
          <Slider setOperWraper={setOperWraper} />
          <div className=" notesArea">
            <Outlet />
          </div>
        </div>
        {operWraper && (
          <div className="addNoteWraperMain">
            <AddNoteWraper operWraper={operWraper} setOperWraper={setOperWraper} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
