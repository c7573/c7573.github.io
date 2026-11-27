const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function updateClock(){const d=new Date();$('#clock').textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':')};updateClock();setInterval(updateClock,1000);
const sidebar=$('#sidebar'),overlay=$('#mobileOverlay');function closeMenu(){sidebar.classList.remove('open');overlay.classList.remove('show')};$('#menuToggle')?.addEventListener('click',()=>{sidebar.classList.toggle('open');overlay.classList.toggle('show')});overlay?.addEventListener('click',closeMenu);
$$('.nav-link').forEach(a=>a.addEventListener('click',()=>{ $$('.nav-link').forEach(x=>x.classList.remove('active'));a.classList.add('active');$('#crumb').textContent=a.dataset.nav.toUpperCase();closeMenu()}));
const people=[
['director','관리국장','관리국장','해무진','관리국장 · 무상급','한국','불명','ISTJ · 1w9 · 질서악','무뚝뚝 · 유연성 결핍 · 고독','압도적 위압감','검은 정장 · 흰 셔츠 · 흑단발 · 흑안 · 우안 실명 · 초장신 · 근육 · 수염','용광검 · 주야일과','a.png'],
['division1','제1대응단','제1대응단장','신서연','제1대응단장 · 천재급','한국','30','ESTJ · 1w2 · 질서선','인본주의 · 책임감 중시 · 겉당당, 속여린 이중성','서투른 연애지식 · 정 많음','금발 웨이브 · 적안 · 글래머 · 흰 셔츠 · 검은 스커트 · 스타킹 · 하이힐','청염칠선 · 태극','sinseoyeon.webp'],
['division1','제1대응단','긴급구조과','최유건','긴급구조과장 · 대재급','한국','29','ESFJ · 2w1 · 중립선','유쾌 · 능글 · 활달 · 인본주의','긴장 푸는 농담 · 웃는 얼굴의 압박 · 격식 없음','갈색 단발 · 청안 · 근육 · 장신 · 소매 걷은 흰 셔츠 · 검은 Y자 멜빵 · 슬랙스','칠성칼 · 명경지수','choiyugeon.webp'],
['division1','제1대응단','위험종결과','류선','위험종결과장 · 대재급','한국','27','ISTJ · 1w9 · 질서악','반말 · 직설 · 짜증 · 츤데레','봉인 전문 · 류연의 쌍둥이 언니','흑장발 · 적안 · 날카로운 인상 · 흰 셔츠 · 검은 재킷 · 검은 넥타이','무한다면각체 · 부동','ryuseon.webp'],
['division1','제1대응단','긴급구조과','류연','긴급구조과 요원 · 중재급','한국','27','ENTJ · 8w9 · 질서중립','무뚝뚝 · 인본주의','현장 매뉴얼 우선 · 존댓말','흑색 포니테일 · 청안 · 거유 · 날카로운 인상 · 검은 셔츠 · 붉은 넥타이','벽사포','ryuyeon.webp'],
['division1','제1대응단','위험종결과','여천호','위험종결과 요원 · 대재급','중국','33','ESTP · 8w7 · 혼돈','열혈 · 호탕 · 단순무식 · 헬창 · 반말 · 전투광','처치 전문','적단발 · 적안 · 초장신 · 거구 · 근육 · 온몸 흉터 · 흰 셔츠 · 갈색 Y자 멜빵','적철갑','yeocheonho.webp'],
['division2','제2관리단','제2관리단장','범원제','제2관리단장 · 천재급','중국','35','ENTJ · 3w4 · 질서악','능청 · 겉유쾌, 속사악 이중성','가스라이팅 고수 · 계획된 호의 · 이익 중시','백단발 · 녹안 · 포마드 · 브라운 3피스 · 마른 근육','금구설 · 재맥감응','beomwonje.webp'],
['division2','제2관리단','사무처리과','린 슈위안','사무처리과장 · 소재급','중국','43','ISTP · 9w8 · 중립','나태 · 무심','안전불감증 · 피곤 · 생존 베테랑','헝클어진 흑발 · 흑안 · 턱수염 · 구겨진 셔츠 · 느슨한 넥타이','둔영전','lin_shuyuan.webp'],
['division2','제2관리단','사무처리과','이지은','사무처리과 사원 · 소재급','한국','26','ENFP · 1w2 · 혼돈선','겁 많음 · 순진무구 · 상냥','존댓말 · 사탕 소지 · 대응단 인원 존경','연한 갈색 단발 · 갈안 · 흰 블라우스 · 베이지 가디건 · 남색 스커트 · 헤어핀','정사주','lee_jieun.webp'],
['division2','제2관리단','인사지원과','모리카와 유키노','인사지원과장 · 중재급','일본','28','ISTJ · 8w9 · 질서악','냉소 · 직설 · 변수 혐오','우아한 독설 · 날카로운 비꼼 · 효율 중시','회색 올림머리 · 자안 · 날카로운 눈매 · 흰 셔츠 · 베이지 재킷 · 하이힐 · 베이지 스커트','현신지','morikawa_yukino.webp'],
['division3','제3정보단','제3정보단장','아마노 호노카','제3정보단장 · 천재급','일본','30','INTJ · 5w6 · 중립','무감정 · 건조','미세한 움직임 관찰 및 분석 · 말수 적음','백장발 히메컷 · 유백안 · 흰 피부 · 슬랜더 · 동안 · 검은 하이넥 · 회색 재킷','은목 · 전지','amano_honoka.webp'],
['division3','제3정보단','연구개발과','즈 쉬안','연구개발과장 · 대재급','중국','28','INTJ · 5w4 · 중립악','음침 · 천재','기괴한 농담 · 혼잣말 · 전문용어','헝클어진 흑장발 · 흐린 흑안 · 폭유 · 흰 가운','영력공학 드론','zi_xuan.webp'],
['division3','제3정보단','연구개발과','장연우','연구개발과 연구원 · 중재급','한국','24','INFP · 9w1 · 중립선','찐따 · 소심 · 덤벙 · 여림','주머니 공구 · 존댓말 · 말 흐림','헝클어진 금단발 · 호박색 눈 · 마른 체격 · 흰 가운','AGB','jang_yeonwoo.webp'],
['division3','제3정보단','조사분류과','유미래','조사분류과장 · 중재급','한국','28','ESTP · 8w7 · 혼돈선','시원 · 털털','골초 · 권위 혐오 · 거친 반말 · 욕설','청단발 · 청회색 눈 · 다크서클 · 흰 셔츠 · 검은 넥타이 · 검은 슬랙스 · 담배','청안은정 · 무망','yu_mirae.webp'],
['audit','감사위원회','감사위원장','타카미야 소이치로','감사위원장 · 천재급','일본','57','INFJ · 1w9 · 질서선','정중 · 인자 · 강강약약','최대한 타협 우선 · 거짓말 혐오','그레이 3피스 · 백발 · 금안 · 흰 수염 · 다부진 체격','신명인 · 집행','takamiya_soichiro.webp'],
['audit','감사위원회','감사위원회','토가미 카이토','부패수사관 · 중재급','일본','30','ESTJ · 1w2 · 중립','정중 · 냉소 · 불의 용납 불가','존댓말 · 규정 중시 · 편법 혐오','검은 정장 · 흑발 포마드 · 흑안 · 마른 근육 · 안경','정죄쇄','togami_kaito.webp'],
['special','특수방위별원','협력영물','호연','협력영물(백호) · 천재급','한국','불명','ENTP · 7w8 · 혼돈중립','열혈 · 낙천 · 호전적','반말 · 해라체 · 골초','백장발 · 금안 · 백호 귀와 꼬리 · 흰 개량 한복 · 곰방대','기호지세 · 호시탐탐','hoyeon.webp'],
['special','특수방위별원','협력영물','황운','협력영물(황룡) · 천재급','중국','불명','ENTJ · 8w9 · 질서중립','오만 · 위엄 · 탐욕','반말 · 거만한 말투 · 시적 표현','금단발 · 금안 · 황금 용뿔 · 블랙 3피스 · 금 넥타이핀 · 손목시계','비룡승운 · 천하귀일','huangyun.webp'],
['special','특수방위별원','협력영물','사쿠야','협력영물(구미호) · 천재급','일본','불명','ENTP · 7w8 · 혼돈중립','요염 · 유혹 · 뻔뻔','매도 · 비유 · 거짓말 섞기','분홍 장발 · 적안 · 여우 귀 · 아홉 개 흰 꼬리 · 흰/붉은 기모노 · 금 칸자시','천연매심 · 구미환천','sakuya.webp']
];
// ===== 캐릭터 카드 틀 (인물 기록 · 괴이 기록 공통) =====
const GRADE_MARK={'소재급':'材','중재급':'中','대재급':'大','천재급':'天','무상급':'無'};
const splitKw=s=>String(s==null?'':s).split(' · ').map(x=>x.trim()).filter(Boolean);
const escHtml=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function el(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function personView(p){
 const parts=p[4].split(' · ');const grade=parts.length>1?parts[parts.length-1]:'';const role=parts.length>1?parts.slice(0,-1).join(' · '):p[4];
 const age=/^\d+$/.test(p[6])?p[6]+'세':'나이 불명';const type=splitKw(p[7]);
 return {kind:'person',panel:'인물 상세 기록',unit:'인물',aff:p[1],role,name:p[3],grade,country:p[5],age,image:'images/characters/'+p[12],
  meta:[role,age,p[5]].join(' · '),lead:splitKw(p[11])[0]||'',skills:splitKw(p[11]),looks:splitKw(p[10]),traits:splitKw(p[8]),notes:splitKw(p[9]),type,tags:[type[0],type[2]].filter(Boolean)};
}
function anomalyView(a){
 return {kind:'anomaly',panel:'괴이 상세 기록',unit:'괴이',aff:'네임드 괴이',name:a.name,grade:a.grade,country:a.country,image:'',
  meta:a.grade,lead:a.summary,summary:a.summary,areas:splitKw(a.country),tags:splitKw(a.country)};
}
function ccMedia(v,onFail){
 const emblem=()=>el('div','cc-emblem',escHtml(v.name.slice(0,1)));
 if(!v.image)return emblem();
 const img=new Image();img.className='cc-img';img.alt=v.name+' 인물 이미지';img.loading='lazy';
 img.onerror=()=>{img.replaceWith(emblem());if(onFail)onFail()};img.src=v.image;return img;
}
function buildCard(v){
 const card=el('article','cc-card');card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',v.name+' 상세 기록 열기');card._cc=v;
 const thumb=el('div','cc-thumb');thumb.append(ccMedia(v));
 const top=v.grade==='천재급'||v.grade==='무상급';
 const body=el('div','cc-body',
  `<div class="cc-top"><span class="cc-aff">${escHtml(v.aff)}</span><span class="cc-badge${top?' is-top':''}" title="${escHtml(v.grade)}">${escHtml(GRADE_MARK[v.grade]||'')}</span></div>`+
  `<h5 class="cc-name">${escHtml(v.name)}</h5><p class="cc-meta">${escHtml(v.meta)}</p>`+
  (v.lead?`<p class="cc-lead"><span>${escHtml(v.lead)}</span></p>`:'')+
  `<div class="cc-foot">${v.tags.map(t=>`<span class="cc-tag">${escHtml(t)}</span>`).join('')}</div>`);
 card.append(thumb,body);
 card.addEventListener('click',()=>openCc(card));
 card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCc(card)}});
 return card;
}
let ccModal=null,ccItems=[],ccIdx=0;
function ccEnsure(){
 if(ccModal)return ccModal;
 ccModal=el('div','cc-modal');ccModal.hidden=true;ccModal.setAttribute('role','dialog');ccModal.setAttribute('aria-modal','true');ccModal.setAttribute('aria-label','상세 기록');
 ccModal.innerHTML='<div class="cc-backdrop" data-cc-close></div><div class="cc-panel"><div class="cc-panel-head"><span class="cc-kind"></span><button type="button" class="cc-close" data-cc-close aria-label="닫기">✕</button></div><div class="cc-scroll"></div></div>';
 document.body.append(ccModal);
 ccModal.addEventListener('click',e=>{if(e.target.closest('[data-cc-close]'))return closeCc();const n=e.target.closest('[data-cc-step]');if(n&&!n.disabled)stepCc(+n.dataset.ccStep)});
 document.addEventListener('keydown',e=>{
  if(ccModal.hidden)return;
  if(e.key==='Escape')closeCc();else if(e.key==='ArrowLeft')stepCc(-1);else if(e.key==='ArrowRight')stepCc(1);
  else if(e.key==='Tab'){const f=$$('button:not(:disabled)',ccModal);if(!f.length)return;const first=f[0],last=f[f.length-1];
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
 });
 return ccModal;
}
const kwList=a=>`<ul class="cc-list">${a.map(x=>`<li>${escHtml(x)}</li>`).join('')}</ul>`;
const kwChips=a=>`<div class="cc-chips">${a.map(x=>`<span>${escHtml(x)}</span>`).join('')}</div>`;
const ccSec=(title,arr,fn)=>arr&&arr.length?`<section class="cc-sec"><h3>${title}</h3>${fn(arr)}</section>`:'';
function renderCc(){
 const card=ccItems[ccIdx],v=card._cc,m=ccEnsure(),box=$('.cc-scroll',m);
 $('.cc-kind',m).textContent=v.panel;
 const isP=v.kind==='person';
 const head=`<div class="cc-title-row"><div><div class="cc-aff-line">${escHtml(isP?v.aff+' · '+v.role:v.aff)}</div><h2>${escHtml(v.name)}</h2><p class="cc-meta">${escHtml(isP?v.country+' · '+v.age:v.country)}</p></div><div class="cc-big-grade"><b>${escHtml(GRADE_MARK[v.grade]||'')}</b><small>${escHtml(v.grade)}</small></div></div>`;
 const cap=isP?`<div class="cc-figcap"><span>인물 이미지</span><a href="${escHtml(v.image)}" target="_blank" rel="noopener">원본 이미지 ↗</a></div>`:'';
 const feat=isP?(v.skills.length?`<div class="cc-feature"><small>주령기 · 권능</small><strong>${escHtml(v.skills.join(' · '))}</strong></div>`:''):`<div class="cc-feature"><small>개요</small><strong>${escHtml(v.summary)}</strong></div>`;
 const secs=isP?ccSec('외형',v.looks,kwList)+ccSec('성격',v.traits,kwChips)+ccSec('특징과 이야기',v.notes,kwList)+ccSec('성향 분류',v.type,kwChips):ccSec('출현 권역',v.areas,kwChips);
 const n=String(ccItems.length).padStart(2,'0');
 const nav=`<nav class="cc-nav"><button type="button" data-cc-step="-1"${ccIdx===0?' disabled':''}>← 이전 ${v.unit}</button><span class="cc-count">${String(ccIdx+1).padStart(2,'0')} / ${n}</span><button type="button" data-cc-step="1"${ccIdx===ccItems.length-1?' disabled':''}>다음 ${v.unit} →</button></nav>`;
 box.innerHTML=head+'<figure class="cc-figure"></figure>'+cap+feat+secs+nav;
 const link=$('.cc-figcap a',box);$('.cc-figure',box).append(ccMedia(v,()=>{if(link)link.hidden=true}));
 box.scrollTop=0;
}
function openCc(card){
 const host=card.closest('.personnel-groups')||document;
 ccItems=$$('.cc-card',host).filter(c=>!c.closest('[hidden]'));ccIdx=Math.max(0,ccItems.indexOf(card));
 const m=ccEnsure();renderCc();m.hidden=false;document.body.classList.add('cc-lock');$('.cc-close',m).focus({preventScroll:true});
}
function stepCc(d){const i=ccIdx+d;if(i<0||i>=ccItems.length)return;ccIdx=i;renderCc()}
function closeCc(){
 if(!ccModal||ccModal.hidden)return;ccModal.hidden=true;document.body.classList.remove('cc-lock');
 const c=ccItems[ccIdx];if(c&&c.isConnected)c.focus();
}
const groups={director:['관리국장','DIRECTORATE'],division1:['제1대응단','FIRST RESPONSE DIVISION'],division2:['제2관리단','SECOND ADMINISTRATION DIVISION'],division3:['제3정보단','THIRD INTELLIGENCE DIVISION'],audit:['감사위원회','AUDIT COMMITTEE'],special:['특수방위별원','SPECIAL DEFENSE UNIT']};let activePeople='all';
function renderPeople(){const host=$('#personnelGroups');host.innerHTML='';(activePeople==='all'?Object.keys(groups):[activePeople]).forEach(key=>{const data=people.filter(p=>p[0]===key);if(!data.length)return;const sec=document.createElement('section');sec.className='person-group';const hd=document.createElement('header');hd.className='person-group-head';hd.innerHTML=`<div><small>${groups[key][1]}</small><h3>${groups[key][0]}</h3></div>`;sec.append(hd);[...new Set(data.map(p=>p[2]))].forEach(unit=>{const sub=document.createElement('div');sub.className='person-subgroup';const h=document.createElement('h4');h.textContent=unit;sub.append(h);const grid=document.createElement('div');grid.className='cc-grid';data.filter(p=>p[2]===unit).forEach(p=>{grid.append(buildCard(personView(p)))});sub.append(grid);sec.append(sub)});host.append(sec)})}renderPeople();$$('#personFilters .filter-btn').forEach(b=>b.addEventListener('click',()=>{$$('#personFilters .filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');activePeople=b.dataset.group;renderPeople()}));
const ids=['home','agency-overview','organization','response','phenomena','positions','personnel','anomalies'];const observer=new IntersectionObserver(entries=>{const v=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!v)return;$$('.nav-link').forEach(a=>a.classList.toggle('active',a.dataset.nav===v.target.id));$('#crumb').textContent=v.target.id.toUpperCase()},{rootMargin:'-18% 0px -65% 0px',threshold:[0,.15,.35]});ids.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});


