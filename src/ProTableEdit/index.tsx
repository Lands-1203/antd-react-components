import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Button, Modal, message } from 'antd';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { formatDate, isCodeSuccess } from '../utils';
import './styles.less';
import { ProTableEditProps, editActionRefProps } from './typing';
/**
 * 统一编辑框
 * @param IEdit
 * @returns
 */
export default function ProTableEdit<T = any>(props: ProTableEditProps<T>) {
  const {
    modalTitle: propsModalTitle,
    columns,
    formInitData: propsFormInitData = props.initData?.data,
    initDataKey: propsInitDataKey = props.initData?.dataKey,
    formatParams,
    onSubmit,
    subParams,
    subParamsDel,
    subMethod,
    onSubBefore,
    onSubCallback,
    onCancel,
    tableActionRef,
    getEditActionRef,
    getEditFormRef,
    proTableProps,
    modalProps,
    modalWidth,
    isMessage = true,
    isUpdate = true,
    okText,
    cancelText,
    layout = 'horizontal',
    isCarryingInitialParams = true, // 之后的传参是否需要initdata.data为请求参数的迭代对象
  } = props;

  const code = 'bizCode';
  const msg = 'bizMsg';
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  const [submitButton, setSubmitButton] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<React.ReactNode>(
    propsModalTitle || modalProps?.title || '编辑',
  );
  const [open, setOpen] = useState<boolean | undefined>(false);
  const [initData, setInitData] = useState<Record<string, any> | undefined>(
    propsFormInitData || [],
  );
  const [initDataKey, setInitDataKey] = useState<string | number | undefined>(
    propsInitDataKey,
  );

  const [OK_TEXT, setOK_TEXT] = useState('');
  const [CANCEL_TEXT, setCANCEL_TEXT] = useState('');

  useImperativeHandle(
    props?.editActionRef,
    () => {
      return {
        open() {
          setOpen(true);
        },
        close() {
          setOpen(false);
        },
        setInitData(v) {
          setInitData(v);
        },
        initData,
        initDataKey: initDataKey,
        setModalTitle(title) {
          setModalTitle(title);
        },
        ...actionRef.current,
      } as editActionRefProps;
    },
    [props?.editActionRef, actionRef.current, initDataKey, initData],
  );
  useImperativeHandle(
    props?.editFormRef,
    () => {
      return formRef.current;
    },
    [formRef.current],
  );
  // 设置title
  useEffect(() => {
    setModalTitle(propsModalTitle);
  }, [propsModalTitle]);
  // 设置初始数据
  useEffect(() => {
    setInitData(propsFormInitData);
  }, [propsFormInitData]);
  // 设置主键
  useEffect(() => {
    setInitDataKey(propsInitDataKey);
  }, [initDataKey]);
  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  useEffect(() => {
    props.setOpen?.(open || false);

    open && getEditActionRef?.(actionRef as React.MutableRefObject<ActionType>);
    open &&
      getEditFormRef?.(formRef as React.MutableRefObject<FormInstance<any>>);
  }, [open]);
  useEffect(() => {
    if (open) {
      // 由于modal是出于摧毁状态此时表单还未出现dom创建所以需要加入延时队列 让open先粗发表单创建
      setTimeout(() => {
        formRef?.current?.setFieldsValue({ ...initData });
      }, 0);
    }
  }, [initData?.[String(initDataKey)], initData, open]);

  useEffect(() => {
    setOK_TEXT(okText || '');
  }, [okText]);
  useEffect(() => {
    setCANCEL_TEXT(cancelText || '');
  }, [cancelText]);

  const handleOk = async () => {
    try {
      setSubmitButton(true);
      // 格式化时间数据
      columns.forEach((item) => {
        const dataIndex = item?.dataIndex;
        const valueType = (item.valueType as string) || '';
        if (
          (valueType.indexOf('date') !== -1 ||
            valueType.indexOf('time') !== -1) &&
          dataIndex
        ) {
          const val = formRef.current?.getFieldValue(item?.dataIndex || '');
          if (dataIndex instanceof Array) {
            const temp = {};
            let tv: Record<string, any> = temp;
            dataIndex.forEach((dv, i) => {
              if (i === dataIndex.length - 1) {
                tv[dv] = formatDate(val, valueType as any);
              } else {
                tv[dv] = {};
              }
              tv = tv[dv];
            });
            formRef.current?.setFieldsValue(temp);
          } else if (typeof dataIndex === 'string') {
            val &&
              formRef.current?.setFieldsValue({
                [dataIndex]: formatDate(val, valueType as any),
              });
          }
        }
      });
      console.log(
        '%c表单参数',
        'color:#0f0;',
        formRef?.current?.getFieldsValue(),
      );
      // 校验
      formRef?.current?.validateFields().catch((e) => {
        e?.errorFields?.[0]?.errors?.[0] &&
          message.error({
            content: e?.errorFields?.[0]?.errors?.[0],
            duration: 1,
          });
        e?.errorFields?.[0]?.name?.[0] &&
          formRef.current?.scrollToField(e?.errorFields?.[0]?.name?.[0]);
        setSubmitButton(false);
      });
      await formRef?.current?.validateFields();
      isMessage &&
        message.loading({ content: '正在处理...', duration: 10, key: 'edit' });

      const formParams = formRef?.current?.getFieldsValue();
      let params = { ...formParams };
      if (initDataKey && initData?.[initDataKey]) {
        params[initDataKey] = initData?.[initDataKey];
      }
      subParamsDel?.forEach((item) => {
        if (item instanceof Array) {
          let temporary = params;
          item.forEach((v, i) => {
            if (i !== item.length) {
              temporary = temporary[v];
            }
          });
          delete temporary[item[item.length - 1]];
          return;
        }
        delete params[item];
      });

      const subBeformData = await onSubBefore?.({ params, editRef: formRef });
      if (subBeformData?.toNext === false) {
        setTimeout(() => {
          message.destroy();
        }, 2000);
        subBeformData.isShowError &&
          message.error({
            content: subBeformData.errorMsg || '网络错误,请重试！',
            duration: 1,
            key: 'edit',
          });
        subBeformData.isShowSuccess &&
          message.success({
            content: subBeformData.successMsg || '操作成功！',
            duration: 1,
            key: 'edit',
          });
        setOpen(false);
        return;
      }
      // 下面两句话 不能动 params先去form复制值 在接收subBeformData的params
      params = { ...params, ...formRef?.current?.getFieldsValue() };
      if (subBeformData?.params) {
        params = subBeformData?.params;
      }
      formatParams && (params = formatParams(params));
      // if (!onSubmit)  isMessage && message.error({ content: '异常', duration: 1, key: 'edit' });
      console.log('%c提交参数', 'color:#0f0;', { ...subParams, ...params });
      let status = 'success';
      let res: Record<string, any> = {};
      if (onSubmit) {
        const submitParams = isCarryingInitialParams
          ? { ...initData, ...subParams, ...params }
          : {
              ...subParams,
              [initDataKey || '']: initData?.[initDataKey || ''],
              ...params,
            };
        res = await onSubmit(
          { ...submitParams },
          {
            method:
              subMethod ||
              // eslint-disable-next-line no-nested-ternary
              (initDataKey
                ? initData?.[initDataKey]
                  ? 'PUT'
                  : 'POST'
                : 'POST'),
          },
        );
        if (!isCodeSuccess(res[code])) {
          isMessage &&
            message.error({ content: res[msg] || '操作失败', key: 'edit' });
          status = 'error';
        } else {
          isMessage && message.success({ content: '操作成功！', key: 'edit' });
        }
      }
      onSubCallback?.({
        params: { ...initData, ...subParams, ...params },
        res,
        editRef: formRef,
      });
      // 失败了 不关闭弹窗
      status === 'success' && setOpen(false);
      status === 'success' && isUpdate && tableActionRef?.current?.reload();
      setSubmitButton(false);
    } catch (error) {
      message.destroy();
    }
  };
  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
    setSubmitButton(false);
  };
  const handleReset = () => {
    let reserve: any = {};
    columns.forEach((item) => {
      if (!item.dataIndex) return;
      if (item?.immunityReset) {
        if (
          typeof item.dataIndex === 'string' ||
          typeof item.dataIndex === 'number'
        ) {
          reserve[item.dataIndex] = formRef.current?.getFieldValue(
            item.dataIndex,
          );
        } else if (typeof item.dataIndex === 'object') {
          let temporary: Record<string, any> = {};
          const k = temporary;
          item.dataIndex.forEach((v, i) => {
            if (i === (item.dataIndex as any[]).length - 1) {
              temporary[v] = formRef.current?.getFieldValue(
                item.dataIndex as Array<string | number>,
              );
            } else {
              temporary[v] = {};
            }
            temporary = temporary[v];
          });

          reserve = { ...reserve, ...k };
        }
      } else if (
        typeof item.dataIndex === 'string' ||
        typeof item.dataIndex === 'number'
      ) {
        reserve[item.dataIndex] = undefined;
      } else if (typeof item.dataIndex === 'object') {
        let temporary: Record<string, any> = {};
        const k = temporary;
        item.dataIndex.forEach((v, i) => {
          if (i === (item.dataIndex as any[]).length - 1) {
            temporary && (temporary[v] = undefined);
          } else {
            temporary && (temporary[v] = {});
          }
          temporary = temporary && temporary[v];
        });
        reserve = { ...reserve, ...k };
      }
    });

    setSubmitButton(false);
    formRef.current?.setFieldsValue(reserve);
  };
  return (
    <Modal
      title={modalTitle}
      open={open}
      onCancel={handleCancel}
      destroyOnClose
      footer={[
        <Button
          key="reset"
          style={{ float: 'left' }}
          onClick={handleReset}
          danger
        >
          重置
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          {CANCEL_TEXT || '取消'}
        </Button>,
        <Button
          key="ok"
          onClick={handleOk}
          loading={submitButton}
          type="primary"
        >
          {OK_TEXT || '提交'}
        </Button>,
      ]}
      maskClosable={false}
      {...modalProps}
      width={modalWidth || modalProps?.width}
    >
      <ProTable
        columns={columns}
        type="form"
        formRef={formRef}
        actionRef={actionRef}
        form={{
          scrollToFirstError: true,
          autoFocusFirstInput: true,
          layout,
          labelCol: layout === 'horizontal' ? { span: 6 } : { span: 24 },
          wrapperCol: layout === 'horizontal' ? { span: 14 } : { span: 24 },
          className: 'lands-protabledit-form',
          submitter: false,
          ...proTableProps?.form,
        }}
        {...proTableProps}
      />
    </Modal>
  );
}
