/**
 * Created by pravin on 5/4/17.
 */

app.controller('meetupController', ['$scope', '$http', '$resource', '$interval', function ($scope, $http, $resource, $interval) {
    var Meetup = $resource('/api/meetups');
    $scope.value = 0;
    $scope.iscache = 0;
    $scope.totalRecords = 7;
    $scope.query = {
        name: '',
        pageSize: 7,
        page: 1
    };
    function searchProduct() {
        $scope.iscache = 0;
        Meetup.query(function (results) {
            $scope.meetups = results;
        });
    }

    function callAtInterval() {
        console.log("Interval occurred");
    }

    searchProduct();
    $scope.searchRegExp = function () {
        $scope.iscache = 1;
        $scope.query = {
            name: $scope.query.name ? $scope.query.name : '',
            pageSize: 7,
            page: $scope.currentPage ? $scope.currentPage : 0
        };

        for (var i = 1; i < 100; i++) {
            $scope.value = i;
            $interval(callAtInterval(), 9990);
            $scope.value = i + 1;
            if ($scope.meetups && $scope.meetups.length === 0) {
                $scope.value = 0;
            }
        }
        return $http.post('/api/searchRegExp', $scope.query).success(function (response) {
            $scope.meetups = response.result;
            $scope.totalrecord = Math.ceil(response.count / 7);
            /*for(var i in response){
             var onequery = {};
             // var finalData = str.replace(/\\/g, "");
             onequery.name=response[i].name.replace(/\/$/g, "");
             onequery._id=response[i]._id;
             $scope.meetups.push(onequery);
             }*/

            return $scope.meetups;
        })
    };
    $scope.setCache = function () {
        $scope.iscache = 0;
    };
    $scope.search = function () {
        $scope.query = {
            name: $scope.query.name ? $scope.query.name : '',
            pageSize: 7,
            page: $scope.currentPage ? $scope.currentPage : 0
        };
        if ($scope.iscache === 0) {
            $http.post('/api/search', $scope.query).success(function (response) {
                $scope.meetups = response.result;
                $scope.totalrecord = Math.ceil(response.count / 7);

            });
        }
        else {
            for (var i = 1; i < 100; i++) {
                $scope.value = i;
                $interval(callAtInterval(), 9990);
                $scope.value = i + 1;
            }
            $http.post('/api/searchRegExp', $scope.query).success(function (response) {
                $scope.meetups = response.result;
                $scope.totalrecord = Math.ceil(response.count / 7);
            });
        }
    };

    $scope.showQrCodePravin = function () {
        
          console.log("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
    };
}]);