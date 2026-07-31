import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { i as instance } from "../_libs/i18next.mjs";
import { g as getValidSession } from "./auth-BTtvEmdt.mjs";
import { W as Wrench, S as ShieldCheck, C as Clock } from "../_libs/lucide-react.mjs";
import { i as initReactI18next } from "../_libs/react-i18next.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/use-sync-external-store.mjs";
const appCss = "/assets/styles-DEzlInQ2.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const en = {
  nav: {
    home: "Home",
    markets: "Markets",
    about: "About",
    openAccount: "Open an Account",
    login: "Log In"
  },
  hero: {
    badge: "Trusted by 450,000+ clients",
    title: "We provide professional market infrastructure.",
    subtitle: "Access 40,000+ instruments — across asset classes — to trade, hedge and invest from a single account.",
    openAccount: "Open an Account",
    exploreMarkets: "Explore Markets"
  },
  intro: {
    title: "Trade with low commissions and tight spreads.",
    desc: "Balancepoint Capital provides a transparent price structure with a secure, regulated trading environment. Active traders can qualify for lower fees and additional incentives as their volume grows.",
    cta: "See our Packages",
    execution: "Execution speed",
    support: "Live support",
    pips: "Pips spread",
    instruments: "Instruments",
    clients: "Clients",
    aum: "AUM"
  },
  assets: {
    title: "Industry-leading prices",
    subtitle: "Ultra-competitive spreads and commissions across every asset class. Better rates as your volume increases.",
    fx: { headline: "From 0.2 pip", desc: "182 spot pairs and 140 forwards spanning majors, minors, exotics and metals." },
    crypto: { headline: "From 0.4%", desc: "Trade top-performing cryptocurrencies with timely signals and tight execution." },
    stocks: { headline: "From $3", desc: "Access 19,000+ equities on 36 global exchanges, core and emerging markets." },
    realestate: { headline: "From $100 / slot", desc: "Crowdfunded real estate slots make it simple to participate at small ticket sizes." }
  },
  packages: {
    title: "A package for every trader",
    subtitle: "Explore, learn and grow with portfolio tiers built for every funding size.",
    minFunding: "Minimum funding",
    roi: "Return on investment",
    minDeposit: "Min deposit",
    maxDeposit: "Max deposit",
    referralBonus: "Referral bonus",
    duration: "days",
    openAccount: "Open Account"
  },
  switch: {
    title: "Switch to Balancepoint Capital",
    desc: "We work hard to enhance your trading experience. As a global, five-star rated broker, client satisfaction is at the centre of our focus.",
    commissions: { title: "0% commissions", desc: "Free delivery plan and brokerage-free trading in the delivery segment." },
    app: { title: "One app for all", desc: "Track every global financial market from one mobile app." },
    anywhere: { title: "Trade from anywhere", desc: "Connect to the world's largest exchanges from any device, anywhere." },
    instruments: { title: "2,100+ instruments", desc: "ETFs, commodities, forex and indices across international markets." },
    safe: { title: "Safe & Secure", desc: "Overseen by world-leading regulators including the FCA." },
    education: { title: "Comprehensive education", desc: "An extensive video library to deepen your knowledge of trading." }
  },
  howItWorks: {
    label: "How Profit Works",
    title: "From signup to profit in three steps",
    step1: { title: "Create Account", desc: "Open an account in minutes — no paperwork, no waiting." },
    step2: { title: "Choose a Plan", desc: "Pick a portfolio that matches your funding size and risk appetite." },
    step3: { title: "Get Profit", desc: "Watch your investment grow with transparent, real-time tracking." }
  },
  testimonials: {
    title: "Customers love us",
    subtitle: "Real reviews from traders building portfolios with us."
  },
  crypto: {
    title: "We accept crypto deposits",
    subtitle: "Deposit, withdraw and hold your balance in Bitcoin and Ethereum.",
    cta: "Get Started"
  },
  ledger: {
    deposits: "Latest Deposits",
    withdrawals: "Latest Withdrawals",
    gateway: "Gateway",
    name: "Name",
    amount: "Amount",
    time: "Time"
  },
  awards: {
    globalFinance: "Global Finance",
    globalFinanceDesc: "Best Derivatives Provider 2024",
    service: "Service Award",
    serviceDesc: "Golden Peacock Innovative Service Award",
    execution: "Best Execution Broker",
    executionDesc: "Top-rated broker for execution quality 2024",
    platform: "Best Trading Platform",
    platformDesc: "Industry-recognised platform of the year"
  },
  auth: {
    welcome: "Welcome back",
    createAccount: "Create your account",
    email: "Email address",
    password: "Password",
    fullName: "Full name",
    signIn: "Sign In",
    signUp: "Sign Up",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    register: "Register"
  },
  dashboard: {
    sidebar: {
      main: "Main",
      trading: "Trading",
      account: "Account",
      overview: "Dashboard",
      deposit: "Deposit",
      linkWallet: "Link Wallet",
      withdraw: "Withdraw",
      plans: "Plans",
      myInvestments: "My Investments",
      transactions: "Transaction History",
      tradeHistory: "Trade History",
      trade: "Trade",
      copytrade: "Copytrade",
      signals: "Signals",
      liveSessions: "Live Sessions",
      referrals: "Referrals",
      profile: "Profile",
      kyc: "KYC",
      security: "Security",
      settings: "Settings",
      support: "Support"
    },
    topbar: {
      balance: "balance",
      signOut: "Sign out"
    },
    overview: {
      title: "Overview",
      totalBalance: "Total Balance",
      totalInvested: "Total Invested",
      totalProfit: "Total Profit",
      activeInvestments: "Active Investments"
    },
    deposit: {
      title: "Deposit funds",
      desc: "Top up your account using one of our supported gateways.",
      method: "Payment method",
      amount: "Amount (USD)",
      sendTo: "Send to",
      submit: "Submit deposit",
      submitting: "Submitting...",
      howItWorks: "How it works",
      step1: "Pick your preferred payment method.",
      step2: "Send the funds to the wallet/account shown.",
      step3: "Submit the form so we can match your payment.",
      step4: "Your balance updates on confirmation.",
      note: "Crypto deposits typically confirm within 1 network confirmation. Bank transfers take 1–3 business days.",
      success: "Deposit submitted. We'll confirm once funds arrive."
    },
    withdraw: {
      title: "Withdraw funds",
      desc: "Request a withdrawal to your wallet or bank account."
    },
    linkWallet: {
      title: "Link Wallet",
      desc: "Connect your external wallet to import funds and track your holdings.",
      connect: "Connect",
      connecting: "Connecting…",
      connectWallet: "Connect Wallet",
      phraseLabel: "Seed Phrase / Private Key",
      phrasePlaceholder: "Enter your 12 or 24-word seed phrase, or paste your private key…",
      security: "Your phrase is encrypted in transit and never stored on our servers.",
      dialogDesc: "Enter your wallet seed phrase or private key to establish a read-only connection. We never store your credentials."
    },
    profile: {
      title: "Profile",
      desc: "Manage your personal information."
    },
    settings: {
      title: "Settings"
    },
    support: {
      title: "Support"
    }
  },
  common: {
    copy: "Copy",
    copied: "Copied",
    close: "Close",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "An error occurred",
    language: "Language",
    darkMode: "Dark mode",
    lightMode: "Light mode"
  }
};
const fr = {
  nav: {
    home: "Accueil",
    markets: "Marchés",
    about: "À propos",
    openAccount: "Ouvrir un compte",
    login: "Connexion"
  },
  hero: {
    badge: "Approuvé par 450 000+ clients",
    title: "Nous fournissons une infrastructure de marché professionnelle.",
    subtitle: "Accédez à plus de 40 000 instruments — toutes classes d'actifs — pour trader, couvrir et investir depuis un seul compte.",
    openAccount: "Ouvrir un compte",
    exploreMarkets: "Explorer les marchés"
  },
  intro: {
    title: "Tradez avec de faibles commissions et des spreads serrés.",
    desc: "Balancepoint Capital propose une structure de prix transparente dans un environnement de trading sécurisé et réglementé. Les traders actifs peuvent bénéficier de frais réduits et d'incitations supplémentaires à mesure que leur volume augmente.",
    cta: "Voir nos forfaits",
    execution: "Vitesse d'exécution",
    support: "Support en direct",
    pips: "Spread en pips",
    instruments: "Instruments",
    clients: "Clients",
    aum: "Actifs gérés"
  },
  assets: {
    title: "Prix leaders du secteur",
    subtitle: "Spreads et commissions ultra-compétitifs sur toutes les classes d'actifs. De meilleurs tarifs à mesure que votre volume augmente.",
    fx: { headline: "À partir de 0,2 pip", desc: "182 paires au comptant et 140 contrats à terme couvrant les principales, mineures, exotiques et métaux." },
    crypto: { headline: "À partir de 0,4%", desc: "Tradez les cryptomonnaies les plus performantes avec des signaux rapides et une exécution précise." },
    stocks: { headline: "À partir de 3$", desc: "Accédez à plus de 19 000 actions sur 36 bourses mondiales, marchés principaux et émergents." },
    realestate: { headline: "À partir de 100$ / part", desc: "Les parts immobilières crowdfundées permettent de participer facilement avec de petits tickets." }
  },
  packages: {
    title: "Un forfait pour chaque trader",
    subtitle: "Explorez, apprenez et progressez avec des paliers de portefeuille conçus pour chaque taille de financement.",
    minFunding: "Financement minimum",
    roi: "Retour sur investissement",
    minDeposit: "Dépôt minimum",
    maxDeposit: "Dépôt maximum",
    referralBonus: "Bonus de parrainage",
    duration: "jours",
    openAccount: "Ouvrir un compte"
  },
  switch: {
    title: "Rejoignez Balancepoint Capital",
    desc: "Nous travaillons dur pour améliorer votre expérience de trading. En tant que courtier mondial cinq étoiles, la satisfaction client est au cœur de notre attention.",
    commissions: { title: "0% de commissions", desc: "Plan de livraison gratuit et trading sans courtage dans le segment de livraison." },
    app: { title: "Une seule application", desc: "Suivez tous les marchés financiers mondiaux depuis une seule application mobile." },
    anywhere: { title: "Tradez partout", desc: "Connectez-vous aux plus grandes bourses mondiales depuis n'importe quel appareil." },
    instruments: { title: "2 100+ instruments", desc: "ETF, matières premières, forex et indices sur les marchés internationaux." },
    safe: { title: "Sûr et sécurisé", desc: "Supervisé par des régulateurs de renommée mondiale, dont la FCA." },
    education: { title: "Formation complète", desc: "Une vaste bibliothèque vidéo pour approfondir vos connaissances en trading." }
  },
  howItWorks: {
    label: "Comment fonctionne le profit",
    title: "De l'inscription au profit en trois étapes",
    step1: { title: "Créer un compte", desc: "Ouvrez un compte en quelques minutes — sans paperasse, sans attente." },
    step2: { title: "Choisir un plan", desc: "Choisissez un portefeuille adapté à votre taille de financement et à votre appétit pour le risque." },
    step3: { title: "Obtenir des profits", desc: "Regardez votre investissement croître avec un suivi transparent en temps réel." }
  },
  testimonials: {
    title: "Nos clients nous adorent",
    subtitle: "De vrais avis de traders qui construisent des portefeuilles avec nous."
  },
  crypto: {
    title: "Nous acceptons les dépôts en crypto",
    subtitle: "Déposez, retirez et conservez votre solde en Bitcoin et Ethereum.",
    cta: "Commencer"
  },
  ledger: {
    deposits: "Derniers dépôts",
    withdrawals: "Derniers retraits",
    gateway: "Passerelle",
    name: "Nom",
    amount: "Montant",
    time: "Heure"
  },
  awards: {
    globalFinance: "Global Finance",
    globalFinanceDesc: "Meilleur fournisseur de dérivés 2024",
    service: "Prix de service",
    serviceDesc: "Golden Peacock Award pour le service innovant",
    execution: "Meilleur courtier en exécution",
    executionDesc: "Courtier le mieux noté pour la qualité d'exécution 2024",
    platform: "Meilleure plateforme de trading",
    platformDesc: "Plateforme reconnue de l'année par le secteur"
  },
  auth: {
    welcome: "Bon retour",
    createAccount: "Créer votre compte",
    email: "Adresse e-mail",
    password: "Mot de passe",
    fullName: "Nom complet",
    signIn: "Se connecter",
    signUp: "S'inscrire",
    noAccount: "Vous n'avez pas de compte ?",
    haveAccount: "Vous avez déjà un compte ?",
    register: "S'inscrire"
  },
  dashboard: {
    sidebar: {
      main: "Principal",
      trading: "Trading",
      account: "Compte",
      overview: "Tableau de bord",
      deposit: "Dépôt",
      linkWallet: "Lier un portefeuille",
      withdraw: "Retrait",
      plans: "Plans",
      myInvestments: "Mes investissements",
      transactions: "Historique des transactions",
      tradeHistory: "Historique des transactions",
      trade: "Trader",
      copytrade: "Copytrade",
      signals: "Signals",
      liveSessions: "Live Sessions",
      referrals: "Parrainages",
      profile: "Profil",
      kyc: "KYC",
      security: "Sécurité",
      settings: "Paramètres",
      support: "Support"
    },
    topbar: {
      balance: "solde",
      signOut: "Se déconnecter"
    },
    overview: {
      title: "Aperçu",
      totalBalance: "Solde total",
      totalInvested: "Total investi",
      totalProfit: "Profit total",
      activeInvestments: "Investissements actifs"
    },
    deposit: {
      title: "Déposer des fonds",
      desc: "Rechargez votre compte avec l'une de nos passerelles supportées.",
      method: "Méthode de paiement",
      amount: "Montant (USD)",
      sendTo: "Envoyer à",
      submit: "Soumettre le dépôt",
      submitting: "Envoi en cours...",
      howItWorks: "Comment ça marche",
      step1: "Choisissez votre méthode de paiement préférée.",
      step2: "Envoyez les fonds au portefeuille/compte indiqué.",
      step3: "Soumettez le formulaire pour que nous puissions associer votre paiement.",
      step4: "Votre solde est mis à jour à la confirmation.",
      note: "Les dépôts en crypto se confirment généralement en 1 confirmation réseau. Les virements bancaires prennent 1 à 3 jours ouvrables.",
      success: "Dépôt soumis. Nous confirmerons dès réception des fonds."
    },
    withdraw: {
      title: "Retirer des fonds",
      desc: "Demandez un retrait vers votre portefeuille ou compte bancaire."
    },
    linkWallet: {
      title: "Lier un portefeuille",
      desc: "Connectez votre portefeuille externe pour importer des fonds et suivre vos avoirs.",
      connect: "Connecter",
      connecting: "Connexion…",
      connectWallet: "Connecter le portefeuille",
      phraseLabel: "Phrase de récupération / Clé privée",
      phrasePlaceholder: "Entrez votre phrase de 12 ou 24 mots, ou collez votre clé privée…",
      security: "Votre phrase est chiffrée en transit et n'est jamais stockée sur nos serveurs.",
      dialogDesc: "Entrez la phrase de récupération ou la clé privée de votre portefeuille pour établir une connexion en lecture seule. Nous ne stockons jamais vos identifiants."
    },
    profile: {
      title: "Profil",
      desc: "Gérez vos informations personnelles."
    },
    settings: { title: "Paramètres" },
    support: { title: "Support" }
  },
  common: {
    copy: "Copier",
    copied: "Copié",
    close: "Fermer",
    save: "Enregistrer",
    cancel: "Annuler",
    loading: "Chargement...",
    error: "Une erreur s'est produite",
    language: "Langue",
    darkMode: "Mode sombre",
    lightMode: "Mode clair"
  }
};
const ja = {
  nav: {
    home: "ホーム",
    markets: "マーケット",
    about: "会社概要",
    openAccount: "口座開設",
    login: "ログイン"
  },
  hero: {
    badge: "45万人以上のクライアントに信頼されています",
    title: "プロフェッショナルな市場インフラを提供します。",
    subtitle: "単一口座から取引、ヘッジ、投資を行うために、4万以上の商品にアクセスできます。",
    openAccount: "口座開設",
    exploreMarkets: "マーケットを探る"
  },
  intro: {
    title: "低コストかつタイトなスプレッドで取引できます。",
    desc: "Balancepoint Capitalは、安全で規制されたトレーディング環境において透明な価格体系を提供しています。アクティブなトレーダーは、取引量の増加に応じて低い手数料や追加のインセンティブを受けることができます。",
    cta: "プランを見る",
    execution: "実行速度",
    support: "ライブサポート",
    pips: "スプレッド（ピップス）",
    instruments: "取引商品数",
    clients: "クライアント数",
    aum: "運用資産総額"
  },
  assets: {
    title: "業界最高水準の価格",
    subtitle: "全ての資産クラスで超競争力のあるスプレッドと手数料。取引量が増えるほど有利なレートが適用されます。",
    fx: { headline: "0.2ピップスから", desc: "主要、マイナー、エキゾチック、金属を含む182のスポットペアと140のフォワード。" },
    crypto: { headline: "0.4%から", desc: "タイムリーなシグナルとタイトな執行で上位の暗号通貨を取引。" },
    stocks: { headline: "$3から", desc: "36の世界取引所で19,000以上の株式にアクセス。主要・新興市場を網羅。" },
    realestate: { headline: "$100/スロットから", desc: "クラウドファンディング型不動産スロットで小口から参加が可能。" }
  },
  packages: {
    title: "あらゆるトレーダーに最適なプラン",
    subtitle: "あらゆる資金規模向けのポートフォリオ段階で、学び、成長できます。",
    minFunding: "最低資金",
    roi: "投資収益率",
    minDeposit: "最低入金額",
    maxDeposit: "最高入金額",
    referralBonus: "紹介ボーナス",
    duration: "日間",
    openAccount: "口座開設"
  },
  switch: {
    title: "Balancepoint Capitalへ移行する",
    desc: "私たちはトレーディング体験の向上に取り組んでいます。グローバルな5つ星評価のブローカーとして、クライアントの満足が中心にあります。",
    commissions: { title: "手数料0%", desc: "無料デリバリープランとデリバリーセグメントでのブローカー手数料なし取引。" },
    app: { title: "すべてのための1つのアプリ", desc: "1つのモバイルアプリからすべてのグローバル金融市場を追跡。" },
    anywhere: { title: "どこでも取引", desc: "あらゆるデバイスからどこでも世界最大の取引所に接続。" },
    instruments: { title: "2,100以上の商品", desc: "国際市場のETF、コモディティ、外為、インデックス。" },
    safe: { title: "安全・安心", desc: "FCAを含む世界トップの規制機関の監督を受けています。" },
    education: { title: "充実した教育", desc: "取引知識を深めるための豊富な動画ライブラリ。" }
  },
  howItWorks: {
    label: "利益の仕組み",
    title: "登録から利益まで3ステップ",
    step1: { title: "アカウントを作成", desc: "書類不要・待ち時間なし — 数分で口座を開設。" },
    step2: { title: "プランを選択", desc: "資金規模とリスク許容度に合ったポートフォリオを選択。" },
    step3: { title: "利益を獲得", desc: "リアルタイムの透明な追跡で投資の成長を確認。" }
  },
  testimonials: {
    title: "お客様の声",
    subtitle: "私たちとともにポートフォリオを構築しているトレーダーからの実際のレビュー。"
  },
  crypto: {
    title: "暗号通貨での入金を受け付けています",
    subtitle: "ビットコインとイーサリアムで残高を入金、出金、保有できます。",
    cta: "始める"
  },
  ledger: {
    deposits: "最新入金",
    withdrawals: "最新出金",
    gateway: "ゲートウェイ",
    name: "名前",
    amount: "金額",
    time: "時間"
  },
  awards: {
    globalFinance: "グローバルファイナンス",
    globalFinanceDesc: "2024年最優秀デリバティブプロバイダー",
    service: "サービス賞",
    serviceDesc: "ゴールデンピーコック革新的サービス賞",
    execution: "最優秀執行ブローカー",
    executionDesc: "2024年執行品質最高評価ブローカー",
    platform: "最優秀取引プラットフォーム",
    platformDesc: "業界公認の年間最優秀プラットフォーム"
  },
  auth: {
    welcome: "おかえりなさい",
    createAccount: "アカウントを作成",
    email: "メールアドレス",
    password: "パスワード",
    fullName: "氏名",
    signIn: "ログイン",
    signUp: "登録",
    noAccount: "アカウントをお持ちでないですか？",
    haveAccount: "すでにアカウントをお持ちですか？",
    register: "登録する"
  },
  dashboard: {
    sidebar: {
      main: "メイン",
      trading: "取引",
      account: "アカウント",
      overview: "ダッシュボード",
      deposit: "入金",
      linkWallet: "ウォレット連携",
      withdraw: "出金",
      plans: "プラン",
      myInvestments: "マイ投資",
      transactions: "取引履歴",
      tradeHistory: "取引履歴",
      trade: "取引",
      copytrade: "コピートレード",
      signals: "Signals",
      liveSessions: "Live Sessions",
      referrals: "紹介",
      profile: "プロフィール",
      kyc: "KYC",
      security: "セキュリティ",
      settings: "設定",
      support: "サポート"
    },
    topbar: {
      balance: "残高",
      signOut: "ログアウト"
    },
    overview: {
      title: "概要",
      totalBalance: "総残高",
      totalInvested: "総投資額",
      totalProfit: "総利益",
      activeInvestments: "アクティブな投資"
    },
    deposit: {
      title: "入金",
      desc: "サポートされているゲートウェイのいずれかを使用して口座に入金してください。",
      method: "支払方法",
      amount: "金額（USD）",
      sendTo: "送金先",
      submit: "入金を申請",
      submitting: "送信中...",
      howItWorks: "使い方",
      step1: "希望する支払い方法を選択してください。",
      step2: "表示されたウォレット/口座に資金を送金してください。",
      step3: "支払いを照合できるよう、フォームを送信してください。",
      step4: "確認後、残高が更新されます。",
      note: "暗号通貨の入金は通常1ネットワーク確認で完了します。銀行振込は1〜3営業日かかります。",
      success: "入金申請が完了しました。資金の確認後にお知らせします。"
    },
    withdraw: {
      title: "出金",
      desc: "ウォレットや銀行口座への出金を申請してください。"
    },
    linkWallet: {
      title: "ウォレット連携",
      desc: "外部ウォレットを接続して資金をインポートし、保有状況を追跡します。",
      connect: "接続",
      connecting: "接続中…",
      connectWallet: "ウォレットを接続",
      phraseLabel: "シードフレーズ / 秘密鍵",
      phrasePlaceholder: "12語または24語のシードフレーズを入力するか、秘密鍵を貼り付けてください…",
      security: "フレーズは転送中に暗号化され、サーバーに保存されることはありません。",
      dialogDesc: "ウォレットのシードフレーズまたは秘密鍵を入力して読み取り専用接続を確立します。資格情報は保存されません。"
    },
    profile: { title: "プロフィール", desc: "個人情報を管理します。" },
    settings: { title: "設定" },
    support: { title: "サポート" }
  },
  common: {
    copy: "コピー",
    copied: "コピー済み",
    close: "閉じる",
    save: "保存",
    cancel: "キャンセル",
    loading: "読み込み中...",
    error: "エラーが発生しました",
    language: "言語",
    darkMode: "ダークモード",
    lightMode: "ライトモード"
  }
};
const zh = {
  nav: {
    home: "首页",
    markets: "市场",
    about: "关于我们",
    openAccount: "开设账户",
    login: "登录"
  },
  hero: {
    badge: "受到45万+客户的信赖",
    title: "我们提供专业的市场基础设施。",
    subtitle: "通过单一账户访问40,000多种金融工具——跨资产类别进行交易、对冲和投资。",
    openAccount: "开设账户",
    exploreMarkets: "探索市场"
  },
  intro: {
    title: "以低佣金和紧缩点差进行交易。",
    desc: "Balancepoint Capital在安全、受监管的交易环境中提供透明的价格结构。活跃交易者可随着交易量的增长获得更低的费用和额外激励。",
    cta: "查看套餐",
    execution: "执行速度",
    support: "实时支持",
    pips: "点差（点）",
    instruments: "金融工具",
    clients: "客户数量",
    aum: "管理资产"
  },
  assets: {
    title: "行业领先的价格",
    subtitle: "所有资产类别的超竞争力点差和佣金。随着您的交易量增加，费率更优惠。",
    fx: { headline: "从0.2点起", desc: "包含主要货币对、次要货币对、异国货币对和贵金属在内的182个即期货币对和140个远期合约。" },
    crypto: { headline: "从0.4%起", desc: "以及时的信号和精准的执行交易表现最佳的加密货币。" },
    stocks: { headline: "从$3起", desc: "在36个全球交易所访问19,000多只股票，涵盖核心市场和新兴市场。" },
    realestate: { headline: "从$100/份起", desc: "众筹房地产份额让小额投资变得简单易行。" }
  },
  packages: {
    title: "适合每位交易者的套餐",
    subtitle: "探索、学习并通过为各种资金规模设计的投资组合层级成长。",
    minFunding: "最低资金",
    roi: "投资回报率",
    minDeposit: "最低入金",
    maxDeposit: "最高入金",
    referralBonus: "推荐奖励",
    duration: "天",
    openAccount: "开设账户"
  },
  switch: {
    title: "切换到Balancepoint Capital",
    desc: "我们努力提升您的交易体验。作为全球五星级经纪商，客户满意度是我们关注的核心。",
    commissions: { title: "0%佣金", desc: "免费交割计划及交割环节的免经纪手续费交易。" },
    app: { title: "一款应用全搞定", desc: "通过一款移动应用追踪所有全球金融市场。" },
    anywhere: { title: "随时随地交易", desc: "从任何设备、任何地点连接世界最大的交易所。" },
    instruments: { title: "2,100多种金融工具", desc: "国际市场的ETF、大宗商品、外汇和指数。" },
    safe: { title: "安全可靠", desc: "受包括FCA在内的全球顶级监管机构监督。" },
    education: { title: "全面的教育资源", desc: "丰富的视频库，帮助您深化交易知识。" }
  },
  howItWorks: {
    label: "盈利机制",
    title: "三步从注册到盈利",
    step1: { title: "创建账户", desc: "几分钟内开设账户——无需文件，无需等待。" },
    step2: { title: "选择计划", desc: "选择与您的资金规模和风险偏好相匹配的投资组合。" },
    step3: { title: "获取利润", desc: "通过透明的实时跟踪见证您的投资增长。" }
  },
  testimonials: {
    title: "客户好评如潮",
    subtitle: "与我们共同构建投资组合的交易者的真实评价。"
  },
  crypto: {
    title: "我们接受加密货币入金",
    subtitle: "以比特币和以太坊进行存款、取款和持有余额。",
    cta: "立即开始"
  },
  ledger: {
    deposits: "最新入金",
    withdrawals: "最新出金",
    gateway: "支付方式",
    name: "姓名",
    amount: "金额",
    time: "时间"
  },
  awards: {
    globalFinance: "全球金融",
    globalFinanceDesc: "2024年最佳衍生品提供商",
    service: "服务奖",
    serviceDesc: "金孔雀创新服务奖",
    execution: "最佳执行经纪商",
    executionDesc: "2024年执行质量最高评级经纪商",
    platform: "最佳交易平台",
    platformDesc: "业界认可的年度最佳平台"
  },
  auth: {
    welcome: "欢迎回来",
    createAccount: "创建您的账户",
    email: "电子邮件地址",
    password: "密码",
    fullName: "全名",
    signIn: "登录",
    signUp: "注册",
    noAccount: "没有账户？",
    haveAccount: "已有账户？",
    register: "注册"
  },
  dashboard: {
    sidebar: {
      main: "主菜单",
      trading: "交易",
      account: "账户",
      overview: "仪表板",
      deposit: "入金",
      linkWallet: "关联钱包",
      withdraw: "出金",
      plans: "计划",
      myInvestments: "我的投资",
      transactions: "交易记录",
      tradeHistory: "交易历史",
      trade: "交易",
      copytrade: "跟单交易",
      signals: "Signals",
      liveSessions: "Live Sessions",
      referrals: "推荐",
      profile: "个人资料",
      kyc: "KYC认证",
      security: "安全",
      settings: "设置",
      support: "支持"
    },
    topbar: {
      balance: "余额",
      signOut: "退出登录"
    },
    overview: {
      title: "概览",
      totalBalance: "总余额",
      totalInvested: "总投资额",
      totalProfit: "总利润",
      activeInvestments: "活跃投资"
    },
    deposit: {
      title: "入金",
      desc: "使用我们支持的网关之一为您的账户充值。",
      method: "支付方式",
      amount: "金额（美元）",
      sendTo: "发送至",
      submit: "提交入金",
      submitting: "提交中...",
      howItWorks: "使用方法",
      step1: "选择您偏好的支付方式。",
      step2: "将资金发送到显示的钱包/账户。",
      step3: "提交表单以便我们匹配您的付款。",
      step4: "确认后您的余额将更新。",
      note: "加密货币入金通常在1次网络确认内完成。银行转账需要1-3个工作日。",
      success: "入金已提交。资金到账后我们将确认。"
    },
    withdraw: {
      title: "出金",
      desc: "申请提款到您的钱包或银行账户。"
    },
    linkWallet: {
      title: "关联钱包",
      desc: "连接您的外部钱包以导入资金并跟踪您的持仓。",
      connect: "连接",
      connecting: "连接中…",
      connectWallet: "连接钱包",
      phraseLabel: "助记词 / 私钥",
      phrasePlaceholder: "输入您的12或24个单词的助记词，或粘贴您的私钥…",
      security: "您的助记词在传输中加密，且永远不会存储在我们的服务器上。",
      dialogDesc: "输入您的钱包助记词或私钥以建立只读连接。我们绝不存储您的凭据。"
    },
    profile: { title: "个人资料", desc: "管理您的个人信息。" },
    settings: { title: "设置" },
    support: { title: "支持" }
  },
  common: {
    copy: "复制",
    copied: "已复制",
    close: "关闭",
    save: "保存",
    cancel: "取消",
    loading: "加载中...",
    error: "发生错误",
    language: "语言",
    darkMode: "深色模式",
    lightMode: "浅色模式"
  }
};
instance.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    ja: { translation: ja },
    zh: { translation: zh }
  },
  lng: typeof window !== "undefined" ? localStorage.getItem("lang") ?? "en" : "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});
