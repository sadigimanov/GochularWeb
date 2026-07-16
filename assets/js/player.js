/* player.html-only logic. Cart logic lives in cart.js (shared with index.html).

   Fill in each player's photo, socials, and in-game settings below —
   these are left as placeholders since that info wasn't provided.
   photo: path to the player's photo, e.g. 'assets/img/players/jafrsai.jpg'
   instagram / twitter: full profile URLs, leave empty string '' to hide the icon
   polling / refresh / resolution: in-game hardware settings, leave '—' if unknown
   statsUrl: link to a tracker/stats page, leave '#' if none yet
*/

const PLAYERS = {
  jafrsai: {
    tag: 'Jafrsai',
    role: 'IGL',
    agents: 'Raze / Brim / Killjoy',
    photo: 'assets/img/players/jafrsai.jpeg',
    instagram: 'https://www.instagram.com/nematjf/',
    twitter: '',
    polling: '1000hz 800 dpi',
    refresh: '240 hz',
    resolution: '1728×1080',
    statsUrl: '#'
  },
  therealramin: {
    tag: 'TheRealRamin',
    role: 'Controller',
    agents: 'Omen / Deadlock',
    photo: 'assets/img/players/therealramin.jpg',
    instagram: 'https://www.instagram.com/therealramin0/',
    twitter: '',
    polling: '800 dpi 0.24 sens',
    refresh: '144 hz',
    resolution: '1920:1080',
    statsUrl: '#'
  },
  zentraa: {
    tag: 'Zentraa',
    role: 'Sentinel',
    agents: 'Cypher / Viper / Vyse',
    photo: 'assets/img/players/zentraa.jpg',
    instagram: 'https://www.instagram.com/sadiq.w3b/',
    twitter: '',
    polling: '800 dpi 0.27 sens',
    refresh: '144 hz',
    resolution: '1920:1080',
    statsUrl: '#'
  },
  mohg: {
    tag: 'Mohg',
    role: 'Initiator',
    agents: 'Breach',
    photo: 'assets/img/players/mohg.jpg',
    instagram: 'https://www.instagram.com/orxan.0smanli/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  },
  lwarz: {
    tag: 'Lwarz',
    role: 'Duelist',
    agents: 'Raze / Jett',
    photo: 'assets/img/players/lwarz.jpg',
    instagram: 'https://www.instagram.com/nihat.sltnw/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  },
  ceasar: {
    tag: 'Ceasar',
    role: 'Initiator',
    agents: 'Tejo / Fade / Gekko',
    photo: 'assets/img/players/ceasar.jpg',
    instagram: 'https://www.instagram.com/elchin.akhmed/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  },
  dyrose: {
    tag: 'Dyrose',
    role: 'Duelist',
    agents: 'Jett / Neon / Phoenix',
    photo: 'assets/img/players/dyrose.jpeg',
    instagram: 'https://www.instagram.com/muqumovich/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  },
  norkyy: {
    tag: 'Norkyy',
    role: 'Initiator',
    agents: 'Jett / Brim / Killjoy',
    photo: 'assets/img/players/norkyy.jpg',
    instagram: 'https://www.instagram.com/n0rkyy_/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  },
    mordecai: {
    tag: 'Mordecai',
    role: 'Initiator',
    agents: 'Breach / Fade / Tejo',
    photo: 'assets/img/players/mordecai.jpg',
    instagram: 'https://www.instagram.com/jaffrloyy/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  },
    rareemr: {
    tag: 'rareemr',
    role: 'Duelist',
    agents: 'Jett',
    photo: 'assets/img/players/rareemr.jpg',
    instagram: 'https://www.instagram.com/rareemr/',
    twitter: '',
    polling: '—',
    refresh: '—',
    resolution: '—',
    statsUrl: '#'
  }
};

const params = new URLSearchParams(window.location.search);
const playerId = params.get('id');
const player = PLAYERS[playerId];

if(!player){
  document.getElementById('player-hero').innerHTML = `
    <div class="wrap">
      <p class="empty-note">Oyunçu tapılmadı. <a href="index.html#komanda">Komandaya qayıt</a></p>
    </div>
  `;
} else {
  document.getElementById('page-title').textContent = 'GOCHULAR — ' + player.tag;
  document.getElementById('player-eyebrow').textContent = (player.role ? player.role + ' · ' : '') + player.tag;
  document.getElementById('player-headline').textContent = `GOCHULAR-da ${player.role ? player.role.toLowerCase() + ' rolunda' : ''} çıxış edir. Əsas agentləri: ${player.agents}.`;

  document.getElementById('setting-polling').textContent = player.polling;
  document.getElementById('setting-refresh').textContent = player.refresh;
  document.getElementById('setting-res').textContent = player.resolution;

  const photoEl = document.getElementById('player-photo-el');
  photoEl.src = player.photo;
  photoEl.alt = 'GOCHULAR — ' + player.tag;

  const socialsEl = document.getElementById('social-icons');
  let socialsHtml = '';
  if(player.instagram){
    socialsHtml += `<a href="${player.instagram}" target="_blank" aria-label="Instagram" class="social-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
    </a>`;
  }
  if(player.twitter){
    socialsHtml += `<a href="${player.twitter}" target="_blank" aria-label="X / Twitter" class="social-icon">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 4l7.5 9.5L4.5 20H7l5.8-5.3L17 20h3l-7.8-9.9L19.5 4H17l-5.3 4.8L7.5 4z"/></svg>
    </a>`;
  }
  if(!socialsHtml){
    socialsHtml = '<span class="empty-note" style="padding:0;">Tezliklə</span>';
  }
  socialsEl.innerHTML = socialsHtml;

  const statsBtn = document.getElementById('stats-btn');
  if(player.statsUrl && player.statsUrl !== '#'){
    statsBtn.href = player.statsUrl;
    statsBtn.target = '_blank';
  } else {
    statsBtn.href = '#';
    statsBtn.classList.add('disabled');
    statsBtn.addEventListener('click', e => e.preventDefault());
  }
}