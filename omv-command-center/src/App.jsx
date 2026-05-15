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
  { title: 'Buyer shortlist', count: '202', detail: 'Lakeland cash buyers imported and ready for McGregor outreach.' },
  { title: 'Deals needing attention', count: '02', detail: 'McGregor dispo and Fairfield close remain priority.' },
]

const dispoTemplates = [
  {
    name: 'Buyer text blast',
    channel: 'SMS',
    status: 'Ready',
    body: `Hello {First Name},\n\nNew off market deal in Lakeland\n\nMcGregor St, Lakeland, FL 33815\n\n3 bed / 2 bath\nMobile home on owned land\n1,296 sqft\n.25 acre lot\nVacant at closing\nFull rehab\n\nAsking: $65,000\nARV: $220K\nClosing: 6/16\n\nPictures available upon request\n\n— JJ, OMV\n\nReply STOP to opt out`,
  },
  {
    name: 'Buyer call opener',
    channel: 'Call',
    status: 'Ready',
    body: `Hey, this is JJ with Off Market Vault. I wanted to see if you're buying in Lakeland right now. I've got an off market deal on McGregor St, 3/2 mobile home on owned land, 1,296 sqft, quarter acre lot, vacant at closing, full rehab, asking 65 with ARV around 220. Is that something you'd want details on?`,
  },
  {
    name: 'No-photo objection reply',
    channel: 'SMS',
    status: 'Ready',
    body: `I don't have the photo set back yet, but I wanted to give my buyers first crack at it before I blasted it wider.`,
  },
]

const dispoMilestones = [
  { title: 'Import buyer list into FUB', owner: 'JJ / Team', due: 'Done', status: 'Completed' },
  { title: 'Call Lakeland buyer list first pass', owner: 'JJ', due: 'Today', status: 'Active' },
  { title: 'Capture photos / video', owner: 'Field / Acq team', due: 'ASAP', status: 'Pending' },
  { title: 'Send buyer text blast', owner: 'JJ / Dispo', due: 'After photos or call traction', status: 'Pending' },
  { title: 'Hot buyer follow-up', owner: 'Dispo team', due: 'Same day', status: 'Pending' },
  { title: 'Closing deadline', owner: 'Transactions', due: '06/16/2026', status: 'Critical' },
]


const initialDeals = [
  {
    dealName: '2435 McGregor St',
    address: '2435 McGregor St, Lakeland, FL 33815',
    acceptedDate: '2026-05-15',
    closingDate: '2026-06-16',
    contractedPrice: '$43,000',
    askingPrice: '$65,000',
    arv: '$220K',
    beds: '3',
    baths: '2',
    sqft: '1,296',
    lotSize: '0.25 acres',
    propertyType: 'Mobile home on owned land',
    condition: 'Full rehab',
    occupancy: 'Vacant at closing',
    accessStatus: 'Waiting on seller access',
    photosStatus: 'Pending',
    videoStatus: 'Pending',
    buyerList: 'Lakeland cash buyers',
    walkthroughDate: '',
    offerDeadline: '',
    titleCompany: '',
    emdAmount: '$5,000 non-refundable',
    emdDueDate: '2026-05-18',
    dispoNotes: 'Call through imported Lakeland buyer list first while waiting for property access.',
  },
]

const emptyDealForm = {
  dealName: '',
  address: '',
  acceptedDate: '',
  closingDate: '',
  contractedPrice: '',
  askingPrice: '',
  arv: '',
  beds: '',
  baths: '',
  sqft: '',
  lotSize: '',
  propertyType: '',
  condition: '',
  occupancy: '',
  accessStatus: 'Waiting on seller access',
  photosStatus: 'Pending',
  videoStatus: 'Pending',
  buyerList: '',
  walkthroughDate: '',
  offerDeadline: '',
  titleCompany: '',
  emdAmount: '',
  emdDueDate: '',
  dispoNotes: '',
}

