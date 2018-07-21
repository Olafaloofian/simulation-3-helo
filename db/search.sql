select * from (select * from helo_posts where title like '%' + $1 + '%') p
join helo_users u on p.id = u.id