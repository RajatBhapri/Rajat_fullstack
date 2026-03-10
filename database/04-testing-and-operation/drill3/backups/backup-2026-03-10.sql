--
-- PostgreSQL database dump
--

\restrict VLx62yedA5gfnS5EWVyqP1UgJoL5Xmopfc1Eh7GY8ySmiVhx02GqmTzUPwbeOmJ

-- Dumped from database version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.13 (Ubuntu 16.13-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: taskuser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO taskuser;

--
-- Name: update_project_task_count(); Type: FUNCTION; Schema: public; Owner: taskuser
--

CREATE FUNCTION public.update_project_task_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    BEGIN
      IF TG_OP = 'INSERT' THEN
        UPDATE projects
        SET task_count = task_count + 1
        WHERE id = NEW.project_id;

      ELSIF TG_OP = 'DELETE' THEN
        UPDATE projects
        SET task_count = task_count - 1
        WHERE id = OLD.project_id;
      END IF;

      RETURN NEW;
    END;
    $$;


ALTER FUNCTION public.update_project_task_count() OWNER TO taskuser;

--
-- Name: update_task_count(); Type: FUNCTION; Schema: public; Owner: taskuser
--

CREATE FUNCTION public.update_task_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE users1 SET task_count = task_count + 1 WHERE id = NEW.user_id;
        ELSIF TG_OP = 'DELETE' THEN
          UPDATE users1 SET task_count = task_count - 1 WHERE id = OLD.user_id;
        END IF;
        RETURN NEW;
      END;
      $$;


ALTER FUNCTION public.update_task_count() OWNER TO taskuser;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text,
    color text
);


ALTER TABLE public.categories OWNER TO taskuser;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO taskuser;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    task_id integer,
    author_id integer,
    parent_comment_id integer,
    content text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.comments OWNER TO taskuser;

--
-- Name: comments6; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.comments6 (
    id integer NOT NULL,
    task_id integer,
    author_id integer,
    content text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.comments6 OWNER TO taskuser;

--
-- Name: comments6_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.comments6_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments6_id_seq OWNER TO taskuser;

--
-- Name: comments6_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.comments6_id_seq OWNED BY public.comments6.id;


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comments_id_seq OWNER TO taskuser;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(100),
    email character varying(100)
);


ALTER TABLE public.customers OWNER TO taskuser;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO taskuser;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name text,
    applied_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.migrations OWNER TO taskuser;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO taskuser;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_id integer,
    product_name character varying(100),
    price numeric(10,2)
);


ALTER TABLE public.orders OWNER TO taskuser;

--
-- Name: orders_denormalized; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.orders_denormalized (
    id integer NOT NULL,
    customer_name character varying(100),
    customer_email character varying(100),
    product_name character varying(100),
    price numeric(10,2)
);


ALTER TABLE public.orders_denormalized OWNER TO taskuser;

--
-- Name: orders_denormalized_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.orders_denormalized_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_denormalized_id_seq OWNER TO taskuser;

--
-- Name: orders_denormalized_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.orders_denormalized_id_seq OWNED BY public.orders_denormalized.id;


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO taskuser;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: project1; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.project1 (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.project1 OWNER TO taskuser;

--
-- Name: project1_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.project1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project1_id_seq OWNER TO taskuser;

--
-- Name: project1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.project1_id_seq OWNED BY public.project1.id;


--
-- Name: projects; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    owner_id integer,
    name text NOT NULL,
    metadata jsonb DEFAULT '{}'::jsonb,
    task_count integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    category_id integer
);


ALTER TABLE public.projects OWNER TO taskuser;

