// import '../styles/globals.css'
import 'antd/dist/antd.css';
import Router from 'next/router';
import { AppLayout } from '../src/components/layout/AppLayout';
import { ConfigProvider } from 'antd';
import { ContextProvider } from '@/context';
import zhCN from 'antd/lib/locale/zh_CN';
import './styles/antd.css';
import './styles/reset.css';
import './styles/var.css';
import './styles/stopwatch.css';
function MyApp({ Component, pageProps }) {
  const { ca, tags, sysinfo } = { ca: [], tags: [], sysinfo: [] };

  return (
    <>
      <ContextProvider>
        <ConfigProvider locale={zhCN}>
          <AppLayout>
            <Component
              {...pageProps}
              ca={ca ? ca : []}
              tags={tags ? tags : []}
              sysinfo={sysinfo[0] || {}}
              // router={props.router}
            />
          </AppLayout>
        </ConfigProvider>
      </ContextProvider>
    </>
  );
}

export default MyApp;

// https://github.com/Weibozzz/next-blog
// https://github.com/fantasticit/wipi/tree/main

// https://juejin.cn/post/6931633501183836167
