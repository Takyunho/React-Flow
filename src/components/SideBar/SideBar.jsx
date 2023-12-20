import React, { useEffect } from "react";
import styles from "./SideBar.module.css";




export default function SideBar({ nodes, edges, nodeInformation }) {
  // * 드래그 시작
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // useEffect(() => {
  //   console.log(nodes);
  //   console.log(edges);
  // }, [nodes, edges]);

  return (
    <aside>
      {nodeInformation.map((node) => {
        return (
          <div
            className={styles[node.style]}
            onDragStart={(event) => onDragStart(event, `${node.type}`)}
            draggable
            key={node.id}
          >
            {node.name}
          </div>
        );
      })}

      {/* <div
        className={styles.input_node}
        onDragStart={(event) => onDragStart(event, `${nodeText.camera}`)}
        draggable
      >
        {nodeText.camera}
      </div>
      <div
        className={styles.default_node}
        onDragStart={(event) => onDragStart(event, `${nodeText.algorithm}`)}
        draggable
      >
        {nodeText.algorithm}
      </div>
      <div
        className={styles.custom_node}
        onDragStart={(event) => onDragStart(event, "text")}
        draggable
      >
        {nodeText.custom}
      </div>
      <div
        className={styles.output_node}
        onDragStart={(event) => onDragStart(event, `${nodeText.output}`)}
        draggable
      >
        {nodeText.output}
      </div> */}
    </aside>
  );
}
