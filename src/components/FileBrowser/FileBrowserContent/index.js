import React, { useEffect, useState } from 'react';

import { message, Row } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

import File from '../File';
import Folder from '../Folder';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFileBrowserData } from '../../../store/fileBrowserActions';

const FileBrowserContent = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.fileBrowser.filteredData); // attention: this is filtered files and dirs

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFileBrowserData('/')) //get data at root
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message, 1);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  const files = data
    .filter((item) => item.isFile)
    .map((file) => <File key={`${file.relativePath}`} fileInfo={file} />);

  const folders = data
    .filter((item) => item.isDirectDirectory)
    .map((folder) => (
      <Folder key={`${folder.relativePath}`} folderInfo={folder} />
    ));

  return (
    <div className="file-browser__content">
      {isLoading && (
        <span className="file-browser__spinner">
          <SyncOutlined spin />
        </span>
      )}
      {!isLoading && (
        <Row gutter={[8, 12]}>
          {folders}
          {files}
        </Row>
      )}
    </div>
  );
};

export default FileBrowserContent;
