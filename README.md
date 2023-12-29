## 介绍

本仓库是一个文档与组件集于一体的仓库，里面包含了一些常用的 react 组件，便于快速开发。
可以将本项目克隆下来后，自己发布到自己的私有库上。也可以直接访问到本项目的私有库，使用 `npm config set --global @lands:registry=https://npm.lantao.work`，或者在项目中 `.npmrc` 文件写入 `@lands:registry=https://npm.lantao.work/`，组件仓库长期开放，项目公开维护。

## 相关文档

[组件文档](https://procomponents.lantao.work/)

[组件私有库](https://npm.lantao.work)

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

MIT
