import { useEffect, useMemo, useState } from 'react'
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

const initialApprovalQueue = [
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

const initialReferrals = [
  {
    agent: 'Sarah Thompson',
    brokerage: 'Keller Williams St. Pete',
    seller: 'Maria Gonzales',
    property: '4128 15th Ave S, St. Petersburg, FL',
    timeline: '14 days',
    motivation: 'Inherited property, wants quick close',
    condition: 'Dated, needs full cosmetic rehab',
    price: '$210K expectation',
    fee: '25% of OMV fee',
    payout: 'Pending close',
    status: 'Qualified',
  },
  {
    agent: 'David Ruiz',
    brokerage: 'EXP Realty Tampa Bay',
    seller: 'James Carter',
    property: '2435 McGregor St, Lakeland, FL',
    timeline: 'ASAP',
    motivation: 'Vacant property, tired landlord',
    condition: 'Rough, full rehab',
    price: '$65K target ask',
    fee: 'Flat $2,500',
    payout: 'Awaiting disposition',
    status: 'In Review',
  },
  {
    agent: 'Nicole Benson',
    brokerage: 'Compass',
    seller: 'Evelyn Price',
    property: '2858 Fairfield Ave S, St. Petersburg, FL',
    timeline: '30 days',
    motivation: 'Wants certainty and simple terms',
    condition: 'Solid structure, light update path',
    price: '$220K ask aligned',
    fee: '25% of OMV fee',
    payout: 'Scheduled',
    status: 'Under Contract',
  },
]

const approvalStatusOptions = ['Draft', 'Pending Approval', 'Approved', 'Sent', 'Rejected']
const approvalChannelOptions = ['Text', 'Email', 'Call Notes', 'Direct Mail']
const priorityOptions = ['High', 'Medium', 'Low']
const referralStatusOptions = ['New Referral', 'Qualified', 'In Review', 'Offer / Dispo Active', 'Under Contract', 'Closed + Paid']
const payoutOptions = ['Not Started', 'Pending close', 'Awaiting disposition', 'Scheduled', 'Paid']
const approvalStorageKey = 'omv-command-center-approval-items'
const referralStorageKey = 'omv-command-center-referral-items'

const systemRules = [
  'Nothing sends externally without JJ approval.',
  'PPL seller automation stays separate from CMS and every other lead source.',
  'Live seller offers should sign on the spot or capture the objection immediately.',
  'Buyers are tracked by quality, behavior, funding, and strategy tags.',
  'Deals are not dead until the seller refuses to work with OMV or says stop contacting.',
]

const emptyApprovalForm = {
  title: '',
  channel: 'Text',
  owner: 'Draft',
  audience: '',
  status: 'Draft',
  priority: 'Medium',
  detail: '',
}

const emptyReferralForm = {
  agent: '',
  brokerage: '',
  seller: '',
  property: '',
  timeline: '',
  motivation: '',
  condition: '',
  price: '',
  fee: '',
  payout: 'Not Started',
  status: 'New Referral',
}

function metricCount(items, key, value) {
  return items.filter((item) => item[key] === value).length.toString()
}

function statusClassName(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

function loadStoredItems(storageKey, fallback) {
  if (typeof window === 'undefined') return fallback

  const rawValue = window.localStorage.getItem(storageKey)

  if (!rawValue) return fallback

  try {
    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [approvalItems, setApprovalItems] = useState(() => loadStoredItems(approvalStorageKey, initialApprovalQueue))
  const [approvalForm, setApprovalForm] = useState(emptyApprovalForm)
  const [approvalFilter, setApprovalFilter] = useState('All')
  const [referralItems, setReferralItems] = useState(() => loadStoredItems(referralStorageKey, initialReferrals))
  const [referralForm, setReferralForm] = useState(emptyReferralForm)
  const [referralFilter, setReferralFilter] = useState('All')

  const approvalMetrics = useMemo(
    () => [
      { label: 'Drafts ready', value: metricCount(approvalItems, 'status', 'Draft'), hint: 'Prepared by Draft, Harbor, and Mason for JJ review.' },
      { label: 'Pending approval', value: metricCount(approvalItems, 'status', 'Pending Approval'), hint: 'Waiting on JJ before anything goes out.' },
      { label: 'Approved today', value: metricCount(approvalItems, 'status', 'Approved'), hint: 'Cleared and ready for send or handoff.' },
      { label: 'Rejected / revise', value: metricCount(approvalItems, 'status', 'Rejected'), hint: 'Needs copy changes, targeting fixes, or timing changes.' },
    ],
    [approvalItems],
  )

  const referralMetrics = useMemo(
    () => [
      { label: 'Open referrals', value: referralItems.filter((item) => item.status !== 'Closed + Paid').length.toString(), hint: 'Local agent referrals currently being worked by OMV.' },
      { label: 'Agent partners', value: new Set(referralItems.map((item) => item.agent)).size.toString(), hint: 'Agents and brokers who have referred or may refer deals.' },
      { label: 'Pending payouts', value: referralItems.filter((item) => item.payout !== 'Paid' && item.payout !== 'Not Started').length.toString(), hint: 'Referral fees waiting on close or final confirmation.' },
      { label: 'Closed referrals', value: metricCount(referralItems, 'status', 'Closed + Paid'), hint: 'Referral deals that made it through contract to close.' },
    ],
    [referralItems],
  )

  const visibleApprovalItems = useMemo(() => {
    if (approvalFilter === 'All') return approvalItems
    return approvalItems.filter((item) => item.status === approvalFilter)
  }, [approvalFilter, approvalItems])

  const visibleReferralItems = useMemo(() => {
    if (referralFilter === 'All') return referralItems
    return referralItems.filter((item) => item.status === referralFilter)
  }, [referralFilter, referralItems])

  const referralStages = referralStatusOptions

  useEffect(() => {
    window.localStorage.setItem(approvalStorageKey, JSON.stringify(approvalItems))
  }, [approvalItems])

  useEffect(() => {
    window.localStorage.setItem(referralStorageKey, JSON.stringify(referralItems))
  }, [referralItems])

  function handleApprovalSubmit(event) {
    event.preventDefault()
    setApprovalItems((current) => [{ ...approvalForm }, ...current])
    setApprovalForm(emptyApprovalForm)
    setApprovalFilter('All')
  }

  function handleReferralSubmit(event) {
    event.preventDefault()
    setReferralItems((current) => [{ ...referralForm }, ...current])
    setReferralForm(emptyReferralForm)
    setReferralFilter('All')
  }

  function moveApprovalStatus(index, direction) {
    setApprovalItems((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) return item
        const currentIndex = approvalStatusOptions.indexOf(item.status)
        const nextIndex = Math.max(0, Math.min(approvalStatusOptions.length - 1, currentIndex + direction))
        return { ...item, status: approvalStatusOptions[nextIndex] }
      }),
    )
  }

  function moveReferralStatus(index, direction) {
    setReferralItems((current) =>
      current.map((item, itemIndex) => {
        if (itemIndex !== index) return item
        const currentIndex = referralStatusOptions.indexOf(item.status)
        const nextIndex = Math.max(0, Math.min(referralStatusOptions.length - 1, currentIndex + direction))
        const nextStatus = referralStatusOptions[nextIndex]
        return {
          ...item,
          status: nextStatus,
          payout: nextStatus === 'Closed + Paid' ? 'Paid' : item.payout,
        }
      }),
    )
  }

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

      <section className="section-block workflow-section">
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
        <div className="workflow-grid">
          <form className="panel workflow-form" onSubmit={handleApprovalSubmit}>
            <div className="section-head compact">
              <h2>Add draft</h2>
              <p>Create a new approval item for copy, dispo, or follow-up review.</p>
            </div>
            <p className="helper-copy">This now saves in this browser automatically, so refreshes will keep your entries.</p>
            <label>
              Title
              <input value={approvalForm.title} onChange={(event) => setApprovalForm({ ...approvalForm, title: event.target.value })} required />
            </label>
            <div className="form-row two-up">
              <label>
                Channel
                <select value={approvalForm.channel} onChange={(event) => setApprovalForm({ ...approvalForm, channel: event.target.value })}>
                  {approvalChannelOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Owner
                <input value={approvalForm.owner} onChange={(event) => setApprovalForm({ ...approvalForm, owner: event.target.value })} required />
              </label>
            </div>
            <label>
              Audience
              <input value={approvalForm.audience} onChange={(event) => setApprovalForm({ ...approvalForm, audience: event.target.value })} required />
            </label>
            <div className="form-row two-up">
              <label>
                Status
                <select value={approvalForm.status} onChange={(event) => setApprovalForm({ ...approvalForm, status: event.target.value })}>
                  {approvalStatusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                Priority
                <select value={approvalForm.priority} onChange={(event) => setApprovalForm({ ...approvalForm, priority: event.target.value })}>
                  {priorityOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Detail
              <textarea value={approvalForm.detail} onChange={(event) => setApprovalForm({ ...approvalForm, detail: event.target.value })} rows="4" required />
            </label>
            <button type="submit" className="primary-button">Add to queue</button>
          </form>

          <div className="panel workflow-list-panel">
            <div className="section-head compact workflow-list-head">
              <div>
                <h2>Workflow queue</h2>
                <p>Review, filter, and move items through approval status.</p>
              </div>
              <label className="filter-control">
                Filter
                <select value={approvalFilter} onChange={(event) => setApprovalFilter(event.target.value)}>
                  <option value="All">All</option>
                  {approvalStatusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="approval-queue-list">
              {visibleApprovalItems.map((item, index) => {
                const sourceIndex = approvalItems.findIndex((queueItem) => queueItem === item)
                const statusIndex = approvalStatusOptions.indexOf(item.status)
                return (
                  <article key={`${item.title}-${sourceIndex}`} className="approval-card">
                    <div className="approval-card-top">
                      <div>
                        <p className="lane">{item.channel}</p>
                        <h3>{item.title}</h3>
                      </div>
                      <div className="bot-header-meta">
                        <span className={`chip ${item.status.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{item.status}</span>
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
                    <div className="workflow-actions">
                      <button type="button" className="secondary-button" disabled={statusIndex === 0} onClick={() => moveApprovalStatus(sourceIndex, -1)}>
                        Move back
                      </button>
                      <button type="button" className="primary-button" disabled={statusIndex === approvalStatusOptions.length - 1} onClick={() => moveApprovalStatus(sourceIndex, 1)}>
                        Move forward
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-block workflow-section">
        <div className="section-head">
          <h2>Agent referral system</h2>
          <p>Track who referred the deal, what the seller needs, and what OMV owes if the deal closes.</p>
        </div>
        <div className="approval-metric-grid">
          {referralMetrics.map((metric) => (
            <div key={metric.label} className="metric-card approval-metric-card">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
              <span className="metric-hint">{metric.hint}</span>
            </div>
          ))}
        </div>
        <div className="referral-stage-strip">
          {referralStages.map((stage) => (
            <div key={stage} className="stage-pill">{stage}</div>
          ))}
        </div>
        <div className="workflow-grid">
          <form className="panel workflow-form" onSubmit={handleReferralSubmit}>
            <div className="section-head compact">
              <h2>Add referral</h2>
              <p>Capture a new agent referral with enough detail to work and pay it correctly.</p>
            </div>
            <p className="helper-copy">This now saves in this browser automatically, so refreshes will keep your entries.</p>
            <div className="form-row two-up">
              <label>
                Agent
                <input value={referralForm.agent} onChange={(event) => setReferralForm({ ...referralForm, agent: event.target.value })} required />
              </label>
              <label>
                Brokerage
                <input value={referralForm.brokerage} onChange={(event) => setReferralForm({ ...referralForm, brokerage: event.target.value })} required />
              </label>
            </div>
            <div className="form-row two-up">
              <label>
                Seller
                <input value={referralForm.seller} onChange={(event) => setReferralForm({ ...referralForm, seller: event.target.value })} required />
              </label>
              <label>
                Property
                <input value={referralForm.property} onChange={(event) => setReferralForm({ ...referralForm, property: event.target.value })} required />
              </label>
            </div>
            <div className="form-row two-up">
              <label>
                Timeline
                <input value={referralForm.timeline} onChange={(event) => setReferralForm({ ...referralForm, timeline: event.target.value })} required />
              </label>
              <label>
                Price expectation
                <input value={referralForm.price} onChange={(event) => setReferralForm({ ...referralForm, price: event.target.value })} required />
              </label>
            </div>
            <label>
              Motivation
              <textarea value={referralForm.motivation} onChange={(event) => setReferralForm({ ...referralForm, motivation: event.target.value })} rows="3" required />
            </label>
            <label>
              Condition
              <textarea value={referralForm.condition} onChange={(event) => setReferralForm({ ...referralForm, condition: event.target.value })} rows="3" required />
            </label>
            <div className="form-row two-up">
              <label>
                Referral fee
                <input value={referralForm.fee} onChange={(event) => setReferralForm({ ...referralForm, fee: event.target.value })} required />
              </label>
              <label>
                Payout status
                <select value={referralForm.payout} onChange={(event) => setReferralForm({ ...referralForm, payout: event.target.value })}>
                  {payoutOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Workflow stage
              <select value={referralForm.status} onChange={(event) => setReferralForm({ ...referralForm, status: event.target.value })}>
                {referralStatusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="primary-button">Add referral</button>
          </form>

          <div className="panel workflow-list-panel">
            <div className="section-head compact workflow-list-head">
              <div>
                <h2>Referral workflow</h2>
                <p>Filter referrals and move them forward from intake through payout.</p>
              </div>
              <label className="filter-control">
                Filter
                <select value={referralFilter} onChange={(event) => setReferralFilter(event.target.value)}>
                  <option value="All">All</option>
                  {referralStatusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="approval-queue-list referral-grid">
              {visibleReferralItems.map((referral) => {
                const sourceIndex = referralItems.findIndex((item) => item === referral)
                const statusIndex = referralStatusOptions.indexOf(referral.status)
                return (
                  <article key={`${referral.agent}-${referral.property}-${sourceIndex}`} className="approval-card referral-card">
                    <div className="approval-card-top">
                      <div>
                        <p className="lane">{referral.brokerage}</p>
                        <h3>{referral.property}</h3>
                      </div>
                      <span className={`chip ${referral.status.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{referral.status}</span>
                    </div>
                    <div className="approval-meta-grid referral-meta-grid">
                      <div>
                        <span className="micro-label">Agent</span>
                        <p>{referral.agent}</p>
                      </div>
                      <div>
                        <span className="micro-label">Seller</span>
                        <p>{referral.seller}</p>
                      </div>
                      <div>
                        <span className="micro-label">Timeline</span>
                        <p>{referral.timeline}</p>
                      </div>
                      <div>
                        <span className="micro-label">Condition</span>
                        <p>{referral.condition}</p>
                      </div>
                      <div>
                        <span className="micro-label">Motivation</span>
                        <p>{referral.motivation}</p>
                      </div>
                      <div>
                        <span className="micro-label">Price</span>
                        <p>{referral.price}</p>
                      </div>
                      <div>
                        <span className="micro-label">Referral fee</span>
                        <p>{referral.fee}</p>
                      </div>
                      <div>
                        <span className="micro-label">Payout status</span>
                        <p>{referral.payout}</p>
                      </div>
                    </div>
                    <div className="workflow-actions">
                      <button type="button" className="secondary-button" disabled={statusIndex === 0} onClick={() => moveReferralStatus(sourceIndex, -1)}>
                        Move back
                      </button>
                      <button type="button" className="primary-button" disabled={statusIndex === referralStatusOptions.length - 1} onClick={() => moveReferralStatus(sourceIndex, 1)}>
                        Move forward
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
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
            <li>Replace browser storage with a shared cloud database.</li>
            <li>Add user auth and role permissions for JJ approvals.</li>
            <li>Add a seller follow-up board for Mason and Bolt.</li>
            <li>Add dispo and buyer watchlists for Harbor and Scout.</li>
          </ol>
        </div>
      </section>
    </div>
  )
}

export default App
