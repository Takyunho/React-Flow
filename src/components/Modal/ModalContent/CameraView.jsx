import React, { useEffect, useMemo, useState } from "react";
// import styles from "../Modal.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { MdOutlineCamera } from "react-icons/md";
import { MdOutlineVideoCall } from "react-icons/md";
import { click } from "@testing-library/user-event/dist/click";

const animatedComponents = makeAnimated();

//# 모달창 안에서 카메라와 비디오를 select할 수 있는 폼
export default function CameraView({
  styles,
  camera,
  video,
  cameraSelected,
  setCameraSelected,
  videoSelected,
  handleChangeCamera,
  handleChangeVideo,
  closeModal,
  setNodeAndEdge,
  clickedNode,
}) {
  console.log("클릭한 노드! ", clickedNode);
  console.log("카메라 리스트!", camera)
  console.log("선택한 카메라!", cameraSelected);
  
  // * 처음 선택하는 경우와 업데이트하는 경우를 나눠서 처리
  const filterCamera = () => {
    if (clickedNode.data.camera === null) {
      console.log("처음");
      return cameraSelected
    } else {
      console.log("업데이트");
      return clickedNode.data.camera;
    }
  }

  const filterVideo = () => {
    if (clickedNode.data.video === null) {
      console.log("처음");
      return videoSelected
    } else {
      console.log("업데이트")
      return clickedNode.data.video;
    }
  }



  return (
    <>
      <div className={styles.select_wrap}>
        <div className={styles.flex_center}>
          <MdOutlineCamera className={styles.icon} />
          <p>카메라 선택</p>
        </div>
        <Select
          components={animatedComponents}
          value={filterCamera()}
          options={camera}
          onChange={handleChangeCamera}
        />
      </div>
      <div className={styles.select_wrap}>
        <div className={styles.flex_center}>
          <MdOutlineVideoCall className={styles.icon} />
          <p>비디오 주소 입력</p>
        </div>
        <Select
          components={animatedComponents}
          // value={video.filter((obj) => obj.value === videoSelected)}
          value={filterVideo()}
          options={video}
          onChange={handleChangeVideo}
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

// 일반 select form
{
  /* <select onChange={handleChangeVideo} value={videoSelected}>
  {video.map((video) => {
    return (
      <option key={video.id} value={video.src}>
        {video.src}
      </option>
    );
  })}
</select>; */
}
