--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-12-25 21:54:29

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 24704)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    quiz_id integer NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24694)
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    quiz_id integer NOT NULL,
    user_id integer
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24677)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(20),
    password text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4848 (class 0 OID 24704)
-- Dependencies: 217
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question_id, quiz_id) FROM stdin;
\.


--
-- TOC entry 4847 (class 0 OID 24694)
-- Dependencies: 216
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (quiz_id, user_id) FROM stdin;
\.


--
-- TOC entry 4846 (class 0 OID 24677)
-- Dependencies: 215
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password) FROM stdin;
\.


--
-- TOC entry 4700 (class 2606 OID 24708)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- TOC entry 4698 (class 2606 OID 24698)
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quiz_id);


--
-- TOC entry 4696 (class 2606 OID 24715)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4702 (class 2606 OID 24709)
-- Name: questions questions_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);


--
-- TOC entry 4701 (class 2606 OID 24716)
-- Name: quizzes quizzes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


-- Completed on 2024-12-25 21:54:30

--
-- PostgreSQL database dump complete
--

