import { ArticleList } from '@/components/ArticleList';
import { Categories } from '@/components/Categories';
// import { Footer } from '@components/Footer';
import { Tags } from '@/components/Tags';
import { NextPage } from 'next';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';
// import { ArticleRecommend } from '@/components/ArticleRecommend';
// import { GlobalContext } from '@/context/global';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
// import { ArticleProvider } from '@/providers/article';
// import { TagProvider } from '@/providers/tag';
import { getArticles_all, getCategoryList, getTagList } from '@/request/api';

import style from '../index.module.less';

interface IProps {
  articles: IArticle[];
  total: number;
  tag: ITag;
  currentTag: String;
  categoryList: IArticle[];
  tagList: IArticle[];
}

const pageSize = 12;

const Home: NextPage<IProps> = ({ articles: defaultArticles = [], total, tag, currentTag, categoryList, tagList }) => {
  // const { setting, tags, categories } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);

  useEffect(() => {
    setArticles(defaultArticles);
  }, [defaultArticles]);

  const getArticles = useCallback(async () => {
    const data = await getArticles_all({ page, pageSize, status: 'publish', tag: currentTag });
    setPage(page);
    setArticles(() => {
      return [...articles, ...data.rows];
    });
  }, [currentTag])

  return (
    <div className={style.wrapper}>
      <DoubleColumnLayout
        leftNode={
          <>
            <div className={style.tagOrCategoryDetail}>
              <p>
                {'与'} <span>{currentTag}</span> {'标签有关的文章'}
              </p>
              <p>
                {'共搜索到 '} <span>{total}</span> {'篇'}
              </p>
            </div>
            <Tags tags={tagList} />
            <div className={style.leftWrap}>
              <main>
                <InfiniteScroll
                  dataLength={articles.length}
                  next={() => getArticles(page + 1)}
                  hasMore={page * pageSize < total}
                  loader={
                    <div className={'loading'} key={0}>
                      {'gettingArticle'}
                    </div>
                  }
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
            {/* <ArticleRecommend mode="inline" /> */}
            <Categories categories={categoryList} />
            {/* <Footer className={style.footer} setting={setting} /> */}
          </div>
        }
      />
    </div>
  );
};

// 服务端预取数据
Home.getInitialProps = async (ctx) => {
  const { tag: tagValue } = ctx.query;
  let [data, categoryList, tagList] = await Promise.all([
    getArticles_all({ page: 1, pageSize: 2, tag: tagValue }),
    getCategoryList(),
    getTagList()
  ]);
  return {
    articles: data.rows,
    total: data.count,
    categoryList: categoryList,
    needLayoutFooter: false,
    currentTag: tagValue,
    tagList
  };
};

export default Home;