// Named anomalous entities grouped by the threat grade recorded in info.txt.
const anomalies=[
 {grade:'소재급',name:'수살귀',country:'한국 · 중국 · 일본',summary:'물귀신'},
 {grade:'소재급',name:'부속귀',country:'한국 · 중국 · 일본',summary:'물건에 붙은 악령'},
 {grade:'중재급',name:'서투른 장례지도사',country:'대한민국',summary:'거울 뒤 악령'},
 {grade:'중재급',name:'상상친구',country:'일본',summary:'인지형 악령'},
 {grade:'대재급',name:'광조',country:'한국',summary:'잊혀진 조선의 왕 · 언데드'},
 {grade:'대재급',name:'진혼촌인',country:'중국',summary:'수많은 영혼의 집합'},
 {grade:'천재급',name:'아귀불',country:'중국',summary:'번뇌의 현현'},
 {grade:'천재급',name:'13번째 구세주',country:'한국',summary:'흑염소 머리 · 사제'},
 {grade:'천재급',name:'츠쿠모가미',country:'일본',summary:'살점덩어리'},
 {grade:'무상급',name:'무명',country:'한국',summary:'봉인된 태고의 괴이'}
];
function renderAnomalies(){
 const host=$('#anomalyGroups');if(!host)return;host.innerHTML='';
 // Render every grade once, then show only the selected grade.
 ['소재급','중재급','대재급','천재급','무상급'].forEach((grade,index)=>{
  const list=anomalies.filter(a=>a.grade===grade);if(!list.length)return;
  const section=document.createElement('section');
  section.className='person-group';
  section.dataset.grade=grade;
  const head=document.createElement('header');head.className='person-group-head';
  head.innerHTML=`<div><small>THREAT CLASS / 0${index+1}</small><h3>${grade}</h3></div>`;
  section.append(head);
  const sub=document.createElement('div');sub.className='person-subgroup';
  const grid=document.createElement('div');grid.className='cc-grid';
  list.forEach(a=>{grid.append(buildCard(anomalyView(a)))});
  sub.append(grid);section.append(sub);host.append(section);
 });
 applyAnomalyFilter('all');
}
function applyAnomalyFilter(grade){
 $$('#anomalyGroups .person-group').forEach(section=>{
  section.hidden = grade !== 'all' && section.dataset.grade !== grade;
 });
}
renderAnomalies();
const anomalyFilterHost=$('#anomalyFilters');
anomalyFilterHost?.addEventListener('click',event=>{
 const button=event.target.closest('button[data-grade]');
 if(!button || !anomalyFilterHost.contains(button))return;
 anomalyFilterHost.querySelectorAll('.filter-btn').forEach(item=>{
  const selected=item===button;
  item.classList.toggle('active',selected);
  item.setAttribute('aria-pressed',String(selected));
 });
 applyAnomalyFilter(button.dataset.grade);
});
