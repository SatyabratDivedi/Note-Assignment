import React, { useEffect, useRef } from "react";
import style from "./AddNoteWraper.module.css";

function AddNoteWraper({ setOperWraper, operWraper }) {
  const outClick = useRef();

window.addEventListener('click', (e)=>{
  setOperWraper(false);
})

  const inClickHandler = (e) => {
    setOperWraper(true);
    e.stopPropagation();
  };
  return (
    <>
      <div className={style.addNoteWraper}>
        <div onClick={inClickHandler} style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "5px" }} className="addGroupName">
          <div>Create New group</div>
          <label>Group Name</label>
          <input type="text" placeholder="Enter group name" />
          <label> Choose any color</label>
        </div>
      </div>
    </>
  );
}

export default AddNoteWraper;
