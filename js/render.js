/* ============================================================================
   render.js  --  turns content.js into DOM.

   You should not normally need to edit this file. All content lives in
   content.js. This file only decides how that content is drawn.

   Media loading policy:
     - GIFs are NEVER fetched automatically. They render as a click-to-play
       placeholder showing the file weight, because the GIFs in this portfolio
       run from 300 KB to 6 MB and auto-loading them all would cost ~29 MB on
       first paint.
     - <video> uses preload="none", so an MP4 costs nothing until played.
     - YouTube renders as a facade: no iframe (and so no YouTube player, no
       cookies, no tracking script) is created until the viewer clicks. Note the
       placeholder thumbnail IS fetched from YouTube's image CDN on load -- if
       you want zero third-party requests before a click, delete the thumb block
       in youtubePlaceholder() and the placeholder still works.
     - Plain images use native loading="lazy".
   ============================================================================ */

(function () {
  'use strict';

  /* ---------------- small helpers ---------------- */

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }

  function txt(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function toneClass(tone) {
    if (tone === 'accent') return 'badge badge-accent';
    if (tone === 'amber') return 'badge badge-amber';
    if (tone === 'violet') return 'badge badge-violet';
    return 'badge';
  }

  function projectUrl(id) {
    return 'project.html?id=' + encodeURIComponent(id);
  }

  /* ---------------- theme ---------------- */

  function initTheme() {
    var KEY = 'si-theme';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) { /* private mode */ }
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }

    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest ? ev.target.closest('.theme-toggle') : null;
      if (!btn) return;

      var root = document.documentElement;
      var current = root.getAttribute('data-theme');
      if (!current) {
        // No explicit choice yet: work out what is actually showing.
        var prefersLight = window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: light)').matches;
        current = prefersLight ? 'light' : 'dark';
      }
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
      updateToggleLabels(next);
    });

    var initial = document.documentElement.getAttribute('data-theme');
    if (!initial) {
      var light = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches;
      initial = light ? 'light' : 'dark';
    }
    updateToggleLabels(initial);
  }

  function updateToggleLabels(theme) {
    var label = theme === 'dark' ? 'Light mode' : 'Dark mode';
    var glyph = theme === 'dark' ? '○' : '●';
    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].textContent = glyph;
      buttons[i].setAttribute('aria-label', label);
      buttons[i].setAttribute('title', label);
    }
  }

  /* ---------------- media ---------------- */

  function buildMedia(m) {
    var fig = el('figure', 'media');
    var frame = el('div', 'media-frame');

    if (m.type === 'gif') {
      frame.appendChild(gifPlaceholder(m, frame));
    } else if (m.type === 'mp4') {
      frame.appendChild(videoNode(m));
    } else if (m.type === 'youtube') {
      frame.appendChild(youtubePlaceholder(m, frame));
    } else {
      frame.appendChild(imageNode(m));
    }

    fig.appendChild(frame);

    if (m.caption) {
      fig.appendChild(txt('figcaption', null, m.caption));
    }
    return fig;
  }

  function gifPlaceholder(m, frame) {
    var btn = el('button', 'media-play');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Play animation: ' + (m.caption || 'gameplay clip'));

    if (m.poster) {
      var thumb = document.createElement('img');
      thumb.className = 'play-thumb';
      thumb.src = m.poster;
      thumb.alt = '';
      thumb.loading = 'lazy';
      btn.appendChild(thumb);
    }

    btn.appendChild(el('span', 'play-icon', '&#9654;'));
    btn.appendChild(txt('span', 'play-label', 'Play animation'));
    if (m.weight) {
      btn.appendChild(txt('span', 'play-weight', m.weight + ' GIF'));
    }

    btn.addEventListener('click', function () {
      var img = document.createElement('img');
      img.alt = m.caption || '';
      img.src = m.src;
      frame.innerHTML = '';
      frame.appendChild(img);
    });

    return btn;
  }

  function videoNode(m) {
    var v = document.createElement('video');
    v.controls = true;
    v.preload = 'none';          // nothing downloads until the viewer presses play
    v.muted = true;
    v.loop = true;
    v.playsInline = true;        // iOS Safari plays inline instead of fullscreen
    v.setAttribute('playsinline', '');
    if (m.poster) v.poster = m.poster;
    var src = document.createElement('source');
    src.src = m.src;
    src.type = 'video/mp4';
    v.appendChild(src);
    return v;
  }

  function youtubePlaceholder(m, frame) {
    var btn = el('button', 'media-play');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Load YouTube video: ' + (m.caption || 'demonstration'));

    var thumb = document.createElement('img');
    thumb.className = 'play-thumb';
    thumb.src = 'https://i.ytimg.com/vi/' + m.src + '/hqdefault.jpg';
    thumb.alt = '';
    thumb.loading = 'lazy';
    thumb.addEventListener('error', function () { thumb.remove(); });
    btn.appendChild(thumb);

    btn.appendChild(el('span', 'play-icon', '&#9654;'));
    btn.appendChild(txt('span', 'play-label', 'Play on YouTube'));
    btn.appendChild(txt('span', 'play-weight', 'loads only when clicked'));

    btn.addEventListener('click', function () {
      var frameEl = document.createElement('iframe');
      frameEl.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(m.src) + '?autoplay=1&rel=0';
      frameEl.title = m.caption || 'YouTube video';
      frameEl.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
      frameEl.allowFullscreen = true;
      frameEl.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      frame.innerHTML = '';
      frame.appendChild(frameEl);
    });

    return btn;
  }

  function imageNode(m) {
    var img = document.createElement('img');
    img.src = m.src;
    img.alt = m.caption || '';
    img.loading = 'lazy';
    return img;
  }

  /* ---------------- shared chrome ---------------- */

  function renderHeader(host, active) {
    var wrap = el('div', 'wrap');

    var brand = document.createElement('a');
    brand.className = 'brand';
    brand.href = 'index.html';
    brand.appendChild(document.createTextNode(SITE.name));
    brand.appendChild(txt('span', 'brand-role', SITE.role));
    wrap.appendChild(brand);

    var nav = el('nav', 'site-nav');
    nav.setAttribute('aria-label', 'Main');
    var links = [
      { label: 'Projects',   href: active === 'home' ? '#projects'   : 'index.html#projects' },
      { label: 'Skills',     href: active === 'home' ? '#skills'     : 'index.html#skills' },
      { label: 'Experience', href: active === 'home' ? '#experience' : 'index.html#experience' },
      { label: 'Contact',    href: active === 'home' ? '#contact'    : 'index.html#contact' },
      { label: 'Resume',     href: SITE.resume }
    ];
    links.forEach(function (l) {
      var a = document.createElement('a');
      a.href = l.href;
      a.textContent = l.label;
      if (l.label === 'Resume') a.target = '_blank';
      nav.appendChild(a);
    });

    var toggle = el('button', 'theme-toggle');
    toggle.type = 'button';
    nav.appendChild(toggle);

    wrap.appendChild(nav);
    host.appendChild(wrap);
  }

  function renderFooter(host) {
    var wrap = el('div', 'wrap');
    wrap.appendChild(txt('div', null, SITE.name + ' — ' + SITE.role + ', ' + SITE.location));
    wrap.appendChild(txt('div', 'foot-mono', 'Hand-written HTML, CSS and JS. No build step.'));
    host.appendChild(wrap);
  }

  function badgeRow(project) {
    var row = el('div', 'badge-row');
    if (project.status) {
      row.appendChild(txt('span', toneClass(project.statusTone), project.status));
    }
    if (project.engine)   row.appendChild(txt('span', 'badge', project.engine));
    if (project.language) row.appendChild(txt('span', 'badge', project.language));
    return row;
  }

  /* ---------------- index page ---------------- */

  function renderIndex() {
    document.title = SITE.name + ' — ' + SITE.role;

    renderHeader(document.getElementById('site-header'), 'home');

    /* hero */
    var hero = document.getElementById('hero-content');
    hero.appendChild(txt('h1', null, SITE.name));
    hero.appendChild(txt('p', 'hero-role', SITE.role + '  ·  ' + SITE.location));
    hero.appendChild(txt('p', 'hero-blurb', SITE.blurb));

    var actions = el('div', 'hero-actions');
    var a1 = document.createElement('a');
    a1.className = 'btn btn-primary'; a1.href = '#projects'; a1.textContent = 'See the work';
    var a2 = document.createElement('a');
    a2.className = 'btn'; a2.href = SITE.resume; a2.target = '_blank'; a2.textContent = 'Download resume (PDF)';
    var a3 = document.createElement('a');
    a3.className = 'btn'; a3.href = SITE.linkedin; a3.target = '_blank';
    a3.rel = 'noopener'; a3.textContent = 'LinkedIn';
    actions.appendChild(a1); actions.appendChild(a2); actions.appendChild(a3);
    hero.appendChild(actions);

    var strip = el('div', 'factstrip');
    SITE.facts.forEach(function (f) {
      var cell = el('div', 'fact');
      cell.appendChild(txt('div', 'fact-num', f.num));
      cell.appendChild(txt('div', 'fact-label', f.label));
      strip.appendChild(cell);
    });
    hero.appendChild(strip);

    /* projects */
    var grid = document.getElementById('project-grid');
    PROJECTS.forEach(function (p) {
      grid.appendChild(projectCard(p));
    });

    /* skills */
    var skillHost = document.getElementById('skill-groups');
    SKILLS.forEach(function (g) {
      var box = el('div', 'skill-group');
      box.appendChild(txt('h3', null, g.group));
      var row = el('div', 'badge-row');
      g.items.forEach(function (i) { row.appendChild(txt('span', 'badge', i)); });
      box.appendChild(row);
      skillHost.appendChild(box);
    });

    /* experience */
    var expHost = document.getElementById('experience-list');
    EXPERIENCE.forEach(function (e) {
      var item = el('div', 'timeline-item');
      item.appendChild(txt('h3', null, e.role + ' — ' + e.company));
      item.appendChild(txt('div', 'tl-meta', e.period));
      var ul = document.createElement('ul');
      e.points.forEach(function (pt) { ul.appendChild(el('li', null, pt)); });
      item.appendChild(ul);
      expHost.appendChild(item);
    });

    /* education */
    var eduHost = document.getElementById('education-list');
    EDUCATION.forEach(function (e) {
      var item = el('div', 'timeline-item');
      item.appendChild(txt('h3', null, e.school));
      item.appendChild(txt('div', 'tl-meta', e.period));
      item.appendChild(txt('p', null, e.award));
      eduHost.appendChild(item);
    });

    /* achievements */
    var achHost = document.getElementById('achievement-list');
    ACHIEVEMENTS.forEach(function (a) {
      var item = el('div', 'timeline-item');
      var h = document.createElement('h3');
      if (a.url) {
        var link = document.createElement('a');
        link.href = a.url; link.target = '_blank'; link.rel = 'noopener';
        link.textContent = a.title;
        h.appendChild(link);
      } else {
        h.textContent = a.title;
      }
      item.appendChild(h);
      item.appendChild(txt('p', null, a.detail));
      achHost.appendChild(item);
    });

    /* contact */
    var contactHost = document.getElementById('contact-grid');
    [
      { label: 'Email',    value: SITE.email,    href: 'mailto:' + SITE.email },
      { label: 'LinkedIn', value: 'in/samiulislamshad', href: SITE.linkedin },
      { label: 'Phone',    value: SITE.phone,    href: 'tel:' + SITE.phone.replace(/\s/g, '') },
      { label: 'Location', value: SITE.location }
    ].forEach(function (c) {
      var box = el('div', 'contact-item');
      box.appendChild(txt('div', 'ci-label', c.label));
      var v = el('div', 'ci-value');
      if (c.href) {
        var a = document.createElement('a');
        a.href = c.href; a.textContent = c.value;
        if (c.href.indexOf('http') === 0) { a.target = '_blank'; a.rel = 'noopener'; }
        v.appendChild(a);
      } else {
        v.textContent = c.value;
      }
      box.appendChild(v);
      contactHost.appendChild(box);
    });

    renderFooter(document.getElementById('site-footer'));
  }

  function projectCard(p) {
    var card = el('article', 'project-card' + (p.featured ? ' is-featured' : ''));

    var h = document.createElement('h3');
    var link = document.createElement('a');
    link.href = projectUrl(p.id);
    link.textContent = p.title;
    h.appendChild(link);
    if (p.titleNote) {
      h.appendChild(txt('span', 'card-studio', ' (' + p.titleNote + ')'));
    }
    card.appendChild(h);

    card.appendChild(txt('div', 'card-studio', p.studio + '  ·  ' + p.period));
    card.appendChild(txt('p', 'card-tagline', p.tagline));

    if (p.cardMetrics && p.cardMetrics.length) {
      var mrow = el('div', 'card-metrics');
      p.cardMetrics.forEach(function (m) { mrow.appendChild(txt('span', null, m)); });
      card.appendChild(mrow);
    }

    var foot = el('div', 'card-foot');
    foot.appendChild(badgeRow(p));
    var more = document.createElement('a');
    more.className = 'card-more';
    more.href = projectUrl(p.id);
    more.textContent = 'Read more →';
    foot.appendChild(more);
    card.appendChild(foot);

    return card;
  }

  /* ---------------- project page ---------------- */

  function renderProjectPage() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');
    var project = null;
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === id) { project = PROJECTS[i]; break; }
    }

    renderHeader(document.getElementById('site-header'), 'project');

    var host = document.getElementById('project-root');

    if (!project) {
      document.title = 'Project not found — ' + SITE.name;
      var miss = el('section', 'section');
      var mw = el('div', 'wrap');
      mw.appendChild(txt('h1', null, 'Project not found'));
      mw.appendChild(el('p', null,
        'No project matches that link. <a href="index.html#projects">Back to all projects</a>.'));
      miss.appendChild(mw);
      host.appendChild(miss);
      renderFooter(document.getElementById('site-footer'));
      return;
    }

    document.title = project.title + ' — ' + SITE.name;

    /* hero */
    var hero = el('header', 'proj-hero');
    var hw = el('div', 'wrap');

    var crumb = el('div', 'breadcrumb');
    var back = document.createElement('a');
    back.href = 'index.html#projects';
    back.textContent = '← All projects';
    crumb.appendChild(back);
    hw.appendChild(crumb);

    var title = project.title + (project.titleNote ? ' (' + project.titleNote + ')' : '');
    hw.appendChild(txt('h1', null, title));
    hw.appendChild(txt('div', 'card-studio', project.studio + '  ·  ' + project.period));
    hw.appendChild(txt('p', 'proj-tagline', project.tagline));
    hw.appendChild(badgeRow(project));

    if (project.metrics && project.metrics.length) {
      var strip = el('div', 'metricstrip');
      project.metrics.forEach(function (m) {
        strip.appendChild(txt('span', 'm', m.label));
      });
      hw.appendChild(strip);
    }

    if (project.links && project.links.length) {
      var la = el('div', 'hero-actions');
      la.style.marginTop = '22px';
      project.links.forEach(function (l) {
        var a = document.createElement('a');
        a.className = 'btn btn-primary';
        a.href = l.url; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = l.label;
        la.appendChild(a);
      });
      hw.appendChild(la);
    }

    hero.appendChild(hw);
    host.appendChild(hero);

    /* about */
    if (project.about && project.about.length) {
      var about = el('section', 'section');
      var aw = el('div', 'wrap');
      aw.appendChild(sectionHead('About the project'));
      var prose = el('div', 'proj-about');
      project.about.forEach(function (p) { prose.appendChild(el('p', null, p)); });
      aw.appendChild(prose);
      about.appendChild(aw);
      host.appendChild(about);
    }

    /* roles */
    if (project.roles && project.roles.length) {
      var rs = el('section', 'section');
      var rw = el('div', 'wrap');
      rw.appendChild(sectionHead('My contribution'));
      var ul = el('ul', 'role-list');
      project.roles.forEach(function (r) {
        ul.appendChild(el('li', null, '<strong>' + r.name + '</strong> — ' + r.detail));
      });
      rw.appendChild(ul);
      rs.appendChild(rw);
      host.appendChild(rs);
    }

    /* stack */
    if (project.stack && project.stack.length) {
      var ss = el('section', 'section');
      var sw = el('div', 'wrap');
      sw.appendChild(sectionHead('Stack'));
      var row = el('div', 'badge-row');
      project.stack.forEach(function (s) { row.appendChild(txt('span', 'badge', s)); });
      sw.appendChild(row);
      ss.appendChild(sw);
      host.appendChild(ss);
    }

    /* features */
    if (project.features && project.features.length) {
      var fs = el('section', 'section');
      var fw = el('div', 'wrap');
      fw.appendChild(sectionHead('Implemented features',
        'The systems I designed and built, and why they are shaped the way they are.'));

      project.features.forEach(function (f) {
        fw.appendChild(featureBlock(f));
      });

      if (project.mediaNote) {
        fw.appendChild(txt('p', 'media-note', project.mediaNote));
      }

      fs.appendChild(fw);
      host.appendChild(fs);
    }

    /* other projects */
    var others = PROJECTS.filter(function (p) { return p.id !== project.id; }).slice(0, 3);
    if (others.length) {
      var os = el('section', 'section');
      var ow = el('div', 'wrap');
      ow.appendChild(sectionHead('Other projects'));
      var og = el('div', 'project-grid');
      others.forEach(function (p) { og.appendChild(projectCard(p)); });
      ow.appendChild(og);
      os.appendChild(ow);
      host.appendChild(os);
    }

    renderFooter(document.getElementById('site-footer'));
  }

  function sectionHead(title, sub) {
    var head = el('div', 'section-head');
    head.appendChild(txt('h2', null, title));
    if (sub) head.appendChild(txt('p', null, sub));
    return head;
  }

  function featureBlock(f) {
    var box = el('article', 'feature');
    box.appendChild(txt('h3', null, f.title));

    if (f.tags && f.tags.length) {
      var tags = el('div', 'badge-row feature-tags');
      f.tags.forEach(function (t) { tags.appendChild(txt('span', 'badge', t)); });
      box.appendChild(tags);
    }

    (f.body || []).forEach(function (p) { box.appendChild(el('p', null, p)); });

    // Short bullet points, deck-style. Preferred over long prose in `body`.
    if (f.bullets && f.bullets.length) {
      var ul = document.createElement('ul');
      f.bullets.forEach(function (b) { ul.appendChild(el('li', null, b)); });
      box.appendChild(ul);
    }

    if (f.media && f.media.length) {
      var grid = el('div', 'media-grid' + (f.media.length > 1 ? ' cols-2' : ''));
      f.media.forEach(function (m) { grid.appendChild(buildMedia(m)); });
      box.appendChild(grid);
    }

    return box;
  }

  /* ---------------- boot ---------------- */

  function boot() {
    initTheme();
    var page = document.body.getAttribute('data-page');
    if (page === 'project') {
      renderProjectPage();
    } else {
      renderIndex();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
