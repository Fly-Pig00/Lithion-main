import{s as _,bn as j,a as B,aq as g,d1 as w,j as a,b8 as L,d0 as O,b5 as T,bB as S,b9 as A,ar as D,aY as W,aV as z}from"./desk-257f76bb-bca7b027.js";import{P as C}from"./PaneItem-baaea00f-b485e822.js";import{useDeskTool as G}from"./index-9e58f0f1-6e803b9a.js";import"./index-5d24cd7c.js";var c;function H(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}const Y=_.hr(c||(c=H([`
  background-color: var(--card-border-color);
  height: 1px;
  margin: 0;
  border: none;
`])));function M(n){const{childItemId:t,index:l,isActive:d,isSelected:p,pane:u,paneKey:f}=n,{features:h}=G(),{collapsed:b}=j(),{defaultLayout:m,displayOptions:i,items:r,menuItems:y,menuItemGroups:v,title:I}=u,P=i==null?void 0:i.showIcons,k=e=>{var o;const s=(o=e.displayOptions)==null?void 0:o.showIcon;return typeof s<"u"?s!==!1:P!==!1};return B(g,{currentMaxWidth:350,"data-testid":"desk-tool-list-pane",id:f,maxWidth:640,minWidth:320,selected:p,children:[w,a(L,{actions:a(O,{menuItems:y,menuItemGroups:v}),backButton:h.backButton&&l>0&&a(T,{as:S,"data-as":"a",icon:A,mode:"bleed"}),title:I}),a(D,{overflow:b?void 0:"auto",children:a(W,{padding:2,space:1,children:r&&r.map((e,o)=>{if(e.type==="divider")return a(z,{paddingY:1,children:a(Y,{})},"divider-".concat(o));const s=!d&&t===e.id,x=d&&t===e.id;return a(C,{icon:k(e)?e.icon:!1,id:e.id,layout:m,pressed:s,schemaType:e.schemaType,selected:x,title:e.title,value:e._id&&e.schemaType?{_id:e._id,_type:e.schemaType.name,title:e.title}:void 0},e.id)})})})]})}export{M as default};
