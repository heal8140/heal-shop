/* 共通ナビゲーションとカテゴリー表示。カテゴリー名・画像の編集は HEAL_CATEGORIES で行います。 */
const HEAL_CATEGORIES = [
  {
    "id": "care",
    "name": "癌などの闘病中の方",
    "short": "日々を、ご自身のペースで。",
    "description": "治療中や療養中の暮らしを大切にしたい方へ。日々を心地よく過ごすためのアイテムをご紹介します。",
    "image": "images/category-care.svg",
    "tone": "care",
    "tagline": "GENTLE EVERYDAY CARE"
  },
  {
    "id": "health",
    "name": "健康維持・体調管理",
    "short": "毎日を、自分らしく。",
    "description": "毎日の健康習慣や、日々のコンディションを意識した商品を集めました。",
    "image": "images/product4.jpg",
    "tone": "sage",
    "tagline": "DAILY WELLNESS"
  },
  {
    "id": "beauty",
    "name": "美容・エイジングケア",
    "short": "美しさを、暮らしの中に。",
    "description": "年齢にとらわれず、美容を意識する毎日に取り入れたいアイテムをご紹介します。",
    "image": "images/product7.jpg",
    "tone": "rose",
    "tagline": "BEAUTY CARE"
  },
  {
    "id": "environment",
    "name": "生活環境・健康グッズ",
    "short": "日常を、より心地よく。",
    "description": "身の回りの環境や暮らしの快適さに目を向けたアイテムをご紹介します。",
    "image": "images/product9.jpg",
    "tone": "stone",
    "tagline": "LIVING & GOODS"
  },
  {
    "id": "refresh",
    "name": "疲労・リフレッシュ",
    "short": "忙しい毎日の、気分転換に。",
    "description": "日々の栄養補給や生活習慣を見直したい方に向けた商品をご紹介します。",
    "image": "images/product5.jpg",
    "tone": "amber",
    "tagline": "REFRESH & BALANCE"
  },
  {
    "id": "sleep",
    "name": "睡眠・リラックス",
    "short": "休息の時間を、心地よく。",
    "description": "くつろぐ時間や、心地よい生活空間に関心のある方に向けたアイテムを集めました。",
    "image": "images/product9-1.jpg",
    "tone": "lavender",
    "tagline": "REST & RELAX"
  },
  {
    "id": "water",
    "name": "水・飲料",
    "short": "毎日の一杯に、こだわりを。",
    "description": "飲用ウォーターや、水を楽しむためのアイテムをご紹介します。",
    "image": "images/product2.jpeg",
    "tone": "blue",
    "tagline": "WATER & DRINK"
  },
  {
    "id": "nutrition",
    "name": "腸内環境・栄養補給",
    "short": "食生活に、ちょっとした工夫を。",
    "description": "乳酸菌・食物繊維・ビタミンなど、日々の栄養補給を考える方へ。",
    "image": "images/product4.jpg",
    "tone": "olive",
    "tagline": "NUTRITION"
  }
];
const categoryUrl = id => 'category-' + id + '.html';
const node = (tag, klass, text) => {const el=document.createElement(tag); if(klass)el.className=klass; if(text!==undefined)el.textContent=text; return el;};

