import './App.css'

const headlineMetrics = [
  { label: 'Bots online', value: '9', hint: 'Command, acquisitions, dispo, reporting' },
  { label: 'Core zaps live', value: '4', hint: 'Lead alert, rotation, response, appointment' },
  { label: 'Active dispo deals', value: '1', hint: 'Fairfield is the current live assignment' },
  { label: 'Buyer records in scope', value: '188', hint: 'Fairfield cash buyers currently segmented' },
]

const alerts = [
  { level: 'critical', title: 'Fairfield dispo window active', detail: 'Harbor and Scout should keep buyer momentum tight through closing.' },
  { level: 'warning', title: 'Seller automation incomplete', detail: 'FUB native Day 1 to Day 7 flow needs a clean Automation 2.0 build.' },
  { level: 'info', title: 'Buyer system defined', detail: 'Tags, smart list logic, and SOP structure are ready to apply.' },
]

const bots = [
  {
    name: 'Dexter',
    role: 'Chief of Staff / Ops Orchestrator',
    focus: 'Runs OMV command, prioritizes work, routes decisions, and keeps the machine aligned.',
    status: 'Online',
    lane: 'Command',
    outputs: ['Daily priorities', 'Cross-team coordination', 'Build sequencing'],
    priority: 'High',
  },
  {
    name: 'Bolt',
    role: 'Speed-to-Lead Bot',
    focus: 'Monitors new leads, triggers alerts, and drives immediate seller contact workflows.',
    status: 'Live',
    lane: 'Acquisitions',
    outputs: ['Lead alerts', 'Contact urgency', 'Routing by flow'],
    priority: 'High',
  },
  {
    name: 'Mason',
    role: 'Acquisitions Follow-Up Bot',
    focus: 'Tracks seller follow-up, callbacks, objections, unsigned offers, and next actions.',
    status: 'Ready',
    lane: 'Acquisitions',
    outputs: ['Callback queue', 'Offer objection tracking', 'Stalled lead recovery'],
    priority: 'High',
  },
  {
    name: 'Harbor',
    role: 'Dispo Ops Bot',
    focus: 'Runs buyer outreach workflows, walkthrough coordination, offers, and dispo execution.',
    status: 'Ready',
    lane: 'Dispo',
    outputs: ['Buyer blast prep', 'Walkthrough tracking', 'Offer flow control'],
    priority: 'High',
  },
  {
    name: 'Scout',
    role: 'Buyer Intelligence Bot',
    focus: 'Builds and ranks the buyer database, tracks VIPs, strategy, and funding behavior.',
    status: 'Ready',
    lane: 'Dispo',
    outputs: ['VIP tracking', 'Buyer matching', 'Funding + strategy tags'],
    priority: 'High',
  },
  {
    name: 'Atlas',
    role: 'Deal Flow Bot',
    focus: 'Tracks contracts, deadlines, close dates, title, EMD, and deal health across the board.',
    status: 'Ready',
    lane: 'Transactions',
    outputs: ['Deadline watch', 'Deal health', 'Closing checklist'],
    priority: 'Medium',
  },
  {
    name: 'Ledger',
    role: 'KPI / Reporting Bot',
    focus: 'Turns lead, acquisition, and dispo activity into scoreboards, trends, and operational clarity.',
    status: 'Queued',
    lane: 'Reporting',
    outputs: ['Weekly KPIs', 'Trend reports', 'Conversion insights'],
    priority: 'Medium',
  },
  {
    name: 'Ember',
    role: 'Reactivation Bot',
    focus: 'Works stale sellers, cold buyers, and long-term nurture pools to find hidden revenue.',
    status: 'Queued',
    lane: 'Growth',
    outputs: ['Old lead reactivation', 'Cold nurture touches', 'Revived conversations'],
    priority: 'Medium',
  },
  {
    name: 'Draft',
    role: 'Campaign / Copy Bot',
    focus: 'Writes texts, emails, sequences, and deal messaging that sound local, sharp, and human.',
    status: 'Ready',
    lane: 'Marketing',
    outputs: ['Text campaigns', 'Email copy', 'Deal breakdowns'],
    priority: 'Medium',
  },
]

