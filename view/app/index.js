define([
    '@/operationData/index',
    'text!@/app/index.html',
    'less!@/app/index',
    "less!common/less/popover",
    "less!common/less/modeScreen",
], function(operationData, tpl) {
    return {
        template: tpl,
        components: {
            operationData,
        },
        data() {
            return {
                activeName: 'first'
            }
        },
        mounted: function () {
        },
        created: function() {
            
        },
        methods: {
        },
    }
})