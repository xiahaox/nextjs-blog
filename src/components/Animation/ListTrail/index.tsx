import React, { useState, useCallback, useEffect, useRef } from 'react';

interface IProps {
  articles: [];
  element?: string;
  options: Record<string, unknown>;
  renderItem: (index: number) => React.ReactNode;
}

export const ListTrail: React.FC<IProps> = ({
  articles,
  options,
  element = 'li',
  renderItem,
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {articles.map((item, index) => {
        return <li key={index}>{renderItem(index)}</li>;
      })}
    </>
  );
};
