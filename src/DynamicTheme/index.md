---
nav:
  title: 组件
  order: 10
group: 全局UI组件
title: DynamicTheme-主题切换器
---

# DynamicTheme 主题切换器

该组件的 `onChange` 会返回 `light` | `realDark`两个字符串，主题的变化根据这个`onChange`去实现。该组件基于[Segmented 分段控制器](https://ant.design/components/segmented-cn)封装

## 使用场景

平台需要用到主题切换时

## 代码演示

<code src='./demos/test1.tsx' title='使用解析' description="该组件会通过`onChange`返回值 如果选择的是自动 则每 5 秒钟刷新一次
一个 Segmented 三选框 分别是三个值'light' | 'realDark'| 'auto'，用于系统控制暗黑模式的组件"></code>

<code src='./demos/test2.tsx' title='基本使用' ></code>

## API

| 属性            | 描述                                                                  | 是否必传 | 类型                               | 默认值                  |
| --------------- | --------------------------------------------------------------------- | -------- | ---------------------------------- | ----------------------- |
| dynamicNavTheme | 当组件选择了 auto 后会自动执行该函数，每 5 秒一次                     | 否       | `() => navThemeProps \| undefined` | `utils.dynamicNavTheme` |
| localStorageKey | 组件的返回值`navThemeValueProps`会存入 `localStorageKey` 的本地缓存中 | 否       | `string \| undefined`              | `__navTheme`            |
| onChange        | 发生了改变后，值未变化不会重复调用,会自动调用`onChange`               | 否       | `function(v: navThemeProps)`       |

### navThemeProps

| 属性          | 描述     | 类型                |
| ------------- | -------- | ------------------- |
| navThemeProps | 导航主题 | `light \| realDark` |

### navThemeValueProps

| 属性               | 描述         | 类型                        |
| ------------------ | ------------ | --------------------------- |
| navThemeValueProps | 选择的按钮值 | `light \| realDark \| auto` |

## 其他说明

无

## Tips

无
