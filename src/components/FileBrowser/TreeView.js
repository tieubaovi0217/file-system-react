import { Tree } from 'antd';

const { DirectoryTree } = Tree;

const TreeView = ({ treeData, onSelect, path }) => {
  const handleSelect = (selectedKey, e) => {
    // console.log(selectedKey);
    // console.log(e);
    const { type } = e.node;
    if (type === 'directory') {
      onSelect(selectedKey[0]);
    }
  };

  const selectedKeys = [path];

  return (
    <DirectoryTree
      className="directory-tree"
      onSelect={handleSelect}
      onExpand={() => {}}
      treeData={treeData}
      selectedKeys={selectedKeys}
    />
  );
};

export default TreeView;
