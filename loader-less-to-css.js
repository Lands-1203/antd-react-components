const path = require('path');
const less = require('less');
const postcss = require('postcss');
const syntax = require('postcss-less');
const atImport = require('postcss-import');
const autoprefixer = require('autoprefixer');

const loader = function (lessContent) {
  const cb = this.async();
  this.setOutputOptions({
    ext: '.css',
  });
  postcss([
    autoprefixer({
      // 提升兼容性
      overrideBrowserslist: ['last 10 versions'],
    }),
    atImport({
      resolve: (id) => {
        const currentPath = this.resource;
        if (id.startsWith('@')) {
          // 处理别名路径，把 @ 替换成 src
          const srcPath = path.join(__filename, './src');
          const targetPath = id.replace(/^@/, srcPath);
          return targetPath;
        } else {
          // 处理相对路径
          const relativePath = id;
          const targetPath = path.resolve(currentPath, '..', relativePath);
          return targetPath;
        }
      },
    }),
  ])
    .process(lessContent, { syntax })
    .then((result) => {
      // less 转 css
      less.render(result.content, (err, css) => {
        if (err) {
          console.error(err);
          return;
        }
        cb(null, css.css);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = loader;
