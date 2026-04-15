import './App.css'

const bots = [
  {
    name: 'Dexter',
    role: 'Chief of Staff / Ops Orchestrator',
    focus: 'Runs OMV command, prioritizes work, routes decisions, keeps the machine aligned.',
    status: 'Active',
    lane: 'Command',
    outputs: ['Daily priorities', 'Cross-team coordination', 'Ops decisions'],
  },
  {
    name: 'Bolt',
    role: 'Speed-to-Lead Bot',
    focus: 'Monitors new leads, triggers alerts, and drives immediate contact workflows.',
    status: 'Live',
    lane: 'Acquisitions',
    outputs: ['New lead alerts', 'Contact urgency', 'Lead routing'],
  },
  {
    name: 'Mason',
    role: 'Acquisitions Follow-Up Bot',
    focus: 'Tracks seller follow-up, offer objections, callbacks, and stalled acquisition leads.',
    status: 'Ready',
    lane: 'Acquisitions',
    outputs: ['Follow-up queues', 'Unsigned offer tracking', 'Seller objections'],
  },
  {
    name: 'Harbor',
    role: 'Dispo Ops Bot',
    focus: 'Organizes buyer outreach, walkthroughs, offers, and dispo workflows.',
    status: 'Ready',
    lane: 'Dispo',
    outputs: ['Buyer blasts', 'Walkthrough tracking', 'Offer flow'],
  },
  {
    name: 'Scout',
    role: 'Buyer Intelligence Bot',
    focus: 'Builds the buyer database, tags behavior, tracks VIPs, and matches deals to buyers.',
    status: 'Ready',
    lane: 'Dispo',
    outputs: ['Buyer ranking', 'VIP list', 'Funding + strategy tags'],
  },
  {
    name: 'Atlas',
    role: 'Deal Flow Bot',
    focus: 'Tracks active deals, deadlines, missing close dates, title, EMD, and closing progress.',
    status: 'Ready',
    lane: 'Transactions',
    outputs: ['Deadline watch', 'Deal health', 'Closing checklist'],
  },
  {
    name: 'Ledger',
    role: 'KPI / Reporting Bot',
    focus: 'Turns lead, acquisition, and dispo activity into weekly scoreboards and trends.',
    status: 'Planned',
    lane: 'Reporting',
    outputs: ['Weekly KPI report', 'Trend analysis', 'Conversion insights'],
  },
  {
    name: 'Ember',
    role: 'Reactivation Bot',
    focus: 'Works stale sellers, cold buyers, and long-term nurture opportunities.',
    status: 'Planned',
    lane: 'Growth',
    outputs: ['Old lead reactivation', 'Cold nurture touches', 'Revived opportunities'],
  },
  {
    name: 'Draft',
    role: 'Campaign / Copy Bot',
    focus: 'Writes texts, emails, follow-up sequences, and deal positioning copy.',
    status: 'Ready',
    lane: 'Marketing',
    outputs: ['Text campaigns', 'Email copy', 'Deal summaries'],
  },
]

const queues = [
  { title: 'New Seller Leads', count: 4, note: 'Bolt + Mason own first response and follow-up.' },
  { title: 'Unsigned Offers', count: 3, note: 'Mason watching objections, price, terms, and timing.' },
  { title: 'Active Dispo Deals', count: 1, note: 'Harbor + Scout support Fairfield now.' },
  { title: 'Buyer Database Cleanup', count: 188, note: 'Scout organizing Fairfield cash buyers.' },
]

const buildRoadmap = [
  'Bolt, Mason, Harbor as the first operating trio',
  'Scout and Atlas to harden buyer and deal intelligence',
  'Ledger and Ember after reporting and nurture logic are defined',
  'Draft supporting every campaign and outreach asset',
]

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Off Market Vault</p>
          <h1>OMV Command Center</h1>
          <p className="subtitle">Your bot team, roles, and operating lanes in one place.</p>
        </div>
        <div className="status-pill">Build in progress</div>
      </header>

      <section className="hero-grid">
        <div className="hero-card primary">
          <h2>Mission</h2>
          <p>
            Build the ultimate wholesale support team around JJ with visible bots for lead intake,
            acquisitions follow-up, dispo ops, buyer intelligence, deal flow, and reporting.
          </p>
        </div>
        <div className="hero-card">
          <h2>What is live</h2>
          <ul>
            <li>Zap 1, new PPL seller lead alert</li>
            <li>Zap 2, number rotation reminder</li>
            <li>Zap 3, response alert</li>
            <li>Zap 4, appointment set alert</li>
          </ul>
        </div>
        <div className="hero-card">
          <h2>Next build wave</h2>
          <ul>
            {buildRoadmap.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <h2>Bot Team</h2>
          <p>Named roles, clear ownership, and visible outputs.</p>
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
                <span className={`chip ${bot.status.toLowerCase()}`}>{bot.status}</span>
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
            <h2>Queues</h2>
            <p>What the team should be watching.</p>
          </div>
          <div className="queue-list">
            {queues.map((queue) => (
              <div key={queue.title} className="queue-item">
                <div>
                  <h3>{queue.title}</h3>
                  <p>{queue.note}</p>
                </div>
                <span>{queue.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="section-head compact">
            <h2>Operating Rules</h2>
            <p>Default standards for the OMV bot team.</p>
          </div>
          <ul className="rules-list">
            <li>Nothing sends externally without JJ approval.</li>
            <li>PPL seller automation stays separate from CMS and other lead flows.</li>
            <li>Buyers are tracked by quality, behavior, funding, and strategy tags.</li>
            <li>Live seller offers should sign on the spot or capture the objection immediately.</li>
            <li>Deals are not dead until the seller refuses to work with OMV or says stop contacting.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default App
