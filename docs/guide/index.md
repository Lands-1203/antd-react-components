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

## 该包发布在了私有库和 npm 公有库

### 使用 npm 库

使用 `pnpm i @lands-pro/antd-react-components` 安装包

### 使用私有库包

- 使用 `npm config set --global @lands-pro:registry=http://npm.lantao.work`，或者在项目中 `.npmrc` 文件写入 `@lands-pro:registry=http://npm.lantao.work/`
- 使用 `pnpm i @lands-pro/antd-react-components` 安装包，如果之前已经安装需要将原来的包删除后再安装。
