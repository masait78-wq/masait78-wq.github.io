const FILMS = [
  {
    slug: "the-last-thread-of-night",
    title: "The Last Thread of Night",
    still: "films/the-last-thread-of-night.jpg",
    logline: "The last minute of night over Haifa, held by a single thread of light.",
    format: "Visual poem · 9:16",
    year: 2026,
  },
  {
    slug: "morning-in-a-drop",
    title: "Morning in a Drop",
    still: "films/morning-in-a-drop.jpg",
    logline: "Sometimes the whole sunrise fits inside a single drop.",
    format: "Visual poem · 9:16",
    year: 2026,
  },
  {
    slug: "the-giant-in-the-shadow",
    title: "The Giant in the Shadow",
    still: "films/the-giant-in-the-shadow.jpg",
    logline: "A Photon Noir reading of Don Quixote. Sometimes the giant is only a shadow. The courage is real.",
    format: "Short film · 9:16",
    year: 2026,
    notes: "After Cervantes, and Picasso’s 1955 drawing. Music after Luys de Narváez, 1538.",
  },
  {
    slug: "lunar-symphony",
    title: "Lunar Symphony",
    still: "films/lunar-symphony.jpg",
    logline: "A quiet night. A giant moon. A glowing ocean.",
    format: "Cinematic short · 9:16",
    year: 2026,
  },
  {
    slug: "night-shelter",
    title: "Night Shelter",
    still: "films/night-shelter.jpg",
    logline: "Even in the darkest storm, kindness stays awake.",
    format: "Visual story · 9:16",
    year: 2026,
  },
  {
    slug: "nostalgia-for-the-glitch-era",
    title: "Nostalgia for the Glitch Era",
    still: "films/nostalgia-for-the-glitch-era.jpg",
    logline: "Back when every cat had nine lives, and at least one lived on a screen.",
    format: "Study · 9:16",
    year: 2026,
  },
];

const OFFERS = [
  {
    name: "Controlled Reel Rescue Sprint",
    price: "from ₪1,900",
    summary: "One bounded reel. One identity owner. One acceptance gate. Built for a film, a brand, or a single stubborn idea that needs to hold.",
    terms: "Contract-only. Not hourly. Publication remains a separate approval.",
  },
  {
    name: "House visual poem",
    price: "by brief",
    summary: "An original 9:16 piece under the MadCat Studio signature — light, place, and a finished cut.",
    terms: "House IP. Studio branding only when the brief asks for it.",
  },
  {
    name: "Client Studio identity",
    price: "by brief",
    summary: "Strategy, identity, and a first public surface under the client’s own name. House characters stay out unless commissioned.",
    terms: "Client brand remains sovereign. No studio bleed.",
  },
];

const MARK = `<svg class="mark" viewBox="0 0 100 100" aria-hidden="true"><rect width="100" height="100" rx="22" fill="#21121f"/><path d="M26 74V30l24 28 24-28v44" fill="none" stroke="#e7d9ba" stroke-width="7" stroke-linecap="square" stroke-linejoin="miter"/><circle cx="74" cy="28" r="5" fill="#b98332"/></svg>`;

