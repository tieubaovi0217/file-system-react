// import { useState } from 'react';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

const TreeView = ({ treeData, onSelect, selectedKeys }) => {
  // const initialExpandedKeys = path
  //   .split('/')
  //   .slice(1)
  //   .reduce((result, value) => {
  //     const key =
  //       result.length > 0
  //         ? `${result[result.length - 1]}/${value}`
  //         : `/${value}`;
  //     result.push(key);
  //     return result;
  //   }, []);
  // const [expandedKeys, setExpandedKeys] = useState(initialExpandedKeys);

  // const [autoExpandParent, setAutoExpandParent] = useState(true);

  // const handleSelect = (selectedKeys, e) => {
  //   console.log(selectedKeys);
  //   // console.log(e);
  //   const { type } = e.node;
  //   if (type === 'directory') {
  //     onSelect(selectedKeys[0]);
  //   }
  // };

  // console.log(expandedKeys);

  // const handleExpand = (expandedKeysValue) => {
  //   setAutoExpandParent(false);
  //   setExpandedKeys(expandedKeysValue);
  // };

  const handleSelect = (selectedKeysValue, info) => {
    if (info.node.type === 'directory') {
      onSelect(selectedKeysValue[0]);
    }
  };

  return (
    <DirectoryTree
      expandAction="doubleClick"
      className="directory-tree"
      treeData={treeData}
      selectedKeys={selectedKeys}
      onSelect={handleSelect}
    />
  );
};

export default TreeView;
