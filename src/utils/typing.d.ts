export type dateTypeProps =
  | 'date'
  | 'dateTime'
  | 'dateWeek'
  | 'dateMonth'
  | 'dateQuarter'
  | 'dateYear'
  | 'dateRange'
  | 'dateTimeRange'
  | 'time'
  | 'timeRange';

interface IListToTree {
  /**
   * @description list数据
   */
  data: Record<NumberString, any>[];
  /**
   * @description list数据中的主键Key
   * @default id
   */
  id?: NumberString;
  /**
   * @description list数据中的上级ID
   * @default parentId
   */
  pid?: NumberString;
  /**
   * @description list转树时，用该字符串存储它的子对象数组
   * @default children
   */
  children?: NumberString;
  /**
   * @description 将list数据中的某些数据，复制一份到该对象中的其他变量
   * @example {oldField:['id','menuName'],field:['key','title']}
   */
  F?: { oldField: NumberString[]; field: NumberString[] };
  /**
   * @description 在返回的对象中，删除  选中`data[key]`,当数据 `data[key] === value` 时,删除自身或者删除field对应的数据
   * @example {oldField:['id','menuName'],field:['key','title']}
   */
  D?: {
    /**
     * @description 选中`data[key]`
     */
    key: NumberString;
    /**
     * 当数据 `data[key] === value` 时
     */
    value: any;
    /**
     * @description 要删除的对象
     * @example ['id','menuName']
     */
    field?: NumberString[];
    /**
     * @description 删除自身对象？
     */
    self?: boolean;
  };
  /**
   * @description 顶点数组
   */
  vertex?: NumberString[];
}

/**
 * @description 给T对象添加一个U属性
 */
type ListToTreeReturnProps<T, U> = T & { [key in U]: T };

/**
 * @type T代表传入函数的类型
 * @type First代表第一次进入的参数
 */
type CurryFunc<T, First extends any[]> = T extends (
  ...args: infer Args
) => infer R
  ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Args extends [...First, infer Mid, ...infer Tail]
    ? (v: Mid) => CurryFunc<T, [...First, Mid]>
    : R
  : T;

interface IToValueEnumProps {
  dict?: Record<string, any>[];
  start?: number;
  end?: number;
  fieldName?: { textString?: string; valueString?: string };
  keyType?: 'string' | 'number' | 'boolean';
}
interface copyAddProps {
  data: Record<string, any>[];
  F?: { oldField: string[]; field: string[] };
  D?: { field?: string[]; self?: boolean; key?: string; value?: string };
  onCallback?: (item: Record<string, any>) => Record<string, any>;
}
