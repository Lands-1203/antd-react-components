import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import {
    ProTableEdit,
    ProTableEditColumns,
    editActionRefProps,
    utils,
    validator,
} from '@lands/antd-react-components';
import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';
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
const { VPhone, VIdCard, VEmail } = validator;
const { returnTag } = utils;
export default () => {
  const actionRef = useRef<ActionType>();
  const editActionRef = useRef<editActionRefProps>();
  const [initData, setInitData] = useState<Record<string, any>>({});
  const [openEdit, setOpenEdit] = useState(false);
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
      immunityReset: !!initData?.userId,
      renderFormItem: () => {
        return <Input disabled />;
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
      title: '部门',
      dataIndex: 'deptName',
    },
    {
      title: '账户',
      dataIndex: 'userName',
      copyable: true,
      ellipsis: true,
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
        rules: [{ required: true, message: '此项是必填的' }],
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
      title: '身份证号',
      dataIndex: 'idCard',
      formItemProps: {
        rules: [{ required: false, validator: VIdCard }],
      },
    },
    {
      title: '邮箱',
      copyable: true,
      ellipsis: true,
      dataIndex: 'email',
      formItemProps: {
        rules: [{ required: false, validator: VEmail }],
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
              setOpenEdit(true);
              setInitData(row);
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
              setInitData({});
              setOpenEdit(true);
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
        modalTitle={initData?.userId ? '编辑' : '新增'}
        columns={columns}
        open={openEdit}
        setOpen={setOpenEdit}
        onSubBefore={async ({ params }) => {
          params.password = params.password + '1';
          return { toNext: true, params };
        }}
        onSubmit={async function () {
          return new Promise((resolve) => {
            resolve(11);
          });
        }}
        initData={{
          data: initData,
          dataKey: 'userId',
        }}
        tableActionRef={actionRef}
      />
    </>
  );
};
