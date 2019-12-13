import CryptoJS from 'crypto-js'
import keys from '../config/key'
/**
 * AES加密
 * @param {any} word 加密数据
 */
export const cryptoEncrypt = (word) => {
  let key = CryptoJS.enc.Utf8.parse(keys.AES_KEY);
  let iv = CryptoJS.enc.Utf8.parse(keys.AES_IV);
  let encrypted = CryptoJS.AES.encrypt(word, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.ciphertext.toString().toUpperCase();
}

/**
 * AES解密
 * @param {any} word 解密数据
 */
export const cryptoDecrypt = (word) => {
  console.log(word)
  let key = CryptoJS.enc.Utf8.parse(keys.AES_KEY);
  let iv = CryptoJS.enc.Utf8.parse(keys.AES_IV);
  var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  console.log(srcs, 22222)
  let decrypted = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  console.log(decrypted, 1111)
  let decryptedStr = decrypted.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString();
}