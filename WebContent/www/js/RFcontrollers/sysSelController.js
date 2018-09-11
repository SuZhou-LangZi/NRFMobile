/**
 *  系统条线选择
 */
angular.module('com.amarsoft.mobile.controllers.sysSelect', [])

    .controller(
    'SysSelController',
    function ($scope, $rootScope, $state, basePage, $http, $ionicLoading, $ionicPopup, $ionicModal) {
        basePage.init($scope);

        $scope.ct_small = true;
        $scope.ct_big = false;
        $scope.jr_small = true;
        $scope.jr_big = false;

        $scope.role_selected = false;
        $scope.role_unselected = true;
        $scope.items = [];

        // 点击跳转到传统信贷
        $scope.goToCTXD = function () {

            runServiceWithSession(
                $http,
                $ionicLoading,
                $ionicPopup,
                $state,
                "userRoleList", {
                    UserID: AmApp.loginID,
                },
                function (data, status) {
                    $scope.items = angular.fromJson(data['array'][0].UserObject);
                    if ($scope.items.length > 1) {
                        //  弹出角色选择框
                        $ionicModal.fromTemplateUrl(
                            'templates/sysSel/userRoleSelect.html', {
                                scope: $scope,
                                backdropClickToClose: false
                            }).then(function (modal) {
                                $scope.selectUserRole = modal;
                                $scope.selectUserRole.show();
                            });

                    } else {
                        $scope.ct_small = false;
                        $scope.ct_big = true;
                        AmApp.config.sysSelType = "010";
                        $state.go("workTips");
                    }

                });
        }

        // 选中节点
        $scope.userObj ;
        $scope.selectedRow = -1;
        $scope.SelectNode = function (item, index) {
            $scope.selectedRow = index;
            $scope.userObj = item;

        }

        // 关闭身份选择弹窗
        $scope.hideSelectModal = function () {
            $scope.selectedRow = -1;
            $scope.selectUserRole.hide();
        }

        // 返回登录界面
        $scope.goBackLogon = function () {
            $scope.selectUserRole.hide();
            $scope.changeState('logon');
        }

        // 确认登录
        $scope.logon = function () {

            if ($scope.selectedRow == -1) {
                appIonicLoading.show({
                    template: "请先选择登录的身份！",
                    duration: 1500
                });
                return false;
            }

            if ($scope.userObj) {
                AmApp.userID = $scope.userObj.UserRoleID;
                AmApp.loginID = $scope.userObj.UserRoleID;
            }

            $scope.ct_small = false;
            $scope.ct_big = true;
            $scope.selectUserRole.hide();
            AmApp.config.sysSelType = "010";
            $state.go("workTips");
        }

        //点击跳转到金融板块
        $scope.goToJRBK = function () {
            $scope.jr_small = false;
            $scope.jr_big = true;
            AmApp.config.sysSelType = "020";
            $state.go("workTips");
        }

    })