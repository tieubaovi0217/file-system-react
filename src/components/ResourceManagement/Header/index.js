import React from 'react';

import { Button, Breadcrumb, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const { Search } = Input;

const ResourcesHeader = ({ resourcesPath, onBackButtonClicked }) => {
  const backButtonClickedHandler = () => {
    const updatedResourcesPath = resourcesPath.split('/');
    updatedResourcesPath.pop();

    onBackButtonClicked(updatedResourcesPath.join('/'));
  };

  const breadcrumbItems = resourcesPath
    .split('/')
    .map((resourcePath, index) => {
      return <Breadcrumb.Item key={index + 1}>{resourcePath}</Breadcrumb.Item>;
    });

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <div className="resources__header">
      <Button
        shape="circle"
        onClick={backButtonClickedHandler}
        disabled={
          resourcesPath === process.env.REACT_APP_RESOURCES_ROOT_FOLDER_PATH
        }
      >
        <ArrowLeftOutlined />
      </Button>
      <Breadcrumb className="resources__path">{breadcrumbItems}</Breadcrumb>
      <Search
        className="resources__search-bar"
        placeholder="Search file"
        allowClear
        onSearch={onSearch}
        style={{ width: 240 }}
      />
    </div>
  );
};

export default ResourcesHeader;
