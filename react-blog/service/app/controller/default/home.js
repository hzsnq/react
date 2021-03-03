'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api hi';
  }

  async getArticleList() {
    const num = this.ctx.request.body.pageNum;
    const sqlTotal = 'select COUNT(*) as total FROM article where article.is_issue=1';

    const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time," +
            'article.view_count as view_count ,' +
            'type.type_name as type_name ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id' +
            ' where article.is_issue=1 ORDER BY article.id DESC limit ' + num + ',10';

    const results = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(sqlTotal);

    this.ctx.body = {
      data: results,
      total,
    };
  }

  async getArticleById() {
    const id = this.ctx.request.body.id;

    const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time," +
            'article.view_count as view_count ,' +
            'article.article_content as article_content ,' +
            'type.type_name as type_name ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE article.id =' + id + ' and article.is_issue=1 ';

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };
  }

  async getArticleListByTypeId() {
    const num = this.ctx.request.body.pageNum;
    const id = this.ctx.request.body.id;

    const sqlTotal = 'select COUNT(*) as total FROM article LEFT JOIN type ON article.type_id = type.id WHERE type.id = ' + id + ' and article.is_issue=1';

    const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time," +
            'article.view_count as view_count ,' +
            'article.type_id as type_id ,' +
            'type.type_name as type_name ' +
            'FROM article LEFT JOIN type ON article.type_id = type.id ' +
            'WHERE type.id =' + id + ' and article.is_issue=1 ORDER BY article.id DESC limit ' + num + ',10';

    const result = await this.app.mysql.query(sql);

    const total = await this.app.mysql.query(sqlTotal);

    this.ctx.body = {
      data: result,
      total,
    };
  }

  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;
