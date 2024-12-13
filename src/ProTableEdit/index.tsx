import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import type { FormInstance } from 'antd';
import { Button, Modal, message } from 'antd';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  formatDate,
  getPropertyValue,
  isCodeSuccess,
  setPropertyValue,
} from '../utils';
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
    formatEchoData,
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
    /** 之后的传参是否需要initdata.data为请求参数的迭代对象 */
    isCarryingInitialParams = true,
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

  const initDataRef = useRef<Record<string, any> | undefined>(
    propsFormInitData || {},
  );
  const initDataKeyRef = useRef<typeof propsInitDataKey | undefined>(
    propsInitDataKey,
  );

  const [OK_TEXT, setOK_TEXT] = useState('');
  const [CANCEL_TEXT, setCANCEL_TEXT] = useState('');

  useImperativeHandle(
    props?.editActionRef,
    () => {
      return {
        open(v) {
          v && (initDataRef.current = v);
          setOpen(true);
        },
        close() {
          setOpen(false);
        },
        setInitData(v) {
          initDataRef.current = v;
        },
        initData: initDataRef.current,
        initDataKey: initDataKeyRef.current,
        setModalTitle(title) {
          setModalTitle(title);
        },
        ...actionRef.current,
      } as editActionRefProps;
    },
    [actionRef.current],
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
    initDataRef.current = propsFormInitData;
  }, [propsFormInitData]);
  // 设置主键
  useEffect(() => {
    initDataKeyRef.current = propsInitDataKey;
  }, [propsInitDataKey]);
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
      const newData =
        formatEchoData instanceof Function
          ? formatEchoData(initDataRef.current)
          : initDataRef.current;
      formRef?.current?.setFieldsValue(newData);
    }
  }, [
    initDataRef.current?.[String(initDataKeyRef.current)],
    initDataRef.current,
    open,
  ]);

  useEffect(() => {
    setOK_TEXT(okText || '');
  }, [okText]);
  useEffect(() => {
    setCANCEL_TEXT(cancelText || '');
  }, [cancelText]);

  const getInitDataKeyValue = () =>
    getPropertyValue(initDataRef.current, initDataKeyRef.current);
  /** 表格校验 */
  const handleValidateFields = async () => {
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
  };
  /** 格式化时间数据 */
  const handleSubmitDataForTime = () => {
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
          dataIndex.forEach((dv: any, i) => {
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

      if (item.valueTransform instanceof Function) {
        const val = formRef.current?.getFieldValue(item?.dataIndex || '');
        if (dataIndex instanceof Array) {
          const temp = {};
          let tv: Record<string, any> = temp;
          dataIndex.forEach((dv: any, i) => {
            if (i === dataIndex.length - 1) {
              tv[dv] = item.valueTransform?.(val);
            } else {
              tv[dv] = {};
            }
            tv = tv[dv];
          });
          formRef.current?.setFieldsValue(temp);
        } else if (typeof dataIndex === 'string') {
          val &&
            formRef.current?.setFieldsValue({
              [dataIndex]: item.valueTransform(val),
            });
        }
      }
    });
  };
  /**  获取初始参数 并做基本处理*/
  const getOriginalParams = () => {
    const formParams = formRef?.current?.getFieldsValue();
    let params: Record<string, any> = {};
    if (isCarryingInitialParams && initDataRef.current) {
      params = initDataRef.current;
    } else {
      params = setPropertyValue(
        params,
        initDataKeyRef.current,
        getInitDataKeyValue(),
      );
    }
    params = Object.assign(params, formParams, subParams);

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
    return params;
  };
  /** 处理提交前的方法 */
  const handleBeforeSubmit = async (params: Record<string, any>) => {
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
      throw new Error('手动退出');
    }
    if (subBeformData?.params) {
      return subBeformData?.params;
    }
    return params;
  };
  /** 处理提交方法 */
  const handleSubmit = async (params: Record<string, any>) => {
    let status = 'success';
    let res: Record<string, any> = {};
    const defaultMethod =
      initDataKeyRef.current && getInitDataKeyValue() !== undefined
        ? 'PUT'
        : 'POST';
    if (onSubmit) {
      res = await onSubmit(params, {
        method: subMethod || defaultMethod,
      });
      if (!isCodeSuccess(res[code])) {
        isMessage &&
          message.error({ content: res[msg] || '操作失败', key: 'edit' });
        status = 'error';
      } else {
        isMessage && message.success({ content: '操作成功！', key: 'edit' });
      }
    }
    const onSubCallbackParams = { params, res, editRef: formRef };
    onSubCallback?.(onSubCallbackParams);
    // 失败了 不关闭弹窗
    status === 'success' && setOpen(false);
    status === 'success' && isUpdate && tableActionRef?.current?.reload();
  };
  const handleOk = async () => {
    try {
      setSubmitButton(true);
      console.log(
        '%c表单参数',
        'color:#0f0;',
        formRef?.current?.getFieldsValue(),
      );
      // 格式化表格中提交的时间数据
      handleSubmitDataForTime();
      // 校验
      await handleValidateFields();
      isMessage &&
        message.loading({ content: '正在处理...', duration: 10, key: 'edit' });
      // 获取参数
      let params: Record<string, any> = await handleBeforeSubmit(
        getOriginalParams(),
      );
      console.log('%c提交参数', 'color:#0f0;', params);
      formatParams && (params = formatParams(params));
      await handleSubmit(params);
      setSubmitButton(false);
    } catch (error) {
      console.dir(error);
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
          item.dataIndex.forEach((v: any, i) => {
            if (i === (item.dataIndex as any[]).length - 1) {
              temporary[v] = formRef.current?.getFieldValue(
                item.dataIndex as Array<string | number>,
              );
            } else {
              temporary[v] = {};
            }
            temporary = temporary[v];
          });

          reserve = Object.assign(reserve, k);
        }
      } else if (
        typeof item.dataIndex === 'string' ||
        typeof item.dataIndex === 'number'
      ) {
        reserve[item.dataIndex] = undefined;
      } else if (typeof item.dataIndex === 'object') {
        let temporary: Record<string, any> = {};
        const k = temporary;
        item.dataIndex.forEach((v: any, i) => {
          if (i === (item.dataIndex as any[]).length - 1) {
            temporary && (temporary[v] = undefined);
          } else {
            temporary && (temporary[v] = {});
          }
          temporary = temporary && temporary[v];
        });
        reserve = Object.assign(reserve, k);
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
      forceRender
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
