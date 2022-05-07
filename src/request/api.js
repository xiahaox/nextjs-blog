import httpProvider from './index';

const isMock = process.env.NEXT_API_ENV == 'mock';

export function getArticles_all(parmas) {
  return httpProvider({
    url: !isMock ? '/api/article/category/all' : '/api/article',
    method: 'get',
    params: parmas,
  });
}

export function getRecommend(params) {
  return httpProvider({
    url: !isMock ? '/api/article/recommend' : '/api/recommend',
    method: 'get',
    params: params,
  });
}

export function searchArticle(params) {
  return httpProvider({
    url: !isMock ? '/api/search/article' : '/api/search',
    method: 'get',
    params,
  });
}
