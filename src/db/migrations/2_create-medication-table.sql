create table if not exists medication
(
    id               uuid primary key,
    title            varchar(50),
    description      varchar(500),
    count            int,
    destinationCount int    not null,
    createdAt        bigint not null,
    updatedAt        bigint not null,
    createdBy        varchar(50),
    updatedBy        varchar(50),
    version          int,
    userId           uuid references user_account (id)
)
