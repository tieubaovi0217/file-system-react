import React from 'react';

import { Button, Breadcrumb, Input } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

const { Search } = Input;

const FileBrowserHeader = ({
  currentPath,
  onSearchChange,
  onBackButtonClick,
}) => {
  const onSearch = (value) => {
    console.log(value);
  };

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

  return (
    <div className="file-browser__header">
      <Button
        className="file-browser__backbutton"
        shape="circle"
        onClick={onBackButtonClick}
        disabled={currentPath.length <= 1 ? true : false}
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
        onSearch={onSearch}
      />
    </div>
  );
};

export default FileBrowserHeader;
