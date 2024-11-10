import { expect, test, type Page } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';

const mockData = generateMock(_computerSchema);
let firstRun = true;
let loggedIn = false;
const mockPass = 'testPass';
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
	await page.getByRole('button', { name: 'Add Computer' }).click();
});
test('Can it edit', async ({ page }) => {
	await page.goto('/');
	await page.waitForTimeout(500);
	const friend = await page.getByRole('heading', { name: 'Hello friend!' }).first().isVisible();
	if (friend) {
		await logIn(page);
	}
	await page.getByRole('cell', { name: mockData.name }).click();
	await page.getByLabel('Edit').click();
	await page.getByRole('button', { name: 'Remote Connection' }).click();
	await page.getByLabel('remote Connection Id').click();
	await page.getByLabel('remote Connection Id').fill(mockData.remoteConnectionId);
	await page.getByRole('button', { name: 'Remote Connection' }).click();
	await page.getByRole('button', { name: 'Edit Computer' }).click();
	await page.locator('body').press('Escape');
	await expect(page.getByRole('paragraph').getByText(mockData.name + ' has been updated!')).toBeVisible();
});

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
