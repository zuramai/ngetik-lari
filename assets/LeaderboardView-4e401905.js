import{_ as V}from"./AppHeader.vue_vue_type_script_setup_true_lang-a7092af3.js";import{d as x,c as l,a as e,t as u,F as h,r as g,o,b as m,e as $,f as _,g as v,h as k,I as y}from"./index-8470c64d.js";const S={class:"input-group"},j=["for"],w=["value","id"],L=["value","disabled"],f=x({__name:"FormSelect",props:{options:null,label:null,modelValue:null,name:{default:"text"}},emits:["update:modelValue"],setup(r,{emit:d}){return(c,n)=>(o(),l("div",S,[e("label",{for:r.name},u(r.label),9,j),e("select",{value:r.modelValue,id:r.name,onInput:n[0]||(n[0]=a=>d("update:modelValue",a.target.value)),class:"form-control | w-full px-2 py-1 bg-orange-100 bg-opacity-40 rounded-md border-2 border-solid border-orange-300 focus:outline-none focus:bg-opacity-60 transition duration-200"},[(o(!0),l(h,null,g(r.options,a=>(o(),l("option",{value:a.value,key:a.value,disabled:a.disabled===!0},u(a.text),9,L))),128))],40,w)]))}}),B={class:"about | w-full"},F={class:"leaderboard-area | min-h-[500px] max-w-[350px] mx-auto border-2 border-dark-500 border-solid"},I={class:"leaderboard-options p-2 grid grid-cols-2 gap-3"},M={class:"form-group flex items-center"},N=e("label",{for:"mode",class:"mr-2"},"Mode:",-1),U={class:"form-group flex items-center"},C=e("label",{for:"map",class:"mr-2"},"Map:",-1),D=e("div",{class:"border-b border-solid border-black-100"},null,-1),E={key:0,class:"table"},A=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",{class:"text-left px-3"},"Username"),e("th",{class:"text-left"},"Score")])],-1),K={class:"text-center"},q={class:"px-3"},z={key:1,class:"flex justify-center mt-3"},J=x({__name:"LeaderboardView",setup(r){const d=m("lari"),c=m("all"),n=m([]),a=m(!1),p=()=>{a.value=!0,k(c.value,d.value).then(i=>{var s;n.value=((s=i.data)==null?void 0:s.map(t=>({map:t.map,mode:t.mode,score:t.score,username:t.metadata.username,created_at:t.created_at})))||[],a.value=!1}).catch(i=>{a.value=!1,alert("Error: "+i)})};return $(()=>{p()}),(i,s)=>(o(),l("div",B,[_(V),e("div",F,[e("div",I,[e("div",M,[N,_(f,{options:[{text:"Kejar-kejaran",value:"kejar"},{text:"Lari",value:"lari"}],name:"mode",modelValue:d.value,"onUpdate:modelValue":[s[0]||(s[0]=t=>d.value=t),p],label:""},null,8,["modelValue"])]),e("div",U,[C,_(f,{options:[{text:"All",value:"all"},{text:"Dust",value:"dust"}],name:"map",modelValue:c.value,"onUpdate:modelValue":[s[1]||(s[1]=t=>c.value=t),p],label:""},null,8,["modelValue"])])]),D,a.value?v("",!0):(o(),l("table",E,[A,e("tbody",null,[(o(!0),l(h,null,g(n.value,(t,b)=>(o(),l("tr",{key:b},[e("td",K,u(b+1),1),e("td",q,u(t.username),1),e("td",null,u(t.score),1)]))),128))])])),a.value?(o(),l("div",z,[_(y)])):v("",!0)])]))}});export{J as default};