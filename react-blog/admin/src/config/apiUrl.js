let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin',  //  检查用户名密码是否正确
  getTypeInfo: ipUrl + 'getTypeInfo', //获取博客类型
  addArticle: ipUrl + "addArticle", //添加文章
  getArticleList: ipUrl + "getArticleList",//获取文章列表
  getArticleById: ipUrl + "getArticleById",//根据id获取文章
  editArticle: ipUrl + "editArticle",//根据id修改文章
  deleteArticleById: ipUrl + 'deleteArticleById'
}

export default servicePath