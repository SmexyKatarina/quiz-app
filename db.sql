toc.dat                                                                                             0000600 0004000 0002000 00000024646 14747037211 0014461 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP   4                     }            Quizzes    16.2    16.2 #               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                    0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                    0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                    1262    24676    Quizzes    DATABASE     �   CREATE DATABASE "Quizzes" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Quizzes";
                postgres    false                    0    0    DATABASE "Quizzes"    COMMENT     h   COMMENT ON DATABASE "Quizzes" IS 'DB made for quiz-app

https://www.github.com/smexykatarina/quiz-app';
                   postgres    false    4880         �            1255    24768    add_quiz_relation()    FUNCTION     �  CREATE FUNCTION public.add_quiz_relation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		IF NEW.user_id IS NULL THEN
			RAISE EXCEPTION 'There must be a user id assigned';
		END IF;
		IF NEW.quiz_id IS NULL THEN
			RAISE EXCEPTION 'There must be a quiz id assigned';
		END IF;
		
		INSERT INTO quiz_user (quiz_id, user_id) VALUES (NEW.quiz_id, NEW.user_id);
		RETURN NEW;
	END;
$$;
 *   DROP FUNCTION public.add_quiz_relation();
       public          postgres    false         �            1255    24770    delete_quiz_relation()    FUNCTION     �   CREATE FUNCTION public.delete_quiz_relation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		DELETE FROM quiz_user WHERE quiz_id = OLD.quiz_id;
		IF NOT FOUND THEN RETURN NULL; END IF;
		
		RETURN OLD;
	END;
$$;
 -   DROP FUNCTION public.delete_quiz_relation();
       public          postgres    false         �            1259    24704 	   questions    TABLE     8  CREATE TABLE public.questions (
    question_id integer NOT NULL,
    quiz_id integer NOT NULL,
    question_text character varying(128) DEFAULT 'Question Text'::character varying NOT NULL,
    answer_type character varying DEFAULT 'TEXT'::character varying NOT NULL,
    possible_answers character varying[]
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
            public          postgres    false    217         �            1259    24749 	   quiz_user    TABLE     v   CREATE TABLE public.quiz_user (
    id bigint NOT NULL,
    quiz_id integer NOT NULL,
    user_id integer NOT NULL
);
    DROP TABLE public.quiz_user;
       public         heap    postgres    false         �            1259    24748    quiz_user_id_seq    SEQUENCE     y   CREATE SEQUENCE public.quiz_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.quiz_user_id_seq;
       public          postgres    false    222                    0    0    quiz_user_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.quiz_user_id_seq OWNED BY public.quiz_user.id;
          public          postgres    false    221         �            1259    24694    quizzes    TABLE     �   CREATE TABLE public.quizzes (
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
    password character varying NOT NULL,
    permissions character varying[] DEFAULT ARRAY['USER_PROFILE'::character varying] NOT NULL
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
            public          postgres    false    215         e           2604    24752    quiz_user id    DEFAULT     l   ALTER TABLE ONLY public.quiz_user ALTER COLUMN id SET DEFAULT nextval('public.quiz_user_id_seq'::regclass);
 ;   ALTER TABLE public.quiz_user ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222                   0    24704 	   questions 
   TABLE DATA           g   COPY public.questions (question_id, quiz_id, question_text, answer_type, possible_answers) FROM stdin;
    public          postgres    false    217       4869.dat 
          0    24749 	   quiz_user 
   TABLE DATA           9   COPY public.quiz_user (id, quiz_id, user_id) FROM stdin;
    public          postgres    false    222       4874.dat           0    24694    quizzes 
   TABLE DATA           M   COPY public.quizzes (quiz_id, user_id, quiz_name, quiz_category) FROM stdin;
    public          postgres    false    216       4868.dat           0    24677    users 
   TABLE DATA           I   COPY public.users (user_id, username, password, permissions) FROM stdin;
    public          postgres    false    215       4867.dat            0    0    questions_question_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.questions_question_id_seq', 4, true);
          public          postgres    false    220                    0    0    quiz_user_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.quiz_user_id_seq', 2, false);
          public          postgres    false    221                    0    0    quizzes_quiz_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.quizzes_quiz_id_seq', 2, false);
          public          postgres    false    218                    0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 2, false);
          public          postgres    false    219         k           2606    24708    questions questions_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);
 B   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_pkey;
       public            postgres    false    217         m           2606    24754    quiz_user quiz_user_ids_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.quiz_user
    ADD CONSTRAINT quiz_user_ids_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.quiz_user DROP CONSTRAINT quiz_user_ids_pkey;
       public            postgres    false    222         i           2606    24698    quizzes quizzes_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quiz_id);
 >   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_pkey;
       public            postgres    false    216         g           2606    24715    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215         r           2620    24769    quizzes add_quiz_relation    TRIGGER     z   CREATE TRIGGER add_quiz_relation AFTER INSERT ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.add_quiz_relation();
 2   DROP TRIGGER add_quiz_relation ON public.quizzes;
       public          postgres    false    216    223         s           2620    24771    quizzes delete_quiz_relation    TRIGGER     �   CREATE TRIGGER delete_quiz_relation BEFORE DELETE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.delete_quiz_relation();
 5   DROP TRIGGER delete_quiz_relation ON public.quizzes;
       public          postgres    false    216    224         o           2606    24709     questions questions_quiz_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);
 J   ALTER TABLE ONLY public.questions DROP CONSTRAINT questions_quiz_id_fkey;
       public          postgres    false    216    4713    217         p           2606    24755 $   quiz_user quiz_user_ids_quiz_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quiz_user
    ADD CONSTRAINT quiz_user_ids_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);
 N   ALTER TABLE ONLY public.quiz_user DROP CONSTRAINT quiz_user_ids_quiz_id_fkey;
       public          postgres    false    4713    216    222         q           2606    24760 $   quiz_user quiz_user_ids_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quiz_user
    ADD CONSTRAINT quiz_user_ids_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 N   ALTER TABLE ONLY public.quiz_user DROP CONSTRAINT quiz_user_ids_user_id_fkey;
       public          postgres    false    222    215    4711         n           2606    24716    quizzes quizzes_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 F   ALTER TABLE ONLY public.quizzes DROP CONSTRAINT quizzes_user_id_fkey;
       public          postgres    false    216    215    4711                                                                                                  4869.dat                                                                                            0000600 0004000 0002000 00000000221 14747037211 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	Question Text	TEXT	\N
