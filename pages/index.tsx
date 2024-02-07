import { useCallback, useContext, useEffect, useState } from 'react';
import { myContext } from '@/context';
import { Skeleton, Divider, Avatar } from 'antd';
// import Head from 'next/head';
import cls from 'classnames';
import { Tags } from '@/components/Tags';
import Image from 'next/image';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
import style from './index.module.less';
import { ArticleCarousel } from '@/components/ArticleCarousel';
import { getArticles_all, getTagList, getCategoryList } from '@/request/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArticleList } from '@/components/ArticleList';
import { ArticleRecommend } from '@/components/ArticleRecommend';
import CountUp from 'react-countup';

export const CategoryMenu = ({ categories }) => {
  const router = useRouter();

  const { asPath } = router;
  return (
    <>
      {[
        {
          name: '所有',
          path: '/',
          count: 1
        },
        ...categories,
      ].map((category, index) => {
        category.path = '/' + category?.name
        return (
          <Link
            key={index}
            {...(index === 0
              ? { href: '/' }
              : {
                href: '/category/[category]',
                as: `/category/` + category.name,
              })}
            shallow={false}
          >
            <a
              className={cls({
                [style.active]:
                  index === 0
                    ? asPath === category.path
                    : asPath.replace('/category/', '') === category.name,
              })}
              aria-label={category.name}
            >
              <span>{category.name}</span>
            </a>
          </Link>
        );
      })}
    </>
  );
};

export default function Home({
  articles: defaultArticles = [],
  recommendedArticles = [],
  categoryList, tagList,
  total = 0,
}) {
  const { state, dispatch } = useContext(myContext);

  const { setting, tags, categories } = state;

  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState(defaultArticles);
  const pageSize = 2;

  // useEffect(() => {
  //   setArticles(defaultArticles);
  // }, [defaultArticles]);

  const getArticles = async (page) => {
    const data = await getArticles_all({ page, pageSize, status: 'publish' });
    setPage(page);
    setArticles(() => {
      return [...articles, ...data.rows];
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
                <CategoryMenu categories={categoryList} />
              </header>
              <CountUp
                start={1.09}
                end={160527.012}
                duration={2.75}
                separator=" "
                decimals={4}
                decimal=","
                prefix="EUR "
                suffix=" left"
                onEnd={() => console.log('Ended! 👏')}
                onStart={() => console.log('Started! 💨')}
              >
                {({ countUpRef, start }) => (
                  <div>
                    <span ref={countUpRef} />
                    <button onClick={start}>Start</button>
                  </div>
                )}
              </CountUp>
              <main>
                <InfiniteScroll
                  dataLength={articles.length}
                  next={() => getArticles(page + 1)}
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
        rightNode={
          <div className="sticky">
            <ArticleRecommend mode="inline" articles={recommendedArticles} />
            <Tags tags={tagList} />
            {/* <Footer className={style.footer} setting={setting} /> */}
          </div>
        }
      ></DoubleColumnLayout>
    </div>
  );
}
// 服务端预取数据

Home.getInitialProps = async () => {
  let [data, categoryList, tagList] = await Promise.all([
    getArticles_all({ page: 1, pageSize: 2, status: 'publish' }),
    getCategoryList(),
    getTagList()
  ]);
  // recommendedArticles = recommendedArticles.data;
  const recommendedArticles = data.rows;
  return {
    articles: data.rows,
    total: 40,
    // total: data.count,
    categoryList: categoryList,
    tagList: tagList,
    needLayoutFooter: false,
    recommendedArticles
  };
};