function path() {
  const raw = (location.hash || "#/").replace(/^#/, "") || "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

function go(to) {
  location.hash = to.startsWith("#") ? to : `#${to}`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    window.alert("Could not save on this device. Your draft has not been sent. Please copy it before leaving.");
    return false;
  }
}

function nav(active) {
  const items = [
    ["/", "Home"],
    ["/works", "Works"],
    ["/talk", "Talk"],
    ["/brief", "Brief"],
    ["/account", "Local profile"],
  ];
  return items
    .map(([to, label]) => {
      const on =
        to === "/"
          ? active === "/"
          : active === to || active.startsWith(`${to}/`);
      return `<a href="#${to}" class="${on ? "active" : ""}">${label}</a>`;
    })
    .join("");
}

function shell(active, inner) {
  return `
    <div class="app">
      <div class="shell">
        <aside class="side">
          <a class="brand" href="#/">${MARK}<div><p class="name">MadCat Studio</p><p class="place">Haifa</p></div></a>
          <nav class="nav">${nav(active)}</nav>
          <p style="margin-top:auto;padding:0 12px;font-size:11px;color:var(--subtle);line-height:1.5">MadCat Studio — powered by Hatul Madan System</p>
        </aside>
        <div style="flex:1;min-width:0">
          <header class="top">
            <a href="#/">${MARK}<span>MadCat Studio</span></a>
            <span>Haifa</span>
          </header>
          <main class="main"><div class="wrap">${inner}</div></main>
        </div>
      </div>
      <nav class="tabbar">${nav(active)}</nav>
    </div>
  `;
}

function home() {
  const cards = FILMS.map(
    (f) => `
      <a class="card" href="#/works/${f.slug}">
        <img src="${f.still}" alt="${esc(f.title)}" loading="lazy" />
        <div class="meta"><h3>${esc(f.title)}</h3><p>${esc(f.format)}</p></div>
      </a>
    `,
  ).join("");
  const offers = OFFERS.map(
    (o) => `
      <article class="offer">
        <p class="price">${esc(o.price)}</p>
        <h3>${esc(o.name)}</h3>
        <p>${esc(o.summary)}</p>
        <p class="terms">${esc(o.terms)}</p>
      </article>
    `,
  ).join("");
  return `
    <section class="hero">
      <img src="brand/hero-haifa.jpg" alt="" fetchpriority="high" />
      <div class="veil"></div>
      <div class="copy">
        <p class="kicker">Haifa</p>
        <h1 class="display">MadCat Studio</h1>
        <p class="lede">An independent AI-powered creative studio.</p>
        <div class="actions">
          <a class="btn" href="#/works">View the work</a>
          <a class="btn secondary" href="#/brief">Start a brief</a>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="row"><h2 class="display">Recent films</h2><a href="#/works">View the work</a></div>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2 class="display">Working with the studio</h2>
      <div class="offers">${offers}</div>
    </section>
    <footer class="foot">
      <p>MadCat Studio — powered by Hatul Madan System</p>
      <p>MadCat Studio — Haifa. English first. Hebrew when the route is Israel.</p>
    </footer>
  `;
}

function works() {
  const cards = FILMS.map(
    (f) => `
      <a class="card" href="#/works/${f.slug}">
        <img src="${f.still}" alt="${esc(f.title)}" loading="lazy" />
        <div class="meta">
          <p>${esc(f.format)}</p>
          <h3>${esc(f.title)}</h3>
          <p>${esc(f.logline)}</p>
        </div>
      </a>
    `,
  ).join("");
  return `
    <header class="page-head">
      <p class="kicker">MadCat Studio</p>
      <h1 class="display">Works</h1>
      <p>An independent AI-powered creative studio.</p>
    </header>
    <div class="works">${cards}</div>
  `;
}

function film(slug) {
  const f = FILMS.find((x) => x.slug === slug);
  if (!f) return `<header class="page-head"><h1 class="display">Not found</h1></header>`;
  return `
    <article class="film">
      <img src="${f.still}" alt="${esc(f.title)}" />
      <div>
        <p class="kicker">${esc(f.format)} · ${f.year}</p>
        <h1 class="display">${esc(f.title)}</h1>
        <p class="lede" style="color:var(--muted)">${esc(f.logline)}</p>
        ${f.notes ? `<p class="notes">${esc(f.notes)}</p>` : ""}
        <div class="actions">
          <a class="btn" href="#/brief">Start a brief</a>
          <a class="btn secondary" href="#/works">Works</a>
        </div>
      </div>
    </article>
  `;
}

function talk() {
  const messages = load("mcs.talk", []);
  const bubbles = messages
    .map((m) => `<div class="bubble ${m.who}">${esc(m.text)}</div>`)
    .join("");
  return `
    <header class="page-head">
      <p class="kicker">Desk</p>
      <h1 class="display">Speak with the studio</h1>
      <p>Leave a note for MadCat Studio. This draft stays on this device and is not sent to MadCat Studio.</p>
    </header>
    <div class="thread">${bubbles || `<p class="lede" style="color:var(--subtle)">A first sentence is enough.</p>`}</div>
    <form class="form" id="talk-form">
      <label>Write to the studio
        <textarea name="text" required placeholder="What should the studio hold?"></textarea>
      </label>
      <button class="btn" type="submit">Save draft on this device</button>
    </form>
  `;
}

function brief() {
  const briefs = load("mcs.briefs", []);
  const list = briefs
    .map((b) => `<article class="offer"><p class="price">Local draft — not sent</p><h3>${esc(b.name || "Brief")}</h3><p>${esc(b.intent)}</p></article>`)
    .join("");
  return `
    <header class="page-head">
      <p class="kicker">Brief</p>
      <h1 class="display">Start a brief</h1>
      <p>Save a brief draft on this device. This page does not send it to the studio.</p>
    </header>
    <form class="form" id="brief-form">
      <label>Name <input name="name" required /></label>
      <label>Email <input name="email" type="email" required /></label>
      <label>What should the studio hold?
        <textarea name="intent" required></textarea>
      </label>
      <button class="btn" type="submit">Save brief draft</button>
    </form>
    ${list ? `<section class="section"><h2 class="display">Your briefs</h2><div class="offers">${list}</div></section>` : ""}
  `;
}

function account() {
  const session = load("mcs.session", null);
  if (session) {
    return `
      <header class="page-head">
        <p class="kicker">Local profile</p>
        <h1 class="display">${esc(session.name)}</h1>
        <p>${esc(session.email)}</p>
      </header>
      <p>This profile is stored on this device only. It is not an authenticated account.</p>
      <div class="actions"><button class="btn secondary" id="signout" type="button">Clear local profile</button></div>
    `;
  }
  return `
    <header class="page-head">
      <p class="kicker">Local profile</p>
      <h1 class="display">Save a local profile</h1>
      <p>This optional profile is stored on this device. It does not create an account or sign you in.</p>
    </header>
    <form class="form" id="account-form">
      <label>Name <input name="name" required /></label>
      <label>Email <input name="email" type="email" required /></label>
      <button class="btn" type="submit">Save local profile</button>
    </form>
  `;
}

function locked() {
  return `
    <div class="locked">
      <h1 class="display">This desk is private.</h1>
      <p>The public studio is this way.</p>
      <div class="actions" style="justify-content:center"><a class="btn" href="#/">Back to the studio</a></div>
    </div>
  `;
}

function render() {
  const p = path();
  let active = "/";
  let inner = home();
  if (p === "/works") {
    active = "/works";
    inner = works();
  } else if (p.startsWith("/works/")) {
    active = "/works";
    inner = film(p.slice("/works/".length));
  } else if (p === "/talk") {
    active = "/talk";
    inner = talk();
  } else if (p === "/brief") {
    active = "/brief";
    inner = brief();
  } else if (p === "/account") {
    active = "/account";
    inner = account();
  } else if (p === "/system" || p.startsWith("/system/")) {
    active = "/";
    inner = locked();
  }
  document.getElementById("app").innerHTML = shell(active, inner);
  bind();
}

function bind() {
  const talkForm = document.getElementById("talk-form");
  if (talkForm) {
    talkForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = new FormData(talkForm).get("text");
      if (!text) return;
      const messages = load("mcs.talk", []);
      messages.push({ who: "me", text: String(text) });
      messages.push({
        who: "desk",
        text: "Draft saved on this device only. Nothing has been sent to the studio.",
      });
      if (!save("mcs.talk", messages)) return;
      render();
    });
  }
  const briefForm = document.getElementById("brief-form");
  if (briefForm) {
    briefForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(briefForm).entries());
      const briefs = load("mcs.briefs", []);
      briefs.unshift({ ...data, at: Date.now() });
      if (!save("mcs.briefs", briefs)) return;
      render();
    });
  }
  const accountForm = document.getElementById("account-form");
  if (accountForm) {
    accountForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!save("mcs.session", Object.fromEntries(new FormData(accountForm).entries()))) return;
      render();
    });
  }
  const signout = document.getElementById("signout");
  if (signout) {
    signout.addEventListener("click", () => {
      localStorage.removeItem("mcs.session");
      render();
    });
  }
}

window.addEventListener("hashchange", render);
if (!location.hash) location.hash = "#/";
render();
