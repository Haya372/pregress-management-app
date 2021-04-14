const mysql = require('mysql');
let connection;

const nanoid = require('nanoid');

const state_map = ["進行中", "保留", "終了済み"];

function init(){
  connection = mysql.createConnection({host:'localhost', user: 'root', database: 'taskapp'});
  connection.connect();
  // init databese
  connection.query({host:'localhost', user: 'root', database: 'taskapp'});
  connection.query(`create table if not exists tasks(
    id varchar(10) primary key,
    task text,
    state integer not null,
    created_at date not null,
    updated_at date not null
  )`);
  connection.query(`create table if not exists problems(
    id varchar(10) primary key,
    task_id varchar(10) not null,
    problem text,
    solved boolean not null,
    created_at date not null,
    updated_at date not null,
    foreign key(task_id) references tasks(id)
  )`);
  connection.query(`create table if not exists memos(
    id varchar(10) primary key,
    problem_id varchar(10) not null,
    memo text,
    created_at date not null,
    updated_at date not null,
    foreign key(problem_id) references problems(id)
  )`);
}

const memo = {
  read: function(memo_id, cb){
    if(!connection) init();
    connection.query(`select * from memos where id = '` + memo_id + `'`, function(err, result, fields){
      if(err) console.log(err);
      if(fields) fields = null;
      cb(result);
    });
  },
  read_from_problem_id : function(problem_id, cb){
    if(!connection) init();
    connection.query(`select id from memos where problem_id = '` + problem_id + `'`, function(err, rows, fields){
      if(fields) fields = null;
      let res = [];
      for(let m of rows){
        console.log(m);
        res.push(m.id);
      }
      cb(res);
    });
  },
  create: function(content, problem_id){
    if(!connection) init();
    connection.query(`insert into memos(id, problem_id, memo, created_at, updated_at)
    values('` + nanoid.nanoid(10) + `', '` + problem_id + `', '` + content +
    `', now(), now())`);
  },
  update: function(id, content){
    if(!connection) init();
    connection.query(`update memos
    set memo = '` + content + `',
    updated_at = now()
    where id = '` + id + `'`);
  },
  delete: function(id){
    if(!connection) init();
    connection.query(`delete from memos where id = '` + id + `'`);
  }
}

const problem = {
  read: function(problem_id, cb){
    if(!connection) init();
    connection.query(`select * from problems where id = '` + problem_id + `'`, function(err, row, fields){
      if(fields) fields = null;
      let memos;
      memo.read_from_problem_id(problem_id, function(result){
        memos = result;
      });
      row[0]['memos'] = memos;
      cb(row[0]);
    });
  },
  read_from_task_id: function(task_id, cb){
    if(!connection) init();
    connection.query(`select id from problems where task_id = '` + task_id + `'`, function(err, rows, fields){
      if(err) console.log(err);
      if(fields) fields = null;
      let res = [];
      for(let p of rows){
        res.push(p.id);
      }
      cb(res);
    });
  },
  create: function(content, task_id){
    if(!connection) init();
    connection.query(`insert into problems(id, task_id, problem, solved, created_at, updated_at)
    values ('` + nanoid.nanoid(10) + `', '` + task_id + `', '` + content +
    `', false, now(), now())`);
  },
  update: function(id, content, solved){
    connection.query(`update problems
    set problem = '` + content + `',
    solved = ` + solved + `,
    updated_at = now()
    where id = '` + id + `'`);
  },
  delete: function(id){
    if(!connection) init();
    connection.query(`delete from memos where problem_id = '` + id + `'`, function(err){
      if(err) console.log(err);
      else{
        connection.query(`delete from problems where id = '` + id + `'`);
      }
    });
  }
}

const task = {
  read: function(state, cb){
    if(!connection) init();
    connection.query(`select * from tasks where state = ` + state, function(err, rows, fields){
      if(err) console.log(err);
      if(fields) fields = null;
      for(let i = 0; i < rows.length; i++){
        let problems = [];
        problem.read_from_task_id(rows[i].id, function(result){
          problems = result;
        });
        rows[i]['problems'] = problems;
        rows[i]['state'] = state_map[rows[i]['state']];
      }
      cb(rows);
    });
  },
  create: function(content, cb){
    if(!connection) init();
    connection.query(`insert into tasks(id, task, state, created_at, updated_at)
    values('` + nanoid.nanoid(10) + `', '` + content
    + `', 0, now(), now())`, function(){
      cb();
    });
  },
  update: function(id, content, state, cb){
    if(!connection) init();
    connection.query(`update tasks
    set task = '` + content + `',
    state = ` + state + `,
    updated_at = now()
    where id = '` + id + `'`, function(){
      cb();
    });
  },
  delete: function(id, cb){
    if(!connection) init();
    problem.read_from_task_id(id, function(problems){
      for(let problem_id of problems){
        problem.delete(problem_id);
      }
      connection.query(`delete from tasks where id = '` + id + `'`, function(){
        cb();
      });
    });
  }
}

module.exports = {
  install(Vue){
    Vue.prototype.$crud = {
      task,
      problem,
      memo,
      close: function(){
        connection.end();
      }
    }
  }
}