/* TMC — Vietnamese / English mode. No network requests; choice stored locally. */
(() => {
  'use strict';
  const phrases = {
  "site.title": {
    "vi": "TMC® — Một Vũ Trụ Nhỏ",
    "en": "TMC® — A Little Universe"
  },
  "site.description": {
    "vi": "TMC — một góc nhỏ của mình trên internet. Web, video, ý tưởng và những bài nhạc.",
    "en": "TMC — my little corner of the internet. Websites, videos, ideas and music."
  },
  "site.ogTitle": {
    "vi": "TMC — Một Vũ Trụ Nhỏ",
    "en": "TMC — A Little Universe"
  },
  "site.ogDesc": {
    "vi": "Không chỉ là trang bio. Ghé chơi nhé!",
    "en": "Not another link in bio. Come say hi."
  },
  "loading": {
    "vi": "ĐANG MỞ VŨ TRỤ",
    "en": "LOADING THE UNIVERSE"
  },
  "nav.aria": {
    "vi": "Điều hướng chính",
    "en": "Main navigation"
  },
  "nav.homeAria": {
    "vi": "Về đầu trang TMC",
    "en": "Back to the top of TMC"
  },
  "brand.tagline": {
    "vi": "VŨ TRỤ CÁ NHÂN",
    "en": "PERSONAL UNIVERSE"
  },
  "nav.about": {
    "vi": "VỀ MÌNH",
    "en": "ABOUT"
  },
  "nav.links": {
    "vi": "KẾT NỐI",
    "en": "LINKS"
  },
  "nav.radio": {
    "vi": "RADIO",
    "en": "RADIO"
  },
  "nav.contact": {
    "vi": "LIÊN HỆ",
    "en": "SAY HELLO"
  },
  "nav.language": {
    "vi": "Chọn ngôn ngữ",
    "en": "Choose language"
  },
  "nav.vi": {
    "vi": "Chuyển sang tiếng Việt",
    "en": "Switch to Vietnamese"
  },
  "nav.en": {
    "vi": "Chuyển sang tiếng Anh",
    "en": "Switch to English"
  },
  "nav.clock": {
    "vi": "Giờ Việt Nam",
    "en": "Vietnam local time"
  },
  "theme.toggle": {
    "vi": "Đổi chế độ sáng và tối",
    "en": "Toggle light and dark mode"
  },
  "theme.light": {
    "vi": "Chuyển sang chế độ sáng",
    "en": "Switch to light mode"
  },
  "theme.dark": {
    "vi": "Chuyển sang chế độ tối",
    "en": "Switch to dark mode"
  },
  "hero.signal": {
    "vi": "ĐANG PHÁT SÓNG TỪ INTERNET",
    "en": "TRANSMITTING FROM THE INTERNET"
  },
  "hero.hey": {
    "vi": "CHÀO,",
    "en": "HEY,"
  },
  "hero.intro": {
    "vi": "MÌNH LÀ",
    "en": "I’M"
  },
  "hero.description": {
    "vi": "Một người thích <strong>tạo ra mọi thứ.</strong><br>Làm web, quay video, viết linh tinh —<br>và luôn có thêm một ý tưởng mới.",
    "en": "Just someone who loves <strong>making things.</strong><br>Websites, videos, little experiments —<br>and always another idea in mind."
  },
  "hero.explore": {
    "vi": "KHÁM PHÁ THẾ GIỚI NÀY",
    "en": "EXPLORE MY UNIVERSE"
  },
  "hero.play": {
    "vi": "BẬT NHẠC LÊN",
    "en": "PLAY SOME MUSIC"
  },
  "hero.pause": {
    "vi": "TẠM DỪNG NHẠC",
    "en": "PAUSE THE MUSIC"
  },
  "hero.made": {
    "vi": "TẠO NÊN TỪ TÒ MÒ",
    "en": "MADE OF CURIOSITY"
  },
  "hero.scroll": {
    "vi": "CUỘN ĐỂ KHÁM PHÁ ↓",
    "en": "SCROLL TO EXPLORE ↓"
  },
  "art.aria": {
    "vi": "Minh họa hành tinh sáng tạo TMC",
    "en": "TMC creative planet illustration"
  },
  "art.transmission": {
    "vi": "TÍN HIỆU SỐ 001",
    "en": "TRANSMISSION NO.001"
  },
  "art.just": {
    "vi": "CHỈ LÀ<br>MỘT NGƯỜI",
    "en": "JUST A<br>PERSON"
  },
  "art.big": {
    "vi": "GIỮA THẾ GIỚI<br>INTERNET",
    "en": "IN A BIG<br>INTERNET"
  },
  "art.bottom": {
    "vi": "SÁNG TẠO KHÔNG CÓ QUỸ ĐẠO.",
    "en": "CREATIVITY HAS NO ORBIT."
  },
  "ticker.aria": {
    "vi": "Thông điệp chào mừng",
    "en": "A welcome message"
  },
  "ticker": {
    "vi": "KHÔNG CHỈ LÀ MỘT TRANG BIO <b>✳</b> CHÀO MỪNG TỚI VŨ TRỤ NHỎ CỦA MÌNH <b>✳</b> NƠI NHỮNG Ý TƯỞNG KHÔNG BAO GIỜ HẾT <b>✳</b>",
    "en": "NOT JUST ANOTHER LINK IN BIO <b>✳</b> WELCOME TO MY LITTLE UNIVERSE <b>✳</b> MADE WITH WAY TOO MANY IDEAS <b>✳</b>"
  },
  "connections.eyebrow": {
    "vi": "MẠNG LƯỚI / 08 ĐIỂM ĐẾN",
    "en": "THE NETWORK / 08 DESTINATIONS"
  },
  "connections.title": {
    "vi": "MÌNH CÙNG<br><em>KẾT NỐI.</em>",
    "en": "LET’S GET<br><em>CONNECTED.</em>"
  },
  "connections.description": {
    "vi": "Không cần biết mình từ đâu tới.<br>Chỉ cần chọn một cánh cửa thôi. <span>↘</span>",
    "en": "No matter how you got here.<br>Just pick a door and come on in. <span>↘</span>"
  },
  "connections.aria": {
    "vi": "Các liên kết mạng xã hội và liên hệ của TMC",
    "en": "TMC social and contact links"
  },
  "tiles.instagram": {
    "vi": "01 / NHẬT KÝ ẢNH",
    "en": "01 / VISUAL DIARY"
  },
  "tiles.tiktok": {
    "vi": "02 / CHUYỆN NGẮN",
    "en": "02 / SHORT STORIES"
  },
  "tiles.facebook": {
    "vi": "03 / DÒNG THỜI GIAN",
    "en": "03 / THE TIMELINE"
  },
  "tiles.library": {
    "vi": "04 / PHÒNG THÍ NGHIỆM",
    "en": "04 / THE LAB"
  },
  "tiles.locket": {
    "vi": "05 / KHOẢNH KHẮC NHỎ",
    "en": "05 / LITTLE MOMENTS"
  },
  "tiles.threads": {
    "vi": "06 / SUY NGHĨ VỤN",
    "en": "06 / RANDOM THOUGHTS"
  },
  "tiles.zalo": {
    "vi": "07 / CHÀO MỘT TIẾNG",
    "en": "07 / SAY HI"
  },
  "tiles.email": {
    "vi": "08 / GỬI TÍN HIỆU",
    "en": "08 / SEND A SIGNAL"
  },
  "tiles.projects": {
    "vi": "DỰ ÁN & THỬ NGHIỆM",
    "en": "PROJECTS & EXPERIMENTS"
  },
  "tiles.letsTalk": {
    "vi": "TRÒ CHUYỆN NHÉ",
    "en": "LET’S TALK"
  },
  "tiles.emailMe": {
    "vi": "Gửi email",
    "en": "Email me"
  },
  "tiles.build": {
    "vi": "TẠO.<br>THỬ.<br>LÀM LẠI<span class=\"cursor-rect\"></span>",
    "en": "BUILD.<br>BREAK.<br>REPEAT<span class=\"cursor-rect\"></span>"
  },
  "tiles.hello": {
    "vi": "XIN<br>CHÀO<span class=\"asterisk\">✳</span>",
    "en": "HELLO<br>THERE<span class=\"asterisk\">✳</span>"
  },
  "radio.eyebrow": {
    "vi": "03 / MỘT CHÚT ÂM NHẠC",
    "en": "03 / A BIT OF SOUND"
  },
  "radio.station": {
    "vi": "KÊNH RADIO CỦA MÌNH",
    "en": "PERSONAL RADIO STATION"
  },
  "radio.soundtrack": {
    "vi": "NHẠC NỀN CỦA INTERNET",
    "en": "SOUNDTRACK TO THE INTERNET"
  },
  "radio.title": {
    "vi": "Ở LẠI<br><em>MỘT CHÚT.</em>",
    "en": "STAY<br><em>AWHILE.</em>"
  },
  "radio.description": {
    "vi": "Ở đây có vài bài hát mình thích.<br>Bật nhạc lên rồi lướt tiếp nhé.",
    "en": "Here are a few songs I love.<br>Press play, stay a little longer."
  },
  "radio.playlist": {
    "vi": "XEM DANH SÁCH PHÁT",
    "en": "OPEN THE PLAYLIST"
  },
  "radio.club": {
    "vi": "CÂU LẠC BỘ RADIO",
    "en": "RADIO CLUB"
  },
  "radio.playing": {
    "vi": "ĐANG PHÁT",
    "en": "NOW PLAYING"
  },
  "radio.collection": {
    "vi": "BỘ SƯU TẬP NHẠC CỦA TMC",
    "en": "TMC PERSONAL COLLECTION"
  },
  "radio.mixtape": {
    "vi": "DANH SÁCH NHẠC",
    "en": "THE MIXTAPE"
  },
  "radio.close": {
    "vi": "ĐÓNG",
    "en": "CLOSE"
  },
  "player.play": {
    "vi": "Phát nhạc",
    "en": "Play music"
  },
  "player.pause": {
    "vi": "Tạm dừng nhạc",
    "en": "Pause music"
  },
  "player.previous": {
    "vi": "Bài trước",
    "en": "Previous track"
  },
  "player.next": {
    "vi": "Bài tiếp theo",
    "en": "Next track"
  },
  "player.seek": {
    "vi": "Tua nhạc",
    "en": "Seek through the track"
  },
  "player.volume": {
    "vi": "Tắt hoặc bật tiếng",
    "en": "Mute or unmute"
  },
  "player.mute": {
    "vi": "Tắt tiếng",
    "en": "Mute audio"
  },
  "player.unmute": {
    "vi": "Bật tiếng",
    "en": "Unmute audio"
  },
  "outro.sticker": {
    "vi": "CHỈ<br>NIỀM VUI<br>THÔI",
    "en": "GOOD<br>VIBES<br>ONLY"
  },
  "outro.kicker": {
    "vi": "BẠN ĐÃ TỚI CUỐI TRANG.",
    "en": "YOU MADE IT TO THE END."
  },
  "outro.title": {
    "vi": "GIỮ<br><em>LIÊN LẠC.</em>",
    "en": "KEEP IN<br><em>TOUCH.</em>"
  },
  "outro.description": {
    "vi": "Internet rộng thế mà mình lại gặp nhau ở đây.",
    "en": "The internet is huge, yet here we are."
  },
  "outro.copy": {
    "vi": "SAO CHÉP EMAIL",
    "en": "COPY EMAIL"
  },
  "outro.share": {
    "vi": "CHIA SẺ TRANG",
    "en": "SHARE THIS PAGE"
  },
  "footer.made": {
    "vi": "ĐƯỢC TẠO NÊN TỪ TÒ MÒ.",
    "en": "MADE WITH CURIOSITY."
  },
  "footer.universe": {
    "vi": "MỘT VŨ TRỤ NHỎ.",
    "en": "A LITTLE UNIVERSE."
  },
  "footer.top": {
    "vi": "LÊN ĐẦU TRANG ↑",
    "en": "BACK TO TOP ↑"
  },
  "toast.emailCopied": {
    "vi": "Đã sao chép email ✳",
    "en": "Email copied ✳"
  },
  "toast.linkCopied": {
    "vi": "Đã sao chép đường dẫn ✳",
    "en": "Link copied ✳"
  },
  "toast.copyLink": {
    "vi": "Hãy sao chép đường dẫn trên thanh địa chỉ nhé!",
    "en": "Copy the link from your address bar!"
  },
  "toast.audioFailed": {
    "vi": "Không tải được nhạc. Kiểm tra music/chill.mp3",
    "en": "Could not load the music. Check music/chill.mp3"
  },
  "toast.playFailed": {
    "vi": "Trình duyệt không thể phát nhạc lúc này",
    "en": "Your browser cannot play audio right now"
  },
  "toast.muted": {
    "vi": "Đã tắt tiếng",
    "en": "Muted"
  },
  "toast.unmuted": {
    "vi": "Đã bật tiếng",
    "en": "Unmuted"
  },
  "share.text": {
    "vi": "Một góc nhỏ của TMC trên internet ✳",
    "en": "TMC’s little corner of the internet ✳"
  }
};
  const initial = (() => {
    try { const saved=localStorage.getItem('tmc-universe-language'); if(saved==='vi'||saved==='en') return saved; } catch (_) {}
    return (navigator.language || 'vi').toLowerCase().startsWith('vi') ? 'vi' : 'en';
  })();
  let current = initial;
  const handlers = new Set();
  function t(key) { return phrases[key]?.[current] ?? key; }
  function render() {
    document.documentElement.lang=current;
    document.documentElement.dataset.lang=current;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent=t(el.dataset.i18n); });
    // HTML strings below are fixed, locally-authored translations, never user input.
    document.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML=t(el.dataset.i18nHtml); });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label',t(el.dataset.i18nAria)); });
    document.querySelectorAll('[data-i18n-content]').forEach(el => { el.setAttribute('content',t(el.dataset.i18nContent)); });
    document.querySelectorAll('[data-lang]').forEach(el => {
      const active=el.dataset.lang===current;
      el.classList.toggle('active',active);
      el.setAttribute('aria-pressed',String(active));
      el.setAttribute('aria-label',t(el.dataset.lang==='vi'?'nav.vi':'nav.en'));
    });
  }
  function setLanguage(value) {
    if(value!=='vi' && value!=='en') return;
    current=value;
    try { localStorage.setItem('tmc-universe-language',value); } catch (_) {}
    render();
    handlers.forEach(fn=>fn());
  }
  window.TMCI18n={t,getLanguage:()=>current,setLanguage,subscribe:fn=>handlers.add(fn)};
  document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setLanguage(btn.dataset.lang)));
  render();
})();
