const dashboardThemes = {
    purple: {
        bg: '#050110', text: 'white',
        tileBg: 'rgba(45, 43, 74, 0.85)', fade: 'rgba(45, 43, 74, 1)',
        clockBg: 'rgba(30, 60, 114, 0.85)',
        cardBg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.1)',
        waves: [
            { color: 'rgba(5, 1, 80, 0.4)', speed: 0.005, amplitude: 50, wavelength: 0.01, offset: 0 },
            { color: 'rgba(51, 0, 77, 0.3)', speed: 0.007, amplitude: 70, wavelength: 0.008, offset: 100 },
            { color: 'rgba(69, 43, 0, 0.2)', speed: 0.003, amplitude: 90, wavelength: 0.005, offset: 200 },
            { color: 'rgba(100, 50, 255, 0.15)', speed: 0.006, amplitude: 40, wavelength: 0.012, offset: 50 }
        ]
    },
    maroon: {
        bg: '#100205', text: 'white',
        tileBg: 'rgba(74, 43, 48, 0.85)', fade: 'rgba(74, 43, 48, 1)',
        clockBg: 'rgba(80, 30, 40, 0.85)',
        cardBg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.1)',
        waves: [
            { color: 'rgba(80, 5, 15, 0.4)', speed: 0.005, amplitude: 50, wavelength: 0.01, offset: 0 },
            { color: 'rgba(100, 10, 30, 0.3)', speed: 0.007, amplitude: 70, wavelength: 0.008, offset: 100 },
            { color: 'rgba(60, 20, 10, 0.2)', speed: 0.003, amplitude: 90, wavelength: 0.005, offset: 200 },
            { color: 'rgba(150, 40, 60, 0.15)', speed: 0.006, amplitude: 40, wavelength: 0.012, offset: 50 }
        ]
    },
    teal: {
        bg: '#011210', text: 'white',
        tileBg: 'rgba(43, 68, 74, 0.85)', fade: 'rgba(43, 68, 74, 1)',
        clockBg: 'rgba(20, 70, 80, 0.85)',
        cardBg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.1)',
        waves: [
            { color: 'rgba(0, 60, 70, 0.4)', speed: 0.005, amplitude: 50, wavelength: 0.01, offset: 0 },
            { color: 'rgba(0, 80, 77, 0.3)', speed: 0.007, amplitude: 70, wavelength: 0.008, offset: 100 },
            { color: 'rgba(10, 60, 50, 0.2)', speed: 0.003, amplitude: 90, wavelength: 0.005, offset: 200 },
            { color: 'rgba(0, 170, 180, 0.15)', speed: 0.006, amplitude: 40, wavelength: 0.012, offset: 50 }
        ]
    },
    forestgreen: {
        bg: '#020f05', text: 'white',
        tileBg: 'rgba(43, 74, 50, 0.85)', fade: 'rgba(43, 74, 50, 1)',
        clockBg: 'rgba(25, 70, 40, 0.85)',
        cardBg: 'rgba(255, 255, 255, 0.08)', border: 'rgba(255, 255, 255, 0.1)',
        waves: [
            { color: 'rgba(5, 50, 20, 0.4)', speed: 0.005, amplitude: 50, wavelength: 0.01, offset: 0 },
            { color: 'rgba(10, 70, 30, 0.3)', speed: 0.007, amplitude: 70, wavelength: 0.008, offset: 100 },
            { color: 'rgba(30, 60, 10, 0.2)', speed: 0.003, amplitude: 90, wavelength: 0.005, offset: 200 },
            { color: 'rgba(40, 130, 50, 0.15)', speed: 0.006, amplitude: 40, wavelength: 0.012, offset: 50 }
        ]
    },
    white: {
        bg: '#e8e8f0', text: '#1a1a2e',
        tileBg: 'rgba(200, 200, 215, 0.9)', fade: 'rgba(200, 200, 215, 1)',
        clockBg: 'rgba(160, 175, 210, 0.9)',
        cardBg: 'rgba(0, 0, 0, 0.06)', border: 'rgba(0, 0, 0, 0.1)',
        waves: [
            { color: 'rgba(195, 195, 220, 0.5)', speed: 0.005, amplitude: 50, wavelength: 0.01, offset: 0 },
            { color: 'rgba(180, 190, 215, 0.4)', speed: 0.007, amplitude: 70, wavelength: 0.008, offset: 100 },
            { color: 'rgba(210, 200, 185, 0.3)', speed: 0.003, amplitude: 90, wavelength: 0.005, offset: 200 },
            { color: 'rgba(170, 175, 220, 0.25)', speed: 0.006, amplitude: 40, wavelength: 0.012, offset: 50 }
        ]
    },
    black: {
        bg: '#000000', text: 'white',
        tileBg: 'rgba(25, 25, 35, 0.85)', fade: 'rgba(25, 25, 35, 1)',
        clockBg: 'rgba(15, 25, 45, 0.85)',
        cardBg: 'rgba(255, 255, 255, 0.06)', border: 'rgba(255, 255, 255, 0.08)',
        waves: [
            { color: 'rgba(15, 15, 25, 0.4)', speed: 0.005, amplitude: 50, wavelength: 0.01, offset: 0 },
            { color: 'rgba(20, 15, 30, 0.3)', speed: 0.007, amplitude: 70, wavelength: 0.008, offset: 100 },
            { color: 'rgba(25, 20, 10, 0.2)', speed: 0.003, amplitude: 90, wavelength: 0.005, offset: 200 },
            { color: 'rgba(30, 25, 40, 0.15)', speed: 0.006, amplitude: 40, wavelength: 0.012, offset: 50 }
        ]
    }
};

const rssSources = {
    gbnews: { label: 'GB News', url: 'https://www.gbnews.com/feeds/news.rss' },
    bbc: { label: 'BBC News', url: 'https://feeds.bbci.co.uk/news/rss.xml?edition=uk' },
    sky: { label: 'Sky News (UK)', url: 'https://feeds.skynews.com/feeds/rss/uk.xml' },
};

let currentThemeKey = localStorage.getItem('dashboardTheme') || 'purple';
let currentRssKey = localStorage.getItem('dashboardRssSource') || 'bbc';

function applyTheme(key) {
    currentThemeKey = key;
    const t = dashboardThemes[key] || dashboardThemes.purple;
    const root = document.documentElement;
    root.style.setProperty('--theme-bg', t.bg);
    root.style.setProperty('--theme-text', t.text);
    root.style.setProperty('--theme-tile-bg', t.tileBg);
    root.style.setProperty('--theme-fade', t.fade);
    root.style.setProperty('--theme-clock-bg', t.clockBg);
    root.style.setProperty('--theme-card-bg', t.cardBg);
    root.style.setProperty('--theme-border', t.border);
}

applyTheme(currentThemeKey);

window.addEventListener('message', (e) => {
    if (!e.data || e.data.type !== 'settingsChanged') return;
    if (e.data.setting === 'theme') {
        applyTheme(e.data.value);
    }
    if (e.data.setting === 'rss') {
        currentRssKey = e.data.value;
        window.dispatchEvent(new Event('rssSourceChanged'));
    }
});

