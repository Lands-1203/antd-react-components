import { ProTable } from '@ant-design/pro-components';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.less';

import { ProFormTableProps } from './typing';
type stringOrNumber = string | number;

export default function ProFormTable<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  ValueType = 'text',
>(props: ProFormTableProps<T, U, ValueType>) {
  const {
    rowKey,
    value,
    onChange,
    returnType = 'string',
    selectionType = 'checkbox',
    delimiter = ',',
    rowKeyType = 'string',
    reRenderTable,
    ...p
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<stringOrNumber[]>();
  useEffect(() => {
    if (value === undefined || value === null) setSelectedRowKeys(undefined);
    if (selectionType === 'checkbox') {
      if (returnType === 'string' && typeof value === 'string') {
        let v: stringOrNumber[];
        if (!value) {
          v = [];
        } else {
          v = value.split(delimiter);
        }
        if (rowKeyType === 'number') {
          v = v?.map((item) => Number(item));
        }
        setSelectedRowKeys(v);
      } else if (
        returnType === 'array' &&
        (Array.isArray(value) || value === void 0)
      ) {
        setSelectedRowKeys(value || []);
      }
    } else if (selectionType === 'radio') {
      const v = ['string', 'number'].includes(typeof value)
        ? (value as stringOrNumber)
        : null;
      const res = v !== null ? [v] : [];
      setSelectedRowKeys(res);
    }
  }, [value, reRenderTable]);
  const [currentTableData, setCurrentTableData] = useState<stringOrNumber[]>(
    [],
  );
  return (
    <ProTable<T, U, ValueType>
      {...p}
      rowKey={rowKey}
      request={
        p.request
          ? async (params, sort, filter) => {
              const res = await p.request?.(params, sort, filter);
              setCurrentTableData(res?.data?.map((item) => item[rowKey]) || []);
              return res as any;
            }
          : undefined
      }
      options={false}
      tableClassName="lands-proform-table"
      rowSelection={{
        type: selectionType,
        selections: [Table.SELECTION_NONE, Table.SELECTION_INVERT],
        selectedRowKeys,
        onChange: (rowKeys, rows, { type }) => {
          if (type === 'none' && selectionType === 'radio') {
            setSelectedRowKeys(undefined);
            onChange?.(undefined, []);
            return;
          }
          if (!['none', 'all', 'invert'].includes(type)) return;
          let newKeys: stringOrNumber[] = [];
          let record: T[] = rows;
          if (type === 'none') {
            newKeys = [];
            record = [];
          } else if (type === 'all') {
            if (rowKeys.length === 0) {
              // 取消
              // 排除原数组selectedRowKeys中所有currentTableData
              newKeys =
                selectedRowKeys?.filter((row) => {
                  return !currentTableData.includes(row);
                }) || [];
            } else {
              const set = new Set(rowKeys.concat(selectedRowKeys || []));
              newKeys = Array.from(set) as stringOrNumber[];
            }
          } else if (type === 'invert') {
            // 反选当前页

            // 当前页以外的选择
            const otherRowKeys = (selectedRowKeys || []).filter((Item) => {
              return !currentTableData.includes(Item);
            });
            newKeys = otherRowKeys.concat(rowKeys as stringOrNumber[]);
          }
          setSelectedRowKeys(newKeys);
          if (returnType === 'array') {
            onChange?.(newKeys, record);
          } else {
            onChange?.(newKeys.join(delimiter), record);
          }
        },
        onSelect: (record, selected) => {
          const v = record[rowKey];
          if (selectionType === 'checkbox') {
            let arr: (string | number)[] = [];
            const doesItExist = selectedRowKeys?.some((item) => item === v);
            if (selected) {
              if (!doesItExist) {
                // 勾选新元素
                arr = [v].concat(selectedRowKeys || []);
              }
            } else {
              if (doesItExist) {
                // 取消旧元素
                const newData = selectedRowKeys?.filter((item) => item !== v);
                arr = newData || [];
              }
            }
            setSelectedRowKeys(arr);
            if (returnType === 'array') {
              onChange?.(arr, [record]);
            } else {
              onChange?.(arr.join(delimiter), [record]);
            }
          } else if (selectionType === 'radio') {
            setSelectedRowKeys([v]);
            onChange?.(v, [record]);
          }
        },
      }}
    />
  );
}
