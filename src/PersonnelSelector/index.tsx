import { ProFormTable, ProFormTableProps } from '@lands/antd-react-components';
import { Button, Modal, Select, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react';
type stringOrNumber = string | number;

export interface personnelSelectorProps<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  ValueType = 'text',
> {
  /**
   * 用户选择表格时触发
   * @param v select的最新的数据源
   * @returns
   */
  onTableChange?: (v: T[]) => void;
  value?: stringOrNumber | stringOrNumber[] | undefined;
  onChange?: (value: stringOrNumber | stringOrNumber[] | undefined) => void;
  /**
   * 选择模式 单选 或者多选;'multiple' | 'tags' 为多选，'single'未单选
   */
  mode?: 'multiple' | 'tags' | 'single';
  /**
   * @default 200
   */
  selectWidth?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg' | string;
  /**
   * @default 800
   */
  modalWidth?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg' | string;
  placeholder?: string;

  /**
   * @description 添加按钮的文字描述
   * @default '添加人员'
   */
  addButtonText?: string;
  /**
   * @description 主键
   */
  rowKey: string;
  /**
   * @description slect下拉显示框 的数据
   */
  selectDataRender: (v: T) => React.ReactNode;
  proFormTableProps: Omit<
    ProFormTableProps<T, U, ValueType>,
    | 'rowKey'
    | 'returnType'
    | 'value'
    | 'onChange'
    | 'rowKeyType'
    | 'selectionType'
    | 'delimiter'
  >;
  /**
   * @description 该方法或对象的返回值将提供给展示组件select的下拉列表 用于初始数据渲染后续通过表格选择的数据不需要使用着通过该对象处理 内部自行闭环
   * @default {}
   */
  selectValueEnum?: (() => T[]) | T[];

  /** 多选模式下;并且returnType为string时，value的的字符间隔符
   * @default ','
   */
  delimiter?: string;
  /**
   * @description 多选模式下 array: 返回数据和接收数据以数组形式接收; string: 返回数据以字符串形式输入输出，逗号分隔
   * @default 'string'
   */
  returnType?: 'array' | 'string';
  /**
   * 多选模式下，返回值为字符串类型时指定 需指定主键的类型
   * @default string
   */
  rowKeyType?: 'number' | 'string';
}

function PersonnelSelector<
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
  ValueType = 'text',
>(props: personnelSelectorProps<T, U, ValueType>): React.ReactElement {
  const {
    value,
    onChange,
    onTableChange,
    returnType = 'array',
    addButtonText = '添加人员',
    selectValueEnum,
    selectWidth = 200,
    placeholder = '请添加人员',
    rowKey,
    selectDataRender,
    proFormTableProps,
    modalWidth = 800,
    mode = 'multiple',
    rowKeyType = 'string',
    delimiter = ',',
  } = props;
  // select的下拉数据源
  const [options, setOptions] = useState<SelectProps['options']>([]);
  // 处理select的数据源
  useEffect(() => {
    let obj: T[] = [];
    if (typeof selectValueEnum === 'function') {
      obj = selectValueEnum();
    } else if (!selectValueEnum || typeof selectValueEnum === 'object') {
      obj = selectValueEnum || [];
    }
    const source: SelectProps['options'] = [];
    obj.forEach((item) => {
      const dom = selectDataRender(item);
      source.push({
        label: dom,
        value: item[rowKey],
      });
    });

    setOptions(source);
  }, [selectValueEnum]);
  const [renderTable, setrenderTable] = useState(1);
  // 选中的值
  const [selectValue, setselectValue] = useState<typeof value>(value);

  // 将value数据转换成slect能显示的值
  const handleValueReturnSelectVale = (
    v: typeof value,
  ): stringOrNumber | stringOrNumber[] | undefined => {
    if (mode !== 'single' && returnType === 'string') {
      // 将字符串转换为数组
      if (!v) return [];
      const arr = ((v || '') as string).split(delimiter);
      if (rowKeyType === 'string') {
        return arr;
      } else {
        return arr.map((item) => Number(item));
      }
    }
    return v;
  };
  useEffect(() => {
    setselectValue(value);
  }, [value]);
  // proformtable params
  const [open, setOpen] = useState(false);
  /** 被table选择的数据 value的暂存值 */
  const [tempValue, setTempValue] = useState<typeof value>();
  useEffect(() => {
    if (open) {
      setTempValue(selectValue);
    } else {
      setTempValue(undefined);
    }
  }, [open]);
  return (
    <div>
      <Select
        mode={mode === 'single' ? undefined : mode}
        value={handleValueReturnSelectVale(selectValue)}
        style={{
          width: selectWidth,
        }}
        options={options}
        placeholder={placeholder}
        onChange={(v) => {
          if (mode === 'multiple' || mode === 'tags') {
            if (returnType === 'string') {
              const t = (v as stringOrNumber[]).join(delimiter);
              setselectValue(t);
              onChange?.(t);
              return;
            }
          }
          setselectValue(v);
          onChange?.(v);
        }}
      />

      <Button
        style={{ marginLeft: 5 }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {addButtonText}
      </Button>
      <Modal
        width={modalWidth}
        maskClosable={false}
        open={open}
        okText="添加"
        cancelText="取消"
        onOk={() => {
          setselectValue(tempValue);
          onChange?.(tempValue);
          setOpen(false);
        }}
        onCancel={() => {
          setrenderTable(renderTable + 1);
          setOpen(false);
        }}
      >
        <ProFormTable
          {...proFormTableProps}
          returnType={returnType}
          value={selectValue}
          rowKey={rowKey}
          onChange={(v, record: T[]) => {
            setTempValue(v);
            const o: SelectProps['options'] = [];
            // 去重
            record.forEach((item) => {
              const isExistence = options?.some((opi) => {
                return opi.value === item[rowKey];
              });
              if (isExistence) return;
              const dom = selectDataRender(item);
              o.push({
                value: item[rowKey],
                label: dom,
              });
            });
            setOptions([...o, ...(options as any[])]);
            onTableChange?.(record);
          }}
          rowKeyType={rowKeyType}
          selectionType={mode === 'single' ? 'radio' : 'checkbox'}
          delimiter={delimiter}
          reRenderTable={renderTable}
        />
      </Modal>
    </div>
  );
}
export default PersonnelSelector;
