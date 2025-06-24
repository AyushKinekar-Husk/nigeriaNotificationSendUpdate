import CryptoJS from "crypto-js";

/**
 * Decrypts AES-encrypted Base64 string (like C# AesManaged).
 * @param {string} base64CipherText - The encrypted cookie value (Base64 string).
 * @param {string} key - The encryption key as a UTF-8 string.
 * @param {string} iv - The initialization vector as a UTF-8 string.
 * @returns {string} The decrypted plaintext.
 */



export function decryptStringFromBytes(base64CipherText:string, key:string, iv:string) {
  const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
  const ivUtf8 = CryptoJS.enc.Utf8.parse(iv);
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(base64CipherText),
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, keyUtf8, {
    iv: ivUtf8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}