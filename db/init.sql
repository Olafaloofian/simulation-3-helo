create table if not exists helo_users (
    id serial primary key,
    username varchar(20),
    password varchar(20),
    profile_pic text
);

create table if not exists helo_posts (
    id serial primary key,
    title varchar(45),
    img text,
    content text,
    author_id int references helo_users(id)
);

select * from helo_users;
select* from helo_posts;