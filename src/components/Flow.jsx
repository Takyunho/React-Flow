import React, { useCallback, useEffect, useState, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import TextUpdaterNode from "./CustomNode/TextUpdaterNode"; // 사용자 정의 노드
import "./text-updater-node.css";

import SideBar from "./SideBar/SideBar";
import Modal from "./Modal/Modal";


const rfStyle = {
  backgroundColor: "#B8CEFF",
};

// 노드들
const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 }, // 배치되는 위치
    data: { label: "1번 텍스트" }, // 상자 안에 들어갈 내용
    type: "input",
    style: { backgroundColor: "#6ede87", color: "white" }, // 스타일을 줄 수 있다.
  },
  {
    id: "2",
    position: { x: 300, y: 300 },
    // data: { label: "2번 텍스트" },
    type: "textUpdater",  //! 사용자 정의 노드에서 모달창에서 입력한 값들을 넣어야 함
    // style: { backgroundColor: "#ff0072", color: "white" },
  },
  {
    id: "3",
    position: { x: 200, y: 500 },
    data: { label: "3번 텍스트" },
    type: "output",
    style: { backgroundColor: "lightblue", color: "white" },
  },
];

// 엣지들
const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

const nodeColor = (node) => {
  switch (node.type) {
    case "input":
      return "#6ede87";
    case "output":
      return "#6865A5";
    default:
      return "#ff0072";
  }
};

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []); // 사용자 정의 노드 등록
  const [variant, setVariant] = useState("cross"); // Background variant를 보관 및 설정하는 역할
  const [modalToggle, setModalToggle] = useState(false);

  //@ onConnect는 노드를 수동으로 연결할 때 사용하는 함수 (addEdge를 import 해와야 한다.)
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const openModal = useCallback((event, node) => {
    console.log(node);
    console.log(event);
    // modal 열기
    setModalToggle(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalToggle(false);
  }, []);

  useEffect(() => {
    console.log(nodes);
    console.log(edges);
  }, [nodes, edges]);

  return (
    <div style={{ width: "100%", height: "90vh", display: "flex" }}>


      {modalToggle && (
        <Modal modalToggle={modalToggle} closeModal={closeModal}></Modal>
      )}
      <div style={{ width: "20%" }}>
        <SideBar></SideBar>
      </div>
      <div style={{ width: "80%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes} // 사용자 정의 노드를 사용
          // style={rfStyle} // 배경바꾸기
          onNodeDoubleClick={openModal}
        >
          <Panel>
            <div>variant:</div>
            <button onClick={() => setVariant("dots")}>dots</button>
            <button onClick={() => setVariant("lines")}>lines</button>
            <button onClick={() => setVariant("cross")}>cross</button>
          </Panel>
          {/* <Background variant="dots" gap={30} size={1} /> */}
          <Background
            color="#ccc"
            variant={variant}
            gap={30}
            size={variant === "cross" ? 10 : 3}
          />
          <Controls />
          <MiniMap nodeColor={nodeColor} />
        </ReactFlow>
        <button>Save</button>
      </div>

      
    </div>
  );
}

// Background variant는 dots, lins, cross 가 있다.
