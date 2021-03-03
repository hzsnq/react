'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api';
  }

  async checkLogin() {
    const ip = await this.ctx.header['x-forwarded-for'] || this.ctx.header['x-real-ip'];// .split(',')[0]
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT user_name,id,is_enabled FROM admin_user WHERE user_name = '" + userName +
      "' AND user_pwd = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      if (res[0].is_enabled === 1) {
        const openId = new Date().getTime();
        const date = Math.round(new Date() / 1000);
        const updateSql = "update admin_user set last_login_time='" + date + "',last_login_ip='" + ip + "' WHERE id=" + res[0].id;
        const res2 = await this.app.mysql.query(updateSql);
        if (res2.changedRows > 0) {
          this.ctx.session.openId = { openId };
          this.ctx.body = { data: '登录成功', openId, userInfo: res };
        } else {
          this.ctx.body = { data: '登录失败' };
        }
      } else {
        this.ctx.body = { data: '该账号未启用' };
      }
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };
  }

  async addTypeInfo() {

    const typeName = this.ctx.request.body.typeName;
    const orderNum = this.ctx.request.body.orderNum;
    const Icon = this.ctx.request.body.Icon;

    const sql = "INSERT INTO `type` (type_name,order_num,icon) VALUES('" + typeName + "'," + orderNum + ",'" + Icon + "')";

    const res = await this.app.mysql.query(sql);
    if (res.insertId > 0) {
      this.ctx.body = { data: '添加成功' };
    } else {
      this.ctx.body = { data: '添加失败' };
    }
  }

  async editTypeInfo() {

    const id = this.ctx.request.body.id;
    const typeName = this.ctx.request.body.typeName;
    const Icon = this.ctx.request.body.Icon;

    const sql = "UPDATE type set type_name='" + typeName + "',icon='" + Icon + "' WHERE id=" + id;

    const res = await this.app.mysql.query(sql);
    if (res.changedRows > 0) {
      this.ctx.body = { data: '修改成功' };
    } else {
      this.ctx.body = { data: '修改失败' };
    }
  }

  async deleteTypeInfoById() {

    const id = this.ctx.request.body.id;

    const sql = 'DELETE FROM type WHERE id = ' + id;

    const res = await this.app.mysql.query(sql);
    if (res.affectedRows > 0) {
      this.ctx.body = { data: '删除成功' };
    } else {
      this.ctx.body = { data: '删除失败' };
    }
  }

  async addArticle() {

    const isUpdate = this.ctx.request.body.isUpdate;
    const isIssue = this.ctx.request.body.isIssue;
    const articleTitle = this.ctx.request.body.articleTitle;
    const articleContent = this.ctx.request.body.articleContent;
    const introducemd = this.ctx.request.body.introducemd;
    const showDate = this.ctx.request.body.showDate;
    const updateDate = this.ctx.request.body.updateDate;
    const view_count = 0;
    const selectedType = this.ctx.request.body.selectedType;

    const sql = 'INSERT INTO article(type_id,title,article_content,introduce,add_time,view_count,is_issue,update_time,is_update)' +
      'VALUES(' + selectedType + ",'" + articleTitle + "','" + articleContent + "','" + introducemd + "','" + showDate + "'," + view_count + ',' + isIssue + ",'" + updateDate + "'," + isUpdate + ')';

    const res = await this.app.mysql.query(sql);
    if (res.insertId > 0) {
      this.ctx.body = { data: '添加成功' };
    } else {
      this.ctx.body = { data: '添加失败' };
    }
  }

  async getArticleList() {

    const sql = "SELECT FROM_UNIXTIME(a.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,a.type_id,a.article_content,a.id,a.introduce,a.is_issue,a.is_update,a.title,FROM_UNIXTIME(a.update_time,'%Y-%m-%d %H:%i:%s' ) as update_time,a.view_count,t.type_name FROM article AS a " +
      'LEFT JOIN type as t ON a.type_id=t.order_num ORDER BY a.id DESC';
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async getArticleById() {
    const id = this.ctx.request.body.id;
    const sql = 'SELECT * FROM `article` WHERE id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async editArticle() {

    const id = this.ctx.request.body.id;
    const isIssue = this.ctx.request.body.isIssue;
    const articleTitle = this.ctx.request.body.articleTitle;
    const articleContent = this.ctx.request.body.articleContent;
    const introducemd = this.ctx.request.body.introducemd;
    const updateDate = this.ctx.request.body.updateDate;
    const selectedType = this.ctx.request.body.selectedType;

    const sql = "UPDATE article set title='" + articleTitle + "',type_id=" + selectedType + ",article_content='" + articleContent + "',introduce='" + introducemd + "',update_time='" + updateDate + "',is_update=1,is_issue=" + isIssue + ' WHERE id=' + id;

    const res = await this.app.mysql.query(sql);
    if (res.changedRows > 0) {
      this.ctx.body = { data: '修改成功' };
    } else {
      this.ctx.body = { data: '修改失败' };
    }
  }

  async deleteArticleById() {

    const id = this.ctx.request.body.id;

    const sql = 'DELETE FROM article WHERE id = ' + id;

    const res = await this.app.mysql.query(sql);
    if (res.affectedRows > 0) {
      this.ctx.body = { data: '删除成功' };
    } else {
      this.ctx.body = { data: '删除失败' };
    }
  }

  async getAdminList() {

    const sql = "SELECT FROM_UNIXTIME(add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,id,user_name,user_pwd,FROM_UNIXTIME(last_login_time,'%Y-%m-%d %H:%i:%s' ) as last_login_time,last_login_ip,is_enabled,user_state FROM admin_user";

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async editAdminById() {
    const id = this.ctx.request.body.id;
    const is_enabled = this.ctx.request.body.isEnabled;
    const sql = 'update admin_user set is_enabled=' + is_enabled + ' WHERE id=' + id;
    const res = await this.app.mysql.query(sql);
    if (res.changedRows > 0) {
      this.ctx.body = { data: '修改成功' };
    } else {
      this.ctx.body = { data: '修改失败' };
    }
  }

  async deleteAdminById() {

    const id = this.ctx.request.body.id;

    const sql = 'DELETE FROM admin_user WHERE id = ' + id;

    const res = await this.app.mysql.query(sql);
    if (res.affectedRows > 0) {
      this.ctx.body = { data: '删除成功' };
    } else {
      this.ctx.body = { data: '删除失败' };
    }
  }

  async addAdmin() {

    const user_name = this.ctx.request.body.userName;
    const user_pwd = this.ctx.request.body.userPwd;
    const add_time = this.ctx.request.body.addTime;

    const sql = 'INSERT INTO admin_user(user_name,user_pwd,add_time,last_login_time,last_login_ip,is_enabled,user_state)' +
      "VALUES('" + user_name + "','" + user_pwd + "','" + add_time + "','" + add_time + "','0.0.0.0','0','1')";

    const res = await this.app.mysql.query(sql);
    if (res.insertId > 0) {
      this.ctx.body = { data: '添加成功' };
    } else {
      this.ctx.body = { data: '添加失败' };
    }
  }

  async addImg() {

    const img_title = this.ctx.request.body.imgTitle;
    const img_url = this.ctx.request.body.imgUrl;
    const add_time = this.ctx.request.body.addTime;
    const img_type = this.ctx.request.body.imgType;
    const img_status = this.ctx.request.body.imgStatus;

    const sql = 'INSERT INTO blog_img(img_title,img_url,add_time,img_type,img_status)' +
      "VALUES('" + img_title + "','" + img_url + "','" + add_time + "','" + img_type + "'," + img_status + ')';

    const res = await this.app.mysql.query(sql);
    if (res.insertId > 0) {
      this.ctx.body = { data: '添加成功' };
    } else {
      this.ctx.body = { data: '添加失败' };
    }
  }

  async deleteImgById() {

    const id = this.ctx.request.body.id;

    const sql = 'DELETE FROM blog_img WHERE id = ' + id;

    const res = await this.app.mysql.query(sql);
    if (res.affectedRows > 0) {
      this.ctx.body = { data: '删除成功' };
    } else {
      this.ctx.body = { data: '删除失败' };
    }
  }

  async getImgList() {

    const sql = "SELECT FROM_UNIXTIME(add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,id,img_title,img_url,img_type,img_status FROM blog_img";

    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

}

module.exports = MainController;
