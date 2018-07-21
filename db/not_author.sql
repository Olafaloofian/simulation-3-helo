select * from (select * from helo_users where username is not %1) u
join helo_posts p on p.id = u.id