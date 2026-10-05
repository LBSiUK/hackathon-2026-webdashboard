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

// server.py serves this page and its API from the same origin, so API calls use
// relative URLs. That also means an iPad on the same network talks to the right
// machine instead of to its own localhost. Set window.DASHBOARD_API_BASE before
// this script loads to use a backend somewhere else.
const API_BASE = window.DASHBOARD_API_BASE
    || (window.location.protocol === 'file:' ? 'http://localhost:5020' : '');

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
                header.style.cssText = 'flex:0 0 auto; display:flex; flex-direction:column; margin-bottom:8px;';

                // Title on the left and Refresh on the right, like the calendar tiles, so
                // the button no longer covers the title on smaller screens.
                const topRow = document.createElement('div');
                topRow.style.cssText = 'width:100%; display:flex; justify-content:space-between; align-items:center; gap:8px;';

                const title = document.createElement('div');
                title.textContent = rssSources[currentRssKey]?.label || label || 'News';
                title.style.cssText = 'font-weight:600; font-size:2em;';

                const refreshBtn = document.createElement('button');
                refreshBtn.textContent = 'Refresh';
                refreshBtn.style.cssText = 'flex:0 0 auto; cursor:pointer; font-size:2em;';

                const lastUpdated = document.createElement('div');
                lastUpdated.style.cssText = 'font-size:0.6em; opacity:0.85; margin-top:4px;';
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
                        const url = API_BASE + '/rss?url=' + encodeURIComponent(rssUrl) + (force ? '&force=true' : '');
                        const res = await fetch(url);
                        const txt = await res.text();
                        renderRSS(txt);
                        const lastUrl = API_BASE + '/rss/last_updated?url=' + encodeURIComponent(rssUrl);
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
            const weatherEl = tile.querySelector('[data-weather]');
            if (weatherEl) {
                const backendWeather = API_BASE + '/weather';
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
                    const scrollRow = document.createElement('div');
                    scrollRow.className = 'weather-widget__scroll-row';
                    const leftBtn = document.createElement('button');
                    leftBtn.type = 'button';
                    leftBtn.className = 'weather-widget__arrow-btn';
                    leftBtn.style.visibility = 'hidden';
                    leftBtn.innerHTML = '<i class="fa-regular fa-circle-left"></i>';
                    const scrollArea = document.createElement('div');
                    scrollArea.className = 'weather-widget__scroll-area';
                    const rightBtn = document.createElement('button');
                    rightBtn.type = 'button';
                    rightBtn.className = 'weather-widget__arrow-btn';
                    rightBtn.innerHTML = '<i class="fa-regular fa-circle-right"></i>';
                    const updateArrows = () => {
                        leftBtn.style.visibility = scrollArea.scrollLeft <= 10 ? 'hidden' : 'visible';
                        rightBtn.style.visibility = scrollArea.scrollLeft + scrollArea.clientWidth >= scrollArea.scrollWidth - 10 ? 'hidden' : 'visible';
                    };
                    scrollArea.addEventListener('scroll', updateArrows);
                    leftBtn.onclick = () => { scrollArea.scrollLeft -= scrollArea.clientWidth * 0.85; };
                    rightBtn.onclick = () => { scrollArea.scrollLeft += scrollArea.clientWidth * 0.85; };
                    scrollRow.appendChild(leftBtn);
                    scrollRow.appendChild(scrollArea);
                    scrollRow.appendChild(rightBtn);
                    section.appendChild(header);
                    section.appendChild(scrollRow);
                    wrapper.appendChild(section);
                    return { section, scrollArea, header, updateArrows };
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
                    hourlySection.updateArrows();
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
                        dailySection.updateArrows();
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
            // Tile 3 lists today's Google Calendar events; tile 6 lists today's tasks
            // from a calendar called "Reminders". Both come from server.py.
            const calendarFeeds = {
                '3': { path: '/calendar/events', refresh: '/calendar/refresh', title: "Today's calendar events", empty: 'No events today.', noun: 'calendar' },
                '6': { path: '/calendar/reminders', refresh: '/calendar/reminders/refresh', title: "Today's tasks", empty: 'No tasks today.', noun: 'tasks' },
            };
            const calendarFeed = calendarFeeds[id];
            if (calendarFeed) {
                const calWrapper = document.createElement('div');
                calWrapper.style.cssText = 'display:flex; flex-direction:column; height:100%;';
                const calHeader = document.createElement('div');
                calHeader.style.cssText = 'flex:0 0 auto; display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;';
                const calTitle = document.createElement('div');
                calTitle.textContent = label || calendarFeed.title;
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

                const backendCalendar = API_BASE + calendarFeed.path;
                const backendCalendarRefresh = API_BASE + calendarFeed.refresh;
                const signInMessage = 'Sign in with Google in Settings to see your ' + calendarFeed.noun + '.';

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
                            // Demo entries have no Google link, so show them as plain text.
                            const a = document.createElement(link.trim() ? 'a' : 'span');
                            if (link.trim()) {
                                a.href = link;
                                a.target = '_blank';
                            }
                            a.textContent = (timeStr ? timeStr + ' — ' : '') + title;
                            a.style.color = 'inherit';
                            a.style.textDecoration = 'none';
                            div.appendChild(a);
                            calList.appendChild(div);
                        });
                        if (events.length === 0) calList.innerHTML = '<div style="opacity:0.8;">' + calendarFeed.empty + '</div>';
                        if (doc.documentElement.getAttribute('demo') === 'true') {
                            const note = document.createElement('div');
                            note.textContent = 'Sample entries (demo mode)';
                            note.style.cssText = 'font-size:0.5em; opacity:0.7; padding-top:8px;';
                            calList.appendChild(note);
                        }
                    } catch (e) {
                        calList.innerHTML = '<div>Could not parse calendar.</div>';
                    }
                }

                async function loadCalendar() {
                    try {
                        const res = await fetch(backendCalendar);
                        if (res.status === 401 || res.status === 501) {
                            calList.innerHTML = '<div style="opacity:0.9;">' + signInMessage + '</div>';
                            return;
                        }
                        if (!res.ok) throw new Error(res.statusText);
                        const txt = await res.text();
                        renderCalendarEvents(txt);
                    } catch (e) {
                        console.error('Calendar load error', e);
                        calList.innerHTML = '<div>' + signInMessage + '</div>';
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
                const iconTpl = document.getElementById('menu-tile-icon');
                if (iconTpl && iconTpl.content) {
                    tile.appendChild(iconTpl.content.cloneNode(true));
                }
                tile.insertAdjacentHTML('beforeend', `<span class="tile-label">${label}</span>`);
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
