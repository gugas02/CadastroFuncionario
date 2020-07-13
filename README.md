# CadastroFuncionario

sistema para cadastro de funcionários maiores de 18 anos e que tenha ao menos uma habilidade. Implementado com .net core e angular, em arquitetura ddd com cqrs.

O sistema contem as seguintes funcionalidades 

Cadastro/Edição dos Funcionários
--> Nome Completo (obrigatório inclusive o sobrenome)
--> Data Nascimento (obrigatório e a data deve estar no formato BR)
--> Email (não obrigatório mas quando preenchido deve ser válido)
--> Sexo (obrigatório)
--> Habilidades (C#, Java, Angular, SQL, ASP) (obrigatório) 


Relatório 
--> Filtro por: Idade, Sexo, Habilidades, Nome 
--> Colunas: Nome, Data Nascimento, Idade, Email, Sexo, Habilidades, Opção para Ativar / Desativar
--> Paginação


Tecnologias a serem utilizadas:

WEB API C#
Dapper
Angular
MS SQL Server
DDD
CQRS

** Script para criação das tabelas na pasta "Scripts DB" dentro da camada de infra.
** Lembrar de alterar a conection string dentro da camada de api para que a aplicação ache o banco.
