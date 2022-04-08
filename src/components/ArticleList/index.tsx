import React from 'react';
import Link from 'next/link';
import style from './index.module.less';
import { Divider } from 'antd';
import LocaleTime from '@/components/ArticleCarousel/LocaleTime';
import LazyLoad from 'react-lazyload';
import EyeOutlined from '@ant-design/icons';
import HeartOutlined from '@ant-design/icons';
import ShareAltOutlined from '@ant-design/icons';

interface IProps {
  articles: [];
  // coverHeight?: number;
  // asRecommend?: boolean;
}

export const ArticleList: React.FC<IProps> = ({ articles = [] }) => {
  console.log(articles);

  return (
    <div className={style.wrapper}>
      {articles && articles.length ? (
        articles.map((article) => {
          return (
            <div key={article.id} className={style.articleItem}>
              <Link
                href={`/article/[id]`}
                as={`/article/${article.id}`}
                scroll={false}
              >
                <a aria-label={article.title}>
                  <header>
                    <div className={style.title}>{article.title}</div>
                    <div className={style.info}>
                      <Divider type="vertical" />
                      <span className={style.time}>
                        <LocaleTime date={article.publishAt} timeago={true} />
                      </span>
                      {article.category && (
                        <>
                          <Divider type="vertical" />
                          <span className={style.time}>
                            {article.category.label}
                          </span>
                        </>
                      )}
                    </div>
                  </header>
                  <main>
                    <div className={style.contentWrapper}>
                      <div className={style.desc}>{article.summary}</div>
                      <div className={style.meta}>
                        <span>
                          <HeartOutlined />
                          <span className={style.number}>{article.likes}</span>
                        </span>
                        <span className={style.seperator}>·</span>
                        <span>
                          <EyeOutlined />
                          <span className={style.number}>{article.views}</span>
                        </span>
                        <span className={style.seperator}>·</span>
                        {/* <Share
                            cover={article.cover}
                            title={article.title}
                            desc={article.summary}
                            url={`/article/${article.id}`}
                          >
                            <span>
                              <ShareAltOutlined />
                              <span className={style.number}>{t('share')}</span>
                            </span>
                          </Share> */}
                      </div>
                    </div>

                    {article.cover && (
                      <LazyLoad height={120}>
                        <div className={style.coverWrapper}>
                          <img src={article.cover} alt="cover" />
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