import { BooleanCheckbox } from '@lands/antd-react-components';
import { Button, Form, message } from 'antd';
import React, { useState } from 'react';
export default () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <Form form={form}>
        <Form.Item label="允许开启" name="isStart">
          <BooleanCheckbox disabled={disabled} />
        </Form.Item>
      </Form>
      <Button
        onClick={() => {
          message.info(String(form.getFieldValue('isStart')));
        }}
      >
        获取表单结果
      </Button>
      <Button
        onClick={() => {
          form.setFieldValue('isStart', true);
        }}
      >
        设置为true
      </Button>
      <Button
        onClick={() => {
          form.setFieldValue('isStart', false);
        }}
      >
        设置为false
      </Button>
      <Button
        onClick={() => {
          setDisabled(true);
        }}
      >
        禁用
      </Button>
      <Button
        onClick={() => {
          setDisabled(false);
        }}
      >
        开启
      </Button>
    </>
  );
};
