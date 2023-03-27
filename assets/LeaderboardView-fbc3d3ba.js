import{d as b,o as l,c as o,a as d,G as $,b as e,w as v,e as h,r as k,t as i,F as V,f as y,g as _,h as j,i as x,j as w,I as L}from"./index-240d0cf7.js";const S={class:"page-header | text-center py-5"},C={class:"p-0 list-none flex justify-center gap-5"},N=b({__name:"AppHeader",setup(r){return(u,c)=>{const s=k("router-link");return l(),o("header",S,[d($),e("ul",C,[e("li",null,[d(s,{to:"/"},{default:v(()=>[h("Play")]),_:1})]),e("li",null,[d(s,{to:"/leaderboard"},{default:v(()=>[h("Leaderboard")]),_:1})])])])}}}),B={class:"input-group"},F=["for"],I=["value","id"],M=["value","disabled"],g=b({__name:"FormSelect",props:{options:null,label:null,modelValue:null,name:{default:"text"}},emits:["update:modelValue"],setup(r,{emit:u}){return(c,s)=>(l(),o("div",B,[e("label",{for:r.name},i(r.label),9,F),e("select",{value:r.modelValue,id:r.name,onInput:s[0]||(s[0]=t=>u("update:modelValue",t.target.value)),class:"form-control | w-full px-2 py-1 bg-orange-100 bg-opacity-40 rounded-md border-2 border-solid border-orange-300 focus:outline-none focus:bg-opacity-60 transition duration-200"},[(l(!0),o(V,null,y(r.options,t=>(l(),o("option",{value:t.value,key:t.value,disabled:t.disabled===!0},i(t.text),9,M))),128))],40,I)]))}}),U={class:"about | w-full"},A={class:"leaderboard-area | min-h-[500px] max-w-[350px] mx-auto border-2 border-dark-500 border-solid"},D={class:"leaderboard-options p-2 grid grid-cols-2 gap-3"},E={class:"form-group flex items-center"},G=e("label",{for:"mode",class:"mr-2"},"Mode:",-1),H={class:"form-group flex items-center"},K=e("label",{for:"map",class:"mr-2"},"Map:",-1),P=e("div",{class:"border-b border-solid border-black-100"},null,-1),T={key:0,class:"table"},q=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",{class:"text-left px-3"},"Username"),e("th",{class:"text-left"},"Score")])],-1),z={class:"text-center"},J={class:"px-3"},O={key:1,class:"flex justify-center mt-3"},R=b({__name:"LeaderboardView",setup(r){const u=_("lari"),c=_("all"),s=_([]),t=_(!1),p=()=>{t.value=!0,w(c.value,u.value).then(m=>{var n;s.value=((n=m.data)==null?void 0:n.map(a=>({map:a.map,mode:a.mode,score:a.score,username:a.metadata.username,created_at:a.created_at})))||[],t.value=!1}).catch(m=>{t.value=!1,alert("Error: "+m)})};return j(()=>{p()}),(m,n)=>(l(),o("div",U,[d(N),e("div",A,[e("div",D,[e("div",E,[G,d(g,{options:[{text:"Kejar-kejaran",value:"kejar"},{text:"Lari",value:"lari"}],name:"mode",modelValue:u.value,"onUpdate:modelValue":[n[0]||(n[0]=a=>u.value=a),p],label:""},null,8,["modelValue"])]),e("div",H,[K,d(g,{options:[{text:"All",value:"all"},{text:"Dust",value:"dust"}],name:"map",modelValue:c.value,"onUpdate:modelValue":[n[1]||(n[1]=a=>c.value=a),p],label:""},null,8,["modelValue"])])]),P,t.value?x("",!0):(l(),o("table",T,[q,e("tbody",null,[(l(!0),o(V,null,y(s.value,(a,f)=>(l(),o("tr",{key:f},[e("td",z,i(f+1),1),e("td",J,i(a.username),1),e("td",null,i(a.score),1)]))),128))])])),t.value?(l(),o("div",O,[d(L)])):x("",!0)])]))}});export{R as default};