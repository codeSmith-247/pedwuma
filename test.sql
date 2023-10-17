
create table Appointements (
  id int not null auto_increment primary key,
  sender_id int not null,
  recipient_id int not null,

  title varchar(255) not null,
  `desc` varchar(255) not null,
  start timestamp default now(),
  end timestamp default now(),
    
   created_at timestamp default now() not null,
   updated_at timestamp default now() not null on update now(),
   status varchar(255) not null default 'active'
) default charset utf8;