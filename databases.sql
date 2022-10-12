create table Product(pname varchar(30) primary key, price float, category varchar(30), manufacturer varchar(30) references Company);

insert into Product values('Gizmo',19.99,'Gadgets','GizmoWorks');
insert into Product values('PowerGizmo',29.99,'Gadgets','GizmoWorks');
insert into Product values('SingleTouch',149.99,'Photography','Canon');
insert into Product values('Multitouch',203.99,'Household','Hitachi');
insert into Product values('SuperGizmo',49.99, 'Gadgets', 'Hitachi');
insert into Product values('Gizmo-Plus',NULL,'Gadgets','GizmoWorks');
insert into Product values('SingleTouch-Light',89.99,'Photography','Canon');
insert into Product values('SingleTouch++',79.99,'Photography','MonkeyBiz');
