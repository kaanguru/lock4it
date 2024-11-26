import * as R from 'rambda';
import { encryptedData } from './crypt';
import type { Computer } from './db';

export class PrepareForExportThenSave {
	private tableToExport: Computer[];

	constructor(tableToExport: Computer[]) {
		this.tableToExport = tableToExport;
	}
	async handleExport() {
		const fileName = `Lock4IT_${new Date().toISOString().slice(0, 10).replace(/:/g, '-')}.bak`;
		const createUrl = R.pipe(R.always(this.tableToExport), this.createJsonBlob, (promiseBlob) =>
			promiseBlob.then((blob: Blob) => URL.createObjectURL(blob))
		);
		const url = await createUrl();
		await this.downloadFileThenClean(url, fileName);
	}
	private async createJsonBlob(data: Computer[]): Promise<Blob> {
		return new Promise(async (resolve) => {
			const encrypted = await encryptedData(data as unknown as string);

			const blobIT = [JSON.stringify(encrypted)];

			const blob = new Blob(blobIT, { type: 'application/json' });
			resolve(blob);
		});
	}

	private downloadFileThenClean(url: string, filename: string) {
		const downloadLink = this.createDownloadLink(url, filename);
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
		URL.revokeObjectURL(url);
	}

	private createDownloadLink(url: string, filename: string) {
		const link = document.createElement('a');
		link.href = url;
		link.download = filename;
		return link;
	}
}
