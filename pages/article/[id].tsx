import { TagOutlined } from '@ant-design/icons';
import { Form, Input, message, Modal } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import { default as Router } from 'next/router';
import { getArticle } from '@/request/api';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import { Helmet } from 'react-helmet';

// import { ArticleRecommend } from '@/components/ArticleRecommend';
// import { Comment } from '@/components/Comment';
import { ImageViewer } from '@/components/ImageViewer';
// import { LocaleTime } from '@/components/LocaleTime';
import { MarkdownReader } from '@/components/MarkdownReader';
// import { Toc } from '@/components/Toc';
// import { GlobalContext } from '@/context/global';
import { DoubleColumnLayout } from '@/components/DoubleColumnLayout';
import Discuss from '@/components/Discuss'

import style from './index.module.scss';
// const url = require('url');

interface IProps {
  article: IArticle;
}

const Article: NextPage<IProps> = ({ article }) => {
  console.log(article, "==article");
  // const { setting } = useContext(GlobalContext);
  // const passwdRef = useRef(null);
  // const [shouldCheckPassWord, setShouldCheckPassword] = useState(article && article.needPassword);
  // const tocs = article && article.toc ? JSON.parse(article.toc) : [];
  const [commentList, setCommentList] = useState(() => article.comments || []);

  // 检查文章密码
  // const checkPassWord = useCallback(() => {
  //   ArticleProvider.checkPassword(article.id, passwdRef.current).then((res) => {
  //     if (res.pass) {
  //       Object.assign(article, res);
  //       setShouldCheckPassword(false);
  //     } else {
  //       message.error(t('wrongPasswd'));
  //       setShouldCheckPassword(true);
  //     }
  //   });
  // }, [article]);

  const back = useCallback(() => {
    Router.push('/');
  }, []);

  // const checkPassWordModal = (
  //   <Modal
  //     title={'protectedArticleMsg'}
  //     cancelText={'backHome'}
  //     okText={'confirm'}
  //     visible={shouldCheckPassWord}
  //     onOk={checkPassWord}
  //     onCancel={back}
  //   >
  //     <Form.Item label={'passwd'}>
  //       <Input.Password
  //         onChange={(e) => {
  //           passwdRef.current = e.target.value;
  //         }}
  //       />
  //     </Form.Item>
  //   </Modal>
  // );

  // useEffect(() => {
  //   setShouldCheckPassword(article && article.needPassword);
  // }, [article]);

  // 更新阅读量
  // useEffect(() => {
  //   if (!shouldCheckPassWord) {
  //     ArticleProvider.updateArticleViews(article.id);
  //   }
  // }, [shouldCheckPassWord, article]);


  const Content = (
    <>
      {/* {checkPassWordModal}
      <Helmet>
        <title>{(article.title || t('unknownTitle')) + ' | ' + setting.systemTitle}</title>
      </Helmet> */}
      <ImageViewer containerSelector="#js-article-wrapper">
        <article id="js-article-wrapper" className={style.articleWrap}>


          {/* S 文章封面 */}
          {article.cover && (
            <div className={style.coverWrapper}>
              <img src={article.cover} alt={'articleCover'} />
            </div>
          )}
          {/* E 文章封面 */}

          {/* S 文章元信息 */}
          <div className={style.metaInfoWrap}>
            <h1 className={style.title}>{article.title}</h1>
            <p className={style.desc}>
              <span>
                {'发布于'}
                {article.createdAt}
              </span>
              <span> • </span>
              <span>
                {'阅读量'} {article.viewCount}
              </span>
            </p>
          </div>

          {/* S 文章内容 */}
          <MarkdownReader content={article.content} />
          <div className='article-detail' dangerouslySetInnerHTML={{ __html: article.content }} />
          {/* E 文章内容 */}

          {/* S 文章脚部 */}
          <div className={style.footerInfoWrap}>
            {/* S 文章版权 */}
            <div className={style.copyrightInfo}>
              {'更新于'}
              {article.updatedAt}
              <a href="/" rel="noreferrer">
                {'copyrightContent'}
              </a>
            </div>
            {/* E 文章版权 */}

            {/* S 文章标签 */}
            {article.tags && article.tags.length ? (
              <div className={style.tagsWrap}>
                {article.tags.map((tag) => {
                  return (
                    <div className={style.tagWrapper} key={tag.id}>
                      <div className={style.tag}>
                        <Link href={'/tag/[tag]'} as={'/tag/' + tag.name} scroll={false}>
                          <a aria-label={tag.name}>
                            <TagOutlined />
                            <span>{tag.name}</span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
            {/* E 文章标签 */}
          </div>
          {/* E 文章脚部 */}
        </article>

        {/* S 文章评论 */}

        <div className={style.commentWrap}>
          <p className={style.title}>{'评论'}</p>
          <Discuss articleId={article.id} commentList={commentList} setCommentList={setCommentList} />
        </div>

        {/* E 文章评论 */}

        {/* S 推荐文章 */}
        {/* <div className={style.recmmendArticles}>
          <p className={style.title}>{t('recommendToReading')}</p>
          <div className={style.articleContainer}>
            <ArticleRecommend articleId={article.id} needTitle={false} />
          </div>
        </div> */}
        {/* E 推荐文章 */}
      </ImageViewer>
    </>
  );

  const Aside = (
    <>
      <div className={'sticky'}>
        {/* {tocs && tocs.length ? <Toc key={article.id} tocs={tocs} maxHeight={'80vh'} /> : null} */}
      </div>
    </>
  );

  return (
    <DoubleColumnLayout
      leftNode={Content}
      rightNode={Aside}
      // likesProps={{
      //   defaultCount: article.likes,
      //   id: article.id,
      //   api: (id, type) => ArticleProvider.updateArticleLikes(id, type).then((res) => res.likes),
      // }}
      showComment={article.isCommentable}
    />
  );
};

Article.getInitialProps = async (ctx) => {
  const { id } = ctx.query;
  const article = await getArticle(id);
  return { article };
};

export default Article;
