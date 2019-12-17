const AES_KEY = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
const AES_IV = '1234567812345678';  //十六位十六进制数作为密钥偏移量

//七牛云密钥
const ACCESS_KEY = 'Vsr8MXZ-jcb0TE4p4zh6Cnt1DTExaoTJ30kTM5Fe';
const SECRET_KEY = 'r29QVxVKlHZ03Fotrlb7ZAM5mIL66blynn66UjYy';
const QINIU_SERVER = 'http://upload-z1.qiniu.com' // 根据存储区域修改上传域名
const BASE_QINIU_URL = 'http://q2hnds7lr.bkt.clouddn.com/'  // 空间 bucket 绑定的域名


export default {
  AES_KEY: AES_KEY,
  AES_IV: AES_IV,
  ACCESS_KEY: ACCESS_KEY,
  SECRET_KEY: SECRET_KEY,
  QINIU_SERVER: QINIU_SERVER,
  BASE_QINIU_URL: BASE_QINIU_URL
}

