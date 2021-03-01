vue-require

最近开发了一个单页面应用，但不是基于vue-cli开发。

项目整体使用ES5开发，采用将require与vue相结合的AMD开发模式。



一、优势简介

1、RequireJS 是一个JavaScript模块加载器。它非常适合在浏览器中使用，提高代码的加载速度和质量。

2、Vue是一套用于构建用户界面的渐进式框架。特点自底向上逐层应用开发，且Vue 的核心库只关注视图层。

3、开发简单，可用于轻量级的单页面应用开发。

二、核心区域

1、main.js : 在其中使用 require() 来加载所有你需要运行的scripts。这可以确保你所有的scripts都是在这里加载的, 你可以指定 data-main script 使用异步加载。

```javascript
<!DOCTYPE html>
<html>
    <head>
        <title></title>
        <meta http-equiv="content-type" content="text/html; charset=UTF8"/>
        <script type="text/javascript" data-main="js/main" src="js/require.js" charset="UTF8"></script>
    </head>
    <body>
    </body>
</html>
```

2、采用require.config进行配置加载，然后使用require加载。

```javascript
// mian.js
require.config({
    baseUrl: '../',
    urlArgs: 'v='+(new Date()).getTime(),
    paths: {
        "vue": "public/js/vue.min",
        "ELEMENT": "public/js/element.min",
        "less": "public/js/less.min",
        "axios":"public/js/axios.min",
        "constant": "util/constant",
        "request": "util/request",
        "orderServer": "server/orderServer",
        "component": "component",
        "@": "page",
    },
    map: {
        '*': {
            'text': 'html/js/require/require-text', // path to text
            'css': 'html/js/require/require-css', // path to css
            'less': 'html/js/require/require-less' // path to less
        }
    },
    shim: {
        'ELEMENT':{
			deps: ['vue', 'css!/html/element-ui/lib/theme-chalk/index']
		}
    },
});

require([
    "vue", 
    "ELEMENT", 
    '@/app/index',
], function(Vue, ELEMENT, app) {
    Vue.use(ELEMENT)
    var app = new Vue({
        el: '#app',
        template: "<div><app></app></div>",
        components: {
            app
        },
        data: {},
        mounted: function () {},
        created: function() {},
        methods: {}
    })
})

```
（1）config，require基础配置

1）baseUrl：用于加载模块的根路径。

2）urlArgs：清楚js缓存

3）paths:用于映射不存在根路径下面的模块路径。

4）shim:配置在脚本/模块外面并没有使用RequireJS的函数依赖并且初始化函数。
如所依赖的地方放文件没有采用require模块话开发，则需要配置在shim中。有当require获取不到模块时才会去shims中寻找。

5）map：适用于调用了define()并将其注册为 “匿名模块” 的真正AMD模块脚本。

在map中支持 “ * ”，对于所有的模块加载，都可以使用本map配置。

（2）require/define

require/define: 传两个参数，第一个参数是加载所依赖的模块，数组格式；第二个参数是回调函数，当前面的模块加载完成后执行回调函数。加载的模块会以参数的形式传人该函数。

```javascript
// app.js
define([
    "constant",
    "component/progressSwipper/index",
    "orderServer",
    'text!@/app/index.html',
    'less!@/app/index'
], function(constant, progressSwipper, orderServer, tpl) {
	return {
        template: tpl,
        components: {
            progressSwipper,
        },
         data() {
            return {
                title: 'hello world'
            }
        },
        mounted: function () {},
        created: function() {},
        methods: {},
    }
});

```

三、http

1、二次封装axios

```
// request.js
define(["axios"], function(axios) {
    /**
     * ajax请求配置
     */
  
    // axios默认配置
    axios.defaults.timeout = 300000;   // 超时时间
    axios.defaults.baseURL = '/';  // 默认地址

    //整理数据
    axios.defaults.transformRequest = function (data) {
        //data = Qs.stringify(data);
        data = JSON.stringify(data);
        return data;
    };

    // 路由请求拦截
    // http request 拦截器
    axios.interceptors.request.use(
        config => {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            return config;
        },
        error => {
            return Promise.reject(error.response);
        }
    );

    // 路由响应拦截
    // http response 拦截器
    axios.interceptors.response.use(
        response => {
            if (response.status == "404") {
                console.log("response.data.resultCode是404")
                return response.data;
                // window.location.href='error.html'
                // return Promise.reject('404')
            } else {
                return response.data;
            }
        },
        error => {
            return error.response   // 返回接口返回的错误信息
            // return Promise.reject(error.response)   // 返回接口返回的错误信息
        }
    );

    
    return {
        get: function(url, params) {
            return axios({
                methods: 'get',
                url: url,
                params: params || {}
            });
        },
        post: function(url, data) {
            return axios({
                methods: 'post',
                url: url,
                data: data || {}
            });
        },
        all: function(arr) {
            return axios.all(arr);
        },
    };
});
```

2、定义server模块
```
// orderServer.js
define(["request"], function(request) {
    return {
        /**
         * 获取用户基本信息
         * @param {*} params 
         */
        getBasicData: function (params) {
            return request.get('/purchase/member/business.php?do=getMemberData', params);
        },
        /**
         * 储存用户基本信息
         * @param {*} params 
         */
        saveFilterData: function (params) {
            return request.post('/purchase/member/business.php?do=saveMemberData', params);
        },
    };
});
```