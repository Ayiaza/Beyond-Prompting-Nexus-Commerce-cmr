const PROD=[
{id:1,n:"Wireless Earbuds",c:"Audio",p:59,e:"🎧"},{id:2,n:"Smart Watch",c:"Wearables",p:129,e:"⌚"},
{id:3,n:"Mechanical Keyboard",c:"Computing",p:89,e:"⌨️"},{id:4,n:"Gaming Mouse",c:"Computing",p:45,e:"🖱️"},
{id:5,n:"Bluetooth Speaker",c:"Audio",p:39,e:"🔊"},{id:6,n:"Laptop Stand",c:"Accessories",p:29,e:"💻"},
{id:7,n:"Fitness Band",c:"Wearables",p:35,e:"📿"},{id:8,n:"Phone Case",c:"Accessories",p:15,e:"📱"}];
const STATUS=["New","Active","VIP","Inactive"],OST=["Pending","Shipped","Delivered","Cancelled"];
let S={cart:{},orders:[],customers:[]},V="shop",Q="",CAT="All",AT="dash";
try{const d=localStorage.getItem("nexus");if(d)S=Object.assign(S,JSON.parse(d))}catch(e){}
const save=()=>{try{localStorage.setItem("nexus",JSON.stringify(S))}catch(e){}};
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const m=n=>"$"+n.toFixed(2),cnt=()=>Object.values(S.cart).reduce((a,b)=>a+b,0);
const tot=()=>Object.entries(S.cart).reduce((a,[i,q])=>a+PROD.find(p=>p.id==i).p*q,0);
function go(v){V=v;draw()}
function draw(){
 $("#nav").innerHTML=[["shop","Shop"],["cart","Cart ("+cnt()+")"],["admin","CRM Admin"]].map(([k,l])=>`<button class="${V==k?"on":""}" onclick="go('${k}')">${l}</button>`).join("");
 $("#app").innerHTML=V=="shop"?shop():V=="cart"?cart():admin();
}
function shop(){
 const cats=["All",...new Set(PROD.map(p=>p.c))];
 const list=PROD.filter(p=>(CAT=="All"||p.c==CAT)&&p.n.toLowerCase().includes(Q.toLowerCase()));
 return`<div class="bar"><input id="q" placeholder="Search products…" value="${esc(Q)}" oninput="Q=this.value;draw();$('#q').focus()">
 <select onchange="CAT=this.value;draw()">${cats.map(c=>`<option ${c==CAT?"selected":""}>${c}</option>`).join("")}</select></div>
 <div class="grid">${list.map(p=>`<div class="card"><div class="e">${p.e}</div><b>${p.n}</b><div class="mu">${p.c}</div>
 <div class="row" style="border:0"><b>${m(p.p)}</b><button class="p" onclick="add(${p.id})">Add</button></div></div>`).join("")||"<p>No products found.</p>"}</div>`}
function add(i){S.cart[i]=(S.cart[i]||0)+1;save();draw()}
function chg(i,d){S.cart[i]=(S.cart[i]||0)+d;if(S.cart[i]<=0)delete S.cart[i];save();draw()}
function cart(){
 if(!cnt())return`<div class="card">Your cart is empty. <button onclick="go('shop')">Browse products</button></div>`;
 return`<div class="card">${Object.entries(S.cart).map(([i,q])=>{const p=PROD.find(x=>x.id==i);return`<div class="row"><span>${p.e} ${p.n}</span><span><button onclick="chg(${i},-1)">−</button> ${q} <button onclick="chg(${i},1)">+</button> ${m(p.p*q)}</span></div>`}).join("")}
 <h3>Total: ${m(tot())}</h3>
 <div class="form"><input id="cn" placeholder="Full name"><input id="ce" type="email" placeholder="Email"><button class="p" onclick="order()">Place order</button></div></div>`}
function order(){
 const n=$("#cn").value.trim(),e=$("#ce").value.trim().toLowerCase();
 if(!n||!/^\S+@\S+\.\S+$/.test(e))return alert("Please enter a valid name and email.");
 let c=S.customers.find(x=>x.email==e);
 if(!c){c={id:Date.now(),name:n,email:e,status:"New",notes:[]};S.customers.push(c)}
 const items=Object.entries(S.cart).map(([i,q])=>({id:+i,q}));
 S.orders.push({id:"ORD-"+(1000+S.orders.length+1),cid:c.id,items,total:tot(),status:"Pending",date:new Date().toLocaleDateString()});
 const spent=S.orders.filter(o=>o.cid==c.id).reduce((a,o)=>a+o.total,0);
 if(spent>=200)c.status="VIP";else if(c.status=="New"&&S.orders.filter(o=>o.cid==c.id).length>1)c.status="Active";
 S.cart={};save();alert("Order placed! Thank you, "+n+".");go("shop")}
