import { Segmented } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { dynamicNavTheme as FN } from '../utils';
export type navThemeProps = 'light' | 'realDark';
export type navThemeValueProps = navThemeProps | 'auto';

export interface DynamicThemeProps {
  /**
   * @description 当组件选择了auto后会自动执行该函数，每10秒一次
   * @default utils.dynamicNavTheme
   */
  dynamicNavTheme?: () => navThemeProps;
  /**
   * @description 组件的返回值'light' | 'realDark'| 'auto' 会存入localStorageKey的本地缓存中
   * @default '__navTheme''
   */
  localStorageKey?: string;
  /** @description 发生了改变后，会自动调用onChange。值为'light' | 'realDark'*/
  onChange?: (v: navThemeProps) => void;
}

/** @description 一个Segmented三选框 分别是三个值'light' | 'realDark'| 'auto'，用于系统控制暗黑模式的组件 */
const DynamicTheme: React.FC<DynamicThemeProps> = (props) => {
  const {
    onChange,
    dynamicNavTheme = FN,
    localStorageKey = '__navTheme',
  } = props;

  const timeoutRef = useRef<NodeJS.Timeout>();
  const defaultNavTheme = useMemo(() => {
    return (localStorage.getItem(localStorageKey) ||
      'light') as navThemeValueProps;
  }, []);

  const oldNavTheme = useRef<navThemeProps>(
    defaultNavTheme === 'auto' ? dynamicNavTheme() : defaultNavTheme,
  );
  const [nowValue, setNowValue] = useState<navThemeValueProps>(defaultNavTheme);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (nowValue !== 'auto') return;
    timeoutRef.current = setInterval(() => {
      const theme = dynamicNavTheme();
      if (theme !== oldNavTheme.current) {
        oldNavTheme.current = theme;
        onChange?.(theme);
      }
    }, 5000);
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [nowValue]);

  return (
    <Segmented
      key={'navTheme'}
      defaultValue={localStorage.getItem(localStorageKey) || 'light'}
      onChange={(v: any) => {
        localStorage.setItem(localStorageKey, v);
        setNowValue(v);
        const value = v === 'auto' ? dynamicNavTheme() : v;
        oldNavTheme.current = value;
        onChange?.(value);
      }}
      options={[
        {
          value: 'light',
          icon: '🌞',
        },
        {
          value: 'auto',
          icon: '🌓',
        },
        {
          value: 'realDark',
          icon: '🌜',
        },
      ]}
    />
  );
};
export default DynamicTheme;
