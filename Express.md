---
tags: Express, Note
---
# Express 心得筆記
## Introduce
**Express 為node.js 輕量型web框架，可以加快node開發網站**
## GuideLine
1. How to use
2. Router
3. Middleware
4. Static
5. Express-generator
6. Else
## How to use
1. 初始準備
```
$ npm init 初始設定，會跑出一個package.json的檔案

package name: (expresstest) 專案名稱
version: (1.0.0) 版本號
description: this is express test 專案描述
entry point: (index.js) 
test command:
git repository: 版本庫
keywords: 關鍵字
author: 作者
license: (ISC) 授權

$ npm install express --save 安裝express

--save代表將這個套件名稱，紀錄在package.json
-g 代表global為全域的意思，會將套件安裝在本機電腦
```
2. 設定伺服器
創建一個app.js檔，並輸入以下code，
```
const express = require('express'); 宣告express變數讀取express套件
const app = express(); 宣告app為express function
app.listen(3000); 設定伺服器會監聽 3000 port
```
* 開啟Terminal終端機，執行node，再打開網址輸入localhost:3000，有出現畫面代表成功
![](https://i.imgur.com/IqlLtT9.png)
![](https://i.imgur.com/jQrN994.png)
3. 入門嘗試

```
app.use(express.static('public'));  app.use為中介軟體，設定public為路徑資料夾

app.get('/',function(req,res){res.send('Hello World')}); 網頁會從 / 路徑get資料，然後res回傳資料
```
4. 開始製作靜態網頁
需要有static(連結靜態檔案)；get、post等Http方法；res.send()
```
```
## Router
**router 指判斷Application如何回應user對特定端點的要求，這個端點是URL與特定HTTP方法**
```
app.method(path,handler)
```
* app 為express instnace
* method為http方法: get、post、put、delete
* path為server路徑
* handler為要執行的function
```
# Instance
app.get('/',function(req,res){res.send('Hello World!')});
app.post('/',function(req,res){res.send('Hello World!')});
app.put('/',function(req,res){res.send('Hello World!')});
app.delete('/',function(req,res){res.send('Hello World!')});
```
* 特殊router
```
app.get('/ab?cd', function(req, res) =>為 /acd、/abcd
app.get('/ab+cd', function(req, res) =>為 /abcd、/abbbbbcd
app.get('/ab*cd', function(req, res) =>為 /abcd、/abcXV123d
app.get('/ab(cd)?e', function(req, res) => 為/abe or /abcde
正規表達式
app.get('/.*fly$/', function(req, res) => 為/tttfly，但是/sssflyman or /sssfly man都不行
```
* 常用回應方法
```
res.download 提示下載檔案
res.end() 結束process
res.json() 傳送JSON respond
res.jsonp() 傳送JSON respond，並支援JSONP
res.redirect() 重新導入網頁
res.render() 渲染view
res.send() 傳送respond
res.status() 設定HTTP狀態回應
```
* Express 4.0
可以使用Router()建立Express的Router物件，管理route規則。可以將不同功能router，以不同路徑包裝在應用程式中，讓程式結構模組化更有彈性。
```
var app = express();
var router = exprss.Router();

管理route規則
router.post('/signin',function(req,res){...}); //(api/user/signin)
router.get('/signout',function(req,res){...}); //(api/user/signout)
router.post('/signup',function(req,res){...}); //(api/user/signup)
app.use('/api/user',router);
app.listen(3000);

同路徑指定多種方法
router.route('/user/:username')
    .get(function(req,res){...}) //get user information
    .post(function(req,res){...}) // create user
    .put(function(req,res){...}) // update
    .delete(function(req,res){...}); //delete user
app.use('/api/admin',router);

檢查parameter
router.param('username',function(req,res,next,username){
    if(username == 'Somebody'){next();}else{res.status(404);}
});

router.use(function(req,res,next){
    if(res.params.username =='Somebody'){next();}else{res.status(404);}
});
```
## Middleware
**Middleware中介軟體，能夠存取req、res和呼叫下一個middleware，**
可以做到
1. 執行code
2. 對req、res進行設定
3. end()結束循環、next()執行下一個middlrware
4. 進行堆疊
```
app.use('/',function(req,res,next){...},function(req,res,next){...});
```
## Static
**static為靜態的意思，如果要讓html可以讀取到css、js、image等檔案，就得使用Express框架中的express-static內建middleware**
```
app.use(express.static('public'));

此時查看檔案路徑會是
http://localhost:3000/image/001.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/script.js
```
* 可以給予虛擬路徑
```
app.use('/rout',express.static('public'));

查詢時輸入
http://localhost:3000/rout/image/001.jpg
http://localhost:3000/rout/css/style.css

```
* 可以使用多個靜態資料目錄
```
app.use(express.static('public'));
app.use(express.static('js'));
app.use(express.static('css'));
```
* 絕對路徑
 如果啟動express的目錄位置和靜態檔案位置不同時，可以直接使用絕對路徑來找靜態檔案
```
app.use(express.static(_dirname+'/public'));
app.use(express.static(path.join(_dirname+'/public')));
```
## Express-generator
**為快速建立WEB框架的工具**
```
1. 安裝
$ npm install express-generator -g 

## express-generator 只能夠global使用，也代表這台電腦所有project都能夠使用，global會把module安裝在本機端內 ex: C槽

2. 指定專案名稱建立應用，並安裝tmeplete engine(預設為jade，不過目前已改名為pug)
$ express --view=【TempleteEngine】 【ProjectName】
【ejs】 $ express --view =ejs myapp
【pug】 $ express --view =pug myapp
```
* 第2點完成後會出現以下畫面
(如果目前路徑已經在指定安裝的資料夾，不需要在後面多加dirname)
![](https://i.imgur.com/OgjNDY8.png)

```
3. 執行應用
$ set DEBUG=myapp:* & npm start
```
* 完成執行的終端機畫面；打開localhost:3000，有出現畫面就代表成功了
![](https://i.imgur.com/MKpBwjw.png)
![](https://i.imgur.com/2NcA9xV.png)

## Else Setting
* 狀態處理
```
停止工作程序(通常放在最下面，)
app.use(function(req,res,next){
    res.status(404).send('傳送的訊息');
})

回報錯誤結果
app.use(function(err,req,res,next){
    res.status(500).send('傳送的訊息');
})

```

## 參考資料
1. [Express官方文件](http://expressjs.com/)
2. [使用Express快速建立環境](https://ithelp.ithome.com.tw/articles/10191816)
3. [寫點科普-Express入門](https://hellolynn.hpd.io/2017/08/11/node-js-express-%E5%88%9D%E5%85%A5%E9%96%80-%E4%B8%8A%E9%9B%86/)
