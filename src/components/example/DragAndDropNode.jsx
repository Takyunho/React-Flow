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
//@ 스타일
import styles from "./DragAndDropNode.module.css";
//@ 사이드 바
import Sidebar from "../SideBar/SideBar";
//@ 모달창
import Modal from "../Modal/Modal";
//@ 사용자 정의 노드
import TextUpdaterNode from "../CustomNode/TextUpdaterNode";
//@ init 데이터
import { initialNodes, nodeInfo } from "./init-data";


//# 커스텀 노드를 여기서도 만들 수 있다!
//# 첫번째 인자는 노드의 정보를 담고있는 객체
const CustomNode = (data) => {
  console.log(data)
  
  return (
    <div style={{ width: "120px", height: "150px" }}>
      <Handle type="target" position={Position.Left}></Handle>
      <div>테스트</div>
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
};

const nodeTypes = {
  custom: TextUpdaterNode,
  customnode: CustomNode,
};

//@ 새로운 노드를 만들 때 id에 getId 값을 지정
let id = 0;
const getId = () => `${id++}`;

export default function DragAndDropNode() {
  const reactFlowWrapper = useRef(null); 
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // 노드
  const [edges, setEdges, onEdgesChange] = useEdgesState([]); // 엣지
  const [modalToggle, setModalToggle] = useState(false);

  // const nodeTypes = useMemo(
  //   () => ({ custom: TextUpdaterNode, customnode: CustomNode }),
  //   []
  // ); //@ 사용자 정의 노드 등록

  const [variant, setVariant] = useState("cross"); // Background variant를 보관 및 설정하는 역할 (초기값은 cross)
  const [nodeInformation, setNodeInfomation] = useState(nodeInfo); // 사이드바에서 노드들의 이름과 타입을 설정하기위한 상태

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // * 노드들의 컬러를 지정하는 함수
  const nodeColor = (type) => {
    switch (type) {
      case "input":
        return "#68abfe";
      case "default":
        return "#6ede87";
      case "output":
        return "#ff0072";
      default:
        return "#6865A5";
    }
  };

  // * 모달창 열기
  const openModal = useCallback((event, node) => {
    console.log(node);
    console.log(event.target);
    // modal 열기
    setModalToggle(true);
  }, []);

  // * 모달창 닫기
  const closeModal = useCallback(() => {
    setModalToggle(false);
  }, []);

  useEffect(() => {
    console.log(nodes);
    console.log(edges);
    // setNodeList(nodes);
    // setEdgeList(edges);
  }, [nodes, edges]);

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
      console.log(type);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      // console.log(reactFlowInstance);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - 75,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
        style: {
          backgroundColor: `${nodeColor(type)}`,
          color: "white",
          border: `1px solid ${nodeColor(type)}`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // * 렌더링
  return (
    <div className={styles.flow}>
      {modalToggle && (
        <Modal modalToggle={modalToggle} closeModal={closeModal}></Modal>
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
