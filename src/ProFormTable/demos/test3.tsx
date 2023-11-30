import { ProFormTable, ProFormTableProps } from '@lands/antd-react-components';
import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
export default () => {
  const [form] = Form.useForm();
  const userColumns = [
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
  const [selectionType, setselectionType] =
    useState<ProFormTableProps['selectionType']>('radio');
  const [returnType, setreturnType] =
    useState<ProFormTableProps['returnType']>('string');
  const [delimiter, setdelimiter] = useState(',');
  return (
    <>
      <Form form={form}>
        <Form.Item name="userIds">
          <ProFormTable
            returnType={returnType}
            columns={userColumns}
            rowKey={'userId'}
            rowKeyType="number"
            selectionType={selectionType}
            delimiter={delimiter}
            request={async () => {
              const data = getData();
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
            setselectionType('radio');
          }}
        >
          设置为单选
        </Button>
        <Button
          onClick={() => {
            setselectionType('checkbox');
          }}
        >
          设置为多选
        </Button>
        <Button
          onClick={() => {
            setselectionType('checkbox');
            setreturnType('array');
          }}
        >
          设置为数组返回
        </Button>
        <Button
          onClick={() => {
            setselectionType('checkbox');
            setreturnType('string');
          }}
        >
          设置为字符串返回组返回
        </Button>
        <Button
          onClick={() => {
            setselectionType('checkbox');
            setreturnType('string');
            setdelimiter(',');
          }}
        >
          设置分隔符为 ,
        </Button>
        <Button
          onClick={() => {
            setselectionType('checkbox');
            setreturnType('string');
            setdelimiter('-');
          }}
        >
          设置分隔符为 -
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

function getData(n: number = 10) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      userId: i,
      cname: '兰涛' + i,
      createTime: '2023-04-25 16:55:36.888352',
      deptId: 'root' + i,
      deptName: '部门' + i,
      email: 'lantao@nima.mail' + i,
      phonenumber: 15723185374 + i,
      sex: '1' + i,
      status: '1',
      userName: 'lantao' + i,
    });
  }
  return arr;
}
