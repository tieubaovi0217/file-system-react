import { useState } from 'react';
import { Input, Button, message, Modal } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { fetchFileBrowserDataThunk } from 'actions/fileBrowser';

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

  const handleOk = async () => {
    if (newFolderName.trim().length === 0) return handleFormCancel();

    setConfirmLoading(true);
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/root/mkdir`,
        { relativePath: path, newFolderName },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        },
      );
      console.log(resp.data);
      dispatch(fetchFileBrowserDataThunk(path));
    } catch (error) {
      console.log(error.response);
      message.error(error.message);
    }
    setConfirmLoading(false);
    setShowNewFolderForm(false);
    setNewFolderName('');
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
        <Input
          placeholder="Folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default UploadFolder;
