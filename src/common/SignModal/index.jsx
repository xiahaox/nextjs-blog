import React, { useState, useEffect, useContext } from "react";
import { Form, Icon, Input, Button, Modal, message } from "antd";
// import { useLocation } from "react-router-dom";
import { login, register } from "@/request/api";
import { myContext } from "@/context";
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
  const { emit, on } = useEventBus();
  const { state, dispatch } = useContext(myContext);
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("login");
  const [form] = Form.useForm();

  on("openSignModal", (type) => {
    form.resetFields();
    setType(type);
    setVisible(true);
  });

  function onFinish(values) {
    const action = type === "login" ? login : register;
    action(values)
      .then((res) => {
        console.log(res, "==res");
        if (type === "login") {
          dispatch({
            type: "USER_LOGIN",
            payload: res,
          });
          message.success(`登录成功, 欢迎您 ${res.username}`);
        }
        if (type === "register") {
          message.success("注册成功，请重新登录您的账号！");
        }
        setVisible(false);
      })
      .catch((err) => {
        console.log(err, "err======");
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
      <Form
        layout="horizontal"
        onFinish={onFinish}
        form={form}
        scrollToFirstError
      >
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
        <Button type="primary" block htmlType="submit">
          {type}
        </Button>
      </Form>

      {/* {GITHUB.enable && (
        <Button block icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
          github login
        </Button>
      )} */}
    </Modal>
  );
}

export default SignModal;
