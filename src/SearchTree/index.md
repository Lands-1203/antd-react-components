---
nav:
  title: 组件
  order: 10
group: 表单组件
title: SearchTree-搜索树
---

# SearchTree 搜索树

一个带搜索功能的树形组件，可用于显示和作为表单组件使用，宽度自适应父组件。该组件基于[TreeSelect](https://ant.design/components/tree-select-cn)封装

## 使用场景

当渲染一个树形组件的时候，并且这个树形数据层级较深，就可以使用该搜索树，方便用户快速选择自己的数据

## 代码演示

<code src='./demos/test1.tsx' title='作为展示的组件使用'></code>
<code src='./demos/test2.tsx' title='作为输入组件使用'></code>
<code src='./demos/test3.tsx' title='作为表单组件使用'></code>

## API

### SearchTree

| 属性                | 描述                                                     | 是否必传 | 类型                                                                 |
| ------------------- | -------------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| dataList            | 数组结构数据                                             | 是       | [SearchListDataProps[]](#searchlistdataprops)                        |
| dataTree            | 树形结构数据                                             | 是       | [SearchTreeDataProps[]](#searchtreedataprops)                        |
| defaultExpandedKeys | 选择展开的 ID                                            | 否       | `string[]`                                                           |
| isHalfCheckedKeys   | 是否将半选状态的 key 设置入表单                          | 否       | `boolean`                                                            |
| stringType          | 作为表单输入组件的时候返回的值是否是 string 类型         | 否       | `boolean`                                                            |
| onChange            | 作为表单输入组件的时候值改变时的回调，表单组件会自动感知 | 否       | `function(value)`                                                    |
| value               | 作为表单输入组件的时候传入的值，表单组件会自动感知       | 否       | [stringNumberType](#stringnumbertype) `stringNumberType[]`           |
| TreeProps           | antd Tree 组件的属性                                     | 否       | [TreeProps](https://ant.design/components/tree-select-cn#tree-props) |
| border              | 是否显示边框                                             | 否       | `boolean`                                                            |

### stringNumberType

| 属性             | 类型               |
| ---------------- | ------------------ |
| stringNumberType | `string`\|`number` |

### SearchListDataProps

| 属性  | 描述 | 是否必传 | 类型     |
| ----- | ---- | -------- | -------- |
| title | 标题 | 是       | `string` |
| key   | 键名 | 是       | `string` |

### SearchTreeDataProps

| 属性     | 描述           | 是否必传 | 类型                    |
| -------- | -------------- | -------- | ----------------------- |
| title    | 标题           | 是       | `string`                |
| key      | 键名           | 是       | `string`                |
| children | 子节点数据数组 | 是       | `SearchTreeDataProps[]` |

## 其他说明

--

## Tips

- 在 `dataTree` 和 `dataList` 没有获得数据的时候，传入 `defaultExpandedKeys` 是不会生效的
