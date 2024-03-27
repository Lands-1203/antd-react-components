---
# 同时设置分组名称和顺序，order 越小越靠前，默认为 0
nav:
  title: 更新日志
  order: 30
---

# 变更日志

## 1.0.0

### 💥 功能新增

- 更新了部分样式
- 修复了部分文档说明
- 修改项目名 发布 npm 仓库和私有库

## 0.2.0

### 💥 功能新增

- 添加一些工具方法
- 拓展 ProTableEdit

## 0.1.1-bate.12

### 💥 功能新增

- 添加 ModalView 组件
- 添加 downloadFile 下载文件方法
- 添加 lookFile 查看文件方法

## 0.1.0-bate.0.1

### 💥 功能新增

- 添加 ModalList 组件

## 0.1.0

### 💥 功能新增

- 新增 layout 的高阶组件`NoShowTabs`
- proEdit 添加一些属性和方法

### 🐛 功能修复

- 修复 layouttabs 无法监听显示的问题
- 修复 layouttabs bug
- 修改组件内跳转方式 使用 react-router 钩子跳转
- 修改获取登录重定向方法
- proEdit 废弃了一些字段

## 0.0.6

### 💥 功能新增

- 新增柯里化函数
- 新增 ProEditForm editActionRef 对象和 editFormRef
- 修改获取登录地址和登录重定向地址
- 修改组件内跳转方式，修改成 react-router 的 usenavigate 钩子，兼容性更强

### 🔥 删除功能

- 废弃`initData` `getEditFormRef` `getEditActionRef`

## 0.0.5 (2023-06-07)

### 💥 功能新增

- 添加主题色切换组件
- 更新部分依赖版本

## 0.0.4 (2023-06-06)

### 🐛 BUG 修復

- 修复若干 BUG

### 📝 编修文档

- 完善文档

## 0.0.4 (2023-06-05)

### 🐛 BUG 修復

- 修改获取 UUID BUG

## 0.0.3 (2023-06-01)

### 📝 小修改

- 更新文档，更新了部分组件的参数类型，兼容原始版本，是组件类型提示更完善

## 0.0.2 (2023-05-19)

### 🔥 删除功能

- 移除 Cascader 升级版级联选择组件

## 0.0.1 (2023-05-19)

### ✨ 新功能

- Cascader 升级版级联选择组件
- DynamicTheme 主题选择器组件
- Footer 全局 footer 组件
- LayouTabs 全局快捷访问菜单组件
- ProFormTable 表格选择器 表单组件
- ProTableEdit 表单编辑框组件
- SearchTree 搜索树组件
- SelectSquare 下拉多列选择框组件
- utils 工具 API
- validator 表单校验器
- event 监听者模式 工具
