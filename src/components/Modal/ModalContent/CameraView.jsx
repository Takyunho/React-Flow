import React from "react";
// import styles from "../Modal.module.css";

export default function CameraView({
  styles,
  handleChangeCamera,
  handleChangeVideo,
  camera,
  video,
  cameraSelected,
  videoSelected,
  closeModal,
  setNodeAndEdge,
}) {
  return (
    <>
      <div className={styles.cameraSelect_wrap}>
        <p>카메라 선택</p>
        <select
          onChange={handleChangeCamera}
          value={cameraSelected}
        >
          {camera.map((cam) => {
            return (
              <option key={cam.id} value={cam.name}>
                {cam.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.video_wrap}>
        <p>비디오 주소 입력</p>
        <select onChange={handleChangeVideo} value={videoSelected}>
          {video.map((video) => {
            return (
              <option key={video.id} value={video.src}>
                {video.src}
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
