import React from 'react';

import { Button, Breadcrumb, Input } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFileBrowserData } from '../../../store/fileBrowserActions';
import { fileBrowserActions } from '../../../store/fileBrowser';

const { Search } = Input;

const seperatePath2Array = (path) => {
  return path.split('/');
};

const FileBrowserHeader = () => {
  const dispatch = useDispatch();
  const path = useSelector((state) => state.fileBrowser.path);

  const folderPathArray = seperatePath2Array(path);

  const backButtonClickedHandler = () => {
    if (folderPathArray.length <= 1) {
      return;
    }
    folderPathArray.pop();
    const updatedUrl = folderPathArray.join('/');

    dispatch(fetchFileBrowserData(updatedUrl));
  };

  const onSearch = (value) => {
    console.log(value);
  };

  const onChange = (e) => {
    dispatch(fileBrowserActions.filterData(e.target.value));
  };

  const breadcrumbItems = folderPathArray.map((folderName, index) => {
    return (
      <Breadcrumb.Item key={`${folderName}-${index}`}>
        {folderName}
      </Breadcrumb.Item>
    );
  });

  return (
    <div className="file-browser__header">
      <Button
        shape="circle"
        onClick={backButtonClickedHandler}
        disabled={folderPathArray.length <= 1 ? true : false}
      >
        <ArrowUpOutlined />
      </Button>
      <Breadcrumb className="file-browser__path">{breadcrumbItems}</Breadcrumb>
      <Search
        className="file-browser__search-bar"
        placeholder="Search file"
        allowClear
        onChange={onChange}
        onSearch={onSearch}
      />
    </div>
  );
};

export default FileBrowserHeader;
