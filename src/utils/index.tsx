import { createFromIconfontCN } from '@ant-design/icons';
import { Tag, message } from 'antd';
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import saveAs from 'file-saver';
import { Base64 } from 'js-base64';
import React from 'react';
import { hexToRgb, hslToRgb, rgbToHsl } from './color';
import {
  CurryFunc,
  IListToTree,
  IToValueEnumProps,
  ListToTreeReturnProps,
  copyAddProps,
  dateTypeProps,
} from './typing';
const { v4 } = require('uuid');
const advancedFormat = require('dayjs/plugin/advancedFormat');
const isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);

type NumberString = number | string;

/**
 * @author 兰涛
 * @description 判断当前是否处于开发模式 process.env.NODE_ENV !== 'production'
 */
export const isDev = process.env.NODE_ENV !== 'production';

export const globalPath = {
  loginPath: '/user/login',
  get loginPathRedirect() {
    return location.pathname !== '/'
      ? `${this.loginPath}?redirect=${location.pathname}`
      : this.loginPath;
  },
};

export const getUUID = v4;

/**
 * @author 兰涛
 * @description list转map 该方法会影响原始对象
 * @param data list数据
 * @param key list中用key值作为map的键
 * @param  F 将list数据中的某些数据，复制一份到该对象中的其他变量 :{oldField:['id','menuName'],field:['key','title']}
 * @param  D 删除的对象数据 一维数组中是string是代表 删除params[key]；一维数组中是数组时 代表删除params[key1][key2] :[id,[xxx,id]] 目前支持两层
 * @returns
 */
export function listToMap<T = Record<NumberString, any>>(
  data: Record<NumberString | symbol, any>[],
  key: NumberString,
  F?: { oldField: NumberString[]; field: NumberString[] } | null,
  D: Array<NumberString | NumberString[]> = ['children'],
): Record<NumberString | symbol, T> {
  const map: Record<string, any> = {};
  data.forEach(async (item) => {
    // 衍生指定对象
    if (F?.field.length === F?.oldField.length) {
      F?.field.forEach((addStr, i) => {
        item[addStr] = item[F.oldField[i]];
      });
    }
    const mapKey = item[key];
    // 删除指定对象
    D?.forEach((d) => {
      if (d instanceof Array) {
        let temporary = item;
        d.forEach((v, i) => {
          if (i !== d.length) {
            temporary = temporary[v];
          }
        });
        delete temporary[d[d.length - 1]];
        return;
      }
      delete item[d];
    });
    // 通过每个对象中的ID生成一个key为ID的map数组
    map[mapKey] = item;
  });

  return map;
}
/**
 * @author 兰涛
 * @description tree转map 该方法会影响原始对象
 * @param data tree数据
 * @param key tree中用key值作为map的键
 * @param childrenKey 子元素的key childrenKey = 'children'
 * @param isDelChildren 是否删除 data[children]
 * @returns
 */
export function treeToMap<T = Record<NumberString | symbol, any>>(
  data: Record<NumberString, any>[],
  key: NumberString,
  childrenKey = 'children',
  isDelChildren: boolean = true,
): Record<NumberString | symbol, T> {
  const map: Record<string, any> = {};
  function recu(itemData: Record<string, any>[]) {
    itemData.forEach(async (item) => {
      if (item[childrenKey] && item[childrenKey] instanceof Array) {
        const children = item[childrenKey];
        recu(children);
        // 如果对象中有children则删除
        isDelChildren && delete item[childrenKey];
      }
      // 通过每个对象中的ID生成一个key为ID的map数组
      map[item[key]] = item;
    });
  }
  recu(data);
  return map;
}
/**
 * @author 兰涛
 * @description 对象数组转树  兼容多棵树 多个顶点情况，该方法会影响原始对象，如果不想影响原始对象请使用JSON.stringfly复制一份处理
 * @param data 元数据对象数组
 * @param id 对象唯一ID名称
 * @param pid 父ID名称
 * @param children 存储子对象的对象名
 * @param F 衍生对象
 * @param D 删除对象
 * @param vertex 顶级`pid`值 如果该对象没有值会自动计算顶点，可指定顶点
 * @returns `(T & children)[]`
 *
 */
