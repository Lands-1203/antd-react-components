import React, { useEffect } from 'react';
import { handleShowGlobalTabBar } from './index';

/** 控制tabs是否显示的组件 */
export default (WrappedComponent: React.FC<any>) => {
  return () => {
    useEffect(() => {
      handleShowGlobalTabBar(false);
      return () => {
        handleShowGlobalTabBar(true);
      };
    }, []);
    return <WrappedComponent />;
  };
};
