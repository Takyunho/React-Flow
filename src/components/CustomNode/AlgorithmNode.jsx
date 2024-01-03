import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import "./AlgorithmNode.css";

export default function AlgorithmNode({ id, data }) {
  console.log(id);
  console.log(data);

  return (
    <div className="algorithm-custom-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <p>
          선택된 알고리즘 :
          <span>
            {data.algorithm && data.algorithm.map((algorithm) => {
                  return algorithm.label + ", ";
                })}
          </span>
          {/* <span>
            {data.algorithm === ""
              ? data.algorithm
              : data.algorithm.map((algorithm) => {
                  return algorithm.label + ", ";
                })}
          </span> */}
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
