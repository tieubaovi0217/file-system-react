import { useState } from 'react';

import { Input, Modal } from 'antd';

const ModalForm = ({
  onConfirm,
  modalTitle,
  inputPlaceholder,
  defaultValue,
  isVisible,
  onCancel,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const handleOk = async () => {
    setConfirmLoading(true);
    await onConfirm(value);
    onCancel();
    setConfirmLoading(false);
    setValue(defaultValue);
  };

  const handleCancel = () => {
    onCancel();
    setValue(defaultValue);
  };

  return (
    <Modal
      width={300}
      title={modalTitle}
      visible={isVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Input
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Modal>
  );
};

export default ModalForm;
