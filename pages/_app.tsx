// import '../styles/globals.css'
import 'antd/dist/antd.css'
import Router from 'next/router'
import { AppLayout } from '../src/components/layout/AppLayout';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import '@/theme/antd.less';
import '@/theme/reset.css';
import '../src/theme/antd.less'
import '../src/theme/reset.css'

function MyApp({ Component, pageProps }) {
  const { ca, tags, sysinfo } = { ca: [], tags: [], sysinfo: [] };
  return (
    <>
      <ConfigProvider locale={zhCN}>
        <AppLayout >
          <Component
            {...pageProps}
            ca={ca ? ca : []}
            tags={tags ? tags : []}
            sysinfo={sysinfo[0] || {}}
          // router={props.router}
          />
        </AppLayout>
      </ConfigProvider>




    </>

  )
}

export default MyApp
