// app.js
define([
    "constant",
    "orderServer",
    'text!page/order/index.html',
    'less!page/order/index'
], function(constant, orderServer, tpl) {
	return {
        template: tpl,
        components: {
            progressSwipper,
        },
         data() {
            return {
                title: '订单管理'
            }
        },
        mounted: function () {},
        created: function() {},
        methods: {},
    }
});

