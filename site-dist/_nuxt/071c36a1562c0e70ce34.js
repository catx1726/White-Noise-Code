(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{238:function(t,e,n){var content=n(253);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(26).default)("9b5c2250",content,!0,{sourceMap:!1})},240:function(t,e,n){var content=n(267);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(26).default)("34f8ab8a",content,!0,{sourceMap:!1})},252:function(t,e,n){"use strict";var o=n(238);n.n(o).a},253:function(t,e,n){(e=n(25)(!1)).push([t.i,".source-container[data-v-1345f7ae]{width:50vw;transition:all .3s ease}.source-container .tab-container[data-v-1345f7ae]{display:flex;font-size:50px;max-height:100px;padding-bottom:10px;margin-bottom:20px;border-bottom:1px solid #fff;align-items:flex-start;justify-content:flex-start}.source-container .source-item-container[data-v-1345f7ae]{display:flex;flex-wrap:wrap}.source-container .your-list-container[data-v-1345f7ae]{display:flex;border-top:1px solid #fff;padding-top:10px;margin-top:10px;flex-wrap:wrap;justify-content:center;align-items:center}",""]),t.exports=e},266:function(t,e,n){"use strict";var o=n(240);n.n(o).a},267:function(t,e,n){(e=n(25)(!1)).push([t.i,'.index-container[data-v-5e73ad93]{height:100vh;background-size:cover;background-position:50%;background-attachment:fixed}.index-container .test-nonblur[data-v-5e73ad93]{z-index:1;overflow:hidden;color:#fff;position:relative}.index-container .test-nonblur[data-v-5e73ad93]:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1;background-color:rgba(0,0,0,.8)}',""]),t.exports=e},273:function(t,e,n){"use strict";n.r(e);n(37),n(49);var o={name:"SourceList",components:{},props:{bgImgSrc:{default:"",type:String}},data:function(){return{songList:[],DOC:{},WINDOW:{},audios:[],onboarding:0,listLock:!0,sourceList:[{tag:"bird",img:"window-831251_1920.jpg",source:["jmiddlesworth__bird-call-in-spring","inspectorj__bird-whistling-a","straget__cranes-3"]},{tag:"lake",img:"water.jpg",source:["sanus-excipio__lake-harsha-pier-steve-bayer","pflanigan__lake-biwa","psnflute1984__shore-of-a-lake-with-bird-chirping"]},{tag:"rain",img:"fire-warm.jpg",source:["light-rain-on-umbrella","wyronroberth__rain-random","bastipictures__distant-rain","blimp66__rain-storm"]},{tag:"classic",img:"window.jpg",source:["Aage Kvalbein - Romanza (Trad)","Arcade Fire - Song On The Beach","MayPiano - 钢琴《在法国的十三天》13 jours en France ／ Piano Solo（翻自 Francis Lai）","高志坚,小平 - 殉"]},{tag:"jazzhiphop",img:"taxi-rain.jpg",source:["a l e x - Stop Messin Me Up When Im Tryna Summon Bahamut","elijah who - hideaway","Joe Bae - studybreak"]}]}},computed:{},watch:{},beforeMount:function(){},mounted:function(){this.DOC=document},created:function(){},methods:{appendYourList:function(){var t=this.sourceList.length-1;this.sourceList[t].source.push(this.audios),console.log("check yourList:",this.sourceList[t].source)},createAudioEle:function(t,e){var n=this.DOC.querySelector(".your-list-container"),o=this.DOC.createElement("span");o.innerHTML=e+" ",o.style="font-size:20px;margin-top:10px";var audio=this.DOC.createElement("audio");audio.setAttribute("src",t),audio.setAttribute("loop",!0),audio.setAttribute("autoplay",!0),audio.setAttribute("controls",!0),audio.style="width:100%;";var r=this.DOC.createDocumentFragment();r.appendChild(o),r.appendChild(audio),n.appendChild(r),this.audios.push(e)},deleteAudioEle:function(t,e){var n=this.DOC.querySelector(".your-list-container"),o=this.DOC.querySelector("audio[src='".concat(t,"']")),r=this.audios.indexOf(e);n.removeChild(o.previousSibling),n.removeChild(o),this.audios.splice(r,1)},playMusic:function(t,e){var n="./music/"+t+"/"+e+".wav";this.audios.includes(e)?this.deleteAudioEle(n,e):(this.createAudioEle(n,e),console.log(t,e))},toggle:function(t){this.onboarding=t,this.listLock=t!==this.sourceList.length-1,this.$store.dispatch("container/changeBgImg",this.sourceList[this.onboarding].img)}}},r=(n(252),n(36)),c=n(52),l=n.n(c),d=n(233),h=n(270),f=n(276),m=n(271),v=n(245),x=n(272),w=n(277),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"source-container"},[n("div",{staticClass:"tab-container"},[n("v-item-group",{model:{value:t.onboarding,callback:function(e){t.onboarding=e},expression:"onboarding"}},t._l(t.sourceList,(function(i,e){return n("v-item",{key:"btn-"+i.tag,scopedSlots:t._u([{key:"default",fn:function(o){var r=o.active;return[n("v-btn",{staticStyle:{"font-size":"32px"},attrs:{text:"",color:"white",large:"","input-value":r},on:{click:function(n){return t.toggle(e)}}},[t._v("\n          "+t._s(i.tag)+"\n        ")])]}}],null,!0)})})),1)],1),t._v(" "),n("v-window",{staticClass:"source-item-container",model:{value:t.onboarding,callback:function(e){t.onboarding=e},expression:"onboarding"}},t._l(t.sourceList,(function(e){return n("v-window-item",{key:"card-"+e.tag},t._l(e.source,(function(o,r){return n("v-chip-group",{key:r,attrs:{multiple:""}},[n("v-chip",{attrs:{label:"",filter:"",outlined:"",light:"","text-color":"white"},on:{click:function(n){return t.playMusic(e.tag,o)}}},[t._v("\n          "+t._s(o)+"\n        ")])],1)})),1)})),1),t._v(" "),n("div",{staticClass:"your-list-container"})],1)}),[],!1,null,"1345f7ae",null),_=component.exports;l()(component,{VBtn:d.a,VChip:h.a,VChipGroup:f.a,VItem:m.a,VItemGroup:v.b,VWindow:x.a,VWindowItem:w.a});var y={components:{SourceList:_},data:function(){return{}}},k=(n(266),Object(r.a)(y,(function(){var t=this.$createElement,e=this._self._c||t;return e("main",{staticClass:"index-container"},[e("div",{staticClass:"test-nonblur"},[e("SourceList")],1)])}),[],!1,null,"5e73ad93",null));e.default=k.exports}}]);