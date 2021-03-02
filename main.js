
require.config({
    baseUrl: './',
    urlArgs:'v='+(new Date()).getTime(),//清楚缓存
    paths: {
        "vue": "public/js/vue.min",
        "ELEMENT": "public/js/element.min",
        "less": "public/js/less.min",
        "axios": "public/js/axios.min",
        "constant": "util/constant",
        "request": "util/request",
        "orderServer": "server/orderServer",
        "components": "view/components",
        "page": "view/page",
        "@": "view",
    },
    map: {
        '*': {
            'text': 'public/require/require-text', // path to text
            'css': 'public/require/require-css', // path to css
            'less': 'public/require/require-less' // path to less
        }
    },
    shim: {
        'ELEMENT':{
			deps: ['vue', 'css!public/element-ui/lib/theme-chalk/index']
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
});