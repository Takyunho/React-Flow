import React, { useCallback, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import CameraView from "./ModalContent/CameraView.jsx";
import AlgorithmView from "./ModalContent/AlgorithmView.jsx";
import { click } from "@testing-library/user-event/dist/click.js";



export default function Modal({
  closeModal,
  handleUpdate,
  currentType,
  clickedNode,
  camera,
  cameraSelected,
  setCameraSelected,
  video,
  videoSelected,
  setVideoSelected,
  algorithm,
  algorithmSelected,
  setAlgorithmSelected,
}) {
  // useEffect(() => {
  //   console.log(currentType);
  //   console.log(cameraSelected);
  //   console.log(videoSelected);
  //   console.log(clickedNode);

  //   return () => {
  //     console.log("clean up");
  //   };
  // }, [cameraSelected, videoSelected]);

  const handleChangeCamera = (event) => {
    console.log(event); // react select에서 event값은 target을 지정해줄 필요가 없다.
    setCameraSelected(event);
  };
  const handleChangeVideo = (event) => {
    console.log(event);
    setVideoSelected(event);
  };
  const handleChangeAlgorithm = (event) => {
    console.log(event);
    setAlgorithmSelected(event);
  };


  const setNodeAndEdge = (e) => {
    console.log("저장");
    console.log(cameraSelected);
    console.log(videoSelected);
    console.log(algorithmSelected);
    console.log(e);
    console.log(currentType);

    // switch -> camera / algorithm

    switch (currentType) {
      case "camera":
        if (cameraSelected === undefined) {
          alert("카메라를 선택해주세요");
          return;
        }
        if (videoSelected === undefined) {
          alert("비디오를 선택해주세요");
          return;
        }

        const newCameraNode = {
          id: clickedNode.id,
          camera: cameraSelected,
          video: videoSelected,
        };

        handleUpdate(newCameraNode);
        break;
      case "algorithm":
        if (algorithmSelected === undefined) {
          alert("적어도 하나 이상의 알고리즘을 선택해주세요");
          return;
        }

        const newAlgorithmNode = {
          id: clickedNode.id,
          algorithm: algorithmSelected,
        };

        handleUpdate(newAlgorithmNode);
        break;
      default:
        console.log("default");
        break;
    }
  };

  const onChange = useCallback((evt) => {
    console.log("사용자정의노드", evt.target.value);
  }, []);

  // * 렌더링
  if (currentType === "camera") {
    return (
      <div className={styles.black_background}>
        <div className={styles.white_background}>
          {clickedNode.id && (
            <CameraView
              styles={styles}
              camera={camera}
              handleChangeCamera={handleChangeCamera}
              cameraSelected={cameraSelected}
              setCameraSelected={setCameraSelected}
              video={video}
              handleChangeVideo={handleChangeVideo}
              videoSelected={videoSelected}
              closeModal={closeModal}
              setNodeAndEdge={setNodeAndEdge}
              clickedNode={clickedNode}
            ></CameraView>
          )}
        </div>
      </div>
    );
  } else if (currentType === "algorithm") {
    return (
      <div className={styles.black_background}>
        <div className={styles.white_background}>
          <AlgorithmView
            styles={styles}
            algorithm={algorithm}
            algorithmSelected={algorithmSelected}
            clickedNode={clickedNode}
            handleChangeAlgorithm={handleChangeAlgorithm}
            closeModal={closeModal}
            setNodeAndEdge={setNodeAndEdge}
          ></AlgorithmView>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.black_background}>
      <div className={styles.white_background}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />

        <button id="close-btn" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
}
