
import httpProvider from './index'


export function getArticles_all(parmas) {
    return httpProvider({
        url: '/api/article/category/all',
        method: 'get',
        params: parmas,
    });
}

export function getRecommend(params) {
    return httpProvider({
        url: '/api/article/recommend',
        method: 'get',
        params: params,
    })
}

export function searchArticle(params) {
    return httpProvider({
        url: '/api/search/article',
        method: 'get',
        params
    })
}