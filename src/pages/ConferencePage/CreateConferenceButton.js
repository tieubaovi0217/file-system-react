import React from 'react';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CreateConferenceButton = () => {
  return (
    <Button
      type="dashed"
      size={'large'}
      icon={<PlusOutlined />}
      style={{
        marginLeft: '16px',
        borderRadius: '24px',
        boxShadow:
          'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
      }}
    >
      Create your own conference
    </Button>
  );
};

export default CreateConferenceButton;
