// import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Dropdown, Form, Input, Menu, Modal, Tooltip } from 'antd';
import Router from 'next/router';
// import { useTranslations } from 'next-intl';
import React, { useCallback, useContext, useEffect } from 'react';
// import { UserProvider } from '@/providers/user';
import { useToggle } from '@/hooks/useToggle';
import styles from './index.module.scss';
import { myContext } from '@/context';
import { useEventBus } from '@/hooks/useEventBus'
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { state, dispatch } = useContext(myContext);
  const { user } = state;
  const { emit } = useEventBus();
  const { role, username } = user;
  const MenuOverLay = (
    <Menu>
      {/* {role === 1 && (
        <Menu.Item>
          <span onClick={e => bus.emit('openUploadModal')}>导入文章</span>
        </Menu.Item>
      )} */}
      {role === 1 && (
        <Menu.Item>
          <span onClick={e => router.push('/admin')}>后台管理</span>
        </Menu.Item>
      )}
      <Menu.Item>
        <span className='user-logout' onClick={e => dispatch({
          type: "USER_LOGIN_OUT",
        })}>
          退出登录
        </span>
      </Menu.Item>
    </Menu >
  )
  return (
    <div>
      {
        username ? (
          <Dropdown placement='bottomCenter' overlay={MenuOverLay} trigger={['click', 'hover']}>
            <div style={{ height: 55 }}>
              {/* <AppAvatar userInfo={userInfo} popoverVisible={false} /> */}
              <Avatar src={''}>{username}</Avatar>
            </div>
          </Dropdown>
        ) : (
          <>
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
          </>
        )
      }

    </div>

  );
}