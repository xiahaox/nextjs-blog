import React, { useState, useCallback, useEffect, useRef } from 'react';
import CloseOutlined from '@ant-design/icons';
import styles from './index.module.less';
import cls from 'classnames';
import { Input, Modal } from 'antd';
import Link from 'next/link';
import { ListTrail } from '@/components/Animation/ListTrail';
import 'antd/dist/antd.css';
const { Search: AntdSearch } = Input;
import { searchArticle } from '@/request/api';

interface IProps {
  tags: [];
  visible: boolean;
  onClose: (arg: boolean) => void;
}

export const Search: React.FC<IProps> = ({ visible, onClose }) => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<[]>([]);

  const getArticles = (keyword) => {
    if (!keyword) {
      setArticles([]);
      return;
    }
    // searchArticles(keyword).then((res) => {
    //   setArticles(res.filter((t) => t.status === 'publish'));
    // });
    searchArticle().then(res => {
      setArticles(res.data);
    })
  };
  const close = useCallback(() => {
    setArticles([]);
    onClose(false);
  }, [onClose]);
  useEffect(() => {
    if (visible) ref.current.focus();
  }, [visible]);
  return (
    <div>
      {visible ? (
        <div className={styles.wrapper}>
          <div className={styles.bg}></div>
          <div className={cls('', styles.inner)}>
            <header>
              <span className={styles.title}>搜索</span>
              <span className={styles.btnWrapper} onClick={close}>
                <CloseOutlined />
                <span>esc</span>
              </span>
            </header>

            <section>
              <AntdSearch
                ref={ref}
                size="large"
                loading={loading}
                placeholder="searchArticlePlaceholder"
                onSearch={getArticles}
                style={{ width: '100%' }}
              />
            </section>

            <section className={styles.result}>
              {articles.length ? (
                <ul>
                  <ListTrail
                    articles={articles}
                    options={{
                      config: {
                        mass: 1,
                        tension: 180,
                        friction: 12,
                        clamp: true,
                      },
                      opacity: loading ? 0 : 1,
                      height: loading ? 0 : 48,
                      from: { opacity: 0, height: 0 },
                    }}
                    renderItem={(index) => {
                      const article = articles[index];
                      return (
                        <Link
                          key={article.id}
                          href={`/article/[id]`}
                          as={`/article/${article.id}`}
                          scroll={false}
                        >
                          <a
                            aria-label={article.title}
                            className={styles.item}
                            onClick={close}
                          >
                            {article.title}
                          </a>
                        </Link>
                      );
                    }}
                  />
                </ul>
              ) : (
                <p className="empty">empty</p>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </div>
  );
};
