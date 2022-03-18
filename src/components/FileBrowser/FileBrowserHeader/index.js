import React from 'react';

import { Button, Breadcrumb, Input } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { fileBrowserActions } from '../../../slices/fileBrowser';
import { fetchFileBrowserDataAsync } from '../../../actions/fileBrowser';

const { Search } = Input;

const FileBrowserHeader = () => {
  const dispatch = useDispatch();
  const currentPath = useSelector((state) => state.fileBrowser.path);

  const backButtonClickedHandler = () => {
    // /folderA/folderB/folderC
    if (currentPath.length <= 1) {
      return;
    }
    dispatch(
      fetchFileBrowserDataAsync(
        currentPath.substring(0, currentPath.lastIndexOf('/')),
      ),
    );
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const onChange = (e) => {
    dispatch(fileBrowserActions.filterData(e.target.value));
  };

  const breadcrumbItems = 'a/b/c'.split('/').map((folderName, index) => {
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
        onClick={backButtonClickedHandler}
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
