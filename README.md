# 教學作品集 (Teaching Portfolio) - 技術文件

本專案為靜態前端網站，用於展示個人的教學經驗、教案與校園影音紀錄。同時內建包含前端與簡單的本地 Node.js 追蹤系統。

## 專案結構
- `index.html`: 網站主頁，包含各個教學區塊。
- `style.css`: 網站樣式，包含響應式設計 (RWD設計) 與深色/半透明按鈕調整。
- `script.js`: 前端互動邏輯，包含圖片輪播、手機端 PDF 直接開啟，與載入動畫。
- `server.js`: 輕量級 Node.js 後台，提供本地起服、訪客 IP 及時間紀錄、以及 `/admin` 儀表板。
- `visits.json` (自動產生): 儲存 `server.js` 紀錄的訪客陣列資料。

## 核心功能說明 (Frontend)
1. **手機版專屬 PDF 閱讀機制**：在 `script.js` 偵測裝置，若判斷為手機/平板，點選 PDF 即透過 `window.open` 開啟，利用行動裝置原生 PDF 閱讀器，解決 iframe 內容無法捲動的問題。
2. **自動輪播與檢視器 (Viewer)**：圖片大小限制最高 `70vh` 以免造成版面破壞；左右切換按鈕固定並包含半透明遮罩，解決手機解析度下超出螢幕的問題。

## 部署與使用方法

### 選擇 1: 本地 / VPS 部署 (支援紀錄後台)
如果你希望保留 `/admin` 功能以便追蹤別人看作品集的紀錄：
1. 確認系統已安裝 [Node.js](https://nodejs.org/)。
2. 在目錄執行：
   ```bash
   node server.js
   ```
3. 訪問 `http://localhost:3000` 觀看網站，訪問 `http://localhost:3000/admin` 觀看追蹤紀錄。
4. 若要部署到雲端，推薦透過 Render.com、Railway 或 Zeabur 等支援 Node.js 的伺服器平台。

### 選擇 2: GitHub Pages 部署 (僅純靜態網頁，不支援紀錄後台)
> ⚠️ **注意**：GitHub Pages 為純靜態主機，**無法運行 Node.js (`server.js`)**。部署後網站功能完全正常，但「隱藏版後台紀錄訪客」的功能將失效。

若要部署到 GitHub Pages，請跟著以下步驟利用 Git 發布：
```bash
# 1. 於資料夾內初始化 git
git init

# 2. 將所有檔案加入追蹤 (不含訪客紀錄的話請不要上傳 visits.json)
git add index.html style.css script.js cover_IMG.png ./primary ./kindergarten README.md

# 3. 提交變更
git commit -m "Deploy portfolio"

# 4. 在 GitHub 新建一個空的 Repo (例如：my-portfolio)，並複製其網址
git branch -M main
git remote add origin https://github.com/你的帳號/你的Repository.git
git push -u origin main
```
完成後，到 GitHub Repository 的 **Settings -> Pages**，將 `Source` 設定為 `Deploy from a branch`，Branch 選擇 `main`，點擊 Save 後等候 1-2 分鐘即可獲得你的上線網址。

## 若希望在 GitHub Pages 上依然有訪客追蹤？
因為沒有自家 Backend，請改用免費第三方前端紀錄方案：
- **Google Analytics**：申請後將 `<script>` 貼到 `index.html` 的 `<head>`。
- **GoatCounter**：極度簡單且注重隱私的免費計數器，申請帳號後將他們的 script 放入 `index.html`，即可擁有類似於 `/admin` 的後台。
