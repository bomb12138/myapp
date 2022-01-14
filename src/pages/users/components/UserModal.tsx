/*
 * @Author: xutianxiang
 * @Date: 2021-12-27 18:30:28
 * @LastEditors: xutianxiang
 * @LastEditTime: 2022-01-12 21:04:35
 * @Description: file content
 * @FilePath: \umiapp\src\pages\users\components\UserModal.tsx
 */
import React, { useEffect, FC } from 'react';
import { Modal, Button } from 'antd';
import { Form, Input, message } from 'antd';
import { SingleUserType, FormValue } from '../data.d';

interface UserModalProps {
  visible: boolean;
  record: SingleUserType | undefined;
  closeHandler: () => void;
  onFinish: (values: FormValue) => void;
}

const UserModal: FC<UserModalProps> = (props: any) => {
  const [form] = Form.useForm();
  const { visible, record, closeHandler, onFinish } = props;

  useEffect(() => {
    if (record === undefined) {
      form.resetFields();
    } else {
      form.setFieldsValue(record);
    }
  }, [visible]);

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={onOk}
        onCancel={closeHandler}
        forceRender
      >
        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Create_Time" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserModal;
