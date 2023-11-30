import {
    SearchListDataProps,
    SearchTree,
    SearchTreeDataProps,
} from '@lands/antd-react-components';
import { listToTree } from '@lands/antd-react-components/utils';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

export default () => {
  const [deptList, setDeptList] = useState<SearchListDataProps[]>([]);
  const [deptTree, setDeptTree] = useState<SearchTreeDataProps[]>([]);
  const [deptId, setDeptId] = useState('');

  useEffect(() => {
    const data = getMockData();
    const tree: SearchTreeDataProps[] = listToTree({
      data,
      id: 'deptId',
      F: {
        oldField: ['deptId', 'deptId', 'deptName'],
        field: ['key', 'value', 'title'],
      },
    });
    const listData = JSON.parse(JSON.stringify(data)).map(
      (item: Record<string, any>) => ({
        ...item,
        children: undefined,
      }),
    );
    setDeptList(listData);
    setDeptTree(tree);
    setDeptId(tree[0].key);
  }, []);
  return (
    deptId && (
      <SearchTree
        TreeProps={{
          blockNode: true,
          checkable: true,
        }}
        border
        onChange={(v) => {
          message.info(v);
        }}
        isHalfCheckedKeys={true}
        dataTree={deptTree}
        dataList={deptList}
        defaultExpandedKeys={[deptId]}
      />
    )
  );
};

function getMockData() {
  return [
    {
      createTime: '2023-04-27 13:58:42.034515',
      deptId: '7a685ca5-01e5-45df-a704-f687c920c5ba',
      deptName: 'lands',
      parentId: 'root',
    },
    {
      createTime: '2023-04-25 17:18:44.56218',
      deptId: 'root',
      deptLeader: '兰涛',
      deptName: 'SuperAdminDept',
      description: '诶嘿嘿',
      parentId: '-1',
    },
    {
      createTime: '2023-05-06 17:58:15.955684',
      deptId: '98f25342-6f40-4b99-87b4-4680c7bec6f5',
      deptName: '测试公司',
      parentId: 'root',
    },
    {
      createTime: '2023-05-06 17:58:22.69559',
      deptId: 'e62b6795-e655-4db9-9967-737a31a6c164',
      deptName: '测试公司2',
      parentId: 'root',
    },
    {
      createTime: '2023-05-06 18:00:09.895904',
      deptId: '79c0705c-d218-4369-be34-ce9d635f0b9f',
      deptName: '测试公司-组1',
      parentId: '98f25342-6f40-4b99-87b4-4680c7bec6f5',
    },
    {
      createTime: '2023-05-06 18:00:43.275503',
      deptId: '17bd1647-db56-4be5-8948-ba12895358b1',
      deptName: '测试公司-组2',
      parentId: '98f25342-6f40-4b99-87b4-4680c7bec6f5',
    },
    {
      createTime: '2023-05-09 11:48:26.940529',
      deptId: '2d26b24a-2e80-4220-a815-fab9b50b91ff',
      deptName: 'B公司',
      parentId: 'root',
    },
    {
      createTime: '2023-05-10 18:03:18.084126',
      deptId: '50f08157-baa6-48e7-a0ce-a880fc084007',
      deptName: '123123',
      parentId: 'e62b6795-e655-4db9-9967-737a31a6c164',
    },
    {
      createTime: '2023-05-10 18:04:24.437363',
      deptId: '16b05d75-c9e5-4c41-8364-2d463ab3f170',
      deptName: '213123123',
      parentId: 'e62b6795-e655-4db9-9967-737a31a6c164',
    },
    {
      createTime: '2023-05-11 16:01:58.035462',
      deptId: 'd1036536-9122-4f67-bd9b-2cc72455d678',
      deptName: 'A公司-1',
      parentId: '7a685ca5-01e5-45df-a704-f687c920c5ba',
    },
    {
      createTime: '2023-05-11 16:02:37.985943',
      deptId: '5456bf81-3926-4ca1-93ad-b7ecdcd31c99',
      deptName: 'Bridge-2',
      parentId: '7a685ca5-01e5-45df-a704-f687c920c5ba',
    },
  ];
}
