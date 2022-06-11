import React from 'react';
import { Button, Breadcrumb, Input } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { GOOGLE_DRIVE_PATH } from 'common/constants';

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
    currentPath.length === 0 ||
    currentPath === '/' ||
    currentPath === GOOGLE_DRIVE_PATH;

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
      <Breadcrumb className="disable-text-selection file-breadcrumb">
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

export default React.memo(FileBrowserHeader);
