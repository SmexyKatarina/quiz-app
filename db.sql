toc.dat                                                                                             0000600 0004000 0002000 00000013536 14733703172 0014456 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   2                     |            Quizzes    16.2    16.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    24676    Quizzes    DATABASE     �   CREATE DATABASE "Quizzes" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Quizzes";
                postgres    false         �           0    0    DATABASE "Quizzes"    COMMENT     h   COMMENT ON DATABASE "Quizzes" IS 'DB made for quiz-app

https://www.github.com/smexykatarina/quiz-app';
                   postgres    false    4861         �            1259    24704 	   questions    TABLE     b   CREATE TABLE public.questions (
    question_id integer NOT NULL,
    quiz_id integer NOT NULL
);
    DROP TABLE public.questions;
       public         heap    postgres    false         �            1259    24723    questions_question_id_seq    SEQUENCE     �   ALTER TABLE public.questions ALTER COLUMN question_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.questions_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217         �            1259    24694    quizzes    TABLE     �   CREATE TABLE public.quizzes (
    quiz_id integer NOT NULL,
    user_id integer,
    quiz_name character varying(60) NOT NULL,
    quiz_category integer DEFAULT '-1'::integer NOT NULL
);
    DROP TABLE public.quizzes;
       public         heap    postgres    false         �            1259    24721    quizzes_quiz_id_seq    SEQUENCE     �   ALTER TABLE public.quizzes ALTER COLUMN quiz_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.quizzes_quiz_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216         �            1259    24677    users    TABLE     �   CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(32) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false         �            1259    24722    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215         �          0    24704 	   questions 
   TABLE DATA           9   COPY public.questions (question_id, quiz_id) FROM stdin;
    public          postgres    false    217       4852.dat �          0    24694    quizzes 
   TABLE DATA           M   COPY public.quizzes (quiz_id, user_id, quiz_name, quiz_category) FROM stdin;
    public          postgres    false    216       4851.dat �          0    24677    users 
   TABLE DATA           <   COPY public.users (user_id, username, password) FROM stdin;
    public          postgres    false    215       4850.dat �           0    0    questions_question_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.questions_question_id_seq', 4, true);
          public          postgres    false    220                     0    0    quizzes_quiz_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.quizzes_quiz_id_seq', 1, true);
          public          postgres    false    218                    0    0    users_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);
          public          postgres    false    219         `           2606    24708    questions questions_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            postgres    false    217         ^           2606    24698    quizzes quizzes_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quiz_id);
 >   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_pkey;
       public            postgres    false    216         \           2606    24715    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215         b           2606    24709     questions questions_quiz_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);
 J   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_quiz_id_fkey;
       public          postgres    false    216    217    4702         a           2606    24716    quizzes quizzes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_user_id_fkey;
       public          postgres    false    215    4700    216                                                                                                                                                                          4852.dat                                                                                            0000600 0004000 0002000 00000000025 14733703172 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1
2	1
3	1
4	1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4851.dat                                                                                            0000600 0004000 0002000 00000000045 14733703172 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	Admin's Favorite Quizzes	-1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4850.dat                                                                                            0000600 0004000 0002000 00000000023 14733703172 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	admin	admin
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             restore.sql                                                                                         0000600 0004000 0002000 00000012435 14733703172 0015400 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

DROP DATABASE "Quizzes";
--
-- Name: Quizzes; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "Quizzes" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE "Quizzes" OWNER TO postgres;

\connect "Quizzes"

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
-- Name: DATABASE "Quizzes"; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE "Quizzes" IS 'DB made for quiz-app

https://www.github.com/smexykatarina/quiz-app';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    quiz_id integer NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- Name: questions_question_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.questions ALTER COLUMN question_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.questions_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quizzes (
    quiz_id integer NOT NULL,
    user_id integer,
    quiz_name character varying(60) NOT NULL,
    quiz_category integer DEFAULT '-1'::integer NOT NULL
);


ALTER TABLE public.quizzes OWNER TO postgres;

--
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.quizzes ALTER COLUMN quiz_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.quizzes_quiz_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(32) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question_id, quiz_id) FROM stdin;
\.
COPY public.questions (question_id, quiz_id) FROM '$$PATH$$/4852.dat';

--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (quiz_id, user_id, quiz_name, quiz_category) FROM stdin;
\.
COPY public.quizzes (quiz_id, user_id, quiz_name, quiz_category) FROM '$$PATH$$/4851.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password) FROM stdin;
\.
COPY public.users (user_id, username, password) FROM '$$PATH$$/4850.dat';

--
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_id_seq', 4, true);


--
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quizzes_quiz_id_seq', 1, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quiz_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: questions questions_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);


--
-- Name: quizzes quizzes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   