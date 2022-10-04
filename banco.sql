-- criação da tabela prédios
create table racas (
	codigo serial primary key, 
	nome varchar(40) not null	
	pesoMaximo decimal(4,2) not null, 
);

-- inserindo registros na tabela prédios
insert into raca (nome, pesoMaximo) 
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