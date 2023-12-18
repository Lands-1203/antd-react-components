import { Select, SelectProps } from 'antd';
import React from 'react';
import './styles.less';

function SelectSquare(props: SelectProps) {
  return <Select {...props} showSearch virtual={false} />;
}
export default SelectSquare;
