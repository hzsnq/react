'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api'
  }

  async checkLogin() {
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT user_name,id FROM admin_user WHERE user_name = '" + userName +
      "' AND user_pwd = '" + password + "'"

    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.session.openId = { 'openId': openId }
      this.ctx.body = { 'data': '登录成功', 'openId': openId, 'userInfo': res }
    } else {
      this.ctx.body = { data: '登录失败' }
    }
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = {
      data: result
    }
  }

  async addArticle() {

    let isUpdate = this.ctx.request.body.isUpdate
    let isIssue = this.ctx.request.body.isIssue
    let articleTitle = this.ctx.request.body.articleTitle
    let articleContent = this.ctx.request.body.articleContent
    let introducemd = this.ctx.request.body.introducemd
    let showDate = this.ctx.request.body.showDate
    let updateDate = this.ctx.request.body.updateDate
    let view_count = 0
    let selectedType = this.ctx.request.body.selectedType

    let sql = "INSERT INTO article(type_id,title,article_content,introduce,add_time,view_count,is_issue,update_time,is_update)" +
      "VALUES(" + selectedType + ", '" + articleTitle + "', '" + articleContent + "', '" + introducemd + "', '" + showDate + "', " + view_count + ", " + isIssue + ", '" + updateDate + "', " + isUpdate + ")"

    const res = await this.app.mysql.query(sql)
    if (res.insertId > 0) {
      this.ctx.body = { data: '添加成功' }
    } else {
      this.ctx.body = { data: '添加失败' }
    }
  }

}

module.exports = MainController