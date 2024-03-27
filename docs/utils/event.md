---
nav:
  title: API
  order: 5
title: 全局监听
---

# 监听者模式

## 创建一个监听者模式

```ts
import { getNewEmitter3 } from '@lands-pro/antd-react-components/dist/event';
// 定义全局监听者的类型key
type GLOBAL_EVENT_Type = {
  '@lands_tabs_showGlobalTabBar': boolean;
};
// 创建一个监听者导出

export const GLOBAL_EVENT = getNewEmitter3<GLOBAL_EVENT_Type>();

// 发起
GLOBAL_EVENT.emit('@lands_tabs_clearGlobalTabBarList', [...data]);
// 监听
GLOBAL_EVENT.on('@lands_tabs_clearGlobalTabBarList', (data) => {
  console.log(data);
});
```
