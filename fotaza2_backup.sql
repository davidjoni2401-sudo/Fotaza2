--
-- PostgreSQL database dump
--

\restrict Jgz2xY8NmAWLhoDn8SgfKnobDo6xknkUonguo8Pq5J21aYwUDegXGT54BxJU4qv

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- Name: collection_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_posts (
    id integer NOT NULL,
    collection_id integer NOT NULL,
    post_id integer NOT NULL
);


--
-- Name: collection_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.collection_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: collection_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.collection_posts_id_seq OWNED BY public.collection_posts.id;


--
-- Name: collections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collections (
    id integer NOT NULL,
    user_id integer NOT NULL,
    nombre character varying(100) NOT NULL
);


--
-- Name: collections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.collections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: collections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.collections_id_seq OWNED BY public.collections.id;


--
-- Name: comment_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment_reports (
    id integer NOT NULL,
    user_id integer NOT NULL,
    comment_id integer NOT NULL,
    motivo character varying(100) NOT NULL,
    descripcion text,
    created_at timestamp with time zone
);


--
-- Name: comment_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comment_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comment_reports_id_seq OWNED BY public.comment_reports.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    comentario text NOT NULL
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.followers (
    id integer NOT NULL,
    follower_id integer NOT NULL,
    following_id integer NOT NULL
);


--
-- Name: followers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.followers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: followers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.followers_id_seq OWNED BY public.followers.id;


--
-- Name: interests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.interests (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    mensaje text,
    created_at timestamp with time zone
);


--
-- Name: interests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.interests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: interests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.interests_id_seq OWNED BY public.interests.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    from_user_id integer NOT NULL,
    tipo character varying(50) NOT NULL,
    mensaje text NOT NULL,
    leida boolean DEFAULT false,
    created_at timestamp with time zone
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: post_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_images (
    id integer NOT NULL,
    post_id integer NOT NULL,
    url text NOT NULL,
    orden integer DEFAULT 0 NOT NULL
);


--
-- Name: post_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_images_id_seq OWNED BY public.post_images.id;


--
-- Name: post_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.post_reports (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    motivo character varying(100) NOT NULL,
    descripcion text,
    created_at timestamp with time zone
);


--
-- Name: post_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.post_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: post_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.post_reports_id_seq OWNED BY public.post_reports.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    imagen text NOT NULL,
    descripcion text,
    titulo character varying(150),
    etiquetas text,
    licencia character varying(50) DEFAULT 'sin copyright'::character varying,
    marca_agua text,
    estado character varying(50) DEFAULT 'activo'::character varying,
    comentarios_cerrados boolean DEFAULT false
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: private_messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.private_messages (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    mensaje text NOT NULL,
    leido boolean DEFAULT false,
    created_at timestamp with time zone
);


--
-- Name: private_messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.private_messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: private_messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.private_messages_id_seq OWNED BY public.private_messages.id;


--
-- Name: ratings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ratings (
    id integer NOT NULL,
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    valor integer NOT NULL,
    CONSTRAINT ratings_valor_check CHECK (((valor >= 1) AND (valor <= 5)))
);


--
-- Name: ratings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ratings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    foto_perfil text,
    estado character varying(20) DEFAULT 'activo'::character varying,
    rol character varying(20) DEFAULT 'usuario'::character varying
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: collection_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_posts ALTER COLUMN id SET DEFAULT nextval('public.collection_posts_id_seq'::regclass);


--
-- Name: collections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collections ALTER COLUMN id SET DEFAULT nextval('public.collections_id_seq'::regclass);


