import React, { useContext, useMemo, useEffect } from 'react';
import { BackTop } from 'antd';
import styles from './index.module.less';
import { Header } from '../Header';
// import { ContextProvider } from '@/common';
import SignModal from '@/common/SignModal'
// import UploadModal from '@/components/Public/UploadModal'

export const AppLayout: React.FC = ({ children }) => {
  const { setting, pages, tags, customBg } = {
    setting: '',
    pages: [],
    tags: [],
    customBg: true,
  };
  return (
    <div className={styles.wrapper}>
      {/* <Seo /> */}
      {/* 顶部导航栏 */}
      <Header setting={setting} tags={tags} pages={pages} hasBg={customBg} />
      <main
        className={styles.main}
        style={{ backgroundColor: true ? '#e7eaee' : 'var(--bg-body)' }}
      >
        {children}
      </main>
      {/* {systemBg && !hasBg && <div className={style.bg} style={{ backgroundImage: bg }}></div>} */}
      <BackTop />
      {/* {needFooter && <Footer setting={setting} hasBg={customBg} />} */}
      <SignModal />

    </div>
  );
};
