// B0. Format Code
// B1. Đưa các thư viện lên đầu.
const puppeteer = require('puppeteer');
const fs = require('fs');
const downloader = require('image-downloader');


function getLargesImageFromSrcSet(srcSet) {
    const s = srcSet.split(',');
    const rs = s[s.length - 1].split(' ')[0];
    return rs;
}


async function getImageFromPage(url) {
    var browsers = await puppeteer.launch();
    const page = await browsers.newPage();
    await page.goto(url);


    const imageSrcsets = await page.evaluate(() => {// Cho phép chạy javascript
        const imgs = Array.from(document.querySelectorAll('article img'));
        const srcSetAttribute = imgs.map(i => i.getAttribute('imageSrcsetset'));
        return srcSetAttribute;
    });

    const imgUrls = imageSrcsets.map(srcSet => getLargesImageFromSrcSet(srcSet));

    await browsers.close();

    return imgUrls;
}


// B2. Đổi tên các
async function main() {
    if (!fs.exitsSync('./result')) {
        fs.mkdirSync('./result');
    }

    const images = await getImageFromPage("https://www.instagram.com/asian.sexygirl_/");






    // downloader({
    //     url: rs,
    //     dest: './result',
    // })



}

main();

