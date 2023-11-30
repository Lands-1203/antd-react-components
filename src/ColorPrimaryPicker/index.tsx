import { ColorPicker } from 'antd';
import { throttle } from 'lodash';
import React, { FC } from 'react';

interface IProps {
  onChange?: (v: string) => void;
}
/** 组件初始的默认颜色是主题色 */
const ColorPrimaryPicker: FC<IProps> = (props) => {
  return (
    <div style={{ display: 'flex' }}>
      <ColorPicker
        arrow={false}
        presets={[
          {
            label: '预设主题色',
            colors: [
              'rgb(24, 144, 255)',
              'rgb(245, 34, 45)',
              'rgb(250, 84, 28)',
              'rgb(250, 173, 20)',
              'rgb(19, 194, 194)',
              'rgb(82, 196, 26)',
              'rgb(47, 84, 235)',
              'rgb(114, 46, 209)',
            ],
          },
        ]}
        onChange={throttle((v) => {
          props?.onChange?.(v.toRgbString());
        }, 1000)}
      />
    </div>
  );
};
export default ColorPrimaryPicker;
