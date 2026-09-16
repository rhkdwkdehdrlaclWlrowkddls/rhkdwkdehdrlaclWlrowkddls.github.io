const S = window.SITE;
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const user = S.githubUsername;
const hasUser = user && user !== "your-username";

const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c",
  Java: "#b07219", "C++": "#f34b7d", C: "#555555", Go: "#00ADD8", Rust: "#dea584", Kotlin: "#A97BFF",
  Swift: "#F05138", Markdown: "#083fa1", Shell: "#89e051", Dart: "#00B4AB", Vue: "#41b883",
};
const langTag = (lang) => lang
  ? `<span class="lang"><span class="dot" style="background:${LANG_COLORS[lang] || "#8b949e"}"></span>${esc(lang)}</span>` : "";

/* ---------- Profile ---------- */
document.title = `${S.name} · Home`;
$("topName").textContent = hasUser ? user : S.name;
$("name").textContent = S.name;
$("username").textContent = hasUser ? user : "";
$("bio").textContent = S.bio;
$("status").textContent = S.status || "";
$("readme").innerHTML = S.readme;
$("readmePath").textContent = hasUser ? user : "home";
$("footName").textContent = S.name;
$("year").textContent = new Date().getFullYear();

const avatar = $("avatar");
avatar.src = hasUser ? `https://github.com/${user}.png`
  : `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#238636"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-size="44" fill="#fff" font-family="sans-serif">${esc(S.name.slice(0, 1))}</text></svg>`)}`;

const follow = $("followBtn");
if (hasUser) follow.href = `https://github.com/${user}`; else follow.style.display = "none";

const metaItems = [
  S.location && `📍 ${esc(S.location)}`,
  S.email && `✉️ <a href="mailto:${esc(S.email)}">${esc(S.email)}</a>`,
  S.website && `🔗 <a href="${esc(S.website)}" target="_blank" rel="noopener">${esc(S.website)}</a>`,
  hasUser && `🐙 <a href="https://github.com/${esc(user)}" target="_blank" rel="noopener">github.com/${esc(user)}</a>`,
].filter(Boolean).map((x) => `<li>${x}</li>`).join("");
$("meta").innerHTML = metaItems;
$("contact").innerHTML = metaItems;
$("skills").innerHTML = S.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join("");

/* ---------- Pinned ---------- */
$("pinned").innerHTML = S.pinned.map((p) => `
  <div class="box card">
    <div class="card-title">📘 <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a><span class="badge">Public</span></div>
    <p>${esc(p.desc)}</p>
    ${langTag(p.lang)}
  </div>`).join("");

/* ---------- Activity graph (장식용 잔디 — 실제 기여 기록 아님) ---------- */
(function drawGraph() {
  const days = 53 * 7;
  const today = new Date();
  const start = new Date(today); start.setDate(today.getDate() - days + 1 + (6 - today.getDay()));
  let seed = [...(user + S.name)].reduce((a, c) => a + c.charCodeAt(0), 7);
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  let html = "";
  for (let i = 0; i < days; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    if (d > today) { html += `<i style="visibility:hidden"></i>`; continue; }
    const r = rand();
    const lvl = r < 0.45 ? 0 : r < 0.7 ? 1 : r < 0.85 ? 2 : r < 0.95 ? 3 : 4;
    html += `<i class="l${lvl}" title="${d.toISOString().slice(0, 10)}"></i>`;
  }
  $("graph").innerHTML = html;
})();

/* ---------- Repositories (GitHub API) ---------- */
let repos = [];
function renderRepos(q = "") {
  const list = repos.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  $("repoList").innerHTML = list.length ? list.map((r) => `
    <li>
      <div class="card-title"><a href="${esc(r.html_url)}" target="_blank" rel="noopener">${esc(r.name)}</a><span class="badge" style="margin-left:0">${r.fork ? "Fork" : "Public"}</span></div>
      ${r.description ? `<p>${esc(r.description)}</p>` : ""}
      <div class="repo-info">
        ${langTag(r.language)}
        ${r.stargazers_count ? `<span>⭐ ${r.stargazers_count}</span>` : ""}
        <span>Updated ${new Date(r.pushed_at).toLocaleDateString("ko-KR")}</span>
      </div>
    </li>`).join("") : `<li class="empty">레포지토리가 없습니다.</li>`;
}

if (hasUser) {
  fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=pushed`)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => { repos = data; $("repoCount").textContent = data.length; renderRepos(); })
    .catch(() => { $("repoList").innerHTML = `<li class="empty">레포지토리를 불러오지 못했어요.</li>`; });
} else {
  $("repoList").innerHTML = `<li class="empty">config.js 에서 githubUsername 을 설정하면 레포 목록이 표시됩니다.</li>`;
}
$("repoSearch").addEventListener("input", (e) => renderRepos(e.target.value));

/* ---------- Tabs ---------- */
function showTab() {
  const name = location.hash.slice(1) || "overview";
  if (!$(`panel-${name}`)) return;
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === name));
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${name}`));
}
window.addEventListener("hashchange", showTab);
showTab();

/* ---------- Theme ---------- */
const root = document.documentElement;
const btn = $("themeToggle");
function setTheme(t) {
  root.dataset.theme = t; btn.textContent = t === "dark" ? "🌙" : "☀️";
  try { localStorage.setItem("theme", t); } catch {}
}
let saved; try { saved = localStorage.getItem("theme"); } catch {}
setTheme(saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
btn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));
