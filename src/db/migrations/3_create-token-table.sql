create table if not exists tokens
(
    id        varchar(300) primary key,
    type      varchar(10),
    expiresIn bigint not null,
    deviceId  varchar(50),
    browserId varchar(50),
    createdAt bigint not null,
    updatedAt bigint not null,
    createdBy varchar(50),
    updatedBy varchar(50),
    version   varchar(10),
    userId    uuid references user_account (id)
)
