---
nav:
  title: 指南
  order: 0
group: 开发指南
order: 3
---

# 组件发布流程

- 使用 `npm login --registry http://npm.lantao.work`登录到私有仓库
- 发布前需修改版本号
- 测试发布使用`0.0.1-beta.1`形式，正式发布去掉`-beta.1`
- 正式发布需要再`/docs/log/index.md`注明发布的内容
- 使用 `npm publish --registry http://npm.lantao.work/` 发布到私有仓库
- 将组件文档发布到 linux：
  - 使用 `npm run docs:build` 打包组件文档项目
  - 将生成的 `lands-react-component-doc` 交给负责人上传发布
  - 后期会配置自动化工程，自动发布
