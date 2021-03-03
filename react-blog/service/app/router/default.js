module.exports = app => {
  const { router, controller } = app
  router.get('/default/index', controller.default.home.index)
  router.post('/default/getArticleList', controller.default.home.getArticleList)
  router.post('/default/getArticleById', controller.default.home.getArticleById)
  router.post('/default/getArticleListByTypeId', controller.default.home.getArticleListByTypeId)
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
}