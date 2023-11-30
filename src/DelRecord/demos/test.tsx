import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { DelRecord } from '@lands/antd-react-components';
import React, { useRef } from 'react';
// 模拟网络请求
const deleteApprovalTemplate = async (params: any, option: any) => {
  console.log(params, option);
  await new Promise<void>((resole) => {
    setTimeout(() => {
      resole();
    }, 1000);
  });
  return {
    bizCode: 'success',
    bizContent: {},
    bizMsg: '内管请求处理成功。',
    reqSerial: '2b5a362b-6775-4f13-b380-a15291793795-1698635760878',
    sysCode: '000000',
    sysMsg: '成功。',
  };
};
export default () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 64,
      valueType: 'indexBorder',
    },

    {
      title: '模版名称',
      dataIndex: 'name',
      width: 220,
    },

    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (dom, entity) => [
        <DelRecord
          key="del"
          rowKey="templateCode"
          rowValue={entity.templateCode}
          onDeleteMethod={deleteApprovalTemplate}
          tableActionRef={actionRef}
        />,
      ],
    },
  ];

  return (
    <ProTable
      actionRef={actionRef}
      rowKey="templateCode"
      request={async () => {
        await new Promise<void>((resole) => {
          setTimeout(() => {
            resole();
          }, 1000);
        });
        return {
          data: [
            {
              name: '审批模版1',
              remark: '模版备注1',
              templateCode: '1',
            },
          ],
          success: true,
        };
      }}
      columns={columns}
    />
  );
};
