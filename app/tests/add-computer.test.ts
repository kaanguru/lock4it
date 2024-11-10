import { expect, test, type Page } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';
import { faker } from '@faker-js/faker';

const mockData = generateMock(_computerSchema);
let firstRun = true;
let loggedIn = false;
const mockPass = 'test Pass';
test.beforeEach(async ({ page }) => {
	await page.goto('/computers/add');
	const friend = await page.getByRole('heading', { name: 'Hello friend!' }).first().isVisible();
	if (friend) {
		await logIn(page);
	} else if (firstRun) {
		await createMasterPass(page);
	}

	if (!loggedIn) {
		await logIn(page);
	}
	if (friend) {
		await logIn(page);
	}

	await page.waitForTimeout(500);
	await fillName(page);
});

test.describe('Tests expected to pass', () => {
	test('add ✅ all', async ({ page }) => {
		await page.getByRole('button', { name: 'Network' }).click();
		await fillField(page, 'IP Address', faker.internet.ipv4());
		await fillField(page, 'Mac Address', faker.internet.mac());
		await page.getByRole('button', { name: 'Network' }).click();
		await page.getByRole('button', { name: 'Hardware' }).click();
		const titlesAndValues = [
			['processor', mockData.processor],
			['monitor', mockData.monitor],
			['videoAdaptor', mockData.videoAdaptor],
			['disk1', mockData.disk1],
			['disk2', mockData.disk2]
		];

		for (const [title, value] of titlesAndValues) {
			await fillField(page, title, value);
		}
		await page.evaluate(() => {
			window.scrollBy(0, window.innerHeight);
			return Promise.resolve();
		});

		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.getByRole('paragraph').getByText(mockData.name)).toBeVisible();
	});
});
test.describe('Checks of wrong enterence', () => {
	test('add ✅ name / ❌ ip ', async ({ page }) => {
		await page.getByRole('button', { name: 'Network' }).click();
		await page.getByTitle('IP Address').fill('22');
		// scrool page down
		await page.evaluate(() => {
			window.scrollBy(0, window.innerHeight);
			return Promise.resolve();
		});
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.locator('.error >> text=Invalid ip')).toBeVisible();
	});

	test('add  ✅ name / ✅ ip / ❌ MAC ', async ({ page }) => {
		await page.getByRole('button', { name: 'Network' }).click();
		await page.getByTitle('IP Address').fill(faker.internet.ipv4());
		await page.getByPlaceholder('Mac Address').fill('wk-22-22');
		// scrool page down
		await page.evaluate(() => {
			window.scrollBy(0, window.innerHeight);
			return Promise.resolve();
		});
		await page.getByRole('button', { name: 'Add Computer' }).click();
		await expect(page.locator('.error >> text=Invalid')).toBeVisible();
	});
});

async function createMasterPass(page: Page) {
	await page.goto('/');
	await page.getByPlaceholder('Enter master password').click();
	await page.getByPlaceholder('Enter master password').fill('testPass');
	await page.getByPlaceholder('Enter master password').press('Tab');
	await page.getByRole('button').nth(1).press('Tab');
	await page.getByPlaceholder('Re-Type your password').fill('TestPass');
	await page.getByPlaceholder('Re-Type your password').press('Tab');
	await page.getByRole('button').nth(2).press('Tab');
	await page.getByRole('button', { name: 'Save Your Master Password' }).click();
	await page.getByLabel('Dismiss toast').click();
	await page.getByPlaceholder('Enter master password').click();
	await page.getByPlaceholder('Enter master password').fill(mockPass);
	await page.getByPlaceholder('Enter master password').press('Tab');
	await page.getByPlaceholder('Re-Type your password').click();
	await page.getByPlaceholder('Re-Type your password').fill(mockPass);
	await page.getByRole('button').nth(2).click();
	await page.getByRole('button', { name: 'Save Your Master Password' }).click();
	firstRun = false;
	loggedIn = true;
}

async function fillField(page: Page, title, value: string | number | null) {
	await page.getByTitle(title).fill(String(value));
}
async function logIn(page: Page) {
	await page.getByPlaceholder('Enter master password').click();
	await page.getByPlaceholder('Enter master password').fill(mockPass);
	await page.getByRole('button', { name: 'UnLock' }).click();
	loggedIn = true;
}
async function fillName(page) {
	const friend = await page.getByRole('heading', { name: 'Hello friend!' }).first().isVisible();
	if (friend) {
		await logIn(page);
	}
	await page.getByTitle('Name').click();
	await page.getByTitle('Name').fill(mockData.name);
}
