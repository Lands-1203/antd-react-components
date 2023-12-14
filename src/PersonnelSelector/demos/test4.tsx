import {
    PersonnelSelector,
    personnelSelectorProps,
} from '@lands/antd-react-components';
import { Button } from 'antd';
import React, { useState } from 'react';
export default () => {
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
  const [mode, setmode] = useState<personnelSelectorProps['mode']>('multiple');
  const [returnType, setreturnType] =
    useState<personnelSelectorProps['returnType']>('string');
  const [delimiter, setdelimiter] = useState(',');
  return (
    <>
      <PersonnelSelector
        mode={mode}
        returnType={returnType}
        delimiter={delimiter}
        selectWidth="300px"
        selectValueEnum={getData}
        rowKey={'userId'}
        rowKeyType="number"
        selectDataRender={(item) => {
          return item.cname;
        }}
        value={[1]}
        proFormTableProps={{
          columns: userColumns,
          request: async ({ current = 1, pageSize = 20 }) => {
            const data = getData(pageSize, (current - 1) * pageSize);
            return {
              success: true,
              total: 100,
              data,
            };
          },
        }}
      />
      <Button
        onClick={() => {
          setmode('single');
        }}
      >
        设置为单选
      </Button>
      <Button
        onClick={() => {
          setmode('multiple');
        }}
      >
        设置为多选
      </Button>
      <Button
        onClick={() => {
          setmode('multiple');
          setreturnType('array');
        }}
      >
        设置为数组返回
      </Button>
      <Button
        onClick={() => {
          setmode('multiple');
          setreturnType('string');
        }}
      >
        设置为字符串返回组返回
      </Button>
      <Button
        onClick={() => {
          setmode('multiple');
          setreturnType('string');
          setdelimiter(',');
        }}
      >
        设置分隔符为 ,
      </Button>
      <Button
        onClick={() => {
          setmode('multiple');
          setreturnType('string');
          setdelimiter('-');
        }}
      >
        设置分隔符为 -
      </Button>

      <Button
        onClick={() => {
          // message.info(JSON.stringify(userIds));
          // console.log(userIds);
        }}
      >
        显示数据
      </Button>
    </>
  );
};

function getData(n: number = 10, startIndex: number = 0) {
  const arr = [];
  for (let i = startIndex; i < startIndex + n; i++) {
    arr.push({
      userId: i,
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
