import { Checkbox } from 'antd';
import React, { FC, useEffect, useState } from 'react';
export interface booleanCheckboxProps {
  value?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
}
const BooleanCheckbox: FC<booleanCheckboxProps> = (props) => {
  const { value, onChange, defaultChecked } = props;
  const [checked, setChecked] = useState(defaultChecked);
  const [disabled, setDisabled] = useState(props.disabled);

  useEffect(() => {
    setChecked(value);
  }, [value]);
  useEffect(() => {
    setDisabled(props.disabled);
  }, [props.disabled]);
  return (
    <Checkbox
      disabled={disabled}
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        onChange?.(e.target.checked);
      }}
    />
  );
};
export default BooleanCheckbox;