function renderSiteHeader(){
 const header=document.querySelector('#site-header'); if(!header)return;
 const page=document.body.dataset.page, current=document.body.dataset.category;
 const top=node('div','header-upper');
 const inner=node('div','header-inner');
 const brand=node('a','brand');brand.href='index.html';brand.setAttribute('aria-label','heal ONLINE SHOP トップページへ');
 brand.append(node('span','brand-main','heal'),node('span','brand-sub','ONLINE SHOP'));
 const utility=node('nav','header-links');utility.setAttribute('aria-label','基本メニュー');
 const links=[['HOME','index.html'],['商品一覧','index.html#items'],['ABOUT','index.html#about'],['ご利用案内','index.html#guide']];
 for(const [name,href] of links){const a=node('a','',name);a.href=href;utility.append(a);}
 const mobileBtn=node('button','menu-toggle'); mobileBtn.type='button'; mobileBtn.setAttribute('aria-label','メニューを開く'); mobileBtn.setAttribute('aria-expanded','false');mobileBtn.setAttribute('aria-controls','mobile-navigation');mobileBtn.innerHTML='<span></span><span></span><span></span>';
 inner.append(brand,utility,mobileBtn);top.append(inner);
 const nav=node('nav','category-navigation');nav.setAttribute('aria-label','目的別カテゴリー');
 const navInner=node('div','category-navigation-inner');
 for(const c of HEAL_CATEGORIES){const a=node('a','category-nav-link'+(current===c.id?' is-current':''),c.name);a.href=categoryUrl(c.id);if(current===c.id)a.setAttribute('aria-current','page');navInner.append(a);}
 nav.append(navInner);
 const backdrop=node('button','mobile-backdrop');backdrop.type='button';backdrop.setAttribute('aria-label','メニューを閉じる');
 const mobile=node('nav','mobile-navigation');mobile.id='mobile-navigation';mobile.setAttribute('aria-label','スマートフォンメニュー');
 const mobileHead=node('div','mobile-navigation-head');mobileHead.append(node('span','mobile-navigation-title','MENU'));
 const close=node('button','menu-close','×');close.type='button';close.setAttribute('aria-label','メニューを閉じる');mobileHead.append(close);mobile.append(mobileHead,node('p','mobile-navigation-label','目的・お悩みから探す'));
 for(const c of HEAL_CATEGORIES){const a=node('a','mobile-category-link'+(c.id===current?' is-current':''));a.href=categoryUrl(c.id);a.append(node('span','',c.name),node('span','','›'));mobile.append(a);}
 const secondary=node('div','mobile-navigation-secondary');
 for(const [name,href] of links){const a=node('a','',name);a.href=href;secondary.append(a);}
 mobile.append(secondary);
 header.append(top,nav,backdrop,mobile);
 const setOpen=open=>{document.body.classList.toggle('menu-open',open);mobileBtn.setAttribute('aria-expanded',String(open));mobileBtn.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');if(open)close.focus();else mobileBtn.focus();};
 mobileBtn.addEventListener('click',()=>setOpen(!document.body.classList.contains('menu-open')));
 close.addEventListener('click',()=>setOpen(false));backdrop.addEventListener('click',()=>setOpen(false));
 mobile.addEventListener('click',e=>{if(e.target.closest('a')){document.body.classList.remove('menu-open');mobileBtn.setAttribute('aria-expanded','false');}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape' && document.body.classList.contains('menu-open'))setOpen(false);});
}
function renderCategoryCards(){
 const grid=document.querySelector('#category-grid');if(!grid)return;
 for(let i=0;i<HEAL_CATEGORIES.length;i++){
  const c=HEAL_CATEGORIES[i],a=node('a','category-card category-card--'+c.tone+(i===0?' category-card--lead':''));a.href=categoryUrl(c.id);a.setAttribute('aria-label',c.name+'の商品一覧を見る');
  const figure=node('div','category-card-visual');const img=node('img');img.src=c.image;img.alt='';img.loading='lazy';figure.append(img);
  const content=node('div','category-card-content');content.append(node('span','category-card-index',String(i+1).padStart(2,'0')+' / '+String(HEAL_CATEGORIES.length).padStart(2,'0')),node('h3','',c.name),node('p','',c.short));
  const arrow=node('span','category-card-arrow','↗');arrow.setAttribute('aria-hidden','true');
  a.append(figure,content,arrow);grid.append(a);
 }
}
function renderOtherCategories(){
 const grid=document.querySelector('#other-category-grid');if(!grid)return;
 const current=document.body.dataset.category;
 for(const c of HEAL_CATEGORIES.filter(v=>v.id!==current)){
  const a=node('a','category-mini-card');a.href=categoryUrl(c.id);a.append(node('span','',c.name),node('span','','↗'));grid.append(a);
 }
}
function renderSiteFooter(){
 const footer=document.querySelector('#site-footer');if(!footer)return;
 const inner=node('div','footer-inner');const brand=node('div','footer-brand');brand.append(node('span','','heal'),node('small','','ONLINE SHOP'));
 const right=node('div','footer-right');const links=node('div','footer-links');
 for(const [name,href] of [['HOME','index.html'],['商品一覧','index.html#items'],['ご利用案内','index.html#guide']]){const a=node('a','',name);a.href=href;links.append(a);}
 right.append(links,node('p','','© heal ONLINE SHOP'));inner.append(brand,right);footer.append(inner);
}
renderSiteHeader();renderCategoryCards();renderOtherCategories();renderSiteFooter();
