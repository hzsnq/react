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
  router.post('/admin/addTypeInfo', adminauth, controller.admin.main.addTypeInfo)
  router.post('/admin/editTypeInfo', adminauth, controller.admin.main.editTypeInfo)
  router.post('/admin/deleteTypeInfoById', adminauth, controller.admin.main.deleteTypeInfoById)
  router.get('/admin/getAdminList', adminauth, controller.admin.main.getAdminList)
  router.post('/admin/editAdminById', adminauth, controller.admin.main.editAdminById)
  router.post('/admin/deleteAdminById', adminauth, controller.admin.main.deleteAdminById)
  router.post('/admin/addAdmin', adminauth, controller.admin.main.addAdmin)
}