import React, { useState } from "react";
import Slider from "./components/Slider";
import NoteArea from "./components/NoteArea";
import AddNoteWraper from "./components/AddNoteWraper";

function App() {
  const [operWraper, setOperWraper] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }} className="frontAddPage">
        <div className="backgroundPage">
          <Slider setOperWraper={setOperWraper} />
          <div className=" notesArea">
            <NoteArea />
          </div>
        </div>
        {operWraper && (
          <div className="addNoteWraper">
            <AddNoteWraper operWraper={operWraper} setOperWraper={setOperWraper} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
