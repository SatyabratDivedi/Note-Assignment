import React, { useEffect, useState } from 'react';
import style from './NoteTextArea.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { FaBars } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { openHandler } from '../reduxStore/slice';

function NoteTextArea() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('data') || '[]');
  const [edit, setEdit] = useState('');
  const [data, setData] = useState(getDataFromLocalStorage || []);
  const editChangeHandler = (e) => {
    setEdit(e.target.value);
  };

  const saveClickHandler = () => {
    const updatedData = data.map((item) => {
      if (item.groupName === params.groupName) {
        const notes = Array.isArray(item.notes) ? item.notes : [];
        return { ...item, notes: [...notes, { note: edit, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() }] };
      }
      return item;
    });

    localStorage.setItem('data', JSON.stringify(updatedData));
    setData(updatedData);
    setEdit('');
  };
  const currentItem = data.find((item) => item.groupName === params.groupName) || [];

  const oneDataDelete = (index) => () => {
    const updatedData = data.map((item) => {
      if (item.groupName === params.groupName) {
        const notes = Array.isArray(item.notes) ? item.notes : [];
        notes.splice(index, 1);
        return { ...item, notes: notes };
      }
      return item;
    });
    localStorage.setItem('data', JSON.stringify(updatedData));
    setData(updatedData);
  };

  const groupDelete = (groupName) => () => {
    const updatedData = data?.filter((item) => item.groupName !== groupName);
    setData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));
    navigate('/');
    window.location.reload(true);
  };

  return (
    <>
      <div className={style.textAreaContainer}>
        <div className={style.headerArea}>
          <div onClick={()=> dispatch(openHandler(true))} className={style.barBTN}>
            <FaBars />
          </div>
          <div className={style.groupSortName} style={{ background: `${currentItem?.color}` }}>
            {currentItem?.groupName
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </div>
          <div className={style.groupName}>{currentItem.groupName}</div>
          <span onClick={groupDelete(currentItem?.groupName)} className={style.headerDeleteBotton} style={{ transform: 'translateY(1px)' }}>
            <MdDelete />
          </span>
        </div>
        <div className={style.textStoreArea}>
          {currentItem.notes?.map((item, i) => (
            <div key={i} className={style.textStoreAreaBox}>
              <div>{item.note}</div>
              <div className={style.dateArea}>
                {item.date}
                <span style={{ transform: 'translateY(1px)' }}>
                  <GoDotFill />
                </span>
                {item.time}
              </div>
              <div className={style.deleteArea}>
                <span onClick={oneDataDelete(i)} style={{ transform: 'translateY(1px)' }}>
                  <MdDelete />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className={style.footerArea}>
          <input onChange={editChangeHandler} type="text" name="edit" value={edit} id="" placeholder="Enter your text here......" />
          <button onClick={saveClickHandler} disabled={edit.length === 0} className={style.sentBox}>
            <IoSend style={{ fontSize: '40px', color: edit.length > 0 ? 'black' : 'gray', cursor: edit.length > 0 ? 'pointer' : 'not-allowed' }} />
          </button>
        </div>
      </div>
    </>
  );
}

export default NoteTextArea;
