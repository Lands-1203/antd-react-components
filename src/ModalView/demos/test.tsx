import { ModalView } from '@lands/antd-react-components';
import { Button, Input } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [url, seturl] = useState(
    'https://huize-dev.oss-cn-beijing.aliyuncs.com/test/ChatGPT%E6%B3%A8%E5%86%8C%E6%95%99%E7%A8%8B.docx',
  );

  return (
    <>
      <div
        style={{
          margin: '20px 0',
        }}
      >
        地址：
        <Input
          onChange={(v) => {
            seturl(v.currentTarget.value);
          }}
          value={url}
          style={{
            width: 300,
          }}
        />
      </div>
      <Button
        onClick={() => {
          ModalView.open(url);
        }}
      >
        预览
      </Button>
    </>
  );
};
