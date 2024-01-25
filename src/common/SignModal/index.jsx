import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Modal } from "antd";
// import { useLocation } from "react-router-dom";

// import { GITHUB } from '@/config'
// import { save } from "@/utils/storage";

// redux
// import { login, register } from '@/redux/user/actions'
// import { useDispatch } from 'react-redux'

// hooks
import { useEventBus } from "@/hooks/useEventBus";

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

function FormItem(props) {
  const { children, ...rest } = props;
  return (
    <Form.Item {...FormItemLayout} {...rest}>
      {children}
    </Form.Item>
  );
}

function SignModal(props) {
  // const dispatch = useDispatch() // dispatch hooks
  // const location = useLocation(); // location
  const { emit, on } = useEventBus();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("login");
  const [form] = Form.useForm();
  const { getFieldDecorator } = form;

  on("openSignModal", (type) => {
    form.resetFields();
    setType(type);
    setVisible(true);
  });

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      // const action = type === 'login' ? login : register
      // dispatch(action(values)).then(() => {
      //   setVisible(false) // type =  login | register
      // })
    });
  }

  // function githubLogin() {
  //   const { pathname, search } = location;
  //   save("prevRouter", `${pathname}${search}`);
  //   window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`;
  // }

  // 确认密码
  // function compareToFirstPassword(rule, value, callback) {
  //   const form = props.form;
  //   if (value && value !== form.getFieldValue("password")) {
  //     callback("Two passwords that you enter is inconsistent!");
  //   } else {
  //     callback();
  //   }
  // }

  return (
    <Modal
      width={460}
      title={type}
      visible={visible}
      onCancel={(e) => setVisible(false)}
      footer={null}
    >
      <Form layout="horizontal" form={form}>
        {type === "login" ? (
          <>
            <FormItem
              label="用户名"
              children={<Input placeholder="请输入用户名" />}
              name={"account"}
              rules={[{ required: true, message: "Username is required" }]}
              // rules = [{ required: true, message: "Username is required" }]
            >
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem
              label="密码"
              children={<Input placeholder="请输入密码" />}
              name={"password"}
              type="password"
              rules={[{ required: true, message: "Password is required" }]}
            ></FormItem>
          </>
        ) : (
          <>
            <FormItem
              label="用户名"
              children={<Input placeholder="请输入用户名" />}
              name={"username"}
              type="password"
              rules={[{ required: true, message: "Username is required" }]}
            ></FormItem>
            <FormItem
              label="密码"
              children={<Input placeholder="请输入密码" />}
              name={"password"}
              type="password"
              rules={[{ required: true, message: "Password is required" }]}
            ></FormItem>
            <FormItem
              label="确认密码"
              children={<Input placeholder="确认密码" />}
              name={"confirm"}
              type="password"
              rules={[{ required: true, message: "Password is required" }]}
            ></FormItem>
            <FormItem
              label="邮箱"
              children={<Input placeholder="请输入您的邮箱" />}
              name={"email"}
              type="email"
              rules={[
                { type: "email", message: "The input is not valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            ></FormItem>
          </>
        )}
      </Form>
      <Button type="primary" block onClick={handleSubmit}>
        {type}
      </Button>
      {/* {GITHUB.enable && (
        <Button block icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
          github login
        </Button>
      )} */}
    </Modal>
  );
}

export default SignModal;
