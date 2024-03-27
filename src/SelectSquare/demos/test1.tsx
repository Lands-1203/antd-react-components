import { utils } from '@lands-pro/antd-react-components';
import { Select } from 'antd';
import React from 'react';
import iconJson from '../assets/iconfont.json';
const { getIcon: geticon } = utils;

const options: {
  value: string;
  label: any;
}[] = [];
const getIcon = (
  icon: React.ReactNode,
  fontSize?: number | undefined,
  iconPrefixes?: string | undefined,
  iconfontUrl:
    | string
    | undefined = 'https://huize-dev.oss-cn-beijing.aliyuncs.com/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E9%A1%B9%E7%9B%AE%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/iconfont.js',
) => {
  return geticon(icon, fontSize, iconPrefixes, iconfontUrl);
};
const map = new Map();
iconJson.glyphs.forEach((item) => {
  options.push({
    label: (
      <div style={{ height: '20px' }}>
        <span style={{ height: '20px' }}>
          {getIcon(`icon-${item?.font_class}`)}
        </span>
        <span style={{ marginLeft: '10px' }}>{item?.name}</span>
      </div>
    ),
    value: `icon-${item?.font_class}`,
  });
  map.set(`icon-${item?.font_class}`, item?.name);
});
export default () => {
  return (
    <div>
      <Select
        placeholder="请选择图标"
        style={{ width: 300 }}
        // 自定义搜索
        filterOption={function (inputValue, option) {
          return (
            (option?.value as string).includes(inputValue) ||
            (map.get(option?.value) as string).includes(inputValue)
          );
        }}
        showSearch
        options={options}
      />
    </div>
  );
};
