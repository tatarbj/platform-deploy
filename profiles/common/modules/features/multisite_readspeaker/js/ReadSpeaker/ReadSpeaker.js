window.ReadSpeakerDefer={deferred:null,clickhandler:function(b){var b=b||window.event,c=b.target||b.srcElement;3===c.nodeType&&(c=c.parentNode);if(c!==document&&window.ReadSpeakerDefer.isRSLink(c)){window.ReadSpeakerDefer.deferred=c;if((c=window.ReadSpeakerDefer.findRSParent(c))&&c.className&&!/rsdeferred/i.test(c.className))c.className+=" rsdeferred";b.preventDefault&&b.preventDefault();b.stopPropagation&&b.stopPropagation();return!1}},init:function(){this.RSDeferClick(document)},isRSLink:function(b){return this.isRSParent(b.parentNode)||
b.href&&-1<b.href.indexOf("readspeaker.com/cgi-bin/rsent")},isRSParent:function(b){return b?b.className&&-1<b.className.indexOf("rsbtn")||b.id&&"string"===typeof b.id&&-1<b.id.indexOf("readspeaker_button"):!1},findRSParent:function(b){for(;b!=document&&!(b=b.parentNode,"a"==b.tagName.toLowerCase()&&this.isRSLink(b)););return b==document?void 0:b.parentNode},RSDeferClick:function(b){b.addEventListener?b.addEventListener("click",this.clickhandler,!1):b.attachEvent?b.attachEvent("onclick",this.clickhandler):
b.onclick=this.clickhandler}};window.ReadSpeakerDefer.init();
(function(b){var c,g={major:"2",minor:"5",update:"1",revision:"1316",prod:"embhl"},h=[],A=0,B=0,q=[],C=0,i=[],D=!1,l=[],u=!1,E=0,v=!1,w=null,j="default",F=!1,r=[],G=!1,J={},x=function(a){if("string"==typeof a){for(var a="ReadSpeaker."+a.replace("_","."),a=a.split("."),f=b,e=0,c=a.length;e<c;e++)if(f)if(f[a[e]]){if(e==c-1)return f[a[e]];f=f[a[e]]}else break;else break;return!1}},H=function(){for(var a=document.getElementsByTagName("div"),f=/\brsbtn\b/g,e=0,c=a.length;e<c;e++)f.test(a[e].className)&&
(a[e].className=a[e].className.replace(f,b.rsConf.ui.rsbtnClass))},s={extract:function(a){if("string"==typeof a){for(var b={},a=a.split(/[;&]/),e,c=0;c<a.length;c++)(e=a[c].split("="))&&2==e.length&&(b[unescape(e[0])]=unescape(e[1]).replace(/\+/g," "));return b}return{}}},y={isok:!0,executeCode:function(){this.isok=!0;if(!i.length)return!0;for(idx in i)if(i.hasOwnProperty(idx)&&"function"==typeof i[idx])try{i[idx].apply(b,[])}catch(a){this.isok=!1}},loadExternal:function(){this.isok=!0;if(!l.length)return!0;
for(idx in l)if(l.hasOwnProperty(idx))try{n.load(l[idx])}catch(b){this.isok=!1}},flush:function(){i=[];l=[]}},n={load:function(a){if("text/javascript"==a.type||"text/css"==a.type){a.src=w.path+a.src;var f=document.getElementsByTagName("head")[0],e=document.createElement("text/javascript"==a.type?"script":"link"),c=[g.major,g.minor,g.update,g.revision].join(".");"function"==typeof a.cb&&(void 0!==e.onreadystatechange?e.onreadystatechange=function(){("complete"==this.readyState||"loaded"==this.readyState)&&
a.cb.apply(b)}:e.onload=a.cb);e.id=a.id.replace(".","_");e.type=a.type;"text/javascript"==a.type?(e.src=a.src+"?v="+c,a.async&&(e.async=!0)):(e.rel="stylesheet",e.href=a.src+"?v="+c);f.appendChild(e)}}},I=function(b,c){return{id:c[1]||"readspeaker"+E++,type:c[2]||"text/javascript",src:b,cb:c[3]||null}},K=function(b){v?n.load(I(b,arguments)):l.push(I(b,arguments))},z=0,t=function(a,c){var e=rspkr.dbgl;if(e&&"string"===typeof e&&-1<e.indexOf(","+c+","))try{console.log(z++ +". "+a)}catch(g){document.getElementById("readspeaker_debug")?
document.getElementById("readspeaker_debug").innerHTML+="<p>"+z++ +". "+a+"</p>":b.status+=z++ +". "+a+" "}};Object.size=function(b){var c=0,e;for(e in b)b.hasOwnProperty(e)&&c++;return c};var m=document.getElementsByTagName("script"),p=m[m.length-1].getAttribute("src"),m=p.split("?");if(/\?/i.test(p)&&1<m.length&&m[1].length)for(c in p="",w=s=s.extract(m[1]),j=s.skin||"default",r=s.pids.split(","),w.path=m[0].replace("ReadSpeaker.js",""),h.Core=["Common","lib.Facade","modmap"],h["pub.Config"]=!1,
n.load({id:"rsmod_Styles",type:"text/css",src:"ReadSpeaker.Styles.css",cb:null}),"default"!==j&&(n.load({id:"rsskin_"+j+"_style",type:"text/css",src:"skins/"+j+"/"+j+".css",cb:null}),n.load({id:"rsskin_"+j+"_js",type:"text/javascript",src:"skins/"+j+"/"+j+".js",cb:function(){"default"!==j&&u?H():F=!0},async:!0})),h)h.hasOwnProperty(c)&&(p=c,n.load({id:"req_"+p,type:"text/javascript",src:"ReadSpeaker."+p+".js",cb:function(){var a=(b.event?b.event.srcElement.id:this.id).replace("req_",""),a=a.replace("_",
"."),a=!1===h[a]?[a]:h[a],c;A++;for(var e=0,g=a.length;e<g;e++)q.push(a[e]),c=x(a[e]),"function"==typeof c.init&&c.init.apply(c,[]);A==Object.size(h)&&(b.ReadSpeaker.Common.addEvent("onModsLoaded",b.ReadSpeaker.pub.Config.setup),G=!0,a={id:"",type:"text/javascript",src:"",cb:function(){var a=(b.event?b.event.srcElement.id:this.id).replace("rsmod_","");q.push(a);a=x(a);"function"==typeof a.init&&a.init.apply(a,[]);if(G&&b.ReadSpeaker.modmap&&!D){for(var c=b.ReadSpeaker.modmap,a="|",e=[],f="",g="",
j=[],h=0,i=r.length;h<i;h++)if(e=c.products&&"function"==typeof c.products[r[h]]?c.products[r[h]]():null)for(var k=0,m=e.length;k<m;k++)f=e[k],g=f[0]+","+f[1]+"|",2<f.length&&(j[f[0]]=f[2]),-1==a.indexOf("|"+g)&&(a+=g);a=a.split("|");k=c=0;for(i=a.length;k<i;k++)f=a[k].split(","),"undefined"!=typeof f[0]&&/text\/javascript/.test(f[1])&&c++;B=c;for(var l,k=0,i=a.length;k<i;k++)f=a[k].split(","),f[0].length&&(/text\/javascript/.test(f[1])&&(l=function(){var a=b.event?b.event.srcElement.id:this.id,c=
j[a.replace("rsmod_","")],a=a.replace("rsmod_","");q.push(a);C++;c||(c=[a]);for(var a=0,e=c.length;a<e;a++)try{var d=x(c[a]);"function"==typeof d.init&&d.init.apply(d,[])}catch(f){t("[rspkr] Could not load: "+c[a]+" | "+f,3)}C==B&&(d=b.ReadSpeaker,d.Common&&(d.c=d.Common),d.c&&(d.evt=d.c.addEvent,d.devt=d.c.dispatchEvent),d.c&&d.c.Settings&&(d.c.s=d.c.Settings),d.c.s&&(d.st=d.c.s),d.lib&&(d.l=d.lib),d.l&&d.lib.Facade&&(d.l.f=d.lib.Facade),d.l&&(d.l.f&&d.l.f.adapter)&&(d.l.f.a=d.l.f.adapter),d.modmap&&
(d.m=d.modmap),d.pub&&d.pub.Config&&(d.pub.c=d.pub.Config),d.pub.c&&(d.cfg=d.pub.c),d.PlayerAPI&&(d.pl=d.PlayerAPI),d.HL&&(d.hl=d.HL),d.ui&&(d.u=d.ui),d=function(){b.ReadSpeaker.Common.dispatchEvent("onModsLoaded",b);b.ReadSpeaker.Common.dispatchEvent("onAfterModsLoaded",b);b.ReadSpeaker.Common.dispatchEvent("onReady",b)},v?d():b.ReadSpeaker.Common.addEvent("onDOMReady",d),y.executeCode(),y.loadExternal(),y.flush())}),n.load({id:"rsmod_"+f[0],type:f[1],src:"ReadSpeaker."+f[0]+("text/css"==f[1]?".css":
".js"),cb:l,async:!0}))}}},c=b.ReadSpeaker.lib.Facade.currentLib().toLowerCase(),"rslib"==c?(a.id="rsmod_lib.RSLib",a.src="ReadSpeaker.lib.RSLib.js"):(a.id="rsmod_lib.Facade.adapter."+c,a.src="ReadSpeaker.lib.Facade.adapter."+c+".js"),n.load(a))},async:!0}));else D=!0;c=new function(){this.meta={obj:g,version:[g.major,g.minor,g.update].join(".")+"_rev"+g.revision+"-"+g.prod};this.q=function(a){"function"==typeof a&&i.push(a)};this.init=function(){if(!u){document.addEventListener&&document.removeEventListener("DOMContentLoaded",
b.ReadSpeaker.init);var a=b.ReadSpeaker,c;if(/rsdebug=rsdebug/i.test(document.location.href))try{c=","+document.location.href.split("?").pop().match(/rsdebug=rsdebug([^$|&]*)/i).pop()+","}catch(e){c=",3,"}else c="";a.dbgl=c;t("[rspkr] DOM Ready!");v=!0;b.ReadSpeaker.Common&&b.ReadSpeaker.Common.dispatchEvent("onDOMReady");F&&(t("[rspkr] Updating base class."),H());u=!0}};this.dynload=K;this.getLoadedMods=function(){return q};this.rsidCount=1E3;this.logcount=0;this.log=function(a,b){t(a,b||1)};this.getID=
function(){return"readspeaker"+E++};this.getVersion=function(){return this.meta.version};this.s=J;this.skin=j};b.ReadSpeaker=b.rs=b.rspkr=c})(window);ReadSpeaker.enums={mime:{tjs:"text/javascript",tcss:"text/css",thtml:"text/html"}};
(function(b){var c=navigator.userAgent,g=eval("/*@cc_on! @*/false"),h=setTimeout;/mozilla/i.test(c)&&!/(compati)/.test(c)||/opera/i.test(c)||/webkit/i.test(c)?document.addEventListener("DOMContentLoaded",b,!1):g?function(){var c=document.createElement("doc:rdy");try{c.doScroll("left"),b()}catch(g){h(arguments.callee,0)}}():window.onload=b})(ReadSpeaker.init);
