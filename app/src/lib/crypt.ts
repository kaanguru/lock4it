import CryptoES from 'crypto-es';
import { db } from './db';
async function token() {
	const { token } = await db.authToken.get(0);
	return token;
}
const JsonFormatter = {
	stringify: function (cipherParams) {
		// create json object with ciphertext
		const jsonObj = { ct: cipherParams.ciphertext.toString(CryptoES.enc.Base64) }; // optionally add iv and salt

		// stringify json object
		return JSON.stringify(jsonObj);
	},
	parse: function (jsonStr) {
		// parse json string
		const jsonObj = JSON.parse(jsonStr); // extract ciphertext from json object, and create cipher params object
		const cipherParams = CryptoES.lib.CipherParams.create({ ciphertext: CryptoES.enc.Base64.parse(jsonObj.ct) }); // optionally extract iv and salt
		if (jsonObj.iv) {
			cipherParams.iv = CryptoES.enc.Hex.parse(jsonObj.iv);
		}
		if (jsonObj.s) {
			cipherParams.salt = CryptoES.enc.Hex.parse(jsonObj.s);
		}
		return cipherParams;
	}
};
export async function encryptedData(data: string): Promise<object> {
	return CryptoES.Rabbit.encrypt(JSON.stringify([data]), await token(), { format: JsonFormatter });
}
export async function decryptData(encryptd: string) {
	return CryptoES.Rabbit.decrypt(encryptd, await token(), { format: JsonFormatter }).toString(CryptoES.enc.Utf8);
}
