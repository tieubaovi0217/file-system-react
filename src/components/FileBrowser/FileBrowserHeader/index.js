import React from 'react';

import { Button, Breadcrumb, Input } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import { useDispatch } from 'react-redux';
import { fileBrowserActions } from '../../../slices/fileBrowser';

const { Search } = Input;

const FileBrowserHeader = ({ currentPath }) => {
  const dispatch = useDispatch();

  const backButtonClickHandler = () => {
    // /folderA/folderB/folderC
    if (currentPath.length <= 1) return;
    dispatch(fileBrowserActions.popPath());
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const onChange = (e) => {
    dispatch(fileBrowserActions.filterData(e.target.value));
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
        onClick={backButtonClickHandler}
        disabled={currentPath.length <= 1 ? true : false}
      >
        <ArrowUpOutlined />
      </Button>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
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
