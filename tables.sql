CREATE TABLE IF NOT EXISTS public.pricing_plans
(
    plan_name text NOT NULL,
    sms_price int NOT NULL,
	call_price int NOT NULL,
    id serial NOT NULL primary key

);

CREATE TABLE IF NOT EXISTS public.users
(
	user_names varchar(250) not null,
    id serial NOT NULL primary key,
    link_id int,
    FOREIGN KEY (link_id) REFERENCES pricing_plans(id)

);

INSERT INTO public.pricing_plans(
	plan_name, sms_price, call_price , id)
	VALUES ('sms100', 1, 2, 1);

INSERT INTO public.pricing_plans(
	plan_name, sms_price, call_price , id)
	VALUES ('sms200', 1, 4, 2);

INSERT INTO public.pricing_plans(
	plan_name, sms_price, call_price , id)
	VALUES ('call weekly', 1, 3, 3);