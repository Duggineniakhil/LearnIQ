/**
 * LearnIQ — Widget-to-Chat Interaction Logic
 * Handles widget selection, context transfer, and AI chat simulation.
 */

/* ============================================================
   WIDGET CONFIGURATION (Mock Data)
   ============================================================ */
const WIDGETS = {
  completion: {
    id: 'completion',
    title: 'Course Completion Rate',
    shortTitle: 'Completion',
    color: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
      <polyline points="22 4 12 14.01 9 11.01" stroke="#3B82F6" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    stats: [
      { value: '84.7%', label: 'Rate' },
      { value: '1,247', label: 'Done' }
    ],
    suggestions: [
      "What's driving the dip last week?",
      "Which team has lowest completion?",
      "Will we hit 90% by end of quarter?",
      "Compare to industry benchmark"
    ],
    preloadQuestion: "What's driving the completion rate drop last week?",
    preloadAnswer: {
      text: "Based on the data, there was a **7.3% dip** Monday–Wednesday. This correlates with the new compliance module rollout — new modules historically see 12–15% lower completion in the first 5 days. The trend is already recovering: Friday's rate was 83.2%, and weekend completions were strong.",
      chart: {
        type: 'trend',
        label: 'Daily Completion Rate — Last 7 Days',
        data: [81, 79, 78, 82, 83.2, 85, 87],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        color: '#3B82F6',
        peak: '87% (Sun)'
      },
      tags: ['Compliance Module', 'New Content', 'Recovery Trend']
    }
  },
  hours: {
    id: 'hours',
    title: 'Learning Hours',
    shortTitle: 'Learning Hrs',
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="#8B5CF6" stroke-width="2"/>
      <polyline points="12 6 12 12 16 14" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    stats: [
      { value: '31.4h', label: 'Avg/Week' },
      { value: '90%', label: 'Goal' }
    ],
    suggestions: [
      "Which teams are below the 35hr target?",
      "When are learners most active?",
      "How can Sales improve time?",
      "Show hours trend for Q2"
    ],
    preloadQuestion: "Which teams are logging the most learning hours?",
    preloadAnswer: {
      text: "Engineering leads with **42.3 hrs/week** average, followed by Product at 38.1 hrs. Sales is significantly below target at 21.4 hrs — only 61% of their 35-hr weekly goal. I'd recommend reviewing the Sales team's learning path assignment.",
      chart: {
        type: 'bar',
        label: 'Average Weekly Hours by Team',
        data: [42.3, 38.1, 35.7, 29.4, 21.4],
        labels: ['Eng', 'Product', 'Design', 'Mktg', 'Sales'],
        color: '#8B5CF6',
        peak: '42.3h (Engineering)'
      },
      tags: ['Sales Gap', 'Engineering Top', 'Goal Tracking']
    }
  },
  performance: {
    id: 'performance',
    title: 'Team Performance Score',
    shortTitle: 'Performance',
    color: '#10B981',
    bgGradient: 'linear-gradient(135deg, #ECFDF5, #D1FAE5)',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    stats: [
      { value: '82.3', label: 'Avg Score' },
      { value: '+18.4', label: 'vs Q1' }
    ],
    suggestions: [
      "Which team improved the most?",
      "What drove Q2 gains?",
      "Who is still below benchmark?",
      "Forecast Q3 performance"
    ],
    preloadQuestion: "How does Q2 compare to Q1 for team performance?",
    preloadAnswer: {
      text: "Q2 scores are up **+18.4 points** on average — the strongest QoQ improvement in 18 months. The biggest gains came from Backend Engineering (+31 pts) after the system design curriculum. Three teams are still below the 70-point benchmark: Content, QA, and Operations.",
      chart: {
        type: 'comparison',
        label: 'Q1 vs Q2 Score by Team',
        q1: [68, 71, 65, 72, 58, 70],
        q2: [84, 89, 79, 86, 74, 82],
        labels: ['Backend', 'Frontend', 'Data', 'DevOps', 'QA', 'Product'],
        colorQ1: '#D1FAE5',
        colorQ2: '#10B981',
        peak: '89 pts (Frontend Q2)'
      },
      tags: ['Q2 Improvement', 'QA Below Target', 'Best Quarter']
    }
  },
  skills: {
    id: 'skills',
    title: 'Skill Coverage',
    shortTitle: 'Skill Coverage',
    color: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
    iconSvg: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    </svg>`,
    stats: [
      { value: '59.4%', label: 'Certified' },
      { value: '2', label: 'At Risk' }
    ],
    suggestions: [
      "What are the most critical skill gaps?",
      "Which teams need Cloud Architecture?",
      "How long to close the Data Literacy gap?",
      "Recommend a 6-week learning sprint"
    ],
    preloadQuestion: "What skill gaps are most critical right now?",
    preloadAnswer: {
      text: "The most critical gap is **Cloud Architecture** — only 23% of engineers have completed the required certification path against a 75% org target. Data Literacy follows at 41%. Both are flagged as business-critical for Q3. I recommend a structured 6-week sprint prioritizing Cloud Architecture.",
      chart: {
        type: 'gauge',
        label: 'Skill Certification Coverage',
        data: [23, 41, 67, 78, 88],
        labels: ['Cloud Arch', 'Data Literacy', 'Security', 'Agile', 'Communication'],
        color: '#F59E0B',
        peak: '88% (Communication)'
      },
      tags: ['Cloud Gap', 'Q3 Risk', 'Critical Priority']
    }
  }
};

/* ============================================================
   STATE
   ============================================================ */
let state = {
  selectedWidget: null,
  messages: {},     // widgetId -> array of message objects
  isTyping: false
};

/* ============================================================
   DOM REFERENCES
   ============================================================ */
const $emptyState    = document.getElementById('chat-empty-state');
const $chatActive    = document.getElementById('chat-active');
const $contextIcon   = document.getElementById('context-icon');
const $contextName   = document.getElementById('context-name');
const $contextStats  = document.getElementById('context-stats');
const $messageThread = document.getElementById('message-thread');
const $suggChips     = document.getElementById('suggestion-chips');
const $chatInput     = document.getElementById('chat-input');
const $sendBtn       = document.getElementById('send-btn');
const $inputChipLabel = document.getElementById('input-chip-label');
const $rightPanel    = document.getElementById('right-panel');

/* ============================================================
   TOP NAVIGATION
   ============================================================ */
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    // Update active nav state
    document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
    link.classList.add('active');

    // Switch views
    document.querySelectorAll('.app-view').forEach(view => view.classList.remove('active'));
    const targetId = 'view-' + link.id.replace('nav-', '');
    const targetView = document.getElementById(targetId);
    if (targetView) {
      targetView.classList.add('active');
    }
  });
});

/* ============================================================
   WIDGET SELECTION
   ============================================================ */
document.querySelectorAll('.widget').forEach(el => {
  el.addEventListener('click', () => selectWidget(el.dataset.widget));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectWidget(el.dataset.widget);
    }
  });
});

/* ============================================================
   EMPTY STATE HINTS
   ============================================================ */
document.querySelectorAll('.hint-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    // Select first widget by default when a hint is clicked
    selectWidget('completion');
    $chatInput.value = chip.textContent;
    updateSendBtn();
    $chatInput.focus();
  });
});

function selectWidget(widgetId) {
  if (state.selectedWidget === widgetId) return;

  const prevWidget = state.selectedWidget;
  state.selectedWidget = widgetId;

  // Update widget card states
  document.querySelectorAll('.widget').forEach(el => {
    const isSelected = el.dataset.widget === widgetId;
    el.classList.toggle('selected', isSelected);
    el.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    if (isSelected) {
      el.classList.add('selecting');
      setTimeout(() => el.classList.remove('selecting'), 400);
    }
  });

  // Transition the right panel
  if (prevWidget) {
    // Switching context: flash then swap
    $rightPanel.classList.add('context-switching');
    setTimeout(() => $rightPanel.classList.remove('context-switching'), 350);
    addPanelPulse();
  }

  // Show chat area
  showChatPanel(widgetId, !!prevWidget);
}

function addPanelPulse() {
  const pulse = document.createElement('div');
  pulse.className = 'panel-transition-pulse';
  $rightPanel.appendChild(pulse);
  setTimeout(() => pulse.remove(), 600);
}

/* ============================================================
   CHAT PANEL ACTIVATION
   ============================================================ */
function showChatPanel(widgetId, isSwitch) {
  const widget = WIDGETS[widgetId];
  if (!widget) return;

  // Show/hide panels
  $emptyState.style.display = 'none';
  $chatActive.style.display = 'flex';

  // Update context banner
  $contextIcon.style.background = widget.bgGradient;
  $contextIcon.innerHTML = widget.iconSvg;
  $contextName.textContent = widget.title;

  // Update stats
  $contextStats.innerHTML = widget.stats.map(s => `
    <div class="context-stat">
      <span class="context-stat-value" style="color:${widget.color}">${s.value}</span>
      <span class="context-stat-label">${s.label}</span>
    </div>
  `).join('<div style="width:1px;height:24px;background:var(--slate-200);margin:0 4px;"></div>');

  // Update input chip
  $inputChipLabel.textContent = widget.shortTitle;

  // Update suggestions
  $suggChips.innerHTML = widget.suggestions.map(s => `
    <button class="suggestion-chip" aria-label="Ask: ${s}">${s}</button>
  `).join('');

  $suggChips.querySelectorAll('.suggestion-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      $chatInput.value = chip.textContent;
      updateSendBtn();
      $chatInput.focus();
    });
  });

  // Initialize or restore message thread
  if (!state.messages[widgetId]) {
    state.messages[widgetId] = [];
    preloadExchange(widgetId); // add initial message synchronously
    renderThread(widgetId);
  } else {
    renderThread(widgetId);
  }
}

/* ============================================================
   PRE-LOADED EXAMPLE EXCHANGE
   ============================================================ */
function preloadExchange(widgetId) {
  const widget = WIDGETS[widgetId];
  if (!widget || !widget.preloadQuestion) return;

  // Add user message
  const userMsg = {
    type: 'user',
    text: widget.preloadQuestion,
    time: formatTime(new Date(Date.now() - 120000)) // 2 min ago
  };
  state.messages[widgetId].push(userMsg);

  // Add AI response instantly
  const aiMsg = {
    type: 'ai',
    text: widget.preloadAnswer.text,
    chart: widget.preloadAnswer.chart,
    tags: widget.preloadAnswer.tags,
    time: formatTime(new Date(Date.now() - 60000)) // 1 min ago
  };
  state.messages[widgetId].push(aiMsg);
}

/* ============================================================
   RENDER FULL THREAD
   ============================================================ */
function renderThread(widgetId) {
  $messageThread.innerHTML = '';
  const msgs = state.messages[widgetId] || [];
  msgs.forEach(msg => appendMessage(msg, false));
  scrollThreadToBottom();
}

/* ============================================================
   APPEND SINGLE MESSAGE
   ============================================================ */
function appendMessage(msg, animate = true) {
  const el = document.createElement('div');
  el.className = `message ${msg.type === 'user' ? 'user-msg' : 'ai-msg'}`;

  const avatarLabel = msg.type === 'user' ? 'A' : 'AI';
  const avatarClass = msg.type === 'user' ? 'user' : 'ai';

  if (msg.type === 'user') {
    el.innerHTML = `
      <div class="msg-avatar ${avatarClass}" aria-hidden="true">${avatarLabel}</div>
      <div class="msg-content">
        <div class="msg-bubble">${escapeHtml(msg.text)}</div>
        <span class="msg-time">${msg.time}</span>
      </div>
    `;
  } else {
    // AI message with rich card
    el.innerHTML = `
      <div class="msg-avatar ${avatarClass}" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
      </div>
      <div class="msg-content">
        ${buildAiCard(msg)}
        <span class="msg-time">${msg.time}</span>
      </div>
    `;
  }

  $messageThread.appendChild(el);
}

/* ============================================================
   BUILD AI RESPONSE CARD
   ============================================================ */
function buildAiCard(msg) {
  const formattedText = formatMarkdown(msg.text);
  const chartHtml = msg.chart ? buildChart(msg.chart) : '';
  const tagsHtml = msg.tags ? `
    <div class="ai-card-tags" aria-label="Key insights">
      ${msg.tags.map(t => `<span class="ai-tag">${t}</span>`).join('')}
    </div>
  ` : '';

  return `
    <div class="ai-response-card" role="article" aria-label="AI insight">
      <div class="ai-card-header">
        <div class="ai-card-dot"></div>
        <span class="ai-card-label">AI Insight</span>
      </div>
      <div class="ai-card-body">
        <p class="ai-card-text">${formattedText}</p>
        ${chartHtml}
        ${tagsHtml}
      </div>
    </div>
  `;
}

/* ============================================================
   BUILD INLINE CHARTS
   ============================================================ */
function buildChart(chart) {
  const { type, label, peak } = chart;

  let chartContent = '';

  if (type === 'trend') {
    chartContent = buildTrendChart(chart);
  } else if (type === 'bar') {
    chartContent = buildBarChart(chart);
  } else if (type === 'comparison') {
    chartContent = buildComparisonChart(chart);
  } else if (type === 'gauge') {
    chartContent = buildGaugeChart(chart);
  }

  return `
    <div class="ai-inline-chart" role="img" aria-label="${label}">
      <div class="chart-title-row">
        <span class="chart-label">${label}</span>
        <span class="chart-peak">${peak}</span>
      </div>
      ${chartContent}
    </div>
  `;
}

function buildTrendChart(chart) {
  const { data, labels, color } = chart;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 50;
  const w = 220;
  const padX = 5;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * (w - 2 * padX);
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });

  const polyline = points.join(' ');
  const areaPoints = `${padX},${h} ${polyline} ${w - padX},${h}`;

  return `
    <svg class="trend-chart-svg" viewBox="0 0 ${w} ${h}" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cg-trend" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#cg-trend)"/>
      <polyline points="${polyline}" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      ${data.map((v, i) => {
        const x = padX + (i / (data.length - 1)) * (w - 2 * padX);
        const y = h - ((v - min) / range) * (h - 4) - 2;
        return `<circle cx="${x}" cy="${y}" r="2.5" fill="${color}"/>`;
      }).join('')}
      ${labels.map((lbl, i) => {
        const x = padX + (i / (labels.length - 1)) * (w - 2 * padX);
        return `<text x="${x}" y="${h - 0}" font-size="7" fill="#94A3B8" text-anchor="middle" font-family="Inter,sans-serif">${lbl}</text>`;
      }).join('')}
    </svg>
  `;
}

function buildBarChart(chart) {
  const { data, labels, color } = chart;
  const max = Math.max(...data);

  return `
    <div class="ai-bar-chart" role="img" aria-label="Bar chart">
      ${data.map((v, i) => {
        const heightPct = (v / max) * 100;
        const opacity = 0.55 + (v / max) * 0.45;
        return `
          <div class="ai-bar-col">
            <div class="ai-bar" style="height:${heightPct}%;background:${color};opacity:${opacity};min-height:4px;" title="${labels[i]}: ${v}hrs"></div>
            <span class="ai-bar-label">${labels[i]}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function buildComparisonChart(chart) {
  const { q1, q2, labels, colorQ1, colorQ2 } = chart;
  const max = Math.max(...q1, ...q2);

  return `
    <div style="display:flex;flex-direction:column;gap:6px;">
      <div class="comparison-chart" role="img" aria-label="Q1 vs Q2 comparison">
        ${labels.map((lbl, i) => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;">
            <div style="display:flex;align-items:flex-end;gap:2px;height:55px;">
              <div class="cmp-bar" style="height:${(q1[i]/max)*100}%;background:${colorQ1};width:10px;min-height:3px;" title="Q1: ${q1[i]}"></div>
              <div class="cmp-bar" style="height:${(q2[i]/max)*100}%;background:${colorQ2};width:10px;min-height:3px;" title="Q2: ${q2[i]}"></div>
            </div>
            <span class="cmp-label">${lbl}</span>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:2px;">
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="width:8px;height:8px;border-radius:2px;background:${colorQ1}"></div>
          <span style="font-size:10.5px;color:#64748B;font-weight:500;">Q1</span>
        </div>
        <div style="display:flex;align-items:center;gap:4px;">
          <div style="width:8px;height:8px;border-radius:2px;background:${colorQ2}"></div>
          <span style="font-size:10.5px;color:#64748B;font-weight:500;">Q2</span>
        </div>
      </div>
    </div>
  `;
}

function buildGaugeChart(chart) {
  const { data, labels, color } = chart;
  const target = 75;

  return `
    <div class="gauge-chart" role="img" aria-label="Skill coverage gauge">
      ${data.map((v, i) => {
        const barColor = v < 40 ? '#EF4444' : v < 65 ? '#F59E0B' : '#10B981';
        return `
          <div class="gauge-row">
            <span class="gauge-name">${labels[i]}</span>
            <div class="gauge-bar-wrap">
              <div class="gauge-fill" style="width:${v}%;background:${barColor};" aria-label="${v}%"></div>
            </div>
            <span class="gauge-pct">${v}%</span>
          </div>
        `;
      }).join('')}
      <div style="display:flex;align-items:center;gap:5px;margin-top:4px;padding-top:6px;border-top:1px dashed #E2E8F0;">
        <div style="flex:1;height:1px;"></div>
        <span style="font-size:10px;color:#94A3B8;font-weight:500;">Target: ${target}%</span>
      </div>
    </div>
  `;
}

/* ============================================================
   TYPING INDICATOR
   ============================================================ */
function showTyping() {
  const el = document.createElement('div');
  el.className = 'message ai-msg';
  el.setAttribute('aria-label', 'AI is typing');
  el.innerHTML = `
    <div class="msg-avatar ai" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>
    </div>
    <div class="msg-content">
      <div class="typing-indicator" aria-hidden="true">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  $messageThread.appendChild(el);
  scrollThreadToBottom();
  return el;
}

/* ============================================================
   SEND MESSAGE
   ============================================================ */
$chatInput.addEventListener('input', () => {
  // Auto-resize
  $chatInput.style.height = 'auto';
  $chatInput.style.height = Math.min($chatInput.scrollHeight, 120) + 'px';
  updateSendBtn();
});

$chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    if (!$sendBtn.disabled) sendMessage();
  }
});

$sendBtn.addEventListener('click', sendMessage);

function updateSendBtn() {
  const hasText = $chatInput.value.trim().length > 0;
  const hasWidget = !!state.selectedWidget;
  $sendBtn.disabled = !hasText || !hasWidget;
}

function sendMessage() {
  const text = $chatInput.value.trim();
  if (!text || !state.selectedWidget || state.isTyping) return;

  const widgetId = state.selectedWidget;
  const now = formatTime(new Date());

  // Add user message
  const userMsg = { type: 'user', text, time: now };
  if (!state.messages[widgetId]) state.messages[widgetId] = [];
  state.messages[widgetId].push(userMsg);
  appendMessage(userMsg);
  scrollThreadToBottom();

  // Clear input
  $chatInput.value = '';
  $chatInput.style.height = 'auto';
  updateSendBtn();

  // Simulate AI thinking
  state.isTyping = true;
  $sendBtn.disabled = true;
  const typingEl = showTyping();

  // Generate a contextual response
  const delay = 1000 + Math.random() * 800;
  setTimeout(() => {
    typingEl.remove();
    state.isTyping = false;

    const aiMsg = generateAiResponse(text, widgetId, formatTime(new Date()));
    state.messages[widgetId].push(aiMsg);
    appendMessage(aiMsg);
    scrollThreadToBottom();
    updateSendBtn();
  }, delay);
}

/* ============================================================
   AI RESPONSE GENERATOR (Simulated)
   ============================================================ */
const GENERIC_RESPONSES = {
  completion: [
    {
      text: "Looking at the **completion rate trend**, the Engineering and Design teams are consistently above 90%. The primary opportunity is with the Sales team at 71.3% — a focused nudge campaign for their 3 overdue modules could lift the overall rate by ~2 points by end of week.",
      tags: ['Sales Opportunity', 'Engineering Strong', 'Action Needed']
    },
    {
      text: "The **completion rate of 84.7%** puts your org in the top 22% of enterprise customers on this platform. Based on current velocity, you're on track to hit 88% by end of Q2 — just 1.3% short of the 90% target. A targeted push on 'in progress' learners (223 people) would close that gap.",
      tags: ['Benchmark Leader', 'Q2 Forecast', '90% Target']
    },
    {
      text: "Modules with completion rates below **75%** are: Compliance Essentials (68%), Data Privacy (72%), and Ethics in AI (74%). These are mandatory certifications — I'd recommend a reminder workflow targeting learners who haven't engaged in the past 5 days.",
      tags: ['Compliance Risk', 'Mandatory Training', 'Reminder Needed']
    }
  ],
  hours: [
    {
      text: "Peak learning activity happens **Tuesday and Thursday afternoons** (2–5 PM), which aligns with team deep-work blocks. You might consider scheduling new content drops on Monday mornings to capture the full week's momentum.",
      tags: ['Peak Hours', 'Content Timing', 'Engagement Strategy']
    },
    {
      text: "The **Sales team's 21.4 hrs/week** is 39% below target. Cross-referencing with their learning path, 60% of assigned content is 45+ minutes per module — much longer than their typical 20-minute session pattern. Breaking modules into micro-lessons could dramatically improve their hours.",
      tags: ['Sales Gap', 'Content Length', 'Micro-Learning']
    },
    {
      text: "Q2 total learning investment is **4,712 hours** across 150 learners. If we value that at an average of $85/hr (blended learning cost), you've generated ~$400k in learning value this quarter — up 23% from Q1.",
      tags: ['ROI Analysis', 'Q2 Investment', '+23% Growth']
    }
  ],
  performance: [
    {
      text: "The **Backend Engineering team's +31 point jump** in Q2 is the standout story. Their cohort completed the 'Distributed Systems Mastery' path in Week 4 of Q1 — scores started climbing 3 weeks later. This is strong evidence of direct curriculum impact.",
      tags: ['Backend Win', 'Curriculum Impact', 'Causal Link']
    },
    {
      text: "Teams below the **70-point benchmark**: Content (64), QA (67), and Operations (69). All three have one thing in common — they have the lowest content diversity (fewer than 3 unique learning paths). A content variety increase typically yields 8–12 point improvements within 6 weeks.",
      tags: ['Below Benchmark', 'Content Diversity', '3 Teams at Risk']
    },
    {
      text: "If Q3 maintains the same improvement velocity as Q2 (+18.4 pts), you'd hit an average of **100.7 points** — but scores plateau around 92–95 in practice. A realistic Q3 target would be 90–93, which would put your entire org above benchmark for the first time.",
      tags: ['Q3 Forecast', 'Plateau Risk', 'Milestone Ahead']
    }
  ],
  skills: [
    {
      text: "A **6-week Cloud Architecture sprint** for engineering teams would require ~6 hours/week per learner. Given current Engineering capacity (42.3 hrs/week), this is easily feasible. I'd suggest replacing 1–2 optional modules temporarily and tracking weekly milestone completions.",
      tags: ['6-Week Sprint', 'Engineering', 'Feasible Now']
    },
    {
      text: "The **Data Literacy gap (41%)** is likely to cause risk in Q3 because 3 product launches have data-driven decision-making requirements. Prioritizing this for Product and Marketing teams (26 people) over 4 weeks would cover the highest-impact segments first.",
      tags: ['Data Literacy', 'Q3 Risk', 'Product & Marketing']
    },
    {
      text: "Communication skills are the **highest certified at 88%** — this is partly because it's the shortest certification path (4 hrs total). Consider using this as a template: shorter, modular paths for critical skills like Cloud Architecture could dramatically improve uptake.",
      tags: ['Communication Win', 'Path Design', 'Short Modules']
    }
  ]
};

function generateAiResponse(question, widgetId, time) {
  const pool = GENERIC_RESPONSES[widgetId] || [];
  const idx = Math.floor(Math.random() * pool.length);
  const base = pool[idx] || { text: "I'm analyzing that data. Based on the current trends, your team is performing well overall with some areas that could benefit from targeted interventions.", tags: ['Analysis', 'In Progress'] };

  return {
    type: 'ai',
    text: base.text,
    tags: base.tags,
    time
  };
}

/* ============================================================
   UTILITIES
   ============================================================ */
function scrollThreadToBottom() {
  requestAnimationFrame(() => {
    $messageThread.scrollTop = $messageThread.scrollHeight;
  });
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMarkdown(text) {
  // Bold **text**
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

/* ============================================================
   INITIAL STATE
   ============================================================ */
updateSendBtn();

// Animate widgets in on load
document.querySelectorAll('.widget').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(12px)';
  setTimeout(() => {
    el.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100 + i * 80);
});

/* ============================================================
   PROFILE DROPDOWN TOGGLE
   ============================================================ */
const $profileTrigger  = document.getElementById('profile-trigger');
const $profileDropdown = document.getElementById('profile-dropdown');

function openProfileMenu() {
  $profileDropdown.hidden = false;
  $profileTrigger.setAttribute('aria-expanded', 'true');
  // Re-trigger animation each open
  $profileDropdown.style.animation = 'none';
  $profileDropdown.offsetHeight; // reflow
  $profileDropdown.style.animation = '';
}

function closeProfileMenu() {
  $profileDropdown.hidden = true;
  $profileTrigger.setAttribute('aria-expanded', 'false');
}

$profileTrigger.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = $profileTrigger.getAttribute('aria-expanded') === 'true';
  isOpen ? closeProfileMenu() : openProfileMenu();
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!document.getElementById('profile-menu-wrap').contains(e.target)) {
    closeProfileMenu();
  }
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $profileTrigger.getAttribute('aria-expanded') === 'true') {
    closeProfileMenu();
    $profileTrigger.focus();
  }
});

// Prevent menu item clicks from bubbling and close menu
$profileDropdown.querySelectorAll('.profile-menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    closeProfileMenu();
  });
});