--
-- Name: projects6; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.projects6 (
    id integer NOT NULL,
    name text NOT NULL,
    owner_id integer,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.projects6 OWNER TO taskuser;

--
-- Name: projects6_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.projects6_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects6_id_seq OWNER TO taskuser;

--
-- Name: projects6_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.projects6_id_seq OWNED BY public.projects6.id;


--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO taskuser;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.tags OWNER TO taskuser;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO taskuser;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: task1; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.task1 (
    id integer NOT NULL,
    project_id integer,
    title text NOT NULL
);


ALTER TABLE public.task1 OWNER TO taskuser;

--
-- Name: task1_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.task1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task1_id_seq OWNER TO taskuser;

--
-- Name: task1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.task1_id_seq OWNED BY public.task1.id;


--
-- Name: task_tags; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.task_tags (
    task_id integer NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.task_tags OWNER TO taskuser;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    title text NOT NULL,
    user_id integer,
    completed boolean DEFAULT false
);


ALTER TABLE public.tasks OWNER TO taskuser;

--
-- Name: tasks1; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.tasks1 (
    id integer NOT NULL,
    user_id integer,
    title text
);


ALTER TABLE public.tasks1 OWNER TO taskuser;

--
-- Name: tasks1_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.tasks1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks1_id_seq OWNER TO taskuser;

--
-- Name: tasks1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.tasks1_id_seq OWNED BY public.tasks1.id;


--
-- Name: tasks5; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.tasks5 (
    id integer NOT NULL,
    user_id integer,
    title text,
    metadata jsonb
);


ALTER TABLE public.tasks5 OWNER TO taskuser;

--
-- Name: tasks5_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.tasks5_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks5_id_seq OWNER TO taskuser;

--
-- Name: tasks5_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.tasks5_id_seq OWNED BY public.tasks5.id;


--
-- Name: tasks6; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.tasks6 (
    id integer NOT NULL,
    title text NOT NULL,
    user_id integer,
    project_id integer,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.tasks6 OWNER TO taskuser;

--
-- Name: tasks6_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.tasks6_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks6_id_seq OWNER TO taskuser;

--
-- Name: tasks6_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.tasks6_id_seq OWNED BY public.tasks6.id;


--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_id_seq OWNER TO taskuser;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: user_preferences6; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.user_preferences6 (
    user_id integer NOT NULL,
    preferences jsonb
);


ALTER TABLE public.user_preferences6 OWNER TO taskuser;

--
-- Name: users; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text
);


ALTER TABLE public.users OWNER TO taskuser;

--
-- Name: users1; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.users1 (
    id integer NOT NULL,
    name text,
    task_count integer DEFAULT 0
);


ALTER TABLE public.users1 OWNER TO taskuser;

--
-- Name: users1_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.users1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users1_id_seq OWNER TO taskuser;

--
-- Name: users1_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.users1_id_seq OWNED BY public.users1.id;


--
-- Name: users5; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.users5 (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.users5 OWNER TO taskuser;

--
-- Name: users5_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.users5_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users5_id_seq OWNER TO taskuser;

--
-- Name: users5_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.users5_id_seq OWNED BY public.users5.id;


--
-- Name: users6; Type: TABLE; Schema: public; Owner: taskuser
--

CREATE TABLE public.users6 (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.users6 OWNER TO taskuser;

--
-- Name: users6_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.users6_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users6_id_seq OWNER TO taskuser;

--
-- Name: users6_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.users6_id_seq OWNED BY public.users6.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: taskuser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO taskuser;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: taskuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: comments6 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments6 ALTER COLUMN id SET DEFAULT nextval('public.comments6_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: orders_denormalized id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.orders_denormalized ALTER COLUMN id SET DEFAULT nextval('public.orders_denormalized_id_seq'::regclass);


--
-- Name: project1 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.project1 ALTER COLUMN id SET DEFAULT nextval('public.project1_id_seq'::regclass);


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: projects6 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.projects6 ALTER COLUMN id SET DEFAULT nextval('public.projects6_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: task1 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.task1 ALTER COLUMN id SET DEFAULT nextval('public.task1_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: tasks1 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks1 ALTER COLUMN id SET DEFAULT nextval('public.tasks1_id_seq'::regclass);


--
-- Name: tasks5 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks5 ALTER COLUMN id SET DEFAULT nextval('public.tasks5_id_seq'::regclass);


--
-- Name: tasks6 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks6 ALTER COLUMN id SET DEFAULT nextval('public.tasks6_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users1 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users1 ALTER COLUMN id SET DEFAULT nextval('public.users1_id_seq'::regclass);


--
-- Name: users5 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users5 ALTER COLUMN id SET DEFAULT nextval('public.users5_id_seq'::regclass);


--
-- Name: users6 id; Type: DEFAULT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users6 ALTER COLUMN id SET DEFAULT nextval('public.users6_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.categories (id, name, color) FROM stdin;
1	Work	blue
2	Personal	green
3	Shopping	orange
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.comments (id, task_id, author_id, parent_comment_id, content, created_at) FROM stdin;
1	1	1	\N	Initial schema created	2026-03-09 18:20:14.468326
\.


--
-- Data for Name: comments6; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.comments6 (id, task_id, author_id, content, created_at) FROM stdin;
1	1	2	Looks good	2026-03-09 18:19:34.727143
2	1	3	Consider adding indexes	2026-03-09 18:19:34.727143
3	2	2	API should support JWT	2026-03-09 18:19:34.727143
4	3	1	UI should be responsive	2026-03-09 18:19:34.727143
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.customers (id, name, email) FROM stdin;
2	Bob	bob@example.com
1	rajat	rajat_new@example.com
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.migrations (id, name, applied_at) FROM stdin;
6	001_initial_schema.sql	2026-03-10 07:34:20.707458
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.orders (id, customer_id, product_name, price) FROM stdin;
1	1	Laptop	1200.00
2	1	Mouse	25.00
3	2	Keyboard	75.00
\.


--
-- Data for Name: orders_denormalized; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.orders_denormalized (id, customer_name, customer_email, product_name, price) FROM stdin;
3	Bob	bob@example.com	Keyboard	750.00
1	rajat	rajat_new@example.com	Laptop	120000.00
2	rajat	rajat_new@example.com	Mouse	250.00
\.


--
-- Data for Name: project1; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.project1 (id, name) FROM stdin;
1	My Project1
2	My Project1
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.projects (id, owner_id, name, metadata, task_count, created_at, category_id) FROM stdin;
1	1	Backend System	{}	1	2026-03-09 18:20:14.421127	\N
\.


--
-- Data for Name: projects6; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.projects6 (id, name, owner_id, created_at) FROM stdin;
1	Backend API	1	2026-03-09 18:19:34.698095
2	Frontend App	2	2026-03-09 18:19:34.698095
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.tags (id, name) FROM stdin;
1	backend
\.


--
-- Data for Name: task1; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.task1 (id, project_id, title) FROM stdin;
1	1	Setup DB
2	1	Create Transactions
3	1	Test Rollback
4	2	Setup DB
5	2	Create Transactions
6	2	Test Rollback
\.


--
-- Data for Name: task_tags; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.task_tags (task_id, tag_id) FROM stdin;
1	1
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.tasks (id, title, user_id, completed) FROM stdin;
\.


--
-- Data for Name: tasks1; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.tasks1 (id, user_id, title) FROM stdin;
1	2	Task 1
2	3	Task 2
3	1	Task 3
4	2	Task 4
5	3	Task 5
6	1	Task 6
7	2	Task 7
8	3	Task 8
9	1	Task 9
10	2	Task 10
11	3	Task 11
12	1	Task 12
13	2	Task 13
14	3	Task 14
15	1	Task 15
16	2	Task 16
17	3	Task 17
18	1	Task 18
19	2	Task 19
20	3	Task 20
21	1	Task 21
22	2	Task 22
23	3	Task 23
24	1	Task 24
25	2	Task 25
26	3	Task 26
27	1	Task 27
28	2	Task 28
29	3	Task 29
30	1	Task 30
31	2	Task 31
32	3	Task 32
33	1	Task 33
34	2	Task 34
35	3	Task 35
36	1	Task 36
37	2	Task 37
38	3	Task 38
39	1	Task 39
40	2	Task 40
41	3	Task 41
42	1	Task 42
43	2	Task 43
44	3	Task 44
45	1	Task 45
46	2	Task 46
47	3	Task 47
48	1	Task 48
49	2	Task 49
50	3	Task 50
51	1	Task 51
52	2	Task 52
53	3	Task 53
54	1	Task 54
55	2	Task 55
56	3	Task 56
57	1	Task 57
58	2	Task 58
59	3	Task 59
60	1	Task 60
61	2	Task 61
62	3	Task 62
63	1	Task 63
64	2	Task 64
65	3	Task 65
66	1	Task 66
67	2	Task 67
68	3	Task 68
69	1	Task 69
70	2	Task 70
71	3	Task 71
72	1	Task 72
73	2	Task 73
74	3	Task 74
75	1	Task 75
76	2	Task 76
77	3	Task 77
78	1	Task 78
79	2	Task 79
80	3	Task 80
81	1	Task 81
82	2	Task 82
83	3	Task 83
84	1	Task 84
85	2	Task 85
86	3	Task 86
87	1	Task 87
88	2	Task 88
89	3	Task 89
90	1	Task 90
91	2	Task 91
92	3	Task 92
93	1	Task 93
94	2	Task 94
95	3	Task 95
96	1	Task 96
97	2	Task 97
98	3	Task 98
99	1	Task 99
100	2	Task 100
101	3	Task 101
102	1	Task 102
103	2	Task 103
104	3	Task 104
105	1	Task 105
106	2	Task 106
107	3	Task 107
108	1	Task 108
109	2	Task 109
110	3	Task 110
111	1	Task 111
112	2	Task 112
113	3	Task 113
114	1	Task 114
115	2	Task 115
116	3	Task 116
117	1	Task 117
118	2	Task 118
119	3	Task 119
120	1	Task 120
121	2	Task 121
122	3	Task 122
123	1	Task 123
124	2	Task 124
125	3	Task 125
126	1	Task 126
127	2	Task 127
128	3	Task 128
129	1	Task 129
130	2	Task 130
131	3	Task 131
132	1	Task 132
133	2	Task 133
134	3	Task 134
135	1	Task 135
136	2	Task 136
137	3	Task 137
138	1	Task 138
139	2	Task 139
140	3	Task 140
141	1	Task 141
142	2	Task 142
143	3	Task 143
144	1	Task 144
145	2	Task 145
146	3	Task 146
147	1	Task 147
148	2	Task 148
149	3	Task 149
150	1	Task 150
151	2	Task 151
152	3	Task 152
153	1	Task 153
154	2	Task 154
155	3	Task 155
156	1	Task 156
157	2	Task 157
158	3	Task 158
159	1	Task 159
160	2	Task 160
161	3	Task 161
162	1	Task 162
163	2	Task 163
164	3	Task 164
165	1	Task 165
166	2	Task 166
167	3	Task 167
168	1	Task 168
169	2	Task 169
170	3	Task 170
171	1	Task 171
172	2	Task 172
173	3	Task 173
174	1	Task 174
175	2	Task 175
176	3	Task 176
177	1	Task 177
178	2	Task 178
179	3	Task 179
180	1	Task 180
181	2	Task 181
182	3	Task 182
183	1	Task 183
184	2	Task 184
185	3	Task 185
186	1	Task 186
187	2	Task 187
188	3	Task 188
189	1	Task 189
190	2	Task 190
191	3	Task 191
192	1	Task 192
193	2	Task 193
194	3	Task 194
195	1	Task 195
196	2	Task 196
197	3	Task 197
198	1	Task 198
199	2	Task 199
200	3	Task 200
201	1	Task 201
202	2	Task 202
203	3	Task 203
204	1	Task 204
205	2	Task 205
206	3	Task 206
207	1	Task 207
208	2	Task 208
209	3	Task 209
210	1	Task 210
211	2	Task 211
212	3	Task 212
213	1	Task 213
214	2	Task 214
215	3	Task 215
216	1	Task 216
217	2	Task 217
218	3	Task 218
219	1	Task 219
220	2	Task 220
221	3	Task 221
222	1	Task 222
223	2	Task 223
224	3	Task 224
225	1	Task 225
226	2	Task 226
227	3	Task 227
228	1	Task 228
229	2	Task 229
230	3	Task 230
231	1	Task 231
232	2	Task 232
233	3	Task 233
234	1	Task 234
235	2	Task 235
236	3	Task 236
237	1	Task 237
238	2	Task 238
239	3	Task 239
240	1	Task 240
241	2	Task 241
242	3	Task 242
243	1	Task 243
244	2	Task 244
245	3	Task 245
246	1	Task 246
247	2	Task 247
248	3	Task 248
249	1	Task 249
250	2	Task 250
251	3	Task 251
252	1	Task 252
253	2	Task 253
254	3	Task 254
255	1	Task 255
256	2	Task 256
257	3	Task 257
258	1	Task 258
259	2	Task 259
260	3	Task 260
261	1	Task 261
262	2	Task 262
263	3	Task 263
264	1	Task 264
265	2	Task 265
266	3	Task 266
267	1	Task 267
268	2	Task 268
269	3	Task 269
270	1	Task 270
271	2	Task 271
272	3	Task 272
273	1	Task 273
274	2	Task 274
275	3	Task 275
276	1	Task 276
277	2	Task 277
278	3	Task 278
279	1	Task 279
280	2	Task 280
281	3	Task 281
282	1	Task 282
283	2	Task 283
284	3	Task 284
285	1	Task 285
286	2	Task 286
287	3	Task 287
288	1	Task 288
289	2	Task 289
290	3	Task 290
291	1	Task 291
292	2	Task 292
293	3	Task 293
294	1	Task 294
295	2	Task 295
296	3	Task 296
297	1	Task 297
298	2	Task 298
299	3	Task 299
300	1	Task 300
301	2	Task 301
302	3	Task 302
303	1	Task 303
304	2	Task 304
305	3	Task 305
306	1	Task 306
307	2	Task 307
308	3	Task 308
309	1	Task 309
310	2	Task 310
311	3	Task 311
312	1	Task 312
313	2	Task 313
314	3	Task 314
315	1	Task 315
316	2	Task 316
317	3	Task 317
318	1	Task 318
319	2	Task 319
320	3	Task 320
321	1	Task 321
322	2	Task 322
323	3	Task 323
324	1	Task 324
325	2	Task 325
326	3	Task 326
327	1	Task 327
328	2	Task 328
329	3	Task 329
330	1	Task 330
331	2	Task 331
332	3	Task 332
333	1	Task 333
334	2	Task 334
335	3	Task 335
336	1	Task 336
337	2	Task 337
338	3	Task 338
339	1	Task 339
340	2	Task 340
341	3	Task 341
342	1	Task 342
343	2	Task 343
344	3	Task 344
345	1	Task 345
346	2	Task 346
347	3	Task 347
348	1	Task 348
349	2	Task 349
350	3	Task 350
351	1	Task 351
352	2	Task 352
353	3	Task 353
354	1	Task 354
355	2	Task 355
356	3	Task 356
357	1	Task 357
358	2	Task 358
359	3	Task 359
360	1	Task 360
361	2	Task 361
362	3	Task 362
363	1	Task 363
364	2	Task 364
365	3	Task 365
366	1	Task 366
367	2	Task 367
368	3	Task 368
369	1	Task 369
370	2	Task 370
371	3	Task 371
372	1	Task 372
373	2	Task 373
374	3	Task 374
375	1	Task 375
376	2	Task 376
377	3	Task 377
378	1	Task 378
379	2	Task 379
380	3	Task 380
381	1	Task 381
382	2	Task 382
383	3	Task 383
384	1	Task 384
385	2	Task 385
386	3	Task 386
387	1	Task 387
388	2	Task 388
389	3	Task 389
390	1	Task 390
391	2	Task 391
392	3	Task 392
393	1	Task 393
394	2	Task 394
395	3	Task 395
396	1	Task 396
397	2	Task 397
398	3	Task 398
399	1	Task 399
400	2	Task 400
401	3	Task 401
402	1	Task 402
403	2	Task 403
404	3	Task 404
405	1	Task 405
406	2	Task 406
407	3	Task 407
408	1	Task 408
409	2	Task 409
410	3	Task 410
411	1	Task 411
412	2	Task 412
413	3	Task 413
414	1	Task 414
415	2	Task 415
416	3	Task 416
417	1	Task 417
418	2	Task 418
419	3	Task 419
420	1	Task 420
421	2	Task 421
422	3	Task 422
423	1	Task 423
424	2	Task 424
425	3	Task 425
426	1	Task 426
427	2	Task 427
428	3	Task 428
429	1	Task 429
430	2	Task 430
431	3	Task 431
432	1	Task 432
433	2	Task 433
434	3	Task 434
435	1	Task 435
436	2	Task 436
437	3	Task 437
438	1	Task 438
439	2	Task 439
440	3	Task 440
441	1	Task 441
442	2	Task 442
443	3	Task 443
444	1	Task 444
445	2	Task 445
446	3	Task 446
447	1	Task 447
448	2	Task 448
449	3	Task 449
450	1	Task 450
451	2	Task 451
452	3	Task 452
453	1	Task 453
454	2	Task 454
455	3	Task 455
456	1	Task 456
457	2	Task 457
458	3	Task 458
459	1	Task 459
460	2	Task 460
461	3	Task 461
462	1	Task 462
463	2	Task 463
464	3	Task 464
465	1	Task 465
466	2	Task 466
467	3	Task 467
468	1	Task 468
469	2	Task 469
470	3	Task 470
471	1	Task 471
472	2	Task 472
473	3	Task 473
474	1	Task 474
475	2	Task 475
476	3	Task 476
477	1	Task 477
478	2	Task 478
479	3	Task 479
480	1	Task 480
481	2	Task 481
482	3	Task 482
483	1	Task 483
484	2	Task 484
485	3	Task 485
486	1	Task 486
487	2	Task 487
488	3	Task 488
489	1	Task 489
490	2	Task 490
491	3	Task 491
492	1	Task 492
493	2	Task 493
494	3	Task 494
495	1	Task 495
496	2	Task 496
497	3	Task 497
498	1	Task 498
499	2	Task 499
500	3	Task 500
501	1	Task 501
502	2	Task 502
503	3	Task 503
504	1	Task 504
505	2	Task 505
506	3	Task 506
507	1	Task 507
508	2	Task 508
509	3	Task 509
510	1	Task 510
511	2	Task 511
512	3	Task 512
513	1	Task 513
514	2	Task 514
515	3	Task 515
516	1	Task 516
517	2	Task 517
518	3	Task 518
519	1	Task 519
520	2	Task 520
521	3	Task 521
522	1	Task 522
523	2	Task 523
524	3	Task 524
525	1	Task 525
526	2	Task 526
527	3	Task 527
528	1	Task 528
529	2	Task 529
530	3	Task 530
531	1	Task 531
532	2	Task 532
533	3	Task 533
534	1	Task 534
535	2	Task 535
536	3	Task 536
537	1	Task 537
538	2	Task 538
539	3	Task 539
540	1	Task 540
541	2	Task 541
542	3	Task 542
543	1	Task 543
544	2	Task 544
545	3	Task 545
546	1	Task 546
547	2	Task 547
548	3	Task 548
549	1	Task 549
550	2	Task 550
551	3	Task 551
552	1	Task 552
553	2	Task 553
554	3	Task 554
555	1	Task 555
556	2	Task 556
557	3	Task 557
558	1	Task 558
559	2	Task 559
560	3	Task 560
561	1	Task 561
562	2	Task 562
563	3	Task 563
564	1	Task 564
565	2	Task 565
566	3	Task 566
567	1	Task 567
568	2	Task 568
569	3	Task 569
570	1	Task 570
571	2	Task 571
572	3	Task 572
573	1	Task 573
574	2	Task 574
575	3	Task 575
576	1	Task 576
577	2	Task 577
578	3	Task 578
579	1	Task 579
580	2	Task 580
581	3	Task 581
582	1	Task 582
583	2	Task 583
584	3	Task 584
585	1	Task 585
586	2	Task 586
587	3	Task 587
588	1	Task 588
589	2	Task 589
590	3	Task 590
591	1	Task 591
592	2	Task 592
593	3	Task 593
594	1	Task 594
595	2	Task 595
596	3	Task 596
597	1	Task 597
598	2	Task 598
599	3	Task 599
600	1	Task 600
601	2	Task 601
602	3	Task 602
603	1	Task 603
604	2	Task 604
605	3	Task 605
606	1	Task 606
607	2	Task 607
608	3	Task 608
609	1	Task 609
610	2	Task 610
611	3	Task 611
612	1	Task 612
613	2	Task 613
614	3	Task 614
615	1	Task 615
616	2	Task 616
617	3	Task 617
618	1	Task 618
619	2	Task 619
620	3	Task 620
621	1	Task 621
622	2	Task 622
623	3	Task 623
624	1	Task 624
625	2	Task 625
626	3	Task 626
627	1	Task 627
628	2	Task 628
629	3	Task 629
630	1	Task 630
631	2	Task 631
632	3	Task 632
633	1	Task 633
634	2	Task 634
635	3	Task 635
636	1	Task 636
637	2	Task 637
638	3	Task 638
639	1	Task 639
640	2	Task 640
641	3	Task 641
642	1	Task 642
643	2	Task 643
644	3	Task 644
645	1	Task 645
646	2	Task 646
647	3	Task 647
648	1	Task 648
649	2	Task 649
650	3	Task 650
651	1	Task 651
652	2	Task 652
653	3	Task 653
654	1	Task 654
655	2	Task 655
656	3	Task 656
657	1	Task 657
658	2	Task 658
659	3	Task 659
660	1	Task 660
661	2	Task 661
662	3	Task 662
663	1	Task 663
664	2	Task 664
665	3	Task 665
666	1	Task 666
667	2	Task 667
668	3	Task 668
669	1	Task 669
670	2	Task 670
671	3	Task 671
672	1	Task 672
673	2	Task 673
674	3	Task 674
675	1	Task 675
676	2	Task 676
677	3	Task 677
678	1	Task 678
679	2	Task 679
680	3	Task 680
681	1	Task 681
682	2	Task 682
683	3	Task 683
684	1	Task 684
685	2	Task 685
686	3	Task 686
687	1	Task 687
688	2	Task 688
689	3	Task 689
690	1	Task 690
691	2	Task 691
692	3	Task 692
693	1	Task 693
694	2	Task 694
695	3	Task 695
696	1	Task 696
697	2	Task 697
698	3	Task 698
699	1	Task 699
700	2	Task 700
701	3	Task 701
702	1	Task 702
703	2	Task 703
704	3	Task 704
705	1	Task 705
706	2	Task 706
707	3	Task 707
708	1	Task 708
709	2	Task 709
710	3	Task 710
711	1	Task 711
712	2	Task 712
713	3	Task 713
714	1	Task 714
715	2	Task 715
716	3	Task 716
717	1	Task 717
718	2	Task 718
719	3	Task 719
720	1	Task 720
721	2	Task 721
722	3	Task 722
723	1	Task 723
724	2	Task 724
725	3	Task 725
726	1	Task 726
727	2	Task 727
728	3	Task 728
729	1	Task 729
730	2	Task 730
731	3	Task 731
732	1	Task 732
733	2	Task 733
734	3	Task 734
735	1	Task 735
736	2	Task 736
737	3	Task 737
738	1	Task 738
739	2	Task 739
740	3	Task 740
741	1	Task 741
742	2	Task 742
743	3	Task 743
744	1	Task 744
745	2	Task 745
746	3	Task 746
747	1	Task 747
748	2	Task 748
749	3	Task 749
750	1	Task 750
751	2	Task 751
752	3	Task 752
753	1	Task 753
754	2	Task 754
755	3	Task 755
756	1	Task 756
757	2	Task 757
758	3	Task 758
759	1	Task 759
760	2	Task 760
761	3	Task 761
762	1	Task 762
763	2	Task 763
764	3	Task 764
765	1	Task 765
766	2	Task 766
767	3	Task 767
768	1	Task 768
769	2	Task 769
770	3	Task 770
771	1	Task 771
772	2	Task 772
773	3	Task 773
774	1	Task 774
775	2	Task 775
776	3	Task 776
777	1	Task 777
778	2	Task 778
779	3	Task 779
780	1	Task 780
781	2	Task 781
782	3	Task 782
783	1	Task 783
784	2	Task 784
785	3	Task 785
786	1	Task 786
787	2	Task 787
788	3	Task 788
789	1	Task 789
790	2	Task 790
791	3	Task 791
792	1	Task 792
793	2	Task 793
794	3	Task 794
795	1	Task 795
796	2	Task 796
797	3	Task 797
798	1	Task 798
799	2	Task 799
800	3	Task 800
801	1	Task 801
802	2	Task 802
803	3	Task 803
804	1	Task 804
805	2	Task 805
806	3	Task 806
807	1	Task 807
808	2	Task 808
809	3	Task 809
810	1	Task 810
811	2	Task 811
812	3	Task 812
813	1	Task 813
814	2	Task 814
815	3	Task 815
816	1	Task 816
817	2	Task 817
818	3	Task 818
819	1	Task 819
820	2	Task 820
821	3	Task 821
822	1	Task 822
823	2	Task 823
824	3	Task 824
825	1	Task 825
826	2	Task 826
827	3	Task 827
828	1	Task 828
829	2	Task 829
830	3	Task 830
831	1	Task 831
832	2	Task 832
833	3	Task 833
834	1	Task 834
835	2	Task 835
836	3	Task 836
837	1	Task 837
838	2	Task 838
839	3	Task 839
840	1	Task 840
841	2	Task 841
842	3	Task 842
843	1	Task 843
844	2	Task 844
845	3	Task 845
846	1	Task 846
847	2	Task 847
848	3	Task 848
849	1	Task 849
850	2	Task 850
851	3	Task 851
852	1	Task 852
853	2	Task 853
854	3	Task 854
855	1	Task 855
856	2	Task 856
857	3	Task 857
858	1	Task 858
859	2	Task 859
860	3	Task 860
861	1	Task 861
862	2	Task 862
863	3	Task 863
864	1	Task 864
865	2	Task 865
866	3	Task 866
867	1	Task 867
868	2	Task 868
869	3	Task 869
870	1	Task 870
871	2	Task 871
872	3	Task 872
873	1	Task 873
874	2	Task 874
875	3	Task 875
876	1	Task 876
877	2	Task 877
878	3	Task 878
879	1	Task 879
880	2	Task 880
881	3	Task 881
882	1	Task 882
883	2	Task 883
884	3	Task 884
885	1	Task 885
886	2	Task 886
887	3	Task 887
888	1	Task 888
889	2	Task 889
890	3	Task 890
891	1	Task 891
892	2	Task 892
893	3	Task 893
894	1	Task 894
895	2	Task 895
896	3	Task 896
897	1	Task 897
898	2	Task 898
899	3	Task 899
900	1	Task 900
901	2	Task 901
902	3	Task 902
903	1	Task 903
904	2	Task 904
905	3	Task 905
906	1	Task 906
907	2	Task 907
908	3	Task 908
909	1	Task 909
910	2	Task 910
911	3	Task 911
912	1	Task 912
913	2	Task 913
914	3	Task 914
915	1	Task 915
916	2	Task 916
917	3	Task 917
918	1	Task 918
919	2	Task 919
920	3	Task 920
921	1	Task 921
922	2	Task 922
923	3	Task 923
924	1	Task 924
925	2	Task 925
926	3	Task 926
927	1	Task 927
928	2	Task 928
929	3	Task 929
930	1	Task 930
931	2	Task 931
932	3	Task 932
933	1	Task 933
934	2	Task 934
935	3	Task 935
936	1	Task 936
937	2	Task 937
938	3	Task 938
939	1	Task 939
940	2	Task 940
941	3	Task 941
942	1	Task 942
943	2	Task 943
944	3	Task 944
945	1	Task 945
946	2	Task 946
947	3	Task 947
948	1	Task 948
949	2	Task 949
950	3	Task 950
951	1	Task 951
952	2	Task 952
953	3	Task 953
954	1	Task 954
955	2	Task 955
956	3	Task 956
957	1	Task 957
958	2	Task 958
959	3	Task 959
960	1	Task 960
961	2	Task 961
962	3	Task 962
963	1	Task 963
964	2	Task 964
965	3	Task 965
966	1	Task 966
967	2	Task 967
968	3	Task 968
969	1	Task 969
970	2	Task 970
971	3	Task 971
972	1	Task 972
973	2	Task 973
974	3	Task 974
975	1	Task 975
976	2	Task 976
977	3	Task 977
978	1	Task 978
979	2	Task 979
980	3	Task 980
981	1	Task 981
982	2	Task 982
983	3	Task 983
984	1	Task 984
985	2	Task 985
986	3	Task 986
987	1	Task 987
988	2	Task 988
989	3	Task 989
990	1	Task 990
991	2	Task 991
992	3	Task 992
993	1	Task 993
994	2	Task 994
995	3	Task 995
996	1	Task 996
997	2	Task 997
998	3	Task 998
999	1	Task 999
1000	2	Task 1000
\.


--
-- Data for Name: tasks5; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.tasks5 (id, user_id, title, metadata) FROM stdin;
2	2	Buy groceries	{"tags": ["home", "shopping"], "priority": "low"}
3	1	Prepare presentation	{"tags": ["work"], "priority": "high"}
4	3	Workout	{"tags": ["health"], "priority": "medium"}
1	1	Finish report	{"tags": ["important"], "due_date": "2024-01-15", "priority": "high", "completed_at": "2024-01-20"}
\.


--
-- Data for Name: tasks6; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.tasks6 (id, title, user_id, project_id, created_at) FROM stdin;
1	Design 	1	1	2026-03-09 18:19:34.712105
2	Build 	1	1	2026-03-09 18:19:34.712105
3	Create 	2	2	2026-03-09 18:19:34.712105
4	Buy	3	\N	2026-03-09 18:19:34.712105
\.


--
-- Data for Name: user_preferences6; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.user_preferences6 (user_id, preferences) FROM stdin;
1	{"theme": "dark", "notifications": true}
2	{"theme": "light", "language": "en"}
3	{"theme": "dark", "dashboard_layout": "compact"}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.users (id, email) FROM stdin;
1	rajat@example.com
2	rajat@example.com
3	alice@example.com
4	bob@example.com
5	user0@example.com
6	user1@example.com
7	user2@example.com
8	user3@example.com
9	user4@example.com
10	user5@example.com
11	user6@example.com
12	user7@example.com
13	user8@example.com
14	user9@example.com
15	user10@example.com
16	user11@example.com
17	user12@example.com
18	user13@example.com
19	user14@example.com
20	user15@example.com
21	user16@example.com
22	user17@example.com
23	user18@example.com
24	user19@example.com
25	user20@example.com
26	user21@example.com
27	user22@example.com
28	user23@example.com
29	user24@example.com
30	user25@example.com
31	user26@example.com
32	user27@example.com
33	user28@example.com
34	user29@example.com
35	user30@example.com
36	user31@example.com
37	user32@example.com
38	user33@example.com
39	user34@example.com
40	user35@example.com
41	user36@example.com
42	user37@example.com
43	user38@example.com
44	user39@example.com
45	user40@example.com
46	user41@example.com
47	user42@example.com
48	user43@example.com
49	user44@example.com
50	user45@example.com
51	user46@example.com
52	user47@example.com
53	user48@example.com
54	user49@example.com
55	user50@example.com
56	user51@example.com
57	user52@example.com
58	user53@example.com
59	user54@example.com
60	user55@example.com
61	user56@example.com
62	user57@example.com
63	user58@example.com
64	user59@example.com
65	user60@example.com
66	user61@example.com
67	user62@example.com
68	user63@example.com
69	user64@example.com
70	user65@example.com
71	user66@example.com
72	user67@example.com
73	user68@example.com
74	user69@example.com
75	user70@example.com
76	user71@example.com
77	user72@example.com
78	user73@example.com
79	user74@example.com
80	user75@example.com
81	user76@example.com
82	user77@example.com
83	user78@example.com
84	user79@example.com
85	user80@example.com
86	user81@example.com
87	user82@example.com
88	user83@example.com
89	user84@example.com
90	user85@example.com
91	user86@example.com
92	user87@example.com
93	user88@example.com
94	user89@example.com
95	user90@example.com
96	user91@example.com
97	user92@example.com
98	user93@example.com
99	user94@example.com
100	user95@example.com
101	user96@example.com
102	user97@example.com
103	user98@example.com
104	user99@example.com
105	user100@example.com
106	user101@example.com
107	user102@example.com
108	user103@example.com
109	user104@example.com
110	user105@example.com
111	user106@example.com
112	user107@example.com
113	user108@example.com
114	user109@example.com
115	user110@example.com
116	user111@example.com
117	user112@example.com
118	user113@example.com
119	user114@example.com
120	user115@example.com
121	user116@example.com
122	user117@example.com
123	user118@example.com
124	user119@example.com
125	user120@example.com
126	user121@example.com
127	user122@example.com
128	user123@example.com
129	user124@example.com
130	user125@example.com
131	user126@example.com
132	user127@example.com
133	user128@example.com
134	user129@example.com
135	user130@example.com
136	user131@example.com
137	user132@example.com
138	user133@example.com
139	user134@example.com
140	user135@example.com
141	user136@example.com
142	user137@example.com
143	user138@example.com
144	user139@example.com
145	user140@example.com
146	user141@example.com
147	user142@example.com
148	user143@example.com
149	user144@example.com
150	user145@example.com
151	user146@example.com
152	user147@example.com
153	user148@example.com
154	user149@example.com
155	user150@example.com
156	user151@example.com
157	user152@example.com
158	user153@example.com
159	user154@example.com
160	user155@example.com
161	user156@example.com
162	user157@example.com
163	user158@example.com
164	user159@example.com
165	user160@example.com
166	user161@example.com
167	user162@example.com
168	user163@example.com
169	user164@example.com
170	user165@example.com
171	user166@example.com
172	user167@example.com
173	user168@example.com
174	user169@example.com
175	user170@example.com
176	user171@example.com
177	user172@example.com
178	user173@example.com
179	user174@example.com
180	user175@example.com
181	user176@example.com
182	user177@example.com
183	user178@example.com
184	user179@example.com
185	user180@example.com
186	user181@example.com
187	user182@example.com
188	user183@example.com
189	user184@example.com
190	user185@example.com
191	user186@example.com
192	user187@example.com
193	user188@example.com
194	user189@example.com
195	user190@example.com
196	user191@example.com
197	user192@example.com
198	user193@example.com
199	user194@example.com
200	user195@example.com
201	user196@example.com
202	user197@example.com
203	user198@example.com
204	user199@example.com
205	user200@example.com
206	user201@example.com
207	user202@example.com
208	user203@example.com
209	user204@example.com
210	user205@example.com
211	user206@example.com
212	user207@example.com
213	user208@example.com
214	user209@example.com
215	user210@example.com
216	user211@example.com
217	user212@example.com
218	user213@example.com
219	user214@example.com
220	user215@example.com
221	user216@example.com
222	user217@example.com
223	user218@example.com
224	user219@example.com
225	user220@example.com
226	user221@example.com
227	user222@example.com
228	user223@example.com
229	user224@example.com
230	user225@example.com
231	user226@example.com
232	user227@example.com
233	user228@example.com
234	user229@example.com
235	user230@example.com
236	user231@example.com
237	user232@example.com
238	user233@example.com
239	user234@example.com
240	user235@example.com
241	user236@example.com
242	user237@example.com
243	user238@example.com
244	user239@example.com
245	user240@example.com
246	user241@example.com
247	user242@example.com
248	user243@example.com
249	user244@example.com
250	user245@example.com
251	user246@example.com
252	user247@example.com
253	user248@example.com
254	user249@example.com
255	user250@example.com
256	user251@example.com
257	user252@example.com
258	user253@example.com
259	user254@example.com
260	user255@example.com
261	user256@example.com
262	user257@example.com
263	user258@example.com
264	user259@example.com
265	user260@example.com
266	user261@example.com
267	user262@example.com
268	user263@example.com
269	user264@example.com
270	user265@example.com
271	user266@example.com
272	user267@example.com
273	user268@example.com
274	user269@example.com
275	user270@example.com
276	user271@example.com
277	user272@example.com
278	user273@example.com
279	user274@example.com
280	user275@example.com
281	user276@example.com
282	user277@example.com
283	user278@example.com
284	user279@example.com
285	user280@example.com
286	user281@example.com
287	user282@example.com
288	user283@example.com
289	user284@example.com
290	user285@example.com
291	user286@example.com
292	user287@example.com
293	user288@example.com
294	user289@example.com
295	user290@example.com
296	user291@example.com
297	user292@example.com
298	user293@example.com
299	user294@example.com
300	user295@example.com
301	user296@example.com
302	user297@example.com
303	user298@example.com
304	user299@example.com
305	user300@example.com
306	user301@example.com
307	user302@example.com
308	user303@example.com
309	user304@example.com
310	user305@example.com
311	user306@example.com
312	user307@example.com
313	user308@example.com
314	user309@example.com
315	user310@example.com
316	user311@example.com
317	user312@example.com
318	user313@example.com
319	user314@example.com
320	user315@example.com
321	user316@example.com
322	user317@example.com
323	user318@example.com
324	user319@example.com
325	user320@example.com
326	user321@example.com
327	user322@example.com
328	user323@example.com
329	user324@example.com
330	user325@example.com
331	user326@example.com
332	user327@example.com
333	user328@example.com
334	user329@example.com
335	user330@example.com
336	user331@example.com
337	user332@example.com
338	user333@example.com
339	user334@example.com
340	user335@example.com
341	user336@example.com
342	user337@example.com
343	user338@example.com
344	user339@example.com
345	user340@example.com
346	user341@example.com
347	user342@example.com
348	user343@example.com
349	user344@example.com
350	user345@example.com
351	user346@example.com
352	user347@example.com
353	user348@example.com
354	user349@example.com
355	user350@example.com
356	user351@example.com
357	user352@example.com
358	user353@example.com
359	user354@example.com
360	user355@example.com
361	user356@example.com
362	user357@example.com
363	user358@example.com
364	user359@example.com
365	user360@example.com
366	user361@example.com
367	user362@example.com
368	user363@example.com
369	user364@example.com
370	user365@example.com
371	user366@example.com
372	user367@example.com
373	user368@example.com
374	user369@example.com
375	user370@example.com
376	user371@example.com
377	user372@example.com
378	user373@example.com
379	user374@example.com
380	user375@example.com
381	user376@example.com
382	user377@example.com
383	user378@example.com
384	user379@example.com
385	user380@example.com
386	user381@example.com
387	user382@example.com
388	user383@example.com
389	user384@example.com
390	user385@example.com
391	user386@example.com
392	user387@example.com
393	user388@example.com
394	user389@example.com
395	user390@example.com
396	user391@example.com
397	user392@example.com
398	user393@example.com
399	user394@example.com
400	user395@example.com
401	user396@example.com
402	user397@example.com
403	user398@example.com
404	user399@example.com
405	user400@example.com
406	user401@example.com
407	user402@example.com
408	user403@example.com
409	user404@example.com
410	user405@example.com
411	user406@example.com
412	user407@example.com
413	user408@example.com
414	user409@example.com
415	user410@example.com
416	user411@example.com
417	user412@example.com
418	user413@example.com
419	user414@example.com
420	user415@example.com
421	user416@example.com
422	user417@example.com
423	user418@example.com
424	user419@example.com
425	user420@example.com
426	user421@example.com
427	user422@example.com
428	user423@example.com
429	user424@example.com
430	user425@example.com
431	user426@example.com
432	user427@example.com
433	user428@example.com
434	user429@example.com
435	user430@example.com
436	user431@example.com
437	user432@example.com
438	user433@example.com
439	user434@example.com
440	user435@example.com
441	user436@example.com
442	user437@example.com
443	user438@example.com
444	user439@example.com
445	user440@example.com
446	user441@example.com
447	user442@example.com
448	user443@example.com
449	user444@example.com
450	user445@example.com
451	user446@example.com
452	user447@example.com
453	user448@example.com
454	user449@example.com
455	user450@example.com
456	user451@example.com
457	user452@example.com
458	user453@example.com
459	user454@example.com
460	user455@example.com
461	user456@example.com
462	user457@example.com
463	user458@example.com
464	user459@example.com
465	user460@example.com
466	user461@example.com
467	user462@example.com
468	user463@example.com
469	user464@example.com
470	user465@example.com
471	user466@example.com
472	user467@example.com
473	user468@example.com
474	user469@example.com
475	user470@example.com
476	user471@example.com
477	user472@example.com
478	user473@example.com
479	user474@example.com
480	user475@example.com
481	user476@example.com
482	user477@example.com
483	user478@example.com
484	user479@example.com
485	user480@example.com
486	user481@example.com
487	user482@example.com
488	user483@example.com
489	user484@example.com
490	user485@example.com
491	user486@example.com
492	user487@example.com
493	user488@example.com
494	user489@example.com
495	user490@example.com
496	user491@example.com
497	user492@example.com
498	user493@example.com
499	user494@example.com
500	user495@example.com
501	user496@example.com
502	user497@example.com
503	user498@example.com
504	user499@example.com
505	user500@example.com
506	user501@example.com
507	user502@example.com
508	user503@example.com
509	user504@example.com
510	user505@example.com
511	user506@example.com
512	user507@example.com
513	user508@example.com
514	user509@example.com
515	user510@example.com
516	user511@example.com
517	user512@example.com
518	user513@example.com
519	user514@example.com
520	user515@example.com
521	user516@example.com
522	user517@example.com
523	user518@example.com
524	user519@example.com
525	user520@example.com
526	user521@example.com
527	user522@example.com
528	user523@example.com
529	user524@example.com
530	user525@example.com
531	user526@example.com
532	user527@example.com
533	user528@example.com
534	user529@example.com
535	user530@example.com
536	user531@example.com
537	user532@example.com
538	user533@example.com
539	user534@example.com
540	user535@example.com
541	user536@example.com
542	user537@example.com
543	user538@example.com
544	user539@example.com
545	user540@example.com
546	user541@example.com
547	user542@example.com
548	user543@example.com
549	user544@example.com
550	user545@example.com
551	user546@example.com
552	user547@example.com
553	user548@example.com
554	user549@example.com
555	user550@example.com
556	user551@example.com
557	user552@example.com
558	user553@example.com
559	user554@example.com
560	user555@example.com
561	user556@example.com
562	user557@example.com
563	user558@example.com
564	user559@example.com
565	user560@example.com
566	user561@example.com
567	user562@example.com
568	user563@example.com
569	user564@example.com
570	user565@example.com
571	user566@example.com
572	user567@example.com
573	user568@example.com
574	user569@example.com
575	user570@example.com
576	user571@example.com
577	user572@example.com
578	user573@example.com
579	user574@example.com
580	user575@example.com
581	user576@example.com
582	user577@example.com
583	user578@example.com
584	user579@example.com
585	user580@example.com
586	user581@example.com
587	user582@example.com
588	user583@example.com
589	user584@example.com
590	user585@example.com
591	user586@example.com
592	user587@example.com
593	user588@example.com
594	user589@example.com
595	user590@example.com
596	user591@example.com
597	user592@example.com
598	user593@example.com
599	user594@example.com
600	user595@example.com
601	user596@example.com
602	user597@example.com
603	user598@example.com
604	user599@example.com
605	user600@example.com
606	user601@example.com
607	user602@example.com
608	user603@example.com
609	user604@example.com
610	user605@example.com
611	user606@example.com
612	user607@example.com
613	user608@example.com
614	user609@example.com
615	user610@example.com
616	user611@example.com
617	user612@example.com
618	user613@example.com
619	user614@example.com
620	user615@example.com
621	user616@example.com
622	user617@example.com
623	user618@example.com
624	user619@example.com
625	user620@example.com
626	user621@example.com
627	user622@example.com
628	user623@example.com
629	user624@example.com
630	user625@example.com
631	user626@example.com
632	user627@example.com
633	user628@example.com
634	user629@example.com
635	user630@example.com
636	user631@example.com
637	user632@example.com
638	user633@example.com
639	user634@example.com
640	user635@example.com
641	user636@example.com
642	user637@example.com
643	user638@example.com
644	user639@example.com
645	user640@example.com
646	user641@example.com
647	user642@example.com
648	user643@example.com
649	user644@example.com
650	user645@example.com
651	user646@example.com
652	user647@example.com
653	user648@example.com
654	user649@example.com
655	user650@example.com
656	user651@example.com
657	user652@example.com
658	user653@example.com
659	user654@example.com
660	user655@example.com
661	user656@example.com
662	user657@example.com
663	user658@example.com
664	user659@example.com
665	user660@example.com
666	user661@example.com
667	user662@example.com
668	user663@example.com
669	user664@example.com
670	user665@example.com
671	user666@example.com
672	user667@example.com
673	user668@example.com
674	user669@example.com
675	user670@example.com
676	user671@example.com
677	user672@example.com
678	user673@example.com
679	user674@example.com
680	user675@example.com
681	user676@example.com
682	user677@example.com
683	user678@example.com
684	user679@example.com
685	user680@example.com
686	user681@example.com
687	user682@example.com
688	user683@example.com
689	user684@example.com
690	user685@example.com
691	user686@example.com
692	user687@example.com
693	user688@example.com
694	user689@example.com
695	user690@example.com
696	user691@example.com
697	user692@example.com
698	user693@example.com
699	user694@example.com
700	user695@example.com
701	user696@example.com
702	user697@example.com
703	user698@example.com
704	user699@example.com
705	user700@example.com
706	user701@example.com
707	user702@example.com
708	user703@example.com
709	user704@example.com
710	user705@example.com
711	user706@example.com
712	user707@example.com
713	user708@example.com
714	user709@example.com
715	user710@example.com
716	user711@example.com
717	user712@example.com
718	user713@example.com
719	user714@example.com
720	user715@example.com
721	user716@example.com
722	user717@example.com
723	user718@example.com
724	user719@example.com
725	user720@example.com
726	user721@example.com
727	user722@example.com
728	user723@example.com
729	user724@example.com
730	user725@example.com
731	user726@example.com
732	user727@example.com
733	user728@example.com
734	user729@example.com
735	user730@example.com
736	user731@example.com
737	user732@example.com
738	user733@example.com
739	user734@example.com
740	user735@example.com
741	user736@example.com
742	user737@example.com
743	user738@example.com
744	user739@example.com
745	user740@example.com
746	user741@example.com
747	user742@example.com
748	user743@example.com
749	user744@example.com
750	user745@example.com
751	user746@example.com
752	user747@example.com
753	user748@example.com
754	user749@example.com
755	user750@example.com
756	user751@example.com
757	user752@example.com
758	user753@example.com
759	user754@example.com
760	user755@example.com
761	user756@example.com
762	user757@example.com
763	user758@example.com
764	user759@example.com
765	user760@example.com
766	user761@example.com
767	user762@example.com
768	user763@example.com
769	user764@example.com
770	user765@example.com
771	user766@example.com
772	user767@example.com
773	user768@example.com
774	user769@example.com
775	user770@example.com
776	user771@example.com
777	user772@example.com
778	user773@example.com
779	user774@example.com
780	user775@example.com
781	user776@example.com
782	user777@example.com
783	user778@example.com
784	user779@example.com
785	user780@example.com
786	user781@example.com
787	user782@example.com
788	user783@example.com
789	user784@example.com
790	user785@example.com
791	user786@example.com
792	user787@example.com
793	user788@example.com
794	user789@example.com
795	user790@example.com
796	user791@example.com
797	user792@example.com
798	user793@example.com
799	user794@example.com
800	user795@example.com
801	user796@example.com
802	user797@example.com
803	user798@example.com
804	user799@example.com
805	user800@example.com
806	user801@example.com
807	user802@example.com
808	user803@example.com
809	user804@example.com
810	user805@example.com
811	user806@example.com
812	user807@example.com
813	user808@example.com
814	user809@example.com
815	user810@example.com
816	user811@example.com
817	user812@example.com
818	user813@example.com
819	user814@example.com
820	user815@example.com
821	user816@example.com
822	user817@example.com
823	user818@example.com
824	user819@example.com
825	user820@example.com
826	user821@example.com
827	user822@example.com
828	user823@example.com
829	user824@example.com
830	user825@example.com
831	user826@example.com
832	user827@example.com
833	user828@example.com
834	user829@example.com
835	user830@example.com
836	user831@example.com
837	user832@example.com
838	user833@example.com
839	user834@example.com
840	user835@example.com
841	user836@example.com
842	user837@example.com
843	user838@example.com
844	user839@example.com
845	user840@example.com
846	user841@example.com
847	user842@example.com
848	user843@example.com
849	user844@example.com
850	user845@example.com
851	user846@example.com
852	user847@example.com
853	user848@example.com
854	user849@example.com
855	user850@example.com
856	user851@example.com
857	user852@example.com
858	user853@example.com
859	user854@example.com
860	user855@example.com
861	user856@example.com
862	user857@example.com
863	user858@example.com
864	user859@example.com
865	user860@example.com
866	user861@example.com
867	user862@example.com
868	user863@example.com
869	user864@example.com
870	user865@example.com
871	user866@example.com
872	user867@example.com
873	user868@example.com
874	user869@example.com
875	user870@example.com
876	user871@example.com
877	user872@example.com
878	user873@example.com
879	user874@example.com
880	user875@example.com
881	user876@example.com
882	user877@example.com
883	user878@example.com
884	user879@example.com
885	user880@example.com
886	user881@example.com
887	user882@example.com
888	user883@example.com
889	user884@example.com
890	user885@example.com
891	user886@example.com
892	user887@example.com
893	user888@example.com
894	user889@example.com
895	user890@example.com
896	user891@example.com
897	user892@example.com
898	user893@example.com
899	user894@example.com
900	user895@example.com
901	user896@example.com
902	user897@example.com
903	user898@example.com
904	user899@example.com
905	user900@example.com
906	user901@example.com
907	user902@example.com
908	user903@example.com
909	user904@example.com
910	user905@example.com
911	user906@example.com
912	user907@example.com
913	user908@example.com
914	user909@example.com
915	user910@example.com
916	user911@example.com
917	user912@example.com
918	user913@example.com
919	user914@example.com
920	user915@example.com
921	user916@example.com
922	user917@example.com
923	user918@example.com
924	user919@example.com
925	user920@example.com
926	user921@example.com
927	user922@example.com
928	user923@example.com
929	user924@example.com
930	user925@example.com
931	user926@example.com
932	user927@example.com
933	user928@example.com
934	user929@example.com
935	user930@example.com
936	user931@example.com
937	user932@example.com
938	user933@example.com
939	user934@example.com
940	user935@example.com
941	user936@example.com
942	user937@example.com
943	user938@example.com
944	user939@example.com
945	user940@example.com
946	user941@example.com
947	user942@example.com
948	user943@example.com
949	user944@example.com
950	user945@example.com
951	user946@example.com
952	user947@example.com
953	user948@example.com
954	user949@example.com
955	user950@example.com
956	user951@example.com
957	user952@example.com
958	user953@example.com
959	user954@example.com
960	user955@example.com
961	user956@example.com
962	user957@example.com
963	user958@example.com
964	user959@example.com
965	user960@example.com
966	user961@example.com
967	user962@example.com
968	user963@example.com
969	user964@example.com
970	user965@example.com
971	user966@example.com
972	user967@example.com
973	user968@example.com
974	user969@example.com
975	user970@example.com
976	user971@example.com
977	user972@example.com
978	user973@example.com
979	user974@example.com
980	user975@example.com
981	user976@example.com
982	user977@example.com
983	user978@example.com
984	user979@example.com
985	user980@example.com
986	user981@example.com
987	user982@example.com
988	user983@example.com
989	user984@example.com
990	user985@example.com
991	user986@example.com
992	user987@example.com
993	user988@example.com
994	user989@example.com
995	user990@example.com
996	user991@example.com
997	user992@example.com
998	user993@example.com
999	user994@example.com
1000	user995@example.com
1001	user996@example.com
1002	user997@example.com
1003	user998@example.com
1004	user999@example.com
\.


--
-- Data for Name: users1; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.users1 (id, name, task_count) FROM stdin;
3	Charlie	333
1	Alice	333
2	Bob	334
\.


--
-- Data for Name: users5; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.users5 (id, name) FROM stdin;
1	Rajat
2	Bob
3	Charlie
\.


--
-- Data for Name: users6; Type: TABLE DATA; Schema: public; Owner: taskuser
--

COPY public.users6 (id, name) FROM stdin;
1	Rajat
2	Bob
3	Charlie
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.categories_id_seq', 8, true);


--
-- Name: comments6_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.comments6_id_seq', 4, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, true);


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.customers_id_seq', 2, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.migrations_id_seq', 7, true);


--
-- Name: orders_denormalized_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.orders_denormalized_id_seq', 3, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.orders_id_seq', 3, true);


--
-- Name: project1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.project1_id_seq', 2, true);


--
-- Name: projects6_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.projects6_id_seq', 2, true);


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.projects_id_seq', 2, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, true);


--
-- Name: task1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.task1_id_seq', 6, true);


--
-- Name: tasks1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.tasks1_id_seq', 1000, true);


--
-- Name: tasks5_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.tasks5_id_seq', 4, true);


--
-- Name: tasks6_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.tasks6_id_seq', 4, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.tasks_id_seq', 1, false);


--
-- Name: users1_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.users1_id_seq', 3, true);


--
-- Name: users5_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.users5_id_seq', 3, true);


--
-- Name: users6_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.users6_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: taskuser
--

SELECT pg_catalog.setval('public.users_id_seq', 1004, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: comments6 comments6_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments6
    ADD CONSTRAINT comments6_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: orders_denormalized orders_denormalized_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.orders_denormalized
    ADD CONSTRAINT orders_denormalized_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: project1 project1_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.project1
    ADD CONSTRAINT project1_pkey PRIMARY KEY (id);


--
-- Name: projects6 projects6_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.projects6
    ADD CONSTRAINT projects6_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: task1 task1_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.task1
    ADD CONSTRAINT task1_pkey PRIMARY KEY (id);


--
-- Name: task_tags task_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.task_tags
    ADD CONSTRAINT task_tags_pkey PRIMARY KEY (task_id, tag_id);


--
-- Name: tasks1 tasks1_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks1
    ADD CONSTRAINT tasks1_pkey PRIMARY KEY (id);


--
-- Name: tasks5 tasks5_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks5
    ADD CONSTRAINT tasks5_pkey PRIMARY KEY (id);


--
-- Name: tasks6 tasks6_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks6
    ADD CONSTRAINT tasks6_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: user_preferences6 user_preferences6_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.user_preferences6
    ADD CONSTRAINT user_preferences6_pkey PRIMARY KEY (user_id);


--
-- Name: users1 users1_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users1
    ADD CONSTRAINT users1_pkey PRIMARY KEY (id);


--
-- Name: users5 users5_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users5
    ADD CONSTRAINT users5_pkey PRIMARY KEY (id);


--
-- Name: users6 users6_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users6
    ADD CONSTRAINT users6_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: tasks5_metadata_idx; Type: INDEX; Schema: public; Owner: taskuser
--

CREATE INDEX tasks5_metadata_idx ON public.tasks5 USING gin (metadata);


--
-- Name: tasks1 task_count_delete; Type: TRIGGER; Schema: public; Owner: taskuser
--

CREATE TRIGGER task_count_delete AFTER DELETE ON public.tasks1 FOR EACH ROW EXECUTE FUNCTION public.update_task_count();


--
-- Name: tasks1 task_count_insert; Type: TRIGGER; Schema: public; Owner: taskuser
--

CREATE TRIGGER task_count_insert AFTER INSERT ON public.tasks1 FOR EACH ROW EXECUTE FUNCTION public.update_task_count();


--
-- Name: comments6 comments6_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments6
    ADD CONSTRAINT comments6_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users6(id);


--
-- Name: comments6 comments6_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments6
    ADD CONSTRAINT comments6_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks6(id);


--
-- Name: comments comments_parent_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_comment_id_fkey FOREIGN KEY (parent_comment_id) REFERENCES public.comments(id);


--
-- Name: orders orders_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);


--
-- Name: projects6 projects6_owner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.projects6
    ADD CONSTRAINT projects6_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users6(id);


--
-- Name: projects projects_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: task1 task1_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.task1
    ADD CONSTRAINT task1_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.project1(id) ON DELETE CASCADE;


--
-- Name: task_tags task_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.task_tags
    ADD CONSTRAINT task_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON DELETE CASCADE;


--
-- Name: tasks1 tasks1_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks1
    ADD CONSTRAINT tasks1_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users1(id);


--
-- Name: tasks5 tasks5_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks5
    ADD CONSTRAINT tasks5_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users5(id);


--
-- Name: tasks6 tasks6_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks6
    ADD CONSTRAINT tasks6_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects6(id);


--
-- Name: tasks6 tasks6_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.tasks6
    ADD CONSTRAINT tasks6_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users6(id);


--
-- Name: user_preferences6 user_preferences6_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: taskuser
--

ALTER TABLE ONLY public.user_preferences6
    ADD CONSTRAINT user_preferences6_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users6(id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO taskuser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO taskuser;


--
-- PostgreSQL database dump complete
--

\unrestrict VLx62yedA5gfnS5EWVyqP1UgJoL5Xmopfc1Eh7GY8ySmiVhx02GqmTzUPwbeOmJ