const dealStorageKey = 'omv-command-center-deals'

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
const appTabs = ['Overview', 'Approvals', 'Referrals', 'Bots', 'Deals']
const approvalStorageKey = 'omv-command-center-approval-items'
const referralStorageKey = 'omv-command-center-referral-items'
const authStorageKey = 'omv-command-center-unlocked'
const commandPasscode = 'OMV2026'

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
  const [dealItems, setDealItems] = useState(() => loadStoredItems(dealStorageKey, initialDeals))
  const [dealForm, setDealForm] = useState(emptyDealForm)
  const [isUnlocked, setIsUnlocked] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(authStorageKey) === 'true'
  })
  const [passcodeInput, setPasscodeInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('Overview')

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

  useEffect(() => {
    window.localStorage.setItem(dealStorageKey, JSON.stringify(dealItems))
  }, [dealItems])

  function handleUnlock(event) {
    event.preventDefault()

    if (passcodeInput === commandPasscode) {
      setIsUnlocked(true)
      setAuthError('')
      setPasscodeInput('')
      window.localStorage.setItem(authStorageKey, 'true')
      return
    }

    setAuthError('Incorrect passcode. Try again.')
  }

  function handleLock() {
    setIsUnlocked(false)
    window.localStorage.removeItem(authStorageKey)
  }

  function buildDealTimeline(deal) {
    return [
      { title: 'Contract accepted / dispo clock starts', due: deal.acceptedDate || 'TBD', owner: 'Dispo Manager', status: 'Completed' },
      { title: 'Open title + verify record complete', due: 'Day 0', owner: 'Dispo Assistant', status: 'Pending' },
      { title: 'Send EMD to title', due: deal.emdDueDate || '3 days after accepted date', owner: 'JJ / Transactions', status: 'Critical' },
      { title: 'Confirm access + request media', due: 'Day 0', owner: 'Acq / Seller', status: deal.photosStatus === 'Ready' ? 'Completed' : 'Active' },
      { title: 'Build buyer list + prep outreach', due: 'Day 1', owner: 'Dispo Assistant', status: 'Pending' },
      { title: 'Proactive A-tier buyer outreach', due: 'Day 2', owner: 'Dispo Manager', status: 'Pending' },
      { title: 'Walkthrough reminders + RSVP confirmation', due: 'Day 3', owner: 'Dispo Assistant', status: 'Pending' },
      { title: 'Walkthrough / offer window', due: deal.walkthroughDate || 'Day 4', owner: 'Dispo Manager', status: 'Pending' },
      { title: 'Offer deadline / award buyer', due: deal.offerDeadline || 'Day 5', owner: 'Dispo Manager', status: 'Critical' },
      { title: 'Closing deadline', due: deal.closingDate || 'TBD', owner: 'Transactions', status: 'Critical' },
    ]
  }

  function handleDealSubmit(event) {
    event.preventDefault()
    setDealItems((current) => [{ ...dealForm }, ...current])
    setDealForm(emptyDealForm)
    setActiveTab('Deals')
  }

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

  if (!isUnlocked) {
    return (
      <div className="lock-screen-shell">
        <div className="lock-screen-backdrop" />
        <div className="lock-screen-card">
          <div className="brand-mark-wrap">
            <img src="/assets/omv-mark-small.jpg" alt="OMV mark" className="brand-mark" />
          </div>
          <p className="eyebrow">Off Market Vault Secure Access</p>
          <h1 className="lock-title">OMV Command Center</h1>
          <p className="lock-copy">
            Private operations console for approvals, referrals, and internal workflow control.
          </p>
          <form className="lock-form" onSubmit={handleUnlock}>
            <label>
              Enter passcode
              <input
                type="password"
                value={passcodeInput}
                onChange={(event) => setPasscodeInput(event.target.value)}
                placeholder="Passcode"
              />
            </label>
            {authError ? <p className="auth-error">{authError}</p> : null}
            <button type="submit" className="primary-button unlock-button">Unlock Command Center</button>
          </form>
          <div className="lock-footer">
            <span>Current local passcode: <strong>{commandPasscode}</strong></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell premium-shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="ambient ambient-center" />

      <aside className="side-rail">
        <div className="side-brand">
          <img src="/assets/omv-mark-small.jpg" alt="OMV mark" className="side-brand-mark" />
          <div>
            <p className="eyebrow">Off Market Vault</p>
            <h2>Command Center</h2>
          </div>
        </div>

        <nav className="side-nav">
          {appTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="side-card">
          <p className="micro-label">Access</p>
          <h3>Private mode enabled</h3>
          <p>Data stays in this browser and the app is passcode-gated before access.</p>
          <button type="button" className="secondary-button side-lock-button" onClick={handleLock}>Lock app</button>
        </div>

        <div className="side-card brand-card">
          <img src="/assets/omv-logo.jpg" alt="Off Market Vault logo" className="full-brand-logo" />
          <p className="helper-copy">Internal system for OMV acquisitions, dispo, referrals, and approvals.</p>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar premium-topbar">
          <div>
            <p className="eyebrow">Private internal ops console</p>
            <h1>OMV Command Center</h1>
            <p className="subtitle">
              A premium control room for JJ’s wholesale machine, built to manage lead pressure,
              approvals, referrals, buyer flow, and deal execution from one place.
            </p>
          </div>
          <div className="topbar-actions">
            <div className="status-pill live">Secured local mode</div>
            <div className="status-pill draft">Workflow active</div>
          </div>
        </header>

        {activeTab === 'Overview' ? (
          <>
        <section className="hero-panel premium-hero-panel">
          <div className="mission-block mission-block-premium">
            <div className="mission-copy">
              <p className="micro-label">Command objective</p>
              <h2>Run OMV from a cleaner, sharper, more controlled operating system.</h2>
              <p>
                This is no longer just a mock dashboard. The room now protects access, keeps workflows
                persistent on this device, and gives JJ a branded place to manage internal operations.
              </p>
            </div>
            <div className="mission-grid">
              {headlineMetrics.map((metric) => (
                <div key={metric.label} className="metric-card hero-metric-card">
                  <span className="metric-value">{metric.value}</span>
                  <span className="metric-label">{metric.label}</span>
                  <span className="metric-hint">{metric.hint}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="alert-panel premium-alert-panel">
            <div className="section-head compact">
              <h3>Priority alerts</h3>
              <p>Immediate visibility into the work that matters most.</p>
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

        <section className="section-block two-col premium-summary-grid">
          <div className="panel">
            <div className="section-head compact">
              <h2>Command lanes</h2>
              <p>Clear ownership across the OMV machine.</p>
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
              <p>The pressure points that need attention fastest.</p>
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
            <h2>Bot roster</h2>
            <p>The internal operator stack behind the OMV machine.</p>
          </div>
          <div className="bot-grid premium-bot-grid">
            {bots.map((bot) => (
              <article key={bot.name} className="bot-card premium-bot-card">
                <div className="bot-header">
                  <div>
                    <p className="lane">{bot.lane}</p>
                    <h3>{bot.name}</h3>
                    <p className="role">{bot.role}</p>
                  </div>
                  <div className="bot-header-meta">
                    <span className={`chip ${statusClassName(bot.status)}`}>{bot.status}</span>
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

        </>
        ) : null}

        {activeTab === 'Approvals' ? (
        <section className="section-block workflow-section premium-workflow-section">
          <div className="section-head">
            <h2>Approval Queue</h2>
            <p>Modern internal review flow before anything leaves OMV.</p>
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
          <div className="workflow-grid premium-workflow-grid">
            <form className="panel workflow-form premium-form-panel" onSubmit={handleApprovalSubmit}>
              <div className="section-head compact">
                <h2>Create approval item</h2>
                <p>Add a message, campaign, or dispo draft that needs JJ review.</p>
              </div>
              <p className="helper-copy">Entries save automatically in this browser and stay after refresh.</p>
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

            <div className="panel workflow-list-panel premium-list-panel">
              <div className="section-head compact workflow-list-head">
                <div>
                  <h2>Approval workflow</h2>
                  <p>Filter, review, and move items through the pipeline.</p>
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
                {visibleApprovalItems.map((item) => {
                  const sourceIndex = approvalItems.findIndex((queueItem) => queueItem === item)
                  const statusIndex = approvalStatusOptions.indexOf(item.status)
                  return (
                    <article key={`${item.title}-${sourceIndex}`} className="approval-card premium-work-card">
                      <div className="approval-card-top">
                        <div>
                          <p className="lane">{item.channel}</p>
                          <h3>{item.title}</h3>
                        </div>
                        <div className="bot-header-meta">
                          <span className={`chip ${statusClassName(item.status)}`}>{item.status}</span>
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
        ) : null}

        {activeTab === 'Referrals' ? (
        <section className="section-block workflow-section premium-workflow-section">
          <div className="section-head">
            <h2>Agent Referral System</h2>
            <p>Branded intake and workflow tracking for agent referral business.</p>
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
          <div className="workflow-grid premium-workflow-grid">
            <form className="panel workflow-form premium-form-panel" onSubmit={handleReferralSubmit}>
              <div className="section-head compact">
                <h2>Add referral</h2>
                <p>Capture a new referral with enough detail to work it and pay it correctly.</p>
              </div>
              <p className="helper-copy">Entries save automatically in this browser and stay after refresh.</p>
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

            <div className="panel workflow-list-panel premium-list-panel">
              <div className="section-head compact workflow-list-head">
                <div>
                  <h2>Referral workflow</h2>
                  <p>Move referrals from intake to payout with visibility across the pipe.</p>
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
                    <article key={`${referral.agent}-${referral.property}-${sourceIndex}`} className="approval-card referral-card premium-work-card">
                      <div className="approval-card-top">
                        <div>
                          <p className="lane">{referral.brokerage}</p>
                          <h3>{referral.property}</h3>
                        </div>
                        <span className={`chip ${statusClassName(referral.status)}`}>{referral.status}</span>
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
        ) : null}

        {activeTab === 'Bots' ? (
          <section className="section-block">
            <div className="section-head">
              <h2>Bot roster</h2>
              <p>The internal operator stack behind the OMV machine.</p>
            </div>
            <div className="bot-grid premium-bot-grid">
              {bots.map((bot) => (
                <article key={bot.name} className="bot-card premium-bot-card">
                  <div className="bot-header">
                    <div>
                      <p className="lane">{bot.lane}</p>
                      <h3>{bot.name}</h3>
                      <p className="role">{bot.role}</p>
                    </div>
                    <div className="bot-header-meta">
                      <span className={`chip ${statusClassName(bot.status)}`}>{bot.status}</span>
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
        ) : null}

        {activeTab === 'Deals' ? (
          <>
            <section className="section-block workflow-section premium-workflow-section">
              <div className="section-head">
                <h2>New deal intake</h2>
                <p>Start every dispo deal the same way so JJ and the team always know what happens next.</p>
              </div>
              <div className="workflow-grid premium-workflow-grid">
                <form className="panel workflow-form premium-form-panel" onSubmit={handleDealSubmit}>
                  <div className="section-head compact">
                    <h2>Create new deal</h2>
                    <p>Enter the contract details once, then use the generated timeline to run dispo.</p>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Deal name</span>
                      <input placeholder="2435 McGregor St" value={dealForm.dealName} onChange={(event) => setDealForm({ ...dealForm, dealName: event.target.value })} required />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Property address</span>
                      <input placeholder="2435 McGregor St, Lakeland, FL 33815" value={dealForm.address} onChange={(event) => setDealForm({ ...dealForm, address: event.target.value })} required />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Accepted date</span>
                      <input type="date" value={dealForm.acceptedDate} onChange={(event) => setDealForm({ ...dealForm, acceptedDate: event.target.value })} required />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Closing date</span>
                      <input type="date" value={dealForm.closingDate} onChange={(event) => setDealForm({ ...dealForm, closingDate: event.target.value })} required />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Contracted price with seller</span>
                      <input value={dealForm.contractedPrice} onChange={(event) => setDealForm({ ...dealForm, contractedPrice: event.target.value })} required />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Asking price</span>
                      <input value={dealForm.askingPrice} onChange={(event) => setDealForm({ ...dealForm, askingPrice: event.target.value })} required />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">ARV</span>
                      <input value={dealForm.arv} onChange={(event) => setDealForm({ ...dealForm, arv: event.target.value })} required />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">EMD amount</span>
                      <input value={dealForm.emdAmount} onChange={(event) => setDealForm({ ...dealForm, emdAmount: event.target.value })} required />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Beds</span>
                      <input value={dealForm.beds} onChange={(event) => setDealForm({ ...dealForm, beds: event.target.value })} />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Baths</span>
                      <input value={dealForm.baths} onChange={(event) => setDealForm({ ...dealForm, baths: event.target.value })} />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Sqft</span>
                      <input value={dealForm.sqft} onChange={(event) => setDealForm({ ...dealForm, sqft: event.target.value })} />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Lot size</span>
                      <input value={dealForm.lotSize} onChange={(event) => setDealForm({ ...dealForm, lotSize: event.target.value })} />
                    </label>
                  </div>
                  <label className="field-shell">
                    <span className="field-label">Property type</span>
                    <input value={dealForm.propertyType} onChange={(event) => setDealForm({ ...dealForm, propertyType: event.target.value })} />
                  </label>
                  <label className="field-shell">
                    <span className="field-label">Condition</span>
                    <input value={dealForm.condition} onChange={(event) => setDealForm({ ...dealForm, condition: event.target.value })} />
                  </label>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Occupancy</span>
                      <input value={dealForm.occupancy} onChange={(event) => setDealForm({ ...dealForm, occupancy: event.target.value })} />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">EMD due date</span>
                      <input type="date" value={dealForm.emdDueDate} onChange={(event) => setDealForm({ ...dealForm, emdDueDate: event.target.value })} />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Access status</span>
                      <input value={dealForm.accessStatus} onChange={(event) => setDealForm({ ...dealForm, accessStatus: event.target.value })} />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Buyer list</span>
                      <input value={dealForm.buyerList} onChange={(event) => setDealForm({ ...dealForm, buyerList: event.target.value })} />
                    </label>
                  </div>
                  <div className="form-row two-up">
                    <label className="field-shell">
                      <span className="field-label">Walkthrough date</span>
                      <input type="date" value={dealForm.walkthroughDate} onChange={(event) => setDealForm({ ...dealForm, walkthroughDate: event.target.value })} />
                    </label>
                    <label className="field-shell">
                      <span className="field-label">Offer deadline</span>
                      <input type="date" value={dealForm.offerDeadline} onChange={(event) => setDealForm({ ...dealForm, offerDeadline: event.target.value })} />
                    </label>
                  </div>
                  <label className="field-shell">
                    <span className="field-label">Title company</span>
                    <input value={dealForm.titleCompany} onChange={(event) => setDealForm({ ...dealForm, titleCompany: event.target.value })} />
                  </label>
                  <label className="field-shell">
                    <span className="field-label">Dispo notes</span>
                    <textarea value={dealForm.dispoNotes} onChange={(event) => setDealForm({ ...dealForm, dispoNotes: event.target.value })} rows="4" />
                  </label>
                  <button type="submit" className="primary-button">Create deal</button>
                </form>

                <div className="panel workflow-list-panel premium-list-panel">
                  <div className="section-head compact">
                    <h2>Active deals</h2>
                    <p>Every contract should create a visible deal card and generated dispo timeline.</p>
                  </div>
                  <div className="approval-queue-list referral-grid">
                    {dealItems.map((deal) => (
                      <article key={`${deal.dealName}-${deal.address}`} className="approval-card premium-work-card">
                        <div className="approval-card-top">
                          <div>
                            <p className="lane">{deal.propertyType || 'Deal'}</p>
                            <h3>{deal.dealName}</h3>
                            <p className="helper-copy">{deal.address}</p>
                          </div>
                          <span className={`chip ${statusClassName(deal.photosStatus)}`}>{deal.photosStatus} media</span>
                        </div>
                        <div className="approval-meta-grid referral-meta-grid">
                          <div><span className="micro-label">Accepted</span><p>{deal.acceptedDate}</p></div>
                          <div><span className="micro-label">Closing</span><p>{deal.closingDate}</p></div>
                          <div><span className="micro-label">Contract</span><p>{deal.contractedPrice}</p></div>
                          <div><span className="micro-label">Ask</span><p>{deal.askingPrice}</p></div>
                          <div><span className="micro-label">ARV</span><p>{deal.arv}</p></div>
                          <div><span className="micro-label">EMD</span><p>{deal.emdAmount}</p></div>
                          <div><span className="micro-label">EMD due</span><p>{deal.emdDueDate || '3 days after accepted'}</p></div>
                          <div><span className="micro-label">Access</span><p>{deal.accessStatus}</p></div>
                          <div><span className="micro-label">Buyer list</span><p>{deal.buyerList}</p></div>
                        </div>
                        <p className="helper-copy">{deal.dispoNotes}</p>
                        <div className="timeline-list deal-timeline-list">
                          {buildDealTimeline(deal).map((item) => (
                            <div key={`${deal.dealName}-${item.title}`} className="timeline-item">
                              <div className="timeline-dot" />
                              <div className="timeline-copy">
                                <div className="approval-card-top timeline-top">
                                  <div>
                                    <h3>{item.title}</h3>
                                    <p className="helper-copy">Owner: {item.owner}</p>
                                  </div>
                                  <span className={`chip ${statusClassName(item.status)}`}>{item.status}</span>
                                </div>
                                <p className="helper-copy">Due: {item.due}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="section-block workflow-section premium-workflow-section">
              <div className="section-head">
                <h2>Dispo templates</h2>
                <p>Reusable outreach templates for JJ and future team members.</p>
              </div>
              <div className="approval-queue-list referral-grid">
                {dispoTemplates.map((template) => (
                  <article key={template.name} className="approval-card premium-work-card">
                    <div className="approval-card-top">
                      <div>
                        <p className="lane">{template.channel}</p>
                        <h3>{template.name}</h3>
                      </div>
                      <span className={`chip ${statusClassName(template.status)}`}>{template.status}</span>
                    </div>
                    <p className="template-body">{template.body}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="section-block two-col premium-footer-grid">
              <div className="panel">
                <div className="section-head compact">
                  <h2>Dispo calendar and reminders</h2>
                  <p>Major due dates and shared team checkpoints for this deal flow.</p>
                </div>
                <div className="timeline-list">
                  {dispoMilestones.map((item) => (
                    <div key={item.title} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-copy">
                        <div className="approval-card-top timeline-top">
                          <div>
                            <h3>{item.title}</h3>
                            <p className="helper-copy">Owner: {item.owner}</p>
                          </div>
                          <span className={`chip ${statusClassName(item.status)}`}>{item.status}</span>
                        </div>
                        <p className="helper-copy">Due: {item.due}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel build-panel">
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
            </section>
          </>
        ) : null}

        {activeTab !== 'Deals' ? (
        <section className="section-block two-col premium-footer-grid">
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
              <p>What upgrades this from local command center to deeper OMV infrastructure.</p>
            </div>
            <ol className="build-list">
              <li>Connect live FUB and Zap status into the dashboard.</li>
              <li>Let JJ change the passcode in-app.</li>
              <li>Add searchable notes and timeline history to approvals and referrals.</li>
              <li>Add a seller follow-up board for Mason and Bolt.</li>
              <li>Add dispo and buyer watchlists for Harbor and Scout.</li>
            </ol>
          </div>
        </section>
        ) : null}
      </main>
    </div>
  )
}

export default App
