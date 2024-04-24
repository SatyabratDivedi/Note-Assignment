import React from 'react';
import style from './NoteTextArea.module.css';
import { useParams } from 'react-router-dom';

function NoteTextArea() {
  const params = useParams();
  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('data'));
  const mainItem = getDataFromLocalStorage.filter((item) => item.groupName === params.groupName);
  return (
    <>
      <div className={style.textAreaContainer}>
        <div className={style.headerArea}>
          <div className={style.groupSortName} style={{ background: `${mainItem[0].color}` }}>
            {mainItem[0].groupName
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </div>
          <div className={style.groupName}>{mainItem[0].groupName}</div>
        </div>
      </div>
    </>
  );
}

export default NoteTextArea;
