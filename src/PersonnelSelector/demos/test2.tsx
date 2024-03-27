import { PersonnelSelector } from '@lands-pro/antd-react-components';
import React from 'react';
export default () => {
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
  return (
    <>
      <PersonnelSelector
        selectWidth="300px"
        selectValueEnum={getData}
        rowKey={'userId'}
        selectDataRender={(item) => {
          return item.cname;
        }}
        proFormTableProps={{
          columns: userColumns,
          request: async ({ current = 1, pageSize = 20 }) => {
            const data = getData(pageSize, (current - 1) * pageSize);
            return {
              success: true,
              data,
              total: 200,
            };
          },
        }}
      />
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
