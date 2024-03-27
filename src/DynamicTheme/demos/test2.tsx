import { DynamicTheme } from '@lands-pro/antd-react-components';
import { message } from 'antd';
import React from 'react';

export default () => {
  return (
    <DynamicTheme
      onChange={(v) => {
        message.info(v);
      }}
    />
  );
};
