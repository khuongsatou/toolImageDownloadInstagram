// B0. Format Code
// B1. Đưa các thư viện lên đầu.
// -- Nhớ cài đặt chrome và bật mạng mạnh --
const puppeteer = require('puppeteer');// không thể dùng thư viện khác để đọc comment // B5. Đừng quá lạm dụng comment=> nhưng khó đọc quá thì cần comment.
const fs = require('fs');
const myDownloader = require('image-downloader');

// B3. Di chuyển các code có chức năng khác nhau thành function
function getLargesImageFromSrcSet(srcSet) {
    // console.log(srcSet);
    const s = srcSet.split(',');
    const rs = s[s.length - 1].split(' ')[0];
    return rs;
}

async function getImageFromPage(url) {
    // B2. Đổi tên lại biến cho phù hợp với ngữ cảnh.
    var browsers = await puppeteer.launch({ headless: false });
    const page = await browsers.newPage();
    // Tạo ra chrome
    page.setViewport({ width: 1280, height: 720 });
    // mở chrome
    await page.goto(url, { waitUntil: 'networkidle2' });// Đợi khi load xong page


    const imageSrcsets = await page.evaluate(() => {
        // Selector like CSS syntax
        const imgs = Array.from(document.querySelectorAll('article img'));
        const srcSetAttribute = imgs.map(i => i.getAttribute('srcset'));
        // Bỏ các phần tử null
        const srcSetAttributeFilter = srcSetAttribute.filter(v => v != null);
        return srcSetAttributeFilter;
    });


    const imgUrls = imageSrcsets.map(srcSet => getLargesImageFromSrcSet(srcSet));

    // Comment if doing background
    await browsers.close();

    return imgUrls;
}






// B4. Các chuỗi code cứng lặp lại nhiều thì nên đưa ra biến.
const folderResult = "result";

// B2. Đổi tên các
async function main() {
    // Kiểm tra thư mục đã được tạo hay chưa
    if (!fs.existsSync("./" + folderResult)) {
        fs.mkdirSync(+"./" + folderResult);
    }



    const images = await getImageFromPage("https://www.instagram.com/asian.sexygirl_/");


    images.forEach(image => {
        const options = {
            url: image,
            dest: process.cwd() + "/" + folderResult + "/",     // will be saved to /path/to/dest/photo.jpg
        };

        myDownloader.image(options)
            .then(({ filename }) => {
                console.log('Saved to', filename); // saved to /path/to/dest/image.jpg
            }).catch(err => {
                console.log(err);
            });
    }
    );

}

main();
// the Art of Readable Code
// clearCode

