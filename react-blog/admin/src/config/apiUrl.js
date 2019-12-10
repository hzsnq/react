let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
  checkLogin: ipUrl + 'checkLogin',  //  检查用户名密码是否正确
  getTypeInfo: ipUrl + 'getTypeInfo', //获取博客类型
  addArticle: ipUrl + "addArticle", //添加文章
  getArticleList: ipUrl + "getArticleList",//获取文章列表
  getArticleById: ipUrl + "getArticleById",//根据id获取文章
  editArticle: ipUrl + "editArticle",//根据id修改文章
  deleteArticleById: ipUrl + 'deleteArticleById',//根据id删除文章
  addTypeInfo: ipUrl + 'addTypeInfo',//添加文章类别
  editTypeInfo: ipUrl + 'editTypeInfo',//编辑文章类别
  deleteTypeInfoById: ipUrl + 'deleteTypeInfoById',//根据id删除文章类别
}

export default servicePath