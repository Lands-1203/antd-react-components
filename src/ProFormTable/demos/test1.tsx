import { ProFormTable } from '@lands/antd-react-components';
import { Button, Form, message } from 'antd';
import React from 'react';
export default () => {
  const [form] = Form.useForm();
  const userColumns = [
    {
      title: 'id',
      dataIndex: 'userId',
      width: 40,
    },
    {
      title: '姓名',
      dataIndex: 'cname',
      width: 88,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      hideInSearch: true,
      width: 52,
    },
    {
      title: '邮箱',
      copyable: true,
      ellipsis: true,
      hideInSearch: true,
      dataIndex: 'email',
    },
    {
      title: '账户',
      hideInSearch: true,
      dataIndex: 'userName',
    },
    {
      title: '手机号',
      hideInSearch: true,
      dataIndex: 'phonenumber',
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      hideInForm: true,
      hideInSearch: true,
    },
  ];

  return (
    <>
      <Form form={form}>
        <Form.Item name="userIds">
          <ProFormTable
            columns={userColumns}
            rowKey={'userId'}
            request={async ({ current = 1, pageSize = 20 }) => {
              const data = getData(pageSize, (current - 1) * pageSize);
              return {
                total: 100,
                data,
                success: true,
              };
            }}
          />
        </Form.Item>
        <Button
          onClick={() => {
            form.setFieldValue('userIds', '70');
          }}
        >
          设置数据
        </Button>
        <Button
          onClick={() => {
            const userIds = form.getFieldValue('userIds');
            message.info(JSON.stringify(userIds));
            console.log(userIds);
          }}
        >
          显示数据
        </Button>
      </Form>
    </>
  );
};

function getData(n: number = 10, startIndex: number = 0) {
  const arr = [];
  for (let i = startIndex; i < startIndex + n; i++) {
    arr.push({
      userId: String(i),
      cname: '兰涛' + i,
      createTime: '2023-04-25 16:55:36.888352',
      deptId: 'root' + i,
      deptName: '部门' + i,
      email: 'lantao@nima.mail' + i,
      phonenumber: 15723185374 + i,
      sex: '1',
      status: '1',
      userName: 'lantao' + i,
    });
  }
  return arr;
}
