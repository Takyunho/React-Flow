import React, { useEffect } from "react";
// import styles from "../Modal.module.css";

export default function AlgorithmView({
  styles,
  algorithm,
  handleChangeAlgorithm,
  algorithmSelected,
  closeModal,
  setNodeAndEdge,
}) {
  useEffect(() => {
    console.log(algorithm);
    console.log(algorithmSelected);
  }, [algorithm, algorithmSelected]);

  return (
    <>
      <div className={styles.cameraSelect_wrap}>
        <p>알고리즘 선택</p>
        <select onChange={handleChangeAlgorithm} value={algorithmSelected}>
          {algorithm.map((item) => {
            console.log(item);
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className={styles.btn_wrap}>
        <button
          id="close-btn"
          className={styles.close_btn}
          onClick={closeModal}
        >
          닫기
        </button>
        <button className={styles.save_btn} onClick={(e) => setNodeAndEdge(e)}>
          저장
        </button>
      </div>
    </>
  );
}