export function listToTree<
  T = Record<NumberString, any>,
  U extends NumberString = 'children',
>({
  data = [],
  id = 'id',
  pid = 'parentId',
  children = 'children',
  F,
  D,
  vertex,
}: IListToTree): ListToTreeReturnProps<T, U>[] {
  if (!data.length) return [];
  const map: Record<string, any> = {};
  const tree: ListToTreeReturnProps<T, U>[] = [];
  data.forEach(async (item, i) => {
    // 如果对象中有children则删除
    item[children] && delete item[children];

    // 菜单请求当前工具类时
    data[i].icon && (data[i].Icon = getIcon(data[i].icon)); // 根据icon衍生Icon dom对象
    // 衍生新数据
    F?.oldField.forEach((v, k) => {
      item[F?.field[k]] = item[v];
    });
    // 删除数据
    if (D && item?.[D?.key] === D?.value) {
      if (D.self) {
        delete data[i];
      } else {
        D?.field &&
          D?.field.forEach((df) => {
            delete data[i]?.[df];
          });
      }
    }
    // 通过每个对象中的ID生成一个key为ID的map数组
    map[item[id]] = item;
  });
  let keyValueArr: NumberString[] = vertex || [];
  if (!vertex?.length) {
    // 寻找Pid
    for (const item of data) {
      if (!item) {
        continue;
      }
      if (!Object.keys(map).includes(item[pid])) {
        if (!keyValueArr.includes(item[pid])) {
          keyValueArr.push(item[pid]);
        }
      }
    }
  }
  data.forEach((item) => {
    if (!keyValueArr.includes(item[pid])) {
      if (!map[item[pid]]) {
        return;
      }
      map[item[pid]][children] = map[item[pid]]?.[children] || [];
      map[item[pid]][children].push(item);
    } else {
      tree.push(item as ListToTreeReturnProps<T, U>);
    }
  });
  return tree || [];
}
/**
 * @author 兰涛
 * @description 生产icon图标
 * @param icon 图标的icon string
 * @param fontSize 图标大小
 * @param iconPrefixes 图标前缀
 * @param iconfontUrl 图标地址 默认/icon/iconfont.js
 * @returns icon图标
 */
export const getIcon = (
  icon?: string | React.ReactNode,
  fontSize: number = 20,
  iconPrefixes: string = 'icon-',
  iconfontUrl = 'https://huize-dev.oss-cn-beijing.aliyuncs.com/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91/%E9%A1%B9%E7%9B%AE%E9%9D%99%E6%80%81%E8%B5%84%E6%BA%90/iconfont.js',
): React.ReactNode => {
  const IconFont = createFromIconfontCN({
    // 以下是默认值，也可以按需要指定
    scriptUrl: iconfontUrl,
  });
  if (typeof icon === 'string') {
    // 可加入多种图标类型的兼容写法，此处省略
    if (icon.startsWith(iconPrefixes)) {
      return (
        <IconFont
          type={icon}
          className={icon}
          style={{ fontSize, height: '100%' }}
        />
      );
    }
  }
  return icon;
};

/**
 * @author 兰涛
 * @description 将dayjs数据转换为string|number
 * @param time dayjs时间对象
 * @param dateType 时间类型
 * @returns string
 */
