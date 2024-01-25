import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Dropdown, Form, Input, Menu, Modal, Tooltip } from 'antd';
import Router from 'next/router';
// import { useTranslations } from 'next-intl';
import React, { useCallback, useContext, useEffect } from 'react';
// import { UserProvider } from '@/providers/user';
import { useToggle } from '@/hooks/useToggle';
import styles from './index.module.scss';
import { myContext } from '@/context';
import { useEventBus } from '@/hooks/useEventBus'

export type IUser = {
  name: string;
  email: string;
};

export const UserInfo: React.FC<{
  defaultVisible?: boolean;
  hidden?: boolean;
  onOk?: (arg: IUser) => void;
  onCancel?: () => void;
}> = ({ defaultVisible = false, hidden = false, onOk = () => { }, onCancel = () => { } }) => {
  const [visible, toggleVisible] = useToggle(defaultVisible);
  // const tRoot = useTranslations();
  // const t = useTranslations('commentNamespace');

  const { state, dispatch } = useContext(myContext);
  // console.log(state, "==state");
  const { user, setUser, removeUser } = state;
  const { emit } = useEventBus();
  const submit = useCallback(
    (values) => {
      // UserProvider.login(values).then((res) => {
      //   setUser(res);
      //   onOk(res);
      //   toggleVisible(false);
      // });
    },
    [toggleVisible, onOk,]
  );

  return (
    <div>
      {
        user ? user : null
      }
      <Button
        ghost
        type='primary'
        size='small'
        style={{ marginRight: 20 }}
        onClick={e => emit('openSignModal', 'login')}>
        登录
      </Button>
      <Button ghost type='danger' size='small' onClick={e => emit('openSignModal', 'register')}>
        注册
      </Button>

      <Modal
        title={'帐密登录'}
        okText={'登录'}
        cancelText={'取消'}
        visible={visible}
        footer={null}
        onCancel={() => {
          toggleVisible();
          onCancel();
        }}
        transitionName={''}
        maskTransitionName={''}
        width="26.5em"
      >
        <Form name="user-info" onFinish={submit}>
          <Form.Item name="name" rules={[{ required: true, message: "请输入您的称呼" }]}>
            <Input placeholder={'用户名'} />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
            <Input placeholder={'密码'} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {'登陆'}
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.other}>
          {/* <div className={styles.icon} onClick={loginWithGithub}>
            <Tooltip title={tRoot('useGithubToLogin')}>
              <GithubOutlined />
            </Tooltip>
          </div> */}
          <Alert style={{ marginTop: 16 }} message={'请登录账号，否则无法进行评论，如需账号，可前往后台系统进行注册'} type="info" showIcon={true} />
        </div>
      </Modal>
    </div>

  );
}