import React, { useCallback, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import CameraView from "./ModalContent/CameraView.jsx";
import AlgorithmView from "./ModalContent/AlgorithmView.jsx";

const cameraList = [
  {
    id: "0",
    name: "camera02_1-1",
  },
  {
    id: "1",
    name: "camera02_1-2",
  },
  {
    id: "2",
    name: "camera02_1-3",
  },
];

const videoList = [
  {
    id: "0",
    src: "video01 주소",
  },
  {
    id: "1",
    src: "video02 주소",
  },
  {
    id: "2",
    src: "video03 주소",
  },
];

const algorithmList = [
  {
    id: "0",
    name: "알고리즘01",
  },
  {
    id: "1",
    name: "알고리즘02",
  },
  {
    id: "2",
    name: "알고리즘03",
  },
]

export default function Modal({
  modalToggle,
  closeModal,
  handleUpdate,
  currentType,
  clickedNode,
}) {
  // 카메라
  const [camera, setCamera] = useState(cameraList);
  const [cameraSelected, setCameraSelected] = useState(camera[0].name); // camera select
  const [video, setVideo] = useState(videoList);
  const [videoSelected, setVideoSelected] = useState(video[0].src); // camera select

  // 알고리즘
  const [algorithm, setAlgorithm] = useState(algorithmList);
  const [algorithmSelected, setAlgorithmSelected] = useState(algorithm[0].name); // algorithm select

  // useEffect(() => {
  //   console.log(currentType);
  //   console.log(cameraSelected);
  //   console.log(videoSelected);
  //   console.log(clickedNode);

  //   return () => {
  //     console.log("clean up");
  //   };
  // }, [cameraSelected, videoSelected]);

  // 카메라 및 비디오 선택
  const handleChangeCamera = (event) => setCameraSelected(event.target.value);
  const handleChangeVideo = (event) => setVideoSelected(event.target.value);
  const handleChangeAlgorithm = (event) =>
    setAlgorithmSelected(event.target.value);

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
        const newCameraNode = {
          id: clickedNode.id,
          camera: cameraSelected,
          video: videoSelected,
        };

        handleUpdate(newCameraNode);
        break;
      case "algorithm":
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
          <CameraView
            styles={styles}
            camera={camera}
            handleChangeCamera={handleChangeCamera}
            cameraSelected={cameraSelected}
            video={video}
            handleChangeVideo={handleChangeVideo}
            videoSelected={videoSelected}
            closeModal={closeModal}
            setNodeAndEdge={setNodeAndEdge}
          ></CameraView>
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
            handleChangeAlgorithm={handleChangeAlgorithm}
            algorithmSelected={algorithmSelected}
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
