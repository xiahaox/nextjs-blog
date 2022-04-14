import React, { useEffect, useRef, useState } from 'react';
import cls from 'classnames';
import style from './index.module.less';

interface IProps {
  leftNode: React.ReactNode;
  leftClassName?: null | string;
  rightNode: React.ReactNode;
  rightClassName?: null | string;
  isRightNodeMobileHidden?: boolean;
  minHeight?: string | number;
  likesProps?: LikesProps;
  showComment?: boolean;
  shareProps?: ShareProps;
}

export const DoubleColumnLayout: React.FC<IProps> = ({
  leftNode,
  leftClassName = null,
  rightNode,
  rightClassName = null,
  isRightNodeMobileHidden = true,
  minHeight = '100vh',
  likesProps,
  showComment = false,
  shareProps,
}) => {
  const [showWidge, setShowWidge] = useState(true);

  return (
    <div className={cls(style.outerWrap)} style={{ minHeight }}>
      <div className={cls('container')}>
        <div className={style.wrap}>
          {(likesProps || showComment || shareProps) && (
            <div
              className={cls(style.fixed, showWidge && style.active)}
              onClick={(e) => {
                console.log('clicked');
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
                e.stopPropagation();
              }}
            >
              {likesProps && (
                <div className={style.widgetWrapper}>
                  {/* <Likes {...likesProps} /> */}
                </div>
              )}
              {showComment && (
                <div className={style.widgetWrapper}>
                  {/* <CommentIcon /> */}
                </div>
              )}
              {shareProps && (
                <div className={style.widgetWrapper}>
                  {/* <Share {...shareProps} /> */}
                </div>
              )}
            </div>
          )}

          <section className={cls(style.left, leftClassName)}>
            {leftNode}
          </section>
          <aside
            // ref={$aside}
            className={cls(
              style.right,
              rightClassName,
              isRightNodeMobileHidden && style.isRightNodeMobileHidden
            )}
          >
            {rightNode}
          </aside>
        </div>
      </div>
    </div>
  );
};
