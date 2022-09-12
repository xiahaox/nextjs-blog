import React, { useState, useCallback, useEffect, useContext } from 'react';
import { NextPage } from 'next';
import { myContext } from '@/context';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getKnowledges } from '@/request/api';
import { KnowledgeList } from '@/components/KnowledgeList';
import { Skeleton, Divider, Avatar } from 'antd';

interface IHomeProps {
  books: [];
  total: number;
}

const pageSize = 12;
const Page: NextPage<IHomeProps> = ({
  books: defaultBooks = [],
  total = 0,
}) => {
  const { categories, setting } = useContext(myContext);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState<[]>(defaultBooks);

  const getArticles = useCallback((page) => {
    getKnowledges({
      page,
      pageSize,
      status: 'publish',
    }).then((res) => {
      console.log(res);
      setPage(page);
      // setBooks((articles) => [...articles, ...res[0]]);
    });
  }, []);

  return (
    <DoubleColumnLayout
      leftNode={
        <InfiniteScroll
          dataLength={1}
          next={() => getArticles(1)}
          hasMore={page * pageSize < total}
          loader={<div className={'loading'} key={0}></div>}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <KnowledgeList knowledges={books} />
        </InfiniteScroll>
      }
      rightNode=""
      // rightNode={
      //   <div className={'sticky'}>
      //     <ArticleRecommend mode="inline" />
      //     <Categories categories={categories} />
      //     <Footer className={indexStyle.footer} setting={setting} />
      //   </div>
      // }
    />
  );
};

export default Page;
Page.getInitialProps = async () => {
  const [books, total] = await getKnowledges({
    page: 1,
    pageSize,
    status: 'publish',
  });
  return {
    books,
    total,
    needLayoutFooter: false,
  };
};
