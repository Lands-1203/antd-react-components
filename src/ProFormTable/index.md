---
nav:
  title: 组件
  order: 10
group: 表单组件
title: ProFormTable
---

# ProFormTable 表格选择器

表单组件-该组件自带表单组件效果。该组件基于[ProTable](https://procomponents.ant.design/components/table)封装

## 使用场景

在开发中遇到勾选表格，返回 `ids` 给表单时

## 代码演示

<code src='./demos/test1.tsx' title='基本使用'></code>
<code src='./demos/test2.tsx' title='返回值为数组'></code>
<code src='./demos/test3.tsx' title='动态调试'></code>
<code src='./demos/test4.tsx' title='不在form中使用'></code>

## API

### ProFormTable

| 属性          | 描述                                                                                   | 是否必传 | 默认值     | 类型                  |
| ------------- | -------------------------------------------------------------------------------------- | -------- | ---------- | --------------------- |
| rowKey        | 行键值,`value`接收的值是该值逗号隔开的字符串                                           | 是       |            | `number \| string`    |
| value         | 值                                                                                     | 否       |            | `string`              |
| onChange      | 值改变时的回调函数                                                                     | 否       |            | `(v: string) => void` |
| returnType    | 返回值的类型                                                                           | 否       | 'string'   | `'array' \| 'string'` |
| selectionType | 表格选择模式                                                                           | 否       | 'checkbox' | `'checkbox'\|'radio'` |
| delimiter     | 分隔符,selectionType 为 checkbox 时;并且 returnType 为 string 时，value 的的字符间隔符 | 否       | ','        | `string`              |
| rowKeyType    | 多选模式下，返回值为字符串类型时指定 需指定主键的类型                                  | 是       | 'string'   | `number \| string`    |

## 其他说明

无

## Tips

- 该组件可能会出现一个 Warning `Warning: validateDOMNesting(...): <form> cannot appear as a descendant of <form>.`。这个是 HTML 规范报出来的 Warning，因为 HTML 规定不能 from 中不能嵌套 from，因为该组件自带一个搜索 from。