function admin(){
 const tabs=[["dash","Dashboard"],["cust","Customers"],["ord","Orders"]];
 const t=`<div class="bar">${tabs.map(([k,l])=>`<button class="${AT==k?"on":""}" onclick="AT='${k}';draw()">${l}</button>`).join("")}</div>`;
 return t+(AT=="dash"?dash():AT=="cust"?cust():ord())}
function dash(){
 const rev=S.orders.filter(o=>o.status!="Cancelled").reduce((a,o)=>a+o.total,0);
 const top=S.customers.map(c=>({c,s:S.orders.filter(o=>o.cid==c.id&&o.status!="Cancelled").reduce((a,o)=>a+o.total,0)})).sort((a,b)=>b.s-a.s).slice(0,5);
 return`<div class="st"><div class="card"><span class="mu">Revenue</span><b>${m(rev)}</b></div><div class="card"><span class="mu">Orders</span><b>${S.orders.length}</b></div>
 <div class="card"><span class="mu">Customers</span><b>${S.customers.length}</b></div><div class="card"><span class="mu">VIPs</span><b>${S.customers.filter(c=>c.status=="VIP").length}</b></div></div>
 <div class="card"><b>Top customers</b>${top.map(x=>`<div class="row"><span>${esc(x.c.name)}</span><span>${m(x.s)}</span></div>`).join("")||'<p class="mu">No data yet — place an order in the shop.</p>'}</div>
 <p><button onclick="seed()">Load demo data</button> <button onclick="if(confirm('Reset all data?')){S={cart:{},orders:[],customers:[]};save();draw()}">Reset</button></p>`}
function cust(){
 if(!S.customers.length)return`<div class="card">No customers yet.</div>`;
 return`<div class="card scroll"><table><tr><th>Name</th><th>Email</th><th>Orders</th><th>Status</th><th>Notes</th></tr>${S.customers.map(c=>`<tr><td>${esc(c.name)}</td><td>${esc(c.email)}</td>
 <td>${S.orders.filter(o=>o.cid==c.id).length}</td><td><select onchange="cs(${c.id},this.value)">${STATUS.map(s=>`<option ${s==c.status?"selected":""}>${s}</option>`).join("")}</select></td>
 <td style="white-space:normal">${c.notes.map(n=>`<div class="mu">• ${esc(n)}</div>`).join("")}<button onclick="note(${c.id})">+ Note</button></td></tr>`).join("")}</table></div>`}
function cs(id,v){S.customers.find(c=>c.id==id).status=v;save();draw()}
function note(id){const t=prompt("Add note / follow-up:");if(t){S.customers.find(c=>c.id==id).notes.push(t);save();draw()}}
function ord(){
 if(!S.orders.length)return`<div class="card">No orders yet.</div>`;
 return`<div class="card scroll"><table><tr><th>ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr>${[...S.orders].reverse().map(o=>{const c=S.customers.find(x=>x.id==o.cid);return`<tr><td>${o.id}</td><td>${esc(c?c.name:"?")}</td><td>${o.date}</td><td>${m(o.total)}</td>
 <td><select onchange="os('${o.id}',this.value)">${OST.map(s=>`<option ${s==o.status?"selected":""}>${s}</option>`).join("")}</select></td></tr>`}).join("")}</table></div>`}
function os(id,v){S.orders.find(o=>o.id==id).status=v;save();draw()}
function seed(){
 [["Ayesha Khan","ayesha@example.com"],["Bilal Ahmed","bilal@example.com"],["Sara Malik","sara@example.com"]].forEach(([n,e],i)=>{
  if(S.customers.some(c=>c.email==e))return;
  const c={id:Date.now()+i,name:n,email:e,status:["VIP","Active","New"][i],notes:i==0?["Prefers email contact"]:[]};S.customers.push(c);
  S.orders.push({id:"ORD-"+(1000+S.orders.length+1),cid:c.id,items:[{id:2,q:1}],total:[240,129,59][i],status:["Delivered","Shipped","Pending"][i],date:new Date().toLocaleDateString()})});
 save();draw()}
draw();
