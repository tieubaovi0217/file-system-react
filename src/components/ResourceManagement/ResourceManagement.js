import './ResourceManagement.css';
import File from './File';
import Folder from './Folder';
import * as moment from 'moment';
import prettyBytes from 'pretty-bytes';
import { useState, useEffect } from 'react';

import { Row, Spin, message } from 'antd';
import useFetch from '../../hooks/useFetch';

import ResourcesHeader from './Header';

const ResourceManagement = () => {
  const { sendRequest, isFetching: isLoading } = useFetch();

  const [resources, setResources] = useState([]);
  const [resourcesPath, setResourcesPath] = useState(
    process.env.REACT_APP_RESOURCES_ROOT_FOLDER_PATH,
  );

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/${resourcesPath}`;

    sendRequest(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem('token') ? localStorage.getItem('token') : ''
        }`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((data) => {
        const newResources = data.map((resource) => {
          return {
            isFile: resource.isFile,
            isDirectDirectory: resource.isDirectDirectory,
            name: resource.name,
            ext: resource.ext,
            resourceSize: prettyBytes(resource.resourceSize),
            lastModified: moment(resource.lastModified).format(
              'DD/MM/YYYY HH:mm:ss',
            ),
          };
        });
        setResources(newResources);
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message, 1);
      });
  }, [sendRequest, resourcesPath]);

  const cols = resources.map((resource) => {
    //TODO: map icons to resources
    //TODO: long resource name
    if (resource.isFile)
      return <File fileName={resource.name} onDoubleClick={() => {}} />;

    return (
      <Folder folderName={resource.name} onDoubleClick={setResourcesPath} />
    );
  });

  return (
    <section className="resources">
      <ResourcesHeader
        resourcesPath={resourcesPath}
        onBackButtonClicked={setResourcesPath}
      />
      {!isLoading && <Row gutter={[8, 12]}>{cols}</Row>}
      {isLoading && (
        <div className="resources__spinner">
          <Spin size="large" />
        </div>
      )}
    </section>
  );
};

export default ResourceManagement;
