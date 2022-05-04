import { useEffect, useState } from 'react';

import { Input, Modal } from 'antd';
import { useIsMounted } from 'hooks/useIsMounted';

const ModalForm = ({
  onConfirm,
  modalTitle,
  inputPlaceholder,
  defaultValue,
  isVisible,
  onCancel,
}) => {
  const name = defaultValue.substring(0, defaultValue.lastIndexOf('.'));
  const extension =
    defaultValue.lastIndexOf('.') !== -1
      ? defaultValue.slice(defaultValue.lastIndexOf('.'))
      : '';

  const isMounted = useIsMounted();

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState(name);

  const handleOk = async () => {
    if (isMounted.current) {
      setConfirmLoading(true);
    }
    await onConfirm(`${value}${extension}`);
    onCancel();
    if (isMounted.current) {
      setConfirmLoading(false);
      setValue(defaultValue);
    }
  };

  const handleCancel = () => {
    onCancel();
    if (isMounted.current) {
      setValue(name);
    }
  };

  useEffect(() => {
    return () => {};
  });

  return (
    <Modal
      width={360}
      title={modalTitle}
      visible={isVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      destroyOnClose={true}
    >
      <Input
        placeholder={inputPlaceholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        addonAfter={`${extension}`}
      />
    </Modal>
  );
};

export default ModalForm;
