import { ProTableEdit, ProTableEditColumns } from '@lands/antd-react-components';
import { Button } from 'antd';
import React, { useState } from 'react';
export default () => {
  const [openEdit, setOpenEdit] = useState(false);
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
          setOpenEdit(true);
        }}
      >
        打开编辑框
      </Button>
      <ProTableEdit
        columns={columns}
        open={openEdit}
        setOpen={setOpenEdit}
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
