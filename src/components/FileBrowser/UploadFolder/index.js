import { useState } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import {
  createNewFolderAsync,
  fetchFileBrowserDataAsync,
} from 'actions/fileBrowser';

const UploadFolder = ({ path }) => {
  const dispatch = useDispatch();

  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const newFolderFormClickHandler = () => {
    setShowNewFolderForm(true);
  };

  const handleFormCancel = () => {
    setShowNewFolderForm(false);
  };

  const handleOk = () => {
    if (newFolderName.trim().length === 0) return handleFormCancel();

    setConfirmLoading(true);

    dispatch(createNewFolderAsync(path, newFolderName))
      .then(() => dispatch(fetchFileBrowserDataAsync(path)))
      .then(() => message.success(`Create new folder successfully`))
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      })
      .finally(() => {
        setConfirmLoading(false);
        setShowNewFolderForm(false);
        setNewFolderName('');
      });
  };

  return (
    <div>
      <Button
        type="text"
        icon={<FolderAddOutlined style={{ fontSize: '125%' }} />}
        onClick={newFolderFormClickHandler}
      >
        New folder
      </Button>
      <Modal
        width={300}
        title="Create a new folder"
        visible={showNewFolderForm}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleFormCancel}
      >
        <p>
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </p>
      </Modal>
    </div>
  );
};

export default UploadFolder;
