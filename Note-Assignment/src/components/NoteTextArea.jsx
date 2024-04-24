import React, { useState } from 'react';
import style from './NoteTextArea.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

function NoteTextArea() {
  const params = useParams();
  const navigate = useNavigate();
  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('data')) || [];
  const mainItem = getDataFromLocalStorage.filter((item) => item.groupName === params.groupName) || [];
  const [edit, setEdit] = useState('');
  const [data, setData] = useState(getDataFromLocalStorage || []);
  const editChangeHandler = (e) => {
    setEdit(e.target.value);
  };

  const saveClickHandler = () => {
    // Map over the data from local storage
    const updatedData = data.map((item) => {
      // If the groupName of the current item matches params.groupName...
      if (item.groupName === params.groupName) {
        // Ensure item.notes is an array before trying to spread it
        const notes = Array.isArray(item.notes) ? item.notes : [];

        // Return a new object that has all the properties of the current item,
        // but with the notes array updated to include the edit value
        return { ...item, notes: [...notes, { note: edit, date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString() }] };
      }

      // If the groupName doesn't match, return the item as is
      return item;
    });

      // If no item with a matching groupName was found, add a new item with an empty notes array
  if (!updatedData.find(item => item.groupName === params.groupName)) {
    updatedData.push({ groupName: params.groupName, notes: [] });
  }

    // Save the updated data back to local storage
    localStorage.setItem('data', JSON.stringify(updatedData));

    // Update the state
    setData(updatedData);

    // Clear the edit state
    setEdit('');
  };

  // In your render method:
const currentItem = data.find(item => item.groupName === params.groupName);

  const oneDataDelete = (index) => () => {
    const updatedData = data.map((item) => {
      if (item?.groupName === params.groupName) {
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
    localStorage.setItem('data', JSON.stringify(updatedData));
    setData(updatedData);
    navigate('/')

  };

  return (
    <>
      <div className={style.textAreaContainer}>
        {/* header */}
        <div className={style.headerArea}>
          <div className={style.groupSortName} style={{ background: `${data[0]?.color}` }}>
            {currentItem?.groupName
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </div>
          <div className={style.groupName}>{currentItem?.groupName}</div>
          <span onClick={groupDelete(data[0]?.groupName)} className={style.headerDeleteBotton} style={{ transform: 'translateY(1px)' }}>
            <MdDelete />
          </span>
        </div>
        {/* text area */}
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
        {/* footer Area */}

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
