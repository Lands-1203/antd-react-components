import type { IApi } from 'father';
import { addLoader, ILoaderItem } from 'father/dist/builder/bundless/loaders';

export default async (api: IApi) => {
  const loaders: ILoaderItem[] = await api.applyPlugins({
    key: 'addPostcssLoader',
    initialValue: [
      {
        key: 'less-to-css',
        test: /\.less$/,
        loader: require.resolve('./loader-less-to-css'), // less 文件转 css 文件
      },
    ],
  });

  loaders.forEach((loader) => addLoader(loader));
};
