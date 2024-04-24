import React from 'react';
import style from './Slider.module.css';
import { NavLink } from 'react-router-dom';

function Slider({ setOperWraper }) {
  const addNoteHandler = (e) => {
    e.stopPropagation();
    setOperWraper(true);
  };
  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('data'));
  return (
    <>
      <div className={style.slider}>
        <div className={style.noteHeader}>Pocket Notes</div>
        <div className={style.nameArea}>
          {getDataFromLocalStorage?.map((item, index) => (
            <NavLink to={`${item.groupName}`} key={index} className={({ isActive }) => `${isActive && style.active} ${style.nameBox}`}>
              <div className={style.groupSortName} style={{ background: `${item.color}` }}>
                {item.groupName
                  .split(' ')
                  .map((word) => word[0].toUpperCase())
                  .join('')}
              </div>
              <div className={style.groupName}>{item.groupName}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <div onClick={addNoteHandler} style={{ background: '#16008B' }} className={style.addNots}>
        +
      </div>
    </>
  );
}

export default Slider;
