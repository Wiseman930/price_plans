CREATE TABLE IF NOT EXISTS public.pricing_plans
(
    plan_name text NOT NULL,
    sms_price int NOT NULL,
	call_price int NOT NULL,
    id serial NOT NULL primary key

);