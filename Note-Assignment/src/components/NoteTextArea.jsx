import React from 'react';
import style from './NoteTextArea.module.css';
import { useParams } from 'react-router-dom';
import { GoDotFill } from 'react-icons/go';

function NoteTextArea() {
  const params = useParams();
  const getDataFromLocalStorage = JSON.parse(localStorage.getItem('data'));
  const mainItem = getDataFromLocalStorage.filter((item) => item.groupName === params.groupName);
  return (
    <>
      <div className={style.textAreaContainer}>
        {/* header */}
        <div className={style.headerArea}>
          <div className={style.groupSortName} style={{ background: `${mainItem[0].color}` }}>
            {mainItem[0].groupName
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </div>
          <div className={style.groupName}>{mainItem[0].groupName}</div>
        </div>
        {/* text area */}
        <div className={style.textStoreArea}>
          {['','','','','','',''].map(() => (
            <div className={style.textStoreAreaBox}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita similique enim sed. Quam, reprehenderit ab aliquam veritatis natus, hic ea dolore debitis ipsa voluptatem totam quae
              magnam assumenda tempora. Consectetur!
              <div className={style.dateArea}>
                {new Date().toDateString()}
                <span style={{ transform: 'translateY(1px)' }}>
                  <GoDotFill />
                </span>
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
        {/* footer Area */}

        <div className={style.footerArea}>
          <input type="text" name="" id="" placeholder="Enter your text here......" />
        </div>
      </div>
    </>
  );
}

export default NoteTextArea;
