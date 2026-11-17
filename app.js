/* TMC — A Little Universe. Vanilla JS, intentionally no dependencies. */
(() => {
  'use strict';
  const $ = (q) => document.querySelector(q);
  const i18n = window.TMCI18n;
  const t = (key) => i18n.t(key);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touchDevice = window.matchMedia('(hover:none)').matches;

  // Personal time zone clock.
  const clock = $('#live-time');
  const clockFormat = new Intl.DateTimeFormat('vi-VN', {timeZone:'Asia/Ho_Chi_Minh',hour:'2-digit',minute:'2-digit',hour12:false});
  const setClock = () => { if(clock) clock.textContent = `VN · ${clockFormat.format(new Date())}`; };
  setClock();
  setInterval(setClock, 30000);
  $('#year').textContent = new Date().getFullYear();

  // Day/night mood switch (stored locally, without external request).
  const mood = $('#theme-toggle');
  try { if(localStorage.getItem('tmc-universe-theme') === 'night') document.body.classList.add('night'); } catch (_) {}
  const setMoodUI = () => {
    const night = document.body.classList.contains('night');
    mood.setAttribute('aria-pressed', String(night));
    mood.title = t(night ? 'theme.light' : 'theme.dark');
    mood.setAttribute('aria-label', t('theme.toggle'));
    const meta = $('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content', night ? '#171923' : '#f5f2eb');
  };
  setMoodUI();
  mood.addEventListener('click', () => {
    document.body.classList.toggle('night');
    try { localStorage.setItem('tmc-universe-theme', document.body.classList.contains('night')?'night':'light'); } catch (_) {}
    setMoodUI();
  });

  // Single lightweight pointer effect: no scroll listener, no canvas animation loop.
  const art = $('#art-panel');
  const core = $('#art-core');
  if(art && core && !touchDevice && !reduceMotion) {
    art.addEventListener('pointermove', e => {
      const rect = art.getBoundingClientRect();
      const dx = ((e.clientX-rect.left)/rect.width - .5)*24;
      const dy = ((e.clientY-rect.top)/rect.height - .5)*24;
      core.style.transform = `translate(calc(-50% + ${dx.toFixed(1)}px), calc(-49% + ${dy.toFixed(1)}px))`;
    }, {passive:true});
    art.addEventListener('pointerleave', () => { core.style.transform = ''; });
  }

  let toastTimer;
  const showToast = (message) => {
    const t = $('#toast');
    t.textContent = message;
    t.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('visible'), 2300);
  };
  $('#copy-email').addEventListener('click', async () => {
    const address = 'tranchuyed@gmail.com';
    try {
      if(!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(address);
      showToast(t('toast.emailCopied'));
    } catch (_) {
      const el = document.createElement('textarea');
      el.value = address; el.style.position='fixed';el.style.left='-9999px';
      document.body.appendChild(el);el.select();
      try { if(document.execCommand('copy')) showToast(t('toast.emailCopied')); else showToast(address); }
      catch (_) { showToast(address); }
      el.remove();
    }
  });
  $('#share-page').addEventListener('click', async () => {
    const data = { title: t('site.ogTitle'), text: t('share.text'), url: window.location.href };
    if(navigator.share) { try { await navigator.share(data); return; } catch (e) { if(e.name==='AbortError') return; } }
    try { await navigator.clipboard.writeText(window.location.href); showToast(t('toast.linkCopied')); }
    catch (_) { showToast(t('toast.copyLink')); }
  });

  // The original soundtrack is a single mix. Track segmentation uses the
  // timestamps supplied in the original website; no separate audio downloads.
  const tracks = [
    {title:'em bo hut thuoc chua',start:0,end:206},
    {title:'2AM',start:206,end:390},
    {title:'em con nho anh ko',start:390,end:554},
    {title:'co bao gio',start:554,end:798},
    {title:'chang phai tinh dau sao dau den the',start:798,end:999},
    {title:'nguoi nhu a xung dang co don',start:999,end:1246},
    {title:'anh sao va bau troi',start:1246,end:1516},
    {title:'tinh nhu la bay xa',start:1516,end:1733},
    {title:'chiec la tinh yeu',start:1733,end:1958},
    {title:'let me go',start:1958,end:Infinity}
  ];
  const audio = $('#music-audio');
  const button = $('#track-play');
  const heroButton = $('#hero-play');
  const title = $('#song-title');
  const idxElement = $('#song-index');
  const playGlyph = $('#play-glyph');
  const progress = $('#progress');
  const timeElapsed = $('#elapsed');
  const timeDuration = $('#duration');
  const disc = $('#radio-disc');
  const bars = $('#eq-bars');
  const playlistPanel = $('#playlist-panel');
  const playlistBox = $('#playlist-items');
  let index = 0;
  let readyPromise = null;
  let playing = false;
  let userScrubbing = false;
  let seq = 0;
  const timeStr = s => `${Math.floor(Math.max(0,s||0)/60)}:${String(Math.floor(Math.max(0,s||0)%60)).padStart(2,'0')}`;
  const currentEnd = () => tracks[index].end === Infinity ? (Number.isFinite(audio.duration) ? audio.duration : tracks[index].start+180) : tracks[index].end;
  const currentLength = () => Math.max(1,currentEnd()-tracks[index].start);
  function setPlayUI(value) {
    playing = value;
    playGlyph.textContent = playing ? 'Ⅱ' : '▶';
    button.setAttribute('aria-label', t(playing ? 'player.pause' : 'player.play'));
    heroButton.setAttribute('aria-label', t(playing ? 'player.pause' : 'player.play'));
    heroButton.querySelector('.mini-play').textContent = playing ? 'Ⅱ' : '▶';
    heroButton.querySelector('span:last-child').textContent = t(playing ? 'hero.pause' : 'hero.play');
    disc.classList.toggle('playing', playing);
    bars.classList.toggle('playing', playing);
  }
  function renderTrack() {
    title.textContent = tracks[index].title;
    idxElement.textContent = `${String(index+1).padStart(2,'0')} / ${String(tracks.length).padStart(2,'0')}`;
    timeDuration.textContent = timeStr(currentLength());
    [...playlistBox.children].forEach((el,i) => {
      const active = i===index;
      el.classList.toggle('active', active);
      if(active) el.setAttribute('aria-current','true'); else el.removeAttribute('aria-current');
    });
    renderProgress();
  }
  function renderProgress() {
    const offset = Math.min(currentLength(),Math.max(0,(audio.currentTime||0)-tracks[index].start));
    if(!userScrubbing) progress.value = Math.round(offset/currentLength()*1000);
    progress.style.setProperty('--progress',`${progress.value/10}%`);
    timeElapsed.textContent=timeStr(offset);
    timeDuration.textContent=timeStr(currentLength());
  }
  function ensureAudio() {
    if(!readyPromise) {
      readyPromise = new Promise((resolve,reject) => {
        if(audio.readyState>=1) return resolve();
        audio.addEventListener('loadedmetadata',resolve,{once:true});
        audio.addEventListener('error',() => reject(new Error('Audio unavailable')),{once:true});
        audio.src='music/chill.mp3';
        audio.load();
      });
    }
    return readyPromise;
  }
  async function chooseTrack(nextIndex,autoPlay=true) {
    index=(nextIndex+tracks.length)%tracks.length;
    const request=++seq;
    renderTrack();
    try {
      await ensureAudio();
      if(request!==seq) return;
      audio.currentTime=tracks[index].start;
      renderProgress();
      if(autoPlay) await playMusic();
    } catch (_) { setPlayUI(false); showToast(t('toast.audioFailed')); }
  }
  async function playMusic() {
    try {
      await ensureAudio();
      if(audio.currentTime < tracks[index].start || audio.currentTime >= currentEnd()) audio.currentTime=tracks[index].start;
      await audio.play();
      setPlayUI(true);
    } catch (_) { setPlayUI(false); showToast(t('toast.playFailed')); }
  }
  function togglePlay() {if(!audio.paused){audio.pause();setPlayUI(false)}else{playMusic()}}
  button.addEventListener('click',togglePlay);
  heroButton.addEventListener('click',()=> {$('#radio').scrollIntoView({behavior:reduceMotion?'instant':'smooth',block:'center'});togglePlay();});
  $('#track-prev').addEventListener('click',()=>chooseTrack(index-1));
  $('#track-next').addEventListener('click',()=>chooseTrack(index+1));
  $('#volume-toggle').addEventListener('click', e => {audio.muted=!audio.muted;e.currentTarget.textContent=audio.muted?'♪̸':'♪';e.currentTarget.setAttribute('aria-label',t(audio.muted?'player.unmute':'player.mute'));showToast(t(audio.muted?'toast.muted':'toast.unmuted'));});
  audio.volume=.5;
  audio.addEventListener('timeupdate', () => {
    if(playing && audio.currentTime >= currentEnd()-.15){
      if(index<tracks.length-1) chooseTrack(index+1);
      else {audio.pause();chooseTrack(0,false);setPlayUI(false)}
      return;
    }
    renderProgress();
  });
  audio.addEventListener('ended',()=>{setPlayUI(false);chooseTrack(0,false)});
  audio.addEventListener('pause',()=>setPlayUI(false));
  audio.addEventListener('play',()=>setPlayUI(true));
  audio.addEventListener('loadedmetadata',renderTrack);
  progress.addEventListener('input',()=> {userScrubbing=true;progress.style.setProperty('--progress',`${progress.value/10}%`);timeElapsed.textContent=timeStr(Number(progress.value)/1000*currentLength());});
  async function seek() {
    try {await ensureAudio();audio.currentTime=tracks[index].start+Number(progress.value)/1000*currentLength();}
    catch(_){} finally {userScrubbing=false;renderProgress();}
  }
  progress.addEventListener('change',seek);
  for(const [i,t] of tracks.entries()) {
    const item=document.createElement('button');
    item.type='button';item.className='playlist-item';
    const count=document.createElement('span');count.className='track-n';count.textContent=String(i+1).padStart(2,'0');
    const name=document.createElement('strong');name.textContent=t.title;
    const len=document.createElement('span');len.className='track-len';len.textContent=t.end===Infinity?'—':timeStr(t.end-t.start);
    item.append(count,name,len);
    item.addEventListener('click',()=>chooseTrack(i));
    playlistBox.appendChild(item);
  }
  function setPlaylist(open) {
    playlistPanel.hidden=!open;
    $('#playlist-toggle').setAttribute('aria-expanded',String(open));
    if(open && !reduceMotion) playlistPanel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  $('#playlist-toggle').addEventListener('click',()=>setPlaylist(playlistPanel.hidden));
  $('#playlist-close').addEventListener('click',()=>setPlaylist(false));
  renderTrack();

  // Keep dynamic player labels and theme tooltips in sync on language change.
  i18n.subscribe(() => {
    setMoodUI();
    setPlayUI(playing);
    $('#volume-toggle').setAttribute('aria-label', t(audio.muted ? 'player.unmute' : 'player.mute'));
  });
  setPlayUI(false);
  $('#volume-toggle').setAttribute('aria-label', t('player.mute'));
})();
