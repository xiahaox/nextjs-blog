// import '../styles/globals.css'
import 'antd/dist/antd.css';
import Router from 'next/router';
import { AppLayout } from '../src/components/layout/AppLayout';
import { ConfigProvider } from 'antd';
import { ContextProvider } from '@/context';
import App from 'next/app';
import zhCN from 'antd/lib/locale/zh_CN';
import { getSetting, getTags } from '@/request/api';
import './styles/antd.css';
import './styles/reset.css';
import './styles/var.css';
import './styles/stopwatch.css';
import { renderToHTML } from 'next/dist/server/render';
class MyApp extends App<any> {
  static getInitialProps = async ({ Component, ctx }) => {
    const getPagePropsPromise = Component.getInitialProps
      ? Component.getInitialProps(ctx)
      : Promise.resolve({});

    const [pageProps, setting, tags] = await Promise.all([
      getPagePropsPromise,
      getSetting(),
      getTags(),
    ]);
    return {
      pageProps,
      setting,
      tags,
    };
  };
  // const { ca, tags, sysinfo } = { ca: [], tags: [], sysinfo: [] };

  render() {
    const { Component, pageProps, locales, router, tags, setting } = this.props;
    return (
      <>
        <ContextProvider store={{ tags, setting }}>
          <ConfigProvider locale={zhCN}>
            <AppLayout>
              <Component
                {...pageProps}
                // ca={ca ? ca : []}
                tags={tags ? tags : []}
                // sysinfo={sysinfo[0] || {}}
                // router={props.router}
              />
            </AppLayout>
          </ConfigProvider>
        </ContextProvider>
      </>
    );
  }
}

export default MyApp;

// https://github.com/Weibozzz/next-blog
// https://github.com/fantasticit/wipi/tree/main

// https://juejin.cn/post/6931633501183836167
