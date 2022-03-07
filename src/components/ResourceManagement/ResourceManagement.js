import { useState, useEffect } from 'react';
import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';

import './ResourceManagement.css';

import { Row, Col } from 'antd';
// import useFetch from '../../hooks/useFetch';

import { FileOutlined, FolderFilled } from '@ant-design/icons';

const ResourceManagement = () => {
  // const { sendRequest } = useFetch();

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/resources`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filesAndDirectDir = data.map((file) => {
          return {
            isFile: file.isFile,
            isDirectDirectory: file.isDirectDirectory,
            fileName: file.fileName,
            ext: file.ext,
            fileSize: prettyBytes(file.fileSize),
            lastModified: moment(file.lastModified).format(
              'DD/MM/YYYY HH:mm:ss',
            ),
          };
        });
        setFiles(filesAndDirectDir);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cols = files.map((file, index) => {
    //TODO: map icons to files
    return (
      <Col key={`${index + 1}`} span={3}>
        <div className="file-icon">
          {file.isFile && <FileOutlined />}
          {file.isDirectDirectory && <FolderFilled />}
        </div>
        <div className="file-name">{file.fileName}</div>
      </Col>
    );
  });

  return (
    <section>
      <h1>Resource Management</h1>
      <Row gutter={[12, 16]}>{cols}</Row>
    </section>
  );
};

export default ResourceManagement;