2	1	Question Text	TEXT	\N
3	1	Question Text	MULTIPLE_CHOICE	{1,2,3,4}
4	1	Question Text	MULTIPLE_CHOICE	{1,2,3,4}
\.


                                                                                                                                                                                                                                                                                                                                                                               4874.dat                                                                                            0000600 0004000 0002000 00000000013 14747037211 0014260 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     4868.dat                                                                                            0000600 0004000 0002000 00000000045 14747037211 0014270 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	1	Admin's Favorite Quizzes	-1
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           4867.dat                                                                                            0000600 0004000 0002000 00000000120 14747037211 0014261 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1	admin	$2b$10$gqjHry10dwVSHjhBefbC7.2T/t1VTtoY6NOAYg6m2MVoks/Tf1d1G	{ALL}
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                restore.sql                                                                                         0000600 0004000 0002000 00000021600 14747037211 0015371 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
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


--
-- Name: add_quiz_relation(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.add_quiz_relation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		IF NEW.user_id IS NULL THEN
			RAISE EXCEPTION 'There must be a user id assigned';
		END IF;
		IF NEW.quiz_id IS NULL THEN
			RAISE EXCEPTION 'There must be a quiz id assigned';
		END IF;
		
		INSERT INTO quiz_user (quiz_id, user_id) VALUES (NEW.quiz_id, NEW.user_id);
		RETURN NEW;
	END;
$$;


ALTER FUNCTION public.add_quiz_relation() OWNER TO postgres;

--
-- Name: delete_quiz_relation(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_quiz_relation() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
	BEGIN
		DELETE FROM quiz_user WHERE quiz_id = OLD.quiz_id;
		IF NOT FOUND THEN RETURN NULL; END IF;
		
		RETURN OLD;
	END;
$$;


ALTER FUNCTION public.delete_quiz_relation() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    question_id integer NOT NULL,
    quiz_id integer NOT NULL,
    question_text character varying(128) DEFAULT 'Question Text'::character varying NOT NULL,
    answer_type character varying DEFAULT 'TEXT'::character varying NOT NULL,
    possible_answers character varying[]
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
-- Name: quiz_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quiz_user (
    id bigint NOT NULL,
    quiz_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.quiz_user OWNER TO postgres;

--
-- Name: quiz_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quiz_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.quiz_user_id_seq OWNER TO postgres;

--
-- Name: quiz_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quiz_user_id_seq OWNED BY public.quiz_user.id;


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
    password character varying NOT NULL,
    permissions character varying[] DEFAULT ARRAY['USER_PROFILE'::character varying] NOT NULL
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
-- Name: quiz_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_user ALTER COLUMN id SET DEFAULT nextval('public.quiz_user_id_seq'::regclass);


--
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questions (question_id, quiz_id, question_text, answer_type, possible_answers) FROM stdin;
\.
COPY public.questions (question_id, quiz_id, question_text, answer_type, possible_answers) FROM '$$PATH$$/4869.dat';

--
-- Data for Name: quiz_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quiz_user (id, quiz_id, user_id) FROM stdin;
\.
COPY public.quiz_user (id, quiz_id, user_id) FROM '$$PATH$$/4874.dat';

--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quizzes (quiz_id, user_id, quiz_name, quiz_category) FROM stdin;
\.
COPY public.quizzes (quiz_id, user_id, quiz_name, quiz_category) FROM '$$PATH$$/4868.dat';

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, permissions) FROM stdin;
\.
COPY public.users (user_id, username, password, permissions) FROM '$$PATH$$/4867.dat';

--
-- Name: questions_question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_id_seq', 4, true);


--
-- Name: quiz_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quiz_user_id_seq', 2, false);


--
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quizzes_quiz_id_seq', 2, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 2, false);


--
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (question_id);


--
-- Name: quiz_user quiz_user_ids_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_user
    ADD CONSTRAINT quiz_user_ids_pkey PRIMARY KEY (id);


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
-- Name: quizzes add_quiz_relation; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER add_quiz_relation AFTER INSERT ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.add_quiz_relation();


--
-- Name: quizzes delete_quiz_relation; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER delete_quiz_relation BEFORE DELETE ON public.quizzes FOR EACH ROW EXECUTE FUNCTION public.delete_quiz_relation();


--
-- Name: questions questions_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);


--
-- Name: quiz_user quiz_user_ids_quiz_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_user
    ADD CONSTRAINT quiz_user_ids_quiz_id_fkey FOREIGN KEY (quiz_id) REFERENCES public.quizzes(quiz_id);


--
-- Name: quiz_user quiz_user_ids_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quiz_user
    ADD CONSTRAINT quiz_user_ids_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: quizzes quizzes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                