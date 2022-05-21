import { Button, Breadcrumb, Input } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Search } = Input;

const FileBrowserHeader = ({
  currentPath,
  onSearchChange,
  onBackButtonClick,
}) => {
  const onChange = (e) => {
    onSearchChange(e.target.value);
  };

  const breadcrumbItems = currentPath.split('/').map((folderName, index) => {
    return (
      <Breadcrumb.Item key={`${folderName}-${index}`}>
        {folderName}
      </Breadcrumb.Item>
    );
  });

  const isDisabledBackBtn =
    currentPath.length === 0 || currentPath === '/' ? true : false;

  return (
    <div className="file-browser__header">
      <Button
        className="file-browser__backbutton"
        shape="circle"
        onClick={onBackButtonClick}
        disabled={isDisabledBackBtn}
      >
        <ArrowUpOutlined />
      </Button>
      <Breadcrumb className="disable-text-selection">
        {breadcrumbItems}
      </Breadcrumb>
      <Search
        className="file-browser__search"
        placeholder="Search files"
        allowClear
        onChange={onChange}
      />
    </div>
  );
};

export default FileBrowserHeader;
