import { useCallback, useContext, useState } from 'react';
import { myContext } from '@/context';
import { Skeleton, Divider, Avatar } from 'antd';
import Head from 'next/head';
import cls from 'classnames';
import Image from 'next/image';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
import style from './index.module.less';
import { ArticleCarousel } from '@/components/ArticleCarousel';
import httpProvider from '@/request';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleList } from '@/components/ArticleList';

export const CategoryMenu = ({ categories }) => {
  const router = useRouter();
  console.log('router', router);

  const { asPath } = router;

  return (
    <>
      {[
        {
          label: '所有',
          path: '/',
        },
        ...categories,
      ].map((category, index) => (
        <Link
          key={index}
          {...(index === 0
            ? { href: '/' }
            : {
                href: '/category/[category]',
                as: `/category/` + category.value,
              })}
          shallow={false}
        >
          <a
            className={cls({
              [style.active]:
                index === 0
                  ? asPath === category.path
                  : asPath.replace('/category/', '') === category.value,
            })}
            aria-label={category.label}
          >
            <span>{category.label}</span>
          </a>
        </Link>
      ))}
    </>
  );
};

export default function Home({
  articles: defaultArticles = [],
  recommendedArticles = [],
  total = 0,
  // total = 0,
}) {
  const { state, dispatch } = useContext(myContext);
  const { setting, tags, categories } = state;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState(defaultArticles);
  const pageSize = 2;
  const getArticles = async (page) => {
    const data = await httpProvider({
      url: '/api/article',
      method: 'get',
      params: { page, pageSize, status: 'publish' },
    });
    setPage(page);
    setArticles(() => {
      return [...articles, ...data[0]];
    });
  };

  return (
    <div className={style.wrapper}>
      <DoubleColumnLayout
        leftNode={
          <>
            <div className={style.crouselWrap}>
              {/*  轮播图 */}
              <ArticleCarousel articles={recommendedArticles} />
            </div>
            <div className={style.leftWrap}>
              <header>
                <CategoryMenu categories={categories} />
              </header>
              <main>
                <InfiniteScroll
                  dataLength={1}
                  next={() => getArticles(1)}
                  hasMore={page * pageSize < total}
                  loader={<div className={'loading'} key={0}></div>}
                  endMessage={
                    <Divider plain>It is all, nothing more 🤐</Divider>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <ArticleList articles={articles} />
                </InfiniteScroll>
              </main>
            </div>
          </>
        }
        rightNode={''}
      ></DoubleColumnLayout>
    </div>
  );
}
// 服务端预取数据

Home.getInitialProps = async () => {
  const [recommendedArticles, articles] = await Promise.all([
    httpProvider({
      url: '/api/recommend',
      method: 'get',
    }).catch(() => []),
    httpProvider({
      url: '/api/article',
      method: 'get',
      params: { page: 1, pageSize: 2, status: 'publish' },
    }),
  ]);

  return {
    articles: articles[0],
    total: articles[1],
    recommendedArticles,
    needLayoutFooter: false,
  };
};
