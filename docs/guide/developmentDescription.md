---
nav:
  title: 指南
  order: 0
group: 开发指南
order: 1
---

# 组件封装原则

- **不能**将具体项目中的环境变量引入到组件中，保持组件的独立性
- 一个组件文件夹包括但不仅限于 4 类文件：`index.tsx`、`typing.d.tsx`、`styles.less`、`index.md`(一般放在\docs\components)
- **样式名、类型名和组件命名一定要独立，不能重复！！！**

- 注释规则：
  - 组件的每个参数需要有注释
  - 参数类型和函数采用 `jsdoc` 注释`/** */`，一遍调用者能在调用的时候看到 API 的作用
- css 规则：
  - 不使用 `css Modules`，因为采用 `css Modules` 方式导入，会导致 `className` 不稳定，开发者无法覆写
  - 采用 `improt '\*.less'`或者`css-in-js`导入样式
  - css 类名规则 `lands-组件名-类名`
- TS 类型规则：
  - 组件的 `Props` 命名，采用 `组件名Props`,例如：`ProTableEditProps`
  - 组件的衍生 `Props` 命名，采用 `组件名-变量名`,例如：`ProTableEditColumns`
  - 简单类型使用 type 结尾命名。例如：`export type stringNumberType = string | number`
  - 复杂对象类型使用 props 结尾命名。例如：`export interface ProTableEditProps{ }` or `type ProFormTableProps = Record<string,any> & { ... }`
  - 组件相关类型首字符全部大写，驼峰命名
  - 局部不需要导出的类型，可自定规则。例如：组件的 Props(不导出)，可使用 `interface IProps{}` 定义
