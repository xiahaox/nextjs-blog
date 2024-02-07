import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Spin } from 'antd';
import { LocaleTime_1 } from '@/components/LocaleTime';
import style from './index.module.less';
interface IProps {
  // articleId?: string;
  mode?: 'inline' | 'vertical';
  needTitle?: boolean;
  articles: any;
}

export const ArticleRecommend: React.FC<IProps> = ({
  articles,
  mode = 'vertical',
  needTitle = true,
}) => {
  const [articless, setArticless] = useState(articles.slice(0, 6));
  const loading = false;
  return (
    <div className={style.wrapper} >
      {needTitle && (
        <div className={style.title}>
          <span>{'推荐阅读'}</span>
        </div>
      )}

      <Spin spinning={loading}>
        {loading ? (
          <div
            style={{ height: 150, backgroundColor: 'var(--bg-second)' }}
          ></div>
        ) : mode === 'inline' ? (
          articles.length <= 0 ? (
            loading ? (
              <div style={{ height: 32 }}></div>
            ) : (
              <div className={'empty'}>{'empty'}</div>
            )
          ) : (
            <ul className={style.inlineWrapper}>
              {articles.map((article) => {
                return (
                  <li key={article.id}>
                    <Link
                      href={`/article/[id]`}
                      as={`/article/${article.id}`}
                      scroll={false}
                    >
                      <a>
                        <span>{article.title}</span>
                        {' · '}
                        <span>
                          <LocaleTime_1
                            date={article.publishAt}
                            timeago={true}
                          />
                        </span>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )
        ) : // <ArticleList
          //   articles={articles || []}
          //   coverHeight={110}
          //   asRecommend={true}
          // />
          null}
      </Spin>
    </div>
  );
};
