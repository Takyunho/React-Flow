import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./AlgorithmNode.css";

export default function AlgorithmNode({ id, data }) {
  console.log(id);
  console.log(data);

  return (
    <div className="camera-custom-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>
          알고리즘 : <span>{data.algorithm}</span>
        </p>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        // id="b"
      />
    </div>
  );
}

// position.Top, Bottom 으로 점의 위치 조정 가능
