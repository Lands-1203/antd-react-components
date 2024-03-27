module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (/\.less$/.test(path.node.source.value)) {
          path.node.source.value = path.node.source.value.replace(
            /\.less/,
            '.css',
          );
        }
      },
    },
  };
};
