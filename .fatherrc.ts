import { defineConfig } from 'father';
export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist' },
  extraBabelPlugins: [
    [
      './babel-less-to-css.js', // 把 js/ts 文件中的 '.less' 字符转为 '.css'
      {
        test: '\\.less',
      },
    ],
  ],
  plugins: [
    './loader.ts', // 实现 loader 功能
  ],
});
