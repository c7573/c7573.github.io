const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function updateClock(){const d=new Date();$('#clock').textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':')};updateClock();setInterval(updateClock,1000);
const sidebar=$('#sidebar'),overlay=$('#mobileOverlay');function closeMenu(){sidebar.classList.remove('open');overlay.classList.remove('show')};$('#menuToggle')?.addEventListener('click',()=>{sidebar.classList.toggle('open');overlay.classList.toggle('show')});overlay?.addEventListener('click',closeMenu);
$$('.nav-link').forEach(a=>a.addEventListener('click',()=>{ $$('.nav-link').forEach(x=>x.classList.remove('active'));a.classList.add('active');$('#crumb').textContent=a.dataset.nav.toUpperCase();closeMenu()}));
// 능력 입력법 (11번째 값): {gear:['주령기 이름: 설명'],power:['권능 이름: 설명']}
//  - 주령기가 없으면 gear 생략 / 협력영물은 power에 권능 2개 / 항목마다 ':' 뒤에 설명을 적음 (비워두면 상세 창에 '-')
const people=[
['director','관리국장','관리국장','해무진','관리국장 · 무상급','한국','불명','ISTJ · 1w9 · 질서악','무뚝뚝 · 유연성 제로 · 고독','출신지와 주령기, 권능 정보를 제외하고 그 어떤 정보도 기록되지 않았다. 들리는 소문에 의하면, 삼국시대 이전의 인물이라는 이야기도 존재.','검은 정장 · 흰 셔츠 · 흑단발 · 흑안 · 우안 실명 · 초장신 · 근육 · 수염',{gear:['용광검:용의 기운이 담긴 신검. 검신에 깃들어져있는 신성한 힘이 괴이의 삿된 기운을 완전 멸한다.'],power:['주야일천:태양이 떠있는 시간 동안 외부에서 가해지는 모든 물리적·초자연적 공격과 간섭을 무효화 할 수 있다.']},'a.png'],
['division1','제1대응단','제1대응단장','신서연','제1대응단장 · 천재급','한국','30','ESTJ · 1w2 · 질서선','인본주의 · 책임감 중시 · 당당 · 은근 여림','겉보기와 달리, 정이 많음. · 관리국 내부에서 평판이 좋음.','금발 웨이브 · 적안 · 글래머 · 흰 셔츠 · 검은 스커트 · 스타킹 · 하이힐',{gear:['청염칠선:푸르고 정명한 기운이 깃든 접부채. 펼쳐서 휘두르면 일곱 줄기의 푸른 불꽃을 일으킨다. 불꽃은 물질뿐만 아니라 괴이의 영체와 초자연적인 힘까지 태운다.'],power:['태극:음양의 조화를 바탕으로 불경스럽고 삿된 기운을 천천히 중화한다.']},'b.png'],
['division1','제1대응단','긴급구조과','최유건','긴급구조과장 · 대재급','한국','29','ESFJ · 2w1 · 중립선','유쾌 · 능글 · 활달 · 인본주의','종결과에 어울리는 능력이지만, 신념으로 인해 구조과에 자진 배속 · 성격 때문에 느슨해보이지만, 필요한 때에는 허술하지 않는 에이스 인력.','갈색 단발 · 청안 · 근육 · 장신 · 소매 걷은 흰 셔츠 · 검은 Y자 멜빵 · 슬랙스',{gear:['칠성칼:칼자루 끝에 방울이 달린 신령한 무속 칼 두자루. 물리적으로 베어낼 수 없는 영체나 형체가 불분명한 괴이를 베어낼 수 있다.'],power:['명경지수:외부에서 가해지는 정신 간섭과 환각, 공포 유발, 기억 조작 등 정신에 영향을 미치는 초자연적 현상을 스스로 정화할 수 있다.']},'g.png'],
['division1','제1대응단','위험종결과','류선','위험종결과장 · 대재급','한국','27','ISTJ · 1w9 · 질서악','반말 · 직설 · 짜증 · 츤데레','고위험 괴이의 봉인과 격리, 봉인지 안정화 작업을 전문적으로 담당 · 류연과 쌍둥이 자매(언니)','흑장발 · 적안 · 날카로운 인상 · 흰 셔츠 · 검은 재킷 · 검은 넥타이',{gear:['무한다면각체:끊임없이 움직이는 투명한 다면체. 주변 공간의 구조와 좌표를 자유롭게 뒤튼다. 이를 통해 눈앞의 장애물을 공간째 절단하거나 특정 구역을 분리할 수 있으며, 내부와 외부의 연결이 뒤틀린 비유클리드 공간을 형성 할 수 있다.'],power:['부동:사용자를 중심으로 반경 3m 이내의 초자연적 현상을 극도로 억제한다.']},'i.png'],
['division1','제1대응단','긴급구조과','류연','긴급구조과 요원 · 중재급','한국','27','ENTJ · 8w9 · 질서중립','무뚝뚝 · 인본주의','개인의 판단이나 감정보다 관리국의 현장 매뉴얼과 정해진 대응 절차를 최우선 · 류선과 쌍둥이 자매(동생)','흑색 포니테일 · 청안 · 거유 · 날카로운 인상 · 검은 셔츠 · 붉은 넥타이',{gear:['벽사포:벽사의 힘이 깃든 특수 리볼버로, 신성한 기운을 응축한 탄환을 발사한다. 탄환은 일반적인 물리적 충격뿐만 아니라 괴이의 영체와 비물질적인 형체에도 직접적인 타격을 가할 수 있다.']},'h.png'],
['division1','제1대응단','위험종결과','여천호','위험종결과 요원 · 대재급','중국','33','ESTP · 8w7 · 혼돈','열혈 · 호탕 · 단순무식 · 반말','고위험 괴이의 물리적 제압과 완전한 처치를 전문적으로 담당 · 강한 상대와의 전투를 즐기며, 신체 단련에 집착','적단발 · 적안 · 초장신 · 거구 · 근육 · 온몸 흉터 · 흰 셔츠 · 갈색 Y자 멜빵',{gear:['적철갑:붉은빛을 띠는 특수 금속으로 제작된 전투용 장갑이다. 착용자의 주먹에 실린 힘을 증폭하여 타격 순간에 강력한 충격파를 발생시키며, 공격에 가해진 물리적인 힘에 비례해 파괴력이 증가한다.']},'j.png'],
['division2','제2관리단','제2관리단장','범원제','제2관리단장 · 천재급','중국','35','ENTJ · 3w4 · 질서악','능청 · 유쾌  ·  속내 알 수 없음','상대의 심리와 약점을 교묘하게 파악하고 조종하여 자신의 의도대로 판단하도록 유도 · 모든 상황에서 실질적인 손익을 따지며, 자신의 이익과 조직의 효용을 우선적으로 고려','백단발 · 녹안 · 포마드 · 브라운 3피스 · 마른 근육',{gear:['금구설:기묘한 기운의 혀. 발화하는 말에 강제력을 부여한다. 사용자가 타깃을 향해 명령, 선언을 내리면 그 말에 초자연적인 구속력이 실리며, 대상은 발언의 내용에 따라 복종하거나 특정 행동을 금지당한다.'],power:['재맥감응:자신에게 이득이 되는 인력, 재물과 금전의 흐름을 감지할 수 있다.']},'c.png'],
['division2','제2관리단','사무처리과','린 슈위안','사무처리과장 · 소재급','중국','43','ISTP · 9w8 · 중립','나태 · 무심','수많은 사선을 넘겨온 경험과 본능적인 생존 감각으로 위험을 대수롭지 않게 여김. · 만성적인 피로에 시달리며, 대부분의 상황에서 무기력하고 지친 태도.','헝클어진 흑발 · 흑안 · 턱수염 · 구겨진 셔츠 · 느슨한 넥타이',{gear:['둔영전:오래된 녹슨 동전. 튕겨 허공에 던지면 사용자의 존재감을 은폐하는 효과를 발휘한다. 발동 후 약 1시간 동안 주변 존재들에게 사용자의 기척과 존재감이 희미해지며, 시각이나 청각을 비롯한 일반적인 감각으로 사용자를 인식하기 어려워진다.']},'k.png'],
['division2','제2관리단','사무처리과','이지연','사무처리과 사원 · 소재급','한국','26','ENFP · 1w2 · 혼돈선','겁 많음 · 순진무구 · 상냥','괴이에 맞서는 대응단 인력을  존경 · 괴이 관련 돌발 상황 대처에 미숙한 모습','연한 갈색 단발 · 갈안 · 흰 블라우스 · 베이지 가디건 · 남색 스커트 · 헤어핀',{gear:['정사주:깨끗하고 투명한 구슬. 구슬을 깨뜨리면 내부에 응축된 정화 기운이 방출된다. 방출된 기운은 일정 범위에 퍼져 삿된 기운과 괴이의 초자연적인 영향력을 일시적으로 억제한다.']},'l.png'],
['division2','제2관리단','인사지원과','모리카와 유키노','인사지원과장 · 중재급','일본','28','ISTJ · 8w9 · 질서악','냉소 · 직설 · 변수 혐오','정중을 유지하면서도 날카로운 비꼼과 독설로 상대의 허점 저격 · 불필요한 감정 소모를 싫어하며, 최소한의 자원으로 최대한의 성과 추구','회색 올림머리 · 자안 · 날카로운 눈매 · 흰 셔츠 · 베이지 재킷 · 하이힐 · 베이지 스커트',{gear:['현신지:특수한 영력이 깃든 종이 서류들. 여러 장의 종이가 공중으로 떠올라 칼날처럼 날카롭게 변하며, 사용자의 의지에 따라 지정된 대상을 추적하고 베어낸다. 베어낸 대상이나 사물에 관한 숨겨진 정보가 문자와 기록의 형태로 출력된다.']},'m.png'],
['division3','제3정보단','제3정보단장','아마노 호노카','제3정보단장 · 천재급','일본','30','INTJ · 5w6 · 중립','무감정 · 건조','상대의 눈빛과 호흡, 근육의 미세한 움직임까지 세밀하게 관찰하여 의도와 행동을 분석하는 습관 · 불필요한 말을 삼가며, 짧고 함축적인 선문답으로 답하는 경향','백장발 히메컷 · 유백안 · 흰 피부 · 슬랜더 · 동안 · 검은 하이넥 · 회색 재킷',{gear:['은목:불가사의한 기운이 감도는 눈. 일반적인 시각으로는 포착하기 어려운 미세한 움직임과 변화를 인식하여, 상대의 다음 행동을 파악한다.'],power:['전지:일주일에 단 한 번, 미래에 일어날 사건이나 아직 밝혀지지 않은 사실을 알 수 있지만, 얻은 정보를 직접적으로 발설할 수 없다는 제약이 존재한다.']},'d.png'],
['division3','제3정보단','연구개발과','즈 쉬안','연구개발과장 · 대재급','중국','28','INTJ · 5w4 · 중립악','음침 · 천재','엉뚱하고 섬뜩한 농담을 무심코 던지며, 주변을 의식하지 않고 혼잣말 습관 · 방대한 전문 지식과 비범한 분석력','헝클어진 흑장발 · 흐린 흑안 · 폭유 · 흰 가운',{gear:['영력공학 드론:영력공학 기술을 기반으로 제작된 무인 전투 드론.기체에 장착된 발사 장치를 통해 영력을 응축한 특수 탄환을 발사하며, 이를 통해 일반적인 탄환으로는 피해를 입히기 어려운 괴이의 육체와 영체를 공격할 수 있다.']},'n.png'],
['division3','제3정보단','연구개발과','장연우','연구개발과 연구원 · 중재급','한국','24','INFP · 9w1 · 중립선','찐따 · 소심 · 덤벙 · 여림','각종 소형 공구와 주머니에 넣고 다니며, 필요할 때 즉석에서 꺼내 활용 · 말을 끝까지 또렷하게 발음하지 않고 얼버무리거나 웅얼거리는 습관','헝클어진 금단발 · 호박색 눈 · 마른 체격 · 흰 가운',{gear:['AGB:절기와 시간의 흐름을 계산하여 영력을 방출하는 공학식 캐논. 계절의 변화와 천체의 운행, 시간대에 따른 영력의 흐름을 정밀하게 측정하고, 계산된 수치에 맞춰 내부에 축적된 영력을 탄환 형태로 압축해 발사한다.']},'o.png'],
['division3','제3정보단','조사분류과','유미래','조사분류과장 · 중재급','한국','28','ESTP · 8w7 · 혼돈선','시원 · 털털','상황을 가리지 않고 흡연하려는 습관 · 상대의 직급이나 지위에 관계없이 거친 말투 사용 · 위계와 권력을 앞세워 타인을 억압하는 태도 비선호','청단발 · 청회색 눈 · 다크서클 · 흰 셔츠 · 검은 넥타이 · 검은 슬랙스 · 담배',{gear:['청안은정:시원한 기운이 감도는 눈. 주변에 존재하는 삿된 기운과 비정상적인 영적 흔적을 시각적으로 포착한다. 또한, 특정 장소나 사물에 남겨진 저주, 주술의 흔적, 영적 오염 등을 감지할 수 있다.'],power:['무망:괴이가 만들어낸 환상이나 허상, 정신을 교란하는 시각적 기만을 간파하며, 시야를 가리거나 주변 환경을 왜곡하는 능력에도 정상적인 시각을 유지한다.']},'p.png'],
['audit','감사위원회','감사위원장','타카미야 소이치로','감사위원장 · 천재급','일본','57','INFJ · 1w9 · 질서선','정중 · 인자 · 강강약약','대립과 충돌을 최소화하고, 서로의 입장을 조율해 원만한 합의점을 찾는 것을 우선 · 진실을 숨기거나 왜곡하는 행위에 강한 반감','그레이 3피스 · 백발 · 금안 · 흰 수염 · 다부진 체격',{gear:['신명인:검은 옻칠로 마감된 인장. 진술서나 공식 기록에 인장을 찍으면 문서에 기재된 내용의 진위 여부를 판별하는 효과가 발동한다. 기록된 문장 중 거짓이 포함되어 있을 경우 해당 문장 위로 검은 연기가 피어오르며, 이를 통해 허위 진술이나 조작된 기록을 식별할 수 있다. '],power:['집행:사용자가 지닌 정의관에 어긋나는 행위를 저지른 대상을 상대로 초인적인 근력과 속도, 내구력이 비약적으로 상승한다.']},'e.png'],
['audit','감사위원회','감사위원회','토가미 카이토','부패수사관 · 중재급','일본','30','ESTJ · 1w2 · 중립','정중 · 냉소 · 불의 용납 불가','조직의 규정과 절차를 철저히 준수하며, 모든 업무를 정해진 원칙과 기준에 따라 처리 · 규정을 무시하거나 절차를 우회하는 행위를 용납하지 않으며, 원칙을 저버리는 태도에 강한 반감 ','검은 정장 · 흑발 포마드 · 흑안 · 마른 근육 · 안경',{gear:['정죄쇄:검은 사슬 형태의 팔찌. 사용자가 구속 대상으로 지정한 상대에게 검은 사슬을 뻗어 신체를 포박하며, 사슬은 대상의 움직임을 강제로 제한한다. 인간과 괴이를 구분하지 않고 구속할 수 있다.']},'f.png'],
['special','특수방위별원','협력영물','호연','협력영물(백호) · 천재급','한국','불명','ENTP · 7w8 · 혼돈중립','열혈 · 낙천 · 호전적','상대의 직급이나 지위에 관계없이 격식 없이 편한 반말을 사용 · 곰방대를 늘 지니고 다니며, 장소와 상황을 가리지 않고 습관적 흡연','백장발 · 금안 · 백호 귀와 꼬리 · 흰 개량 한복 · 곰방대',{power:['기호지세:산을 날려버릴 정도의 압도적인 신체 능력을 발휘한다.','호시탐탐:상대의 약점과 행동 양식을 간파하고, 이를 바탕으로 대상의 행동을 통제한다.']},'q.png'],
['special','특수방위별원','협력영물','황운','협력영물(황룡) · 천재급','중국','불명','ENTJ · 8w9 · 질서중립','오만 · 위엄 · 탐욕',' 타인을 자신보다 아래로 여기며, 여유롭고 오만한 태도 · 일상적인 대화에도 은유와 비유를 즐겨 사용하며, 시를 읊듯 함축적인 표현을 구사 ','금단발 · 금안 · 황금 용뿔 · 블랙 3피스 · 금 넥타이핀 · 손목시계',{power:['비룡승운:시전자를 둘러싼 우연과 확률의 흐름이 유리한 방향으로 고정되며, 발생 가능한 여러 결과 중 시전자에게 이로운 상황이 선택되도록 작용한다.','천하귀일:압도적인 위엄과 기세가 뿜어져 나오며, 그 영향권에 들어온 대상은 본능적인 공포와 압박감을 느끼게 된다. 대상의 의지와 기세를 억누르고 행동을 제한한다.']},'r.png'],
['special','특수방위별원','협력영물','사쿠야','협력영물(구미호) · 천재급','일본','불명','ENTP · 7w8 · 혼돈중립','요염 · 유혹 · 뻔뻔','상대를 깎아내리거나 조롱할 때 직설적인 비난보다 교묘한 비유와 풍자 · 진실과 거짓을 자연스럽게 뒤섞어 말하며, 상대가 사실관계를 쉽게 파악하지 못하도록 혼란을 유도','분홍 장발 · 적안 · 여우 귀 · 아홉 개 흰 꼬리 · 흰/붉은 기모노 · 금 칸자시',{power:['천연매심:보고 듣고 받아들이는 정보를 교란하여 실제와 다른 모습이나 상황을 진실처럼 인식하게 만든다.','구미환천:주변 공간과 사물, 물리적인 현상의 형태를 비정상적으로 뒤틀어 기존의 현실과 다른 상황을 만들어낸다.']},'s.png']
];
// ===== 캐릭터 카드 틀 (인물 기록 · 괴이 기록 공통) =====
const GRADE_MARK={'소재급':'材','중재급':'中','대재급':'大','천재급':'天','무상급':'無'};
const splitKw=s=>String(s==null?'':s).split(' · ').map(x=>x.trim()).filter(Boolean);
const escHtml=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function el(tag,cls,html){const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function parseAbility(t){const s=String(t||'').trim(),i=s.search(/[:：]/);return i<0?{name:s,desc:''}:{name:s.slice(0,i).trim(),desc:s.slice(i+1).trim()}}
function abilityGroups(gear,power){return [['주령기',gear],['권능',power]].map(([label,arr])=>({label,items:[].concat(arr||[]).filter(Boolean).map(parseAbility).filter(x=>x.name)})).filter(g=>g.items.length)}
function personView(p){
 const parts=p[4].split(' · ');const grade=parts.length>1?parts[parts.length-1]:'';const role=parts.length>1?parts.slice(0,-1).join(' · '):p[4];
 const age=/^\d+$/.test(p[6])?p[6]+'세':'나이 불명';const type=splitKw(p[7]);
 let ab=p[11];if(typeof ab==='string'){const n=splitKw(ab);ab=p[2]==='협력영물'?{power:n}:{gear:n.slice(0,1),power:n.slice(1)}}
 const abilities=abilityGroups((ab||{}).gear,(ab||{}).power);
 return {kind:'person',panel:'인물 상세 기록',unit:'인물',aff:p[1],role,name:p[3],grade,country:p[5],age,image:'images/characters/'+p[12],
  meta:[role,age,p[5]].join(' · '),leads:abilities.flatMap(g=>g.items.map(it=>it.name)),abilities,looks:splitKw(p[10]),traits:splitKw(p[8]),notes:splitKw(p[9]),type,tags:[type[0],type[2]].filter(Boolean)};
}
const dashIfEmpty=a=>a.length?a:['-'];
function anomalyView(a){
 const notes=splitKw(a.notes);let abilities=abilityGroups([],a.power);
 if(!abilities.length)abilities=[{label:'권능',items:[{name:'-',desc:''}]}];
 return {kind:'anomaly',panel:'괴이 상세 기록',unit:'괴이',aff:'네임드 괴이',name:a.name,grade:a.grade,country:a.country,image:a.image?'images/anomalies/'+a.image:'',
  meta:a.country,leads:abilities.flatMap(g=>g.items.map(it=>it.name)),abilities,notes,caution:dashIfEmpty(splitKw(a.caution)),response:dashIfEmpty(splitKw(a.response)),tags:dashIfEmpty(splitKw(a.keyword))};
}
function ccMedia(v,onFail){
 const emblem=()=>el('div','cc-emblem',escHtml(v.name.slice(0,1)));
 if(!v.image)return emblem();
 const img=new Image();img.className='cc-img';img.alt=v.name+' 이미지';img.loading='lazy';
 img.onerror=()=>{img.replaceWith(emblem());if(onFail)onFail()};img.src=v.image;return img;
}
function buildCard(v){
 const card=el('article','cc-card');card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label',v.name+' 상세 기록 열기');card._cc=v;
 const thumb=el('div','cc-thumb');thumb.append(ccMedia(v));
 const top=v.grade==='천재급'||v.grade==='무상급';
 const body=el('div','cc-body',
  `<div class="cc-top"><span class="cc-aff">${escHtml(v.aff)}</span><span class="cc-badge${top?' is-top':''}" title="${escHtml(v.grade)}">${escHtml(GRADE_MARK[v.grade]||'')}</span></div>`+
  `<h5 class="cc-name">${escHtml(v.name)}</h5><p class="cc-meta">${escHtml(v.meta)}</p>`+
  (v.leads.length?`<div class="cc-leads">${v.leads.map(x=>`<p class="cc-lead"><span>${escHtml(x)}</span></p>`).join('')}</div>`:'')+
  (v.tags.length?`<div class="cc-foot">${v.tags.map(t=>`<span class="cc-tag">${escHtml(t)}</span>`).join('')}</div>`:''));
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
const kwList=a=>`<ul class="cc-list">${a.map(x=>`<li${x==='-'?' class="is-empty"':''}>${escHtml(x)}</li>`).join('')}</ul>`;
const kwChips=a=>`<div class="cc-chips">${a.map(x=>`<span>${escHtml(x)}</span>`).join('')}</div>`;
const ccSec=(title,arr,fn)=>arr&&arr.length?`<section class="cc-sec"><h3>${title}</h3>${fn(arr)}</section>`:'';
function renderCc(){
 const card=ccItems[ccIdx],v=card._cc,m=ccEnsure(),box=$('.cc-scroll',m);
 $('.cc-kind',m).textContent=v.panel;
 const isP=v.kind==='person';
 const head=`<div class="cc-title-row"><div><div class="cc-aff-line">${escHtml(isP?v.aff+' · '+v.role:v.aff)}</div><h2>${escHtml(v.name)}</h2><p class="cc-meta">${escHtml(isP?v.country+' · '+v.age:v.country)}</p></div><div class="cc-big-grade"><b>${escHtml(GRADE_MARK[v.grade]||'')}</b><small>${escHtml(v.grade)}</small></div></div>`;
 const cap=v.image?`<div class="cc-figcap"><span>${isP?'인물':'괴이'} 이미지</span><a href="${escHtml(v.image)}" target="_blank" rel="noopener">원본 이미지 ↗</a></div>`:'';
 const feat=v.abilities.length?`<div class="cc-feature">${v.abilities.map(g=>`<div class="cc-ability"><small>${g.label}</small>${g.items.map(it=>`<div class="cc-ability-item"><strong>${escHtml(it.name)}</strong><p${it.desc?'':' class="is-empty"'}>${it.desc?escHtml(it.desc):'-'}</p></div>`).join('')}</div>`).join('')}</div>`:'';
 const secs=isP?ccSec('외형',v.looks,kwList)+ccSec('성격',v.traits,kwChips)+ccSec('특징과 이야기',v.notes,kwList)+ccSec('성향 분류',v.type,kwChips):ccSec('특징과 이야기',v.notes,kwList)+ccSec('주의',v.caution,kwList)+ccSec('대응',v.response,kwList);
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
// 이미지: images/anomalies/ 폴더에 파일을 넣고 image에 파일명 입력 (비워두면 인장형 대체 화면)
// 능력: power:'권능 이름: 설명' (괴이는 권능 하나) / 특징과 이야기: notes (여러 개는 ' · '로 구분)
// 카드 키워드: keyword (여러 개는 ' · '로 구분) / 주의: caution / 대응: response (여러 줄은 ' · '로 구분) — 비워두면 '-'
const anomalies=[
 {grade:'소재급',name:'수살귀',country:'한국',image:'t.png',power:'현혹:대상의 시각과 청각을 교란하여 환각에 빠뜨린 뒤, 마치 누군가 자신을 부르는 것처럼 착각하게 만들어 물가로 유인한다. 환각에 사로잡힌 대상은 주변 상황을 제대로 인식하지 못한 채 물속으로 걸어 들어가며, 결국 익사에 이르게 된다.',notes:'한국의 강, 바다, 호수등의 물가에서 출몰 · 익사한 원혼과 물의 차갑고 어두운 기운이 합쳐져 생겨난 괴이',keyword:'"물에 들어가지 말라고 몇 번을 말하냐?"',caution:'습기가 많은 장소나 물가 주변에서는 출현 가능성이 높으므로 가급적 접근을 피해야 한다. 대응 시 반드시 2인 이상이 동행해야 하며, 환각에 노출된 인원이 발생하면 다른 인원이 즉시 상태를 확인해야 한다. 괴이와의 직접적인 접촉은 엄금하며, 어떠한 상황에서도 물속으로 진입해서는 안 된다.',response:'괴이의 근원인 원혼의 한을 풀어주어 성불시키거나, 원혼 자체를 완전히 소멸시키는 방식으로 대응한다.'},
 {grade:'소재급',name:'부속귀',country:'중국',image:'u.png',power:'저주:타깃을 지정해 저주를 부여하며, 저주에 걸린 대상에게 각종 불행과 사고가 연이어 발생한다. 주변 사물이 갑자기 떨어지거나 구조물이 무너지는 등 우연을 가장한 위험이 발생한다. 또한 타깃에게 신경과민 및 불안, 짜증을 유발한다.',notes:'중국 가정집에서 주로 출몰 · 물건에 응집된 원한과 부정적인 감정이 뒤섞여 생겨난 괴이',keyword:'"화분이 머리 위로 떨어졌다고? 오늘 산 복권 다 버려라."',caution:'좁거나 낙하물이 발생하기 쉬운 장소는 피해야 한다. 저주의 영향으로 천장 구조물이나 주변 물체가 갑자기 떨어질 수 있으므로 개방된 공간에서 대응하는 것이 권장된다.',response:'부속귀가 깃든 물건을 물리적으로 완전히 파괴하거나, 물건과 분리된 부속귀의 영체 자체를 소멸시키는 방식으로 대응한다.'},
 {grade:'중재급',name:'서투른 장례지도사',country:'한국',image:'v.png',power:'장례:대상의 모습이 거울에 비치는 순간 발동. 거울 속으로 대상을 강제로 끌어들인다. 거울 안쪽은 현실과 분리된 독립적인 공간으로, 진입한 대상은 외부와의 접촉이 차단되고 스스로 탈출하기 어렵다. 거울 내부에 갇힌 대상은 3일 뒤, 죽는다.',notes:'한국의 폐장례식장에서 출몰 · 부속귀가 한국으로 넘어와, 다른 형태로 변형 됨.',keyword:'"거울 속이 이상해도, 절대 확인하려 하지마."',caution:'어떠한 상황에서도 거울을 정면으로 응시하거나 자신의 모습이 비치는지 확인하려 해서는 안 된다. 거울 주변에서 활동할 경우 반사면을 가리거나 시야에서 차단하는 것이 권장된다.',response:'괴이의 근원인 부속귀가 깃든 거울을 물리적으로 완전히 파괴하거나, 거울과 연결된 부속귀의 영체 자체를 소멸시켜야 한다.'},
 {grade:'중재급',name:'상상친구',country:'일본',image:'w.png',power:'구면지인: 대상에게 자신이 오래전부터 알고 지낸 친밀한 친구라는 착각을 심는다. 대상은 괴이를 낯선 존재가 아닌 오랜 추억과 유대감을 공유한 지인으로 인식하며, 괴이가 건네는 말과 행동을 자연스럽게 받아들이게 된다. 최종적으로 기존의 정체성과 자아에 대한 확신마저 무너뜨린다.',notes:'일본 전역의 히키코모리 가정에서 출몰 · 실체가 없는 인지형 괴이. 전염 가능성이 존재한다.',keyword:'"십 년 지기 동료가 괴이였어요."',caution:'괴이의 접근 여부와 관계없이 주변의 누구도 무조건 신뢰해서는 안 된다. 동료나 가족처럼 보이는 인물이라도 반드시 사전에 정해둔 암구호를 통해 신원을 확인해야 한다. 특히 괴이와 장시간 대화하거나 개인적인 기억과 과거에 관한 이야기를 나누는 행위는 피해야 한다.',response:'인지 잠식이 시작된 시점부터 대상의 기존 기억을 소거하여 괴이가 심어놓은 가짜 기억과 정체성을 제거한다.'},
 {grade:'대재급',name:'광조',country:'한국',image:'x.png',power:'역천술:천명과 자연의 섭리를 거스르고, 죽은 자를 강제로 되살리는 금단의 주술. 이미 육체가 썩거나 영혼이 소멸한 존재조차 강제로 현세에 불러들이며, 되살아난 자는 생전의 모습과 기억 일부를 지닌 언데드로 활동한다. 주로 자신을 따랐던 조선의 군사들을 되살려 언데드 군대로 형성한다.',notes:'한국의 버려진 왕릉에서 출몰 · 사특한 주술에 빠져, 조선왕조실록에서 조차 지워졌음. 역천술로 부활한 언데드 괴이',keyword:'"사관이 실록에서 지운 이유를 알겠네."',caution:'시해당한 중전과 관련된 이야기는 절대 언급 금지. 해당 주제는 광조의 집착과 분노를 자극하는 핵심 요소로, 이를 건드릴 경우 무차별적인 공격이나 역천술의 폭주로 이어질 수 있다. 또한 왕릉 주변에 언데드가 지속적으로 출현하거나 활동 영역이 확장되는지 상시 확인해야 한다.',response:'가장 우선되는 대응은 원한과 집착의 근원을 파악하고, 원혼의 한을 풀어주는 것이다.교섭이 불가능하거나 주술의 확산을 막을 수 없는 경우에는 광조의 육체와 영혼을 완전히 소멸시켜야 한다.'},
 {grade:'대재급',name:'진혼촌인',country:'중국',image:'y.png',power:'동조:괴이와 접촉하거나 해당 마을 주민들과 장시간 교류할수록 대상의 기억과 인식이 서로 동기화되는 현상.동조가 깊어질수록 개인의 기억과 판단 기준이 점차 뒤섞이기 시작한다. 이 과정에서 개인 고유의 가치관과 정체성은 서서히 희미해지며, 자신의 생각과 타인의 생각을 구분하는 능력마저 상실한다. 최종 단계에 이르면 개인으로서의 자아가 완전히 소실되고, 마을 전체를 구성하는 하나의 집단의식에 편입된다.',notes:'중국 산시성 인근 깊은산 속 마을(진혼촌)에서 상주 · 과거 진나라의 일상과 생활양식을 반복하며, 주민 개개인의 자아가 집단의식에 종속되어 있음',keyword:'"저 마을 사람들 전부 가족처럼 친절하다고? 아서라, 가족보다 더 가까워지기 전에."',caution:'해당 마을에 장시간 체류하는 행위는 엄격히 금지된다. 주민들과의 대화나 신체 접촉 역시 필요한 최소한으로 제한해야 하며, 조사 과정에서 불필요한 친밀감 형성이나 지속적인 교류를 피해야 한다.',response:'가장 확실한 대응은 마을 전체를 물리적으로 파괴하여 집단의식이 유지될 기반 자체를 제거하는 것이다. 물리적 파괴가 불가능하거나 주민들을 보존해야 할 필요성이 있다면, 대규모 봉인 절차를 진행해야 한다.'},
 {grade:'천재급',name:'아귀불',country:'중국',image:'z.png',power:'탐(貪):검게 썩은 살점과 촉수가 육체 전반에 걸쳐 끊임없이 증식하는 현상. 증식한 촉수는 주변의 생물과 무생물을 가리지 않고 포식하며, 포식 범위에 들어온 대상을 붙잡아 육체 내부로 끌어들이거나 분해한다. 이 행위를 지켜보는 이들은 극도의 굶주림을 느끼게 된다.',notes:'중국의 폐사찰에서 출몰 · 부처가 승천하기전 남긴 번뇌 중 탐욕이 모여 현현한 괴이',keyword:'"대응 매뉴얼에 마운자로나 위고비 처방 추가 어때?"',caution:'증식한 촉수와의 직접적인 접촉은 엄격히 금지한다. 특정 범위내에서는 극심한 허기 증상이 발생하여, 이성을 잃을 수 있으므로, 범위를 지속적으로 확인하며 원거리를 유지해야 한다.',response:'개체의 활동을 완전히 종결하기 위해서는 괴이의 육신 전체를 완전히 파괴하거나 봉인을 시행해야 한다.'},
 {grade:'천재급',name:'13번째 구세주',country:'한국',image:'ab.png',power:'간증기도:대상의 소원을 듣고 이를 실현하는 기도 형태. 대상이 품은 소망을 감지하고, 마치 신의 응답이라도 받은 것처럼 소원을 실제 현실에 구현한다. 그러나 그 결과는 결코 대상이 바랐던 모습 그대로 이루어지지 않는다.',notes:'한국의 폐성당에서 출몰 · 정체를 알 수없는 악신 검은 목자를 숭배하는 광신도적 괴이.',keyword:'"주식 강제 청산 당한 사람 거수. 오케이, 넌 오늘 현장투입에서 제외."',caution:'개체가 소원을 묻거나 기도를 권유하더라도 절대로 응답해서는 안 된다. 농담이나 가벼운 바람, 무심코 내뱉은 희망 사항 역시 소원으로 받아들여질 가능성이 있으므로 현장에서는 불필요한 대화를 삼가야 한다.',response:'우선 폐성당 내부에 존재하는 신앙상징물을 찾아 파괴하여 개체가 의지하는 숭배의 기반을 제거해야 한다. 이후 본체를 제압하고 목을 절단하여 활동을 완전히 종결한다.'},
 {grade:'천재급',name:'츠쿠모가미',country:'일본',image:'aa.png',power:'동화의 법:주변에 존재하는 인간의 육체를 흡수하여 자신의 일부로 편입시킨다. 권능이 발현되면 개체의 살덩어리가 주변으로 뻗어 나가 대상을 덮치며, 접촉한 인간의 신체를 점진적으로 흡수한다. 흡수된 대상은 기존의 육체를 잃고 개체의 일부가 되지만, 그 과정에서도 기억과 의식, 자아는 소멸하지 않는다.',notes:'일본 폐신사에서 출몰 · 일본으로 넘어온 부속귀가 오랜시간 동안 간섭받지 않고 진화',keyword:'"이어플러그 쓰세요. 정신 간섭 능력은 없지만, 괴이의 소리를 들으면 판단이 흔들립니다."',caution:'개체 내부에서 들려오는 구조 요청에 절대로 반응하거나 접근해서는 안 된다. 흡수된 인간의 목소리와 비명은 실제 의식을 가진 피해자에게서 비롯된 것이지만, 이를 구출하려는 시도는 오히려 추가적인 흡수 피해로 이어질 수 있다. 개체의 육체와 직접 접촉하는 행위 역시 엄격히 금지한다.',response:'괴이의 뿌리는 결국 부속귀이기에, 완전한 종결을 위해서 살점 내부에 귀속된 근원을 찾아 파괴해야 한다.'},
 {grade:'무상급',name:'무명',country:'한국',image:'ac.png',power:'무아합일:인류 전체의 개별적인 자아와 의식을 하나의 단일한 의식으로 통합한다. 발현이 시작되면 인간 개개인이 지니고 있던 기억과 감정, 의지, 가치관, 정체성 사이의 경계가 점차 희미해지며, 서로 다른 사람의 정신이 하나의 거대한 의식으로 융합되기 시작한다.단순한 정신 지배나 기억 조작과는 차원이 다른 현상으로, 인간이라는 종의 존재 방식을 근본적으로 뒤바꾸는 재앙에 해당된다.',notes:'한국 태백산의 어느 곳에 봉인 · 한반도에 고조선이 건립되기 이전부터 존재해온 태고의 괴이',keyword:'SYSTEM ERROR // 0x000?@0@!&%₩~€£인류는역천을섬기다승천은불령해탈아아두려운0817191',caution:'현재 개체가 봉인된 태백산 봉인지에 대한 접근과 훼손은 가능한 한 피해야 한다.',response:'현재까지 해당 개체를 상대로 유효하다고 입증된 처치·무력화 수단은 존재하지 않는다.따라서 현시점에서는 기존 봉인을 유지하고, 봉인지의 안정성을 지속적으로 감시하는 것 외에 확립된 대응 방안이 없다.'}
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
