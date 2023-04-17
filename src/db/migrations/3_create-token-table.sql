create table if not exists token
(
    id        uuid primary key,
    type      varchar(10),
    expressIn bigint not null,
    deviceId  varchar(50),
    browserId varchar(50),
    createdAt bigint not null,
    updatedAt bigint not null,
    createdBy varchar(50),
    updatedBy varchar(50),
    version   int,
    userId    uuid references user_account (id)
)
