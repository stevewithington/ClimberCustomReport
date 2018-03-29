define(["jquery","underscore","qlik","qvangular","./lib/external/lodash/lodash","./lib/js/components/pp-cl-about/pp-cl-about","./lib/js/components/pp-cl-update-button/pp-cl-update-button"],function(a,b,c,d,e){"use strict";function f(a,b,c){var d=b||[],e=c||[];return Object.getOwnPropertyNames(a).reduce(function(b,c){return e.push(c),"object"==typeof a[c]?f(a[c],b,e):b.push(e.slice()),e.pop(),b},d)}var g=d.getService("$q"),h=c.currApp(this);"App"!==h.model.constructor.name&&(h=c.currApp());var i={component:"pp-cl-customreport",translation:"About",show:!0},j={propertiesVersion:"1.3.2",props:{tagSetting:"All tables",defaultTable:"",defaultItems:"",tagColor:!0,dimensionSortOrder:"SortByA",allowCollapse:!0,collapseMinWidth:200,collapseMinHeight:200,displayText:"Custom Report",hideExpandIcon:!1,hideExportIcon:!1}},k=[],l={},m={},n=f(j),o=f(l),p=f(m),q=function(a,b){var c=a.split("."),d=b.split(".");if(3===c.length&&3===d.length){var e=1e6*c[0]+1e3*c[1]+c[2],f=1e6*d[0]+1e3*d[1]+d[2];return Number(e)<Number(f)}return!1},r=function(a){return a.propertiesVersion&&q("1.3.2",a.propertiesVersion)?!0:!1},s=function(a){if(r(a))return!1;var b,c;for(b=0;b<n.length;b++){var d=n[b];if(!e.hasIn(a,d))return!0}if(a.qHyperCubeDef.qDimensions.length>0)for(b=0;b<a.qHyperCubeDef.qDimensions.length;b++){var f=a.qHyperCubeDef.qDimensions[b];for(c=0;c<o.length;c++){var g=o[c];if(!e.hasIn(f,g))return!0}}if(a.qHyperCubeDef.qMeasures.length>0)for(b=0;b<a.qHyperCubeDef.qMeasures.length;b++){var h=a.qHyperCubeDef.qMeasures[b];for(c=0;c<p.length;c++){var i=p[c];if(!e.hasIn(h,i))return!0}}for(b=0;b<k.length;b++){var j=k[b];if(e.get(a,j.path)===j.value)return!0}return!1},t={label:"This visualization was created with a more recent version of the extension. Please update the installed extension.",component:"text",show:r},u={label:"This visualization was created with an earlier version of the extension. Use the button below to update any new properties with default values.",component:"text",show:s},v={label:"Update properties",component:"pp-cl-customreport-update-button",action:function(b,c){var d=a.extend(!0,{},j,b);a.extend(!0,b,d);var f;if(b.qHyperCubeDef.qDimensions.length>0)for(f=0;f<b.qHyperCubeDef.qDimensions.length;f++){var g=a.extend(!0,{},l,b.qHyperCubeDef.qDimensions[f]);a.extend(!0,b.qHyperCubeDef.qDimensions[f],g)}if(b.qHyperCubeDef.qMeasures.length>0)for(f=0;f<b.qHyperCubeDef.qMeasures.length;f++){var h=a.extend(!0,{},m,b.qHyperCubeDef.qMeasures[f]);a.extend(!0,b.qHyperCubeDef.qMeasures[f],h)}for(f=0;f<k.length;f++){var i=k[f];if(e.get(b,i.path)===i.value){var n=i.newPath?i.newPath:i.path;e.set(b,n,i.newValue),i.deleteOldProperty&&e.unset(b,i.path)}}b.propertiesVersion=j.propertiesVersion,c()},show:s},w=function(){var a=g.defer();return h.getAppObjectList("masterobject",function(c){var d=[],e=[],f=[];return b.each(c.qAppObjectList.qItems,function(a){"table"===a.qData.visualization&&b.each(a.qMeta.tags,function(a){d.push(a)})}),e=b.uniq(d),f.push({value:"All tables",label:"All tables"}),b.each(e,function(a){f.push({value:a,label:a})}),a.resolve(f)}),a.promise},x={type:"string",component:"dropdown",label:"Select tag",ref:"props.tagSetting",defaultValue:j.props.tagSetting,options:function(){return w().then(function(a){return a})}},y={type:"string",label:"Default table name",ref:"props.defaultTable",defaultValue:j.props.defaultTable},z={type:"string",label:"Default items (comma seperated)",ref:"props.defaultItems",defaultValue:j.props.defaultItems,readOnly:function(a){return""===a.props.defaultTable}},A={type:"boolean",component:"switch",label:"Tag color",ref:"props.tagColor",options:[{value:!0,label:"Colors"},{value:!1,label:"No colors"}],defaultValue:j.props.tagColor},B={type:"string",component:"dropdown",label:"Dimensions and measures sort order",ref:"props.dimensionSortOrder",defaultValue:j.props.dimensionSortOrder,options:[{value:"SortByA",label:"Sort alphabetical"},{value:"SortByTableOrder",label:"Sort by table order"}]},C={type:"boolean",component:"switch",label:"Allow collapse",ref:"props.allowCollapse",options:[{value:!0,label:"Yes"},{value:!1,label:"No"}],defaultValue:j.props.allowCollapse},D={type:"number",label:"Trigger collapse min width",ref:"props.collapseMinWidth",defaultValue:j.props.collapseMinWidth,show:function(a){return a.props.allowCollapse}},E={type:"number",label:"Trigger collapse min height",ref:"props.collapseMinHeight",defaultValue:j.props.collapseMinHeight,show:function(a){return a.props.allowCollapse}},F={type:"string",label:"Display text",ref:"props.displayText",defaultValue:j.props.displayText},G={type:"boolean",label:"Hide expand icon",ref:"props.hideExpandIcon",defaultValue:j.props.hideExpandIcon},H={type:"boolean",label:"Hide export icon",ref:"props.hideExportIcon",defaultValue:j.props.hideExportIcon},I={uses:"settings",items:{settings:{type:"items",label:"Settings",items:{tagColor:A,sortOrder:B,allowCollapse:C,collapseMinWidth:D,collapseMinHeight:E,displayText:F,hideExpandIcon:G,hideExportIcon:H}}}},J={type:"items",label:"Setup",items:{tagPanel:{type:"items",label:"Tag",items:{tagList:x,defaultTable:y,defaultItems:z}}}},K={type:"items",translation:"Common.About",items:{about:i,updatePropertiesInfo:u,updateProperties:v,updateExtensionInfo:t}},L={type:"items",component:"expandable-items",translation:"properties.addons",items:{dataHandling:{uses:"dataHandling",items:{suppressZero:{show:!1}}}}};return{type:"items",component:"accordion",items:{tag:J,addons:L,appearance:I,about:K}}});