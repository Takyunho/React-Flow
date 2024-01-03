import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";

import { initialNodes, initialEdges, nodeInfo, cameraList, videoList, algorithmList } from "./init-data"; //@ init 데이터
import styles from "./DragAndDropNode.module.css"; //@ 스타일
import Sidebar from "../SideBar/SideBar"; //@ 사이드 바
import Modal from "../Modal/Modal"; //@ 모달창
import CameraNode from "../CustomNode/CameraNode"; //@ 카메라 노드(커스텀)
import AlgorithmNode from "../CustomNode/AlgorithmNode"; //@ 알고리즘 노드(커스텀)

//# 커스텀 노드를 여기서도 만들 수 있다!

//@ 새로운 노드를 만들 때 id에 getId 값을 지정
let id = 0;
const getId = () => `${id++}`;
let data_id = 0;
const dataId = () => `${data_id++}`;

export default function DragAndDropNode() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // 노드
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // 엣지
  const [modalToggle, setModalToggle] = useState(false);
  const [currentType, setCurrentType] = useState(""); // 현재 선택된 노드의 타입

  const [variant, setVariant] = useState("dots"); // Background variant를 보관 및 설정하는 역할 (초기값은 cross)
  const [nodeInformation, setNodeInfomation] = useState(nodeInfo); // 사이드바에서 노드들의 이름과 타입을 설정하기위한 상태

  // 클릭한 노드의 정보만을 담고 있는 객체
  const [clickedNode, setClickedNode] = useState(null);

  // 카메라
  const [camera, setCamera] = useState(cameraList);
  const [cameraSelected, setCameraSelected] = useState(undefined); // camera select
  const [video, setVideo] = useState(videoList);
  const [videoSelected, setVideoSelected] = useState(undefined); // camera select

  // 알고리즘
  const [algorithm, setAlgorithm] = useState(algorithmList);
  const [algorithmSelected, setAlgorithmSelected] = useState(undefined); // algorithm select

  //@ 커스텀 노드 등록
  const nodeTypes = useMemo(
    () => ({
      camera: CameraNode,
      algorithm: AlgorithmNode,
    }),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // * 노드들의 컬러를 지정하는 함수
  const nodeColor = (type) => {
    switch (type) {
      case "camera":
        // return "#abc4ff";
        return "#68abfe";
      case "algorithm":
        // return "#b6ccfe";
        return "#6ede87";
      case "custom":
        // return "#c1d3fe";
        return "#ff0072";
      default:
        // return "#d7e3fc";
        return "#6865A5";
    }
  };

  // * 모달창 열기
  const openModal = useCallback((event, node) => {
    console.log(node);
    // console.log(event.target);

    setClickedNode(node); // 선택한 노드의 정보만을 담고 있는 객체 설정
    setModalToggle(true); // modal 열기
    setCurrentType(node.type); // 모달창 오픈시 현재 선택된 노드의 타입 담기

    // 모달창 오픈시 데이터가 없으면 생성으로 간주해서 cameraSelected 초기화하기
    if (node.data.camera === null) {
      setCameraSelected(undefined);
    } 
    if (node.data.video === null) {
      setVideoSelected(undefined);
    }
    if (node.data.algorithm === null) {
      setAlgorithmSelected(undefined);
    }

  }, []);

  // * 모달창 닫기
  const closeModal = useCallback(() => {
    setCurrentType(""); // 초기화
    setClickedNode(null); // 초기화
    setModalToggle(false);
  }, []);

  //* 화면 로드시 백단에서 노드 + 엣지 정보 받아오기
  useEffect(() => {
    //TODO: api를 이용해 서버에서 노드 + 엣지 정보 받아오기 필요
  }, []);

  // * 저장하기 버튼 클릭시 노드 + 엣지 백단으로 보내야 함
  const setNode = useCallback(() => {
    console.log(nodes);
    console.log(edges);
    //TODO: api를 이용해 서버로 보내기 필요
  });

  // * 드래그 중
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // * 드롭
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // SideBar.jsx에서 설정한 nodeType을 가져옴
      const type = event.dataTransfer.getData("application/reactflow");
      console.log("현재 Type : ", type);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // console.log(reactFlowInstance);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 75,
        y: event.clientY,
      });

      // 각각의 노드마다 따로 내용 추가
      switch (type) {
        case "camera":
          const newCameraNode = {
            id: getId(),
            type,
            position,
            data: { id: dataId(), camera: null, video: null },
            style: {
              backgroundColor: `${nodeColor(type)}`,
              color: "white",
              border: `1px solid ${nodeColor(type)}`,
            },
          };
          setNodes((nds) => nds.concat(newCameraNode));
          return;

        case "algorithm":
          const newAlgorithmNode = {
            id: getId(),
            type,
            position,
            data: { id: dataId(), algorithm: null },
            style: {
              backgroundColor: `${nodeColor(type)}`,
              color: "white",
              border: `1px solid ${nodeColor(type)}`,
            },
          };
          setNodes((nds) => nds.concat(newAlgorithmNode));
          return;

        case "custom":
          break;
        default:
          console.log("default");
          break;
      }
    },
    [reactFlowInstance]
  );

  // * 노드 업데이트하기 (모달창에서 설정 한 후에)
  const handleUpdate = (newNode) => {
    console.log("기존 노드 ", nodes); // 기존 노드
    console.log("새로 받아온 노드 ", newNode); // 새로받아온 노드

    switch (currentType) {
      case "camera":
        setNodes(
          nodes.map((node) => {
            const newCameraNodes = {
              ...node,
              data: {
                ...node.data,
                camera: newNode.camera,
                video: newNode.video,
              },
            };
            return node.id === newNode.id ? newCameraNodes : node;
          })
        );
        break;

      case "algorithm":
        setNodes(
          nodes.map((node) => {
            const newAlgorithmNode = {
              ...node,
              data: {
                ...node.data,
                algorithm: newNode.algorithm,
              },
            };
            return node.id === newNode.id ? newAlgorithmNode : node;
          })
        );
        break;

      default:
        console.log("default");
        break;
    }
    console.log(nodes);
    closeModal();
  };

  // * 렌더링
  return (
    <div className={styles.flow}>
      {modalToggle && (
        <Modal
          closeModal={closeModal}
          currentType={currentType}
          handleUpdate={handleUpdate}
          clickedNode={clickedNode}
          camera={camera}
          cameraSelected={cameraSelected}
          setCameraSelected={setCameraSelected}
          video={video}
          videoSelected={videoSelected}
          setVideoSelected={setVideoSelected}
          algorithm={algorithm}
          algorithmSelected={algorithmSelected}
          setAlgorithmSelected={setAlgorithmSelected}
        ></Modal>
      )}

      <ReactFlowProvider>
        <Sidebar
          nodes={nodes}
          edges={edges}
          nodeInformation={nodeInformation}
        />
        <div className={styles.reactflow_wrapper} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes} // 사용자 정의 노드를 사용
            onNodeDoubleClick={openModal} // 더블 클릭시 모달창 띄우기
            // fitView
            style={{ backgroundColor: "#edf2fb" }}
          >
            <Panel>
              <button
                className={styles.bg_btn}
                onClick={() => setVariant("dots")}
              >
                dots
              </button>
              <button
                className={styles.bg_btn}
                onClick={() => setVariant("lines")}
              >
                lines
              </button>
              <button
                className={styles.bg_btn}
                onClick={() => setVariant("cross")}
              >
                cross
              </button>
              <button className={styles.bg_btn} onClick={setNode}>
                저장하기!
              </button>
            </Panel>
            <Background
              color="#ccc"
              variant={variant}
              gap={30}
              size={variant === "cross" ? 10 : 3}
            />
            <Controls />
            {/* <MiniMap nodeColor={nodeColor} /> */}
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
