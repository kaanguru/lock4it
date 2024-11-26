import CryptoES from 'crypto-es';
import { db } from './db';
import type { Encoder } from 'crypto-es/lib/core';

const JsonFormatter = {
	stringify: function (cipherParams: { ciphertext: { toString: (arg0: Encoder) => any } }) {
		// create json object with ciphertext
		const jsonObj = { ct: cipherParams.ciphertext.toString(CryptoES.enc.Base64) }; // optionally add iv and salt

		// stringify json object
		return JSON.stringify(jsonObj);
	},
	parse: function (jsonStr: string) {
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
async function encryptedData(data: string): Promise<object> {
	// @ts-ignore
	return CryptoES.Rabbit.encrypt(JSON.stringify([data]), await token(), { format: JsonFormatter });
}
async function decryptData(encryptd: string) {
	// @ts-ignore
	return CryptoES.Rabbit.decrypt(encryptd, await token(), { format: JsonFormatter }).toString(CryptoES.enc.Utf8);
}
async function token() {
	const tokenData = await db.authToken.get(0);
	if (tokenData) {
		return tokenData.token;
	}
	throw new Error('No token found');
}
export { encryptedData, decryptData };