export const formatDate = (
  date: dayjs.Dayjs | dayjs.Dayjs[] | Date | Date[],
  dateType: dateTypeProps,
) => {
  if (date instanceof Array) {
    for (const dayItem of date) {
      if (!dayjs.isDayjs(dayItem)) {
        return date;
      }
    }
  } else {
    if (!dayjs.isDayjs(date)) {
      return date;
    }
  }
  let result: any = 'Invalid Date';
  const map: Record<dateTypeProps, (date: any) => string | string[]> = {
    date: (date: dayjs.Dayjs) => dayjs(date).format('YYYY-MM-DD'),
    dateTime: (date: dayjs.Dayjs) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    dateWeek: (date: dayjs.Dayjs) => dayjs(date).format('WW'),
    dateMonth: (date: dayjs.Dayjs) => dayjs(date).format('MM'),
    dateQuarter: (date: dayjs.Dayjs) => dayjs(date).format('Q'),
    dateYear: (date: dayjs.Dayjs) => dayjs(date).format('YYYY'),
    dateRange: (date: dayjs.Dayjs[]) => [
      dayjs(date[0]).format('YYYY-MM-DD'),
      dayjs(date[1]).format('YYYY-MM-DD'),
    ],
    dateTimeRange: (date: dayjs.Dayjs[]) => [
      dayjs(date[0]).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(date[1]).format('YYYY-MM-DD HH:mm:ss'),
    ],
    time: (date: dayjs.Dayjs) => dayjs(date).format('HH:mm:ss'),
    timeRange: (date: dayjs.Dayjs[]) => [
      dayjs(date[0]).format('HH:mm:ss'),
      dayjs(date[1]).format('HH:mm:ss'),
    ],
  };
  result = map[dateType](date);
  return result;
};
/**
 * dom转tag
 * @param dom dom元素
 * @param value 值
 * @param colors 对象:颜色
 * @example returnTag(<div>1</div>,'1',{1:'red'})
 * @returns <Tag color='red'>{dom}</Tag>
 */
export function returnTag(
  dom: React.ReactNode,
  value: NumberString | undefined = '',
  colors?: { [key: NumberString]: string },
) {
  let node: React.ReactNode = <Tag color={colors?.[value]}>{dom}</Tag>;
  switch (String(value)) {
    case 'Y':
      node = <Tag color={colors?.[0] || 'green'}>{dom}</Tag>;
      break;
    case 'N':
      node = <Tag color={colors?.[1] || 'red'}>{dom}</Tag>;
      break;
    case 'Z':
      node = <Tag color={colors?.[1] || 'blue'}>{dom}</Tag>;
      break;
    case '0':
      node = <Tag color={colors?.[0] || 'red'}>{dom}</Tag>;
      break;
    case '1':
      node = <Tag color={colors?.[1] || 'green'}>{dom}</Tag>;
      break;
    case '2':
      node = <Tag color={colors?.[2] || 'cyan'}>{dom}</Tag>;
      break;
    case '3':
      node = <Tag color={colors?.[3] || 'blue'}>{dom}</Tag>;
      break;
    case '4':
      node = <Tag color={colors?.[4] || 'geekblue'}>{dom}</Tag>;
      break;
    case '5':
      node = <Tag color={colors?.[5] || 'purple'}>{dom}</Tag>;
      break;
    case '6':
      node = <Tag color={colors?.[6] || 'magenta'}>{dom}</Tag>;
      break;
    case '7':
      node = <Tag color={colors?.[6] || 'red'}>{dom}</Tag>;
      break;
    case '8':
      node = <Tag color={colors?.[6] || 'volcano'}>{dom}</Tag>;
      break;
  }
  return node;
}

/**
 * @author 兰涛
 * @description 根据传入的时间，获取当前的主题
 * @author lands
 * @param startTime 结束时间 [6, 30, 0]
 * @param endtTime 开始时间 [19, 30, 0],
 * @returns 'light' | 'realDark'
 */
export const dynamicNavTheme = (
  startTime: number[] = [6, 30, 0],
  endtTime: number[] = [19, 30, 0],
) => {
  const now = dayjs();
  const isBetween630and1930 =
    now.isAfter(
      dayjs().hour(startTime[0]).minute(startTime[1]).second(startTime[2]),
    ) &&
    now.isBefore(
      dayjs().hour(endtTime[0]).minute(endtTime[1]).second(endtTime[2]),
    );
  return isBetween630and1930 ? 'light' : 'realDark';
};

/**
 * @description 根据亮度和饱和度生成十六进制的色彩字符串
 * @author lands
 * @param hexColor 十六进制的色彩字符串
 * @param brightness 0-1的亮度
 * @param saturation 0-1的色彩饱和度
 * @returns 新的十六进制的色彩字符串
 */
