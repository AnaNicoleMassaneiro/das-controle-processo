-- DROPS
	
DROP TABLE IF EXISTS item_do_pedido;
DROP TABLE IF EXISTS pedido;
DROP TABLE IF EXISTS produto;
DROP TABLE IF EXISTS cliente;  
DROP SEQUENCE IF EXISTS seq_cliente_id;
DROP SEQUENCE IF EXISTS seq_pedido_id;
DROP SEQUENCE IF EXISTS seq_produto_id;     

-- SEQUENCIAS 

CREATE SEQUENCE seq_cliente_id INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;
CREATE SEQUENCE seq_pedido_id INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;
CREATE SEQUENCE seq_produto_id INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1;

-- TABELAS

create table produto(
	id int not null primary key,
	descricao varchar(45) not null
);

create table cliente(
	id int not null primary key,
	cpf varchar(11) not null,
	nome varchar(50) not null,
	sobrenome varchar(50) not null
);

create table pedido(
	id int not null primary key,
	data date not null,
	id_cliente int not null,
	CONSTRAINT fk_pedido_id_cliente FOREIGN KEY(id_cliente) REFERENCES cliente(id)
);

create table item_do_pedido(
	id_pedido int not null,
	id_produto int not null,
	qtdade int not null,
	CONSTRAINT fk_itempedido_id_pedido FOREIGN KEY(id_pedido) REFERENCES pedido(id),
	CONSTRAINT fk_itempedido_id_produto FOREIGN KEY(id_produto) REFERENCES produto(id)
);

-- MASSA DE DADOS

insert into cliente (id, cpf, nome, sobrenome) values
(nextval('seq_cliente_id'), '98901179083', 'Marcos', 'Lima'),
(nextval('seq_cliente_id'), '90397288018', 'Ana', 'Massaneiro'),
(nextval('seq_cliente_id'), '80948890045', 'Giovana', 'Barreto'),
(nextval('seq_cliente_id'), '54053704014', 'Robson', 'Rodrigues'), 
(nextval('seq_cliente_id'), '21666147010', 'Pablya', 'Marchette');

insert into produto (id, descricao) values
(nextval('seq_produto_id'), 'Açúcar'),
(nextval('seq_produto_id'), 'Sal'),
(nextval('seq_produto_id'), 'Arroz'),
(nextval('seq_produto_id'), 'Feijão'),
(nextval('seq_produto_id'), 'Farinha'),
(nextval('seq_produto_id'), 'Macarrão'),
(nextval('seq_produto_id'), 'Café'),
(nextval('seq_produto_id'), 'Leite'),
(nextval('seq_produto_id'), 'Óleo'),
(nextval('seq_produto_id'), 'Temperos'),
(nextval('seq_produto_id'), 'Molho de tomate'),
(nextval('seq_produto_id'), 'Queijo ralado'),
(nextval('seq_produto_id'), 'Ovos'),
(nextval('seq_produto_id'), 'Fermento'),
(nextval('seq_produto_id'), 'Pães'),
(nextval('seq_produto_id'), 'Carnes'),
(nextval('seq_produto_id'), 'Iogurte'),
(nextval('seq_produto_id'), 'Margarina ou manteiga'),
(nextval('seq_produto_id'), 'Maisena'),
(nextval('seq_produto_id'), 'Biscoitos'),
(nextval('seq_produto_id'), 'Hortaliças em geral'),
(nextval('seq_produto_id'), 'Produtos de limpeza'),
(nextval('seq_produto_id'), 'Sabão em pedra'),
(nextval('seq_produto_id'), 'Sabão em pó'),
(nextval('seq_produto_id'), 'Detergente'),
(nextval('seq_produto_id'), 'Desinfetante'),
(nextval('seq_produto_id'), 'Amaciante'),
(nextval('seq_produto_id'), 'Lustra-móveis'),
(nextval('seq_produto_id'), 'Álcool em gel'),
(nextval('seq_produto_id'), 'Água sanitária'),
(nextval('seq_produto_id'), 'Inseticida'),
(nextval('seq_produto_id'), 'Esponja de pia'),
(nextval('seq_produto_id'), 'Esponja de aço'),
(nextval('seq_produto_id'), 'Sacos de lixo'),
(nextval('seq_produto_id'), 'Luvas plásticas'),
(nextval('seq_produto_id'), 'Flanelas'),
(nextval('seq_produto_id'), 'Produtos de higiene e uso pessoal'),
(nextval('seq_produto_id'), 'Sabonete'),
(nextval('seq_produto_id'), 'Creme dental'),
(nextval('seq_produto_id'), 'Escova de dente'),
(nextval('seq_produto_id'), 'Fio dental'),
(nextval('seq_produto_id'), 'Absorventes'),
(nextval('seq_produto_id'), 'Barbeador descartável'),
(nextval('seq_produto_id'), 'Creme de barbear'),
(nextval('seq_produto_id'), 'Algodão'),
(nextval('seq_produto_id'), 'Desodorante'),
(nextval('seq_produto_id'), 'Shampoo e condicionador'),
(nextval('seq_produto_id'), 'Papel higiênico'),
(nextval('seq_produto_id'), 'Água oxigenada'),
(nextval('seq_produto_id'), 'Gaze'),
(nextval('seq_produto_id'), 'Hastes flexíveis'),
(nextval('seq_produto_id'), 'Esparadrapo'),
(nextval('seq_produto_id'), 'Curativos'),
(nextval('seq_produto_id'), 'Produtos úteis para o dia a dia'),
(nextval('seq_produto_id'), 'Papel alumínio'),
(nextval('seq_produto_id'), 'Papel filme'),
(nextval('seq_produto_id'), 'Papel toalha'),
(nextval('seq_produto_id'), 'Guardanapo de papel'),
(nextval('seq_produto_id'), 'Fósforo'),
(nextval('seq_produto_id'), 'Velas'),
(nextval('seq_produto_id'), 'Lâmpadas'),
(nextval('seq_produto_id'), 'Fita isolante'),
(nextval('seq_produto_id'), 'Fita crepe');

select 'CRIADO COM SUCESSO!'