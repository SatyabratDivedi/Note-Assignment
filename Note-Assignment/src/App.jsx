import React, {useEffect, useState} from "react";
import Slider from "./components/Slider";
import AddNoteWraper from "./components/AddNoteWraper";
import {Outlet, useLocation} from "react-router-dom";
import NoteArea from "./components/NoteArea.jsx";

function App() {
  const [operWraper, setOperWraper] = useState(false);
  const [showStartingPage, setShowStartingPage] = useState(true);
  const match = useLocation();
  useEffect(() => {
    if (match.pathname == "/") {
      setShowStartingPage(true);
    } else {
      setShowStartingPage(false);
    }
  }, [match.pathname]);
  return (
    <>
      <div>
        <div>
          <Slider setOperWraper={setOperWraper} />
          <div className=" notesArea">
            {showStartingPage && <NoteArea />}
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
