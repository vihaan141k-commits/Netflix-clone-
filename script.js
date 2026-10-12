const titles = [
  {id:1,title:"Dune: Part Two",year:2024,rating:"13+",genre:"Sci-Fi",description:"Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",poster:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",backdrop:"https://image.tmdb.org/t/p/original/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg",row:"trending"},
  {id:2,title:"Stranger Things",year:2025,rating:"16+",genre:"Sci-Fi",description:"A group of friends uncover a strange mystery in their small town, where another world may be closer than anyone imagines.",poster:"https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfECg8XqH3iJf.jpg",row:"trending"},
  {id:3,title:"The Batman",year:2022,rating:"16+",genre:"Action",description:"In his second year of fighting crime, Batman uncovers corruption in Gotham City and follows a trail of clues left by a mysterious killer.",poster:"https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",row:"trending"},
  {id:4,title:"Wednesday",year:2022,rating:"13+",genre:"Mystery",description:"Wednesday Addams navigates a new school, new friendships, and a supernatural mystery that reaches deep into her family's past.",poster:"https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",row:"trending"},
  {id:5,title:"The Queen's Gambit",year:2020,rating:"16+",genre:"Drama",description:"An orphaned chess prodigy fights personal struggles while climbing the ranks of the competitive chess world.",poster:"https://image.tmdb.org/t/p/w500/2EPN9j9q4y3zV7a9J2p3Y9vYw1Q.jpg",row:"trending"},
  {id:6,title:"Avatar: The Way of Water",year:2022,rating:"13+",genre:"Adventure",description:"Jake Sully and Neytiri do everything they can to keep their family safe as a new threat arrives on Pandora.",poster:"https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",row:"popular"},
  {id:7,title:"The Night Agent",year:2023,rating:"16+",genre:"Thriller",description:"A low-level FBI agent answers a call that plunges him into a dangerous conspiracy at the heart of government.",poster:"https://image.tmdb.org/t/p/w500/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",row:"popular"},
  {id:8,title:"Enola Holmes",year:2020,rating:"13+",genre:"Mystery",description:"The brilliant younger sister of Sherlock Holmes takes on her own case and discovers that the biggest mystery may be herself.",poster:"https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",row:"popular"},
  {id:9,title:"The Gray Man",year:2022,rating:"16+",genre:"Action",description:"When a shadowy CIA agent uncovers secrets, a ruthless operative puts a bounty on his head and sparks a global chase.",poster:"https://image.tmdb.org/t/p/w500/8cXbitsS6dWQ5gfMTZdorpAAzEH.jpg",row:"popular"},
  {id:10,title:"Lupin",year:2021,rating:"16+",genre:"Crime",description:"Inspired by the adventures of Arsène Lupin, a gentleman thief sets out to avenge his father against a wealthy family.",poster:"https://image.tmdb.org/t/p/w500/sgxawbFB5Vi5OkPWQLNfl3dvkNJ.jpg",row:"popular"},
  {id:11,title:"Interstellar",year:2014,rating:"13+",genre:"Sci-Fi",description:"A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.",poster:"https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",row:"sciFi"},
  {id:12,title:"Spider-Man: Across the Spider-Verse",year:2023,rating:"10+",genre:"Sci-Fi",description:"Miles Morales swings into the multiverse and meets a team of Spider-People charged with protecting its existence.",poster:"https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",row:"sciFi"},
  {id:13,title:"Ready Player One",year:2018,rating:"13+",genre:"Sci-Fi",description:"In a future obsessed with virtual reality, a young gamer races to solve a digital treasure hunt that could change the world.",poster:"https://image.tmdb.org/t/p/w500/pU1ULUq8D3iRxl1fdX2lZ8E0w9S.jpg",row:"sciFi"},
  {id:14,title:"The Adam Project",year:2022,rating:"13+",genre:"Sci-Fi",description:"A time-travelling pilot teams up with his younger self to confront the past and save the future.",poster:"https://image.tmdb.org/t/p/w500/wFjboE0aFZNbvo6m9Yq3vcWcV7s.jpg",row:"sciFi"},
  {id:15,title:"Black Mirror",year:2023,rating:"18+",genre:"Sci-Fi",description:"A collection of thought-provoking stories exploring the unsettling side of technology and modern life.",poster:"https://image.tmdb.org/t/p/w500/7PRddO7z7mcPi21nZTCMGShAyy1.jpg",row:"sciFi"}
];

const rowIds = {trending:"trendingRow",popular:"popularRow",sciFi:"sciFiRow"};
const list = new Set(JSON.parse(localStorage.getItem("streamflixMyList") || "[]"));
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
let currentTitle = null;
let toastTimer;

function safeImage(url) { return url && url.includes("tmdb.org") ? url : ""; }
function cardMarkup(item) {
  const saved = list.has(item.id);
  return `<article class="poster-card" tabindex="0" role="button" aria-label="View ${item.title}" data-id="${item.id}">
    <img src="${safeImage(item.poster)}" alt="${item.title} poster" loading="lazy" onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(145deg,#333,#111)'">
    <div class="poster-gradient"></div>
    <div class="poster-info"><div class="poster-actions">
      <button class="poster-action" data-action="play" data-id="${item.id}" aria-label="Play ${item.title}">▶</button>
      <button class="poster-action secondary" data-action="list" data-id="${item.id}" aria-label="${saved?'Remove from':'Add to'} My List">${saved?'✓':'＋'}</button>
      <button class="poster-action secondary" data-action="info" data-id="${item.id}" aria-label="More info about ${item.title}">ⓘ</button>
    </div><p class="poster-title">${item.title}</p><div class="poster-meta"><span class="match">98% Match</span><span>${item.year}</span><span class="rating">${item.rating}</span></div></div>
  </article>`;
}
function renderRows(filter = "") {
  const normalized = filter.trim().toLowerCase();
  const filtered = titles.filter(t => !normalized || `${t.title} ${t.genre} ${t.year} ${t.description}`.toLowerCase().includes(normalized));
  Object.entries(rowIds).forEach(([key,id]) => {
    const row = document.getElementById(id);
    const items = filtered.filter(t => t.row === key);
    row.innerHTML = items.map(cardMarkup).join("");
    row.closest(".section-heading").hidden = items.length === 0;
    row.hidden = items.length === 0;
  });
  const saved = titles.filter(t => list.has(t.id) && (!normalized || `${t.title} ${t.genre}`.toLowerCase().includes(normalized)));
  $("#myListRow").innerHTML = saved.map(cardMarkup).join("");
  $("#emptyList").hidden = saved.length > 0;
  $("#myListRow").hidden = saved.length === 0;
  $("#noResults").hidden = !normalized || filtered.length > 0;
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function toggleList(id) {
  const item = titles.find(t => t.id === Number(id));
  if (!item) return;
  if (list.has(item.id)) { list.delete(item.id); showToast(`Removed "${item.title}" from My List`); }
  else { list.add(item.id); showToast(`Added "${item.title}" to My List`); }
  localStorage.setItem("streamflixMyList", JSON.stringify([...list]));
  renderRows($("#searchInput").value);
  if (currentTitle?.id === item.id) $("#modalAdd").textContent = list.has(item.id) ? "✓" : "＋";
}
function openModal(item) {
  if (!item) return;
  currentTitle = item;
  $("#modalTitle").textContent = item.title;
  $("#modalDescription").textContent = item.description;
  $("#modalMeta").innerHTML = `<span class="match">98% Match</span><span>${item.year}</span><span class="rating">${item.rating}</span><span>${item.genre}</span>`;
  $("#modalArt").style.backgroundImage = `linear-gradient(90deg,rgba(0,0,0,.25),transparent),url("${item.backdrop || item.poster}")`;
  $("#modalAdd").textContent = list.has(item.id) ? "✓" : "＋";
  $("#titleModal").hidden = false;
  document.body.style.overflow = "hidden";
}
function closeModal() {
  $("#titleModal").hidden = true;
  document.body.style.overflow = "";
}
function playTitle(item) {
  if (!item) return;
  showToast(`Preview selected: ${item.title} — streaming playback isn't connected in this demo.`);
}
document.addEventListener("click", event => {
  const action = event.target.closest("[data-action]");
  if (action) {
    event.stopPropagation();
    const item = titles.find(t => t.id === Number(action.dataset.id));
    if (action.dataset.action === "list") toggleList(action.dataset.id);
    if (action.dataset.action === "info") openModal(item);
    if (action.dataset.action === "play") playTitle(item);
    return;
  }
  const card = event.target.closest(".poster-card");
  if (card) openModal(titles.find(t => t.id === Number(card.dataset.id)));
  if (event.target.matches("[data-close='true']")) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".poster-card")) {
    event.preventDefault();
    openModal(titles.find(t => t.id === Number(event.target.dataset.id)));
  }
});
$$(".arrow-btn").forEach(button => button.addEventListener("click", () => {
  const row = document.getElementById(button.dataset.target);
  row.scrollBy({left: Number(button.dataset.scroll) * Math.max(300, row.clientWidth * .8), behavior:"smooth"});
}));
$("#searchInput").addEventListener("input", event => renderRows(event.target.value));
$("#playFeatured").addEventListener("click", () => showToast("Featured preview selected — add a video source to enable playback."));
$("#moreInfo").addEventListener("click", () => openModal({id:0,title:"The Last Frontier",year:2026,rating:"16+",genre:"Drama · Thriller",description:"At the edge of the known world, one decision can change everything. A gripping story of survival, secrets, and the people who refuse to give up.",poster:"",backdrop:"https://image.tmdb.org/t/p/original/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg"}));
$("#modalPlay").addEventListener("click", () => playTitle(currentTitle));
$("#modalAdd").addEventListener("click", () => { if (currentTitle?.id) toggleList(currentTitle.id); else showToast("Featured title selected."); });
$("#notificationsBtn").addEventListener("click", () => showToast("You're all caught up! No new notifications."));
$("#profileBtn").addEventListener("click", () => showToast("Profile: StreamFlix Guest"));
window.addEventListener("scroll", () => $("#navbar").classList.toggle("scrolled", window.scrollY > 30));
renderRows();
