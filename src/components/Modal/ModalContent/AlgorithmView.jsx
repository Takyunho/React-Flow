import React, { useEffect } from "react";
// import styles from "../Modal.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function AlgorithmView({
  styles,
  algorithm,
  handleChangeAlgorithm,
  algorithmSelected,
  closeModal,
  setNodeAndEdge,
  clickedNode,
}) {

  console.log(algorithm)
  console.log(algorithmSelected)

  const filterAlgorithm = () => {
    if (clickedNode.data.algorithm === null) {
      return algorithmSelected;
    } else {
      return clickedNode.data.algorithm;
    }
  };

  return (
    <>
      <div className={styles.select_wrap}>
        <p>알고리즘 선택</p>
        <Select
          options={algorithm}
          onChange={handleChangeAlgorithm}
          isMulti
          value={filterAlgorithm}
        />
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

// 기존 select
{
  /* <select onChange={handleChangeAlgorithm} value={algorithmSelected}>
        {algorithm.map((item) => {
          console.log(item);
          return (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          );
        })}
      </select> */
}