const commandLanes = [
  {
    title: 'Acquisitions lane',
    owner: 'Bolt + Mason',
    summary: 'Owns speed-to-lead, contact pressure, seller follow-up, and unsigned offer recovery.',
  },
  {
    title: 'Dispo lane',
    owner: 'Harbor + Scout',
    summary: 'Owns buyer segmentation, walkthroughs, dispo pushes, and deal-to-buyer matching.',
  },
  {
    title: 'Transaction lane',
    owner: 'Atlas',
    summary: 'Owns active contract tracking, close dates, title coordination, and deadline visibility.',
  },
  {
    title: 'Intelligence lane',
    owner: 'Ledger + Ember + Draft',
    summary: 'Owns reporting, reactivation, campaign writing, and strategic optimization.',
  },
]

const queueCards = [
  { title: 'New seller leads', count: '04', detail: 'Immediate contact pressure belongs to Bolt and Mason.' },
  { title: 'Unsigned offers', count: '03', detail: 'Track price, terms, timeline, payoff, and signer friction.' },
  { title: 'Buyer shortlist', count: '188', detail: 'Scout should keep Fairfield segmented and buyer-ready.' },
  { title: 'Deals needing attention', count: '02', detail: 'Lesia close date and Fairfield dispo remain priority.' },
]

const approvalMetrics = [
  { label: 'Drafts ready', value: '12', hint: 'Prepared by Draft, Harbor, and Mason for JJ review.' },
  { label: 'Pending approval', value: '5', hint: 'Waiting on JJ before anything goes out.' },
  { label: 'Approved today', value: '3', hint: 'Cleared and ready for send or handoff.' },
  { label: 'Rejected / revise', value: '2', hint: 'Needs copy changes, targeting fixes, or timing changes.' },
]

const approvalQueue = [
  {
    title: 'Fairfield buyer email blast',
    channel: 'Email',
    owner: 'Harbor',
    audience: 'Cash buyer list, Saint Pete',
    status: 'Pending Approval',
    priority: 'High',
    detail: 'Buyer-facing dispo email draft for Fairfield, ready for JJ to review and approve.',
  },
  {
    title: 'Unsigned seller follow-up text',
    channel: 'Text',
    owner: 'Mason',
    audience: 'Offer Sent - Live',
    status: 'Draft',
    priority: 'High',
    detail: 'Short objection-handling follow-up for sellers who received the offer but have not signed.',
  },
  {
    title: 'VIP buyer walkthrough invite',
    channel: 'Text',
    owner: 'Scout',
    audience: 'VIP Buyer + Walkthrough Showed',
    status: 'Approved',
    priority: 'Medium',
    detail: 'Message for serious buyers to lock in walkthrough attendance and confirm timeline.',
  },
  {
    title: 'McGregor dispo teaser',
    channel: 'Email',
    owner: 'Draft',
    audience: 'Lakeland cash buyers',
    status: 'Sent',
    priority: 'Medium',
    detail: 'Buyer-safe teaser copy with asking price only, no internal spread shown.',
  },
  {
    title: 'Cold buyer reactivation nudge',
    channel: 'Text',
    owner: 'Ember',
    audience: 'Cold buyers 90+ days',
    status: 'Rejected',
    priority: 'Low',
    detail: 'Needs stronger local tone before JJ will approve it for use.',
  },
]

const systemRules = [
  'Nothing sends externally without JJ approval.',
  'PPL seller automation stays separate from CMS and every other lead source.',
  'Live seller offers should sign on the spot or capture the objection immediately.',
  'Buyers are tracked by quality, behavior, funding, and strategy tags.',
  'Deals are not dead until the seller refuses to work with OMV or says stop contacting.',
]

