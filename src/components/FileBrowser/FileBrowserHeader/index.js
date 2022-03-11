import React from 'react';

import { Button, Breadcrumb, Input, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFileBrowserData } from '../../../store/fileBrowserActions';

const { Search } = Input;

const seperateUrl2Array = (url) => {
  return url.split('/');
};

const FileBrowserHeader = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.fileBrowser.url);
  const folderPathArray = seperateUrl2Array(url);

  const backButtonClickedHandler = () => {
    if (folderPathArray.length <= 1) {
      message.error('Can not go back, this is root');
      return;
    }
    folderPathArray.pop();
    const updatedUrl = folderPathArray.join('/');

    dispatch(fetchFileBrowserData(updatedUrl));
  };

  const onSearch = (value) => {
    console.log(value);
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
        <ArrowLeftOutlined />
      </Button>
      <Breadcrumb className="file-browser__path">{breadcrumbItems}</Breadcrumb>
      <Search
        className="file-browser__search-bar"
        placeholder="Search file"
        allowClear
        onSearch={onSearch}
        style={{ width: 240 }}
      />
    </div>
  );
};

export default FileBrowserHeader;
