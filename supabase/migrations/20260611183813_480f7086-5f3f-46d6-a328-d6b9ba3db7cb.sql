
-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  country TEXT,
  phone TEXT,
  avatar_url TEXT,
  referral_code TEXT UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 8),
  referred_by UUID REFERENCES auth.users(id),
  kyc_status TEXT NOT NULL DEFAULT 'unverified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- WALLETS
CREATE TABLE public.wallets (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance NUMERIC(18,2) NOT NULL DEFAULT 0,
  active_investment NUMERIC(18,2) NOT NULL DEFAULT 0,
  total_profit NUMERIC(18,2) NOT NULL DEFAULT 0,
  referral_earnings NUMERIC(18,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.wallets TO authenticated;
GRANT ALL ON public.wallets TO service_role;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wallet read" ON public.wallets FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own wallet update" ON public.wallets FOR UPDATE TO authenticated USING (auth.uid() = user_id);

-- PLANS
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  min_deposit NUMERIC(18,2) NOT NULL,
  max_deposit NUMERIC(18,2) NOT NULL,
  roi_percent NUMERIC(6,2) NOT NULL,
  referral_percent NUMERIC(6,2) NOT NULL DEFAULT 5,
  duration_days INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.plans TO anon, authenticated;
GRANT ALL ON public.plans TO service_role;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plans public read" ON public.plans FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.plans (slug, name, tagline, min_deposit, max_deposit, roi_percent, duration_days, sort_order) VALUES
('trial', 'Trial Portfolio', 'Benefit from industry-leading entry prices', 200, 999, 90, 3, 1),
('standard', 'Standard Portfolio', 'Receive even tighter spreads and commissions', 1000, 9999, 135, 3, 2),
('expert', 'Expert Portfolio', 'Advanced tools for the serious trader', 10000, 1000000, 165, 3, 3),
('promo', 'Promo Portfolio', 'Premium tier with maximum returns', 1250000, 10000000, 195, 3, 4);

-- INVESTMENTS
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  amount NUMERIC(18,2) NOT NULL,
  roi_percent NUMERIC(6,2) NOT NULL,
  profit NUMERIC(18,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active',
  start_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  end_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.investments TO authenticated;
GRANT ALL ON public.investments TO service_role;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own investments" ON public.investments FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- TRANSACTIONS
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  gateway TEXT,
  amount NUMERIC(18,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own transactions" ON public.transactions FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- REFERRALS
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bonus_amount NUMERIC(18,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO service_role;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own referrals" ON public.referrals FOR SELECT TO authenticated USING (auth.uid() = referrer_id);

-- COPY FOLLOWS
CREATE TABLE public.copy_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trader_handle TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, trader_handle)
);
GRANT SELECT, INSERT, DELETE ON public.copy_follows TO authenticated;
GRANT ALL ON public.copy_follows TO service_role;
ALTER TABLE public.copy_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own follows" ON public.copy_follows FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- TICKETS
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.tickets TO authenticated;
GRANT ALL ON public.tickets TO service_role;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tickets" ON public.tickets FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ticket_messages TO authenticated;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own ticket msgs" ON public.ticket_messages FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- PUBLIC LEDGER (seeded fake activity)
CREATE TABLE public.public_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind TEXT NOT NULL,
  gateway TEXT NOT NULL,
  name TEXT NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  hours_ago INT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);
GRANT SELECT ON public.public_ledger TO anon, authenticated;
GRANT ALL ON public.public_ledger TO service_role;
ALTER TABLE public.public_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ledger public" ON public.public_ledger FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.public_ledger (kind, gateway, name, amount, hours_ago, sort_order) VALUES
('deposit','Bitcoin','Mughal Fahad',15700,2,1),
('deposit','Bitcoin','Rob Ludwig',16800,6,2),
('deposit','Western Union','Daniel Rankins',17500,24,3),
('deposit','Western Union','Florence M. Colon',13500,48,4),
('deposit','Bitcoin Cash','Banko Pajia',11000,4,5),
('deposit','Bitcoin','Tyra Loriso',20650,46,6),
('deposit','PerfectMoney','Dorothy Lisa',23750,5,7),
('deposit','Bitcoin','Christal James',5700,20,8),
('deposit','Bitcoin','Kim Valentine',1800,60,9),
('deposit','Western Union','Lupita Duran',7500,24,10),
('withdraw','Bitcoin','Schaun Smith',10650,42,1),
('withdraw','PerfectMoney','Kiley Jeanis',10330,30,2),
('withdraw','PerfectMoney','Alysia Schwarz',16750,11,3),
('withdraw','Bitcoin','Tavanya G. Lockett',9700,2,4),
('withdraw','Bitcoin','Carole Finneran',11800,6,5),
('withdraw','Western Union','Arraya Merino',3500,21,6),
('withdraw','Western Union','Kopa Mohuba',10500,8,7),
('withdraw','Bitcoin Cash','Lerato Modiegi',12000,4,8);

-- SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)));
  INSERT INTO public.wallets (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
