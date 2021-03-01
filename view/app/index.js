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