export function adjustColor(
  hexColor: string,
  brightness: number,
  saturation: number,
): string {
  // Convert hex color string to RGB object
  const rgb = hexToRgb(hexColor);
  // Convert RGB object to HSL object
  const hsl = rgbToHsl(rgb);

  // Adjust brightness and saturation
  hsl.l = Math.max(0, Math.min(1, brightness));
  hsl.s = Math.max(0, Math.min(1, saturation));
  // Convert HSL object back to RGB object
  const newRgb = hslToRgb(hsl);

  return newRgb;
}

/**
 * @author 兰涛
 * @description 单项加密
 * @returns string
 */
export async function sha256Hash(plainText: string) {
  // 计算哈希值
  const hash = CryptoJS.SHA256(plainText);
  // 将哈希值转换为十六进制字符串
  const hashString = hash.toString(CryptoJS.enc.Hex);
  // 创建哈希对象
  return hashString;
}

/**
 * 柯里化函数 可根据传入函数的类型自动推导
 * @param fn 需要柯里化的函数
 * @param rest 需要柯里化的函数的初始参数
 * @returns 返回一个被柯里化的新函数或者 需要柯里化的函数的返回值
 * @tip 由于ts类型限制的原因 无法在一个函数被柯里化后，再次多次传参！所以如果第二次传参需要使用多参数形式 需要使用@ts-ignore
 * @example
 *  function add(a: number, b: number, c: number, d: number, e: number) {
 *    return a + b + c;
 *  }
 *  curry(add)(1)(2)(3)(4)(5);
 *  curry(add, 1)(2)(3)(4)(5);
 *  curry(add, 1, 2)(3)(4)(5);
 *  curry(add, 1, 2, 3)(4)(5);
 *  curry(add, 1, 2, 3, 4)(5);
 *  curry(add, 1, 2, 3, 4, 5);
 */

export function curry<T extends (...args: any[]) => any, First extends any[]>(
  fn: T,
  ...rest: First
): CurryFunc<T, First> {
  return function (...args: any[]): any {
    const currentArgs = [...rest, ...args];
    return currentArgs.length >= fn.length
      ? fn(...currentArgs)
      : curry(fn, ...currentArgs);
  } as CurryFunc<T, First>;
}

export * from './requestUtils';

/**
 *  将List转Protable中columns的valueEnum对象
 * @param dict 数据字典 通过InitialState.dictF处理过的数组 或者 直接在InitialState.dictAll中获取的数据
 * @param start 数组开始下标
 * @param end 数组结束下标
 * @param fieldName 指定数据源的 value 和 text 分别时什么字段
 * @param keyType 默认string 指定键的类型
 * @returns
 */

export function IToValueEnum({
  dict = [],
  start = 0,
  end = dict?.length - 1,
  fieldName = { textString: 'text', valueString: 'value' },
  keyType = 'string',
}: IToValueEnumProps) {
  const map = new Map<any, any>();
  const { textString = 'text', valueString = 'value' } = fieldName;
  dict?.forEach((item, i) => {
    if (i < start || i > end) return;
    let key: any = String(item[valueString]);
    try {
      if (keyType === 'boolean') {
        key = Boolean(item[valueString]);
      } else if (keyType === 'number') {
        key = Number(item[valueString]);
      }
    } catch (error) {
      console.warn('字段key转换失败');
      message.error('字段key转换失败');
    }
    map.set(key, item[textString]);
  });
  return map;
}

/**
 * 复制一个对象，并返回一个其中对应[key]数据的对象
 * @param data 数组数据需要衍生的原始数据
 * @param F 原来数据名称和衍生数据名称
 * @returns 在原数据的基础上新增对象 返回新对象
 */
export const copyAndAdd = <
  T extends Record<string, any> = Record<string, any>,
  U extends Record<string, any> = Record<string, any>,
