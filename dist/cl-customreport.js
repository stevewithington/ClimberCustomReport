define(["jquery","underscore","qlik","ng!$q","ng!$http","./properties","./initialproperties","client.utils/state","./lib/js/extensionUtils","./lib/external/Sortable/Sortable","css!./lib/css/style.css"],function(a,b,c,d,e,f,g,h,i,j,k){"use strict";var l='<div qv-extension id="cl-customreport-container" style="height: 100%; position: relative; overflow: auto;" ng-class="getClass()"> <div ng-show="collapsed"><div class="containerlabel"><i style="padding-right: 10px; padding-left: 10px" class="icon-table"></i>{{data.displayText}}</div></div><div ng-hide="collapsed"> <div ng-show="fieldsAndSortbarVisible" class="container_left" ng-style="getContainerWidth(&apos;left&apos;)"> <div class="bootstrap" style="margin-right: 12px;""> <div class="form-group"> <div class="containerlabel" q-translation="library.Visualizations"></div><form name="myForm"> <lui-select name="mySelect" id="mySelect" ng-change="changeTable()" ng-options="option.qMeta.title for option in data.masterObjectList track by option.qInfo.qId" ng-model="data.activeTable"></lui-select> </form> </div><div class="containerlabel" q-translation="Common.Dimensions"></div><ul id="dimensionSortable" class="lui-list dimension-list" ng-style="getListMaxHeight(&apos;dimension&apos;)"> <li qv-swipe="swipe($event)" ng-class="dimension.handle" class="lui-list__item" ng-click="selectItem(dimension)" title="{{dimension.title +&apos;\n&apos; + dimension.description}}" ng-repeat="dimension in report.dimensions" data-id={{dimension.dataId}}> <div class="lui-list__text">{{dimension.title}}</div><div class="icon-tick lui-list-icon" ng-if="dimension.selected"></div></li></ul> <div class="containerlabel" q-translation="Common.Measures"></div><ul id="measureSortable" class="lui-list measure-list" ng-style="getListMaxHeight(&apos;measure&apos;)"> <li class="lui-list__item" ng-click="selectItem(measure)" title="{{measure.title +&apos;\n&apos; + measure.description}}" ng-repeat="measure in report.measures"> <div class="lui-list__text">{{measure.title}}</div><div class="lui-icon--tick lui-icon" ng-if="measure.selected"></div></li></ul> </div></div><div class="container_right" ng-style="getContainerWidth(&apos;right&apos;)"> <div ng-show="fieldsAndSortbarVisible" class="bootstrap"> <div class="containerlabel">{{data.displayText}}<i title="Clear All" class="icon-toolbar-clearselections" ng-click="clearAll()" ng-class="report.state.length==0 ? &apos;disabled&apos;: &apos;&apos;"></i><i title="Hide fields/sortbar" class="icon-maximize" ng-click="hideFieldAndSortbar()"></i><i title="Export" class="icon-toolbar-sharelist" ng-click="exportData(&apos;exportToExcel&apos;)"></i></div><ul id="reportSortable" ng-class="{plain:!data.tagColor}" class="sortablelist" > <li ng-class="item.type==&apos;dimension&apos; ? &apos;label-dimension&apos; : &apos;label-measure&apos;" title="{{item.title +&apos;\n&apos; + item.description}}" ng-repeat="item in report.state"> <div>{{item.title}}</div><span class="icon-vtabs-delete" ng-click="removeItem(item)"></span> </li></ul> </div > <div ng-style="getTableHeight()"> <div class="rain rain-loader qv-block-ui ng-scope" ng-style="getTableHeight()" style="top:inherit;" ng-class="{&apos;qv-fade-out&apos;: fadeOut, &apos;qv-transparent-background&apos;: transparentBackground}" tid="3e1f54"> <div class="qv-animate progress-loader qv-loader-container qv-loader-huge qv-fade-in" ng-class="ngClasses"> <div class="one"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105,205c-26.7,0-51.8-10.4-70.7-29.3C15.4,156.8,5,131.7,5,105s10.4-51.8,29.3-70.7C53.2,15.4,78.3,5,105,5 c55.1,0,100,44.9,100,100S160.1,205,105,205z M105,23.7c-44.8,0-81.3,36.5-81.3,81.3c0,44.8,36.5,81.3,81.3,81.3 c44.8,0,81.3-36.5,81.3-81.3C186.3,60.2,149.8,23.7,105,23.7z"></path> </g> </svg> </div><div class="two"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105,205C49.9,205,5,160.1,5,105C5,49.9,49.9,5,105,5c55.1,0,100,44.9,100,100C205,160.1,160.1,205,105,205z M105,19.4c-47.2,0-85.6,38.4-85.6,85.6c0,47.2,38.4,85.6,85.6,85.6c47.2,0,85.6-38.4,85.6-85.6C190.6,57.8,152.2,19.4,105,19.4z"></path> </g> </svg> </div><div class="three"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105,205c-26.7,0-51.8-10.4-70.7-29.3C15.4,156.8,5,131.7,5,105s10.4-51.8,29.3-70.7C53.2,15.4,78.3,5,105,5 c55.1,0,100,44.9,100,100S160.1,205,105,205z"></path> </g> </svg> </div><div class="four"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105,205C49.9,205,5,160.1,5,105C5,49.9,49.9,5,105,5c55.1,0,100,44.9,100,100C205,160.1,160.1,205,105,205z M105,19.4c-47.2,0-85.6,38.4-85.6,85.6c0,47.2,38.4,85.6,85.6,85.6c47.2,0,85.6-38.4,85.6-85.6C190.6,57.8,152.2,19.4,105,19.4z"></path> </g> </svg> </div><div class="five"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105 205C49.9 205 5 160.1 5 105C5 49.9 49.9 5 105 5c55.1 0 100 44.9 100 100C205 160.1 160.1 205 105 205z M105 10.5c-52.1 0-94.5 42.4-94.5 94.5c0 52.1 42.4 94.5 94.5 94.5c52.1 0 94.5-42.4 94.5-94.5C199.5 52.9 157.1 10.5 105 10.5z"></path> </g> </svg> </div><div class="six"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105,205c-26.7,0-51.8-10.4-70.7-29.3C15.4,156.8,5,131.7,5,105s10.4-51.8,29.3-70.7C53.2,15.4,78.3,5,105,5 c55.1,0,100,44.9,100,100S160.1,205,105,205z"></path> </g> </svg> </div><div class="seven"> <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 210 210" xml:space="preserve"> <g> <path class="path" d="M105,205C49.9,205,5,160.1,5,105C5,49.9,49.9,5,105,5c55.1,0,100,44.9,100,100C205,160.1,160.1,205,105,205z M105,19.4c-47.2,0-85.6,38.4-85.6,85.6c0,47.2,38.4,85.6,85.6,85.6c47.2,0,85.6-38.4,85.6-85.6C190.6,57.8,152.2,19.4,105,19.4z"></path> </g> </svg> </div></div><div class="qv-loader-text ng-scope qv-loader-huge qv-fade-in" ng-if="rainText" ng-class="ngClasses"> <div ng-show="rainText.text" q-translation="Export.Exporting" class="ng-hide"></div></div></div><div id="customreporttable" class="qvobject" ></div></div></div><div></div>';return l=l.replace("&apos;","'"),i.addStyleToHeader(k),{definition:f,initialProperties:g,snapshot:{canTakeSnapshot:!1},resize:function(a,b){this.$scope.size.clientHeight=a.context.clientHeight,this.$scope.size.clientWidth=a.context.clientWidth,this.$scope.handleResize(a,b.props.allowCollapse)},paint:function(a,b){this.$scope.size.clientHeight=a.context.clientHeight,this.$scope.size.clientWidth=a.context.clientWidth,this.$scope.handleResize(a,b.props.allowCollapse)},getExportRawDataOptions:function(c,d,e){d.getVisualization().then(function(){a("#cl-customreport-container").scope().collapsed||c.addItem(a("#cl-customreport-container").scope().fieldsAndSortbarVisible?{translation:"Hide fields/sortbar",tid:"Expand",icon:"icon-maximize",select:function(){a("#cl-customreport-container").scope().hideFieldAndSortbar()}}:{translation:"Show fields/sortbar",tid:"Collapse",icon:"icon-minimize",select:function(){a("#cl-customreport-container").scope().showFieldAndSortbar()}});var d=b.countBy(a("#cl-customreport-container").scope().report.state,"type"),f=d.dimension?a("#cl-customreport-container").scope().report.dimensions.length-d.dimension:a("#cl-customreport-container").scope().report.dimensions.length,g=d.measure?a("#cl-customreport-container").scope().report.measures.length-d.measure:a("#cl-customreport-container").scope().report.measures.length;if(f||g){var h=c.addItem({translation:"Add fields",tid:"add-submenu",icon:"icon-add"});if(f){var i=h.addItem({translation:"Add dimension",tid:"add-dimension-submenu",icon:"icon-add"});b.each(a("#cl-customreport-container").scope().report.dimensions,function(b){b.selected||i.addItem({translation:b.title,tid:"dimension",select:function(){a("#cl-customreport-container").scope().selectItem(b)}})})}if(g){var j=h.addItem({translation:"Add measure",tid:"add-measure-submenu",icon:"icon-add"});b.each(a("#cl-customreport-container").scope().report.measures,function(b){b.selected||j.addItem({translation:b.title,tid:"switch",select:function(){a("#cl-customreport-container").scope().selectItem(b)}})})}}if(d.dimension||d.measure){var k=c.addItem({translation:"Remove fields",tid:"remove-submenu",icon:"icon-remove"});if(d.dimension){var l=k.addItem({translation:"Remove dimension",tid:"remove-dimension-submenu",icon:"icon-remove"});b.each(a("#cl-customreport-container").scope().report.dimensions,function(b){b.selected&&l.addItem({translation:b.title,tid:"dimension",select:function(){a("#cl-customreport-container").scope().removeItem(b)}})})}if(d.measure){var m=k.addItem({translation:"Remove measure",tid:"remove-measure-submenu",icon:"icon-remove"});b.each(a("#cl-customreport-container").scope().report.measures,function(b){b.selected&&m.addItem({translation:b.title,tid:"switch",select:function(){a("#cl-customreport-container").scope().removeItem(b)}})})}}if(a("#cl-customreport-container").scope().data.masterObjectList.length>1){var n=c.addItem({translation:"Switch table",tid:"switch-submenu",icon:"icon-cogwheel"});b.each(a("#cl-customreport-container").scope().data.masterObjectList,function(b){b.qInfo.qId!=a("#cl-customreport-container").scope().data.activeTable.qInfo.qId&&n.addItem({translation:b.qMeta.title,tid:"switch",icon:"icon-table",select:function(){a("#cl-customreport-container").scope().data.activeTable=b,a("#cl-customreport-container").scope().changeTable()}})})}return c.addItem({translation:"contextMenu.export",tid:"export",icon:"icon-toolbar-sharelist",select:function(){a("#cl-customreport-container").scope().exportData("exportToExcel")}}),void e.resolve()})},template:l,controller:["$scope",function(e){function f(){var a=d.defer();return k.getAppObjectList("masterobject",function(c){e.data.masterObjectList=b.reduce(c.qAppObjectList.qItems,function(a,c){return"table"==c.qData.visualization&&("All tables"==e.data.tag?a.push(c):b.each(c.qMeta.tags,function(b){b==e.data.tag&&a.push(c)})),a},[]),a.resolve(!0)}),a.promise}function g(){k.getList("MeasureList",function(a){e.data.masterMeasures=a.qMeasureList}),k.getList("DimensionList",function(a){e.data.masterDimensions=a.qDimensionList})}e.size={clientHeight:-1,clientWidth:-1},e.fieldsAndSortbarVisible=!0,e.collapsed=!1,e.rainText=!1,e.minWidthCollapsed=200,e.minHeightCollapsed=200,e.data={tag:null,tagColor:!0,sortOrder:"SortByA",activeTable:null,displayText:"Custom Report",masterObjectList:[],masterDimensions:[],masterMeasures:[]},e.report={tableID:"",title:null,supressZero:!1,report:[],dimensions:[],measures:[],interColumnSortOrder:[]};var i=function(a){a.preventDefault(),a.stopPropagation()};e.reportConfig={group:{name:"report",put:["dim","measure"]},animation:150,ghostClass:"ghost",onStart:function(){a("body").on("dragstart",".qv-panel-wrap",i),a("body").on("dragover",".qv-panel-wrap",i)},onEnd:function(){a("body").off("dragstart",".qv-panel-wrap",i),a("body").off("dragover",".qv-panel-wrap",i)},onSort:function(a){e.report.state.splice(a.newIndex,0,e.report.state.splice(a.oldIndex,1)[0]),e.updateTable()}};var k=c.currApp(),l=e.$parent.layout.qExtendsId?e.$parent.layout.qExtendsId:e.$parent.layout.qInfo.qId;e.handleResize=function(a,b){a.context.clientHeight<e.minHeightCollapsed||a.context.clientWidth<e.minWidthCollapsed?!e.collapsed&&b&&(e.collapsed=!0,e.updateTable()):e.collapsed&&(e.collapsed=!1,e.updateTable())},e.getClass=function(){return h.isInAnalysisMode()?"":"no-interactions"},e.loadActiveTable=function(){var a=d.defer();return e.report.state=[],e.updateTable(),null!==e.data.activeTable?setTimeout(function(){k.getObjectProperties(e.data.activeTable.qInfo.qId).then(function(c){e.report.title=c.properties.title,e.report.supressZero=c.properties.qHyperCubeDef.qSuppressZero;var d=-1,f=b.map(c._properties.qHyperCubeDef.qDimensions,function(a){if(d+=1,a.qLibraryId){var c=b.find(e.data.masterDimensions.qItems,function(b){return b.qInfo.qId==a.qLibraryId}),f=a;return f.qType="dimension",{title:c.qMeta.title,description:c.qMeta.description,columnOptions:f,type:"dimension",selected:!1,dataId:d}}return{title:""==a.qDef.qFieldLabels[0]?a.qDef.qFieldDefs[0]:a.qDef.qFieldLabels[0],description:"",columnOptions:a,type:"dimension",selected:!1,dataId:d}});e.report.dimensions="SortByA"==e.data.sortOrder?b.sortBy(f,function(a){return a.title}):f;var g=b.map(c._properties.qHyperCubeDef.qMeasures,function(a){if(d+=1,a.qLibraryId){var c=b.find(e.data.masterMeasures.qItems,function(b){return b.qInfo.qId==a.qLibraryId}),f=a;return f.qType="measure",{title:c.qMeta.title,description:c.qMeta.description,columnOptions:f,type:"measure",selected:!1,dataId:d}}return{title:a.qDef.qLabel?a.qDef.qLabel:a.qDef.qDef,description:"",columnOptions:a,type:"measure",selected:!1,dataId:d}});e.report.measures="SortByA"==e.data.sortOrder?b.sortBy(g,function(a){return a.title}):g,a.resolve(!0)})},500):a.resolve(!1),a.promise},e.changeTable=function(){var a={},b=JSON.parse(localStorage.getItem(l));void 0!=b&&void 0!=b.states&&(a=b.states[e.data.activeTable.qInfo.qId],a&&(e.report.interColumnSortOrder=a.qInterColumnSortOrder?a.qInterColumnSortOrder:[])),e.setReportState(a)},e.createTable=function(){var b=d.defer();return a(".rain").show(),e.loadActiveTable().then(function(){k.visualization.create("table",[],{title:""==e.report.title?e.data.activeTable.qMeta.title:e.report.title}).then(function(c){e.report.tableID=c.id,a(".rain").hide(),c.show("customreporttable"),b.resolve(!0)})}),b.promise},e.getInterColumnSortOrder=function(){var a=d.defer();return 0==e.report.interColumnSortOrder.length?k.getObject(e.report.tableID).then(function(c){c.getEffectiveProperties().then(function(c){var d=c.qHyperCubeDef.qDimensions.length,f=[];b.each(c.qHyperCubeDef.qInterColumnSortOrder,function(a){if(a>=d){var b={dataId:c.qHyperCubeDef.qMeasures[a-d].dataId,type:"measure"};b.qSortBy=c.qHyperCubeDef.qMeasures[a-d].qSortBy,c.qHyperCubeDef.qMeasures[a-d].qDef.qReverseSort&&(b.qReverseSort=!0),f.push(b)}else{var b={dataId:c.qHyperCubeDef.qDimensions[a].dataId,type:"dimension"};c.qHyperCubeDef.qDimensions[a].qDef.qReverseSort&&(b.qReverseSort=!0),f.push(b)}}),e.report.interColumnSortOrder=f,a.resolve(!0)})}):a.resolve(!0),a.promise},e.setReportState=function(a){e.createTable().then(function(){var c=[];a&&a.itemIds&&b.each(a.itemIds,function(a){var b=e.report.dimensions.map(function(a){return a.dataId}).indexOf(a);b>-1?(e.report.dimensions[b].selected=!0,c.push(e.report.dimensions[b])):(b=e.report.measures.map(function(a){return a.dataId}).indexOf(a),b>-1&&(e.report.measures[b].selected=!0,c.push(e.report.measures[b])))}),e.report.state=c,e.updateTable()})},e.updateTable=function(){if(""!=e.report.tableID){if(e.report.state.length>0){var c=e.report.supressZero?!0:!1,d=b.reduce(e.report.state,function(a,b){return"dimension"==b.type&&(b.columnOptions.dataId=b.dataId,a.push(b.columnOptions)),a},[]),f=b.reduce(e.report.state,function(a,b){return"measure"==b.type&&(b.columnOptions.dataId=b.dataId,a.push(b.columnOptions)),a},[]),g=[],h=0,i=0;b.each(e.report.state,function(a){"measure"==a.type?(g.push(d.length+h),h+=1):(g.push(i),i+=1)});for(var j=[],l=0;l<e.report.state.length;l++)j.push(-1);e.getInterColumnSortOrder().then(function(){var a=[];if(b.each(e.report.interColumnSortOrder,function(b){if("measure"==b.type){var c=f.map(function(a){return a.dataId}).indexOf(b.dataId);c>-1&&(a.push(c+i),f[c].qSortBy=b.qSortBy,b.qReverseSort&&(f[c].qDef.autoSort=!1,f[c].qDef.qReverseSort=b.qReverseSort))}else{var c=d.map(function(a){return a.dataId}).indexOf(b.dataId);c>-1&&(a.push(c),b.qReverseSort&&(d[c].qDef.autoSort=!1,d[c].qDef.qReverseSort=b.qReverseSort))}}),a.length!=g.length){var h=b.difference(g,a);b.each(h,function(b){a.push(b)})}k.getObject(e.report.tableID).then(function(b){b.getProperties().then(function(a){}),b.clearSoftPatches();var h=[{qOp:"replace",qPath:"qHyperCubeDef/qDimensions",qValue:JSON.stringify(d)},{qOp:"replace",qPath:"qHyperCubeDef/qMeasures",qValue:JSON.stringify(f)},{qOp:"replace",qPath:"qHyperCubeDef/columnOrder",qValue:JSON.stringify(g)},{qOp:"replace",qPath:"qHyperCubeDef/columnWidths",qValue:JSON.stringify(j)},{qOp:"replace",qPath:"qHyperCubeDef/qSuppressZero",qValue:JSON.stringify(c)},{qOp:"replace",qPath:"qHyperCubeDef/qInterColumnSortOrder",qValue:JSON.stringify(a)}];b.applyPatches(h,!0),e.serializeReport()})})}else k.getObject(e.report.tableID).then(function(a){a.clearSoftPatches(),e.report.interColumnSortOrder=[],e.serializeReport()});a(".rain").hide()}},e.selectItem=function(a){var b=e.report.state.map(function(a){return a.dataId}).indexOf(a.dataId);b>-1?(a.selected=!1,e.report.state.splice(b,1)):(a.selected=!0,e.report.state.push(a)),e.updateTable()},e.clearAll=function(){b.each(e.report.dimensions,function(a){a.selected=!1}),b.each(e.report.measures,function(a){a.selected=!1}),e.report.state=[],e.updateTable()},e.removeItem=function(a){if(e.report.state=b.without(e.report.state,a),"measure"==a.type){var c=e.report.measures.map(function(a){return a.dataId}).indexOf(a.dataId);e.report.measures[c].selected=!1}else{var c=e.report.dimensions.map(function(a){return a.dataId}).indexOf(a.dataId);e.report.dimensions[c].selected=!1}e.updateTable()},e.hideFieldAndSortbar=function(){e.fieldsAndSortbarVisible=!1,e.updateTable()},e.showFieldAndSortbar=function(){e.fieldsAndSortbarVisible=!0,e.updateTable()},e.exportData=function(b){if(e.report.state.length>0){var c={};switch(b){case"exportToExcel":c={download:!0};break;case"exportAsCSV":c={format:"CSV_C",download:!0};break;case"exportAsCSVTab":c={format:"CSV_T",download:!0};break;case"exportToClipboard":c={download:!0}}a(".rain").show(),e.rainText={text:"Exporting data"},k.visualization.get(e.report.tableID).then(function(b){b.table.exportData(c).then(function(){a(".rain").hide(),e.rainText=!1})})}},e.serializeReport=function(){var a=JSON.parse(localStorage.getItem(l));(null===a||void 0===a||void 0===a.states)&&(a={activeTableId:"",states:{}});var c=[];b.each(e.report.state,function(a){c.push(a.dataId)}),e.getInterColumnSortOrder().then(function(){var b={qId:e.data.activeTable.qInfo.qId,itemIds:c,qInterColumnSortOrder:e.report.interColumnSortOrder};a.activeTableId=b.qId,a.fieldsAndSortbarVisible=e.fieldsAndSortbarVisible,a.states[b.qId]=b,e.report.interColumnSortOrder=[],localStorage.setItem(l,JSON.stringify(a))})["catch"](function(){localStorage.setItem(l,JSON.stringify(a))})},e.deserializeReport=function(){var a={},c=JSON.parse(localStorage.getItem(l));void 0!=c&&void 0!=c.states&&(a=c.states[c.activeTableId],e.report.interColumnSortOrder=a.qInterColumnSortOrder?a.qInterColumnSortOrder:[],e.fieldsAndSortbarVisible=c.fieldsAndSortbarVisible,e.data.activeTable=b.find(e.data.masterObjectList,function(b){return b.qInfo.qId==a.qId}),e.setReportState(a))},e.$watchCollection("layout.props.tagSetting",function(a){e.data.tag=a,f()}),e.$watchCollection("layout.props.tagColor",function(a){e.data.tagColor=a}),e.$watchCollection("layout.props.collapseMinWidth",function(a){e.minWidthCollapsed=a}),e.$watchCollection("layout.props.collapseMinHeight",function(a){e.minHeightCollapsed=a}),e.$watchCollection("layout.props.displayText",function(a){e.data.displayText=a}),e.$watchCollection("layout.props.dimensionSortOrder",function(a){e.data.sortOrder=a,e.loadActiveTable()}),e.getListMaxHeight=function(a){var b=38,c=e.report.dimensions.length,d=e.report.measures.length,f=140,g=(e.size.clientHeight-f)/2,h=b*c>g?0:g-b*c,i=b*d>g?0:g-b*d;return c>0?"dimension"==a?{"max-height":g+i+"px"}:{"max-height":g+h+"px"}:{height:g+"px"}},e.getTableHeight=function(){var b=70;a("#reportSortable").height();var c=a("#reportSortable").height();return e.fieldsAndSortbarVisible?{height:e.size.clientHeight-b-c+"px","padding-top":"18px"}:{height:e.size.clientHeight+"px"}},e.getContainerWidth=function(a){var b=220,c={};return c="left"==a?b:e.fieldsAndSortbarVisible?e.size.clientWidth-b-20:e.size.clientWidth,{width:c+"px"}},g(),f().then(function(){var b=document.getElementById("reportSortable");j.create(b,e.reportConfig),e.deserializeReport(),a(".rain").hide()})}]}});