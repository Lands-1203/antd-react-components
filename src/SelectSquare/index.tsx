import { Select } from 'antd';
import React from 'react';
import './styles.less';

type SelectProps = Parameters<typeof Select>[0];

function SelectSquare(props: SelectProps = {}) {
  return (
    <Select
      {...props}
      showSearch
      virtual={false}
      dropdownRender={function (originNode) {
        return (
          <div className="lands-select-square-dropdown-render">
            {originNode}
          </div>
        );
      }}
    />
  );
}
export default SelectSquare;
