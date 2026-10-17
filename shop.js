/* 商品の編集は products.json のみでOK。GitHub Pages対応・サーバー不要。 */
const yen = value => '¥' + Number(value).toLocaleString('ja-JP');
const element = (tag, className, text) => { const el=document.createElement(tag); if(className) el.className=className; if(text!==undefined) el.textContent=text; return el; };
async function loadProducts(){ const res=await fetch('products.json',{cache:'no-cache'}); if(!res.ok) throw new Error('商品の読み込みに失敗しました'); return await res.json(); }
function renderListing(products){
 const grid=document.querySelector('#product-grid'); if(!grid)return;
 grid.replaceChildren();
 for(const p of products.filter(p=>p.published!==false)){
  const a=element('a','product-card'); a.href='product.html?id='+encodeURIComponent(p.id);
  const imgWrap=element('div','product-image'), img=element('img'); img.src=p.image; img.alt=p.name; img.loading='lazy'; imgWrap.append(img);
  const info=element('div','product-info');
  info.append(element('p','product-category',p.category||'HEAL SELECT'),element('h3','',p.name),element('p','product-short',p.shortDescription||''));
  const bottom=element('div','product-bottom'), price=element('p','price',yen(p.listPrice??p.price));
  price.append(element('span','', 'tax in')); bottom.append(price,element('span','view-detail','VIEW')); info.append(bottom); a.append(imgWrap,info); grid.append(a);
 }
}
function renderDetail(products){
 const title=document.querySelector('#detail-product-name'); if(!title)return;
 const id=new URLSearchParams(location.search).get('id'); const p=products.find(p=>p.id===id && p.published!==false);
 if(!p){title.textContent='商品が見つかりません';document.querySelector('.product-detail-inner').querySelector('.detail-image').style.display='none'; document.querySelector('.detail-description').style.display='none';return;}
 document.title=p.name+' | heal ONLINE SHOP'; title.textContent=p.name;
 const img=document.querySelector('#detail-product-image'); img.src=p.detailImage||p.image; img.alt=p.name;
 document.querySelector('#detail-product-image-wrap').className='detail-image'+(p.detailImageClass?' '+p.detailImageClass:'');
 document.querySelector('#detail-product-price').replaceChildren(document.createTextNode(yen(p.price)+' '),element('span','','税込'));
 document.querySelector('#detail-product-intro').textContent=p.intro||'';
 document.querySelector('#detail-product-category').textContent=p.detailCategory||'heal SELECT ITEM';
 const contents=document.querySelector('#detail-product-sections'); contents.replaceChildren();
 for(const part of (p.sections||[])){contents.append(element('h3','',part.heading),element('p','',part.text));}
 const buy=document.querySelector('#detail-product-buy'), note=document.querySelector('#detail-product-stripe-note');
 if(p.stripeUrl && /^https:\/\//i.test(p.stripeUrl)) {buy.href=p.stripeUrl;buy.removeAttribute('aria-disabled');note.textContent='安全なStripe決済ページへ移動します。';}
 else {buy.href='#';buy.setAttribute('aria-disabled','true');buy.addEventListener('click',e=>e.preventDefault());note.textContent='決済リンクは準備中です。';}
}
(async()=>{try{const products=await loadProducts();renderListing(products);renderDetail(products);}catch(err){const grid=document.querySelector('#product-grid');if(grid)grid.textContent='商品の読み込みに失敗しました。公開サイトで再読み込みしてください。';const title=document.querySelector('#detail-product-name');if(title)title.textContent='商品の読み込みに失敗しました。';console.error(err);}})();
