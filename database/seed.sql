--
-- PostgreSQL database dump
--

\restrict 7tNE3ncVPy0egTSJAiXrBX3smtO99WAo4T5rkYZsF7l53E8W9btMcZJ06nkZK36

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

-- Started on 2026-06-08 21:27:58

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

--
-- TOC entry 5073 (class 0 OID 24614)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'Jonatan', 'jonatan@fotaza.test', '$2b$10$macdvvlQYR66f5mCVFafKecnWUOv7DBPGoKRC3A6ZT3oAXM5ycv7O', NULL, 'activo', 'usuario');
INSERT INTO public.users VALUES (2, 'Elizabet', 'eli79@fotaza.com', '$2b$10$GOhi.hx5D0fHt/fFXPyiVOZqpiBeRlh03I/w3mulcXKpQnmgzx/.e', NULL, 'activo', 'usuario');
INSERT INTO public.users VALUES (7, 'Daiana', 'dai76@fotaza.com', '$2b$10$qPfGJKDe7MB.qHY3Lyvp0uscwohENfzFV1.KGyYytFJEGU89VqOyC', NULL, 'activo', 'usuario');
INSERT INTO public.users VALUES (9, 'Elizabet', 'david@fotaza.com', '$2b$10$o5FYwnd8pUNRPZ.WbDZY3ODs3n6PgC1ngBDBWhXUOtEOe9ekc1v9C', NULL, 'activo', 'usuario');
INSERT INTO public.users VALUES (11, 'Cecilia', 'joni2401@fotaza.com', '$2b$10$buAmUuKY9W8Kkbrg.EprK.8HqjOTBoJ0Q4UBqiXN7n/DOU0G17Dsu', NULL, 'activo', 'usuario');
INSERT INTO public.users VALUES (12, 'Validador', 'validador@fotaza.com', '$2b$10$188O6EcrTa6yr4DPvcqCme6yi.mDF9nWdIsdXUjYp6Ht79NMcvpLa', NULL, 'activo', 'validador');


--
-- TOC entry 5085 (class 0 OID 32769)
-- Dependencies: 232
-- Data for Name: collections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.collections VALUES (1, 9, 'Planos Favoritos');
INSERT INTO public.collections VALUES (2, 1, 'Posibles casas');
INSERT INTO public.collections VALUES (3, 11, 'Cecilia');


