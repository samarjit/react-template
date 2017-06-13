angular.module('arisApp').directive('sgSecondtile', function () {
    return {
        restrict: 'E',
        template: '<div class="o-singleTile"> <header class="o-tileHeading s-mrB10 s-pd1">Second Tile</header><hr/><section></section> </div>',
        link: function (scope, element, attrs) {
        }
    };
});
angular.module('arisApp').controller('SuperUserDashboard', [
    '$scope',
    'footerService',
    'PageService',
    'DashboardService',
    'DataSourceService',
    'PluginUtilService',
    function ($scope, FooterService, PageService, DashboardService, DataSourceService, PluginUtilService) {
        $scope.legacy = true;
        $scope.displayFilter = false;
        var dataSourceList = [];
        console.log('testdashboardpage initializing ........................');
        $scope.d = {};
        $scope.pageModel = {
            'name': 'testdashboardpage',
            'type': 'nongeo',
            'layout': [
                [{
                        'header': 'Header 0',
                        'dsName': '',
                        'size': 'col-xs-12 col-md-12',
                        'content': '<add-tile-button></add-tile-button>',
                        'static': false
                    }],
                [],
                [],
                [
                    {
                        'header': 'tilenum-1',
                        'dsName': 'waterTreatmentPlantMarkers',
                        'size': 'col-xs-12 col-md-4',
                        'content': '<div class="o-singleTile" style="min-height:250px" data-tile-id="1">\n      <i ng-click="editTile(1)" class="fa fa-pencil-square-o cursorPointer"></i>\n      <div class="chartHolder s-fullHeight ng-scope" id="tilenum-1"><aris-dc-bar data="d.waterTreatmentPlantMarkers" width="300" height="250" chart-title="Test" y-axis-label="Y-Label" ax-axis-label="X-Label" calc="avg" scale="ordinal" type="solid" ax-axis-attribute="assetName" y-axis-attribute="xCoordinate"></aris-dc-bar></div>\n    </div><a class="close map white">\xd7</a><a class="close map white">\xd7</a><a class="close map white">\xd7</a><a class="close map white">\xd7</a>',
                        'static': false,
                        'json': {
                            'data': 'd.waterTreatmentPlantMarkers',
                            'width': '300',
                            'height': '250',
                            'chartTitle': 'Test',
                            'yAxisLabel': 'Y-Label',
                            'axAxisLabel': 'X-Label',
                            'calc': 'avg',
                            'scale': 'ordinal',
                            'type': 'solid',
                            'axAxisAttribute': 'assetName',
                            'yAxisAttribute': 'xCoordinate'
                        },
                        'chartname': 'arisDcBar'
                    },
                    {
                        'header': 'tilenum-2',
                        'dsName': 'waterBoosterStationsInfoCardLineChart',
                        'size': 'col-xs-12 col-md-4',
                        'content': '<div class="o-singleTile" style="min-height:250px" data-tile-id="2">\n      <i ng-click="editTile(2)" class="fa fa-pencil-square-o cursorPointer"></i>\n      <div class="chartHolder s-fullHeight ng-scope" id="tilenum-2"><aris-dc-bar data="d.waterBoosterStationsInfoCardLineChart" width="300" height="250" chart-title="Test" y-axis-label="Y-Label" ax-axis-label="X-Label" calc="avg" scale="ordinal" type="solid" y-axis-attribute="boosterStationFlowRate" ax-axis-attribute="assetName"></aris-dc-bar></div>\n    </div>',
                        'static': false,
                        'json': {
                            'data': 'd.waterBoosterStationsInfoCardLineChart',
                            'width': '300',
                            'height': '250',
                            'chartTitle': 'Test',
                            'yAxisLabel': 'Y-Label',
                            'axAxisLabel': 'X-Label',
                            'calc': 'avg',
                            'scale': 'ordinal',
                            'type': 'solid',
                            'yAxisAttribute': 'boosterStationFlowRate',
                            'axAxisAttribute': 'assetName'
                        },
                        'chartname': 'arisDcBar'
                    }
                ]
            ]
        };
        $scope.pageName = $scope.pageModel.name;
        $scope.pageType = $scope.pageModel.type;
        PageService.setPageName($scope.pageName);
        DashboardService = Object.create(DashboardService);
        var filterToDatasourceMapping = {
                CRITICAL_PRESSURE_POINT_TREND: ['criticalPressurePoints'],
                WATER_SUPPLY_ZONE_TREND: ['waterSupplyZones'],
                CUSTOMER_CONTACT_TREND: ['customerContacts'],
                DISTRICT_METER_TREND: ['districtMeters']
            };
        DashboardService.setFilterToDatasourceMapping(filterToDatasourceMapping);
        function resultMapperCallback(dsName, response) {
            switch (dsName) {
            case 'testdatasource':
                console.log('returned testdatasource', response.data);
                var parseDate = d3.time.format('%d/%m/%Y %H:%M:%S');
                response.data.forEach(function (v, i) {
                    v.date = parseDate.parse(v.date);
                });
                break;
            case 'districtMeters':
                if (response.data.length > 0) {
                    $.map(response.data, function (value, key) {
                        value['dtvNightToAverageFlowRatio'] = new Date(value['dtvNightToAverageFlowRatio']);
                    });
                }
                break;
            }
        }
        DashboardService.setResultMapperCallback(resultMapperCallback);
        DashboardService.addListenerOnSendPageModelToCtrl($scope, 'testdashboardpage');
        DashboardService.addListenerOnFilterChange($scope);
    }
]);