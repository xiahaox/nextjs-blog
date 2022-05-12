import React from 'react';
import { Carousel } from 'antd';
import Link from 'next/link';
import style from './index.module.less';
import { LocaleTime_1 } from '@/components/LocaleTime';
interface IProps {
  articles: [];
}

export const ArticleCarousel: React.FC<any> = ({ articles = [] }) => {
  return articles && articles.length ? (
    <div className={style.wrapper}>
      <Carousel autoplay={true}>
        {(articles || [])
          .filter((article) => article.cover)
          .slice(0, 6)
          .map((article) => {
            return (
              <div key={article.id}>
                <div
                  className={style.articleItem}
                  style={{ backgroundImage: `url(${article.cover})` }}
                >
                  <Link
                    href={`/article/[id]`}
                    as={`/article/${article.id}`}
                    scroll={false}
                  >
                    <a aria-label={article.title}>
                      <div className={style.info}>
                        <h2 className={style.title}>{article.title}</h2>
                        <p>
                          <span>
                            <LocaleTime_1
                              date={article.publishAt}
                              timeago={true}
                            />
                          </span>
                          <span className={style.seperator}>·</span>
                          <span>
                            {article.views} {'次阅读'}
                          </span>
                        </p>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  ) : null;
};
