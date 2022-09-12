export default function handler(req, res) {
  res.status(200).json({
    i18n: '{"en":{"zh":"Chinese","en":"English","serverNotAvaliable":"The server is going to launch a rocket for Musk now 🚀","pageMissing":"This page went to space with Bezos","archives":"Archives","total":"Total","totalSearch":"Totally searched ","piece":" Count","passwd":"Password","wrongPasswd":"Wrong Password","protectedArticleMsg":"The article is protected, please enter the access password","backHome":"Back to Home","confirm":"Confirm","unknownTitle":"Unknown Title","articleCover":"Article Cover","publishAt":"Publish At","readings":"Reading","copyrightInfo":"Copyright Information","copyrightContent":"Non-commercial-Attribution-Freely Reprinted","categoryArticle":"Category","gettingArticle":"Fetching articles...","comment":"Comment","gettingKnowledge":"Fetching knowledge books...","knowledgeBooks":"Knowledge Books","readingCount":"reading","startReading":"Start Reading","pleaseWait":"Coming soon","otherKnowledges":"Other Knowledge Books","unknownKnowledgeChapter":"Unknown Chapter","recommendToReading":"Recommended Readings","yu":"About","tagRelativeArticles":"tag related articles","all":"All","readingCountTemplate":"reading","articleCountTemplate":"count","share":"Share","empty":"No data","categoryTitle":"Category","commentNamespace":{"reply":"Reply","emoji":"Emoji","replyPlaceholder":"Please enter the content of the comment (Markdown is supported)","publish":"Send","close":"Close","commentSuccess":"The comment is successful and has been submitted for review","userInfoTitle":"Please set your information","userInfoName":"Username","userInfoNameValidMsg":"Please tell me your name","userInfoPassword":"Password","userInfoPasswordValidMsg":"Please enter correct password","userInfoConfirm":"Login","userInfoCancel":"Cancel","logout":"Logout"},"loading":"Loading","copySuccess":"Copy successfully","copy":"copy","article":"Articles","searchArticle":"Search Articles","searchArticlePlaceholder":"Enter keywords, search articles","shareNamespace":{"title":"Share Poster","createingPoster":"The poster is being generated, please be patient...","createdPosterSuccess":"The poster is completed.","createdPosterError":"Fail to generate poster.","qrcode":"Scan the QR code to read the article","shareFrom":" Original shared from "},"tagTitle":"Tags","toc":"Toc","logingWithGithub":"Login With Github, Please wait..."},"zh":{"zh":"汉语","en":"英文","serverNotAvaliable":"服务器暂时去给马斯克发射火箭去了🚀","pageMissing":"页面和贝佐斯去太空旅行了~~","archives":"归档","total":"共计","totalSearch":"共搜索到","piece":"篇","passwd":"密码","wrongPasswd":"密码错误","protectedArticleMsg":"文章受保护，请输入访问密码","backHome":"回首页","confirm":"确认","unknownTitle":"未知标题","articleCover":"文章封面","publishAt":"发布于","readings":"阅读量","copyrightInfo":"版权信息","copyrightContent":"非商用-署名-自由转载","categoryArticle":"分类文章","gettingArticle":"正在获取文章...","comment":"评论","gettingKnowledge":"正在获取知识...","knowledgeBooks":"知识小册","readingCount":"次阅读","startReading":"开始阅读","pleaseWait":"敬请期待","otherKnowledges":"其他知识笔记","unknownKnowledgeChapter":"未知章节内容","recommendToReading":"推荐阅读","yu":"与","tagRelativeArticles":"标签有关的文章","all":"所有","readingCountTemplate":"次阅读","articleCountTemplate":"篇文章","share":"分享","empty":"暂无数据","categoryTitle":"文章分类","commentNamespace":{"reply":"回复","emoji":"表情","replyPlaceholder":"请输入评论内容（支持 Markdown）","publish":"发布","close":"收起","commentSuccess":"评论成功，已提交审核","userInfoTitle":"帐密登录","userInfoName":"名称","userInfoNameValidMsg":"请输入您的称呼","userInfoPassword":"密码","userInfoPasswordValidMsg":"请输入密码","userInfoConfirm":"登录","userInfoCancel":"取消","logout":"退出"},"loading":"加载中","copySuccess":"复制成功","copy":"复制","article":"文章","searchArticle":"文章搜索","searchArticlePlaceholder":"输入关键字，搜索文章","shareNamespace":{"title":"分享海报","createingPoster":"海报生成中，请耐心等待...","createdPosterSuccess":"分享海报制作完成。","createdPosterError":"分享海报制作失败，请手动截图","qrcode":"识别二维码查看文章","shareFrom":" 原文分享自"},"tagTitle":"文章标签","toc":"目录","logingWithGithub":"Github 授权登录中，请稍等......"}}',
    systemUrl: 'https://blog.wipi.tech/',
    adminSystemUrl: 'https://admin.blog.wipi.tech/',
    systemTitle: '小楼又清风',
    systemBg: null,
    systemLogo:
      '<img height="36" src="https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-20/wipi-logo.png" alt="logo">',
    systemFavicon:
      'https://wipi.oss-cn-shanghai.aliyuncs.com/2021-02-20/wipi-favicon.png',
    systemFooterInfo:
      '<p>Copyright © 2021. All Rights Reserved.</p>\n<a href="https://admin.blog.wipi.tech/">后台管理</a>\n<a href="https://beian.miit.gov.cn" target="_blank">皖ICP备18005737号</a>',
    seoKeyword:
      'JavaScript,TypeScript,Vue.js,微信小程序,React.js,正则表达式,WebGL,Webpack,Docker,MVVM,nginx,java',
    seoDesc:
      '“小楼又清风”是 fantasticit（https://github.com/fantasticit）的个人小站。本站的文章包括：前端、后端等方面的内容，也包括一些个人读书笔记。',
    baiduAnalyticsId: '2f616121a4be61774c494d106870f30e',
    googleAnalyticsId: 'G-10SK76KWMS',
  });
}
