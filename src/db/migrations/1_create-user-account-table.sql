create table if not exists user_account
(
    id        uuid primary key,
    firstName varchar(50),
    lastName  varchar(50),
    username  varchar(50),
    email     varchar(50),
    password  varchar(300),
    createdAt bigint not null,
    updatedAt bigint not null,
    createdBy uuid,
    updatedBy uuid,
    version   varchar(10)
)
