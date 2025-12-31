const { Builder, By, until } = require('selenium-webdriver');

async function runQuizTest() {
    // 1. Initialize the Chrome Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // STEP 1: Verify Landing Page
        await driver.get('D:/code/Quiz.html'); 
        
        console.log("Page Title:", await driver.getTitle());
        console.log("Current URL:", await driver.getCurrentUrl());

        // STEP 2: Start Quiz
        let startBtn = await driver.findElement(By.id('start-btn'));
        await startBtn.click();

        await driver.wait(until.elementLocated(By.id('question-text')), 5000);
        console.log("Quiz started successfully.");

        // STEP 3: Question Navigation & Answer Selection
        for (let i = 0; i < 3; i++) {
            let progress = await driver.findElement(By.id('progress')).getText();
            let question = await driver.findElement(By.id('question-text')).getText();
            console.log(`Processing ${progress}: ${question}`);

            let options = await driver.findElements(By.className('option-btn'));

            if (options.length >= 3) {
                await options[2].click();
            } else {
                await options[0].click();
            }

            let nextBtn = await driver.findElement(By.id('next-btn'));
            await driver.wait(until.elementIsVisible(nextBtn), 5000);
            await nextBtn.click();
        }


        await driver.wait(until.elementLocated(By.id('result-page')), 5000);
        let finalScore = await driver.findElement(By.id('score-summary')).getText();
        console.log("Final Results Summary:", finalScore);

    } catch (error) {
        console.error("Test Failed:", error);
    } finally {

        setTimeout(async () => {
            await driver.quit();
        }, 3000);
    }
}

runQuizTest();