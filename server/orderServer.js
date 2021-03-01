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
