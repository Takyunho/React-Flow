import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./text-updater-node.css";

function TextUpdaterNode({ data }) {
  console.log(data)
  // console.log(isConnectable); // 여러개의 노드를 연결할 때 사용하는 듯 (공식문서 참조)
  // const onChange = useCallback((evt) => {
  //   console.log("사용자정의노드", evt.target.value);
  // }, []);

  return (
    <div className="text-updater-node">
      {/* Handle이 점을 나타냄 (이건 맨 위에 연결점) */}
      <Handle
        type="target"
        position={Position.Top}
        // isConnectable={isConnectable}
      />
      <div>
        <p>내용 1</p>
        <p>내용 2</p>
        <p>내용 3</p>
      </div>
      {/* 이건 맨 오른쪽 점 /  */}
      <Handle
        type="source"
        position={Position.Bottom}
        // id="b"
        // isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;

// position.Top, Bottom 으로 점의 위치 조정 가능
