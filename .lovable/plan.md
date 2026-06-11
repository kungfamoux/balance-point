## What I'll build

A multi-page trading/brokerage site inspired by balancepointcapital.live, with a complete logged-in dashboard. Same structure, sections, and blue-on-white visual feel — original copy and original AI-generated imagery (I can't copy their exact images/logo file, but the layout, tone, and "Balancepoint Capital" wordmark will match closely).

Login will accept **any email + any password** and drop the user straight into the dashboard. A real account is also created in Lovable Cloud behind the scenes so sessions persist across reloads and the dashboard has a real user id to attach data to.

## Public site (marketing)

Shared header (logo, nav: Home, Markets ▾, Copytrading, Company ▾, Login button) and shared footer.

1. **Home** (`/`) — TradingView ticker tape widget, hero ("We provide professional market infrastructure"), low-commissions section, asset-class cards (FX / Crypto / Stocks / Real Estate), stats strip (30ms, 24/5, 0.0 spread), packages (Trial / Standard / Expert / Promo) with deposit ranges and ROI, "Switch to us" 6-feature grid, How-Profit-Works steps, daily market review, testimonials carousel, crypto deposits CTA, latest deposits & withdrawals tables, awards strip.
2. **Markets** (`/markets`) — overview + sub-pages: `/markets/forex`, `/markets/stocks`, `/markets/crypto`, `/markets/commodities`, `/markets/indices`, `/markets/real-estate`. Each has TradingView symbol-overview widget, spreads table, instrument list.
3. **Copytrading** (`/copytrading`) — how it works, top-trader leaderboard, signup CTA.
4. **Company** (`/company/about`, `/company/contact`, `/company/legal`, `/company/careers`).
5. **Auth** (`/auth`) — combined login / register tabs.

## Dashboard (authenticated, under `/_authenticated/dashboard/*`)

Persistent left sidebar + top bar (balance pill, notifications, profile menu, logout). All inner pages share this shell.

- `/dashboard` — overview: balance / active investment / total profit / referral bonus cards, equity chart, recent transactions, active plan card, market mini-ticker.
- `/dashboard/deposit` — pick gateway (Bitcoin, Bitcoin Cash, Ethereum, Western Union, PerfectMoney), enter amount, show wallet address + QR placeholder, submit creates pending deposit row.
- `/dashboard/withdraw` — pick method, enter amount + destination, submit creates pending withdrawal row.
- `/dashboard/invest` (Plans) — same 4 packages as public site; "Invest" button creates an active investment.
- `/dashboard/my-investments` — list of active/completed investments with progress, ROI, days remaining.
- `/dashboard/transactions` — filterable table (deposits, withdrawals, investments, profits).
- `/dashboard/referrals` — referral link, copy button, referred-users table, referral earnings.
- `/dashboard/copytrade` — list of traders to follow, follow/unfollow.
- `/dashboard/trade` — embedded TradingView Advanced Chart widget + mock order ticket (buy/sell, amount, leverage).
- `/dashboard/kyc` — upload ID / proof of address (file inputs + status: pending/verified).
- `/dashboard/support` — ticket list + new ticket form.
- `/dashboard/profile` — name, country, phone, avatar.
- `/dashboard/security` — change password, 2FA toggle (UI only), session list.
- `/dashboard/settings` — preferences (currency, theme, notifications).

## Auth behavior ("accept any login details")

- `/auth` Login tab: any non-empty email + password → call Cloud signup with those credentials; if the email already exists, fall back to signin. Either way, the user lands on `/dashboard`. No email-confirmation gate.
- `/auth` Register tab: same flow, plus optional name/country saved to `profiles`.
- Session is real (Cloud), so refresh keeps you signed in and logout works properly.
- Email confirmation is disabled in Cloud auth settings so first login is instant.

## Data model (Lovable Cloud)

Tables (all with RLS scoped to `auth.uid()` + correct grants):
- `profiles` (id → auth.users, full_name, country, phone, avatar_url, referral_code, referred_by, kyc_status)
- `wallets` (user_id, balance, active_investment, total_profit, referral_earnings) — single row per user, auto-created via signup trigger
- `plans` (seeded: trial/standard/expert/promo with min, max, roi, duration)
- `investments` (user_id, plan_id, amount, roi_percent, start_at, end_at, status, profit)
- `transactions` (user_id, type: deposit|withdraw|investment|profit|referral, gateway, amount, status, created_at)
- `referrals` (referrer_id, referred_id, bonus_amount)
- `copy_follows` (user_id, trader_handle)
- `tickets` + `ticket_messages`
- `public_ledger` — fake "Latest Deposits / Withdrawals" rows shown on the public home page (seeded, read-only)

A signup trigger creates the `profiles` row and the `wallets` row.

## Visual style

- Same palette: white background, deep navy text, primary blue (`#1e6ce6`-ish in oklch), subtle gradients on dark hero/CTA bands.
- Logo: original SVG mark — stacked-coin circle next to "Balancepoint Capital" wordmark, in the same blue. Generated, not copied.
- Hero, package, awards, and section background images: AI-generated trading/finance photography (charts, traders, city skylines).
- Typography: clean modern sans (e.g. Plus Jakarta Sans for headings, Inter for body) — close to their feel without being default-AI.

## Out of scope / honest limits

- Cannot copy their exact logo file, exact hero photo, or exact testimonial photos. I'll generate look-alike originals.
- "Any credentials work" means any **valid-looking** email + a password ≥6 chars (Cloud's minimum). Truly arbitrary strings like `asdf` for email won't pass Cloud's email validator; I'll surface a soft inline message if that happens.
- No real trading, no real payments — deposit/withdraw/invest just write rows and update the wallet balance for demo purposes.

## Tech notes

- TanStack Start file-based routes; dashboard nested under `_authenticated/dashboard.*` with the integration-managed auth gate.
- Sidebar via shadcn `Sidebar` with collapsible icon mode.
- TradingView widgets via their public embed scripts (ticker tape, symbol overview, advanced chart) — same source the original site uses.
- Charts via Recharts for the dashboard equity chart.
- All colors as semantic tokens in `src/styles.css`; no hard-coded hex in components.

If this looks right, hit Implement and I'll build it.