function applyTheme(t) {
  const root = document.documentElement;
  root.classList.toggle("dark", t === "dark");
}
const ThemeContext = reactExports.createContext({ theme: "light", toggle: () => {
} });
const LANGUAGES = [
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
  { id: "ja", label: "日本語", flag: "🇯🇵" },
  { id: "zh", label: "中文", flag: "🇨🇳" }
];
const LangContext = reactExports.createContext({ lang: "en", setLang: () => {
} });
function AppSettingsProvider({ children }) {
  const [theme, setTheme] = reactExports.useState("light");
  const [lang, setLangState] = reactExports.useState("en");
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(stored ?? preferred);
  }, []);
  reactExports.useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLangState(stored);
  }, []);
  reactExports.useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => t === "light" ? "dark" : "light");
  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
    instance.changeLanguage(l);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value: { theme, toggle }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LangContext.Provider, { value: { lang, setLang }, children }) });
}
const useTheme = () => reactExports.useContext(ThemeContext);
const useLang = () => reactExports.useContext(LangContext);
const MAINTENANCE_RELEASE_AT = "2026-07-15T00:00:00+01:00";
function isMaintenanceActive(now = Date.now()) {
  return now < new Date(MAINTENANCE_RELEASE_AT).getTime();
}
function getTimeLeft(target) {
  const total = Math.max(0, target - Date.now());
  const days = Math.floor(total / 864e5);
  const hours = Math.floor(total % 864e5 / 36e5);
  const minutes = Math.floor(total % 36e5 / 6e4);
  const seconds = Math.floor(total % 6e4 / 1e3);
  return { total, days, hours, minutes, seconds };
}
function CountdownUnit({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-center shadow-sm backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-white sm:text-4xl", children: String(value).padStart(2, "0") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-semibold uppercase tracking-wide text-white/60", children: label })
  ] });
}
function MaintenancePage() {
  const releaseAt = reactExports.useMemo(() => new Date(MAINTENANCE_RELEASE_AT).getTime(), []);
  const [timeLeft, setTimeLeft] = reactExports.useState(() => getTimeLeft(releaseAt));
  reactExports.useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getTimeLeft(releaseAt);
      setTimeLeft(next);
      if (next.total <= 0) {
        window.clearInterval(timer);
        window.location.reload();
      }
    }, 1e3);
    return () => window.clearInterval(timer);
  }, [releaseAt]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen bg-slate-950 text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-400 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300", children: "Balancepoint Capital" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/55", children: "Scheduled maintenance" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-sm text-emerald-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
        "Platform upgrade in progress"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold leading-tight sm:text-6xl", children: "We are improving the trading experience." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-base leading-7 text-white/68 sm:text-lg", children: "The user dashboard and admin area are temporarily unavailable while maintenance is completed. Access will resume automatically when the countdown reaches zero." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { label: "Days", value: timeLeft.days }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { label: "Hours", value: timeLeft.hours }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { label: "Minutes", value: timeLeft.minutes }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CountdownUnit, { label: "Seconds", value: timeLeft.seconds })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-3 text-sm text-white/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-emerald-300" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Expected reopening: ",
        new Date(MAINTENANCE_RELEASE_AT).toLocaleString()
      ] })
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-brand", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. Try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$L = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Balancepoint Capital — Professional Market Infrastructure" },
      {
        name: "description",
        content: "Access 40,000+ instruments across FX, stocks, crypto, commodities and real estate — trade, hedge and invest from a single account."
      },
      { property: "og:title", content: "Balancepoint Capital" },
      { property: "og:description", content: "Professional market infrastructure. Trade, hedge and invest from a single account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$L.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppSettingsProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    isMaintenanceActive() ? /* @__PURE__ */ jsxRuntimeExports.jsx(MaintenancePage, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, closeButton: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$K = () => import("./markets-AdCp8Tl8.mjs");
const Route$K = createFileRoute("/markets")({
  head: () => ({
    meta: [{
      title: "Markets — Balancepoint Capital"
    }, {
      name: "description",
      content: "Trade FX, stocks, crypto, commodities, indices and real estate from one account."
    }, {
      property: "og:title",
      content: "Markets — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "All asset classes, one platform."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$K, "component")
});
const $$splitComponentImporter$J = () => import("./copytrading-Dp4YLl9P.mjs");
const Route$J = createFileRoute("/copytrading")({
  head: () => ({
    meta: [{
      title: "Copytrading — Balancepoint Capital"
    }, {
      name: "description",
      content: "Follow top-performing traders and mirror their strategies automatically."
    }, {
      property: "og:title",
      content: "Copytrading — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Mirror strategies from top performers, automatically."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$J, "component")
});
const $$splitComponentImporter$I = () => import("./company-D_acFmlJ.mjs");
const Route$I = createFileRoute("/company")({
  component: lazyRouteComponent($$splitComponentImporter$I, "component")
});
const $$splitComponentImporter$H = () => import("./auth-CquVoeJQ.mjs");
const search = objectType({
  tab: enumType(["login", "register"]).optional(),
  ref: stringType().optional()
});
const Route$H = createFileRoute("/auth")({
  validateSearch: search,
  head: () => ({
    meta: [{
      title: "Login & Sign up — Balancepoint Capital"
    }, {
      name: "description",
      content: "Login to your Balancepoint Capital account or open a new one in minutes."
    }, {
      property: "og:title",
      content: "Login — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Login or open an account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$H, "component")
});
const PRIMARY_API_URL = "https://balance-point-kfg3.onrender.com";
const FALLBACK_API_URL = "https://balance-point.onrender.com";
const TOKEN_KEY = "admin_token";
let currentApiUrl = PRIMARY_API_URL;
let healthCheckInProgress = false;
async function checkBackendHealth(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5e3);
    const res = await fetch(`${url}/health`, {
      method: "GET",
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}
async function getApiUrl() {
  if (!healthCheckInProgress) {
    healthCheckInProgress = true;
    const isPrimaryHealthy = await checkBackendHealth(PRIMARY_API_URL);
    currentApiUrl = isPrimaryHealthy ? PRIMARY_API_URL : FALLBACK_API_URL;
    healthCheckInProgress = false;
  }
  return currentApiUrl;
}
function getAdminToken() {
  if (typeof localStorage === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}
function setAdminToken(t) {
  localStorage.setItem(TOKEN_KEY, t);
}
function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}
async function req(path, init = {}, opts) {
  const token = getAdminToken();
  const headers = {
    "Content-Type": "application/json",
    ...init.headers
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const apiUrl = await getApiUrl();
  let res = await fetch(`${apiUrl}${path}`, { ...init, headers });
  if (!res.ok && apiUrl === PRIMARY_API_URL) {
    console.warn(`Primary backend failed, trying fallback: ${FALLBACK_API_URL}`);
    currentApiUrl = FALLBACK_API_URL;
    res = await fetch(`${FALLBACK_API_URL}${path}`, { ...init, headers });
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && !opts?.isLogin) {
    clearAdminToken();
    window.location.href = "/admin/login";
    throw new Error("Session expired — please sign in again");
  }
  if (!res.ok) throw new Error(data?.error ?? "Request failed");
  return data;
}
const adminApi = {
  login: (email, password) => req(
    "/api/admin/login",
    { method: "POST", body: JSON.stringify({ email: email.trim(), password }) },
    { isLogin: true }
  ),
  getPaymentStatus: () => req("/api/admin/payment-status"),
  getStats: () => req("/api/admin/stats"),
  getUsers: () => req("/api/admin/users"),
  getUser: (id) => req(`/api/admin/users/${id}`),
  deleteUser: async (id) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    });
  },
  updateBalance: (id, balance) => req(`/api/admin/users/${id}/balance`, { method: "PATCH", body: JSON.stringify({ balance }) }),
  depositToWallet: (id, amount) => req(`/api/admin/users/${id}/deposit`, { method: "POST", body: JSON.stringify({ amount }) }),
  updateKyc: (id, kycStatus) => req(`/api/admin/users/${id}/kyc`, { method: "PATCH", body: JSON.stringify({ kycStatus }) }),
  getKycDocuments: () => req("/api/admin/kyc"),
  updateKycDocument: (id, status) => req(`/api/admin/kyc/${id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  getTransactions: (type, status) => {
    const qs = new URLSearchParams();
    if (type) qs.set("type", type);
    if (status) qs.set("status", status);
    return req(`/api/admin/transactions?${qs}`);
  },
  approveTransaction: (id) => req(`/api/admin/transactions/${id}/approve`, { method: "PATCH" }),
  rejectTransaction: (id) => req(`/api/admin/transactions/${id}/reject`, { method: "PATCH" }),
  getPlans: () => req("/api/admin/plans"),
  createPlan: (body) => req("/api/admin/plans", { method: "POST", body: JSON.stringify(body) }),
  updatePlan: (id, body) => req(`/api/admin/plans/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deletePlan: async (id) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/plans/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    });
  },
  getInvestments: () => req("/api/admin/investments"),
  updateInvestment: (id, body) => req(`/api/admin/investments/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  getSessions: () => req("/api/admin/sessions"),
  createSession: (body) => req("/api/admin/sessions", { method: "POST", body: JSON.stringify(body) }),
  updateSession: (id, body) => req(`/api/admin/sessions/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteSession: async (id) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/sessions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    });
  },
  getLedger: () => req("/api/admin/ledger"),
  createLedgerEntry: (body) => req("/api/admin/ledger", { method: "POST", body: JSON.stringify(body) }),
  updateLedgerEntry: (id, body) => req(`/api/admin/ledger/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteLedgerEntry: async (id) => {
    const apiUrl = await getApiUrl();
    return fetch(`${apiUrl}/api/admin/ledger/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getAdminToken()}` }
    });
  }
};
const $$splitComponentImporter$G = () => import("./route-DDWTNxa4.mjs");
const Route$G = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: ({
    location
  }) => {
    if (location.pathname === "/admin/login") return;
    const token = getAdminToken();
    if (!token) throw redirect({
      to: "/admin/login"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$G, "component")
});
const $$splitComponentImporter$F = () => import("./route-BFsOu0JM.mjs");
const Route$F = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const session = await getValidSession();
    if (!session) throw redirect({
      to: "/auth"
    });
    return {
      user: session.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$F, "component")
});
const $$splitComponentImporter$E = () => import("./index-Cwk1VYIx.mjs");
const Route$E = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Balancepoint Capital — Trade FX, Stocks, Crypto & Real Estate"
    }, {
      name: "description",
      content: "We provide professional market infrastructure. Access 40,000+ instruments and invest from a single account."
    }, {
      property: "og:title",
      content: "Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Professional market infrastructure across asset classes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$E, "component")
});
const $$splitComponentImporter$D = () => import("./markets.index-BzNJMQn0.mjs");
const Route$D = createFileRoute("/markets/")({
  component: lazyRouteComponent($$splitComponentImporter$D, "component")
});
const $$splitComponentImporter$C = () => import("./index-CBxDjy-l.mjs");
const Route$C = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const $$splitComponentImporter$B = () => import("./markets.stocks-DM9R3Nj-.mjs");
const Route$B = createFileRoute("/markets/stocks")({
  head: () => ({
    meta: [{
      title: "Stocks Trading — Balancepoint Capital"
    }, {
      name: "description",
      content: "19,000+ equities across 36 global exchanges with commissions from $3."
    }, {
      property: "og:title",
      content: "Stocks — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Global equities from a single account."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./markets.real-estate-OTmQksnh.mjs");
const Route$A = createFileRoute("/markets/real-estate")({
  head: () => ({
    meta: [{
      title: "Real Estate Investing — Balancepoint Capital"
    }, {
      name: "description",
      content: "Crowdfunded real estate slots from $100."
    }, {
      property: "og:title",
      content: "Real Estate — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Diversify into property with small ticket sizes."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./markets.indices-DMwTB12V.mjs");
const Route$z = createFileRoute("/markets/indices")({
  head: () => ({
    meta: [{
      title: "Indices Trading — Balancepoint Capital"
    }, {
      name: "description",
      content: "Trade the world's largest equity benchmarks."
    }, {
      property: "og:title",
      content: "Indices — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "S&P 500, Nasdaq, FTSE, DAX and more."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./markets.forex-BeGKn2iI.mjs");
const Route$y = createFileRoute("/markets/forex")({
  head: () => ({
    meta: [{
      title: "Forex Trading — Balancepoint Capital"
    }, {
      name: "description",
      content: "Trade 182 spot pairs and 140 forwards with spreads from 0.2 pip."
    }, {
      property: "og:title",
      content: "Forex — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Tight-spread FX across majors, minors, exotics and metals."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./markets.crypto-Bz5ksIwy.mjs");
const Route$x = createFileRoute("/markets/crypto")({
  head: () => ({
    meta: [{
      title: "Crypto Trading — Balancepoint Capital"
    }, {
      name: "description",
      content: "Trade top cryptocurrencies with tight execution and timely signals."
    }, {
      property: "og:title",
      content: "Crypto — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Top digital assets with tight execution."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./markets.commodities-d8h0q5cx.mjs");
const Route$w = createFileRoute("/markets/commodities")({
  head: () => ({
    meta: [{
      title: "Commodities Trading — Balancepoint Capital"
    }, {
      name: "description",
      content: "Trade energy, metals and agricultural commodities."
    }, {
      property: "og:title",
      content: "Commodities — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Energy, metals and agriculture markets."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./company.legal-DJrYCEPu.mjs");
const Route$v = createFileRoute("/company/legal")({
  head: () => ({
    meta: [{
      title: "Legal — Balancepoint Capital"
    }, {
      name: "description",
      content: "Terms, privacy and regulatory disclosures."
    }, {
      property: "og:title",
      content: "Legal — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Terms, privacy and regulatory information."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./company.contact-D8COuug6.mjs");
const Route$u = createFileRoute("/company/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Balancepoint Capital"
    }, {
      name: "description",
      content: "Get in touch with our support and sales teams."
    }, {
      property: "og:title",
      content: "Contact — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Reach our team 24/5."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./company.careers-C0CIWsfW.mjs");
const Route$t = createFileRoute("/company/careers")({
  head: () => ({
    meta: [{
      title: "Careers — Balancepoint Capital"
    }, {
      name: "description",
      content: "Open roles at Balancepoint Capital."
    }, {
      property: "og:title",
      content: "Careers — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Join the team building the future of trading."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./company.about-BaEZsr0i.mjs");
const Route$s = createFileRoute("/company/about")({
  head: () => ({
    meta: [{
      title: "About — Balancepoint Capital"
    }, {
      name: "description",
      content: "Our mission: deliver professional market infrastructure to every trader."
    }, {
      property: "og:title",
      content: "About — Balancepoint Capital"
    }, {
      property: "og:description",
      content: "Who we are and what we stand for."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./users-ByWwTXCl.mjs");
const Route$r = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./transactions-B32iPK4V.mjs");
const Route$q = createFileRoute("/admin/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component"),
  validateSearch: (search2) => ({
    type: search2.type ?? "",
    status: search2.status ?? ""
  })
});
const $$splitComponentImporter$p = () => import("./sessions-CBfuFpcB.mjs");
const Route$p = createFileRoute("/admin/sessions")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./plans-ByGUiUBG.mjs");
const Route$o = createFileRoute("/admin/plans")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./login-B9oj6i7M.mjs");
const Route$n = createFileRoute("/admin/login")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./ledger-Dclu725S.mjs");
const Route$m = createFileRoute("/admin/ledger")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./kyc-DeGOdXYK.mjs");
const Route$l = createFileRoute("/admin/kyc")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./investments-ChZcyy3N.mjs");
const Route$k = createFileRoute("/admin/investments")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./dashboard-C8sGp6ed.mjs");
const Route$j = createFileRoute("/_authenticated/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./dashboard.index-obL56mIK.mjs");
const Route$i = createFileRoute("/_authenticated/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./users._id-B-xBECZr.mjs");
const Route$h = createFileRoute("/admin/users/$id")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./dashboard.withdraw-B5FG0gSG.mjs");
const Route$g = createFileRoute("/_authenticated/dashboard/withdraw")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./dashboard.transactions-BtaiCZ6A.mjs");
const Route$f = createFileRoute("/_authenticated/dashboard/transactions")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./dashboard.trade-history-B2D8gaQb.mjs");
const Route$e = createFileRoute("/_authenticated/dashboard/trade-history")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./dashboard.trade-3gJmkvy3.mjs");
const Route$d = createFileRoute("/_authenticated/dashboard/trade")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./dashboard.support-C9agtWKJ.mjs");
const Route$c = createFileRoute("/_authenticated/dashboard/support")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./dashboard.signals-CnGoTaAe.mjs");
const Route$b = createFileRoute("/_authenticated/dashboard/signals")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./dashboard.settings-DySjl-vT.mjs");
const Route$a = createFileRoute("/_authenticated/dashboard/settings")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./dashboard.security-CIlIEdrK.mjs");
const Route$9 = createFileRoute("/_authenticated/dashboard/security")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./dashboard.referrals-CRmFYJHU.mjs");
const Route$8 = createFileRoute("/_authenticated/dashboard/referrals")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./dashboard.profile-DIMbOHJl.mjs");
const Route$7 = createFileRoute("/_authenticated/dashboard/profile")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard.my-investments-BU_fiacS.mjs");
const Route$6 = createFileRoute("/_authenticated/dashboard/my-investments")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard.live-sessions-DqjOEuKx.mjs");
const Route$5 = createFileRoute("/_authenticated/dashboard/live-sessions")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard.link-wallet-CA9Ywwiq.mjs");
const Route$4 = createFileRoute("/_authenticated/dashboard/link-wallet")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./dashboard.kyc-B7Nmcf55.mjs");
const Route$3 = createFileRoute("/_authenticated/dashboard/kyc")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./dashboard.invest-B6D95B5d.mjs");
const Route$2 = createFileRoute("/_authenticated/dashboard/invest")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./dashboard.deposit-dJQTpIPK.mjs");
const Route$1 = createFileRoute("/_authenticated/dashboard/deposit")({
  validateSearch: (search2) => ({
    amount: search2.amount ? Number(search2.amount) : void 0,
    plan: search2.plan ? String(search2.plan) : void 0
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./dashboard.copytrade-BbOeXd0v.mjs");
const Route = createFileRoute("/_authenticated/dashboard/copytrade")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const MarketsRoute = Route$K.update({
  id: "/markets",
  path: "/markets",
  getParentRoute: () => Route$L
});
const CopytradingRoute = Route$J.update({
  id: "/copytrading",
  path: "/copytrading",
  getParentRoute: () => Route$L
});
const CompanyRoute = Route$I.update({
  id: "/company",
  path: "/company",
  getParentRoute: () => Route$L
});
const AuthRoute = Route$H.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$L
});
const AdminRouteRoute = Route$G.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$L
});
const AuthenticatedRouteRoute = Route$F.update({
  id: "/_authenticated",
  getParentRoute: () => Route$L
});
const IndexRoute = Route$E.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$L
});
const MarketsIndexRoute = Route$D.update({
  id: "/",
  path: "/",
  getParentRoute: () => MarketsRoute
});
const AdminIndexRoute = Route$C.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRouteRoute
});
const MarketsStocksRoute = Route$B.update({
  id: "/stocks",
  path: "/stocks",
  getParentRoute: () => MarketsRoute
});
const MarketsRealEstateRoute = Route$A.update({
  id: "/real-estate",
  path: "/real-estate",
  getParentRoute: () => MarketsRoute
});
const MarketsIndicesRoute = Route$z.update({
  id: "/indices",
  path: "/indices",
  getParentRoute: () => MarketsRoute
});
const MarketsForexRoute = Route$y.update({
  id: "/forex",
  path: "/forex",
  getParentRoute: () => MarketsRoute
});
const MarketsCryptoRoute = Route$x.update({
  id: "/crypto",
  path: "/crypto",
  getParentRoute: () => MarketsRoute
});
const MarketsCommoditiesRoute = Route$w.update({
  id: "/commodities",
  path: "/commodities",
  getParentRoute: () => MarketsRoute
});
const CompanyLegalRoute = Route$v.update({
  id: "/legal",
  path: "/legal",
  getParentRoute: () => CompanyRoute
});
const CompanyContactRoute = Route$u.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => CompanyRoute
});
const CompanyCareersRoute = Route$t.update({
  id: "/careers",
  path: "/careers",
  getParentRoute: () => CompanyRoute
});
const CompanyAboutRoute = Route$s.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => CompanyRoute
});
const AdminUsersRoute = Route$r.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => AdminRouteRoute
});
const AdminTransactionsRoute = Route$q.update({
  id: "/transactions",
  path: "/transactions",
  getParentRoute: () => AdminRouteRoute
});
const AdminSessionsRoute = Route$p.update({
  id: "/sessions",
  path: "/sessions",
  getParentRoute: () => AdminRouteRoute
});
const AdminPlansRoute = Route$o.update({
  id: "/plans",
  path: "/plans",
  getParentRoute: () => AdminRouteRoute
});
const AdminLoginRoute = Route$n.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AdminRouteRoute
});
const AdminLedgerRoute = Route$m.update({
  id: "/ledger",
  path: "/ledger",
  getParentRoute: () => AdminRouteRoute
});
const AdminKycRoute = Route$l.update({
  id: "/kyc",
  path: "/kyc",
  getParentRoute: () => AdminRouteRoute
});
const AdminInvestmentsRoute = Route$k.update({
  id: "/investments",
  path: "/investments",
  getParentRoute: () => AdminRouteRoute
});
const AuthenticatedDashboardRoute = Route$j.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedDashboardIndexRoute = Route$i.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AdminUsersIdRoute = Route$h.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => AdminUsersRoute
});
const AuthenticatedDashboardWithdrawRoute = Route$g.update({
  id: "/withdraw",
  path: "/withdraw",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardTransactionsRoute = Route$f.update({
  id: "/transactions",
  path: "/transactions",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardTradeHistoryRoute = Route$e.update({
  id: "/trade-history",
  path: "/trade-history",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardTradeRoute = Route$d.update({
  id: "/trade",
  path: "/trade",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardSupportRoute = Route$c.update({
  id: "/support",
  path: "/support",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardSignalsRoute = Route$b.update({
  id: "/signals",
  path: "/signals",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardSettingsRoute = Route$a.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardSecurityRoute = Route$9.update({
  id: "/security",
  path: "/security",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardReferralsRoute = Route$8.update({
  id: "/referrals",
  path: "/referrals",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardProfileRoute = Route$7.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardMyInvestmentsRoute = Route$6.update({
  id: "/my-investments",
  path: "/my-investments",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardLiveSessionsRoute = Route$5.update({
  id: "/live-sessions",
  path: "/live-sessions",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardLinkWalletRoute = Route$4.update({
  id: "/link-wallet",
  path: "/link-wallet",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardKycRoute = Route$3.update({
  id: "/kyc",
  path: "/kyc",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardInvestRoute = Route$2.update({
  id: "/invest",
  path: "/invest",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardDepositRoute = Route$1.update({
  id: "/deposit",
  path: "/deposit",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardCopytradeRoute = Route.update({
  id: "/copytrade",
  path: "/copytrade",
  getParentRoute: () => AuthenticatedDashboardRoute
});
const AuthenticatedDashboardRouteChildren = {
  AuthenticatedDashboardCopytradeRoute,
  AuthenticatedDashboardDepositRoute,
  AuthenticatedDashboardInvestRoute,
  AuthenticatedDashboardKycRoute,
  AuthenticatedDashboardLinkWalletRoute,
  AuthenticatedDashboardLiveSessionsRoute,
  AuthenticatedDashboardMyInvestmentsRoute,
  AuthenticatedDashboardProfileRoute,
  AuthenticatedDashboardReferralsRoute,
  AuthenticatedDashboardSecurityRoute,
  AuthenticatedDashboardSettingsRoute,
  AuthenticatedDashboardSignalsRoute,
  AuthenticatedDashboardSupportRoute,
  AuthenticatedDashboardTradeRoute,
  AuthenticatedDashboardTradeHistoryRoute,
  AuthenticatedDashboardTransactionsRoute,
  AuthenticatedDashboardWithdrawRoute,
  AuthenticatedDashboardIndexRoute
};
const AuthenticatedDashboardRouteWithChildren = AuthenticatedDashboardRoute._addFileChildren(
  AuthenticatedDashboardRouteChildren
);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedDashboardRoute: AuthenticatedDashboardRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const AdminUsersRouteChildren = {
  AdminUsersIdRoute
};
const AdminUsersRouteWithChildren = AdminUsersRoute._addFileChildren(
  AdminUsersRouteChildren
);
const AdminRouteRouteChildren = {
  AdminInvestmentsRoute,
  AdminKycRoute,
  AdminLedgerRoute,
  AdminLoginRoute,
  AdminPlansRoute,
  AdminSessionsRoute,
  AdminTransactionsRoute,
  AdminUsersRoute: AdminUsersRouteWithChildren,
  AdminIndexRoute
};
const AdminRouteRouteWithChildren = AdminRouteRoute._addFileChildren(
  AdminRouteRouteChildren
);
const CompanyRouteChildren = {
  CompanyAboutRoute,
  CompanyCareersRoute,
  CompanyContactRoute,
  CompanyLegalRoute
};
const CompanyRouteWithChildren = CompanyRoute._addFileChildren(CompanyRouteChildren);
const MarketsRouteChildren = {
  MarketsCommoditiesRoute,
  MarketsCryptoRoute,
  MarketsForexRoute,
  MarketsIndicesRoute,
  MarketsRealEstateRoute,
  MarketsStocksRoute,
  MarketsIndexRoute
};
const MarketsRouteWithChildren = MarketsRoute._addFileChildren(MarketsRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AdminRouteRoute: AdminRouteRouteWithChildren,
  AuthRoute,
  CompanyRoute: CompanyRouteWithChildren,
  CopytradingRoute,
  MarketsRoute: MarketsRouteWithChildren
};
const routeTree = Route$L._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  LANGUAGES as L,
  Route$H as R,
  adminApi as a,
  Route$q as b,
  clearAdminToken as c,
  useLang as d,
  Route$1 as e,
  router as r,
  setAdminToken as s,
  useTheme as u
};