function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <div>
          <p className="eyebrow">Off Market Vault // Internal Ops Grid</p>
          <h1>OMV Command Center</h1>
          <p className="subtitle">
            A modern control room for JJ’s wholesale machine, built to run leads, buyers, deals,
            and bot operators from one screen.
          </p>
        </div>
        <div className="status-cluster">
          <div className="status-pill live">Core systems live</div>
          <div className="status-pill draft">Expansion mode</div>
        </div>
      </header>

      <section className="hero-panel">
        <div className="mission-block">
          <div className="mission-copy">
            <p className="micro-label">Command objective</p>
            <h2>Build the ultimate OMV bot team and make it visible.</h2>
            <p>
              This command center is the shell for a real operating system, not a toy dashboard.
              Every bot has a lane, every lane has ownership, and the entire business becomes easier
              to see, direct, and scale.
            </p>
          </div>
          <div className="mission-grid">
            {headlineMetrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
                <span className="metric-hint">{metric.hint}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="alert-panel">
          <div className="section-head compact">
            <h3>Priority alerts</h3>
            <p>What JJ should feel immediately when opening the room.</p>
          </div>
          <div className="alert-list">
            {alerts.map((alert) => (
              <article key={alert.title} className={`alert-card ${alert.level}`}>
                <div className="alert-dot" />
                <div>
                  <h4>{alert.title}</h4>
                  <p>{alert.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Bot team</h2>
          <p>Named operators with clear ownership, status, and outputs.</p>
        </div>
        <div className="bot-grid">
          {bots.map((bot) => (
            <article key={bot.name} className="bot-card">
              <div className="bot-header">
                <div>
                  <p className="lane">{bot.lane}</p>
                  <h3>{bot.name}</h3>
                  <p className="role">{bot.role}</p>
                </div>
                <div className="bot-header-meta">
                  <span className={`chip ${bot.status.toLowerCase()}`}>{bot.status}</span>
                  <span className="priority-tag">{bot.priority}</span>
                </div>
              </div>
              <p className="focus">{bot.focus}</p>
              <ul>
                {bot.outputs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block two-col">
        <div className="panel">
          <div className="section-head compact">
            <h2>Command lanes</h2>
            <p>How the work is divided across the OMV machine.</p>
          </div>
          <div className="lane-stack">
            {commandLanes.map((lane) => (
              <div key={lane.title} className="lane-card">
                <p className="lane-owner">{lane.owner}</p>
                <h3>{lane.title}</h3>
                <p>{lane.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-head compact">
            <h2>Hot queues</h2>
            <p>The pressure points the room should surface right away.</p>
          </div>
          <div className="queue-grid">
            {queueCards.map((card) => (
              <div key={card.title} className="queue-card">
                <span className="queue-count">{card.count}</span>
                <h3>{card.title}</h3>
                <p>{card.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Approval queue</h2>
          <p>A safe review layer so JJ can approve drafts before anything goes out.</p>
        </div>
        <div className="approval-metric-grid">
          {approvalMetrics.map((metric) => (
            <div key={metric.label} className="metric-card approval-metric-card">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
              <span className="metric-hint">{metric.hint}</span>
            </div>
          ))}
        </div>
        <div className="approval-queue-list">
          {approvalQueue.map((item) => (
            <article key={item.title} className="approval-card">
              <div className="approval-card-top">
                <div>
                  <p className="lane">{item.channel}</p>
                  <h3>{item.title}</h3>
                </div>
                <div className="bot-header-meta">
                  <span className={`chip ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span>
                  <span className="priority-tag">{item.priority}</span>
                </div>
              </div>
              <p className="focus">{item.detail}</p>
              <div className="approval-meta-grid">
                <div>
                  <span className="micro-label">Owner</span>
                  <p>{item.owner}</p>
                </div>
                <div>
                  <span className="micro-label">Audience</span>
                  <p>{item.audience}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block two-col">
        <div className="panel">
          <div className="section-head compact">
            <h2>Operating rules</h2>
            <p>The standards this room should enforce every day.</p>
          </div>
          <ul className="rules-list">
            {systemRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="panel build-panel">
          <div className="section-head compact">
            <h2>Next build wave</h2>
            <p>What turns this from a sharp shell into a full OMV operating system.</p>
          </div>
          <ol className="build-list">
            <li>Connect live FUB and Zap status into the dashboard.</li>
            <li>Turn the approval queue into a true click-to-review workflow.</li>
            <li>Add a seller follow-up board for Mason and Bolt.</li>
            <li>Add dispo and buyer watchlists for Harbor and Scout.</li>
            <li>Add agent referral intake and payout tracking.</li>
          </ol>
        </div>
      </section>
    </div>
  )
}

export default App
