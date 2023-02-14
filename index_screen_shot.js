const puppeteer = require('puppeteer');// không thể dùng thư viện khác để đọc comment // B5. Đừng quá lạm dụng comment=> nhưng khó đọc quá thì cần comment.
const fs = require('fs');
const downloader = require('image-downloader');

const folderResult = "./result";

async function main() {
    if (!fs.existsSync(folderResult)) {
        fs.mkdirSync(folderResult);
    }

    // init
    const browsers = await puppeteer.launch({ headless: false });
    // mở page
    const page = await browsers.newPage();
    page.setViewport({ width: 1280, height: 720 });
    // goto
    await page.goto("https://kenh14.vn/", { waitUntil: 'networkidle2' });// Chờ cho đến khi load xong.
    //
    await page.screenshot({ path: folderResult + "/" + 'kenh14.png' });
    const titles = await page.evaluate(() => {
        let titleLinks = document.querySelectorAll('h2.klwfnl-title > a');
        titleLinks = [...titleLinks];
        let articles = titleLinks.map(link => ({
            title: link.getAttribute('title'),
            url: link.getAttribute('href')
        }));
        return articles;
    });
    console.log(titles)
    // browsers.close();
}

main();