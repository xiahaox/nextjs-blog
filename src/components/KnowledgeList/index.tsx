import React from 'react';
import Link from 'next/link';
import cls from 'classnames';
import style from './index.module.less';
import { LocaleTime_1 } from '@/components/LocaleTime';
import { Divider } from 'antd';
import LazyLoad from 'react-lazyload';
import { EyeOutlined, ShareAltOutlined } from '@ant-design/icons';

interface IProps {
  small?: boolean;
  knowledges: [];
}

export const KnowledgeList: React.FC<IProps> = ({
  knowledges = [],
  small = false,
}) => {
  return (
    <div className={style.wrapper}>
      {knowledges && knowledges.length ? (
        knowledges.map((knowledge) => {
          return (
            <div
              key={knowledge.id}
              className={cls(style.articleItem, small && style.small)}
            >
              <Link
                key={knowledge.id}
                href={`/knowledge/[pId]`}
                as={`/knowledge/${knowledge.id}`}
                scroll={false}
              >
                <a aria-label={knowledge.title}>
                  <header>
                    <div className={style.title}>{knowledge.title}</div>
                    <div className={style.info}>
                      <Divider type="vertical" />
                      <span className={style.time}>
                        <LocaleTime_1
                          date={knowledge.publishAt}
                          timeago={true}
                        />
                      </span>
                    </div>
                  </header>
                  <main>
                    <div className={style.contentWrapper}>
                      <div className={style.desc}>{knowledge.summary}</div>
                      <div className={style.meta}>
                        <span>
                          <EyeOutlined />
                          <span className={style.number}>
                            {knowledge.views}
                          </span>
                        </span>
                        <span className={style.seperator}>·</span>
                        {/* <Share
                          cover={knowledge.cover}
                          title={knowledge.title}
                          desc={knowledge.summary}
                          url={`/knowledge/${knowledge.id}`}
                        >
                          <span>
                            <ShareAltOutlined />
                            <span className={style.number}>{t('share')}</span>
                          </span>
                        </Share> */}
                      </div>
                    </div>

                    {knowledge.cover && (
                      <LazyLoad height={120}>
                        <div className={style.coverWrapper}>
                          <img src={knowledge.cover} alt="cover" />
                        </div>
                      </LazyLoad>
                    )}
                  </main>
                </a>
              </Link>
            </div>
          );
        })
      ) : (
        <div className={'empty'}>{'empty'}</div>
      )}
    </div>
  );
};
