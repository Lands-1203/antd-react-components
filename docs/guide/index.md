---
nav:
  title: 指南
  order: 1
group: 使用指南
  order: -1
---

# 使用必看

使用该组件包的项目中必须存在以下依赖

```json
{
  "@ant-design/icons": "^5.0.1",
  "@ant-design/pro-components": "^2.4.14",
  "antd": "^5.4.4",
  "dayjs": "^1.11.7",
  "react": ">=16.9.0",
  "react-dom": ">=16.9.0"
}
```

- 使用 `npm config set --global @lands:registry=https://npm.lantao.work`，或者在项目中 `.npmrc` 文件写入 `@lands:registry=https://npm.lantao.work/`
- 使用 `pnpm i @lands/antd-react-components` 安装包，如果之前已经安装需要将原来的包删除后再安装。
