---
nav:
  title: 组件
  order: 10
group: 表单组件
title: PersonnelSelector
---

# PersonnelSelector 人员选择器

## 使用场景

## 代码演示

<!-- <code src='./demos/test1.tsx' title='作为表单展示的组件使用'></code> -->

<!-- <code src='./demos/test1.tsx' title='独立使用'></code>  -->

<code src='./demos/test3.tsx' title='不同模式'></code>

## API

### PersonnelSelector

| 属性              | 描述                                                 | 是否必传 | 类型                                                       | 默认值   |
| ----------------- | ---------------------------------------------------- | -------- | ---------------------------------------------------------- | -------- |
| rowKey            | 行键值,`value`接收的值是该值逗号隔开的字符串或者数组 | 是       | `string`                                                   |          |
| returnType        | 返回值的类型                                         | 否       | ` 'array' \| 'string'`                                     | `string` |
| value             | 值                                                   | 否       | `string \| string[]`                                       |          |
| onChange          | 值改变时的回调函数                                   | 否       | `(v: string \| string[]) => void`                          |          |
| selectWidth       | select 宽度                                          | 否       | `number \| 'sm' \| 'md' \| 'xl' \| 'xs' \| 'lg' \| string` | `200`    |
| modalWidth        | 弹窗的宽度                                           | 否       | `number \| 'sm' \| 'md' \| 'xl' \| 'xs' \| 'lg' \| string` | `800`    |
| placeholder       | 选择框的提示                                         | 否       | `string`                                                   |          |
| addButtonText     | 添加按钮的文字信息                                   | 否       | `string`                                                   |          |
| selectDataRender  | 初始数据的渲染方法 ,无该方法默认返回键值             | 否       | `(v: T) => React.ReactNode`                                |          |
| selectValueEnum   | 提供给下拉框的数据源                                 | 否       | ` (() => T[]) \| T[]`                                      |          |
| onTableChange     | 表格改变时触发                                       | 否       | `(T[])=>void`                                              |          |
| proFormTableProps | 表格选择器的参数                                     | 否       | [proFormTableProps](pro-form-table#proformtable)           |          |

## 其他说明

--

## Tips

--
