const sqlite = require('sqlite3').verbose();
const nanoid = require('nanoid');
//const path = require('path');
//const db_path = path.resolve(__dirname, 'task.sqlite');

const db = new sqlite.Database('task.sqlite');


// init databese
db.serialize(function(){
  db.run('PRAGMA foreign_keys=true');
  db.run(`create table if not exists tasks(
    id varchar(10) primary key,
    task text,
    state integer not null,
    created_at date not null,
    updated_at date not null
  )`);
  db.run(`create table if not exists problems(
    id varchar(10) primary key,
    task_id varchar(10) not null,
    problem text,
    solved boolean not null,
    created_at date not null,
    updated_at date not null,
    foreign key(task_id) references tasks(id)
  )`);
  db.run(`create table if not exists memos(
    id varchar(10) primary key,
    problem_id varchar(10) not null,
    memo text,
    created_at date not null,
    updated_at date not null,
    foreign key(problem_id) references problems(id)
  )`);
});

const all = async function(sql, params){
  return new Promise(function(resolve, reject){
    db.all(sql, params, function(err, res){
      if(err) reject(err);
      resolve(res);
    });
  });
}

const get = async function(sql, params){
  return new Promise(function(resolve, reject){
    db.get(sql, params, function(err, res){
      if(err) reject(err);
      resolve(res);
    });
  });
}

const run = async function(sql, params){
  return new Promise(function(resolve, reject){
    db.run(sql, params, function(err){
      if(err) reject(err);
      resolve();
    });
  });
}

const memo = {
  read: async function(memo_id){
    let result = await get(`select * from memos where id = '` + memo_id + `'`);
    return result;
  },
  read_from_problem_id : async function(problem_id){
    let memos = await all(`select id from memos where problem_id = '` + problem_id + `'`);
    let res = [];
    for(let m of memos){
      res.push(m.id);
    }
    return res;
  },
  create: async function(content, problem_id){
    try{
      await run(`insert into memos(id, problem_id, memo, created_at, updated_at)
      values('` + nanoid.nanoid(10) + `', '` + problem_id + `', '` + content +
      `', datetime('now', 'localtime'), datetime('now', 'localtime'))`);
    }catch{
      return false;
    }
    return true;
  },
  update: async function(id, content){
    try{
      await run(`update memos
      set memo = '` + content + `',
      updated_at = datetime('now', 'localtime')
      where id = '` + id + `'`);
    }catch{
      return false;
    }
    return true;
  },
  delete: async function(id){
    try{
      await run(`delete from memos where id = '` + id + `'`);
    }catch{
      return false;
    }
    return true;
  }
}

const problem = {
  read: async function(problem_id){
    let result = await get(`select * from problems where id = '` + problem_id + `'`);
    let memos = await memo.read_from_problem_id(problem_id);
    result['memos'] = memos;
    return result;
  },
  read_from_task_id: async function(task_id){
    let problems = await all(`select id from problems where task_id = '` + task_id + `'`);
    let res = [];
    for(let p of problems){
      res.push(p.id);
    }
    return res;
  },
  create: async function(content, task_id){
    try{
      await run(`insert into problems(id, task_id, problem, solved, created_at, updated_at)
      values ('` + nanoid.nanoid(10) + `', '` + task_id + `', '` + content +
      `', false, datetime('now', 'localtime'), datetime('now', 'localtime'))`);
    }catch{
      return false;
    }
    return true;
  },
  update: async function(id, content, solved){
    try{
      await run(`update problems
      set problem = '` + content + `',
      solved = ` + solved + `,
      updated_at = datetime('now', 'localtime')
      where id = '` + id + `'`);
    }catch{
      return false;
    }
    return true;
  },
  delete: async function(id){
    try{
      await run(`delete from memos where problem_id = '` + id + `'`);
      await run(`delete from problems where id = '` + id + `'`);
    }catch(e){
      console.log('p')
      return false;
    }
    return true;
  }
}

const task = {
  read: async function(state){
    let result = await all(`select * from tasks where state = ` + state);
    for(let i = 0; i < result.length; i++){
      let problems = await problem.read_from_task_id(result[i].id);
      result[i]['problems'] = problems;
    }
    return result;
  },
  create: async function(content){
    try{
      await run(`insert into tasks(id, task, state, created_at, updated_at)
      values('` + nanoid.nanoid(10) + `', '` + content
      + `', 0, datetime('now', 'localtime'), datetime('now', 'localtime'))`);
    }catch(e){
      console.log(e)
      return false;
    }
    return true;
  },
  update: async function(id, content, state){
    try{
      await run(`update tasks
      set task = '` + content + `',
      state = ` + state + `,
      updated_at = datetime('now', 'localtime')
      where id = '` + id + `'`);
    }catch{
      return false;
    }
    return true;
  },
  delete: async function(id){
    try{
      let problems = await problem.read_from_task_id(id);
      for(let problem_id of problems){
        await problem.delete(problem_id);
      }
      await run(`delete from tasks where id = '` + id + `'`);
    }catch(e){
      console.log('t' + e)
      return false;
    }
    return true;
  }
}

module.exports = {
  install(Vue){
    Vue.prototype.$crud = {
      task,
      problem,
      memo,
      close: function(){
        db.close();
      }
    }
  }
}