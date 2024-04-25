import React from 'react';
import style from './Slider.module.css';
import { NavLink } from 'react-router-dom';
import { RxCross1 } from 'react-icons/rx';
import { MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { openHandler } from '../reduxStore/slice';

function Slider({ setOperWraper }) {
  const dispatch = useDispatch();
  const recieveIsOpen = useSelector((state) => state.open.isOpen);
  const addNoteHandler = (e) => {
    e.stopPropagation();
    setOperWraper(true);
  };
  const crossClick = () => {
    dispatch(openHandler(false));
  };

  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('data'));

  return (
    <>
      {recieveIsOpen && (
        <div>
          <div className={style.slider}>
            <div onClick={crossClick} className={style.crossBTN}>
              <RxCross1 />
            </div>
            <div className={style.noteHeader}>Pocket Notes</div>
            <div className={style.nameArea}>
              {getDataFromLocalStorage?.map((item, index) => (
                <NavLink onClick={crossClick}  to={`${item.groupName}`} key={index} className={({ isActive }) => `${isActive && style.active} ${style.nameBox}`}>
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
          <div onClick={addNoteHandler} className={style.addGroupName}>
            <MdAdd className={style.addNots} />
          </div>
        </div>
      )}
    </>
  );
}

export default Slider;
