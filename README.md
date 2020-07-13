# CadastroFuncionario

Sistema para cadastro de funcionários maiores de 18 anos e que tenha ao menos uma habilidade. Implementado com .net core e angular, em arquitetura ddd com cqrs.</br>
</br>
O sistema contem as seguintes funcionalidades: </br>
</br>
Cadastro/Edição dos Funcionários</br>
--> Nome Completo (obrigatório inclusive o sobrenome)</br>
--> Data Nascimento (obrigatório e a data no formato BR)</br>
--> Email (não obrigatório mas quando preenchido deve ser válido)</br>
--> Sexo (obrigatório)</br>
--> Habilidades (C#, Java, Angular, SQL, ASP) (obrigatório)</br>
</br>
</br>
Relatório </br>
--> Filtro por: Idade, Sexo, Habilidades, Nome </br>
--> Colunas: Nome, Data Nascimento, Idade, Email, Sexo, Habilidades, Opção para Ativar / Desativar </br>
--> Paginação </br>
</br>
</br>
Tecnologias a serem utilizadas:</br>
</br>
WEB API C#</br>
Dapper</br>
Angular</br>
MS SQL Server</br>
DDD</br>
CQRS</br>
</br>
** Script para criação das tabelas na pasta "Scripts DB" dentro da camada de infra.</br>
** Lembrar de alterar a conection string dentro da camada de api para que a aplicação ache o banco.</br>
