import { ArticleList } from '@/components/ArticleList';
// import { Footer } from '@components/Footer';
// import { Tags } from '@components/Tags';
import { NextPage } from 'next';
import { Divider } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { myContext } from '@/context';
// import { ArticleRecommend } from '@/components/ArticleRecommend';
// import { GlobalContext } from '@/context/global';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
// import { ArticleProvider } from '@/providers/article';
// import { CategoryProvider } from '@/providers/category';
import { getArticles_all, getCategoryList, getTagList } from '@/request/api';
import { Tags } from '@/components/Tags';
import { CategoryMenu } from '../index';
import style from '../index.module.less';

interface IProps {
  articles: IArticle[];
  total: number;
  categoryList: ICategory;
  currentCategory: String,
  tagList: ICategory;
}

const pageSize = 12;

const Home: NextPage<IProps> = ({ articles: defaultArticles = [], total, categoryList, currentCategory, tagList }) => {
  const { state, dispatch } = useContext(myContext);
  console.log(state, "==state");


  const { setting, tags, categories } = state;
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>(defaultArticles);
  useEffect(() => {
    setArticles(defaultArticles);
  }, [defaultArticles]);

  const getArticles = useCallback(async () => {
    const data = await getArticles_all({ page, pageSize, status: 'publish', category: currentCategory });
    setPage(page);
    setArticles(() => {
      return [...articles, ...data.rows];
    });
  }, [currentCategory])


  return (
    <div className={style.wrapper}>
      <DoubleColumnLayout
        leftNode={
          <>
            <div className={style.tagOrCategoryDetail}>
              <p>
                <span>{currentCategory}</span> {'分类文章'}
              </p>
              <p>
                {'共搜索到'} <span>{total}</span> {'篇'}
              </p>
            </div>
            <div className={style.leftWrap}>
              <header>
                <CategoryMenu categories={categoryList} />
              </header>
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
            <Tags tags={tagList} />
            {/* <Footer className={style.footer} setting={setting} /> */}
          </div>
        }
      />
    </div>
  );
};

// 服务端预取数据
Home.getInitialProps = async (ctx) => {
  const { category: categoryValue } = ctx.query;
  let [data, categoryList, tagList] = await Promise.all([
    getArticles_all({ page: 1, pageSize: 2, category: categoryValue }),
    getCategoryList(),
    getTagList()

  ]);
  return {
    articles: data.rows,
    total: data.count,
    categoryList: categoryList,
    needLayoutFooter: false,
    currentCategory: categoryValue,
    tagList
  };
};

export default Home;
