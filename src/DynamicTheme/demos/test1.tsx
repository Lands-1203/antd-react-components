import { DynamicTheme } from '@lands-pro/antd-react-components';
import { message } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

const dynamicNavTheme = (
  startTime: number[] = [19, 30, 0],
  endtTime: number[] = [6, 30, 0],
) => {
  const now = dayjs();
  const isBetween630and1930 =
    now.isBefore(
      dayjs().hour(startTime[0]).minute(startTime[1]).second(startTime[2]),
    ) &&
    now.isAfter(
      dayjs().hour(endtTime[0]).minute(endtTime[1]).second(endtTime[2]),
    );
  return isBetween630and1930 ? 'light' : 'realDark';
};
const navThemeKey = '__navTheme2';
export default () => {
  return (
    <DynamicTheme
      dynamicNavTheme={dynamicNavTheme}
      localStorageKey={navThemeKey}
      onChange={(v) => {
        message.info(v);
      }}
    />
  );
};
