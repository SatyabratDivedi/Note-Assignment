import React from "react";
import style from "./Slider.module.css";

function Slider({setOperWraper}) {
  const addNoteHandler=(e)=>{
    e.stopPropagation();
    setOperWraper(true);
  }
  return (
    <>
      <div className={style.slider}>
        <div className={style.noteHeader}>Pocket Notes</div>
        <div className={style.nameArea}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
            className={style.nameBox}
          >
            <div className={style.groupSortName} style={{ background: "black" }}>
              MN
            </div>
            <div className={style.groupName}>My Notes</div>
          </div>
        </div>
        <div onClick={addNoteHandler} style={{ background: "#16008B" }} className={style.addNots}>
          +
        </div>
      </div>
    </>
  );
}

export default Slider;