(function() {
    const canvas = document.getElementById('silk-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    function draw() {
        const theme = dashboardThemes[currentThemeKey] || dashboardThemes.purple;
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, width, height);
        theme.waves.forEach(wave => {
            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            for (let x = 0; x <= width; x += 10) {
                const y = height / 2 + 
                          Math.sin(x * wave.wavelength + time * wave.speed + wave.offset) * wave.amplitude +
                          Math.sin(x * wave.wavelength * 0.5 + time * wave.speed * 0.5) * (wave.amplitude / 2);
                ctx.lineTo(x, y);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.fillStyle = wave.color;
            ctx.fill();
            ctx.strokeStyle = wave.color.replace(/([\d.]+)\)$/, (_, a) => Math.min(1, parseFloat(a) + 0.2).toFixed(2) + ')');
            ctx.lineWidth = 1;
            ctx.stroke();
        });
        time += 1;
        requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    draw();
})();
function getRandomColor() {
    const colors = [
        '#da532c', '#2b5797', '#b91d47', '#99b433', '#00a300', 
        '#1e7145', '#ff0097', '#9f00a7', '#7e3878', '#603cba',
        '#00aba9', '#2d89ef', '#e3a21a', '#6d8764'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function parseCoordinate(coordStr) {
    const clean = coordStr.replace(/[{}]/g, '').trim();
    const parts = clean.split(',');
    const rowChar = parts[0].trim().toUpperCase();
    const colNum = parseInt(parts[1].trim());
    const rowNum = rowChar.charCodeAt(0) - 65; 
    return { r: rowNum, c: colNum };
}

function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

function updateClock(timeEl, dateEl) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}:${seconds}`;

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const year = now.getFullYear();
    const month = monthNames[now.getMonth()];
    const day = now.getDate();
    dateEl.textContent = `${month} ${day}${getOrdinalSuffix(day)}` + `, ${year}`;
}

let allGridItems = [];

function launchApp(sourceTile, url) {
    const backdrop = document.getElementById('app-backdrop');
    const rect = sourceTile.getBoundingClientRect();
    const container = document.createElement('div');
    container.className = 'animating-tile';
    container.style.top = rect.top + 'px';
    container.style.left = rect.left + 'px';
    container.style.width = rect.width + 'px';
    container.style.height = rect.height + 'px';
    const faceFront = document.createElement('div');
    faceFront.className = 'tile-face tile-front';
    const contentWrapper = document.createElement('div');
    contentWrapper.style.width = '100%';
    contentWrapper.style.height = '100%';
    contentWrapper.style.display = 'flex';
    contentWrapper.style.flexDirection = 'column';
    contentWrapper.style.justifyContent = 'flex-end';
    contentWrapper.innerHTML = sourceTile.innerHTML;
    
    faceFront.appendChild(contentWrapper);

    faceFront.style.backgroundColor = sourceTile.style.backgroundColor;
    faceFront.style.backgroundImage = sourceTile.style.backgroundImage;
    faceFront.style.backgroundSize = 'cover';
    faceFront.style.backgroundPosition = 'center';
    sourceTile.classList.forEach(cls => {
        if (cls !== 'tile') faceFront.classList.add(cls);
    });
    const compStyle = window.getComputedStyle(sourceTile);
    faceFront.style.padding = compStyle.padding;
    const faceBack = document.createElement('div');
    faceBack.className = 'tile-face tile-back';
    const header = document.createElement('div');
    header.className = 'app-header';
    const closeBtn = document.createElement('button');
    closeBtn.className = 'app-close-btn';
    closeBtn.innerHTML = '&#10005;';
    header.appendChild(closeBtn);
    const iframe = document.createElement('iframe');
    iframe.className = 'app-frame';
    iframe.src = url;

    faceBack.appendChild(header);
    faceBack.appendChild(iframe);

    container.appendChild(faceFront);
    container.appendChild(faceBack);
    document.body.appendChild(container);
    sourceTile.classList.add('source-hidden');
    container.offsetHeight;
    requestAnimationFrame(() => {
        backdrop.classList.add('active');
        container.classList.add('flipped');
        faceFront.classList.add('animate-shrink');
        const winW = window.innerWidth;
        const winH = window.innerHeight;
        const targetW = winW * 0.8;
        const targetH = winH * 0.8;
        
        container.style.top = ((winH - targetH) / 2) + 'px';
        container.style.left = ((winW - targetW) / 2) + 'px';
        container.style.width = targetW + 'px';
        container.style.height = targetH + 'px';
    });
    closeBtn.onclick = () => {
        backdrop.classList.remove('active');
        container.classList.remove('flipped');
        faceFront.classList.remove('animate-shrink');
        const currentRect = sourceTile.getBoundingClientRect();
        container.style.top = currentRect.top + 'px';
        container.style.left = currentRect.left + 'px';
        container.style.width = currentRect.width + 'px';
        container.style.height = currentRect.height + 'px';
        setTimeout(() => {
            document.body.removeChild(container);
            sourceTile.classList.remove('source-hidden');
        }, 800);
    };
}

function renderTiles() {
    if (allGridItems.length === 0) return;
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = ''; 

    allGridItems.forEach(item => {
        const id = item.getAttribute('id');
        const label = item.getAttribute('label');
        const locString = item.getAttribute('locations');
        const type = item.getAttribute('type');
        const link = item.getAttribute('link');
        const image = item.getAttribute('image');

        const rawLocs = locString.split('},').map(s => s.includes('}') ? s : s + '}');
        const coords = rawLocs.map(parseCoordinate);

        const minRow = Math.min(...coords.map(p => p.r));
        const maxRow = Math.max(...coords.map(p => p.r));
        const minCol = Math.min(...coords.map(p => p.c));
        const maxCol = Math.max(...coords.map(p => p.c));

        const rowStart = minRow + 1;
        const rowEnd = maxRow + 2;
        const colStart = minCol + 1;
        const colEnd = maxCol + 2;

        const tile = document.createElement('div');
        tile.className = 'tile';
        const bgColor = item.getAttribute('data-bg');
        if (bgColor) tile.style.backgroundColor = bgColor;
        const dataClass = item.getAttribute('data-class');
        if (dataClass) tile.classList.add(dataClass);
        tile.style.gridArea = `${rowStart} / ${colStart} / ${rowEnd} / ${colEnd}`;
        if (image) {
            tile.style.backgroundImage = `url('${image}')`;
            tile.style.backgroundSize = 'cover';
            tile.style.backgroundPosition = 'center';
        }
        if ((id === "8" || id === "10" || id === "12") && link) {
            tile.onclick = (e) => {
                e.preventDefault();
                launchApp(tile, link);
            };
            tile.title = label || "Launch App";
            tile.style.cursor = "pointer";
        } 
        else if (link) {
            tile.onclick = () => window.location.href = link;
            tile.title = label || ""; 
        }

        if (type === 'content') {
            tile.classList.add('content-tile');
            tile.innerHTML = item.textContent.trim();
            const scripts = tile.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                for (let i = 0; i < oldScript.attributes.length; i++) {
                    const attr = oldScript.attributes[i];
                    newScript.setAttribute(attr.name, attr.value);
                }
                if (oldScript.textContent) newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            const rssEl = tile.querySelector('[data-rss-url]');
            if (rssEl) {
                const wrapper = document.createElement('div');
                wrapper.style.display = 'flex';
                wrapper.style.flexDirection = 'column';
                wrapper.style.height = '100%';

                const header = document.createElement('div');
                header.style.cssText = 'flex:0 0 auto; display:flex; flex-direction:column; align-items:center; margin-bottom:8px; position:relative;';

                const topRow = document.createElement('div');
                topRow.style.cssText = 'width:100%; display:flex; justify-content:center; align-items:center; position:relative;';

                const title = document.createElement('div');
                title.textContent = rssSources[currentRssKey]?.label || label || 'News';
                title.style.cssText = 'font-weight:600; font-size:2em;';

                const refreshBtn = document.createElement('button');
                refreshBtn.textContent = 'Refresh';
                refreshBtn.style.cssText = 'position:absolute; right:0; top:0; cursor:pointer; font-size:2em;';

                const lastUpdated = document.createElement('div');
                lastUpdated.style.cssText = 'font-size:0.6em; opacity:0.85; text-align:center; margin-top:4px;';
                lastUpdated.textContent = '';

                topRow.appendChild(title);
                topRow.appendChild(refreshBtn);
                header.appendChild(topRow);
                header.appendChild(lastUpdated);

                const list = document.createElement('div');
                list.style.flex = '1 1 auto';
                list.style.minHeight = '0';
                list.style.overflowY = 'auto';
                list.style.paddingRight = '8px';
                list.style.fontSize = '2em';

                const listContainer = document.createElement('div');
                listContainer.style.cssText = 'flex:1 1 auto; min-height:0; position:relative; display:flex; flex-direction:column;';
                const rssFade = document.createElement('div');
                rssFade.className = 'rss-fade';
                rssFade.style.cssText = 'position:absolute; bottom:-1vh; left:0; right:0; height:80px; background:linear-gradient(to top, var(--theme-fade), transparent); pointer-events:none;';
                listContainer.appendChild(list);
                listContainer.appendChild(rssFade);

                wrapper.appendChild(header);
                wrapper.appendChild(listContainer);

                rssEl.parentNode.replaceChild(wrapper, rssEl);

                let lastUpdatedIso = 'never';
                function formatLastUpdated(isoString) {
                    if (!isoString || isoString === 'never') return 'never';
                    const then = new Date(isoString);
                    const now = new Date();
                    const totalMins = Math.floor((now - then) / 60000);
                    if (totalMins < 0) return 'just now';
                    if (totalMins < 60) return totalMins + ' minute' + (totalMins === 1 ? '' : 's') + ' ago';
                    const hours = Math.floor(totalMins / 60);
                    const mins = totalMins % 60;
                    if (mins === 0) return hours + ' hour' + (hours === 1 ? '' : 's') + ' ago';
                    return hours + ' hour' + (hours === 1 ? '' : 's') + ' and ' + mins + ' minute' + (mins === 1 ? '' : 's') + ' ago';
                }

                const renderRSS = (str) => {
                    try {
                        const parser = new DOMParser();
                        const rss = parser.parseFromString(str, 'application/xml');
                        const items = Array.from(rss.querySelectorAll('item')).slice(0, 20);
                        list.innerHTML = '';
                        items.forEach(it => {
                            const titleText = it.querySelector('title')?.textContent || 'No title';
                            const link = it.querySelector('link')?.textContent || '#';
                            const li = document.createElement('div');
                            li.style.padding = '8px 0';
                            li.style.borderBottom = '1px solid var(--theme-border)';
                            const a = document.createElement('a');
                            a.href = link.trim();
                            a.textContent = titleText.trim();
                            a.style.color = 'inherit';
                            a.style.textDecoration = 'none';
                            a.target = '_blank';
                            li.appendChild(a);
                            list.appendChild(li);
                        });
                    } catch (e) {
                        console.error('renderRSS parse error', e);
                        list.innerHTML = '<div>Could not parse RSS feed.</div>';
                    }
                };

                async function loadRss(force=false){
                    try{
                        const rssUrl = rssSources[currentRssKey]?.url || rssSources.bbc.url;
                        const url = 'http://localhost:5020/rss?url=' + encodeURIComponent(rssUrl) + (force ? '&force=true' : '');
                        const res = await fetch(url);
                        const txt = await res.text();
                        renderRSS(txt);
                        const lastUrl = 'http://localhost:5020/rss/last_updated?url=' + encodeURIComponent(rssUrl);
                        lastUpdatedIso = await fetch(lastUrl).then(r=>r.text()).catch(()=> 'never');
                        lastUpdated.textContent = 'Last updated: ' + formatLastUpdated(lastUpdatedIso);
                    }catch(e){
                        console.error('RSS load error', e);
                        list.innerHTML = '<div>Could not load RSS feed.</div>';
                    }
                }

                refreshBtn.addEventListener('click', ()=> loadRss(true));
                loadRss(false);
                setInterval(() => {
                    lastUpdated.textContent = 'Last updated: ' + formatLastUpdated(lastUpdatedIso);
                }, 60000);
                window.addEventListener('rssSourceChanged', () => {
                    title.textContent = rssSources[currentRssKey]?.label || 'News';
                    loadRss(true);
                });
            }
            const chatPlaceholder = tile.querySelector('[data-chat-placeholder]');
            if (chatPlaceholder) {
                const messagesEl = chatPlaceholder.querySelector('.chat-messages');
                const inputEl = chatPlaceholder.querySelector('.chat-input');
                const sendBtn = chatPlaceholder.querySelector('.chat-send');
                if (messagesEl && inputEl && sendBtn) {
                    const CHAT_STORAGE_KEY = 'dashboard_chat_history';
                    const CHAT_SUMMARY_THRESHOLD = 12;
                    const CHAT_RECENT_COUNT = 6;

                    function loadChatState() {
                        try {
                            const raw = localStorage.getItem(CHAT_STORAGE_KEY);
                            if (!raw) return { history: [], summary: '' };
                            const data = JSON.parse(raw);
                            return {
                                history: Array.isArray(data.history) ? data.history : [],
                                summary: typeof data.summary === 'string' ? data.summary : ''
                            };
                        } catch (e) {
                            return { history: [], summary: '' };
                        }
                    }
                    function saveChatState(history, summary) {
                        try {
                            localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({ history, summary: summary || '' }));
                        } catch (e) {}
                    }

                    const state = loadChatState();
                    if (state.history.length > 0) {
                        messagesEl.innerHTML = '';
                        state.history.forEach(({ role, content }) => {
                            const div = document.createElement('div');
                            div.className = 'chat-msg ' + (role === 'user' ? 'user' : 'bot');
                            const span = document.createElement('span');
                            span.textContent = content;
                            div.appendChild(span);
                            messagesEl.appendChild(div);
                        });
                    } else {
                        messagesEl.innerHTML = '<div class="chat-msg bot"><span>Hello. How can I help you today?</span></div>';
                    }
                    inputEl.disabled = false;
                    sendBtn.disabled = false;

                    let conversationSummary = state.summary;
                    const chatApi = '/chat';
                    const calendarEventApi = '/calendar/event';

                    function getHistoryFromDom() {
                        const msgDivs = messagesEl.querySelectorAll('.chat-msg');
                        return Array.from(msgDivs).map((div) => ({
                            role: div.classList.contains('user') ? 'user' : 'assistant',
                            content: (div.querySelector('span') || div).textContent.trim()
                        }));
                    }
                    function buildMessagesForApi() {
                        const raw = getHistoryFromDom();
                        let i = 0;
                        while (i < raw.length && raw[i].role === 'assistant') i++;
                        const fromUser = raw.slice(i);
                        return fromUser.length > 10 ? fromUser.slice(-10) : fromUser;
                    }
                    function appendMsg(role, text) {
                        const div = document.createElement('div');
                        div.className = 'chat-msg ' + (role === 'user' ? 'user' : 'bot');
                        const span = document.createElement('span');
                        span.textContent = text;
                        div.appendChild(span);
                        messagesEl.appendChild(div);
                        messagesEl.scrollTop = messagesEl.scrollHeight;
                    }

                    async function requestSummary(messagesToSummarize) {
                        const text = messagesToSummarize.map((m) => (m.role === 'user' ? 'User' : 'Assistant') + ': ' + m.content).join('\n');
                        const res = await fetch(chatApi, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                messages: [{
                                    role: 'user',
                                    content: 'Summarize the following conversation in 2–4 sentences. Preserve key facts and decisions.\n\nConversation:\n' + text
                                }]
                            })
                        });
                        if (!res.ok) return '';
                        const data = await res.json();
                        return (data.content || '').trim();
                    }

                    async function sendMessage() {
                        const text = (inputEl.value || '').trim();
                        if (!text) return;
                        inputEl.value = '';
                        inputEl.disabled = true;
                        sendBtn.disabled = true;
                        appendMsg('user', text);

                        const fullHistory = getHistoryFromDom();
                        let i = 0;
                        while (i < fullHistory.length && fullHistory[i].role === 'assistant') i++;
                        const fromUser = fullHistory.slice(i);

                        if (fromUser.length > CHAT_SUMMARY_THRESHOLD) {
                            const toSummarize = fromUser.slice(0, -CHAT_RECENT_COUNT);
                            if (toSummarize.length > 0) {
                                try {
                                    conversationSummary = await requestSummary(toSummarize);
                                } catch (e) {
                                    console.error('Summary request failed', e);
                                }
                            }
                        }

                        const messages = buildMessagesForApi();
                        let botContent = 'Sorry, I could not get a response.';
                        try {
                            const res = await fetch(chatApi, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ messages })
                            });
                            if (res.ok) {
                                const data = await res.json();
                                botContent = (data.content || '').trim() || botContent;
                            } else {
                                const errBody = await res.text();
                                let errDetail = errBody;
                                try {
                                    const errJson = JSON.parse(errBody);
                                    errDetail = errJson.detail || errBody;
                                } catch (_) {}
                                botContent = 'Error ' + res.status + ': ' + (errDetail || res.statusText);
                            }
                        } catch (e) {
                            console.error('Chat request failed', e);
                            botContent = 'Request failed: ' + (e.message || String(e));
                        }

                        const calPrefix = 'CALENDAR_ACTION:';
                        const calIdx = botContent.indexOf(calPrefix);
                        if (calIdx !== -1) {
                            const braceStart = botContent.indexOf('{', calIdx + calPrefix.length);
                            if (braceStart !== -1) {
                                let depth = 0, braceEnd = -1;
                                for (let i = braceStart; i < botContent.length; i++) {
                                    if (botContent[i] === '{') depth++;
                                    else if (botContent[i] === '}') { depth--; if (depth === 0) { braceEnd = i; break; } }
                                }
                                if (braceEnd !== -1) {
                                    try {
                                        const payload = JSON.parse(botContent.slice(braceStart, braceEnd + 1));
                                        const createRes = await fetch(calendarEventApi, {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({
                                                summary: payload.summary || '',
                                                start: payload.start || '',
                                                end: payload.end || '',
                                                description: payload.description || ''
                                            })
                                        });
                                        if (createRes.ok) {
                                            botContent = (botContent.slice(0, calIdx).trim() + '\n' + botContent.slice(braceEnd + 1).trim()).trim();
                                            if (!botContent) botContent = "I've added that to your calendar.";
                                        } else {
                                            const errData = await createRes.text();
                                            let errMsg = errData;
                                            try { const j = JSON.parse(errData); errMsg = j.detail || errMsg; } catch (_) {}
                                            botContent = (botContent.slice(0, calIdx).trim() + '\n' + botContent.slice(braceEnd + 1).trim()).trim() || "I tried to add that event.";
                                            botContent += " (Calendar: " + errMsg + ")";
                                        }
                                    } catch (parseErr) {
                                        console.error('Calendar action parse failed', parseErr);
                                        botContent = botContent.slice(0, calIdx).trim() + botContent.slice(braceEnd + 1).trim();
                                    }
                                }
                            }
                        }
                        appendMsg('bot', botContent);

                        const savedHistory = getHistoryFromDom();
                        saveChatState(savedHistory, conversationSummary);
                        inputEl.disabled = false;
                        sendBtn.disabled = false;
                        inputEl.focus();
                    }
                    sendBtn.addEventListener('click', sendMessage);
                    inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
                }
            }
            const weatherEl = tile.querySelector('[data-weather]');
            if (weatherEl) {
                const backendWeather = 'http://localhost:5020/weather';
                const lat = weatherEl.getAttribute('data-lat') || '50.8225';
                const lon = weatherEl.getAttribute('data-lon') || '-0.1372';
                const wrapper = document.createElement('div');
                wrapper.className = 'weather-widget';
                const weatherCodeLabel = (code) => {
                    if (code === 0) return 'Clear';
                    if (code <= 3) return 'Cloudy';
                    if (code <= 49) return 'Fog';
                    if (code <= 67) return 'Rain';
                    if (code <= 77) return 'Snow';
                    if (code <= 82) return 'Showers';
                    if (code <= 99) return 'Storm';
                    return '';
                };
                const scrollSection = (titleText) => {
                    const section = document.createElement('div');
                    section.className = 'weather-widget__section';
                    const header = document.createElement('div');
                    header.className = 'weather-widget__label';
                    header.textContent = titleText;
                    const scrollArea = document.createElement('div');
                    scrollArea.className = 'weather-widget__scroll-area';
                    section.appendChild(header);
                    section.appendChild(scrollArea);
                    wrapper.appendChild(section);
                    return { section, scrollArea, header };
                };
                const hourlySection = scrollSection('Next 24 hours');
                const dailySection = scrollSection('2-week forecast');
                const renderWeather = (data) => {
                    if (!data || !data.hourly) return;
                    const h = data.hourly;
                    const times = h.time || [];
                    const temps = h.temperature_2m || [];
                    const codes = h.weathercode || [];
                    const now = new Date();
                    let startIdx = 0;
                    for (let i = 0; i < times.length; i++) {
                        if (new Date(times[i]) >= now) { startIdx = i; break; }
                    }
                    const next24Indices = [];
                    for (let i = 0; i < 24 && startIdx + i < times.length; i++) next24Indices.push(startIdx + i);
                    hourlySection.scrollArea.innerHTML = '';
                    for (const i of next24Indices) {
                        const card = document.createElement('div');
                        card.className = 'weather-widget__card';
                        const timeStr = times[i].slice(11, 16);
                        card.innerHTML = `<div class="weather-widget__line weather-widget__line--time">${timeStr}</div><div class="weather-widget__line weather-widget__line--temp">${temps[i] != null ? Math.round(temps[i]) + '°' : '-'}</div><div class="weather-widget__line weather-widget__line--desc">${weatherCodeLabel(codes[i] || 0)}</div>`;
                        hourlySection.scrollArea.appendChild(card);
                    }
                    if (data.daily) {
                        const d = data.daily;
                        const days = d.time || [];
                        const minT = d.temperature_2m_min || [];
                        const maxT = d.temperature_2m_max || [];
                        const dCodes = d.weathercode || [];
                        dailySection.scrollArea.innerHTML = '';
                        const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
                        for (let i = 0; i < days.length; i++) {
                            const card = document.createElement('div');
                            card.className = 'weather-widget__card';
                            const dDate = new Date(days[i]);
                            const dayName = i === 0 ? 'Today' : dayNames[dDate.getDay()];
                            card.innerHTML = `<div class="weather-widget__line weather-widget__line--time">${dayName}</div><div class="weather-widget__line weather-widget__line--temp">${maxT[i] != null ? Math.round(maxT[i]) + '°' : '-'}</div><div class="weather-widget__line weather-widget__line--min">${minT[i] != null ? Math.round(minT[i]) + '°' : '-'}</div><div class="weather-widget__line weather-widget__line--desc">${weatherCodeLabel(dCodes[i] || 0)}</div>`;
                            dailySection.scrollArea.appendChild(card);
                        }
                    }
                };
                (async () => {
                    try {
                        const res = await fetch(backendWeather + '?lat=' + lat + '&lon=' + lon);
                        const data = await res.json();
                        renderWeather(data);
                    } catch (e) {
                        console.error('Weather load error', e);
                        hourlySection.scrollArea.innerHTML = '<div style="padding:8px;opacity:0.8;">Could not load weather.</div>';
                    }
                })();
                weatherEl.parentNode.replaceChild(wrapper, weatherEl);
            }
            const spotifyEl = tile.querySelector('[data-spotify-widget]');
            if (spotifyEl) {
                const spotifyAuth = '/auth/spotify';
                const spotifyStatusUrl = '/spotify/status';
                const spotifyTokenUrl = '/spotify/token';
                function escapeHtml(s) {
                    const div = document.createElement('div');
                    div.textContent = s || '';
                    return div.innerHTML;
                }
                function createSpotifyPlayer(container, authUrl, tokenUrl, esc) {
                    const tokenPromise = () => fetch(tokenUrl).then(r => r.json()).then(d => d.access_token);
                    const player = new window.Spotify.Player({
                        name: 'Dashboard',
                        getOAuthToken: function(cb) { tokenPromise().then(cb); },
                        volume: 0.5
                    });
                    const nowPlayingUrl = '/spotify/now-playing';
                    const devicesUrl = '/spotify/devices';
                    const transferUrl = '/spotify/transfer';
                    const playUrl = '/spotify/play';
                    const pauseUrl = '/spotify/pause';
                    const nextUrl = '/spotify/next';
                    const prevUrl = '/spotify/previous';
                    const volumeUrl = '/spotify/volume';
                    const svgPrev = '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z"/></svg>';
                    const svgNext = '<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M6 18l8.5-6L6 6v12zm2.5-6l5 3.5V8.5l-5 3.5zM16 6h2v12h-2V6z"/></svg>';
                    const svgPlay = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7L8 5z"/></svg>';
                    const svgPause = '<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
                    const ui = document.createElement('div');
                    ui.className = 'spotify-player-ui';
                    ui.innerHTML = '<div class="spotify-glass spotify-now-playing-card">' +
                        '<div class="spotify-art-wrap"><img src="" alt="" class="spotify-art"></div>' +
                        '<div class="spotify-track-info"><span class="spotify-track-name">—</span><span class="spotify-artist-name">—</span></div>' +
                        '</div>' +
                        '<div class="spotify-glass spotify-progress-row">' +
                        '<span class="spotify-time-elapsed">0:00</span>' +
                        '<input type="range" class="spotify-progress" min="0" max="100" value="0" aria-label="Progress">' +
                        '<span class="spotify-time-total">0:00</span>' +
                        '</div>' +
                        '<div class="spotify-glass spotify-controls">' +
                        '<button type="button" class="spotify-btn spotify-prev" aria-label="Previous">' + svgPrev + '</button>' +
                        '<button type="button" class="spotify-btn spotify-play spotify-play-accent" aria-label="Play">' + svgPlay + '</button>' +
                        '<button type="button" class="spotify-btn spotify-next" aria-label="Next">' + svgNext + '</button>' +
                        '</div>' +
                        '<div class="spotify-glass spotify-volume-row">' +
                        '<svg class="spotify-vol-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>' +
                        '<input type="range" class="spotify-volume" min="0" max="100" value="50" aria-label="Volume">' +
                        '</div>' +
                        '<div class="spotify-glass spotify-device-row"><label class="spotify-device-label">Play on</label><select class="spotify-device-select" aria-label="Device"><option value="">Loading…</option></select></div>' +
                        '<a href="https://open.spotify.com" target="_blank" rel="noopener" class="spotify-open-link">Open Spotify</a>';
                    container.innerHTML = '';
                    container.appendChild(ui);
                    const artEl = ui.querySelector('.spotify-art');
                    const trackName = ui.querySelector('.spotify-track-name');
                    const artistName = ui.querySelector('.spotify-artist-name');
                    const playBtn = ui.querySelector('.spotify-play');
                    const volSlider = ui.querySelector('.spotify-volume');
                    const deviceSelect = ui.querySelector('.spotify-device-select');
                    const progressBar = ui.querySelector('.spotify-progress');
                    const timeElapsed = ui.querySelector('.spotify-time-elapsed');
                    const timeTotal = ui.querySelector('.spotify-time-total');
                    function formatTime(ms) {
                        if (ms == null || isNaN(ms) || ms < 0) return '0:00';
                        const s = Math.floor(ms / 1000);
                        const m = Math.floor(s / 60);
                        const sec = s % 60;
                        return m + ':' + (sec < 10 ? '0' : '') + sec;
                    }
                    async function loadDevices() {
                        try {
                            const r = await fetch(devicesUrl);
                            let data = {};
                            try { if (r.ok) data = await r.json(); } catch (_) {}
                            const devices = Array.isArray(data.devices) ? data.devices : [];
                            const activeId = devices.find(d => d.is_active)?.id || '';
                            if (devices.length) {
                                deviceSelect.innerHTML = devices.map(d => '<option value="' + esc(d.id) + '"' + (d.id === activeId ? ' selected' : '') + '>' + esc(d.name) + (d.type ? ' (' + esc(d.type) + ')' : '') + (d.is_active ? ' ●' : '') + '</option>').join('');
                                deviceSelect.disabled = false;
                            } else {
                                const msg = r.status === 401 ? 'Reconnect Spotify' : 'No devices found';
                                deviceSelect.innerHTML = '<option value="">' + msg + '</option>';
                                deviceSelect.disabled = true;
                            }
                        } catch (e) {
                            deviceSelect.innerHTML = '<option value="">No devices</option>';
                            deviceSelect.disabled = true;
                        }
                    }
                    deviceSelect.addEventListener('change', function() {
                        const id = deviceSelect.value;
                        if (!id) return;
                        fetch(transferUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ device_id: id }) }).then(function() { loadDevices(); }).catch(function() {});
                    });
                    loadDevices();
                    setInterval(loadDevices, 8000);
                    function updateFromNowPlaying(data) {
                        if (data && data.playing) {
                            trackName.textContent = data.name || '—';
                            artistName.textContent = data.artist_str || '—';
                            if (data.image_url) {
                                artEl.src = data.image_url;
                                artEl.style.display = '';
                            } else {
                                artEl.style.display = 'none';
                            }
                            const dur = data.duration_ms || 0;
                            const prog = data.progress_ms != null ? data.progress_ms : 0;
                            progressBar.max = dur || 1;
                            progressBar.value = Math.min(prog, dur || 1);
                            timeElapsed.textContent = formatTime(prog);
                            timeTotal.textContent = formatTime(dur);
                            setPlaying(true);
                        } else {
                            trackName.textContent = data && data.message ? data.message : 'Nothing playing';
                            artistName.textContent = 'Play on any device to see it here';
                            artEl.style.display = 'none';
                            progressBar.value = 0;
                            progressBar.max = 100;
                            timeElapsed.textContent = '0:00';
                            timeTotal.textContent = '0:00';
                            setPlaying(false);
                        }
                    }
                    async function pollNowPlaying() {
                        try {
                            const r = await fetch(nowPlayingUrl);
                            if (r.ok) { const data = await r.json(); updateFromNowPlaying(data); }
                        } catch (e) {}
                    }
                    pollNowPlaying();
                    setInterval(pollNowPlaying, 3000);
                    function updateTrack(track) {
                        if (track) {
                            trackName.textContent = track.name || '—';
                            artistName.textContent = (track.artists && track.artists.map(a => a.name).join(', ')) || '—';
                            if (track.album && track.album.images && track.album.images[0]) {
                                artEl.src = track.album.images[0].url;
                                artEl.style.display = '';
                            }
                        }
                    }
                    function setPlaying(playing) {
                        playBtn.innerHTML = playing ? svgPause : svgPlay;
                        playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
                    }
                    player.addListener('ready', function() { loadDevices(); });
                    player.addListener('player_state_changed', function(state) {
                        if (state) {
                            setPlaying(!state.paused);
                            if (state.track_window && state.track_window.current_track) updateTrack(state.track_window.current_track);
                        }
                    });
                    playBtn.addEventListener('click', function() {
                        const isPaused = playBtn.getAttribute('aria-label') === 'Play';
                        fetch(isPaused ? playUrl : pauseUrl, { method: 'POST' })
                            .then(function() { setTimeout(pollNowPlaying, 300); })
                            .catch(function() {});
                        if (isPaused) setPlaying(true); else setPlaying(false);
                    });
                    ui.querySelector('.spotify-prev').addEventListener('click', function() {
                        fetch(prevUrl, { method: 'POST' }).then(function() { setTimeout(pollNowPlaying, 400); }).catch(function() {});
                    });
                    ui.querySelector('.spotify-next').addEventListener('click', function() {
                        fetch(nextUrl, { method: 'POST' }).then(function() { setTimeout(pollNowPlaying, 400); }).catch(function() {});
                    });
                    volSlider.addEventListener('input', function() {
                        const pct = parseInt(volSlider.value, 10);
                        fetch(volumeUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ volume_percent: pct }) }).catch(function() {});
                        if (player._options) player.setVolume(pct / 100);
                    });
                    player.addListener('not_ready', function() { trackName.textContent = 'Device not ready'; });
                    player.connect();
                }
                async function initSpotifyWidget() {
                    try {
                        const statusRes = await fetch(spotifyStatusUrl);
                        const status = await statusRes.json();
                        if (!status.connected) {
                            spotifyEl.innerHTML = '<div class="spotify-connect"><span class="spotify-label">Spotify</span><p class="spotify-hint">Connect your account to control playback from this dashboard (play/pause, volume). Requires Spotify Premium.</p><a href="' + spotifyAuth + '" class="spotify-connect-btn">Connect with Spotify</a></div>';
                            return;
                        }
                        if (!window.Spotify) {
                            spotifyEl.innerHTML = '<div class="spotify-connect"><span class="spotify-label">Spotify</span><p class="spotify-hint">Loading player...</p></div>';
                            window.onSpotifyWebPlaybackSDKReady = function() { createSpotifyPlayer(spotifyEl, spotifyAuth, spotifyTokenUrl, escapeHtml); };
                            return;
                        }
                        createSpotifyPlayer(spotifyEl, spotifyAuth, spotifyTokenUrl, escapeHtml);
                    } catch (e) {
                        console.error('Spotify widget error', e);
                        spotifyEl.innerHTML = '<div class="spotify-connect"><span class="spotify-label">Spotify</span><a href="' + spotifyAuth + '" class="spotify-connect-btn">Connect with Spotify</a></div>';
                    }
                }
                initSpotifyWidget();
            }

            // --- Gmail Widget ---
            const gmailEl = tile.querySelector('[data-gmail-widget]');
            if (gmailEl) {
                const gmailBaseUrl = 'http://localhost:5020';
                const ui = gmailEl;

                function truncate(str, len) { return str.length > len ? str.slice(0, len) + '…' : str; }

                function renderGmailWidget(emails, composing) {
                    if (composing) return;
                    let html = '<div class="gmail-header"><span class="gmail-title">Inbox</span>' +
                        '<button type="button" class="gmail-btn gmail-refresh-btn" aria-label="Refresh">↻</button>' +
                        '<button type="button" class="gmail-btn gmail-compose-btn" aria-label="Compose">✉ Compose</button>' +
                        '</div>';
                    if (!emails || emails.length === 0) {
                        html += '<div class="gmail-empty">No emails found. <a href="' + gmailBaseUrl + '/auth/google">Connect Google</a></div>';
                    } else {
                        html += '<div class="gmail-list">';
                        emails.forEach(function(em) {
                            var fromName = em.from || 'Unknown';
                            var match = fromName.match(/^([^<]+)/);
                            if (match) fromName = match[1].trim();
                            html += '<div class="gmail-email-card" data-email-id="' + em.id + '">' +
                                '<div class="gmail-email-from">' + escapeHtml(truncate(fromName, 30)) + '</div>' +
                                '<div class="gmail-email-subject">' + escapeHtml(truncate(em.subject || '(No subject)', 50)) + '</div>' +
                                '<div class="gmail-email-snippet">' + escapeHtml(truncate(em.snippet || '', 80)) + '</div>' +
                                '<div class="gmail-email-date">' + escapeHtml(em.date || '') + '</div>' +
                                '</div>';
                        });
                        html += '</div>';
                    }
                    html += '<div class="gmail-summary-area"></div>';
                    ui.innerHTML = html;

                    ui.querySelector('.gmail-refresh-btn').addEventListener('click', loadEmails);
                    ui.querySelector('.gmail-compose-btn').addEventListener('click', showComposeForm);

                    ui.querySelectorAll('.gmail-email-card').forEach(function(card) {
                        card.addEventListener('click', function() {
                            var emailId = card.getAttribute('data-email-id');
                            var email = (cachedEmails || []).find(function(e) { return e.id === emailId; });
                            if (email) showEmailDetail(email);
                        });
                    });
                }

                var cachedEmails = [];
                var isComposing = false;

                function showEmailDetail(email) {
                    var html = '<div class="gmail-detail">' +
                        '<button type="button" class="gmail-btn gmail-back-btn">← Back</button>' +
                        '<div class="gmail-detail-subject">' + escapeHtml(email.subject || '(No subject)') + '</div>' +
                        '<div class="gmail-detail-meta">From: ' + escapeHtml(email.from || '') + '</div>' +
                        '<div class="gmail-detail-meta">Date: ' + escapeHtml(email.date || '') + '</div>' +
                        '<div class="gmail-detail-body">' + escapeHtml(email.body || email.snippet || '').replace(/\n/g, '<br>') + '</div>' +
                        '<div class="gmail-detail-actions">' +
                        '<button type="button" class="gmail-btn gmail-summarize-btn">Summarize with AI</button>' +
                        '<button type="button" class="gmail-btn gmail-reply-btn">Reply</button>' +
                        '</div>' +
                        '<div class="gmail-ai-result"></div>' +
                        '</div>';
                    ui.innerHTML = html;
                    ui.querySelector('.gmail-back-btn').addEventListener('click', function() { renderGmailWidget(cachedEmails, false); });
                    ui.querySelector('.gmail-summarize-btn').addEventListener('click', function() {
                        var resultDiv = ui.querySelector('.gmail-ai-result');
                        resultDiv.innerHTML = '<div class="gmail-loading">Summarizing...</div>';
                        fetch(gmailBaseUrl + '/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ messages: [
                                { role: 'user', content: 'Summarize this email concisely in 2-3 sentences. Include key action items if any.\n\nFrom: ' + email.from + '\nSubject: ' + email.subject + '\n\n' + (email.body || email.snippet) }
                            ]})
                        })
                        .then(function(r) { return r.json(); })
                        .then(function(data) { resultDiv.innerHTML = '<div class="gmail-ai-summary">' + escapeHtml(data.content || 'No summary.') + '</div>'; })
                        .catch(function(e) { resultDiv.innerHTML = '<div class="gmail-error">Failed to summarize.</div>'; });
                    });
                    ui.querySelector('.gmail-reply-btn').addEventListener('click', function() {
                        showComposeForm(email);
                    });
                }

                function showComposeForm(replyTo) {
                    isComposing = true;
                    var toVal = '';
                    var subjectVal = '';
                    if (replyTo && replyTo.from) {
                        var emailMatch = replyTo.from.match(/<([^>]+)>/);
                        toVal = emailMatch ? emailMatch[1] : replyTo.from;
                        subjectVal = 'Re: ' + (replyTo.subject || '');
                    }
                    var html = '<div class="gmail-compose">' +
                        '<button type="button" class="gmail-btn gmail-back-btn">← Back</button>' +
                        '<div class="gmail-compose-title">' + (replyTo ? 'Reply' : 'New Email') + '</div>' +
                        '<input type="email" class="gmail-input gmail-to" placeholder="To" value="' + escapeHtml(toVal) + '">' +
                        '<input type="text" class="gmail-input gmail-subject" placeholder="Subject" value="' + escapeHtml(subjectVal) + '">' +
                        '<textarea class="gmail-textarea gmail-body" placeholder="Write your message..." rows="4"></textarea>' +
                        '<div class="gmail-compose-actions">' +
                        '<button type="button" class="gmail-btn gmail-ai-draft-btn">Draft with AI</button>' +
                        '<button type="button" class="gmail-btn gmail-send-btn">Send</button>' +
                        '</div>' +
                        '<div class="gmail-compose-status"></div>' +
                        '</div>';
                    ui.innerHTML = html;

                    ui.querySelector('.gmail-back-btn').addEventListener('click', function() {
                        isComposing = false;
                        renderGmailWidget(cachedEmails, false);
                    });

                    ui.querySelector('.gmail-ai-draft-btn').addEventListener('click', function() {
                        var toField = ui.querySelector('.gmail-to').value;
                        var subjectField = ui.querySelector('.gmail-subject').value;
                        var bodyField = ui.querySelector('.gmail-body');
                        var statusDiv = ui.querySelector('.gmail-compose-status');
                        var context = replyTo ? 'You are replying to an email.\nOriginal from: ' + replyTo.from + '\nOriginal subject: ' + replyTo.subject + '\nOriginal body: ' + (replyTo.body || replyTo.snippet || '').slice(0, 1000) + '\n\n' : '';
                        statusDiv.innerHTML = '<div class="gmail-loading">Drafting...</div>';
                        fetch(gmailBaseUrl + '/chat', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ messages: [
                                { role: 'user', content: context + 'Draft a professional email reply. To: ' + toField + '. Subject: ' + subjectField + '. ' + (bodyField.value ? 'My notes: ' + bodyField.value : 'Write an appropriate response.') + '\n\nReturn ONLY the email body text, no subject line or greeting format instructions.' }
                            ]})
                        })
                        .then(function(r) { return r.json(); })
                        .then(function(data) {
                            bodyField.value = data.content || '';
                            statusDiv.innerHTML = '<div class="gmail-success">Draft ready — review and send.</div>';
                        })
                        .catch(function() { statusDiv.innerHTML = '<div class="gmail-error">Failed to draft.</div>'; });
                    });

                    ui.querySelector('.gmail-send-btn').addEventListener('click', function() {
                        var to = ui.querySelector('.gmail-to').value.trim();
                        var subject = ui.querySelector('.gmail-subject').value.trim();
                        var body = ui.querySelector('.gmail-body').value.trim();
                        var statusDiv = ui.querySelector('.gmail-compose-status');
                        if (!to || !subject || !body) {
                            statusDiv.innerHTML = '<div class="gmail-error">Fill in all fields.</div>';
                            return;
                        }
                        statusDiv.innerHTML = '<div class="gmail-loading">Sending...</div>';
                        fetch(gmailBaseUrl + '/gmail/send', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ to: to, subject: subject, body: body })
                        })
                        .then(function(r) {
                            if (!r.ok) throw new Error('Send failed');
                            return r.json();
                        })
                        .then(function() {
                            statusDiv.innerHTML = '<div class="gmail-success">Email sent!</div>';
                            setTimeout(function() { isComposing = false; loadEmails(); }, 1500);
                        })
                        .catch(function() { statusDiv.innerHTML = '<div class="gmail-error">Failed to send email.</div>'; });
                    });
                }

                function loadEmails() {
                    if (isComposing) return;
                    fetch(gmailBaseUrl + '/gmail/recent?count=3')
                        .then(function(r) {
                            if (r.status === 401) {
                                ui.innerHTML = '<div class="gmail-connect"><span>Gmail</span><a href="' + gmailBaseUrl + '/auth/google" class="gmail-connect-btn">Connect Google Account</a></div>';
                                return null;
                            }
                            return r.json();
                        })
                        .then(function(data) {
                            if (!data) return;
                            cachedEmails = data.emails || [];
                            renderGmailWidget(cachedEmails, isComposing);
                        })
                        .catch(function(e) {
                            console.error('Gmail load error', e);
                            ui.innerHTML = '<div class="gmail-error">Could not load emails.</div>';
                        });
                }

                loadEmails();
                setInterval(function() { if (!isComposing) loadEmails(); }, 60000);
            }

            if (id === '3' && !item.getAttribute('data-calendar-embed')) {
                const calWrapper = document.createElement('div');
                calWrapper.style.cssText = 'display:flex; flex-direction:column; height:100%;';
                const calHeader = document.createElement('div');
                calHeader.style.cssText = 'flex:0 0 auto; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;';
                const calTitle = document.createElement('div');
                calTitle.textContent = label || "Today's calendar events";
                calTitle.style.cssText = 'font-weight:600; font-size:2em;';
                const calRefreshBtn = document.createElement('button');
                calRefreshBtn.textContent = 'Refresh';
                calRefreshBtn.style.cssText = 'cursor:pointer; font-size:2em;';
                const calList = document.createElement('div');
                calList.style.cssText = 'flex:1 1 auto; min-height:0; overflow-y:auto; padding-right:8px; font-size:2em;';
                calHeader.appendChild(calTitle);
                calHeader.appendChild(calRefreshBtn);
                calWrapper.appendChild(calHeader);
                calWrapper.appendChild(calList);
                tile.innerHTML = '';
                tile.appendChild(calWrapper);

                const backendCalendar = 'http://localhost:5020/calendar/events';
                const backendCalendarRefresh = 'http://localhost:5020/calendar/refresh';

                function formatEventTime(startStr) {
                    if (!startStr) return '';
                    if (startStr.indexOf('T') !== -1) {
                        const d = new Date(startStr);
                        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    }
                    return startStr;
                }

                function renderCalendarEvents(xmlText) {
                    try {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(xmlText, 'application/xml');
                        const events = doc.querySelectorAll('event');
                        calList.innerHTML = '';
                        events.forEach(ev => {
                            const titleEl = ev.querySelector('title');
                            const startEl = ev.querySelector('start');
                            const linkEl = ev.querySelector('link');
                            const title = titleEl ? titleEl.textContent : '(No title)';
                            const startStr = startEl ? startEl.textContent : '';
                            const link = linkEl ? linkEl.textContent : '#';
                            const div = document.createElement('div');
                            div.style.padding = '8px 0';
                            div.style.borderBottom = '1px solid var(--theme-border)';
                            const timeStr = formatEventTime(startStr);
                            const a = document.createElement('a');
                            a.href = link;
                            a.textContent = (timeStr ? timeStr + ' — ' : '') + title;
                            a.style.color = 'inherit';
                            a.style.textDecoration = 'none';
                            a.target = '_blank';
                            div.appendChild(a);
                            calList.appendChild(div);
                        });
                        if (events.length === 0) calList.innerHTML = '<div style="opacity:0.8;">No events today.</div>';
                    } catch (e) {
                        calList.innerHTML = '<div>Could not parse calendar.</div>';
                    }
                }

                async function loadCalendar() {
                    try {
                        const res = await fetch(backendCalendar);
                        if (res.status === 401 || res.status === 501) {
                            calList.innerHTML = '<div style="opacity:0.9;">Sign in with Google in Settings to see your calendar.</div>';
                            return;
                        }
                        if (!res.ok) throw new Error(res.statusText);
                        const txt = await res.text();
                        renderCalendarEvents(txt);
                    } catch (e) {
                        console.error('Calendar load error', e);
                        calList.innerHTML = '<div>Sign in with Google in Settings to see your calendar.</div>';
                    }
                }

                calRefreshBtn.addEventListener('click', async () => {
                    await fetch(backendCalendarRefresh, { method: 'POST' });
                    loadCalendar();
                });
                loadCalendar();

                window.addEventListener('message', (e) => {
                    if (e.data && e.data.type === 'settingsChanged' && e.data.setting === 'calendar') loadCalendar();
                });
            }
            if (!link) tile.onclick = null; 
        } else if (type === 'nav') {
            tile.classList.add('nav-tile');
            tile.innerHTML = `
                <img src="back.svg" class="nav-arrow" alt="Back">
                <span class="tile-label">Home page</span>
            `;
            tile.title = "Return Home";
        } else if (type === 'clock') {
            tile.classList.add('clock-tile');
            const timeSpan = document.createElement('div');
            timeSpan.className = 'clock-time';
            const dateSpan = document.createElement('div');
            dateSpan.className = 'clock-date';
            tile.appendChild(timeSpan);
            tile.appendChild(dateSpan);
            updateClock(timeSpan, dateSpan);
            setInterval(() => updateClock(timeSpan, dateSpan), 1000);
        } else {
            if (type === 'menu') {
                tile.classList.add('menu-tile');
                tile.innerHTML = `
                    <img src="images/link.png" class="menu-icon" alt="Link">
                    <span class="tile-label">${label}</span>
                `;
            } else {
                if (!image) {
                    tile.style.backgroundColor = getRandomColor();
                }
                tile.innerHTML = `<span class="tile-label">${label}</span>`;
            }
        }
        gridContainer.appendChild(tile);
    });
}

function parseLayoutConfig(xmlDoc) {
    const grid = xmlDoc && xmlDoc.querySelector('layout grid');
    if (!grid) return null;
    return {
        cols: parseInt(grid.getAttribute('cols'), 10) || 6,
        rows: parseInt(grid.getAttribute('rows'), 10) || 4,
        gap: parseInt(grid.getAttribute('gap'), 10) || 10,
        padding: parseInt(grid.getAttribute('padding'), 10) || 40
    };
}

function resizeGrid(layoutConfig) {
    const config = layoutConfig || { cols: 6, rows: 4, gap: 10, padding: 40 };
    const availableHeight = window.innerHeight;
    const availableWidth = window.innerWidth;
    const cols = config.cols;
    const rows = config.rows;
    const gap = config.gap;
    const padding = config.padding;

    const root = document.documentElement;
    root.style.setProperty('--grid-cols', cols);
    root.style.setProperty('--grid-rows', rows);
    root.style.setProperty('--gap-size', `${gap}px`);

    const maxTileW = (availableWidth - (gap * (cols - 1)) - padding) / cols;
    const maxTileH = (availableHeight - (gap * (rows - 1)) - padding) / rows;
    const tileSize = Math.floor(Math.min(maxTileW, maxTileH));

    const gridW = (tileSize * cols) + (gap * (cols - 1));
    const gridH = (tileSize * rows) + (gap * (rows - 1));

    root.style.setProperty('--tile-size', `${tileSize}px`);
    root.style.setProperty('--grid-width', `${gridW}px`);
    root.style.setProperty('--grid-height', `${gridH}px`);

    renderTiles();
}

let layoutConfig = null;

document.addEventListener('DOMContentLoaded', () => {
    const parser = new DOMParser();

    fetch('grid.xml')
        .then(res => res.text())
        .then(xmlText => {
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            layoutConfig = parseLayoutConfig(xmlDoc);
            allGridItems = Array.from(xmlDoc.getElementsByTagName('item'));
            resizeGrid(layoutConfig);
        })
        .catch(err => console.error('Error loading grid.xml:', err));

    window.addEventListener('resize', () => resizeGrid(layoutConfig));
});
