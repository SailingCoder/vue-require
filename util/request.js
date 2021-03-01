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
