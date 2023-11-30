import { ColorPrimaryPicker } from '@lands/antd-react-components';
import React, { useState } from 'react';
export default () => {
  const [rgb, setRgb] = useState('');
  return (
    <>
      <ColorPrimaryPicker
        onChange={(v) => {
          /*todo 切换主题的代码 */
          setRgb(v);
        }}
      />
      {rgb}
    </>
  );
};
