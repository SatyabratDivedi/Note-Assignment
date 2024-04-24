import React, { useEffect, useState } from 'react';
import style from './AddNoteWraper.module.css';
const colors = [{ color: '#b38bfa' }, { color: '#ff79f2' }, { color: '#43e6fc' }, { color: '#f19576' }, { color: '#0047ff' }, { color: '#6691ff' }];

function AddNoteWraper({ setOperWraper }) {
  const [edit, setEdit] = useState({ groupName: '', color: '' });

  const changeHandler = (e) => {
    setEdit((prevEdit) => ({ ...prevEdit, groupName: e.target.value }));
  };

  const colorclkHandler = (color) => {
    setEdit((prevEdit) => ({ ...prevEdit, color: color }));
  };

  const createHandler = (e) => {
    if (edit.groupName === '' || edit.color === '') {
      return alert('Please fill the group name and color');
    }
    const existingData = JSON.parse(localStorage.getItem('data')) || [];
    const newData = [...existingData, edit];
    localStorage.setItem('data', JSON.stringify(newData));
    setOperWraper(false);
  };

  useEffect(() => {
    const windowClickHandler = (e) => {
      setOperWraper(false);
    };
    window.addEventListener('click', windowClickHandler);
  }, []);

  const inClickHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={style.addNoteWraper}>
        <div onClick={inClickHandler} className={style.mainBox}>
          <div style={{ fontSize: '2.5rem', fontWeight: '500' }}>Create New group</div>
          <label className={style.groupInp}>
            Group Name
            <input onChange={(e) => changeHandler(e)} name="edit" value={edit.groupName} type="text" placeholder="Enter group name" autoFocus />
          </label>
          <div className={style.colorBox}>
            <div>Choose Color</div>
            {colors.map((color, index) => (
              <div key={index}>
                <div onClick={() => colorclkHandler(color.color)} style={{ background: color.color }} className={style.colorCircle}></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <button
              onClick={(e) => createHandler(e)}
              style={{ cursor: 'pointer', fontSize: '2rem', width: '14rem', background: '#001F8B', color: 'white', padding: '7px', border: 'none', borderRadius: '9px' }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNoteWraper;
