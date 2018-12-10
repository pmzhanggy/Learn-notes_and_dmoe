title: Ajax-HTTP-JSON-跨域
date: 2018-02-08 21:00:06
tags: [Ajax, javascript, web前端]

### 什么是 Ajax ？
全称是 Asynchronous JavaScript and XML - 异步的 JavaScript 和 XML  
Ajax不是某种编程语言，是一种无需重新加载整个网页的情况之下能够更新部分网页内容的技术

<!--more-->

### 同步和异步
- 同步：调用一旦开始，调用者必须等到方法调用返回后，才能继续后续的行为。
- 异步：调用更像一个消息传递，一旦开始，方法调用就会立即返回，调用者就可以继续后续的操作。而异步方法通常会在另外一个线程中，“真实”地执行着。整个过程，不会阻碍调用者的工作。

### XMLHttpRequest
- XMLHttpRequest 对象用于在后台与服务器交换数据。所有现代的浏览器都支持 XMLHttpRequest 对象。

- 作用：
  + 在不重新加载页面的情况下更新网页
  + 在页面已加载后从服务器请求数据
  + 在页面已加载后从服务器接收数据
  + 在后台向服务器发送数据

- 使用 XHR (XMLHttpRequest)

``` javascript
// 实例化对象
var request = new XMLHttpRequest();

// XHR 是不兼容 IE6及以下版本的,需要使用 ActiveXObject("Microsoft.XMLHTTP");
var request;
if (window.XMLHttpRequest) {
    request = new XMLHttpRequest(); // IE7+/Firefox/chrome/Opera/Safari
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP"); // IE6, IE5
}
```

### 什么是 HTTP ？
http是计算机通过网络通信的规则  
http是一种无状态的协议(无状态是指：不建立持久的链- 接，服务端不保留链接的相关信息)  
- 一个完整的**HTTP请求**过程,通常有下面七个步骤:
  1. 建立 TCP 链接
  2. Web浏览器向WEB服务器发送请求命令
  3. Web浏览器发送请求头信息
  4. Web服务器做出应答
  5. Web服务器发送应答头信息
  6. Web服务器向浏览器发送数据
  7. Web服务器关闭 TCP 链接

- 一个 **HTTP请求**的四个组成部分:
  1. HTTP请求的方法或动作，比如是GET还是POST请求
  2. 正在请求的 URL，请求的地址是什么
  3. 请求头，包含一些客户端环境信息，身份验证信息等
  4. 请求体，也就是请求的正文，请求正文中可以包含提交的查询字符串信息，表单信息等等
  ![alt text](/img/http请求示图.png "http请求示图")

- **GET** 和 **POST** 请求动作

  + GET：一般用于信息获取。使用 URL 传递参数，对所发送的信息数量也有限制，一般在 2000 个字节
  + POST：一般用于修改服务器上的资源。对发送的信息数量无限制

- 一个**HTTP响应**一般有三个部分组成:
  1. 一个**数组**和**文字**组成的状态码，用来显示请求成功还是失败

  2. **响应头**，响应头和请求头一样包含许多有用的信息，例如服务器类型、日期时间、内容类型和长度等

  3. **响应体**，也就是响应正文

     ![alt text](/img/http响应示图.png "http请求示图")

- HTTP状态码由3位数字构成，其中首位数字定义了状态码的类型：
  1. 1xx：信息类，表示收到Web浏览器的请求，正在进一步的处理中

  2. 2xx：成功，表示用户请求被正确接收，理解和处理。例如：200

  3. 3xx：重定向，表示请求没有成功，必须采取进一步的动作

  4. 4xx：客户端错误，表示客户端提交的请求有错误，例如：404 NOT Found，意味着请求的引用不存在。

  5. 5xx：服务器错误，表示服务器不能完成对请求的处理。例如：500

- XMLHttpRequest 发送请求

  1. open(method, url, async)  设置请求
     - method：采用的动作
     - url：请求的地址
     - async：是否使用异步，默认为true / 异步，可以省略不写
  2. send(string) 发送
     - string：请求主体，get 请求并没有主体，一般只在 post 中使用

  ![alt text](/img/http发送请求示图.png "http请求示图")

- XMLHttpRequest 取得响应

  1. responseText：获得字符串形式的响应数据

  2. responseXML：获得 XML 形式的响应数据

  3. status 和 statusText：以数字和文本形式返回 HTTP 状态码

  4. getAllResponseHeader()：获取所有的响应报头

  5. getResponseHeader()：查询响应中的某个字段的值

  6. readyState：属性返回当前文档的状态

     - 0：请求未初始化，open 还没有调用
     - 1：服务器连接已经建立，open 已经调用了
     - 2：请求已接收，也就是接收到头信息了
     - 3：请求处理中，也就是接收到响应的主体了
     - 4：请求已经完成，且响应已就绪，也就是响应完成了

     ![alt text](/img/监听当前文档状态.png "监听当前文档状态代码")

### 什么是 JSON ?
JSON：JavaScript 对象表示法（ JavaScript Object Notation ）

JSON：是存储和交换文本信息的语法，类似 XML。它采用键值对的方式来组织，易于人们阅读和编写，同时也易于机器解析和生成

JSON 是独立于语言的，也就是说不管什么语言，都可以解析 JSON，只需要按照 JSON 的规则来就行

- JSON 于 XML 比较

  - JSON 的长度和 XML 格式比起来更短小
  - JSON 读写的速度更快
  - JSON 可以使用 JavaScript 内建的方法直接进行解析，转换成 JavaScript 对象，非常方便

- JSON 数据的书写格式是：名称 / 值

  - 名称 / 值 组合中的名称和值都书写在双引号中，中间用冒号隔开。比如："name" : "马小云"

- JSON 值的类型可以使一下几种：

  - 数字（整数或浮点数）
  - 字符串 （在双引号中）
  - 逻辑值 （true||false)
  - 数组 （在方括号中）
  - 对象 （在花括号中）
  - null

  ![alt text](/img/json书写规范.png "JSON书写规范")

- JSON 解析

  - eval（不推荐使用） 

    - 将字符串作为代码执行

  - JSON.parse

    - 将 JSON 字符串转为 js 对象

```javascript
      var jsonObj = { "staff": [{"name":"洪七", "age": 70}]}
      var jsObj = JSON.parse(jsonObj)
```
  - JSON 校验工具
    - https://jsonlint.com/



### 跨域

JavaScript出于安全方面的考虑，不允许跨域调用其他页面的对象。什么是跨域，简单地理解就是因为 JavaScript 同源策略的限制，a.com 域名下的 js 无法操作 b.com 或是 c.a.com 域名下的对象。

![](/img/跨域.png "跨域示图")

![](/img/跨域对比示图.png "跨域对比示图")

- 处理跨跨域的方法 
  - 代理
  - JSONP
  - XHR2