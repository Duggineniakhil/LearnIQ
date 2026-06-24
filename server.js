const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mock AI responses for each widget
const aiResponses = {
  completion: [
    {
      type: 'summary',
      question: "What's driving the completion rate drop last week?",
      answer: "Based on the completion rate data, there was a **7.3% dip** last week (Mon–Wed). This correlates with the new compliance module rollout — historically, new modules see 12–15% lower completion in the first 5 days as learners adjust. The trend is already recovering: Friday's rate was 83.2%, and weekend completions were strong.",
      chart: {
        type: 'trend',
        data: [81, 79, 78, 82, 83, 85, 87],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        color: '#3B82F6'
      },
      tags: ['Compliance Module', 'New Content', 'Recovery Trend']
    }
  ],
  hours: [
    {
      type: 'summary',
      question: "Which teams are logging the most learning hours?",
      answer: "Engineering leads with **42.3 hrs/week** average per learner, followed by Product at 38.1 hrs. Sales is significantly below target at 21.4 hrs — only 61% of their 35hr weekly goal. I'd recommend reviewing the Sales team's learning path assignment, as their content may not be relevant enough to drive engagement.",
      chart: {
        type: 'bar',
        data: [42.3, 38.1, 35.7, 29.4, 21.4],
        labels: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales'],
        color: '#8B5CF6'
      },
      tags: ['Sales Gap', 'Engineering Top', 'Goal Tracking']
    }
  ],
  performance: [
    {
      type: 'summary',
      question: "How does Q2 compare to Q1 for team performance?",
      answer: "Q2 performance scores are up **+18.4 points** on average compared to Q1 — the strongest quarter-over-quarter improvement in 18 months. The biggest gains came from the Backend Engineering team (+31 pts) following the system design curriculum rollout. Three teams are still underperforming: Content, QA, and Operations, all sitting below the 70-point benchmark.",
      chart: {
        type: 'comparison',
        q1: [68, 71, 65, 72, 58, 70],
        q2: [84, 89, 79, 86, 74, 82],
        labels: ['Backend', 'Frontend', 'Data', 'DevOps', 'QA', 'Product'],
        color: '#10B981'
      },
      tags: ['Q2 Improvement', 'QA Below Target', 'Best Quarter']
    }
  ],
  skills: [
    {
      type: 'summary',
      question: "What skill gaps are most critical right now?",
      answer: "The most critical gap is **Cloud Architecture** — only 23% of engineers have completed the required certification path, against a 75% organizational target. Data Literacy follows at 41% completion. Both are flagged as business-critical skills for Q3. I recommend prioritizing Cloud Architecture with a structured 6-week sprint for all engineering sub-teams.",
      chart: {
        type: 'gauge',
        data: [23, 41, 67, 78, 88],
        labels: ['Cloud Arch', 'Data Literacy', 'Security', 'Agile', 'Communication'],
        color: '#F59E0B'
      },
      tags: ['Cloud Gap', 'Q3 Risk', 'Critical Priority']
    }
  ]
};

app.get('/api/ai-response/:widgetId', (req, res) => {
  const { widgetId } = req.params;
  const responses = aiResponses[widgetId];
  if (responses) {
    res.json(responses[0]);
  } else {
    res.status(404).json({ error: 'Widget not found' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Dashboard running at: http://localhost:${PORT}`);
  console.log(`   Press Ctrl+C to stop\n`);
});
