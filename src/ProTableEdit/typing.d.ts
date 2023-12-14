import type {
  ActionType,
  ProColumns,
  ProTableProps,
} from '@ant-design/pro-components';
import type { FormInstance, ModalProps } from 'antd';
import { ReactNode } from 'react';

export type ProTableEditOnSubmit =
  | ((
      body: Record<string, any>,
      options?: Record<string, any> | undefined,
    ) => Promise<Record<string, any>>)
  | (() => Promise<any>)
  | undefined;

type subMethodProps = string | '' | 'PUT' | 'POST' | 'GET';

type onSubBeforeProps = (v: {
  params: Record<string, any>;
  editRef: React.MutableRefObject<FormInstance<any> | undefined>;
}) => Promise<onSubBeforeReturunProps> | onSubBeforeReturunProps;

export interface onSubBeforeReturunProps {
  /**
   * @description  是否进行下一步网络请求 （调用onSubmit方法）
   */
  toNext?: boolean;
  /**
   * @description  提供给 （调用onSubmit方法）的params参数
   */
  params?: Record<string, any>;
  /**
   * @description 是否显示错误信息
   */
  isShowError?: boolean;
  /**
   * @description 错误信息
   */
  errorMsg?: string;
  /**
   * @description 是否显示成功信息信息
   */
  isShowSuccess?: boolean;
  /**
   * @description 成功信息信息
   */
  successMsg?: string;
}
type onSubCallbackProps = (v: {
  /**
   * @description onSubmit 请求方法的参数
   */
  params: Record<string, any>;
  /**
   * @description 表单的实体对象 能获取表单的数据
   */
  editRef: React.MutableRefObject<FormInstance<any> | undefined>;
  /**
   * @description onSubmit 请求方法的返回值
   */
  res: Record<string, any>;
}) => void;

export type ProTableEditColumns<T = any> = ProColumns<T> & {
  /**
   * @description 不重置该值
   */
  immunityReset?: boolean;
};

export interface ProTableEditInitData {
  /**
   * @description 表单数据的主键
   */
  dataKey?: string | number;
  /**
   * @description 表单数据
   */
  data?: Record<string, any>;
}
type layouProps = 'vertical' | 'inline' | 'horizontal';
interface editActionRefProps<
  T extends Record<string, any> = Record<string, any>,
> extends ActionType {
  /** 打开编辑框 */
  open: () => void;
  /** 关闭编辑框 */
  close: () => void;
  /**
   * 设置编辑框的初始值 与editFormRef不同点在于，使用该方法设置后，表单不存在的表单项key对应的数据会保留
   * @param v T
   * @returns void
   */
  setInitData: (v: T & Record<string, any>) => void;
  /**
   * 获取当前的数据
   */
  initData: T & Record<string, any>;
  /**
   * 获取当前的数据主键
   */
  initDataKey: string | number;
  /**
   * 设置modal的title
   */
  setModalTitle: (v: ReactNode) => void;
}

export interface ProTableEditProps<T = any> {
  /**
   * @description modaldetitle
   */
  modalTitle?: string;
  /**
   * @description modal宽度
   */
  modalWidth?: ModalProps['width'];
  /**
   * @description 符合Protable['columns']的对象数组
   */
  columns: ProTableEditColumns<T>[];
  /**
   * @description 显示状态
   */
  open?: boolean;
  /**
   * @description 表单的横纵排列方式
   * @default horizontal
   */
  layout?: layouProps;
  /**
   * @description 控制显示状态
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * @description 点击确认后的请求方法
   */
  onSubmit?: ProTableEditOnSubmit;
  /**
   * @description 发送请求时携带的额外参数
   */
  subParams?: Record<string, any>;
  /**
   * @description 发送请求时删除的表单参数 一维数组中是string是代表 删除params[key]；一维数组中是一个数组时 代表删除params[key1][key2]
   * @example [id,[key1,key2],username]
   */
  subParamsDel?: Array<string | string[] | number | number[]>;
  /**
   * @description 默认不传，在新增和修改的时候用于改变请求方式。onSubmit上自带有请求方式，修改和新增接口相同请求方式不同
   */
  subMethod?: subMethodProps;
  /**
   * @description 提交前调用，是一个异步方法
   */
  onSubBefore?: onSubBeforeProps;
  /**
   * @description 提交完成后回调
   */
  onSubCallback?: onSubCallbackProps;
  /**
   * @description 取消操作回调
   */
  onCancel?: () => void;
  /**
   * @description 提交前格式化params
   */
  formatParams?: (params: Record<string, any>) => Record<string, any>;
  editActionRef?: React.MutableRefObject<editActionRefProps | undefined>;
  /**
   * @description 表格的form操作对象
   */
  tableActionRef?: React.MutableRefObject<ActionType | undefined>;

  /**
   * @description 当前表单的form操作对象
   * @deprecated 请使用editActionRef属性
   */
  getEditActionRef?: (ref: React.MutableRefObject<ActionType>) => void;
  /**
   *  @description 当前表单的FormInstance对象
   */
  editFormRef?: React.MutableRefObject<FormInstance<any> | undefined>;
  /**
   *
   * @description 当前表单的form操作对象
   * @deprecated 请使用editFormRef属性
   */
  getEditFormRef?: (ref: React.MutableRefObject<FormInstance<any>>) => void;
  /**
   * @description ProTable的配置项
   * @link https://procomponents.ant.design/components/table#protable
   */
  proTableProps?: ProTableProps<any, any>;
  /**
   * @description Modal的配置项
   */
  modalProps?: ModalProps;
  /**
   * @description 初始数据 其中dataKey编辑主键值，data初始数据
   * @deprecated 请使用initDataKey 和 EditActionRef 实现
   */
  initData?: ProTableEditInitData;
  /**
   * @description 初始数据中的编辑主键key 该值会判断请求的方式 如果initDataKey中对应的变量有值 则使用PUT方法否则使用POST方法，该模式可根据参数subMethod强制改变
   */
  initDataKey?: string | number | (string | number)[];
  /**
   * @description 表单初始数据
   */
  formInitData?: Record<string, any>;
  /**
   * @description 是否中央提示框
   * @default true
   */
  isMessage?: boolean;
  /**
   * @description 操作完成后是否更新table
   * @default true
   */
  isUpdate?: boolean;
  /**
   * @description 确认按钮文本
   */
  okText?: string;
  /**
   * @description 取消按钮文本
   */
  cancelText?: string;
  /**
   * @description 是否携带初始参数
   * 如果该值为false 则不会带着initData.data数据，只会带着initData.data[initdata.dataKey]
   * @default true
   */
  isCarryingInitialParams?: boolean;
}
