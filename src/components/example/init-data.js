export const initialNodes = [
  // {
  //   id: "1",
  //   type: "input",
  //   data: { label: "input node" },
  //   position: { x: 250, y: 5 },
  // },
];

export const initialEdges = [
  
]

//! 사이드바 노드정보
export const nodeInfo = [
  {
    id: "0",
    name: "카메라",
    type: "camera",    //^ type과 useMemo시에 등록한 키값이랑 일치해야 경고창이 안뜸
    style: "camera_node",
  },
  {
    id: "1",
    name: "알고리즘",
    type: "algorithm",
    style: "algorithm_node",
  },
  {
    id: "2",
    name: "사용자 정의",
    type: "custom",
    style: "custom_node",
  },
  // {
  //   id: "4",
  //   name: "출력 노드",
  //   type: "output",
  //   style: "output_node",
  // },
  // {
  //   id: "5",
  //   name: "모달창 노드",
  //   type: "customnode", // 아래에서 만든 커스텀 노드 타입
  //   style: "custom_node",
  // },
];
