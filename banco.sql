-- criação da tabela prédios
create table racas (
	codigo serial primary key, 
	nome varchar(40) not null, 
	pesomaximo integer not null
);

-- inserindo registros na tabela prédios
insert into racas (nome, pesoMaximo) 
values ('Maltes', 12)
returning codigo, nome;


-- criação da tabela salas
create table caes (
	codigo serial primary key, 
	nome varchar(40) not null, 
	cliente varchar(40) not null, 
	peso integer not null, 
	raca integer not null, 
	foreign key (raca) references racas (codigo)
);

-- inserindo alguns registros na tabela salas
insert into caes (nome, cliente, peso, raca) 
values ('Guri', 'Rubia', 12, 1), ('Schebaca', 'Rubia', 9, 1)
returning codigo, nome, cliente, peso, raca;


-- criação da tabela usuários
create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

-- inserindo alguns registros na tabela usuários
insert into usuarios (email, senha, tipo, telefone, nome) 
values ('jorgebavaresco@ifsul.edu.br', '123456', 'A','(54)99984-4348','Jorge Bavaresco'), 
('joao@ifsul.edu.br', '123456', 'U','(54)44484-4348','Joao');