import { QuestionCircleOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { message, Popconfirm } from 'antd';
import React, { FC } from 'react';
import { isCodeSuccess } from '../utils';
interface IProps {
  rowKey: string | number;
  rowValue: string | number | undefined;
  onDeleteMethod: (
    body: {
      bizContent: {
        [rowKey: string | number]: string | number;
      };
    },
    option?: any,
  ) => Promise<{
    bizContent?: any;
    bizMsg?: any;
    bizCode?: any;
  }>;
  tableActionRef?: React.MutableRefObject<ActionType | undefined>;
}
const DelRecord: FC<IProps> = (props) => {
  const { onDeleteMethod, rowKey, rowValue, tableActionRef } = props;
  return (
    <Popconfirm
      title="删除提示"
      description="确定需要删除节点吗?"
      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      onConfirm={async () => {
        if (!rowValue || !onDeleteMethod) {
          message.error('删除失败');
          return;
        }
        message.loading({
          content: '删除中...',
          duration: 0,
          key: 'delete',
        });
        const res = await onDeleteMethod?.({
          bizContent: {
            [rowKey]: rowValue,
          },
        });
        if (!isCodeSuccess(res.bizCode)) {
          message.error({
            content: res.bizMsg || '删除失败',
            key: 'delete',
          });
          return;
        }
        message.success({
          content: '删除成功',
          key: 'delete',
        });
        tableActionRef?.current?.reload();
      }}
    >
      <a
        style={{
          color: 'red',
        }}
      >
        删除
      </a>
    </Popconfirm>
  );
};
export default DelRecord;
