const {test, expect, selectors}= require ('@playwright/test');

test('Browser Context Declaration', async({browser})=>
{
    const context=await browser.newContext();
    const Page=await context.newPage();

    await Page.goto("https://rahulshettyacademy.com/AutomationPractice/");
});

test.only('Browser without context', async({browser, page})=>
{
    
         const userName=page.locator("#username");
         const cardTitles=page.locator(".card-body a");
    // const context=await browser.newContext();
    // const page=await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator("input[name='username']").fill("rahulshettyacademydf");
    await page.locator("#password").fill("learning");
    await page.locator("#signInBtn.btn.btn-info.btn-md").click();
    await expect(page.locator("[style*='block']")).toContainText("username/password.");
    
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await page.locator("#signInBtn.btn.btn-info.btn-md").click();
    // await page.waitForTimeout(5000);
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body a").first().waitFor();
   console.log(await cardTitles.nth(1).textContent());
   console.log(await cardTitles.first().textContent());
   const allCardsTitles=await cardTitles.allTextContents();
   console.log(allCardsTitles);
});