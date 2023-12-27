import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./CameraNode.css";

export default function CameraNode({ id, data }) {
  console.log(id)
  console.log(data)
  // console.log(isConnectable); // 여러개의 노드를 연결할 때 사용하는 듯 (공식문서 참조)
  // const onChange = useCallback((evt) => {
  //   console.log("사용자정의노드", evt.target.value);
  // }, []);

  return (
    <div className="camera-custom-node">
      {/* Handle이 점을 나타냄 (이건 맨 위에 연결점) */}
      <Handle
        type="target"
        position={Position.Top}
        // isConnectable={isConnectable}
      />
      <div>
        <p>
          카메라 : <span>{data.camera}</span>
        </p>
        <p>
          비디오 : <span>{data.video}</span>
        </p>
        {/* <p>내용 3</p> */}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        // id="b"
        // isConnectable={isConnectable}
      />
    </div>
  );
}


// position.Top, Bottom 으로 점의 위치 조정 가능
