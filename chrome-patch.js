const fs = require('fs');
const path = require('path');

// --- manifest.json 更新 ---
const manifestPath = path.join(__dirname, 'chrome', 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('manifest.json が存在しません:', manifestPath);
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  // 説明文更新
  manifest.description = "Replaces the browser new tab page with Google and enhances it with a glass-style UI and a dock by injecting CSS and JavaScript.";

  // Firefox 固有設定削除
  delete manifest.browser_specific_settings;

  // Chrome 用新規タブ置き換え設定
  manifest.chrome_url_overrides = {
    "newtab": "newtab/index.html"
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('manifest.json を更新しました:', manifestPath);
}

// --- google.css URL 置換 ---
const cssPath = path.join(__dirname, 'chrome', 'src', 'google.css');

if (!fs.existsSync(cssPath)) {
  console.error('CSS ファイルが存在しません:', cssPath);
} else {
  let cssContent = fs.readFileSync(cssPath, 'utf-8');
  let extensionid = "glnpdkhanlahkmfiebiimajjboalijlm"
  // URL 置換const extensionUrl = 'chrome-extension://your-extension-id';
  cssContent = cssContent.replace(/url\("\/src\/wallpaper\/image\.jpeg"\)/g, `url("chrome-extension://${extensionid}/src/wallpaper/image.jpeg")`);
  cssContent = cssContent.replace(/url\("\/src\/wallpaper\/image-light\.jpeg"\)/g, `url("chrome-extension://${extensionid}/src/wallpaper/image-light.jpeg")`);


  fs.writeFileSync(cssPath, cssContent, 'utf-8');
  console.log('CSS 内の URL を置換しました:', cssPath);
}
