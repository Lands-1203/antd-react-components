---
nav:
  title: 组件
  order: 7
group: 全局UI组件
title: DelRecord
---

# DelRecord 表格中的删除按钮

## 使用场景

表格中的删除按钮

## 代码演示

<code src='./demos/test.tsx' title='标准使用'></code>

## API

### DelRecord

| 属性           | 描述                            | 是否必传 | 类型                                         |
| -------------- | ------------------------------- | -------- | -------------------------------------------- |
| rowKey         | 主键的 key 会直接复制给删除方法 | 是       | `string` \| `number`                         |
| rowValue       | 主键的值                        | 是       | `string` \| `number`                         |
| onDeleteMethod | 删除方法                        | 是       | `(params,option)=>Promise<{bizCode,bizMsg}>` |
| tableActionRef | 表格的操作 Ref                  | 否       | `ref`                                        |

## 其他说明

--

## Tips

--
