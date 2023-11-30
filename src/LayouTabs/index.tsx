/* eslint-disable @typescript-eslint/no-use-before-define */
import {
    AppstoreOutlined,
    CloseOutlined,
    RightOutlined,
} from '@ant-design/icons';
import type { MenuDataItem } from '@umijs/route-utils';
import { getMatchMenu, transformRoute } from '@umijs/route-utils';
import { Route } from '@umijs/route-utils/dist/types';
import { Dropdown, theme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import cs from 'classnames';
import React, { ComponentProps, FC, useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router';
import { navThemeProps } from '../DynamicTheme';
import getNewEmitter3 from '../event';
import { adjustColor } from '../utils';
import './style.less';

type GlobalTabsEventType = {
  '@lands_tabs_showGlobalTabBar': boolean;
  '@lands_tabs_clearGlobalTabBarList': void;
};

const EVENT = getNewEmitter3<GlobalTabsEventType>();

type List = MenuDataItem & {
  path: string;
};

export interface LayouTabsProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  /**
   * @description 菜单数据
   */
  menuData: MenuDataItem;
  /**
   * @description 当前主题
   * @default "light"
   */
  navTheme?: navThemeProps;
}
const TabsLayout: FC<LayouTabsProps> = ({
  menuData: initMenuRawData,
  navTheme = 'light',
  ...divProps
}) => {
  const navigate = useNavigate();
  const { useToken } = theme;
  const { token } = useToken();

  // 记录列表
  const [list, setList] = useState<List[]>([]);
  // 当前的key
  const [activeKey, setActiveKey] = useState<string>();
  const [show, setShow] = useState<boolean>(true);

  const currentPathConfig = useMemo(() => {
    const { menuData } = transformRoute(
      (initMenuRawData as Route[]) || [],
      undefined,
      undefined,
      true,
    );
    const result = getMatchMenu(location.pathname as string, menuData).pop();
    if (!stringEqual(result?.path, location.pathname)) {
      return null;
    }
    // 动态路由匹配
    return result;
  }, [location.pathname, initMenuRawData]);

  useEffect(() => {
    let path: string = location.pathname || '';
    path = path.substring(path.length - 1) === '/' ? path : `${path}/`;
    if (
      !currentPathConfig ||
      (currentPathConfig.children && currentPathConfig.children?.length > 0) ||
      !currentPathConfig.name
    ) {
      return;
    }

    setList((draft) => {
      if (
        !draft.some((v) => {
          return stringEqual(v.path, path);
        })
      ) {
        return draft.concat({
          ...currentPathConfig,
          path: `${currentPathConfig.path}/`,
        } as any);
      }

      return draft;
    });

    setActiveKey(path);
  }, [currentPathConfig, location.pathname]);

  useEffect(() => {
    document.body.style.setProperty(
      '--layout-tabs-active-bg-color',
      adjustColor(token.colorPrimary || '"#1890ff"', 0.98, 1),
    );
    document.body.style.setProperty(
      '--layout-tabs-active-bg-color-dark',
      adjustColor(token.colorPrimary || '"#1890ff"', 0.05, 1),
    );
  }, [token.colorPrimary]);

  const handleOnDragEnd: ComponentProps<typeof DragDropContext>['onDragEnd'] = (
    result: any,
  ) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index,
    );

    setList(newList);
  };

  // 水平滚动条监听滑动事件
  useEffect(() => {
    EVENT.on('@lands_tabs_showGlobalTabBar', (data: boolean) => {
      setShow(data);
    });
    EVENT.on('@lands_tabs_clearGlobalTabBarList', () => {
      setList([]);
    });
  }, []);

  const closeSelf = (targetKey: string | undefined) => {
    setList((draft) => {
      const findIndex = draft.findIndex((v) => v.path === targetKey);

      if (findIndex <= -1) {
        return draft;
      }

      if (draft[findIndex].path === activeKey) {
        const offsetActiveKey =
          findIndex + 1 < draft.length
            ? draft[findIndex + 1].path
            : findIndex - 1 >= 0
            ? draft[findIndex - 1].path
            : draft[0].path;

        setActiveKey(offsetActiveKey);
        navigate(offsetActiveKey);
      }
      const newList = draft.filter((_, i) => {
        return i !== findIndex;
      });

      return newList;
    });
  };

  const getDropMenu = (targetKey: string | undefined) => {
    const resultMenuArr: ItemType[] = [
      {
        key: '关闭其他',
        label: '关闭其他',
        icon: <CloseOutlined />,
        onClick: () => {
          setList((draft) => {
            const newList = draft.filter((v) => v.path === targetKey);
            setActiveKey(newList[0].path);
            navigate(newList[0].path);
            return newList;
          });
        },
      },
      {
        key: '关闭右侧',
        label: '关闭右侧',
        icon: <RightOutlined />,
        onClick: () => {
          setList((draft) => {
            const findIndex = draft.findIndex((v) => v.path === targetKey);
            const newList = draft.filter((_, i) => i <= findIndex);
            if (newList.findIndex((v) => v.path === activeKey) === -1) {
              setActiveKey(newList[newList.length - 1].path);
              navigate(newList[newList.length - 1].path);
            }
            return newList;
          });
        },
      },
      {
        key: '关闭左侧',
        label: '关闭左侧',
        icon: <RightOutlined />,
        onClick: () => {
          setList((draft) => {
            const findIndex = draft.findIndex((v) => v.path === targetKey);
            const newList = draft.filter((_, i) => i >= findIndex);
            if (newList.findIndex((v) => v.path === activeKey) === -1) {
              setActiveKey(newList[0].path);
              navigate(newList[0].path);
            }
            return newList;
          });
        },
      },
    ];
    if (list.length > 1) {
      resultMenuArr.push({
        key: '关闭',
        icon: <CloseOutlined />,
        onClick: closeSelf.bind(null, targetKey),
        label: '关闭',
      });
    }
    return resultMenuArr;
  };

  return show ? (
    <div
      className={`lands-layout-tabs-container-div ${divProps.className || ''}`}
      {...divProps}
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div
          className={cs('lands-layout-tabs', {
            'lands-layout-tabs-real-dark': navTheme === 'realDark',
          })}
        >
          <Droppable direction="horizontal" droppableId="droppable">
            {(wrapProvided: any, wrapSnapshot: any) => {
              return (
                <div
                  className={cs('lands-layout-tabs-list', {
                    'is-draging': wrapSnapshot.isUsingPlaceholder,
                  })}
                  {...wrapProvided.droppableProps}
                  ref={wrapProvided.innerRef}
                >
                  {list.map((item, index) => {
                    return (
                      <Draggable
                        key={item.path}
                        draggableId={item.path}
                        index={index}
                      >
                        {(provided: any) => (
                          <Dropdown
                            menu={{ items: getDropMenu(item.path) }}
                            trigger={['contextMenu']}
                          >
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cs('lands-layout-tabs-item', {
                                active: stringEqual(item.path, activeKey),
                                'real-dark': navTheme === 'realDark',
                              })}
                              onClick={() => {
                                if (stringEqual(item.path, activeKey)) {
                                  return;
                                }

                                setActiveKey(item.path);
                                navigate(item.path);
                              }}
                            >
                              <div className="lands-layout-tabs-item-label">
                                {item.icon}&nbsp;
                                {item.name}
                              </div>

                              {list.length > 1 && (
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();

                                    closeSelf(item.path);
                                  }}
                                  className="lands-layout-tabs-item-close"
                                >
                                  <CloseOutlined />
                                </div>
                              )}
                            </div>
                          </Dropdown>
                        )}
                      </Draggable>
                    );
                  })}
                  {wrapProvided.placeholder}
                </div>
              );
            }}
          </Droppable>

          <div className="lands-layout-tabs-extra">
            <Dropdown
              menu={{ items: getDropMenu(activeKey) }}
              trigger={['hover']}
            >
              <AppstoreOutlined />
            </Dropdown>
          </div>
        </div>
      </DragDropContext>
    </div>
  ) : (
    <></>
  );
};

/**
 * 对比路由是否相同 不区分大小写和尾部斜杠
 * @param string1
 * @param string2
 * @returns
 */
function stringEqual(
  string1: string | undefined,
  string2?: string | undefined,
): boolean {
  if (!string1 || !string2) return false;
  if (string1 === string2) return true;
  let shortStr = string1;
  let longtStr = string2;
  if (string1.length > string2.length) {
    shortStr = string2;
    longtStr = string1;
  }
  const lowerCaseStrs = [
    shortStr.toLocaleLowerCase(),
    `${shortStr}/`.toLocaleLowerCase(),
  ];
  return lowerCaseStrs.includes(longtStr.toLocaleLowerCase());
}
function reorder(list: any[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}
export function handleShowGlobalTabBar(v: boolean) {
  EVENT.emit('@lands_tabs_showGlobalTabBar', v);
}
export function clearGlobalTabs() {
  EVENT.emit('@lands_tabs_clearGlobalTabBarList', []);
}
export default TabsLayout;

export { default as NoShowTabs } from './NoShowTabs';

