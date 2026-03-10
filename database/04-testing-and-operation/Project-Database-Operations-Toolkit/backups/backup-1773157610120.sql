--
-- PostgreSQL database dump
--

\restrict BD0xc1xFZtaMUsezLhE6IYsUxecqeNBscoFBq1SepXcZUxLLlebquiGyAfP5hLL

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
    email text,
    name text
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

COPY public.users (id, email, name) FROM stdin;
1	rajat@example.com	\N
2	rajat@example.com	\N
3	alice@example.com	\N
4	bob@example.com	\N
5	user0@example.com	\N
6	user1@example.com	\N
7	user2@example.com	\N
8	user3@example.com	\N
9	user4@example.com	\N
10	user5@example.com	\N
11	user6@example.com	\N
12	user7@example.com	\N
13	user8@example.com	\N
14	user9@example.com	\N
15	user10@example.com	\N
16	user11@example.com	\N
17	user12@example.com	\N
18	user13@example.com	\N
19	user14@example.com	\N
20	user15@example.com	\N
21	user16@example.com	\N
22	user17@example.com	\N
23	user18@example.com	\N
24	user19@example.com	\N
25	user20@example.com	\N
26	user21@example.com	\N
27	user22@example.com	\N
28	user23@example.com	\N
29	user24@example.com	\N
30	user25@example.com	\N
31	user26@example.com	\N
32	user27@example.com	\N
33	user28@example.com	\N
34	user29@example.com	\N
35	user30@example.com	\N
36	user31@example.com	\N
37	user32@example.com	\N
38	user33@example.com	\N
39	user34@example.com	\N
40	user35@example.com	\N
41	user36@example.com	\N
42	user37@example.com	\N
43	user38@example.com	\N
44	user39@example.com	\N
45	user40@example.com	\N
46	user41@example.com	\N
47	user42@example.com	\N
48	user43@example.com	\N
49	user44@example.com	\N
50	user45@example.com	\N
51	user46@example.com	\N
52	user47@example.com	\N
53	user48@example.com	\N
54	user49@example.com	\N
55	user50@example.com	\N
56	user51@example.com	\N
57	user52@example.com	\N
58	user53@example.com	\N
59	user54@example.com	\N
60	user55@example.com	\N
61	user56@example.com	\N
62	user57@example.com	\N
63	user58@example.com	\N
64	user59@example.com	\N
65	user60@example.com	\N
66	user61@example.com	\N
67	user62@example.com	\N
68	user63@example.com	\N
69	user64@example.com	\N
70	user65@example.com	\N
71	user66@example.com	\N
72	user67@example.com	\N
73	user68@example.com	\N
74	user69@example.com	\N
75	user70@example.com	\N
76	user71@example.com	\N
77	user72@example.com	\N
78	user73@example.com	\N
79	user74@example.com	\N
80	user75@example.com	\N
81	user76@example.com	\N
82	user77@example.com	\N
83	user78@example.com	\N
84	user79@example.com	\N
85	user80@example.com	\N
86	user81@example.com	\N
87	user82@example.com	\N
88	user83@example.com	\N
89	user84@example.com	\N
90	user85@example.com	\N
91	user86@example.com	\N
92	user87@example.com	\N
93	user88@example.com	\N
94	user89@example.com	\N
95	user90@example.com	\N
96	user91@example.com	\N
97	user92@example.com	\N
98	user93@example.com	\N
99	user94@example.com	\N
100	user95@example.com	\N
101	user96@example.com	\N
102	user97@example.com	\N
103	user98@example.com	\N
104	user99@example.com	\N
105	user100@example.com	\N
106	user101@example.com	\N
107	user102@example.com	\N
108	user103@example.com	\N
109	user104@example.com	\N
110	user105@example.com	\N
111	user106@example.com	\N
112	user107@example.com	\N
113	user108@example.com	\N
114	user109@example.com	\N
115	user110@example.com	\N
116	user111@example.com	\N
117	user112@example.com	\N
118	user113@example.com	\N
119	user114@example.com	\N
120	user115@example.com	\N
121	user116@example.com	\N
122	user117@example.com	\N
123	user118@example.com	\N
124	user119@example.com	\N
125	user120@example.com	\N
126	user121@example.com	\N
127	user122@example.com	\N
128	user123@example.com	\N
129	user124@example.com	\N
130	user125@example.com	\N
131	user126@example.com	\N
132	user127@example.com	\N
133	user128@example.com	\N
134	user129@example.com	\N
135	user130@example.com	\N
136	user131@example.com	\N
137	user132@example.com	\N
138	user133@example.com	\N
139	user134@example.com	\N
140	user135@example.com	\N
141	user136@example.com	\N
142	user137@example.com	\N
143	user138@example.com	\N
144	user139@example.com	\N
145	user140@example.com	\N
146	user141@example.com	\N
147	user142@example.com	\N
148	user143@example.com	\N
149	user144@example.com	\N
150	user145@example.com	\N
151	user146@example.com	\N
152	user147@example.com	\N
153	user148@example.com	\N
154	user149@example.com	\N
155	user150@example.com	\N
156	user151@example.com	\N
157	user152@example.com	\N
158	user153@example.com	\N
159	user154@example.com	\N
160	user155@example.com	\N
161	user156@example.com	\N
162	user157@example.com	\N
163	user158@example.com	\N
164	user159@example.com	\N
165	user160@example.com	\N
166	user161@example.com	\N
167	user162@example.com	\N
168	user163@example.com	\N
169	user164@example.com	\N
170	user165@example.com	\N
171	user166@example.com	\N
172	user167@example.com	\N
173	user168@example.com	\N
174	user169@example.com	\N
175	user170@example.com	\N
176	user171@example.com	\N
177	user172@example.com	\N
178	user173@example.com	\N
179	user174@example.com	\N
180	user175@example.com	\N
181	user176@example.com	\N
182	user177@example.com	\N
183	user178@example.com	\N
184	user179@example.com	\N
185	user180@example.com	\N
186	user181@example.com	\N
187	user182@example.com	\N
188	user183@example.com	\N
189	user184@example.com	\N
190	user185@example.com	\N
191	user186@example.com	\N
192	user187@example.com	\N
193	user188@example.com	\N
194	user189@example.com	\N
195	user190@example.com	\N
196	user191@example.com	\N
197	user192@example.com	\N
198	user193@example.com	\N
199	user194@example.com	\N
200	user195@example.com	\N
201	user196@example.com	\N
202	user197@example.com	\N
203	user198@example.com	\N
204	user199@example.com	\N
205	user200@example.com	\N
206	user201@example.com	\N
207	user202@example.com	\N
208	user203@example.com	\N
209	user204@example.com	\N
210	user205@example.com	\N
211	user206@example.com	\N
212	user207@example.com	\N
213	user208@example.com	\N
214	user209@example.com	\N
215	user210@example.com	\N
216	user211@example.com	\N
217	user212@example.com	\N
218	user213@example.com	\N
219	user214@example.com	\N
220	user215@example.com	\N
221	user216@example.com	\N
222	user217@example.com	\N
223	user218@example.com	\N
224	user219@example.com	\N
225	user220@example.com	\N
226	user221@example.com	\N
227	user222@example.com	\N
228	user223@example.com	\N
229	user224@example.com	\N
230	user225@example.com	\N
231	user226@example.com	\N
232	user227@example.com	\N
233	user228@example.com	\N
234	user229@example.com	\N
235	user230@example.com	\N
236	user231@example.com	\N
237	user232@example.com	\N
238	user233@example.com	\N
239	user234@example.com	\N
240	user235@example.com	\N
241	user236@example.com	\N
242	user237@example.com	\N
243	user238@example.com	\N
244	user239@example.com	\N
245	user240@example.com	\N
246	user241@example.com	\N
247	user242@example.com	\N
248	user243@example.com	\N
249	user244@example.com	\N
250	user245@example.com	\N
251	user246@example.com	\N
252	user247@example.com	\N
253	user248@example.com	\N
254	user249@example.com	\N
255	user250@example.com	\N
256	user251@example.com	\N
257	user252@example.com	\N
258	user253@example.com	\N
259	user254@example.com	\N
260	user255@example.com	\N
261	user256@example.com	\N
262	user257@example.com	\N
263	user258@example.com	\N
264	user259@example.com	\N
265	user260@example.com	\N
266	user261@example.com	\N
267	user262@example.com	\N
268	user263@example.com	\N
269	user264@example.com	\N
270	user265@example.com	\N
271	user266@example.com	\N
272	user267@example.com	\N
273	user268@example.com	\N
274	user269@example.com	\N
275	user270@example.com	\N
276	user271@example.com	\N
277	user272@example.com	\N
278	user273@example.com	\N
279	user274@example.com	\N
280	user275@example.com	\N
281	user276@example.com	\N
282	user277@example.com	\N
283	user278@example.com	\N
284	user279@example.com	\N
285	user280@example.com	\N
286	user281@example.com	\N
287	user282@example.com	\N
288	user283@example.com	\N
289	user284@example.com	\N
290	user285@example.com	\N
291	user286@example.com	\N
292	user287@example.com	\N
293	user288@example.com	\N
294	user289@example.com	\N
295	user290@example.com	\N
296	user291@example.com	\N
297	user292@example.com	\N
298	user293@example.com	\N
299	user294@example.com	\N
300	user295@example.com	\N
301	user296@example.com	\N
302	user297@example.com	\N
303	user298@example.com	\N
304	user299@example.com	\N
305	user300@example.com	\N
306	user301@example.com	\N
307	user302@example.com	\N
308	user303@example.com	\N
309	user304@example.com	\N
310	user305@example.com	\N
311	user306@example.com	\N
312	user307@example.com	\N
313	user308@example.com	\N
314	user309@example.com	\N
315	user310@example.com	\N
316	user311@example.com	\N
317	user312@example.com	\N
318	user313@example.com	\N
319	user314@example.com	\N
320	user315@example.com	\N
321	user316@example.com	\N
322	user317@example.com	\N
323	user318@example.com	\N
324	user319@example.com	\N
325	user320@example.com	\N
326	user321@example.com	\N
327	user322@example.com	\N
328	user323@example.com	\N
329	user324@example.com	\N
330	user325@example.com	\N
331	user326@example.com	\N
332	user327@example.com	\N
333	user328@example.com	\N
334	user329@example.com	\N
335	user330@example.com	\N
336	user331@example.com	\N
337	user332@example.com	\N
338	user333@example.com	\N
339	user334@example.com	\N
340	user335@example.com	\N
341	user336@example.com	\N
342	user337@example.com	\N
343	user338@example.com	\N
344	user339@example.com	\N
345	user340@example.com	\N
346	user341@example.com	\N
347	user342@example.com	\N
348	user343@example.com	\N
349	user344@example.com	\N
350	user345@example.com	\N
351	user346@example.com	\N
352	user347@example.com	\N
353	user348@example.com	\N
354	user349@example.com	\N
355	user350@example.com	\N
356	user351@example.com	\N
357	user352@example.com	\N
358	user353@example.com	\N
359	user354@example.com	\N
360	user355@example.com	\N
361	user356@example.com	\N
362	user357@example.com	\N
363	user358@example.com	\N
364	user359@example.com	\N
365	user360@example.com	\N
366	user361@example.com	\N
367	user362@example.com	\N
368	user363@example.com	\N
369	user364@example.com	\N
370	user365@example.com	\N
371	user366@example.com	\N
372	user367@example.com	\N
373	user368@example.com	\N
374	user369@example.com	\N
375	user370@example.com	\N
376	user371@example.com	\N
377	user372@example.com	\N
378	user373@example.com	\N
379	user374@example.com	\N
380	user375@example.com	\N
381	user376@example.com	\N
382	user377@example.com	\N
383	user378@example.com	\N
384	user379@example.com	\N
385	user380@example.com	\N
386	user381@example.com	\N
387	user382@example.com	\N
388	user383@example.com	\N
389	user384@example.com	\N
390	user385@example.com	\N
391	user386@example.com	\N
392	user387@example.com	\N
393	user388@example.com	\N
394	user389@example.com	\N
395	user390@example.com	\N
396	user391@example.com	\N
397	user392@example.com	\N
398	user393@example.com	\N
399	user394@example.com	\N
400	user395@example.com	\N
401	user396@example.com	\N
402	user397@example.com	\N
403	user398@example.com	\N
404	user399@example.com	\N
405	user400@example.com	\N
406	user401@example.com	\N
407	user402@example.com	\N
408	user403@example.com	\N
409	user404@example.com	\N
410	user405@example.com	\N
411	user406@example.com	\N
412	user407@example.com	\N
413	user408@example.com	\N
414	user409@example.com	\N
415	user410@example.com	\N
416	user411@example.com	\N
417	user412@example.com	\N
418	user413@example.com	\N
419	user414@example.com	\N
420	user415@example.com	\N
421	user416@example.com	\N
422	user417@example.com	\N
423	user418@example.com	\N
424	user419@example.com	\N
425	user420@example.com	\N
426	user421@example.com	\N
427	user422@example.com	\N
428	user423@example.com	\N
429	user424@example.com	\N
430	user425@example.com	\N
431	user426@example.com	\N
432	user427@example.com	\N
433	user428@example.com	\N
434	user429@example.com	\N
435	user430@example.com	\N
436	user431@example.com	\N
437	user432@example.com	\N
438	user433@example.com	\N
439	user434@example.com	\N
440	user435@example.com	\N
441	user436@example.com	\N
442	user437@example.com	\N
443	user438@example.com	\N
444	user439@example.com	\N
445	user440@example.com	\N
446	user441@example.com	\N
447	user442@example.com	\N
448	user443@example.com	\N
449	user444@example.com	\N
450	user445@example.com	\N
451	user446@example.com	\N
452	user447@example.com	\N
453	user448@example.com	\N
454	user449@example.com	\N
455	user450@example.com	\N
456	user451@example.com	\N
457	user452@example.com	\N
458	user453@example.com	\N
459	user454@example.com	\N
460	user455@example.com	\N
461	user456@example.com	\N
462	user457@example.com	\N
463	user458@example.com	\N
464	user459@example.com	\N
465	user460@example.com	\N
466	user461@example.com	\N
467	user462@example.com	\N
468	user463@example.com	\N
469	user464@example.com	\N
470	user465@example.com	\N
471	user466@example.com	\N
472	user467@example.com	\N
473	user468@example.com	\N
474	user469@example.com	\N
475	user470@example.com	\N
476	user471@example.com	\N
477	user472@example.com	\N
478	user473@example.com	\N
479	user474@example.com	\N
480	user475@example.com	\N
481	user476@example.com	\N
482	user477@example.com	\N
483	user478@example.com	\N
484	user479@example.com	\N
485	user480@example.com	\N
486	user481@example.com	\N
487	user482@example.com	\N
488	user483@example.com	\N
489	user484@example.com	\N
490	user485@example.com	\N
491	user486@example.com	\N
492	user487@example.com	\N
493	user488@example.com	\N
494	user489@example.com	\N
495	user490@example.com	\N
496	user491@example.com	\N
497	user492@example.com	\N
498	user493@example.com	\N
499	user494@example.com	\N
500	user495@example.com	\N
501	user496@example.com	\N
502	user497@example.com	\N
503	user498@example.com	\N
504	user499@example.com	\N
505	user500@example.com	\N
506	user501@example.com	\N
507	user502@example.com	\N
508	user503@example.com	\N
509	user504@example.com	\N
510	user505@example.com	\N
511	user506@example.com	\N
512	user507@example.com	\N
513	user508@example.com	\N
514	user509@example.com	\N
515	user510@example.com	\N
516	user511@example.com	\N
517	user512@example.com	\N
518	user513@example.com	\N
519	user514@example.com	\N
520	user515@example.com	\N
521	user516@example.com	\N
522	user517@example.com	\N
523	user518@example.com	\N
524	user519@example.com	\N
525	user520@example.com	\N
526	user521@example.com	\N
527	user522@example.com	\N
528	user523@example.com	\N
529	user524@example.com	\N
530	user525@example.com	\N
531	user526@example.com	\N
532	user527@example.com	\N
533	user528@example.com	\N
534	user529@example.com	\N
535	user530@example.com	\N
536	user531@example.com	\N
537	user532@example.com	\N
538	user533@example.com	\N
539	user534@example.com	\N
540	user535@example.com	\N
541	user536@example.com	\N
542	user537@example.com	\N
543	user538@example.com	\N
544	user539@example.com	\N
545	user540@example.com	\N
546	user541@example.com	\N
547	user542@example.com	\N
548	user543@example.com	\N
549	user544@example.com	\N
550	user545@example.com	\N
551	user546@example.com	\N
552	user547@example.com	\N
553	user548@example.com	\N
554	user549@example.com	\N
555	user550@example.com	\N
556	user551@example.com	\N
557	user552@example.com	\N
558	user553@example.com	\N
559	user554@example.com	\N
560	user555@example.com	\N
561	user556@example.com	\N
562	user557@example.com	\N
563	user558@example.com	\N
564	user559@example.com	\N
565	user560@example.com	\N
566	user561@example.com	\N
567	user562@example.com	\N
568	user563@example.com	\N
569	user564@example.com	\N
570	user565@example.com	\N
571	user566@example.com	\N
572	user567@example.com	\N
573	user568@example.com	\N
574	user569@example.com	\N
575	user570@example.com	\N
576	user571@example.com	\N
577	user572@example.com	\N
578	user573@example.com	\N
579	user574@example.com	\N
580	user575@example.com	\N
581	user576@example.com	\N
582	user577@example.com	\N
583	user578@example.com	\N
584	user579@example.com	\N
585	user580@example.com	\N
586	user581@example.com	\N
587	user582@example.com	\N
588	user583@example.com	\N
589	user584@example.com	\N
590	user585@example.com	\N
591	user586@example.com	\N
592	user587@example.com	\N
593	user588@example.com	\N
594	user589@example.com	\N
595	user590@example.com	\N
596	user591@example.com	\N
597	user592@example.com	\N
598	user593@example.com	\N
599	user594@example.com	\N
600	user595@example.com	\N
601	user596@example.com	\N
602	user597@example.com	\N
603	user598@example.com	\N
604	user599@example.com	\N
605	user600@example.com	\N
606	user601@example.com	\N
607	user602@example.com	\N
608	user603@example.com	\N
609	user604@example.com	\N
610	user605@example.com	\N
611	user606@example.com	\N
612	user607@example.com	\N
613	user608@example.com	\N
614	user609@example.com	\N
615	user610@example.com	\N
616	user611@example.com	\N
617	user612@example.com	\N
618	user613@example.com	\N
619	user614@example.com	\N
620	user615@example.com	\N
621	user616@example.com	\N
622	user617@example.com	\N
623	user618@example.com	\N
624	user619@example.com	\N
625	user620@example.com	\N
626	user621@example.com	\N
627	user622@example.com	\N
628	user623@example.com	\N
629	user624@example.com	\N
630	user625@example.com	\N
631	user626@example.com	\N
632	user627@example.com	\N
633	user628@example.com	\N
634	user629@example.com	\N
635	user630@example.com	\N
636	user631@example.com	\N
637	user632@example.com	\N
638	user633@example.com	\N
639	user634@example.com	\N
640	user635@example.com	\N
641	user636@example.com	\N
642	user637@example.com	\N
643	user638@example.com	\N
644	user639@example.com	\N
645	user640@example.com	\N
646	user641@example.com	\N
647	user642@example.com	\N
648	user643@example.com	\N
649	user644@example.com	\N
650	user645@example.com	\N
651	user646@example.com	\N
652	user647@example.com	\N
653	user648@example.com	\N
654	user649@example.com	\N
655	user650@example.com	\N
656	user651@example.com	\N
657	user652@example.com	\N
658	user653@example.com	\N
659	user654@example.com	\N
660	user655@example.com	\N
661	user656@example.com	\N
662	user657@example.com	\N
663	user658@example.com	\N
664	user659@example.com	\N
665	user660@example.com	\N
666	user661@example.com	\N
667	user662@example.com	\N
668	user663@example.com	\N
669	user664@example.com	\N
670	user665@example.com	\N
671	user666@example.com	\N
672	user667@example.com	\N
673	user668@example.com	\N
674	user669@example.com	\N
675	user670@example.com	\N
676	user671@example.com	\N
677	user672@example.com	\N
678	user673@example.com	\N
679	user674@example.com	\N
680	user675@example.com	\N
681	user676@example.com	\N
682	user677@example.com	\N
683	user678@example.com	\N
684	user679@example.com	\N
685	user680@example.com	\N
686	user681@example.com	\N
687	user682@example.com	\N
688	user683@example.com	\N
689	user684@example.com	\N
690	user685@example.com	\N
691	user686@example.com	\N
692	user687@example.com	\N
693	user688@example.com	\N
694	user689@example.com	\N
695	user690@example.com	\N
696	user691@example.com	\N
697	user692@example.com	\N
698	user693@example.com	\N
699	user694@example.com	\N
700	user695@example.com	\N
701	user696@example.com	\N
702	user697@example.com	\N
703	user698@example.com	\N
704	user699@example.com	\N
705	user700@example.com	\N
706	user701@example.com	\N
707	user702@example.com	\N
708	user703@example.com	\N
709	user704@example.com	\N
710	user705@example.com	\N
711	user706@example.com	\N
712	user707@example.com	\N
713	user708@example.com	\N
714	user709@example.com	\N
715	user710@example.com	\N
716	user711@example.com	\N
717	user712@example.com	\N
718	user713@example.com	\N
719	user714@example.com	\N
720	user715@example.com	\N
721	user716@example.com	\N
722	user717@example.com	\N
723	user718@example.com	\N
724	user719@example.com	\N
725	user720@example.com	\N
726	user721@example.com	\N
727	user722@example.com	\N
728	user723@example.com	\N
729	user724@example.com	\N
730	user725@example.com	\N
731	user726@example.com	\N
732	user727@example.com	\N
733	user728@example.com	\N
734	user729@example.com	\N
735	user730@example.com	\N
736	user731@example.com	\N
737	user732@example.com	\N
738	user733@example.com	\N
739	user734@example.com	\N
740	user735@example.com	\N
741	user736@example.com	\N
742	user737@example.com	\N
743	user738@example.com	\N
744	user739@example.com	\N
745	user740@example.com	\N
746	user741@example.com	\N
747	user742@example.com	\N
748	user743@example.com	\N
749	user744@example.com	\N
750	user745@example.com	\N
751	user746@example.com	\N
752	user747@example.com	\N
753	user748@example.com	\N
754	user749@example.com	\N
755	user750@example.com	\N
756	user751@example.com	\N
757	user752@example.com	\N
758	user753@example.com	\N
759	user754@example.com	\N
760	user755@example.com	\N
761	user756@example.com	\N
762	user757@example.com	\N
763	user758@example.com	\N
764	user759@example.com	\N
765	user760@example.com	\N
766	user761@example.com	\N
767	user762@example.com	\N
768	user763@example.com	\N
769	user764@example.com	\N
770	user765@example.com	\N
771	user766@example.com	\N
772	user767@example.com	\N
773	user768@example.com	\N
774	user769@example.com	\N
775	user770@example.com	\N
776	user771@example.com	\N
777	user772@example.com	\N
778	user773@example.com	\N
779	user774@example.com	\N
780	user775@example.com	\N
781	user776@example.com	\N
782	user777@example.com	\N
783	user778@example.com	\N
784	user779@example.com	\N
785	user780@example.com	\N
786	user781@example.com	\N
787	user782@example.com	\N
788	user783@example.com	\N
789	user784@example.com	\N
790	user785@example.com	\N
791	user786@example.com	\N
792	user787@example.com	\N
793	user788@example.com	\N
794	user789@example.com	\N
795	user790@example.com	\N
796	user791@example.com	\N
797	user792@example.com	\N
798	user793@example.com	\N
799	user794@example.com	\N
800	user795@example.com	\N
801	user796@example.com	\N
802	user797@example.com	\N
803	user798@example.com	\N
804	user799@example.com	\N
805	user800@example.com	\N
806	user801@example.com	\N
807	user802@example.com	\N
808	user803@example.com	\N
809	user804@example.com	\N
810	user805@example.com	\N
811	user806@example.com	\N
812	user807@example.com	\N
813	user808@example.com	\N
814	user809@example.com	\N
815	user810@example.com	\N
816	user811@example.com	\N
817	user812@example.com	\N
818	user813@example.com	\N
819	user814@example.com	\N
820	user815@example.com	\N
821	user816@example.com	\N
822	user817@example.com	\N
823	user818@example.com	\N
824	user819@example.com	\N
825	user820@example.com	\N
826	user821@example.com	\N
827	user822@example.com	\N
828	user823@example.com	\N
829	user824@example.com	\N
830	user825@example.com	\N
831	user826@example.com	\N
832	user827@example.com	\N
833	user828@example.com	\N
834	user829@example.com	\N
835	user830@example.com	\N
836	user831@example.com	\N
837	user832@example.com	\N
838	user833@example.com	\N
839	user834@example.com	\N
840	user835@example.com	\N
841	user836@example.com	\N
842	user837@example.com	\N
843	user838@example.com	\N
844	user839@example.com	\N
845	user840@example.com	\N
846	user841@example.com	\N
847	user842@example.com	\N
848	user843@example.com	\N
849	user844@example.com	\N
850	user845@example.com	\N
851	user846@example.com	\N
852	user847@example.com	\N
853	user848@example.com	\N
854	user849@example.com	\N
855	user850@example.com	\N
856	user851@example.com	\N
857	user852@example.com	\N
858	user853@example.com	\N
859	user854@example.com	\N
860	user855@example.com	\N
861	user856@example.com	\N
862	user857@example.com	\N
863	user858@example.com	\N
864	user859@example.com	\N
865	user860@example.com	\N
866	user861@example.com	\N
867	user862@example.com	\N
868	user863@example.com	\N
869	user864@example.com	\N
870	user865@example.com	\N
871	user866@example.com	\N
872	user867@example.com	\N
873	user868@example.com	\N
874	user869@example.com	\N
875	user870@example.com	\N
876	user871@example.com	\N
877	user872@example.com	\N
878	user873@example.com	\N
879	user874@example.com	\N
880	user875@example.com	\N
881	user876@example.com	\N
882	user877@example.com	\N
883	user878@example.com	\N
884	user879@example.com	\N
885	user880@example.com	\N
886	user881@example.com	\N
887	user882@example.com	\N
888	user883@example.com	\N
889	user884@example.com	\N
890	user885@example.com	\N
891	user886@example.com	\N
892	user887@example.com	\N
893	user888@example.com	\N
894	user889@example.com	\N
895	user890@example.com	\N
896	user891@example.com	\N
897	user892@example.com	\N
898	user893@example.com	\N
899	user894@example.com	\N
900	user895@example.com	\N
901	user896@example.com	\N
902	user897@example.com	\N
903	user898@example.com	\N
904	user899@example.com	\N
905	user900@example.com	\N
906	user901@example.com	\N
907	user902@example.com	\N
908	user903@example.com	\N
909	user904@example.com	\N
910	user905@example.com	\N
911	user906@example.com	\N
912	user907@example.com	\N
913	user908@example.com	\N
914	user909@example.com	\N
915	user910@example.com	\N
916	user911@example.com	\N
917	user912@example.com	\N
918	user913@example.com	\N
919	user914@example.com	\N
920	user915@example.com	\N
921	user916@example.com	\N
922	user917@example.com	\N
923	user918@example.com	\N
924	user919@example.com	\N
925	user920@example.com	\N
926	user921@example.com	\N
927	user922@example.com	\N
928	user923@example.com	\N
929	user924@example.com	\N
930	user925@example.com	\N
931	user926@example.com	\N
932	user927@example.com	\N
933	user928@example.com	\N
934	user929@example.com	\N
935	user930@example.com	\N
936	user931@example.com	\N
937	user932@example.com	\N
938	user933@example.com	\N
939	user934@example.com	\N
940	user935@example.com	\N
941	user936@example.com	\N
942	user937@example.com	\N
943	user938@example.com	\N
944	user939@example.com	\N
945	user940@example.com	\N
946	user941@example.com	\N
947	user942@example.com	\N
948	user943@example.com	\N
949	user944@example.com	\N
950	user945@example.com	\N
951	user946@example.com	\N
952	user947@example.com	\N
953	user948@example.com	\N
954	user949@example.com	\N
955	user950@example.com	\N
956	user951@example.com	\N
957	user952@example.com	\N
958	user953@example.com	\N
959	user954@example.com	\N
960	user955@example.com	\N
961	user956@example.com	\N
962	user957@example.com	\N
963	user958@example.com	\N
964	user959@example.com	\N
965	user960@example.com	\N
966	user961@example.com	\N
967	user962@example.com	\N
968	user963@example.com	\N
969	user964@example.com	\N
970	user965@example.com	\N
971	user966@example.com	\N
972	user967@example.com	\N
973	user968@example.com	\N
974	user969@example.com	\N
975	user970@example.com	\N
976	user971@example.com	\N
977	user972@example.com	\N
978	user973@example.com	\N
979	user974@example.com	\N
980	user975@example.com	\N
981	user976@example.com	\N
982	user977@example.com	\N
983	user978@example.com	\N
984	user979@example.com	\N
985	user980@example.com	\N
986	user981@example.com	\N
987	user982@example.com	\N
988	user983@example.com	\N
989	user984@example.com	\N
990	user985@example.com	\N
991	user986@example.com	\N
992	user987@example.com	\N
993	user988@example.com	\N
994	user989@example.com	\N
995	user990@example.com	\N
996	user991@example.com	\N
997	user992@example.com	\N
998	user993@example.com	\N
999	user994@example.com	\N
1000	user995@example.com	\N
1001	user996@example.com	\N
1002	user997@example.com	\N
1003	user998@example.com	\N
1004	user999@example.com	\N
1005	user0@test.com	\N
1006	user1@test.com	\N
1007	user2@test.com	\N
1008	user3@test.com	\N
1009	user4@test.com	\N
1010	user5@test.com	\N
1011	user6@test.com	\N
1012	user7@test.com	\N
1013	user8@test.com	\N
1014	user9@test.com	\N
1015	user10@test.com	\N
1016	user11@test.com	\N
1017	user12@test.com	\N
1018	user13@test.com	\N
1019	user14@test.com	\N
1020	user15@test.com	\N
1021	user16@test.com	\N
1022	user17@test.com	\N
1023	user18@test.com	\N
1024	user19@test.com	\N
1025	user20@test.com	\N
1026	user21@test.com	\N
1027	user22@test.com	\N
1028	user23@test.com	\N
1029	user24@test.com	\N
1030	user25@test.com	\N
1031	user26@test.com	\N
1032	user27@test.com	\N
1033	user28@test.com	\N
1034	user29@test.com	\N
1035	user30@test.com	\N
1036	user31@test.com	\N
1037	user32@test.com	\N
1038	user33@test.com	\N
1039	user34@test.com	\N
1040	user35@test.com	\N
1041	user36@test.com	\N
1042	user37@test.com	\N
1043	user38@test.com	\N
1044	user39@test.com	\N
1045	user40@test.com	\N
1046	user41@test.com	\N
1047	user42@test.com	\N
1048	user43@test.com	\N
1049	user44@test.com	\N
1050	user45@test.com	\N
1051	user46@test.com	\N
1052	user47@test.com	\N
1053	user48@test.com	\N
1054	user49@test.com	\N
1055	user50@test.com	\N
1056	user51@test.com	\N
1057	user52@test.com	\N
1058	user53@test.com	\N
1059	user54@test.com	\N
1060	user55@test.com	\N
1061	user56@test.com	\N
1062	user57@test.com	\N
1063	user58@test.com	\N
1064	user59@test.com	\N
1065	user60@test.com	\N
1066	user61@test.com	\N
1067	user62@test.com	\N
1068	user63@test.com	\N
1069	user64@test.com	\N
1070	user65@test.com	\N
1071	user66@test.com	\N
1072	user67@test.com	\N
1073	user68@test.com	\N
1074	user69@test.com	\N
1075	user70@test.com	\N
1076	user71@test.com	\N
1077	user72@test.com	\N
1078	user73@test.com	\N
1079	user74@test.com	\N
1080	user75@test.com	\N
1081	user76@test.com	\N
1082	user77@test.com	\N
1083	user78@test.com	\N
1084	user79@test.com	\N
1085	user80@test.com	\N
1086	user81@test.com	\N
1087	user82@test.com	\N
1088	user83@test.com	\N
1089	user84@test.com	\N
1090	user85@test.com	\N
1091	user86@test.com	\N
1092	user87@test.com	\N
1093	user88@test.com	\N
1094	user89@test.com	\N
1095	user90@test.com	\N
1096	user91@test.com	\N
1097	user92@test.com	\N
1098	user93@test.com	\N
1099	user94@test.com	\N
1100	user95@test.com	\N
1101	user96@test.com	\N
1102	user97@test.com	\N
1103	user98@test.com	\N
1104	user99@test.com	\N
1105	user100@test.com	\N
1106	user101@test.com	\N
1107	user102@test.com	\N
1108	user103@test.com	\N
1109	user104@test.com	\N
1110	user105@test.com	\N
1111	user106@test.com	\N
1112	user107@test.com	\N
1113	user108@test.com	\N
1114	user109@test.com	\N
1115	user110@test.com	\N
1116	user111@test.com	\N
1117	user112@test.com	\N
1118	user113@test.com	\N
1119	user114@test.com	\N
1120	user115@test.com	\N
1121	user116@test.com	\N
1122	user117@test.com	\N
1123	user118@test.com	\N
1124	user119@test.com	\N
1125	user120@test.com	\N
1126	user121@test.com	\N
1127	user122@test.com	\N
1128	user123@test.com	\N
1129	user124@test.com	\N
1130	user125@test.com	\N
1131	user126@test.com	\N
1132	user127@test.com	\N
1133	user128@test.com	\N
1134	user129@test.com	\N
1135	user130@test.com	\N
1136	user131@test.com	\N
1137	user132@test.com	\N
1138	user133@test.com	\N
1139	user134@test.com	\N
1140	user135@test.com	\N
1141	user136@test.com	\N
1142	user137@test.com	\N
1143	user138@test.com	\N
1144	user139@test.com	\N
1145	user140@test.com	\N
1146	user141@test.com	\N
1147	user142@test.com	\N
1148	user143@test.com	\N
1149	user144@test.com	\N
1150	user145@test.com	\N
1151	user146@test.com	\N
1152	user147@test.com	\N
1153	user148@test.com	\N
1154	user149@test.com	\N
1155	user150@test.com	\N
1156	user151@test.com	\N
1157	user152@test.com	\N
1158	user153@test.com	\N
1159	user154@test.com	\N
1160	user155@test.com	\N
1161	user156@test.com	\N
1162	user157@test.com	\N
1163	user158@test.com	\N
1164	user159@test.com	\N
1165	user160@test.com	\N
1166	user161@test.com	\N
1167	user162@test.com	\N
1168	user163@test.com	\N
1169	user164@test.com	\N
1170	user165@test.com	\N
1171	user166@test.com	\N
1172	user167@test.com	\N
1173	user168@test.com	\N
1174	user169@test.com	\N
1175	user170@test.com	\N
1176	user171@test.com	\N
1177	user172@test.com	\N
1178	user173@test.com	\N
1179	user174@test.com	\N
1180	user175@test.com	\N
1181	user176@test.com	\N
1182	user177@test.com	\N
1183	user178@test.com	\N
1184	user179@test.com	\N
1185	user180@test.com	\N
1186	user181@test.com	\N
1187	user182@test.com	\N
1188	user183@test.com	\N
1189	user184@test.com	\N
1190	user185@test.com	\N
1191	user186@test.com	\N
1192	user187@test.com	\N
1193	user188@test.com	\N
1194	user189@test.com	\N
1195	user190@test.com	\N
1196	user191@test.com	\N
1197	user192@test.com	\N
1198	user193@test.com	\N
1199	user194@test.com	\N
1200	user195@test.com	\N
1201	user196@test.com	\N
1202	user197@test.com	\N
1203	user198@test.com	\N
1204	user199@test.com	\N
1205	user200@test.com	\N
1206	user201@test.com	\N
1207	user202@test.com	\N
1208	user203@test.com	\N
1209	user204@test.com	\N
1210	user205@test.com	\N
1211	user206@test.com	\N
1212	user207@test.com	\N
1213	user208@test.com	\N
1214	user209@test.com	\N
1215	user210@test.com	\N
1216	user211@test.com	\N
1217	user212@test.com	\N
1218	user213@test.com	\N
1219	user214@test.com	\N
1220	user215@test.com	\N
1221	user216@test.com	\N
1222	user217@test.com	\N
1223	user218@test.com	\N
1224	user219@test.com	\N
1225	user220@test.com	\N
1226	user221@test.com	\N
1227	user222@test.com	\N
1228	user223@test.com	\N
1229	user224@test.com	\N
1230	user225@test.com	\N
1231	user226@test.com	\N
1232	user227@test.com	\N
1233	user228@test.com	\N
1234	user229@test.com	\N
1235	user230@test.com	\N
1236	user231@test.com	\N
1237	user232@test.com	\N
1238	user233@test.com	\N
1239	user234@test.com	\N
1240	user235@test.com	\N
1241	user236@test.com	\N
1242	user237@test.com	\N
1243	user238@test.com	\N
1244	user239@test.com	\N
1245	user240@test.com	\N
1246	user241@test.com	\N
1247	user242@test.com	\N
1248	user243@test.com	\N
1249	user244@test.com	\N
1250	user245@test.com	\N
1251	user246@test.com	\N
1252	user247@test.com	\N
1253	user248@test.com	\N
1254	user249@test.com	\N
1255	user250@test.com	\N
1256	user251@test.com	\N
1257	user252@test.com	\N
1258	user253@test.com	\N
1259	user254@test.com	\N
1260	user255@test.com	\N
1261	user256@test.com	\N
1262	user257@test.com	\N
1263	user258@test.com	\N
1264	user259@test.com	\N
1265	user260@test.com	\N
1266	user261@test.com	\N
1267	user262@test.com	\N
1268	user263@test.com	\N
1269	user264@test.com	\N
1270	user265@test.com	\N
1271	user266@test.com	\N
1272	user267@test.com	\N
1273	user268@test.com	\N
1274	user269@test.com	\N
1275	user270@test.com	\N
1276	user271@test.com	\N
1277	user272@test.com	\N
1278	user273@test.com	\N
1279	user274@test.com	\N
1280	user275@test.com	\N
1281	user276@test.com	\N
1282	user277@test.com	\N
1283	user278@test.com	\N
1284	user279@test.com	\N
1285	user280@test.com	\N
1286	user281@test.com	\N
1287	user282@test.com	\N
1288	user283@test.com	\N
1289	user284@test.com	\N
1290	user285@test.com	\N
1291	user286@test.com	\N
1292	user287@test.com	\N
1293	user288@test.com	\N
1294	user289@test.com	\N
1295	user290@test.com	\N
1296	user291@test.com	\N
1297	user292@test.com	\N
1298	user293@test.com	\N
1299	user294@test.com	\N
1300	user295@test.com	\N
1301	user296@test.com	\N
1302	user297@test.com	\N
1303	user298@test.com	\N
1304	user299@test.com	\N
1305	user300@test.com	\N
1306	user301@test.com	\N
1307	user302@test.com	\N
1308	user303@test.com	\N
1309	user304@test.com	\N
1310	user305@test.com	\N
1311	user306@test.com	\N
1312	user307@test.com	\N
1313	user308@test.com	\N
1314	user309@test.com	\N
1315	user310@test.com	\N
1316	user311@test.com	\N
1317	user312@test.com	\N
1318	user313@test.com	\N
1319	user314@test.com	\N
1320	user315@test.com	\N
1321	user316@test.com	\N
1322	user317@test.com	\N
1323	user318@test.com	\N
1324	user319@test.com	\N
1325	user320@test.com	\N
1326	user321@test.com	\N
1327	user322@test.com	\N
1328	user323@test.com	\N
1329	user324@test.com	\N
1330	user325@test.com	\N
1331	user326@test.com	\N
1332	user327@test.com	\N
1333	user328@test.com	\N
1334	user329@test.com	\N
1335	user330@test.com	\N
1336	user331@test.com	\N
1337	user332@test.com	\N
1338	user333@test.com	\N
1339	user334@test.com	\N
1340	user335@test.com	\N
1341	user336@test.com	\N
1342	user337@test.com	\N
1343	user338@test.com	\N
1344	user339@test.com	\N
1345	user340@test.com	\N
1346	user341@test.com	\N
1347	user342@test.com	\N
1348	user343@test.com	\N
1349	user344@test.com	\N
1350	user345@test.com	\N
1351	user346@test.com	\N
1352	user347@test.com	\N
1353	user348@test.com	\N
1354	user349@test.com	\N
1355	user350@test.com	\N
1356	user351@test.com	\N
1357	user352@test.com	\N
1358	user353@test.com	\N
1359	user354@test.com	\N
1360	user355@test.com	\N
1361	user356@test.com	\N
1362	user357@test.com	\N
1363	user358@test.com	\N
1364	user359@test.com	\N
1365	user360@test.com	\N
1366	user361@test.com	\N
1367	user362@test.com	\N
1368	user363@test.com	\N
1369	user364@test.com	\N
1370	user365@test.com	\N
1371	user366@test.com	\N
1372	user367@test.com	\N
1373	user368@test.com	\N
1374	user369@test.com	\N
1375	user370@test.com	\N
1376	user371@test.com	\N
1377	user372@test.com	\N
1378	user373@test.com	\N
1379	user374@test.com	\N
1380	user375@test.com	\N
1381	user376@test.com	\N
1382	user377@test.com	\N
1383	user378@test.com	\N
1384	user379@test.com	\N
1385	user380@test.com	\N
1386	user381@test.com	\N
1387	user382@test.com	\N
1388	user383@test.com	\N
1389	user384@test.com	\N
1390	user385@test.com	\N
1391	user386@test.com	\N
1392	user387@test.com	\N
1393	user388@test.com	\N
1394	user389@test.com	\N
1395	user390@test.com	\N
1396	user391@test.com	\N
1397	user392@test.com	\N
1398	user393@test.com	\N
1399	user394@test.com	\N
1400	user395@test.com	\N
1401	user396@test.com	\N
1402	user397@test.com	\N
1403	user398@test.com	\N
1404	user399@test.com	\N
1405	user400@test.com	\N
1406	user401@test.com	\N
1407	user402@test.com	\N
1408	user403@test.com	\N
1409	user404@test.com	\N
1410	user405@test.com	\N
1411	user406@test.com	\N
1412	user407@test.com	\N
1413	user408@test.com	\N
1414	user409@test.com	\N
1415	user410@test.com	\N
1416	user411@test.com	\N
1417	user412@test.com	\N
1418	user413@test.com	\N
1419	user414@test.com	\N
1420	user415@test.com	\N
1421	user416@test.com	\N
1422	user417@test.com	\N
1423	user418@test.com	\N
1424	user419@test.com	\N
1425	user420@test.com	\N
1426	user421@test.com	\N
1427	user422@test.com	\N
1428	user423@test.com	\N
1429	user424@test.com	\N
1430	user425@test.com	\N
1431	user426@test.com	\N
1432	user427@test.com	\N
1433	user428@test.com	\N
1434	user429@test.com	\N
1435	user430@test.com	\N
1436	user431@test.com	\N
1437	user432@test.com	\N
1438	user433@test.com	\N
1439	user434@test.com	\N
1440	user435@test.com	\N
1441	user436@test.com	\N
1442	user437@test.com	\N
1443	user438@test.com	\N
1444	user439@test.com	\N
1445	user440@test.com	\N
1446	user441@test.com	\N
1447	user442@test.com	\N
1448	user443@test.com	\N
1449	user444@test.com	\N
1450	user445@test.com	\N
1451	user446@test.com	\N
1452	user447@test.com	\N
1453	user448@test.com	\N
1454	user449@test.com	\N
1455	user450@test.com	\N
1456	user451@test.com	\N
1457	user452@test.com	\N
1458	user453@test.com	\N
1459	user454@test.com	\N
1460	user455@test.com	\N
1461	user456@test.com	\N
1462	user457@test.com	\N
1463	user458@test.com	\N
1464	user459@test.com	\N
1465	user460@test.com	\N
1466	user461@test.com	\N
1467	user462@test.com	\N
1468	user463@test.com	\N
1469	user464@test.com	\N
1470	user465@test.com	\N
1471	user466@test.com	\N
1472	user467@test.com	\N
1473	user468@test.com	\N
1474	user469@test.com	\N
1475	user470@test.com	\N
1476	user471@test.com	\N
1477	user472@test.com	\N
1478	user473@test.com	\N
1479	user474@test.com	\N
1480	user475@test.com	\N
1481	user476@test.com	\N
1482	user477@test.com	\N
1483	user478@test.com	\N
1484	user479@test.com	\N
1485	user480@test.com	\N
1486	user481@test.com	\N
1487	user482@test.com	\N
1488	user483@test.com	\N
1489	user484@test.com	\N
1490	user485@test.com	\N
1491	user486@test.com	\N
1492	user487@test.com	\N
1493	user488@test.com	\N
1494	user489@test.com	\N
1495	user490@test.com	\N
1496	user491@test.com	\N
1497	user492@test.com	\N
1498	user493@test.com	\N
1499	user494@test.com	\N
1500	user495@test.com	\N
1501	user496@test.com	\N
1502	user497@test.com	\N
1503	user498@test.com	\N
1504	user499@test.com	\N
1505	user500@test.com	\N
1506	user501@test.com	\N
1507	user502@test.com	\N
1508	user503@test.com	\N
1509	user504@test.com	\N
1510	user505@test.com	\N
1511	user506@test.com	\N
1512	user507@test.com	\N
1513	user508@test.com	\N
1514	user509@test.com	\N
1515	user510@test.com	\N
1516	user511@test.com	\N
1517	user512@test.com	\N
1518	user513@test.com	\N
1519	user514@test.com	\N
1520	user515@test.com	\N
1521	user516@test.com	\N
1522	user517@test.com	\N
1523	user518@test.com	\N
1524	user519@test.com	\N
1525	user520@test.com	\N
1526	user521@test.com	\N
1527	user522@test.com	\N
1528	user523@test.com	\N
1529	user524@test.com	\N
1530	user525@test.com	\N
1531	user526@test.com	\N
1532	user527@test.com	\N
1533	user528@test.com	\N
1534	user529@test.com	\N
1535	user530@test.com	\N
1536	user531@test.com	\N
1537	user532@test.com	\N
1538	user533@test.com	\N
1539	user534@test.com	\N
1540	user535@test.com	\N
1541	user536@test.com	\N
1542	user537@test.com	\N
1543	user538@test.com	\N
1544	user539@test.com	\N
1545	user540@test.com	\N
1546	user541@test.com	\N
1547	user542@test.com	\N
1548	user543@test.com	\N
1549	user544@test.com	\N
1550	user545@test.com	\N
1551	user546@test.com	\N
1552	user547@test.com	\N
1553	user548@test.com	\N
1554	user549@test.com	\N
1555	user550@test.com	\N
1556	user551@test.com	\N
1557	user552@test.com	\N
1558	user553@test.com	\N
1559	user554@test.com	\N
1560	user555@test.com	\N
1561	user556@test.com	\N
1562	user557@test.com	\N
1563	user558@test.com	\N
1564	user559@test.com	\N
1565	user560@test.com	\N
1566	user561@test.com	\N
1567	user562@test.com	\N
1568	user563@test.com	\N
1569	user564@test.com	\N
1570	user565@test.com	\N
1571	user566@test.com	\N
1572	user567@test.com	\N
1573	user568@test.com	\N
1574	user569@test.com	\N
1575	user570@test.com	\N
1576	user571@test.com	\N
1577	user572@test.com	\N
1578	user573@test.com	\N
1579	user574@test.com	\N
1580	user575@test.com	\N
1581	user576@test.com	\N
1582	user577@test.com	\N
1583	user578@test.com	\N
1584	user579@test.com	\N
1585	user580@test.com	\N
1586	user581@test.com	\N
1587	user582@test.com	\N
1588	user583@test.com	\N
1589	user584@test.com	\N
1590	user585@test.com	\N
1591	user586@test.com	\N
1592	user587@test.com	\N
1593	user588@test.com	\N
1594	user589@test.com	\N
1595	user590@test.com	\N
1596	user591@test.com	\N
1597	user592@test.com	\N
1598	user593@test.com	\N
1599	user594@test.com	\N
1600	user595@test.com	\N
1601	user596@test.com	\N
1602	user597@test.com	\N
1603	user598@test.com	\N
1604	user599@test.com	\N
1605	user600@test.com	\N
1606	user601@test.com	\N
1607	user602@test.com	\N
1608	user603@test.com	\N
1609	user604@test.com	\N
1610	user605@test.com	\N
1611	user606@test.com	\N
1612	user607@test.com	\N
1613	user608@test.com	\N
1614	user609@test.com	\N
1615	user610@test.com	\N
1616	user611@test.com	\N
1617	user612@test.com	\N
1618	user613@test.com	\N
1619	user614@test.com	\N
1620	user615@test.com	\N
1621	user616@test.com	\N
1622	user617@test.com	\N
1623	user618@test.com	\N
1624	user619@test.com	\N
1625	user620@test.com	\N
1626	user621@test.com	\N
1627	user622@test.com	\N
1628	user623@test.com	\N
1629	user624@test.com	\N
1630	user625@test.com	\N
1631	user626@test.com	\N
1632	user627@test.com	\N
1633	user628@test.com	\N
1634	user629@test.com	\N
1635	user630@test.com	\N
1636	user631@test.com	\N
1637	user632@test.com	\N
1638	user633@test.com	\N
1639	user634@test.com	\N
1640	user635@test.com	\N
1641	user636@test.com	\N
1642	user637@test.com	\N
1643	user638@test.com	\N
1644	user639@test.com	\N
1645	user640@test.com	\N
1646	user641@test.com	\N
1647	user642@test.com	\N
1648	user643@test.com	\N
1649	user644@test.com	\N
1650	user645@test.com	\N
1651	user646@test.com	\N
1652	user647@test.com	\N
1653	user648@test.com	\N
1654	user649@test.com	\N
1655	user650@test.com	\N
1656	user651@test.com	\N
1657	user652@test.com	\N
1658	user653@test.com	\N
1659	user654@test.com	\N
1660	user655@test.com	\N
1661	user656@test.com	\N
1662	user657@test.com	\N
1663	user658@test.com	\N
1664	user659@test.com	\N
1665	user660@test.com	\N
1666	user661@test.com	\N
1667	user662@test.com	\N
1668	user663@test.com	\N
1669	user664@test.com	\N
1670	user665@test.com	\N
1671	user666@test.com	\N
1672	user667@test.com	\N
1673	user668@test.com	\N
1674	user669@test.com	\N
1675	user670@test.com	\N
1676	user671@test.com	\N
1677	user672@test.com	\N
1678	user673@test.com	\N
1679	user674@test.com	\N
1680	user675@test.com	\N
1681	user676@test.com	\N
1682	user677@test.com	\N
1683	user678@test.com	\N
1684	user679@test.com	\N
1685	user680@test.com	\N
1686	user681@test.com	\N
1687	user682@test.com	\N
1688	user683@test.com	\N
1689	user684@test.com	\N
1690	user685@test.com	\N
1691	user686@test.com	\N
1692	user687@test.com	\N
1693	user688@test.com	\N
1694	user689@test.com	\N
1695	user690@test.com	\N
1696	user691@test.com	\N
1697	user692@test.com	\N
1698	user693@test.com	\N
1699	user694@test.com	\N
1700	user695@test.com	\N
1701	user696@test.com	\N
1702	user697@test.com	\N
1703	user698@test.com	\N
1704	user699@test.com	\N
1705	user700@test.com	\N
1706	user701@test.com	\N
1707	user702@test.com	\N
1708	user703@test.com	\N
1709	user704@test.com	\N
1710	user705@test.com	\N
1711	user706@test.com	\N
1712	user707@test.com	\N
1713	user708@test.com	\N
1714	user709@test.com	\N
1715	user710@test.com	\N
1716	user711@test.com	\N
1717	user712@test.com	\N
1718	user713@test.com	\N
1719	user714@test.com	\N
1720	user715@test.com	\N
1721	user716@test.com	\N
1722	user717@test.com	\N
1723	user718@test.com	\N
1724	user719@test.com	\N
1725	user720@test.com	\N
1726	user721@test.com	\N
1727	user722@test.com	\N
1728	user723@test.com	\N
1729	user724@test.com	\N
1730	user725@test.com	\N
1731	user726@test.com	\N
1732	user727@test.com	\N
1733	user728@test.com	\N
1734	user729@test.com	\N
1735	user730@test.com	\N
1736	user731@test.com	\N
1737	user732@test.com	\N
1738	user733@test.com	\N
1739	user734@test.com	\N
1740	user735@test.com	\N
1741	user736@test.com	\N
1742	user737@test.com	\N
1743	user738@test.com	\N
1744	user739@test.com	\N
1745	user740@test.com	\N
1746	user741@test.com	\N
1747	user742@test.com	\N
1748	user743@test.com	\N
1749	user744@test.com	\N
1750	user745@test.com	\N
1751	user746@test.com	\N
1752	user747@test.com	\N
1753	user748@test.com	\N
1754	user749@test.com	\N
1755	user750@test.com	\N
1756	user751@test.com	\N
1757	user752@test.com	\N
1758	user753@test.com	\N
1759	user754@test.com	\N
1760	user755@test.com	\N
1761	user756@test.com	\N
1762	user757@test.com	\N
1763	user758@test.com	\N
1764	user759@test.com	\N
1765	user760@test.com	\N
1766	user761@test.com	\N
1767	user762@test.com	\N
1768	user763@test.com	\N
1769	user764@test.com	\N
1770	user765@test.com	\N
1771	user766@test.com	\N
1772	user767@test.com	\N
1773	user768@test.com	\N
1774	user769@test.com	\N
1775	user770@test.com	\N
1776	user771@test.com	\N
1777	user772@test.com	\N
1778	user773@test.com	\N
1779	user774@test.com	\N
1780	user775@test.com	\N
1781	user776@test.com	\N
1782	user777@test.com	\N
1783	user778@test.com	\N
1784	user779@test.com	\N
1785	user780@test.com	\N
1786	user781@test.com	\N
1787	user782@test.com	\N
1788	user783@test.com	\N
1789	user784@test.com	\N
1790	user785@test.com	\N
1791	user786@test.com	\N
1792	user787@test.com	\N
1793	user788@test.com	\N
1794	user789@test.com	\N
1795	user790@test.com	\N
1796	user791@test.com	\N
1797	user792@test.com	\N
1798	user793@test.com	\N
1799	user794@test.com	\N
1800	user795@test.com	\N
1801	user796@test.com	\N
1802	user797@test.com	\N
1803	user798@test.com	\N
1804	user799@test.com	\N
1805	user800@test.com	\N
1806	user801@test.com	\N
1807	user802@test.com	\N
1808	user803@test.com	\N
1809	user804@test.com	\N
1810	user805@test.com	\N
1811	user806@test.com	\N
1812	user807@test.com	\N
1813	user808@test.com	\N
1814	user809@test.com	\N
1815	user810@test.com	\N
1816	user811@test.com	\N
1817	user812@test.com	\N
1818	user813@test.com	\N
1819	user814@test.com	\N
1820	user815@test.com	\N
1821	user816@test.com	\N
1822	user817@test.com	\N
1823	user818@test.com	\N
1824	user819@test.com	\N
1825	user820@test.com	\N
1826	user821@test.com	\N
1827	user822@test.com	\N
1828	user823@test.com	\N
1829	user824@test.com	\N
1830	user825@test.com	\N
1831	user826@test.com	\N
1832	user827@test.com	\N
1833	user828@test.com	\N
1834	user829@test.com	\N
1835	user830@test.com	\N
1836	user831@test.com	\N
1837	user832@test.com	\N
1838	user833@test.com	\N
1839	user834@test.com	\N
1840	user835@test.com	\N
1841	user836@test.com	\N
1842	user837@test.com	\N
1843	user838@test.com	\N
1844	user839@test.com	\N
1845	user840@test.com	\N
1846	user841@test.com	\N
1847	user842@test.com	\N
1848	user843@test.com	\N
1849	user844@test.com	\N
1850	user845@test.com	\N
1851	user846@test.com	\N
1852	user847@test.com	\N
1853	user848@test.com	\N
1854	user849@test.com	\N
1855	user850@test.com	\N
1856	user851@test.com	\N
1857	user852@test.com	\N
1858	user853@test.com	\N
1859	user854@test.com	\N
1860	user855@test.com	\N
1861	user856@test.com	\N
1862	user857@test.com	\N
1863	user858@test.com	\N
1864	user859@test.com	\N
1865	user860@test.com	\N
1866	user861@test.com	\N
1867	user862@test.com	\N
1868	user863@test.com	\N
1869	user864@test.com	\N
1870	user865@test.com	\N
1871	user866@test.com	\N
1872	user867@test.com	\N
1873	user868@test.com	\N
1874	user869@test.com	\N
1875	user870@test.com	\N
1876	user871@test.com	\N
1877	user872@test.com	\N
1878	user873@test.com	\N
1879	user874@test.com	\N
1880	user875@test.com	\N
1881	user876@test.com	\N
1882	user877@test.com	\N
1883	user878@test.com	\N
1884	user879@test.com	\N
1885	user880@test.com	\N
1886	user881@test.com	\N
1887	user882@test.com	\N
1888	user883@test.com	\N
1889	user884@test.com	\N
1890	user885@test.com	\N
1891	user886@test.com	\N
1892	user887@test.com	\N
1893	user888@test.com	\N
1894	user889@test.com	\N
1895	user890@test.com	\N
1896	user891@test.com	\N
1897	user892@test.com	\N
1898	user893@test.com	\N
1899	user894@test.com	\N
1900	user895@test.com	\N
1901	user896@test.com	\N
1902	user897@test.com	\N
1903	user898@test.com	\N
1904	user899@test.com	\N
1905	user900@test.com	\N
1906	user901@test.com	\N
1907	user902@test.com	\N
1908	user903@test.com	\N
1909	user904@test.com	\N
1910	user905@test.com	\N
1911	user906@test.com	\N
1912	user907@test.com	\N
1913	user908@test.com	\N
1914	user909@test.com	\N
1915	user910@test.com	\N
1916	user911@test.com	\N
1917	user912@test.com	\N
1918	user913@test.com	\N
1919	user914@test.com	\N
1920	user915@test.com	\N
1921	user916@test.com	\N
1922	user917@test.com	\N
1923	user918@test.com	\N
1924	user919@test.com	\N
1925	user920@test.com	\N
1926	user921@test.com	\N
1927	user922@test.com	\N
1928	user923@test.com	\N
1929	user924@test.com	\N
1930	user925@test.com	\N
1931	user926@test.com	\N
1932	user927@test.com	\N
1933	user928@test.com	\N
1934	user929@test.com	\N
1935	user930@test.com	\N
1936	user931@test.com	\N
1937	user932@test.com	\N
1938	user933@test.com	\N
1939	user934@test.com	\N
1940	user935@test.com	\N
1941	user936@test.com	\N
1942	user937@test.com	\N
1943	user938@test.com	\N
1944	user939@test.com	\N
1945	user940@test.com	\N
1946	user941@test.com	\N
1947	user942@test.com	\N
1948	user943@test.com	\N
1949	user944@test.com	\N
1950	user945@test.com	\N
1951	user946@test.com	\N
1952	user947@test.com	\N
1953	user948@test.com	\N
1954	user949@test.com	\N
1955	user950@test.com	\N
1956	user951@test.com	\N
1957	user952@test.com	\N
1958	user953@test.com	\N
1959	user954@test.com	\N
1960	user955@test.com	\N
1961	user956@test.com	\N
1962	user957@test.com	\N
1963	user958@test.com	\N
1964	user959@test.com	\N
1965	user960@test.com	\N
1966	user961@test.com	\N
1967	user962@test.com	\N
1968	user963@test.com	\N
1969	user964@test.com	\N
1970	user965@test.com	\N
1971	user966@test.com	\N
1972	user967@test.com	\N
1973	user968@test.com	\N
1974	user969@test.com	\N
1975	user970@test.com	\N
1976	user971@test.com	\N
1977	user972@test.com	\N
1978	user973@test.com	\N
1979	user974@test.com	\N
1980	user975@test.com	\N
1981	user976@test.com	\N
1982	user977@test.com	\N
1983	user978@test.com	\N
1984	user979@test.com	\N
1985	user980@test.com	\N
1986	user981@test.com	\N
1987	user982@test.com	\N
1988	user983@test.com	\N
1989	user984@test.com	\N
1990	user985@test.com	\N
1991	user986@test.com	\N
1992	user987@test.com	\N
1993	user988@test.com	\N
1994	user989@test.com	\N
1995	user990@test.com	\N
1996	user991@test.com	\N
1997	user992@test.com	\N
1998	user993@test.com	\N
1999	user994@test.com	\N
2000	user995@test.com	\N
2001	user996@test.com	\N
2002	user997@test.com	\N
2003	user998@test.com	\N
2004	user999@test.com	\N
2005	user0@test.com	\N
2006	user1@test.com	\N
2007	user2@test.com	\N
2008	user3@test.com	\N
2009	user4@test.com	\N
2010	user5@test.com	\N
2011	user6@test.com	\N
2012	user7@test.com	\N
2013	user8@test.com	\N
2014	user9@test.com	\N
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

SELECT pg_catalog.setval('public.users_id_seq', 2014, true);


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
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: taskuser
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


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

\unrestrict BD0xc1xFZtaMUsezLhE6IYsUxecqeNBscoFBq1SepXcZUxLLlebquiGyAfP5hLL

