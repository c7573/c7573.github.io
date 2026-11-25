const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

function updateClock(){
  const now = new Date();
  $('#clock').textContent = [now.getHours(),now.getMinutes(),now.getSeconds()].map(v=>String(v).padStart(2,'0')).join(':');
}
updateClock(); setInterval(updateClock,1000);

const sidebar = $('#sidebar'), overlay = $('#mobileOverlay');
function closeMenu(){sidebar.classList.remove('open');overlay.classList.remove('show')}
$('#menuToggle').addEventListener('click',()=>{sidebar.classList.toggle('open');overlay.classList.toggle('show')});
overlay.addEventListener('click',closeMenu);
$$('.nav-link').forEach(link=>link.addEventListener('click',()=>{
  $$('.nav-link').forEach(a=>a.classList.remove('active'));
  link.classList.add('active');
  $('#crumb').textContent = link.dataset.nav.toUpperCase();
  closeMenu();
}));

const search = $('#docSearch');
let activeFilter = 'all';
function filterRecords(){
  const term = search.value.trim().toLowerCase();
  let count = 0;
  $$('.record-card').forEach(card=>{
    const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
    const haystack = (card.dataset.search + ' ' + card.innerText).toLowerCase();
    const matchesText = !term || haystack.includes(term);
    const show = matchesCategory && matchesText;
    card.hidden = !show;
    if(show) count++;
  });
  $('#resultCount').textContent = count;
  $('#emptyState').hidden = count !== 0;
}
search.addEventListener('input',filterRecords);
$$('.filter-btn').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); activeFilter = btn.dataset.filter; filterRecords();
}));
$$('.record-open').forEach(btn=>btn.addEventListener('click',()=>{
  const target = document.getElementById(btn.dataset.target);
  if(target){target.open = true; target.scrollIntoView({behavior:'smooth',block:'center'});}
}));

// Highlight the current navigation section while scrolling.
const sections = ['home','organization','response','phenomena','personnel'].map(id=>document.getElementById(id)).filter(Boolean);
const observer = new IntersectionObserver(entries=>{
  const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
  if(!visible) return;
  const id = visible.target.id;
  $$('.nav-link').forEach(a=>a.classList.toggle('active',a.dataset.nav===id));
  $('#crumb').textContent = id.toUpperCase();
},{rootMargin:'-20% 0px -65% 0px',threshold:[0,.15,.35]});
sections.forEach(section=>observer.observe(section));
