module.exports = app => {
  const { router, controller } = app
  var adminauth = app.middleware.adminauth()
  router.get('/admin/index', adminauth, controller.admin.main.index)
  router.post('/admin/checkLogin', controller.admin.main.checkLogin)
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList)
  router.post('/admin/getArticleById', adminauth, controller.admin.main.getArticleById)
  router.post('/admin/editArticle', adminauth, controller.admin.main.editArticle)
  router.post('/admin/deleteArticleById', adminauth, controller.admin.main.deleteArticleById)
}