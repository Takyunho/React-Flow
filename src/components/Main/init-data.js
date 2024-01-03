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

export const cameraList = [
  {
    id: "0",
    label: "camera02_1-1", // react Select 라이브러리에서 사용하기 위해 label과 value로 나누기
    value: "camera02_1-1", // label은 select에서 보여질 값, value는 사용될 값
  },
  {
    id: "1",
    label: "camera02_1-2",
    value: "camera02_1-2",
  },
  {
    id: "2",
    label: "camera02_1-3",
    value: "camera02_1-3",
  },
];

export const videoList = [
  {
    id: "0",
    label: "video01 주소",
    value: "video01 주소",
  },
  {
    id: "1",
    label: "video02 주소",
    value: "video02 주소",
  },
  {
    id: "2",
    label: "video03 주소",
    value: "video03 주소",
  },
];

export const algorithmList = [
  {
    id: "0",
    label: "알고리즘01",
    value: "알고리즘01",
  },
  {
    id: "1",
    label: "알고리즘02",
    value: "알고리즘02",
  },
  {
    id: "2",
    label: "알고리즘03",
    value: "알고리즘03",
  },
];