>({
  data,
  F,
  D,
  onCallback,
}: copyAddProps): (T & U)[] => {
  const arr = data?.map((item, i) => {
    if (onCallback) {
      // eslint-disable-next-line no-param-reassign
      item = onCallback(item);
    }
    // 衍生新数据
    F?.oldField.forEach((v, k) => {
      item[F?.field[k]] = item[v];
    });
    // 删除数据
    if (D && (!D?.key || !D?.value || item?.[D?.key] === D?.value)) {
      if (self) {
        delete data[i];
      } else {
        D?.field &&
          D?.field.forEach((df) => {
            delete data[i]?.[df];
          });
      }
    }
    return item;
  });
  return (arr as (T & U)[]) || [];
};
/**
 * 复制一个对象，并返回一个其中对应[key]数据的对象 不返回其他数据
 * @param data 数组数据需要衍生的原始数据
 * @param F 原来数据名称和衍生数据名称
 * @returns 在原数据的基础上新增对象 返回新对象
 */
export const copyAndAdd2 = <
  T extends Record<string, any> = Record<string, any>,
>({
  data,
  F,
}: copyAddProps): T[] => {
  const arr: T[] = [];
  data?.forEach((item) => {
    const obj: Record<string, any> = {};
    // 衍生新数据
    F?.oldField.forEach((v, k) => {
      const key = F.field[k];
      obj[key] = item[v];
    });
    arr.push(obj as T);
  });
  return arr || [];
};

/**
 * 通过KKfile查看文件
 * @param url 文件路径
 * @returns
 */
export const lookFile = (url: string | undefined) => {
  if (!url) {
    message.error('文件路径错误');
    return;
  }
  let winWidth = screen.width; //获取屏幕宽度
  let winHeight = screen.height; //获取屏幕高度
  //获取新窗口距离屏幕左侧的位置
  let left = (winWidth - 1920 / 2) / 2;
  //获取新窗口距离屏幕顶部的位置
  let top = (winHeight - 1080 / 2) / 2;
  window.open(
    'http://lookfile.lantao.work/onlinePreview?url=' +
      encodeURIComponent(Base64.encodeURI(url)),
    '预览',
    'width=' +
      1920 / 2 +
      ',height=' +
      1080 / 2 +
      ',left=' +
      left +
      ',top=' +
      top +
      ',toolbar=no,menubar=no,location=no,status=no',
  );
};

/**
 *  下载文件
 * @param fileUrl 文件地址
 * @param fileName 文件名称.后缀
 */
export function downloadFile(fileUrl: string, fileName: string) {
  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      saveAs(blob, fileName);
    })
    .catch(() => message.error('下载失败'));
}

type AnyObject = Record<string, any>;
/**
 * 根据数组获取对象的值
 * @param obj 需要获取的对象
 * @param path 获取的路径
 * @returns 返回值
 */
export function getPropertyValue(
  obj: AnyObject | undefined,
  path: (number | string)[] | number | string | undefined,
): any {
  if (!obj || path === undefined) return undefined;
  if (!Array.isArray(path)) return obj[path];
  let current = obj;
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return undefined;
    }
  }
  return current;
}
/**
 * 根据数组给对象设置值
 * @param obj 需要设置的对象
 * @param path 路径
 * @param value 设置的值
 */
export function setPropertyValue(
  obj: AnyObject,
  path: (number | string)[] | number | string | undefined,
  value: any,
): AnyObject {
  let current = obj || {};
  if (path === undefined) return current;
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];

      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = typeof path[i + 1] === 'number' ? [] : {};
      }

      current = current[key];
    }

    const lastKey = path[path.length - 1];
    current[lastKey] = value;
  } else {
    current[path] = value;
  }
  return current;
}
/**
 * 使用Proxy深拷贝对象
 * @param obj 需要复制的对象
 * @param cache 缓存信息，不需要传递
 * @returns 返回深拷贝的对象
 */
export function deepCopy<T extends Record<any, any> = Record<any, any>>(
  obj: T,
  cache = new WeakMap(),
): T {
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  const proxyObj = new Proxy(obj, {
    get(target, key, receiver) {
      const v = Reflect.get(target, key, receiver);
      if (typeof v !== 'object') {
        return v;
      }
      return deepCopy(v, cache);
    },
  });
  cache.set(obj, proxyObj);
  return proxyObj;
}
