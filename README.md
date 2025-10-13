# 前端面試測試

更新日期 2025/08/08

## API

- `baseUrl` 將由面試官提供
- 文檔網址 `${baseUrl}/swagger/index.html`

---

## 測試題目

1. 請先將題目 fork 到自己的倉庫，完成後請提交整個 git 連結
2. 使用 `typescript` 語法完成
3. 使用 `axios` 完成對資料的 增刪改查
4. 修改、新增、刪除等操作，發送請求前需與用戶進行確認
5. 資料需於前端校驗完畢後才可提交
6. 與用戶進行確認的畫面，請使用 `dialog` 標籤完成
7. 用戶資料使用 `pinia` 保存
8. 取得用戶資料只允許在 server 端完成
9. 配置 `vue-i18n`，繁體中文、英文
10. 封裝 `按鈕`、`輸入框` 組件
11. 請根據基礎設計稿，刻劃畫面，並依據需求自行新增元素
12. `vue-tsc` 檢查必須通過
13. 配置RWD，螢幕最小支持 320px

---

## 組件

### 按鈕 ([EBtn.vue](components/EBtn.vue))

- hover、active 需發生樣式改變

### 輸入框 ([ETextField.vue](components/ETextField.vue))

- 需能使用 v-model:value 進行雙向綁定
- 使用 vue3.4 以下方法加分

---

## 設計稿(基礎)

![test.jpg](public/test.jpg)

---

## 額外內容

- 請將您的專案透過自動化構建方式部屬 如(cloudflare pages、github pages、netlify、vercel 等)

## 使用

```shell
    pnpm install
    pnpm dev
```
