---
nav:
  title: 组件
  order: 10
group: 表单组件
title: ProTableEdit-快捷编辑框
---

# ProTableEdit 快捷编辑框

该编辑框的一般用于 ProTable 的新增和编辑。该组件基于[ProTable](https://procomponents.ant.design/components/table)封装 `type = 'form'`

## 使用场景

- 需要对表格编辑或新增
- 或需要建立一个联动少的简单表单
- 初次使用需[全局配置](#%E9%85%8D%E7%BD%AE)

## 代码演示

<code src="./demos/test.tsx" title="基本使用"></code>

<code src="./demos/test2.tsx" title="无 state 变量打开(推荐)" description='使用内置方法直接打开，不需要外部声明变量'></code>

<code src="./demos/test3.tsx" title="作为表格的编辑框" description='上面的效果点击`编辑`和`新建`后，会弹出一个编辑框。上述大部分代码是生成表格的代码。与该组件无关系'></code>
<code src="./demos/test4.tsx" title="作为表格的编辑框(推荐)" description='上面的效果点击`编辑`和`新建`后，会弹出一个编辑框。上述大部分代码是生成表格的代码。与该组件无关系'></code>

#### 使用解析

由于我们开发中经常会用到 `ProTable` 生成一个表格，然后表格一般带有新增和编辑，所以封装了该组件，`ProTableEdit`可以复用`ProTable`的`columns`。并且给 `columns` 新增了一个属性 `immunityReset`(布尔值,代表点击重置按钮的时候不情况该字段)

```ts
// 核心代码
<ProTableEdit
  editActionRef={editActionRef}
  columns={columns}
  onSubBefore={async ({ params }) => {
    params.password = params.password + '1';
    return { toNext: true, params };
  }}
  onSubmit={async function () {
    return new Promise((resolve) => {
      resolve(11);
    });
  }}
  initDataKey="userId"
  tableActionRef={actionRef}
/>
```

## API

| 属性名                    | 描述                                                                                       | 是否必传 | 类型                                                                                  | 默认值         |
| ------------------------- | ------------------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------- | -------------- |
| `editActionRef`           | modal 的操作对象 该对象继承了表单的 ActionRef 并扩展了一些方法                             | 否       | [editActionRefProps](#editactionref)                                                  |                |
| `cancelText`              | 取消按钮文本                                                                               | 否       | `string`                                                                              |                |
| `columns`                 | 符合 Protable['columns'] 的对象数组                                                        | 是       | [ProTableEditColumns\<T\>[]](#protableeditcolumnst)                                   |                |
| `formatParams`            | 提交前格式化参数的函数                                                                     | 否       | `(params: Record<string, any>) => Record<string, any>`                                |                |
| `getEditActionRef`        | 获取当前表单的 form 操作对象的函数 (废弃,可以使用)                                         | 否       | `(ref: React.MutableRefObject<ActionType>) => void`                                   |                |
| `getEditFormRef`          | 获取当前表单的 form 实例的函数 (废弃,可以使用)                                             | 否       | `(ref: React.MutableRefObject<FormInstance<any>>) => void`                            |                |
| `initData`                | 初始数据，包括编辑主键值和初始数据 (废弃,可以使用)                                         | 否       | [ProTableEditInitData](#protableeditinitdata)                                         |                |
| `isCarryingInitialParams` | 是否携带初始参数 (initData 的会将数据复制给表单，表单只会保留存在的表单项数据其他的会丢弃) | 否       | `boolean`                                                                             | `true`         |
| `isMessage`               | 是否中央提示框                                                                             | 否       | `boolean`                                                                             | `true`         |
| `isUpdate`                | 操作完成后是否更新 table                                                                   | 否       | `boolean`                                                                             | `true`         |
| `layout`                  | 表单的横纵排列方式                                                                         | 否       | [layouProps](#layouprops)                                                             | `"horizontal"` |
| `modalProps`              | Modal 的配置项                                                                             | 否       | [ModalProps](https://ant.design/components/modal-cn#api)                              |                |
| `modalTitle`              | 模态框标题                                                                                 | 否       | `string`                                                                              |                |
| `modalWidth`              | 模态框宽度                                                                                 | 否       | `ModalProps['width']`                                                                 |                |
| `okText`                  | 确认按钮文本                                                                               | 否       | `string`                                                                              |                |
| `onCancel`                | 取消操作的回调函数                                                                         | 否       | `() => void`                                                                          |                |
| `onSubBefore`             | 提交前调用的异步方法                                                                       | 否       | [onSubBeforeProps](#onsubbeforeprops)                                                 |                |
| `onSubCallback`           | 提交完成后的回调函数                                                                       | 否       | [onSubCallbackProps](#onsubcallbackprops)                                             |                |
| `onSubmit`                | 点击确认后的请求方法                                                                       | 否       | [ProTableEditOnSubmit](#protableeditonsubmit)                                         |                |
| `open`                    | 显示状态                                                                                   | 是       | `boolean`                                                                             |                |
| `proTableProps`           | ProTable 的配置项                                                                          | 否       | [ProTableProps<any, any>](https://procomponents.ant.design/components/table#protable) |                |
| `setOpen`                 | 控制显示状态的函数                                                                         | 是       | `React.Dispatch<React.SetStateAction<boolean>>`                                       |                |
| `subMethod`               | 默认不传，在新增和修改的时候用于改变请求方式                                               | 否       | [subMethodProps](#submethodprops)                                                     |                |
| `subParams`               | 发送请求时携带的额外参数                                                                   | 否       | `Record<string, any>`                                                                 |                |
| `subParamsDel`            | 发送请求时删除的表单参数                                                                   | 否       | `Array<string \| string[]>`                                                           |                |
| `tableActionRef`          | 表格的 form 操作对象                                                                       | 否       | `React.MutableRefObject<ActionType \| undefined>`                                     |                |

### editActionRef

| 属性          | 描述                                                                                                     | 类型                                    |
| ------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| open          | 打开编辑框                                                                                               | `() => void `                           |
| close         | 关闭编辑框                                                                                               | `() => void`                            |
| setInitData   | 设置编辑框的初始值，与 editFormRef 不同点在于，使用该方法设置后，表单不存在的表单项 key 对应的数据会保留 | `(v: T & Record<string, any>) => void ` |
| initData      | 获取当前的数据                                                                                           | `T & Record<string, any>  `             |
| initDataKey   | 获取当前的数据主键                                                                                       | `string` \| `number`                    |
| setModalTitle | 设置 modal 的 title                                                                                      | `(v: ReactNode) => void`                |

### ProTableEditColumns\<T\>

编辑框的表单项，该属性继承了 `ProTable` 的 `columns`，这样做就能同时完成表格开发和表单开发。

| 属性                                                                                                                              | 描述       | 是否必传 | 类型      |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- | --------- |
| `immunityReset`                                                                                                                   | 不重置该值 | 否       | `boolean` |
| ...其他属性（参考 [ProColumns\<T\>](https://procomponents.ant.design/components/table#columns-%E5%88%97%E5%AE%9A%E4%B9%89) 定义） | ...        | ...      | ...       |

### ProTableEditInitData

编辑框的初始数据，该数据会左右`onSubmit`方法的请求方式，如果`data[dataKey]`有值，则使用 PUT 方法。[详细](#tips)

| 属性    | 描述           | 是否必传 | 类型                | 默认值 |
| ------- | -------------- | -------- | ------------------- | ------ |
| dataKey | 表单数据的主键 |          | string \| number    |        |
| data    | 表单数据       |          | Record<string, any> |        |

### layouProps

表单项的布局方式`type layouProps = 'vertical' | 'inline' | 'horizontal';`

### onSubBeforeProps

发起表单请求前需要调用的函数，一般用于处理提交参数 params `(v)=>Promise<onSubBeforeReturunProps>|`[`onSubBeforeReturunProps`](#onsubbeforereturunprops)

| 参数         | 描述                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `v.params`   | 参数对象，包含要提交的数据                                                                                             |
| `v.editRef`  | 表单的引用对象，用于获取表单实例对象                                                                                   |
| `函数返回值` | 异步方法返回一个`Promise<onSubBeforeReturunProps>`，或同步方法返回 [onSubBeforeReturunProps](#onsubbeforereturunprops) |

### onSubBeforeReturunProps

[onSubBeforeProps](#onsubbeforeprops)函数调用的返回对象，该返回对象会直接决定是否继续往下执行

| 属性            | 描述                                                                                           | 是否必传 | 类型                   | 默认值              |
| --------------- | ---------------------------------------------------------------------------------------------- | -------- | ---------------------- | ------------------- |
| `toNext`        | 是否进行下一步网络请求，调用 `onSubmit` 方法，当为 `false` 时会直接 return ,不在执行`onSubmit` | 否       | `boolean \| undefined` |                     |
| `params`        | 提供给 `onSubmit` 方法的参数                                                                   | 否       | `Record<string, any>`  |                     |
| `isShowError`   | 是否显示 onSubBeforeProps 的错误信息                                                           | 否       | `boolean \| undefined` |                     |
| `errorMsg`      | 错误信息                                                                                       | 否       | `string \| undefined`  | '网络错误,请重试！' |
| `isShowSuccess` | 是否显示成功信息                                                                               | 否       | `boolean \| undefined` |                     |
| `successMsg`    | 成功信息                                                                                       | 否       | `string \| undefined`  | '操作成功！'        |

### onSubCallbackProps

提交完成后的回调函数 ` (v: {params: Record<string, any>;editRef: React.MutableRefObject<FormInstance<any> | undefined>res: Record<string, any>;}) => void;`

| 参数         | 描述                             |
| ------------ | -------------------------------- |
| `v.params`   | `onSubmit` 请求方法的参数对象    |
| `v.editRef`  | 表单的实体对象，能获取表单的数据 |
| `v.res`      | `onSubmit` 请求方法的返回值对象  |
| `函数返回值` | `void`                           |

### ProTableEditOnSubmit

表单点击提交后，在完成所有验证后，调用的数据提交方法
`onSubmit` 方法类型，可以是异步方法 `(body: Record<string, any>, options?: Record<string, any> \| undefined) => Promise<Record<string, any>>`，或者 `(() => Promise<any>)`

tips: 如果`onSubmit` 属于`(() => Promise<any>)`并且返回数据不符合[规范](#配置)，则需要将组件参数`isMessage = false`关闭错误的自动提示，通过 `onSubCallback`处理其他事物

| 属性      | 类型                  | 描述                       |
| --------- | --------------------- | -------------------------- |
| `body`    | `Record<string, any>` | `umi request` 方法体数据   |
| `options` | `Record<string, any>` | `umi request` 的 `options` |

### subMethodProps

`onSubmit`的请求方式 `type subMethodProps = string | '' | 'PUT' | 'POST' | 'GET';`

## 其他说明

### 配置

使用该组件，请求的返回数据需要有固定的格式，如下：

```json
{
  "bizCode": "success|accepted|error",
  "bizMsg": "成功"
}
```

如果后端返回的数据格式不是上述格式，我们需要在全局返回拦截处，处理数据。其中`bizCode = 'success|accepted'` 代表正常处理，`ProTableEdit`认为是正常通过。

#### 响应拦截器

以下是请求响应拦截器的配置案例，具体项目具体分析

```ts
  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { bizCode = '', sysCode, bizMsg } = response.data as ResponseStructure;

      if (sysCode === '000000' && bizCode.slice(2) === '0000') {
        // 成功
        (response.data as any).bizCode = 'success';
      } else if (['2', '3'].includes(bizCode?.[2])) {
        // 受理
        (response.data as any).bizCode = 'accepted';
      } else {
        if (['IA0002', 'IA0003', 'IA0007', 'IA0013', 'IA0015', 'GW0002'].includes(bizCode)) {
          notification.error({
            message: '登录失效',
            description: bizMsg,
          });
          removeAuthorization();
          history.replace('/user/login');
          window.history.pushState(null, '', document.URL);
          window.addEventListener('popstate', function () {
            window.history.pushState(null, '', document.URL);
          });
        }
      }
      return response;
    },
  ],
```

#### 请求处理

`ProTableEdit` 的 `onSubmit` 方法，是表单点击确认后调用的请求方法。将用户填写的数据数和`InitData` 组合起来后，交给 `onSubmit` 第一个参数（如果需要将数据放在 `body` 内部的某个对象中，建议在请求拦截器处理）
其中`onSubmit`是通过后端的 swgger.json 批量生成的请求（符合 `openapi` 标准就可以）。

```ts
{
  requestInterceptors: [
    (config: RequestOptions) => {
      if (['put', 'post'].includes(String(config.method).toLowerCase())) {
        const { bizContent, reqSerial, ...body } = config.data;
        // 将reqSerial(流水号)以外的所有数据全部放入bizContent中
        config.data = { reqSerial, bizContent: { ...bizContent, ...body } };
      }
      return config;
    },
  ];
}
```

---

### 使用成本计算

#### 新建变量

在使用`ProTableEdit`中，我们会声明几个固定格式的变量：（不推荐使用 state 变量控制组件，推荐使用[editActionRef](#editactionref)方式）

- `const [initData, setInitData] = useState<Record<string,any>>();`控制编辑请求的初始数据。
- `const [openEdit, setOpenEdit] = useState(false);`控制编辑框是否打开。

#### 复用变量

- `const actionRef = useRef<ActionType>();`用于控制表格刷新，通过属性`tableActionRef`传达给 ProTableEdit，在编辑请求成功后会自动发起`actionRef.current.reload()`表格刷新。
- `const columns: ProTableEditColumns<Record<string, any>>[] = [{....}]`用于表格的渲染，可以直接复用于该组件，完成编辑和新增。

## Tips

- 如果配置了[响应拦截器](#响应拦截器)，可直接使用 `import { isSuccessCode } from '@lands-pro/antd-react-components/dist/utils';` `isSuccessCode(res.bizCode)`判断请求是否成功;
- 如果配置[请求拦截器](#请求处理)，请注意不要影响 `ProTableEdit` 以外的 `POST|PUT` 请求。请注意兼容性配置。
- 如果需要表单简单的联动，需要自己声明 `useState` 变量。去控制`columns`
- 如果`subMethod`没有传递值。`data[dataKey]`有值，`onSubmit`则会使用 PUT，方式发起请求；`data[dataKey]`如果没有值则会使用 POST 发起请求。组件不会接收 `onSubmit` 自带的请求方式。因为在实际开发中，编辑需要带 ID 使用 PUT 。新增无记录 ID 使用 POST

```ts
// 局部源代码
res = await onSubmit(
  { ...submitParams },
  {
    method:
      subMethod ||
      // eslint-disable-next-line no-nested-ternary
      (initData?.dataKey
        ? initData?.data?.[initData?.dataKey]
          ? 'PUT'
          : 'POST'
        : 'POST'),
  },
);
```
