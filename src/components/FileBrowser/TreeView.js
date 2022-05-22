import { useEffect } from 'react';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;

const TreeView = ({
  treeData,
  selectedKeys,
  expandedKeys,
  onSelect,
  onExpand,
  onSelectDrive,
}) => {
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
  // const [expandedKeys, setExpandedKeys] = useState([]);

  // const handleSelect = (selectedKeys, e) => {
  //   console.log(selectedKeys);
  //   // console.log(e);
  //   const { type } = e.node;
  //   if (type === 'directory') {
  //     onSelect(selectedKeys[0]);
  //   }
  // };

  // console.log(expandedKeys);

  useEffect(() => {
    onExpand(['/']);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExpand = (expandedKeysValue) => {
    onExpand(expandedKeysValue);
  };

  const handleSelect = (selectedKeysValue, info) => {
    if (selectedKeysValue[0] === 'google:drive') {
      onSelectDrive();
    } else if (info.node.type === 'directory') {
      onSelect(selectedKeysValue[0]);
    }
  };

  return (
    <DirectoryTree
      expandAction="doubleClick"
      className="directory-tree"
      treeData={treeData}
      selectedKeys={selectedKeys}
      expandedKeys={expandedKeys}
      onSelect={handleSelect}
      onExpand={handleExpand}
    />
  );
};

export default TreeView;
