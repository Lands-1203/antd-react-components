import { ProTableProps } from '@ant-design/pro-components';

export interface ProFormTableProps<
  T = Record<string, any>,
  U = any,
  ValueType = 'text',
> extends ProTableProps<T, U, ValueType> {
  /**
   * 主键
   * @description 主键
   */
  rowKey: any;
  /**
   * 给该组件的值
   * @description 给该组件的值
   */
  value?: stringOrNumber | stringOrNumber[] | undefined;
  /** 该组件值改变时会调用
   * @description 该组件值改变时会调用
   */
  onChange?: (
    v: stringOrNumber | stringOrNumber[] | undefined,
    record: Record[],
  ) => void;
  /**
   *  selectionType为checkbox时 返回给表单组件的数据类型，array为数组类型。string以','隔开的字符
   * @description selectionType为checkbox时 返回给表单组件的数据类型，array为数组类型。string以','隔开的字符
   */
  returnType?: 'array' | 'string';
  /** selectionType为checkbox时;并且returnType为string时，value的的字符间隔符
   * @default ','
   */
  delimiter?: string;
  /**
   * 表格选择模式
   * @default checkbox
   */
  selectionType?: 'checkbox' | 'radio';
  /**
   * 多选模式下，返回值为字符串类型时指定 需指定主键的类型
   * @default string
   */
  rowKeyType?: 'number' | 'string';
  /**
   * 值变化是会强制更新value
   */
  reRenderTable?: any;
}
