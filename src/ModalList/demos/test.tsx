import {
    ModalList,
    ModalView,
    modalListRefType,
} from '@lands/antd-react-components';
import { downloadFile } from '@lands/antd-react-components/utils';
import { Button, List } from 'antd';
import React, { useEffect, useRef } from 'react';
type dataProps = { url: string; name: string; id: string };
export default () => {
  const fileRef = useRef<modalListRefType<dataProps>>();

  useEffect(() => {
    fileRef.current?.setDataSource([
      {
        url: 'https://lands-dev.oss-cn-beijing.aliyuncs.com/test/ChatGPT%E6%B3%A8%E5%86%8C%E6%95%99%E7%A8%8B.docx',
        name: 'chatGpt.docx',
        id: '1',
      },
    ]);
  }, []);
  return (
    <>
      <ModalList
        modalListRef={fileRef}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <a
                key="down"
                onClick={async () => {
                  if (!item.id) return;
                  downloadFile(item.url, item.name);
                }}
              >
                下载
              </a>,
            ]}
          >
            <a
              onClick={() => {
                ModalView.open(item.url, { zIndex: 2001 });
              }}
            >
              {item.name}
            </a>
          </List.Item>
        )}
        // 可选
        ModalProps={{
          title: '文件列表',
          zIndex: 1001,
          width: 700,
        }}
      />
      <Button
        onClick={() => {
          fileRef.current?.setShow(true);
        }}
      >
        打开
      </Button>
    </>
  );
};
