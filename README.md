# 減肥啦幹（FitCoach）

每日熱量、三大營養素、飲食紀錄、訓練菜單與作息規劃。資料只存在你自己的裝置裡，不會上傳。

## 怎麼用
| 裝置 | 方式 |
|---|---|
| Android 手機 | 下載安裝 [FitCoach.apk](https://github.com/WillChiou6529/fitcoach/releases/latest/download/FitCoach.apk)（第一次要允許「安裝不明應用程式」；之後有新版直接覆蓋安裝，資料保留） |
| 手機／電腦瀏覽器 | 開 <https://willchiou6529.github.io/fitcoach/>，可「加到主畫面」離線使用 |
| 電腦離線 | 下載後雙擊 `index.html`（Chrome 或 Edge），網址後加 `#diet`、`#train` 可直接開到指定頁 |

螢幕寬度 760 px 以下自動切成手機版（底部分頁列＋單欄）。

## 功能
| 頁面 | 內容 |
|---|---|
| 身體數據 | 國健署每日熱量（公式已用官網實測 10 組驗證）、BMR（Mifflin-St Jeor）、TDEE、體脂（海軍圍度法／Deurenberg）、骨骼肌估算、減重目標與三大營養素、體重趨勢圖（7 日平均） |
| 飲食紀錄 | 672 種食物＋75 組套餐：台灣常見食物、超商即食品約 240 項（7-11／全家／萊爾富／OK：御飯糰、便當、關東煮、咖啡、零食…，`data/foods_cvs.js`）、早餐店約 150 項（蛋餅、吐司、漢堡、中式豆漿店、早午餐，`data/foods_breakfast.js`）；打「711 鮪魚飯糰」也找得到；搜尋、一句話輸入（「雞腿飯、2顆茶葉蛋、半糖珍奶」）、熱量明細、教練建議（替換、蛋白質、含糖飲料、油炸、蔬果、宵夜…） |
| 我的食物 | 依包裝營養標示輸入（每份或每 100 g 自動換算；熱量、蛋白質、脂肪、碳水、糖、鈉），4/4/9 換算自動檢查；可設「⭐ 我的蛋白粉」（`js/myfoods.js`） |
| 補充品 | 乳清（WPC/WPI/WPH）、酪蛋白、植物蛋白、高蛋白飲、BCAA、EAA、麩醯胺酸、肌酸、訓練前補劑等 21 項＋7 組沖泡組合（`data/supplements.js`），有專屬建議規則 |
| 訓練菜單 | 8 個部位 × 5 套菜單；運動前一般熱身＋動態伸展 → 專項熱身 → 啟動充血 → 主訓練 → 輔助 → 收操 → 運動後靜態伸展（`data/stretch.js`，含計時），休息日全身伸展，訓練日補給建議；每個動作都有組數、次數、休息、強度、節奏、要點；一鍵排課表、依程度調組數、組間休息計時器 |
| 訓練月曆 | 每天顯示部位／第幾套／完成狀態（完成、部分、漏練）；點日期看菜單、只改這一天、拖拉對調兩天；每月完成率與連續達成；每週自動輪替 5 套；打勾後當天課表存檔，之後改課表不影響歷史 |
| 熱量赤字 | 消耗＝基礎代謝×日常活動係數＋重訓（依打勾動作的組數×次數×節奏＋組間休息，乘各段落 MET，只算淨消耗）＋有氧（跑步機等可填機器熱量，自動扣除基礎代謝重複部分）；赤字＝消耗−攝取，總覽／飲食／訓練頁都看得到，含近 7 天累積（`js/balance.js`） |
| 作息規劃 | 依上下班與通勤推算起床/就寢、三餐、訓練時段、咖啡因截止、最後進食；支援夜班；24 小時分配圖 |
| 新手教學 | 第一次開啟自動帶著走一遍 19 步（框出要操作的地方、可直接動手），隨時略過；側欄／資料管理可重看（`js/tour.js`） |
| 資料管理 | 匯出／匯入 JSON 備份；手機 App 用「複製備份文字／從文字還原」 |

## 檔案結構
```
index.html          頁面骨架
css/style.css       樣式（含深色模式）
js/calc.js          計算核心（純函式）
js/store.js         localStorage 儲存＋共用工具
js/body.js diet.js train.js sleep.js app.js   各頁
data/foods.js       食物資料庫 FOOD_DB、MEAL_PRESETS
data/workouts_a.js  胸、背、腿臀、肩
data/workouts_b.js  手臂、核心、全身燃脂、有氧
data/supplements.js data/stretch.js   補充品、熱身伸展
manifest.webmanifest sw.js icons/     PWA（網頁版加到主畫面、離線）
capacitor.config.json package.json android-res/   Android App 包裝（Capacitor）與圖示
.github/workflows/build.yml          推送到 main 自動打包 APK（Releases）＋更新網頁版（Pages）
```
資料存在 localStorage（每台裝置／每個瀏覽器各自一份；App 與瀏覽器也是分開的），換裝置請先備份。

## 發版
改完推送到 `main`，GitHub Actions 約 5–8 分鐘後在 Releases 產生新的 `FitCoach.apk`，網頁版同步更新。
APK 簽章金鑰存在 GitHub Secrets（`ANDROID_KEYSTORE_B64`、`ANDROID_KEYSTORE_PASS`），原檔另存本機、不進版控；**金鑰不能換**，換了手機上的舊版就無法直接更新。