--
-- Name: comment_reports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_reports ALTER COLUMN id SET DEFAULT nextval('public.comment_reports_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: followers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers ALTER COLUMN id SET DEFAULT nextval('public.followers_id_seq'::regclass);


--
-- Name: interests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interests ALTER COLUMN id SET DEFAULT nextval('public.interests_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: post_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_images ALTER COLUMN id SET DEFAULT nextval('public.post_images_id_seq'::regclass);


--
-- Name: post_reports id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_reports ALTER COLUMN id SET DEFAULT nextval('public.post_reports_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: private_messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.private_messages ALTER COLUMN id SET DEFAULT nextval('public.private_messages_id_seq'::regclass);


--
-- Name: ratings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: collection_posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.collection_posts (id, collection_id, post_id) FROM stdin;
1	1	1
2	2	7
3	2	6
4	3	9
\.


--
-- Data for Name: collections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.collections (id, user_id, nombre) FROM stdin;
1	9	Planos Favoritos
2	1	Posibles casas
3	11	Cecilia
\.


--
-- Data for Name: comment_reports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comment_reports (id, user_id, comment_id, motivo, descripcion, created_at) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments (id, user_id, post_id, comentario) FROM stdin;
1	1	1	Hola buenas, increíble el plano.
2	1	1	Hola buenas, increíble el plano.
3	1	1	Hola buenas, increíble el plano, quiero saber como lo cobra para hacer este tipos  de planos
4	1	2	Hola buenas, increíble el plano, no especifica las medidas del terreno.
5	7	3	Hola buenas, increíble el plano, cuanto o como es tu método de cobro?
6	1	3	hola!
7	7	2	Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?
8	11	1	Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?
9	11	1	???
10	9	3	Hola buenas, me gusto tu plano
11	7	4	Hola buenas, me gusto tu diseño del plano, mi lote es de 10mts de ancho por 25 de largo, podrías adaptar un plano para esas medidas
12	1	8	Hola buenas, increíble el plano, quiero saber como lo cobra para hacer este tipos  de planos
13	1	7	Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?
15	9	7	hola!
16	9	5	hola, no se ve la imagen
17	9	3	Elizabet hola, no se ve la imagen!!!!
\.


--
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.followers (id, follower_id, following_id) FROM stdin;
10	2	1
12	9	7
13	7	1
16	11	7
17	11	1
18	7	9
22	1	9
24	1	11
25	9	11
26	9	1
27	1	7
\.


--
-- Data for Name: interests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.interests (id, user_id, post_id, mensaje, created_at) FROM stdin;
1	1	4	Hola buenas tardes, me interesa, me pasas tu contacto?	2026-05-27 19:01:12.476133-03
2	9	2	Hola buenas tardes, me interesa, me pasas tu contacto y así hablamos?	2026-05-27 19:02:54.633003-03
3	1	8		\N
4	1	7	Hola buenas tardes, me interesa, me pasas tu contacto y así hablamos?	\N
5	9	9	Hola buenas tardes, me interesa, me pasas tu contacto y así hablamos?	\N
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, user_id, from_user_id, tipo, mensaje, leida, created_at) FROM stdin;
1	7	1	comentario	comentó tu publicación	t	\N
2	7	1	follow	comenzo a seguirte	t	\N
4	1	7	comentario	comentó tu publicación	t	\N
3	1	7	valoracion	valoro tu publicacion	t	\N
7	1	11	comentario	comentó tu publicación	t	\N
6	1	11	comentario	comentó tu publicación	t	\N
5	1	11	valoracion	valoro tu publicacion	t	\N
10	1	11	follow	comenzo a seguirte	t	\N
11	7	9	comentario	comentó tu publicación	t	\N
9	7	11	valoracion	valoro tu publicacion	t	\N
8	7	11	follow	comenzo a seguirte	t	\N
14	9	7	comentario	comentó tu publicación	t	\N
13	9	7	valoracion	valoro tu publicacion	t	\N
12	9	7	follow	comenzo a seguirte	t	\N
16	1	9	valoracion	valoro tu publicacion	t	\N
20	9	1	follow	comenzo a seguirte	t	\N
19	9	1	follow	comenzo a seguirte	t	\N
18	9	1	follow	comenzo a seguirte	t	\N
17	9	1	follow	comenzo a seguirte	t	\N
22	9	1	valoracion	valoro tu publicacion	t	\N
21	9	11	valoracion	valoro tu publicacion	t	\N
24	1	9	interes	marco me interesa en tu publicacion	t	\N
15	7	9	valoracion	valoro tu publicacion	t	\N
23	9	1	interes	marco me interesa en tu publicacion	t	\N
25	11	1	follow	comenzo a seguirte	f	\N
26	11	1	interes	marco me interesa en tu publicacion	f	\N
27	11	1	comentario	comento tu publicacion	f	\N
28	11	1	valoracion	valoro tu publicacion	f	\N
29	11	1	comentario	comento tu publicacion	f	\N
30	11	1	interes	marco me interesa en tu publicacion	f	\N
31	11	1	follow	comenzo a seguirte	f	\N
32	11	9	follow	comenzo a seguirte	f	\N
33	1	9	follow	comenzo a seguirte	f	\N
34	1	9	valoracion	valoro tu publicacion	f	\N
35	1	9	interes	marco me interesa en tu publicacion	f	\N
36	1	9	comentario	comento tu publicacion	f	\N
37	11	9	valoracion	valoro tu publicacion	f	\N
38	11	9	comentario	comento tu publicacion	f	\N
39	11	9	comentario	comento tu publicacion	f	\N
40	7	9	comentario	comento tu publicacion	f	\N
41	7	1	follow	comenzo a seguirte	f	\N
42	1	7	comentario	comento tu publicacion	f	\N
\.


--
-- Data for Name: post_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post_images (id, post_id, url, orden) FROM stdin;
3	2	1779023574257-WhatsApp Image 2026-05-14 at 15.45.47.jpeg	0
4	1	1778787716276-WhatsApp Image 2026-05-14 at 15.45.48 (1).jpeg	0
5	5	fotaza2/get9fd2j91xb91fcdxfm	0
6	6	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780518878/fotaza2/flrjqkvajbq6cyxcqrql.webp	0
7	8	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780520107/fotaza2/ramtydhygi40pelkfcxj.jpg	0
8	9	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780675273/fotaza2/xuv1k8aiwmdswmse8pe6.jpg	0
9	7	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780519933/fotaza2/rctcn5rhcb6whtlubzqf.png	0
10	3	1779228592745-WhatsApp Image 2026-05-14 at 15.45.48.jpeg	0
11	4	1779824245368-Captura de pantalla 2026-05-20 201111.png	0
\.


--
-- Data for Name: post_reports; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.post_reports (id, user_id, post_id, motivo, descripcion, created_at) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, user_id, imagen, descripcion, titulo, etiquetas, licencia, marca_agua, estado, comentarios_cerrados) FROM stdin;
2	1	1779023574257-WhatsApp Image 2026-05-14 at 15.45.47.jpeg	Este plano muestra la distribución de una casa familiar de una sola planta. Al ingresar se encuentra la cocina en la parte central inferior, conectada con una sala amplia ubicada en el centro de la vivienda. A los costados se organizan los distintos ambientes: tres dormitorios, un estudio, comedor y varios baños.\r\n\r\n	\N	\N	sin copyright	\N	activo	f
1	1	1778787716276-WhatsApp Image 2026-05-14 at 15.45.48 (1).jpeg	Descripción simple:\r\n\r\nEsta casa tiene un diseño alargado y cómodo, pensado para una familia pequeña.\r\nEl terreno mide aproximadamente 6,50 metros de ancho por 14,80 metros de largo, dando un total cercano a 96 m². Y cabe perfectamente en un terreno de 15 mts de Ancho X 36 mts de Largo.	\N	\N	sin copyright	\N	activo	f
5	11	fotaza2/get9fd2j91xb91fcdxfm	el plano de una vivienda analizado desde el punto de vista de la circulación interna. El área resaltada en rojo representa un pasillo excesivamente largo, considerado un error de diseño porque ocupa una gran superficie destinada únicamente al tránsito entre ambientes.	Plano de casa con un error	Planos, hogar, sueño, errores	sin copyright		bajado	f
6	11	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780518878/fotaza2/flrjqkvajbq6cyxcqrql.webp	el plano de una vivienda analizado desde el punto de vista de la circulación interna. El área resaltada en rojo representa un pasillo excesivamente largo, considerado un error de diseño porque ocupa una gran superficie destinada únicamente al tránsito entre ambientes.	Plano de casa con errores de distribución 	Planos, hogar, sueño, errores	sin copyright		activo	f
8	11	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780520107/fotaza2/ramtydhygi40pelkfcxj.jpg	De distribución de una vivienda moderna de una sola planta.\r\n\r\nEn el sector izquierdo se encuentra un amplio espacio integrado que reúne la sala de estar, comedor y cocina, con una isla central y mobiliario de concepto abierto.\r\nEn la parte superior izquierda hay una habitación pequeña, que podría utilizarse como dormitorio secundario, oficina o estudio.\r\nEn el sector derecho se ubica la zona privada, compuesta por dos dormitorios.	Plano de casa sencilla 	Planos, hogar, sueño	sin copyright		activo	f
9	1	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780675273/fotaza2/xuv1k8aiwmdswmse8pe6.jpg	En el plano arquitectónico de una vivienda de 96 m², con medidas aproximadas de 6,50 m de ancho por 14,80 m de largo.\r\n\r\nLa distribución incluye dos dormitorios, uno principal con baño privado, baño compartido, sala, comedor, cocina, área de servicios e ingreso frontal. El diseño aprovecha bien el espacio en un terreno angosto, separando la zona social de la zona privada de la casa.	Plano de casa sencilla 	Planos, hogar, sueño	con copyright	J@nii	activo	f
7	11	https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780519933/fotaza2/rctcn5rhcb6whtlubzqf.png	presenta una comparación de tres modelos de viviendas cuadradas de diferentes tamaños:\r\n\r\nModelo S: superficie de 100 m², con 2 habitaciones y dimensiones aproximadas de 10 m × 10 m.\r\nModelo M: superficie de 140 m², con 3 habitaciones y dimensiones de 10 m × 14 m.\r\nModelo L: superficie de 180 m², con 4 habitaciones y dimensiones de 14 m × 14 m.	Plano de casa sencilla 	Planos, hogar, sueño, la demostración de diferentes 	con copyright	J@nii	bajado	f
3	7	1779228592745-WhatsApp Image 2026-05-14 at 15.45.48.jpeg	Es un plano arquitectónico de una vivienda moderna de una sola planta, con medidas generales de 7,50 m de ancho por 11,50 m de largo. La casa está distribuida en varios ambientes bien organizados: cuenta con tres dormitorios, dos baños, una cocina, un comedor y una sala de estar.	\N	Planos, hogar, sueño	sin copyright	\N	activo	f
4	9	1779824245368-Captura de pantalla 2026-05-20 201111.png	Son tres modelos de viviendas modernas de diferentes tamaños: modelo S, M y L. Cada uno presenta una distribución distinta según la cantidad de metros cuadrados y habitaciones.\r\n\r\nModelo S: cuenta con 100 m² y 2 habitaciones, pensado para espacios más compactos y funcionales.\r\nModelo M: tiene 140 m² y 3 habitaciones, ofreciendo una distribución más amplia y cómoda para familias medianas.\r\nModelo L: posee 180 m² y 4 habitaciones, destacándose por sus grandes espacios y un patio interior central que aporta iluminación y ventilación natural.\r\n\r\nAdemás, en cada plano se indican las medidas aproximadas de ancho y largo de las viviendas.	Planos de diferentes medidas	Planos, hogar, sueño	con copyright	Casa ecologicas	bajado	f
\.


--
-- Data for Name: private_messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.private_messages (id, sender_id, recipient_id, mensaje, leido, created_at) FROM stdin;
\.


--
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ratings (id, user_id, post_id, valor) FROM stdin;
1	2	2	1
3	2	1	5
5	7	1	1
6	1	3	3
7	7	2	3
8	11	1	5
10	11	3	3
11	7	4	5
12	9	3	5
13	9	2	3
14	11	4	4
15	1	4	1
17	1	7	1
18	9	9	5
19	9	7	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, nombre, email, password, foto_perfil, estado, rol) FROM stdin;
1	Jonatan	jonatan@fotaza.test	$2b$10$Zs27Jui9lI/8vK4dmt.yGOp/apX.56TpN4pN9ZPpQjjAh55/WuWVW	\N	activo	usuario
2	Elizabet	eli79@fotaza.com	$2b$10$Zs27Jui9lI/8vK4dmt.yGOp/apX.56TpN4pN9ZPpQjjAh55/WuWVW	\N	activo	usuario
7	Daiana	dai76@fotaza.com	$2b$10$Zs27Jui9lI/8vK4dmt.yGOp/apX.56TpN4pN9ZPpQjjAh55/WuWVW	\N	activo	usuario
9	Elizabet	david@fotaza.com	$2b$10$Zs27Jui9lI/8vK4dmt.yGOp/apX.56TpN4pN9ZPpQjjAh55/WuWVW	\N	activo	usuario
11	Cecilia	joni2401@fotaza.com	$2b$10$Zs27Jui9lI/8vK4dmt.yGOp/apX.56TpN4pN9ZPpQjjAh55/WuWVW	\N	activo	usuario
12	Validador	validador@fotaza.com	$2b$10$8v28TeBFrsqlEhpNEGM4beCzhAtMGfGNb4rVh2N2pD4qNCQbonzby	\N	activo	validador
\.


