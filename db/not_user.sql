-- The current user is NOT the author.
-- The title contains the search string.
select * from (select * from helo_users where username is not %1) u
join (select * from helo_posts where title like '%' + $1 + '%') p on p.id = u.id