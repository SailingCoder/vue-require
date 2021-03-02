// app.js
define([
    "constant",
    "orderServer",

    "page/member",
    "page/order",
    'text!@/app/index.html',
    'less!@/app/index'
], function(constant, orderServer, pageMember, pageOrder, tpl) {
	return {
        template: tpl,
        components: {
            pageMember,
            pageOrder,
            progressSwipper,
        },
         data() {
            return {
                activeName: 'second',
                title: 'hello world'
            }
        },
        mounted: function () {},
        created: function() {},
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },
    }
});