--
-- Name: collection_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.collection_posts_id_seq', 4, true);


--
-- Name: collections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.collections_id_seq', 3, true);


--
-- Name: comment_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comment_reports_id_seq', 4, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 18, true);


--
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.followers_id_seq', 27, true);


--
-- Name: interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.interests_id_seq', 5, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notifications_id_seq', 42, true);


--
-- Name: post_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_images_id_seq', 11, true);


--
-- Name: post_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.post_reports_id_seq', 9, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 10, true);


--
-- Name: private_messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.private_messages_id_seq', 1, false);


--
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ratings_id_seq', 19, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: collection_posts collection_posts_collection_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_posts
    ADD CONSTRAINT collection_posts_collection_id_post_id_key UNIQUE (collection_id, post_id);


--
-- Name: collection_posts collection_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_posts
    ADD CONSTRAINT collection_posts_pkey PRIMARY KEY (id);


--
-- Name: collections collections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (id);


--
-- Name: comment_reports comment_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_reports
    ADD CONSTRAINT comment_reports_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: followers followers_follower_id_following_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_following_id_key UNIQUE (follower_id, following_id);


--
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY (id);


--
-- Name: interests interests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_pkey PRIMARY KEY (id);


--
-- Name: interests interests_user_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_user_id_post_id_key UNIQUE (user_id, post_id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: post_images post_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_images
    ADD CONSTRAINT post_images_pkey PRIMARY KEY (id);


--
-- Name: post_reports post_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reports_pkey PRIMARY KEY (id);


--
-- Name: post_reports post_reports_user_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reports_user_id_post_id_key UNIQUE (user_id, post_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: private_messages private_messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.private_messages
    ADD CONSTRAINT private_messages_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);


--
-- Name: ratings ratings_user_id_post_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_post_id_key UNIQUE (user_id, post_id);


--
-- Name: followers unique_follow; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT unique_follow UNIQUE (follower_id, following_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: collection_posts_collection_id_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX collection_posts_collection_id_post_id ON public.collection_posts USING btree (collection_id, post_id);


--
-- Name: comment_reports_user_id_comment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX comment_reports_user_id_comment_id ON public.comment_reports USING btree (user_id, comment_id);


--
-- Name: followers_follower_id_following_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX followers_follower_id_following_id ON public.followers USING btree (follower_id, following_id);


--
-- Name: interests_user_id_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX interests_user_id_post_id ON public.interests USING btree (user_id, post_id);


--
-- Name: post_images_post_id_orden; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX post_images_post_id_orden ON public.post_images USING btree (post_id, orden);


--
-- Name: post_reports_user_id_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX post_reports_user_id_post_id ON public.post_reports USING btree (user_id, post_id);


--
-- Name: ratings_user_id_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX ratings_user_id_post_id ON public.ratings USING btree (user_id, post_id);


--
-- Name: collection_posts collection_posts_collection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_posts
    ADD CONSTRAINT collection_posts_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES public.collections(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: collection_posts collection_posts_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_posts
    ADD CONSTRAINT collection_posts_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: collections collections_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT collections_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment_reports comment_reports_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_reports
    ADD CONSTRAINT comment_reports_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comment_reports comment_reports_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_reports
    ADD CONSTRAINT comment_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: comments comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: followers followers_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_fkey FOREIGN KEY (follower_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: followers followers_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_following_id_fkey FOREIGN KEY (following_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: interests interests_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: interests interests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.interests
    ADD CONSTRAINT interests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: notifications notifications_from_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_from_user_id_fkey FOREIGN KEY (from_user_id) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: notifications notifications_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_images post_images_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_images
    ADD CONSTRAINT post_images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_reports post_reports_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reports_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: post_reports post_reports_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.post_reports
    ADD CONSTRAINT post_reports_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: private_messages private_messages_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.private_messages
    ADD CONSTRAINT private_messages_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: private_messages private_messages_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.private_messages
    ADD CONSTRAINT private_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ratings ratings_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ratings ratings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict Jgz2xY8NmAWLhoDn8SgfKnobDo6xknkUonguo8Pq5J21aYwUDegXGT54BxJU4qv

