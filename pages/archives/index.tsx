import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
import style from './index.module.less';
import { ListTrail } from '@/components/Animation/ListTrail';
import { getArchives } from '@/request/api';
import { LocaleTime_2 } from '@/components/LocaleTime';
import { Props } from 'react-infinite-scroll-component';
// interface IProps {
//   articles: [];
// }
const resolveArticlesCount = (articles) => {
  const years = Object.keys(articles);
  return years.reduce((a, year) => {
    const months = Object.keys(articles[year]);
    a += months.reduce((b, month) => (b += articles[year][month].length), 0);
    return a;
  }, 0);
};

const ArchiveItem = ({ key, month, articles = [] }) => {
  return (
    <div className={style.item}>
      <h3>{month}</h3>
      <ul>
        <ListTrail
          // length={articles.length}
          articles={articles}
          options={{
            opacity: 1,
            height: 48,
            x: 0,
            from: { opacity: 0, height: 0, x: -20 },
          }}
          renderItem={(index) => {
            const article = articles[index];
            return (
              <Link
                href={`/article/[id]`}
                as={`/article/${article.id}`}
                scroll={false}
              >
                <a aria-label={article.title}>
                  <span className={style.meta}>
                    <LocaleTime_2 date={article.publishAt} format={'MM-dd'} />
                  </span>
                  <span className={style.title}>{article.title}</span>
                </a>
              </Link>
            );
          }}
        />
      </ul>
    </div>
  );
};
export default function Archives({ month, articles = [] }) {
  useEffect(() => {}, []);

  return (
    <DoubleColumnLayout
      leftNode={
        <div className={style.content}>
          <div className={style.summary}>
            <p>
              <span>{'归档'}</span>
            </p>
            <p>
              {'总计'} <span>{resolveArticlesCount(articles)}</span> {'篇'}
            </p>
          </div>
          {Object.keys(articles)
            .sort((a, b) => +b - +a)
            .map((year) => {
              return (
                <div className={style.list} key={year}>
                  <h2>{year}</h2>
                  {Object.keys(articles[year]).map((month) => {
                    return ArchiveItem({
                      key: year + '-' + month,
                      month,
                      articles: articles[year][month],
                    });
                  })}
                </div>
              );
            })}
        </div>
      }
      rightNode={''}
    />
  );
}
Archives.getInitialProps = async () => {
  const articles = await getArchives();
  return { articles, needLayoutFooter: false };
};
