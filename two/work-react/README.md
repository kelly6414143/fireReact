## 文檔網址: 
[進入文檔網址](https://hackmd.io/zdHdCSssQOOLjAwWBzxyKQ)

## 原型網址:
[進入原型網址](https://www.figma.com/proto/pkCVS02nlmputhnsyDmk1Y/l8-upgrade?node-id=37%3A10&scaling=min-zoom&page-id=3%3A302&starting-point-node-id=37%3A10&show-proto-sidebar=1)

## 使用技術:
React, react-dom, react-router, react-router-dom, tailwindcss, react-transition-group

> react-transition-group
>> 控制 transition 效果

## 進度

### 未開始

1. 縮小側邊欄
2. Dialog改為DOMRender渲染
3. api集中管理-進階配置 

### 開始中

1. 綁定權限判斷
2. 圖檔上傳

#### 修改q1的bug及建議事項

1. ~~package 裝了就要用，沒用就砍掉，如 use-context-selector~~
2. 一下 class 一下 function component，class 處理得內容也不是 function 不能處理的(如錯誤邊界)，你是義大利廚師嗎？官方建議新專案全用 function，除非 function 做不到的再用 class
3. ~~你想語意化標籤要放對位置啊，不然一律全使用 div，反正是後台，header 標籤使用有問題~~
4. ~~你的 router 是在打太極嗎，包了又包也沒抽象，怎不直接 config + map 處理就好呀？~~
5. 建議任何輸入/輸出組件要有組內自制及組外控制的機制，意思為不傳 value 組件能動，傳 value 也能讓傳入方改變組件的值，但如果是開發專案的話不這麼做也沒差，但建議做
6. 少了防禦編程，任何可能為空的值都要防呆，如 InputItem 的 change
7. ~~Toast timer 別共用~~
8. ~~addSuccessToast 這名字取的不好呀，裡面處理 error 也處理 success type 請改個好名字~~
9. 因為你做了 Dialog 組件，我就幫你評一下，這種浮層組件，建議都放在 root 外，像你的 toast 那樣放就 ok
10. ~~Validtor, comfirm 打錯字~~
11. Validtor 的數字生成請使用 jsx 方式處理
12. Validtor 的數字生成請用代碼生成，不要 1, 2, 3 這樣寫
13. local/sessionStorage 一律建議不要直接 get/set/removeItem 來進行操作，建議由 store 驅動這些資料，不然你要一直 parse 轉來轉去
14. 全局 fetch 錯誤處理，通常權限不足 api 不會只有一隻，這種寫法會有問題，這樣你每隻私有 api 都需要再 catch 一次
15. 404 不用搓驗證 api，而且進不到你的 404 頁面
16. 測試 console 一律建議砍掉，或是 dev 下可見
17. onLogin 都一樣的 code 就復用
18. 表單驗證請由組件驅動，因為你都封裝組件了，就該讓他驅動
19. ~~import 路徑建議一律 alias 處理~~
    - 由於此專案是使用cra建置, wepback設定已經寫在react-scripts腳本中, 故無法直接使用webpack.config.js去改變webpack設置, 以此專案的啟動方式craco去改變, 故使用方式為在`craco.config.js`底下增加alias資訊
    ```=javascript
        const path = require('path');

        module.exports = {
            // ...
            webpack: {
                alias: {
                    '@': path.join(path.resolve(__dirname, './src')),
                }
            }
        }
    ``` 
20. 等驗證完在進頁面，不要沒驗證完就進，那驗證的意義就沒了

### 完成

1. api集中管理-基礎配置 (9/8 完成)
2. 使用者資料補全 (9/11 完成-未調整表單及輸入框組件)
3. 註冊頁增加使用者名稱 (9/11 完成-未調整表單及輸入框組件)
4. 側邊欄 (9/12 完成)
5. 綁定側邊欄資料 (9/12 完成)
6. 增加contextx (9/12 完成)
7. header 右上角使用者資料 (9/12 完成)



