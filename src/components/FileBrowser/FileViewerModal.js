import FileViewer from 'react-file-viewer';

import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { fileActions } from 'slices/file';

const FileViewerModal = () => {
  const dispatch = useDispatch();
  const { url, type, isModalVisible } = useSelector((state) => state.file);

  const handleOk = () => {
    handleCancel();
  };

  const handleCancel = () => {
    dispatch(fileActions.closeModal());
  };

  return (
    <Modal
      keyboard
      width={1000}
      title="Preview file"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      bodyStyle={{ height: 560, textAlign: 'center', overflowY: 'auto' }}
      key={`${Math.random()}`}
    >
      {type === 'pptx' ? (
        <iframe
          title="PowerPoint viewer"
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${url.replace(
            'http://localhost:8080',
            'https://36cf-113-173-172-158.ap.ngrok.io',
          )}`}
          className="pptx-viewer"
          frameBorder="0"
        ></iframe>
      ) : (
        <FileViewer
          filePath={url}
          fileType={type}
          errorComponent={<div>Error</div>}
        />
      )}
    </Modal>
  );
};

export default FileViewerModal;
