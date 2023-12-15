---
nav:
  title: 组件
  order: 10
group: 全局UI组件
title: ModalView
---

# ModalView 文件查看器

使用 modal 嵌套 kkfile 无需像 [lookFile](/utils#%E5%9C%A8%E7%BA%BF%E6%9F%A5%E7%9C%8B%E6%96%87%E4%BB%B6) 打开新的浏览器查看文件

## 使用场景

在页面内部使用 modal 预览文件

## 代码演示

<code src="./demos/test.tsx" title="基本使用"></code>

## API

| 属性       | 描述                          | 类型         |
| ---------- | ----------------------------- | ------------ |
| open       | 使用该方法打开 Modal 预览文件 | `boolean`    |
| url        | 文件地址                      | `string`     |
| modalProps | 文件地址                      | `ModalProps` |

### 静态方法

#### `ModalView.open`

```ts
// 直接打开文件查看;
ModalView.open(url);
```

#### `ModalView.remove`

```ts
// 移除打开的modal DOM
ModalView.remove();
```

### ModalProps

antd 的 modal 组件的 props

## 其他说明

无

## Tips

无
