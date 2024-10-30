import { test, expect } from '@playwright/test';
import { generateMock } from '@anatine/zod-mock';
import { _computerSchema } from '../src/lib/db';

const mockData = generateMock(_computerSchema);

test.beforeEach(async ({ page }) => {
	await page.goto('/computers/add');
	await page.getByTitle('Name').fill(mockData.name);
	await page.getByRole('button', { name: 'Add Computer' }).click();
});
test('Can it edit', async ({ page }) => {
	await page.goto('/computers');
	await page.getByRole('cell', { name: mockData.name }).click();
	await page.getByRole('button').first().click();
	await page.getByRole('button', { name: 'Remote Connection' }).click();
	await page.getByLabel('remote Connection Id').click();
	await page.getByLabel('remote Connection Id').fill(mockData.remoteConnectionId);
	await page.getByRole('button', { name: 'Remote Connection' }).click();
	await page.getByRole('button', { name: 'Edit Computer' }).click();
	await page.locator('body').press('Escape');
	await expect(page.getByRole('paragraph').getByText(mockData.name + ' has been updated!')).toBeVisible();
});
