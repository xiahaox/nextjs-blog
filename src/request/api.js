import httpProvider from './index';

const isMock = process.env.NEXT_API_ENV == 'mock';

export function getArticles_all(parmas) {
  return httpProvider({
    url: !isMock ? '/article/list' : '/api/article',
    method: 'get',
    params: parmas,
  });
}
export function getTagList(parmas) {
  return httpProvider({
    url: !isMock ? '/tag/list' : '/tag/list',
    method: 'get',
    params: parmas,
  });
}
export function getCategoryList(parmas) {
  return httpProvider({
    url: !isMock ? '/category/list' : '/category/list',
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

export function getArchives(params) {
  return httpProvider({
    url: !isMock ? '/api/article/archives' : '/api/archives',
    method: 'get',
    params,
  });
}

export function getKnowledges(params) {
  return httpProvider({
    url: !isMock ? '/api/knowledge' : '/api/knowledge',
    method: 'get',
    params,
  });
}
export function getSetting(params) {
  return httpProvider({
    url: !isMock ? '/api/setting/get' : '/api/settingGet',
    method: 'get',
    params,
  });
}
export function getTags(params) {
  return httpProvider({
    url: !isMock ? '/api/tag' : '/api/tag',
    method: 'get',
    params,
  });
}
/**
 * 获取指定文章
 * @param id
 */

export function getArticle(id) {
  return httpProvider({
    url: !isMock ? `/article/${id}` : `/article/${id}`,
    method: 'get',
  });
}

/**
 * 用户登录
 * @param data
 */
export function login(data) {
  return httpProvider.post('/login', data);
}

/**
 * 用户注册
 * @param data
 */
export function register(data) {
  return httpProvider.post('/register', data);
}

export function discuss(data) {
  return httpProvider.post('/discuss', data);
}


export function discussDelect(data) {
  return httpProvider.post(`/discuss/comment/${data.commentId}`);
}