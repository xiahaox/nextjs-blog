import cls from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { ListTrail } from '@/components/Animation/Trail';

import style from './index.module.scss';

export const Categories = ({ categories = [] }) => {
  const router = useRouter();
  const { category: routerCategory } = router.query;

  return (
    <div className={style.wrapper}>
      <div className={style.title}>
        <span>{'文章分类'}</span>
      </div>
      <ul>
        {categories.map((category) => {
          return (
            <li key={category.value}>
              <Link href="/category/[category]" as={`/category/` + category.name} shallow={false}>
                <a aria-label={category.name}>
                  <span>{category.name}</span>
                  <span>
                    {'共计'} {category.count} {'篇文章'}
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
