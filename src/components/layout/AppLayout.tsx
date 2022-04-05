
import React, { useContext, useMemo, useEffect } from 'react';
import { BackTop } from 'antd';
import styles from './index.module.less'
import { Header } from '../Header';


export const AppLayout: React.FC = ({ children }) => {
    const { setting, pages, tags, customBg
    } = {
        setting: '', pages: [], tags: [], customBg: true
    }
    return (
        <div className={styles.wrapper}>
            {/* <Seo /> */}
            <Header setting={setting} tags={tags} pages={pages} hasBg={customBg} />
            <main
                className={styles.main}
                style={{ backgroundColor: true ? 'transparent' : 'var(--bg-body)' }}
            >
                {children}
            </main>
            {/* {systemBg && !hasBg && <div className={style.bg} style={{ backgroundImage: bg }}></div>} */}
            <BackTop />
            {/* {needFooter && <Footer setting={setting} hasBg={customBg} />} */}
        </div>
    )
}
