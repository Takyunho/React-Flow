import React, { useCallback } from 'react';
import styles from './Modal.module.css'

export default function Modal({ modalToggle, closeModal }) {
  
  const onChange = useCallback((evt) => {
    console.log("사용자정의노드", evt.target.value);
  }, []);

  return (
    <div className={styles.black_background}>
      <div className={styles.white_background}>
        {/* 내용 */}
        {/* //*  각각의 노드마다 다른 내용을 보여줘야 하는데............. */}
        {/* <div className="updatenode__controls">
          <label>label:</label>
          <input
            value={nodeName}
            onChange={(evt) => setNodeName(evt.target.value)}
          />

          <label className="updatenode__bglabel">background:</label>
          <input
            value={nodeBg}
            onChange={(evt) => setNodeBg(evt.target.value)}
          />
        </div> */}
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />

        {/* 닫기 버튼 */}
        <button id="close-btn" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}