--
-- TOC entry 5075 (class 0 OID 24630)
-- Dependencies: 222
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.posts VALUES (2, 1, '1779023574257-WhatsApp Image 2026-05-14 at 15.45.47.jpeg', 'Este plano muestra la distribución de una casa familiar de una sola planta. Al ingresar se encuentra la cocina en la parte central inferior, conectada con una sala amplia ubicada en el centro de la vivienda. A los costados se organizan los distintos ambientes: tres dormitorios, un estudio, comedor y varios baños.

', NULL, NULL, 'sin copyright', NULL, 'activo', false);
INSERT INTO public.posts VALUES (1, 1, '1778787716276-WhatsApp Image 2026-05-14 at 15.45.48 (1).jpeg', 'Descripción simple:

Esta casa tiene un diseño alargado y cómodo, pensado para una familia pequeña.
El terreno mide aproximadamente 6,50 metros de ancho por 14,80 metros de largo, dando un total cercano a 96 m². Y cabe perfectamente en un terreno de 15 mts de Ancho X 36 mts de Largo.', NULL, NULL, 'sin copyright', NULL, 'activo', false);
INSERT INTO public.posts VALUES (5, 11, 'fotaza2/get9fd2j91xb91fcdxfm', 'el plano de una vivienda analizado desde el punto de vista de la circulación interna. El área resaltada en rojo representa un pasillo excesivamente largo, considerado un error de diseño porque ocupa una gran superficie destinada únicamente al tránsito entre ambientes.', 'Plano de casa con un error', 'Planos, hogar, sueño, errores', 'sin copyright', '', 'bajado', false);
INSERT INTO public.posts VALUES (6, 11, 'https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780518878/fotaza2/flrjqkvajbq6cyxcqrql.webp', 'el plano de una vivienda analizado desde el punto de vista de la circulación interna. El área resaltada en rojo representa un pasillo excesivamente largo, considerado un error de diseño porque ocupa una gran superficie destinada únicamente al tránsito entre ambientes.', 'Plano de casa con errores de distribución ', 'Planos, hogar, sueño, errores', 'sin copyright', '', 'activo', false);
INSERT INTO public.posts VALUES (8, 11, 'https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780520107/fotaza2/ramtydhygi40pelkfcxj.jpg', 'De distribución de una vivienda moderna de una sola planta.

En el sector izquierdo se encuentra un amplio espacio integrado que reúne la sala de estar, comedor y cocina, con una isla central y mobiliario de concepto abierto.
En la parte superior izquierda hay una habitación pequeña, que podría utilizarse como dormitorio secundario, oficina o estudio.
En el sector derecho se ubica la zona privada, compuesta por dos dormitorios.', 'Plano de casa sencilla ', 'Planos, hogar, sueño', 'sin copyright', '', 'activo', false);
INSERT INTO public.posts VALUES (9, 1, 'https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780675273/fotaza2/xuv1k8aiwmdswmse8pe6.jpg', 'En el plano arquitectónico de una vivienda de 96 m², con medidas aproximadas de 6,50 m de ancho por 14,80 m de largo.

La distribución incluye dos dormitorios, uno principal con baño privado, baño compartido, sala, comedor, cocina, área de servicios e ingreso frontal. El diseño aprovecha bien el espacio en un terreno angosto, separando la zona social de la zona privada de la casa.', 'Plano de casa sencilla ', 'Planos, hogar, sueño', 'con copyright', 'J@nii', 'activo', false);
INSERT INTO public.posts VALUES (7, 11, 'https://res.cloudinary.com/dfvhtfhvu/image/upload/v1780519933/fotaza2/rctcn5rhcb6whtlubzqf.png', 'presenta una comparación de tres modelos de viviendas cuadradas de diferentes tamaños:

Modelo S: superficie de 100 m², con 2 habitaciones y dimensiones aproximadas de 10 m × 10 m.
Modelo M: superficie de 140 m², con 3 habitaciones y dimensiones de 10 m × 14 m.
Modelo L: superficie de 180 m², con 4 habitaciones y dimensiones de 14 m × 14 m.', 'Plano de casa sencilla ', 'Planos, hogar, sueño, la demostración de diferentes ', 'con copyright', 'J@nii', 'bajado', false);
INSERT INTO public.posts VALUES (3, 7, '1779228592745-WhatsApp Image 2026-05-14 at 15.45.48.jpeg', 'Es un plano arquitectónico de una vivienda moderna de una sola planta, con medidas generales de 7,50 m de ancho por 11,50 m de largo. La casa está distribuida en varios ambientes bien organizados: cuenta con tres dormitorios, dos baños, una cocina, un comedor y una sala de estar.', NULL, 'Planos, hogar, sueño', 'sin copyright', NULL, 'activo', false);
INSERT INTO public.posts VALUES (4, 9, '1779824245368-Captura de pantalla 2026-05-20 201111.png', 'Son tres modelos de viviendas modernas de diferentes tamaños: modelo S, M y L. Cada uno presenta una distribución distinta según la cantidad de metros cuadrados y habitaciones.

Modelo S: cuenta con 100 m² y 2 habitaciones, pensado para espacios más compactos y funcionales.
Modelo M: tiene 140 m² y 3 habitaciones, ofreciendo una distribución más amplia y cómoda para familias medianas.
Modelo L: posee 180 m² y 4 habitaciones, destacándose por sus grandes espacios y un patio interior central que aporta iluminación y ventilación natural.

Además, en cada plano se indican las medidas aproximadas de ancho y largo de las viviendas.', 'Planos de diferentes medidas', 'Planos, hogar, sueño', 'con copyright', 'Casa ecologicas', 'bajado', false);


--
-- TOC entry 5087 (class 0 OID 32784)
-- Dependencies: 234
-- Data for Name: collection_posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.collection_posts VALUES (1, 1, 1);
INSERT INTO public.collection_posts VALUES (2, 2, 7);
INSERT INTO public.collection_posts VALUES (3, 2, 6);
INSERT INTO public.collection_posts VALUES (4, 3, 9);


--
-- TOC entry 5077 (class 0 OID 24688)
-- Dependencies: 224
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments VALUES (1, 1, 1, 'Hola buenas, increíble el plano.');
INSERT INTO public.comments VALUES (2, 1, 1, 'Hola buenas, increíble el plano.');
INSERT INTO public.comments VALUES (3, 1, 1, 'Hola buenas, increíble el plano, quiero saber como lo cobra para hacer este tipos  de planos');
INSERT INTO public.comments VALUES (4, 1, 2, 'Hola buenas, increíble el plano, no especifica las medidas del terreno.');
INSERT INTO public.comments VALUES (5, 7, 3, 'Hola buenas, increíble el plano, cuanto o como es tu método de cobro?');
INSERT INTO public.comments VALUES (6, 1, 3, 'hola!');
INSERT INTO public.comments VALUES (7, 7, 2, 'Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?');
INSERT INTO public.comments VALUES (8, 11, 1, 'Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?');
INSERT INTO public.comments VALUES (9, 11, 1, '???');
INSERT INTO public.comments VALUES (10, 9, 3, 'Hola buenas, me gusto tu plano');
INSERT INTO public.comments VALUES (11, 7, 4, 'Hola buenas, me gusto tu diseño del plano, mi lote es de 10mts de ancho por 25 de largo, podrías adaptar un plano para esas medidas');
INSERT INTO public.comments VALUES (12, 1, 8, 'Hola buenas, increíble el plano, quiero saber como lo cobra para hacer este tipos  de planos');
INSERT INTO public.comments VALUES (13, 1, 7, 'Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?');
INSERT INTO public.comments VALUES (14, 9, 9, 'Hola buenas, me gusto tu diseño del plano, y si quiero una segunda planta?');
INSERT INTO public.comments VALUES (15, 9, 7, 'hola!');
INSERT INTO public.comments VALUES (16, 9, 5, 'hola, no se ve la imagen');
INSERT INTO public.comments VALUES (17, 9, 3, 'Elizabet hola, no se ve la imagen!!!!');


--
-- TOC entry 5093 (class 0 OID 41141)
-- Dependencies: 240
-- Data for Name: comment_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5079 (class 0 OID 24710)
-- Dependencies: 226
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.followers VALUES (10, 2, 1);
INSERT INTO public.followers VALUES (12, 9, 7);
INSERT INTO public.followers VALUES (13, 7, 1);
INSERT INTO public.followers VALUES (16, 11, 7);
INSERT INTO public.followers VALUES (17, 11, 1);
INSERT INTO public.followers VALUES (18, 7, 9);
INSERT INTO public.followers VALUES (22, 1, 9);
INSERT INTO public.followers VALUES (24, 1, 11);
INSERT INTO public.followers VALUES (25, 9, 11);
INSERT INTO public.followers VALUES (26, 9, 1);
INSERT INTO public.followers VALUES (27, 1, 7);


--
-- TOC entry 5089 (class 0 OID 40961)
-- Dependencies: 236
-- Data for Name: interests; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.interests VALUES (1, 1, 4, 'Hola buenas tardes, me interesa, me pasas tu contacto?', '2026-05-27 19:01:12.476133-03');
INSERT INTO public.interests VALUES (2, 9, 2, 'Hola buenas tardes, me interesa, me pasas tu contacto y así hablamos?', '2026-05-27 19:02:54.633003-03');
INSERT INTO public.interests VALUES (3, 1, 8, '', NULL);
INSERT INTO public.interests VALUES (4, 1, 7, 'Hola buenas tardes, me interesa, me pasas tu contacto y así hablamos?', NULL);
INSERT INTO public.interests VALUES (5, 9, 9, 'Hola buenas tardes, me interesa, me pasas tu contacto y así hablamos?', NULL);


--
-- TOC entry 5083 (class 0 OID 24757)
-- Dependencies: 230
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notifications VALUES (1, 7, 1, 'comentario', 'comentó tu publicación', true);
INSERT INTO public.notifications VALUES (2, 7, 1, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (4, 1, 7, 'comentario', 'comentó tu publicación', true);
INSERT INTO public.notifications VALUES (3, 1, 7, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (7, 1, 11, 'comentario', 'comentó tu publicación', true);
INSERT INTO public.notifications VALUES (6, 1, 11, 'comentario', 'comentó tu publicación', true);
INSERT INTO public.notifications VALUES (5, 1, 11, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (10, 1, 11, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (11, 7, 9, 'comentario', 'comentó tu publicación', true);
INSERT INTO public.notifications VALUES (9, 7, 11, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (8, 7, 11, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (14, 9, 7, 'comentario', 'comentó tu publicación', true);
INSERT INTO public.notifications VALUES (13, 9, 7, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (12, 9, 7, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (16, 1, 9, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (20, 9, 1, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (19, 9, 1, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (18, 9, 1, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (17, 9, 1, 'follow', 'comenzo a seguirte', true);
INSERT INTO public.notifications VALUES (22, 9, 1, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (21, 9, 11, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (24, 1, 9, 'interes', 'marco me interesa en tu publicacion', true);
INSERT INTO public.notifications VALUES (15, 7, 9, 'valoracion', 'valoro tu publicacion', true);
INSERT INTO public.notifications VALUES (23, 9, 1, 'interes', 'marco me interesa en tu publicacion', true);
INSERT INTO public.notifications VALUES (25, 11, 1, 'follow', 'comenzo a seguirte', false);
INSERT INTO public.notifications VALUES (26, 11, 1, 'interes', 'marco me interesa en tu publicacion', false);
INSERT INTO public.notifications VALUES (27, 11, 1, 'comentario', 'comento tu publicacion', false);
INSERT INTO public.notifications VALUES (28, 11, 1, 'valoracion', 'valoro tu publicacion', false);
INSERT INTO public.notifications VALUES (29, 11, 1, 'comentario', 'comento tu publicacion', false);
INSERT INTO public.notifications VALUES (30, 11, 1, 'interes', 'marco me interesa en tu publicacion', false);
INSERT INTO public.notifications VALUES (31, 11, 1, 'follow', 'comenzo a seguirte', false);
INSERT INTO public.notifications VALUES (32, 11, 9, 'follow', 'comenzo a seguirte', false);
INSERT INTO public.notifications VALUES (33, 1, 9, 'follow', 'comenzo a seguirte', false);
INSERT INTO public.notifications VALUES (34, 1, 9, 'valoracion', 'valoro tu publicacion', false);
INSERT INTO public.notifications VALUES (35, 1, 9, 'interes', 'marco me interesa en tu publicacion', false);
INSERT INTO public.notifications VALUES (36, 1, 9, 'comentario', 'comento tu publicacion', false);
INSERT INTO public.notifications VALUES (37, 11, 9, 'valoracion', 'valoro tu publicacion', false);
INSERT INTO public.notifications VALUES (38, 11, 9, 'comentario', 'comento tu publicacion', false);
INSERT INTO public.notifications VALUES (39, 11, 9, 'comentario', 'comento tu publicacion', false);
INSERT INTO public.notifications VALUES (40, 7, 9, 'comentario', 'comento tu publicacion', false);
INSERT INTO public.notifications VALUES (41, 7, 1, 'follow', 'comenzo a seguirte', false);


--
-- TOC entry 5091 (class 0 OID 40984)
-- Dependencies: 238
-- Data for Name: post_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5081 (class 0 OID 24733)
-- Dependencies: 228
-- Data for Name: ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ratings VALUES (1, 2, 2, 1);
INSERT INTO public.ratings VALUES (3, 2, 1, 5);
INSERT INTO public.ratings VALUES (5, 7, 1, 1);
INSERT INTO public.ratings VALUES (6, 1, 3, 3);
INSERT INTO public.ratings VALUES (7, 7, 2, 3);
INSERT INTO public.ratings VALUES (8, 11, 1, 5);
INSERT INTO public.ratings VALUES (10, 11, 3, 3);
INSERT INTO public.ratings VALUES (11, 7, 4, 5);
INSERT INTO public.ratings VALUES (12, 9, 3, 5);
INSERT INTO public.ratings VALUES (13, 9, 2, 3);
INSERT INTO public.ratings VALUES (14, 11, 4, 4);
INSERT INTO public.ratings VALUES (15, 1, 4, 1);
INSERT INTO public.ratings VALUES (17, 1, 7, 1);
INSERT INTO public.ratings VALUES (18, 9, 9, 5);
INSERT INTO public.ratings VALUES (19, 9, 7, 1);


--
-- TOC entry 5099 (class 0 OID 0)
-- Dependencies: 233
-- Name: collection_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collection_posts_id_seq', 4, true);


--
-- TOC entry 5100 (class 0 OID 0)
-- Dependencies: 231
-- Name: collections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collections_id_seq', 3, true);


--
-- TOC entry 5101 (class 0 OID 0)
-- Dependencies: 239
-- Name: comment_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_reports_id_seq', 1, false);


--
-- TOC entry 5102 (class 0 OID 0)
-- Dependencies: 223
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 17, true);


--
-- TOC entry 5103 (class 0 OID 0)
-- Dependencies: 225
-- Name: followers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.followers_id_seq', 27, true);


--
-- TOC entry 5104 (class 0 OID 0)
-- Dependencies: 235
-- Name: interests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.interests_id_seq', 5, true);


--
-- TOC entry 5105 (class 0 OID 0)
-- Dependencies: 229
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 41, true);


--
-- TOC entry 5106 (class 0 OID 0)
-- Dependencies: 237
-- Name: post_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_reports_id_seq', 9, true);


--
-- TOC entry 5107 (class 0 OID 0)
-- Dependencies: 221
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 9, true);


--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 227
-- Name: ratings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ratings_id_seq', 19, true);


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


-- Completed on 2026-06-08 21:27:58

--
-- PostgreSQL database dump complete
--

\unrestrict 7tNE3ncVPy0egTSJAiXrBX3smtO99WAo4T5rkYZsF7l53E8W9btMcZJ06nkZK36

