export interface SearchListDataProps extends Record<string, any> {
  title: string;
  key: string;
}
export interface SearchTreeDataProps extends Record<string, any> {
  title: string;
  key: string;
  children: SearchTreeDataProps[];
}
export interface SearchTreeProps {
  /**
   * @description 树形结构数据
   */
  dataTree: SearchTreeDataProps[];
  /**
   * @description 数组结构数据
   */
  dataList: SearchListDataProps[];
  /**
   * @description 选择展开的ID
   * @default ['']
   */
  defaultExpandedKeys?: string[];
  /**
   * @description 是否将半选状态的key设置入表单
   * @default false
   */
  isHalfCheckedKeys?: boolean;
  /**
   * @description 作为表单输入组件的时候 返回的值是否是string类型
   */
  stringType?: boolean;
  /**
   * @description 作为表单输入组件的时候 值改变时的回调 表单组件会自动感知
   */
  onChange?: (v: stringNumberType | stringNumberType[]) => void;
  /**
   * @description 作为表单输入组件的时候 传入的值 表单组件会自动感知
   */
  value?: stringNumberType | stringNumberType[];
  /**
   * @description antd Tree Props
   * @link https://ant.design/components/tree-cn#tree-props
   */
  TreeProps?: TreeProps;
  /**
   * @description 是否显示边框
   */
  border?: boolean;
}
