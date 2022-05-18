// mysql> explain auth_base;
// +-------------+--------------+------+-----+---------+----------------+
// | Field       | Type         | Null | Key | Default | Extra          |
// +-------------+--------------+------+-----+---------+----------------+
// | ID          | int          | NO   | PRI | NULL    | auto_increment |
// | first_name  | varchar(10)  | NO   |     | NULL    |                |
// | second_name | varchar(50)  | NO   |     | NULL    |                |
// | mail        | varchar(100) | NO   |     | NULL    |                |
// | password    | char(50)     | NO   |     | NULL    |                |
// +-------------+--------------+------+-----+---------+----------------+
//     5 rows in set (0,00 sec)


//mysql> SELECT * FROM auth_base;
// +----+------------+-------------+--------------+----------+
// | ID | first_name | second_name | mail         | password |
// +----+------------+-------------+--------------+----------+
// |  1 | Pavel      | Bodnar      | mail@mail.ru | 123456   |
// +----+------------+-------------+--------------+----------+
// 1 row in set (0,00 sec)

//Emitted 'error' event on Server instance at:
//     at emitErrorNT (net.js:1358:8)
//     at processTicksAndRejections (internal/process/task_queues.js:82:21) {
//   code: 'EADDRINUSE',
//   errno: -48,
//   syscall: 'listen',
//   address: '::',
//   port: 3500
// }

