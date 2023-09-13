select proposals.*,  
(select media from users where users.id = proposals.skilled_id)  as image,  
(select fullname from users where users.id = proposals.skilled_id)  as name,  
(select location from users where users.id = proposals.skilled_id)  as location, 
(select count(*) from proposals, users where (  title like "%David%"  or description like "%David%"  or users.fullname like "%David%"  or users.location like "%David%"  ) and (   employer_id = 1  or skilled_id = 1  )  and (proposals.employer_id = users.id or proposals.skilled_id = users.id)  ) as size, 
ceil( (select count(*) from proposals, users where (  title like "%David%"  or description like "%David%"  or users.fullname like "%David%"  or users.location like "%David%"  ) and (   employer_id = 1  or skilled_id = 1  )  and (proposals.employer_id = users.id or proposals.skilled_id = users.id)  ) / 50) as page_count from proposals, users  
where (  title like "%David%"  or description like "%David%"  or users.fullname like "%David%"  or users.location like "%David%"  ) 
and (   employer_id = 1  or skilled_id = 1  )  
and (proposals.employer_id = users.id or proposals.skilled_id = users.id)    limit 50  offset 0