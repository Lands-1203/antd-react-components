---
nav:
  title: API
  order: 5
title: 表单校验器
---

# 表单校验器

## 使用方式

```ts
import {
  VIdCard,
  VPhone,
  VWord,
  VUserName,
  VPwd,
  VEmail,
} from '@lands/antd-react-components/dist/validator';

const columns: ProTableEditColumns<SYSAPI.SysUser>[] = [
  {
    title: '姓名',
    dataIndex: 'cname',
    rules: [{ required: true, message: '此项是必填的', validator: VUserName }],
  },
  {
    title: '密码',
    dataIndex: 'password',
    valueType: 'password',
    formItemProps: {
      rules: [{ required: true, validator: VPwd }],
    },
  },
  {
    title: '手机号',
    dataIndex: 'phonenumber',
    formItemProps: {
      rules: [{ required: false, validator: VPhone }],
    },
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
    formItemProps: {
      rules: [{ required: false, validator: VIdCard }],
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    formItemProps: {
      rules: [{ required: false, validator: VEmail }],
    },
  },
];
```

## 添加一个校验器

```ts
import { craeteValidator } from '@lands/antd-react-components/dist/validator';

const testValidator = craeteValidator(/^1[3-9]\d{9}$/, '手机号格式不正确');
const columns: ProTableEditColumns<SYSAPI.SysUser>[] = [
  {
    ...
    rules: [
      {  validator: testValidator },
    ],
  },
];
```

## 总览

### `VPhone`

#### 作用

验证手机号的正则表达式

#### 错误提示

验证不通过提示‘手机号格式不正确’

#### 正则表达式

```
/^1[3-9]\d{9}$/
```

### `VEmail`

#### 作用

邮箱格式验证

#### 错误提示

验证不通过提示‘邮箱格式不正确’

#### 正则表达式

```
/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
```

### `VPwd`

#### 作用

密码格式验证

#### 错误提示

验证不通过提示‘密码长度 6-16 位，包含至少一个特殊字符，一个数字，一个大写字母和一个小写字母’

#### 正则表达式

```
  /(?=^.{6,16}$)(?=(?:.*?\d){1})(?=.*[a-z])(?=(?:.*?[A-Z]){1})(?=(?:.*?[`·~!@##$%^&*()_+}{|:;'",<.>/?\=\[\]\-\\]){1})(?!.*\s)[0-9a-zA-Z`·~!@##$%^&*()_+}{|:;'",<.>/?\=\[\]\-\\]*$/
```

### `VWord`

#### 作用

常规字符格式验证

#### 错误提示

验证不通过提示‘格式不正确：请输入 a-z、A-Z、0-9 任意值组合’

#### 正则表达式

```
  /^[a-zA-Z0-9]+$/
```

### `VIdCard`

#### 作用

身份证格式验证

#### 错误提示

验证不通过提示‘请输入正确的身份证号格式’

#### 正则表达式

```
/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
```

### `VUserName`

#### 作用

姓名格式验证

#### 错误提示

验证不通过提示‘请输入正确姓名’

#### 正则表达式

```
/^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/
```
