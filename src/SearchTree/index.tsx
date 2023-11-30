// 这个组件为什么要这么封装原因是Tree不支持Form操作
import { Card, Input, Tree } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';
import { SearchTreeDataProps, SearchTreeProps } from './typing';

const { Search } = Input;

const getParentKey = (key: string, tree: SearchTreeDataProps[]): string => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey || '';
};

type stringNumberType = string | number;

/** 一个搜索树组件，可以作为显示使用，也可以作为表单组件 */
export default function SearchTree(props: SearchTreeProps) {
  const {
    defaultExpandedKeys = [''],
    onChange: formOnChange,
    stringType,
    value: formValue,
    dataList,
    dataTree,
    isHalfCheckedKeys = false,
    TreeProps,
    border = false,
  } = props;
  const [expandedKeys, setExpandedKeys] = useState<
    (string | number)[] | undefined
  >(defaultExpandedKeys);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [treeMap, setTreeMap] = useState<Record<string, any>>();
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState<
    stringNumberType | stringNumberType[]
  >([]);

  useEffect(() => {
    const map = treeToMap(dataTree, 'key');
    setTreeMap(map);
  }, [dataTree]);

  useEffect(() => {
    if (!treeMap) return;
    const data: any[] = [];
    let values: stringNumberType[] = [];
    if (formValue instanceof Array) {
      values = formValue;
    } else if (formValue) {
      values = String(formValue).split(',');
    }
    values.forEach((item) => {
      // 没有下级
      if (!treeMap[item]?.children?.length) {
        data.push(item);
      }
    });
    setDefaultCheckedKeys(data);
  }, [formValue, treeMap]);

  const loop: any = (data: SearchTreeDataProps[]) =>
    data?.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="lands-search-tree-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.title}</span>
        );
      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title,
        key: item.key,
      };
    });

  const dom = (
    <div style={{ position: 'relative' }}>
      <Search
        style={{ width: '98%', marginBottom: '10px' }}
        placeholder="Search"
        value={searchValue}
        onChange={(e) => {
          const { value } = e.target;
          const expandedKeys = dataList
            .map((item) => {
              if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, dataTree);
              }
              return '';
            })
            .filter((item, i, self) => item && self.indexOf(item) === i);

          setExpandedKeys(expandedKeys);
          setSearchValue(value);
          setAutoExpandParent(true);
          if (stringType) {
            formOnChange?.((defaultCheckedKeys as []).join(','));
          } else {
            formOnChange?.(defaultCheckedKeys);
          }
        }}
      />
      <Tree
        onExpand={(expandedKeys) => {
          setExpandedKeys(expandedKeys);
          setAutoExpandParent(false);
        }}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={loop(dataTree)}
        onCheck={(checkedKeys, e) => {
          setDefaultCheckedKeys(checkedKeys as any);
          let res: any = '';
          if (isHalfCheckedKeys) {
            const halfCheckedKeys = e.halfCheckedKeys;
            res =
              (stringType &&
                (checkedKeys as any[]).concat(halfCheckedKeys)?.toString()) ||
              (checkedKeys as any[]).concat(halfCheckedKeys);
          } else {
            res = (stringType && checkedKeys?.toString()) || checkedKeys;
          }
          formOnChange?.(res);
        }}
        checkedKeys={defaultCheckedKeys as any}
        defaultCheckedKeys={defaultCheckedKeys as any}
        {...TreeProps}
      />
    </div>
  );
  return border ? <Card>{dom}</Card> : dom;
}
function treeToMap(
  data: Record<string, any>[],
  key: string,
  childrenKey = 'children',
) {
  const map: Record<string, any> = {};
  function recu(itemData: Record<string, any>[]) {
    itemData.forEach(async (item) => {
      if (item[childrenKey] && item[childrenKey] instanceof Array) {
        const children = item[childrenKey];
        recu(children);
      }
      // 通过每个对象中的ID生成一个key为ID的map数组
      map[item[key]] = item;
    });
  }
  recu(data);
  return map;
}
