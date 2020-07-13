CREATE TABLE [Employee]
(
 [Id]        UNIQUEIDENTIFIER NOT NULL ,
 [FullName]  varchar(80) NOT NULL ,
 [BirthDate] datetime NOT NULL ,
 [CreationDate] datetime NOT NULL ,
 [Email]     varchar(254) NULL ,
 [Gender]    int NOT NULL ,
 [Enabled]   bit NOT NULL ,


 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([Id] ASC)
);
GO

CREATE TABLE [EmployeeSkills]
(
 [EmployeeId] UNIQUEIDENTIFIER NOT NULL ,
 [Skill]      int NOT NULL 
 
 CONSTRAINT [FK_EMPLOYEE] FOREIGN KEY ([EmployeeId])  REFERENCES [Employee]([Id]),
);
GO

CREATE NONCLUSTERED INDEX [FK_EMPLOYEE] ON [EmployeeSkills] 
 (
  [EmployeeId] ASC
 )

GO

