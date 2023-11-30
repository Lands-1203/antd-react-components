---
nav:
  title: 组件
  order: 1
group: 全局UI组件
title: Footer
---

# Footer 页脚

系统平台页面下方的页脚

## 使用场景

略

## 代码演示

### 基本使用

```jsx
import React from 'react';
import { Footer } from '@lands/antd-react-components';
export default () => {
  return <Footer />;
};
```

### 自定义友情链接和公司名称

```jsx
import React from 'react';
import { Footer } from '@lands/antd-react-components';
import { BugOutlined } from '@ant-design/icons';

export default () => {
  return (
    <Footer
      companyName="某某公司"
      links={[
        {
          key: 'Business platform',
          title: '平台1',
          href: '/',
          blankTarget: true,
        },
        {
          key: 'hz',
          title: <BugOutlined />,
          href: '/',
          blankTarget: true,
        },
        {
          key: 'Financial gateway platform',
          title: '平台2',
          href: '/',
          blankTarget: true,
        },
      ]}
    />
  );
};
```

## API

### Props

| 属性        | 描述     | 是否必传 | 类型                                      | 默认值                         |
| ----------- | -------- | -------- | ----------------------------------------- | ------------------------------ |
| companyName | 公司名称 | 否       | `string \| undefined`                     | `lands科技（重庆）有限公司` |
| links       | 友情链接 | 否       | [linkProps[]](#link-props) \| `undefined` | `links `                       |

```ts
const links = [
  {
    key: 'Business platform',
    title: '业务平台',
    href: '/',
    blankTarget: true,
  },
  {
    key: 'hz',
    title: <GithubOutlined />,
    href: '/',
    blankTarget: true,
  },
  {
    key: 'Financial gateway platform',
    title: '金融网关平台',
    href: '/',
    blankTarget: true,
  },
];
```

### link props

| 属性        | 描述           | 是否必传 | 类型                   | 默认值 |
| ----------- | -------------- | -------- | ---------------------- | ------ |
| key         | 键值           | 否       | `string \| undefined`  |        |
| title       | 标题           | 是       | `React.ReactNode`      |        |
| href        | 链接           | 是       | `string`               |        |
| blankTarget | 是否新建标签页 | 否       | `boolean \| undefined` |        |

## 其他说明

无

## Tips

无
