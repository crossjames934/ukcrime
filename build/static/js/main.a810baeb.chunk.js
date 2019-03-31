(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a.p+"static/media/footprints.a6978a28.svg"},19:function(e,t,a){},21:function(e,t,a){e.exports=a.p+"static/media/drugs.0409f2eb.svg"},22:function(e,t,a){e.exports=a.p+"static/media/firearm.4b5ca8ac.svg"},23:function(e,t,a){e.exports=a.p+"static/media/stolenGoods.9d6efa39.svg"},24:function(e,t,a){e.exports=a.p+"static/media/bobbyPin.867f712d.svg"},25:function(e,t,a){e.exports=a.p+"static/media/mapIcon.76a823a7.svg"},26:function(e,t,a){e.exports=a.p+"static/media/chartIcon.534f6b50.svg"},28:function(e,t,a){e.exports=a(54)},34:function(e,t,a){},54:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(20),s=a.n(i),r=(a(34),a(3)),c=a(4),l=a(7),u=a(5),d=a(6),p=a(1),h=a(9),m=a.n(h),f=(a(19),a(10)),g=a.n(f),v=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"forMap",value:function(e,t){return o.a.createElement("div",{className:"softShadow",style:t},o.a.createElement("p",null,e?e.age_range?"Age: "+e.age_range:"No age information":""),o.a.createElement("p",null,e?e.gender||"No gender information":""),o.a.createElement("p",null,e?e.object_of_search||"No defined object of search":""),o.a.createElement("p",null,e?e.self_defined_ethnicity||"No self-defined ethnicity":""),o.a.createElement("p",null,e?e.outcome||"No specified outcome":""),o.a.createElement("p",null,e?e.location.street.name||"No location":""))}},{key:"forGraph",value:function(e,t){var a=this.props.sortedBy.replace(/_/g," ");return(a=a.split(""))[0]=a[0].toUpperCase(),a=a.join(""),o.a.createElement("div",{className:"softShadow",style:t},o.a.createElement("p",null,a+": "+e),o.a.createElement("p",null,"Incidents: ",this.props.incidents))}},{key:"render",value:function(){var e={position:"fixed",width:300,padding:20,borderRadius:10,background:"#BCDBF1",zIndex:100,top:this.props.mouseY,left:this.props.mouseX,opacity:.9,pointerEvents:"none",display:this.props.crime?"block":"none"},t=this.props.crime;return o.a.createElement("div",null,this.props.forMap?this.forMap(t,e):this.forGraph(t,e))}}]),t}(n.Component),b=a(21),w=a.n(b),y=a(22),k=a.n(y),E=a(23),j=a.n(E),C=a(24),O=a.n(C),N=a(12),S=a.n(N),D=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).createMap=function(){var e=a.props,t=e.latitude,n=e.longitude,o=e.zoom;a.mapContainer.innerHTML="",a.map=new g.a.Map({container:a.mapContainer,style:"mapbox://styles/mapbox/streets-v9",center:[n,t],zoom:o}),a.map.on("move",function(){setTimeout(function(){if(!window.mouseIsDown){var e=a.map.getCenter(),t=e.lng,n=e.lat;a.props.updateCoordinates(n,t,a.map.getZoom()),a.props.getPostcode(n,t),a.placeMarkers()}},100)}),a.map.on("zoom",function(){a.placeMarkers()}),a.placeMarkers()},a.placeMarkers=function(){a.markers.forEach(function(e){e.remove()}),a.markers=[];for(var e=document.getElementsByClassName("markerContainer");e[0];)e[0].parentNode.removeChild(e[0]);a.props.data.forEach(function(e){var t=document.createElement("div"),n=document.createElement("img");switch(e.object_of_search){case"Controlled drugs":case"Psychoactive substances":n.src=w.a;break;case"Offensive weapons":case"Firearms":case"Anything to threaten or harm anyone":n.src=k.a;break;case"Stolen goods":n.src=j.a;break;case"Article for use in theft":n.src=O.a;break;case"Evidence of offences under the Act":default:n.src=S.a}n.className="marker",t.appendChild(n),t.className="markerContainer",t.onmouseover=function(){var t=window.event;a.setState({highlightedCrime:e,mouseX:t.clientX,mouseY:t.clientY})},t.onmouseout=function(){a.setState({highlightedCrime:null})};var o=new g.a.Marker(t).setLngLat({lng:e.location.longitude,lat:e.location.latitude}).addTo(a.map);a.markers.push(o)})},a.previousLat=a.props.latitude,a.previousLon=a.props.longitude,a.markers=[],a.previousDataLength=a.props.data.length,a.previousMapView=a.props.mapView,a.state={highlightedCrime:null,mouseX:0,mouseY:0,markers:[]},g.a.accessToken="pk.eyJ1IjoiY3Jvc3NqYW1lczkzNCIsImEiOiJjanRsYTBoaGkwYmVnM3lwZnRqcm1raGkwIn0.n6wWS702HkBqpsQ79d-QgA",a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.createMap()}},{key:"componentDidUpdate",value:function(){this.props.latitude===this.previousLat&&this.props.longitude===this.previousLon||(this.previousLat=this.props.latitude,this.previousLon=this.props.longitude,this.map.setCenter({lng:this.props.longitude,lat:this.props.latitude})),this.previousDataLength!==this.props.data.length&&(this.placeMarkers(),this.previousDataLength=this.props.data.length),this.previousMapView!==this.props.mapView&&(this.createMap(),this.previousMapView=this.props.mapView)}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:{display:this.props.mapView?"block":"none"}},o.a.createElement(v,{forMap:!0,mouseX:this.state.mouseX,mouseY:this.state.mouseY,crime:this.state.highlightedCrime}),o.a.createElement("div",{ref:function(t){return e.mapContainer=t},className:"dataDisplay"}))}}]),t}(n.Component),B=a(27),I=a(8),M={width:"90vw",height:"80vh"},x=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={sortedBy:"object_of_search",highlightedBar:null,mouseX:0,mouseY:0},a.handleSelect=a.handleSelect.bind(Object(p.a)(Object(p.a)(a))),a.mouseout=a.mouseout.bind(Object(p.a)(Object(p.a)(a))),a.mouseover=a.mouseover.bind(Object(p.a)(Object(p.a)(a))),a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"mouseover",value:function(e,t){var a=this,n=window.event;setTimeout(function(){a.setState({highlightedBar:t,incidents:e,mouseX:n.clientX,mouseY:n.clientY})},150)}},{key:"mouseout",value:function(){var e=this;setTimeout(function(){e.setState({highlightedBar:null})},150)}},{key:"createGraph",value:function(e){var t=this;document.getElementById("chartContainer").innerHTML="";var a=Object.values(e),n=Object.keys(e);n.splice(n.indexOf("null"),1,"No Information");var o=.9*window.innerWidth,i=.8*window.innerHeight,s=.1*o,r=.1*i,c=o-2*s,l=i-2*r,u=c/a.length,d=I.d().range([0,c]).domain(n),p=I.e().domain([I.c(a),0]).range([0,l]).nice(),h=I.f("#chartContainer").append("svg").attr("width",M.width).attr("height",M.height).style("background","#ACCBE1");h.selectAll("rect").data(a).enter().append("rect").attr("class","barForChart").attr("x",function(e,t){return t*u+u/2+s-12.5}).attr("y",function(e){return p(e)+r}).attr("width",25).attr("height",function(e){return l-p(e)}).attr("fill","#4f7ca8").on("mouseover",function(e,a){t.mouseover(e,n[a])}).on("mouseout",function(e,a){t.mouseout()});var m=I.a(d),f=I.b(p);h.append("g").attr("transform","translate(".concat(s,", ").concat(l+r,")")).call(m),h.append("g").attr("transform","translate(".concat(s,", ").concat(r,")")).call(f)}},{key:"componentDidUpdate",value:function(){this.sortByCategory(this.state.sortedBy)}},{key:"sortByCategory",value:function(){var e=this.state.sortedBy,t=this.props.data,a=t.map(function(t){return t[e]}),n=Object(B.a)(new Set(a)),o={};n.forEach(function(a){o[a]=t.filter(function(t){return t[e]===a}).length}),this.createGraph(o)}},{key:"handleSelect",value:function(e){this.setState({sortedBy:e.target.value},this.sortByCategory)}},{key:"render",value:function(){var e={position:"absolute",width:250,top:.025*window.innerHeight,left:.5*window.innerWidth-80,fontSize:14};return o.a.createElement("div",{style:{display:this.props.mapView?"none":"block"}},o.a.createElement(v,{forMap:!1,crime:this.state.highlightedBar,incidents:this.state.incidents,mouseX:this.state.mouseX,mouseY:this.state.mouseY,sortedBy:this.state.sortedBy}),o.a.createElement("div",{style:e},o.a.createElement("label",{htmlFor:"sortBySelector"},"Sort By: "),o.a.createElement("select",{style:{height:30,margin:3},id:"sortBySelector",onChange:this.handleSelect},o.a.createElement("option",{value:"object_of_search"},"Object of Search"),o.a.createElement("option",{value:"age_range"},"Age Range"),o.a.createElement("option",{value:"outcome"},"Outcome"))),o.a.createElement("div",{style:M,className:"dataDisplay"},o.a.createElement("div",{style:M,id:"chartContainer"})))}}]),t}(n.Component),V=a(25),A=a.n(V),L=a(26),z=a.n(L),Y=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t={margin:"0 20px"},a={margin:"10px 0"};return o.a.createElement("div",{className:"controls softShadow"},o.a.createElement("form",{className:"controlForm",onSubmit:function(e){return e.preventDefault()}},o.a.createElement("div",{style:a},o.a.createElement("label",{htmlFor:"postcodeInput"},"Post Code: \xa0"),o.a.createElement("input",{onChange:function(t){return e.props.updatePostcode(t)},value:this.props.postcode,className:"formInput",type:"text",name:"postcode",id:"postcodeInput"})),o.a.createElement("div",{style:t}),o.a.createElement("div",{style:a},o.a.createElement("label",{htmlFor:"dateInput"},"Date: \xa0"),o.a.createElement("input",{onChange:function(t){return e.props.changeDate(t.target.value)},value:this.props.date,type:"month",max:"2019-01",className:"formInput",name:"date",id:"dateInput"})),o.a.createElement("div",{style:t}),o.a.createElement("p",null,this.props.loading?"Loading...":"Records: "+this.props.recordCount),o.a.createElement("div",{style:t}),o.a.createElement("img",{className:"icon",onClick:function(){return e.props.switchView(!0)},src:A.a,alt:"Map Icon"}),o.a.createElement("div",{style:t}),o.a.createElement("img",{className:"icon",onClick:function(){return e.props.switchView(!1)},src:z.a,alt:"Chart Icon"})))}}]),t}(n.Component),P=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={data:[],latitude:"51.5073",longitude:"-0.1277",date:"2018-12",streetNames:[],zoom:"15",loading:!1,postcode:"WC2N 5DU",mapView:!0},a.updateCoordinates=a.updateCoordinates.bind(Object(p.a)(Object(p.a)(a))),a.updatePostcode=a.updatePostcode.bind(Object(p.a)(Object(p.a)(a))),a.changeDate=a.changeDate.bind(Object(p.a)(Object(p.a)(a))),a.getPostcode=a.getPostcode.bind(Object(p.a)(Object(p.a)(a))),a.switchView=a.switchView.bind(Object(p.a)(Object(p.a)(a))),window.mouseIsDown=!1,document.addEventListener("mousedown",function(){window.mouseIsDown=!0}),document.addEventListener("mouseup",function(){window.mouseIsDown=!1}),a}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getData()}},{key:"getData",value:function(){var e=this,t="https://data.police.uk/api/stops-street?lat=".concat(this.state.latitude,"&lng=").concat(this.state.longitude,"&date=").concat(this.state.date);this.setState({loading:!0}),m.a.get(t).then(function(t){var a=t.data.map(function(e){return e.location.street.name}),n=a.filter(function(e,t){return a.indexOf(e)===t});e.setState({data:t.data,streetNames:n,loading:!1})}).catch(function(e){console.log(e)})}},{key:"updateCoordinates",value:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Number(this.state.zoom);this.setState({latitude:e.toFixed(4),longitude:t.toFixed(4),zoom:a.toFixed(2)},this.getData)}},{key:"getLatitudeAndLongitude",value:function(){var e=this;/([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/.test(this.state.postcode)&&m.a.get("http://api.postcodes.io/postcodes/"+this.state.postcode.split(" ").join("")).then(function(t){e.updateCoordinates(t.data.result.latitude,t.data.result.longitude)}).catch(function(e){})}},{key:"getPostcode",value:function(e,t){var a=this,n="http://api.postcodes.io/postcodes?lon=".concat(t,"&lat=").concat(e);m.a.get(n).then(function(e){a.setState({postcode:e.data.result[0].postcode})}).catch(function(e){})}},{key:"updatePostcode",value:function(e){this.setState({postcode:e.target.value},this.getLatitudeAndLongitude)}},{key:"changeDate",value:function(e){this.setState({date:e},this.getData)}},{key:"switchView",value:function(e){this.setState({mapView:e})}},{key:"render",value:function(){return o.a.createElement("div",{className:"myApp"},o.a.createElement("header",null,o.a.createElement(D,{latitude:this.state.latitude,longitude:this.state.longitude,zoom:this.state.zoom,updateCoordinates:this.updateCoordinates,getPostcode:this.getPostcode,data:this.state.data,date:this.state.date,mapView:this.state.mapView}),o.a.createElement(x,{mapView:this.state.mapView,data:this.state.data}),o.a.createElement(Y,{postcode:this.state.postcode,updatePostcode:this.updatePostcode,latitude:this.state.latitude,longitude:this.state.longitude,loading:this.state.loading,recordCount:this.state.data.length,changeDate:this.changeDate,date:this.state.date,updateCoordinates:this.updateCoordinates,switchView:this.switchView})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[28,1,2]]]);
//# sourceMappingURL=main.a810baeb.chunk.js.map