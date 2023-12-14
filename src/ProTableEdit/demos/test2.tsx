import {
    ProTableEdit,
    ProTableEditColumns,
    editActionRefProps,
} from '@lands/antd-react-components';
import { Button } from 'antd';
import React, { useRef } from 'react';
export default () => {
  const editActionRef = useRef<editActionRefProps>();
  const columns: ProTableEditColumns<Record<string, any>>[] = [
    {
      title: '姓名',
      dataIndex: 'cname',
      width: 88,
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
  ];
  return (
    <>
      <Button
        onClick={() => {
          editActionRef.current?.open();
        }}
      >
        使用editActionRef打开
      </Button>
      <ProTableEdit
        columns={columns}
        editActionRef={editActionRef}
        onSubmit={async function () {
          return new Promise((resolve) => {
            resolve({
              bizCode: 'success',
              bizMsg: '成功',
            });
          });
        }}
      />
    </>
  );
};
