SET sql_mode = '';

create database if not exists designer;

use designer;

create table if not exists designer_assignment (
   id varchar (1024) not null,
   user_id varchar(1024) not null,
   deal_id varchar(1024) not null,
   is_deleted bit(1) default false,
   created_at TIMESTAMP,
   updated_at TIMESTAMP,
   primary key (id)
) engine=innodb;