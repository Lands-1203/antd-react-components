import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import {
  ProTableEdit,
  ProTableEditColumns,
  editActionRefProps,
  utils,
} from '@lands-pro/antd-react-components';
import { VPhone, VPwd } from '@lands-pro/antd-react-components/validator';
import { Button, Input } from 'antd';
import React, { useRef } from 'react';
interface getMapProps {
  key: string;
  value: any;
}
const getMap = (arr: getMapProps[]): Map<string, any> => {
  const map = new Map<string, any>();
  arr.forEach((item) => {
    map.set(item.key, item.value);
  });
  return map;
};
const GlobalEnum = {
  系统状态: {
    1: '正常',
    2: '停用',
  },
  是否: getMap([
    { key: '1', value: '是' },
    { key: '0', value: '否' },
  ]),
  菜单类型: {
    M: '目录',
    C: '菜单',
    F: '按钮',
  },
  菜单通道: {
    1: '业务系统',
    2: '风控系统',
    3: '网关系统',
  },
  性别: getMap([
    { key: '1', value: '男' },
    { key: '0', value: '女' },
  ]),
};

const tableData = [
  {
    userId: 1,
    cname: '兰涛',
    sex: '1',
    deptName: 'lands',
    userName: 'lantao',
    password: '123465',
    phonenumber: '12345678910',
    idCard: '555555199712031111',
    email: '550947002@qq.com',
    status: '1',
  },
];
const { returnTag } = utils;
export default () => {
  const actionRef = useRef<ActionType>();
  const editActionRef = useRef<editActionRefProps>();
  const columns: ProTableEditColumns<Record<string, any>>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 64,
      valueType: 'indexBorder',
    },
    {
      title: 'ID',
      dataIndex: 'userId',
      width: 64,
      // 不重置userId
      immunityReset: true,
      renderFormItem: () => {
        return <Input disabled={!!editActionRef.current?.initData?.userId} />;
      },
    },
    {
      title: '姓名',
      dataIndex: 'cname',
      width: 88,
      ellipsis: true,
      formItemProps: {
        rules: [{ required: true }],
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 52,
      valueEnum: GlobalEnum['性别'],
      formItemProps: {
        rules: [{ required: true, message: '此项是必填的' }],
      },
    },
    {
      title: '密码',
      hideInSearch: true,
      hideInTable: true,
      dataIndex: 'password',
      valueType: 'password',
      formItemProps: {
        rules: [{ required: true, message: '此项是必填的', validator: VPwd }],
      },
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      formItemProps: {
        rules: [{ required: false, validator: VPhone }],
      },
    },
    {
      title: '状态',
      width: 68,
      dataIndex: 'status',
      valueEnum: GlobalEnum['系统状态'],
      render: (dom, row) => {
        return returnTag(dom, row.status);
      },
      formItemProps: {
        rules: [{ required: true, message: '此项是必填的' }],
      },
    },
    {
      title: '操作',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (_, row) => {
        return [
          <a
            key="edit"
            onClick={async () => {
              editActionRef.current?.setInitData(row);
              editActionRef.current?.setModalTitle('编辑');
              editActionRef.current?.open();
            }}
          >
            编辑
          </a>,
        ];
      },
    },
  ];
  return (
    <>
      <ProTable<Record<string, any>>
        actionRef={actionRef}
        rowKey="userId"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              editActionRef.current?.setInitData({});
              editActionRef.current?.setModalTitle('新增');
              editActionRef.current?.open();
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={async () => {
          return {
            success: true,
            data: tableData,
            total: 200,
          };
        }}
        columns={columns}
      />

      <ProTableEdit
        editActionRef={editActionRef}
        columns={columns}
        onSubBefore={async ({ params }) => {
          params.password = params.password + '1';
          return { toNext: true, params };
        }}
        onSubmit={async function () {
          return new Promise((resolve) => {
            resolve(11);
          });
        }}
        initDataKey="userId"
        tableActionRef={actionRef}
      />
    </>
  );
};
