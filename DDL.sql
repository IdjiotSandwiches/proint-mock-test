-- CrudLearn.dbo.Books definition

-- Drop table

-- DROP TABLE CrudLearn.dbo.Books;

CREATE TABLE CrudLearn.dbo.Books (
	Id uniqueidentifier NOT NULL,
	Code nvarchar(450) COLLATE Latin1_General_CI_AS NOT NULL,
	Title nvarchar(255) COLLATE Latin1_General_CI_AS NOT NULL,
	Description nvarchar(MAX) COLLATE Latin1_General_CI_AS NOT NULL,
	CreatedDate datetime2 NOT NULL,
	CONSTRAINT PK_Books PRIMARY KEY (Id)
);
 CREATE  UNIQUE NONCLUSTERED INDEX IX_Books_Code ON dbo.Books (  Code ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;