import{s as h,aV as x,r as l,a as d,aq as j,j as o,b as v,b8 as B,d0 as H,b5 as I,bB as k,b9 as E,bS as y}from"./desk-257f76bb-bca7b027.js";import{useDeskTool as C}from"./index-9e58f0f1-6e803b9a.js";import"./index-5d24cd7c.js";var u;function O(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function g(t){const{actionHandlers:e,index:s,menuItems:n,menuItemGroups:r,title:i}=t,{features:a}=C();return!(n!=null&&n.length)&&!i?null:o(B,{actions:o(H,{menuItems:n,menuItemGroups:r,actionHandlers:e}),backButton:a.backButton&&s>0&&o(I,{as:k,"data-as":"a",icon:E,mode:"bleed"}),title:i})}const L=h(x)(u||(u=O([`
  position: relative;
`])));function S(t){const{children:e}=t,{collapsed:s}=y();return o(L,{hidden:s,height:"fill",overflow:"auto",children:e})}function z(t){const{index:e,pane:s,paneKey:n,...r}=t,{child:i,component:a,menuItems:m,menuItemGroups:p,title:f="",type:T,...b}=s,[c,P]=l.useState(null);return d(j,{id:n,minWidth:320,selected:r.isSelected,children:[o(g,{actionHandlers:c==null?void 0:c.actionHandlers,index:e,menuItems:m,menuItemGroups:p,title:f}),d(S,{children:[v.isValidElementType(a)&&l.createElement(a,{...r,...b,ref:P,child:i,paneKey:n}),l.isValidElement(a)&&a]})]})}export{z as default};