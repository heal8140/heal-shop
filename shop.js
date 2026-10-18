/* 商品の編集は products.json のみでOK。GitHub Pages対応・サーバー不要。 */
const yen = value => '¥' + Number(value).toLocaleString('ja-JP');
const element = (tag, className, text) => { const el=document.createElement(tag); if(className) el.className=className; if(text!==undefined) el.textContent=text; return el; };

// 商品説明内の <br> のみを改行として表示する。
function setTextWithBreaks(target, value){
 const parts=String(value||'').split(/<br\s*\/?>/gi);
 target.replaceChildren();
 parts.forEach((part,index)=>{if(index) target.append(document.createElement('br'));target.append(document.createTextNode(part));});
}
async function loadProducts(){ const res=await fetch('products.json',{cache:'no-cache'}); if(!res.ok) throw new Error('商品の読み込みに失敗しました'); return await res.json(); }
function renderListing(products){
 const grid=document.querySelector('#product-grid'); if(!grid)return;
 grid.replaceChildren();
 for(const p of products.filter(p=>p.published!==false)){
  const a=element('a','product-card'); a.href='product.html?id='+encodeURIComponent(p.id);
  const imgWrap=element('div','product-image'), img=element('img'); img.src=p.image; img.alt=p.name; img.loading='lazy'; imgWrap.append(img);
  const info=element('div','product-info');
  info.append(element('p','product-category',p.category||'HEAL SELECT'),element('h3','',p.name),element('p','product-short',p.shortDescription||''));
  const bottom=element('div','product-bottom'), price=element('p','price',p.listPrice==null && p.price==null ? '価格お問い合わせ' : yen(p.listPrice??p.price));
  if(p.listPrice!=null || p.price!=null) price.append(element('span','', 'tax in')); bottom.append(price,element('span','view-detail','VIEW')); info.append(bottom); a.append(imgWrap,info); grid.append(a);
 }
}
function renderDetail(products){
 const title=document.querySelector('#detail-product-name'); if(!title)return;
 const id=new URLSearchParams(location.search).get('id'); const p=products.find(p=>p.id===id && p.published!==false);
 if(!p){title.textContent='商品が見つかりません';document.querySelector('.product-detail-inner').querySelector('.detail-image').style.display='none'; document.querySelector('.detail-description').style.display='none';return;}
 document.title=p.name+' | heal ONLINE SHOP'; title.textContent=p.name;
 const img=document.querySelector('#detail-product-image'); img.src=p.detailImage||p.image; img.alt=p.name;
 document.querySelector('#detail-product-image-wrap').className='detail-image'+(p.detailImageClass?' '+p.detailImageClass:'');
  // detailImages がある商品にだけサムネイル式の画像切替を表示します。
  const imageWrap=document.querySelector('#detail-product-image-wrap');
  const oldGallery=imageWrap.querySelector('.detail-image-thumbnails');
  if(oldGallery) oldGallery.remove();
  imageWrap.classList.remove('has-image-gallery');
  const galleryImages=Array.isArray(p.detailImages)?p.detailImages.filter(src=>typeof src==='string' && src.trim()):[];
  if(galleryImages.length){
    imageWrap.classList.add('has-image-gallery');
    img.src=galleryImages[0];
    const thumbnails=element('div','detail-image-thumbnails');
    galleryImages.forEach((src,i)=>{
      const button=element('button','detail-image-thumbnail'+(i===0?' is-active':''));
      button.type='button'; button.setAttribute('aria-label','商品画像 '+(i+1)+' を表示');
      button.setAttribute('aria-pressed',i===0?'true':'false');
      const thumb=element('img'); thumb.src=src; thumb.alt=p.name+' 画像 '+(i+1); thumb.loading='lazy';
      button.append(thumb);
      button.addEventListener('click',()=>{
        img.src=src;
        thumbnails.querySelectorAll('button').forEach(b=>{b.classList.remove('is-active');b.setAttribute('aria-pressed','false');});
        button.classList.add('is-active'); button.setAttribute('aria-pressed','true');
      });
      thumbnails.append(button);
    });
    imageWrap.append(thumbnails);
  }

 if(p.price==null) document.querySelector('#detail-product-price').textContent='価格お問い合わせ';
 else document.querySelector('#detail-product-price').replaceChildren(document.createTextNode(yen(p.price)+' '),element('span','','税込'));
 setTextWithBreaks(document.querySelector('#detail-product-intro'),p.intro||'');
 // カラー選択欄は、colorOptions を設定した商品だけに表示します。
 const oldColor=document.querySelector('#detail-product-color'); if(oldColor) oldColor.remove();
 if(Array.isArray(p.colorOptions) && p.colorOptions.length){
  const wrap=element('div','detail-color-selector'); wrap.id='detail-product-color';
  const label=element('label','detail-color-label','カラーを選択'); label.htmlFor='detail-color-choice';
  const select=element('select','detail-color-choice'); select.id='detail-color-choice'; select.name='color'; select.required=true;
  const placeholder=element('option','','カラーを選択してください'); placeholder.value=''; placeholder.disabled=true; placeholder.selected=true; select.append(placeholder);
  for(const color of p.colorOptions){const option=element('option','',color);option.value=color;select.append(option);}
  wrap.append(label,select);
  document.querySelector('#detail-product-buy').before(wrap);
 }

 // 長さ選択欄は、sizeOptions を設定した商品だけに表示します。
 const oldSize=document.querySelector('#detail-product-size'); if(oldSize) oldSize.remove();
 if(Array.isArray(p.sizeOptions) && p.sizeOptions.length){
  const wrap=element('div','detail-color-selector'); wrap.id='detail-product-size';
  const label=element('label','detail-color-label','長さを選択'); label.htmlFor='detail-size-choice';
  const select=element('select','detail-color-choice'); select.id='detail-size-choice'; select.name='size'; select.required=true;
  const placeholder=element('option','','長さを選択してください'); placeholder.value=''; placeholder.disabled=true; placeholder.selected=true; select.append(placeholder);
  for(const size of p.sizeOptions){const option=element('option','',size);option.value=size;select.append(option);}
  wrap.append(label,select);
  document.querySelector('#detail-product-buy').before(wrap);
 }

 document.querySelector('#detail-product-category').textContent=p.detailCategory||'heal SELECT ITEM';
 const contents=document.querySelector('#detail-product-sections'); contents.replaceChildren();
 for(const part of (p.sections||[])){const description=element('p','');setTextWithBreaks(description,part.text);contents.append(element('h3','',part.heading),description);}
 const pdfArea=document.querySelector('#detail-product-pdfs');
 if(pdfArea){
  pdfArea.replaceChildren();
  for(const doc of (p.pdfs||[])){
   if(!doc || typeof doc.url!=='string' || !/^pdf\/[a-zA-Z0-9._-]+\.pdf$/i.test(doc.url)) continue;
   const link=element('a','product-pdf-button',doc.label||'商品資料（PDF）を見る');
   link.href=doc.url; link.target='_blank'; link.rel='noopener noreferrer';
   pdfArea.append(link);
  }
  pdfArea.hidden=pdfArea.childElementCount===0;
 }
 const buy=document.querySelector('#detail-product-buy'), note=document.querySelector('#detail-product-stripe-note');
 if(p.price!=null && p.stripeUrl && /^https:\/\//i.test(p.stripeUrl)) {buy.href=p.stripeUrl;buy.removeAttribute('aria-disabled');note.textContent='安全なStripe決済ページへ移動します。';}
 else {buy.href='#';buy.setAttribute('aria-disabled','true');buy.addEventListener('click',e=>e.preventDefault());note.textContent='決済リンクは準備中です。';}
}
(async()=>{try{const products=await loadProducts();renderListing(products);renderDetail(products);}catch(err){const grid=document.querySelector('#product-grid');if(grid)grid.textContent='商品の読み込みに失敗しました。公開サイトで再読み込みしてください。';const title=document.querySelector('#detail-product-name');if(title)title.textContent='商品の読み込みに失敗しました。';console.error(err);}})();
