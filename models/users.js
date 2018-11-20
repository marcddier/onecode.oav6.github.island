const Sequelize = require('sequelize');

const sequelize = new Sequelize ('mydb','root','root', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'myDb.sqlite'
});

const User = sequelize.define('users', {
	nickname: {
			type: Sequelize.STRING
	},
	email: Sequelize.STRING,
	password: {
			type: Sequelize.STRING
	},
	fullname: Sequelize.STRING
});

let userSession;

class userModel {
  // static create(user, res) {
  //   db.run(
  //     `INSERT INTO user (nickname,email,password) 
  //   VALUES('${user.nickname}',
  //          '${user.email}',
  //          '${user.password}')`,
  //     (err, row) => {
  //       if (err) {
  //         res.send("Unexpected error :", err);
  //       } else {
  //         res.send("Created");
  //       }
  //     }
  //   );
  // }

  // static getAll(res) {
  //   db.all(`SELECT * from user`, (err, row) => {
  //     if (err) res.send(err);
  //     else if (row) {
  //       console.log(row);
  //       res.send(row);
  //     } else res.send("Nothing found");
  //   });
  // }

  // static getUser(id, res) {
  //   db.get(`SELECT * from user where id = ${id}`, (err, row) => {
  //     if (err) {
  //       res.send(err);
  //     } else if (row) {
  //       res.send({
  //         id: idSelected,
  //         nickname: row.nickname,
  //         email: row.email,
  //         password: row.password
  //       });
  //     } else {
  //       res.send("Nothing found");
  //     }
  //   });
  // }

  // static update(user, res) {
  //   db.run(
  //     `UPDATE user set 
  //             nickname = '${user.nickname}', 
  //             email = '${user.email}',
  //             password = '${user.password}' 
  //             WHERE id = '${user.id}'`,
  //     err => {
  //       if (err) res.send(err);
  //       else res.send("Updated");
  //     }
  //   );
  // }

  // static delete(id, res) {
  //   db.get(`DELETE  from user where id = ${id}`, (err, row) => {
  //     if (err) res.send(err);
  //     else res.send(`User has been successfully deleted :{"id" : ${id}`);
  //   });
  // }



  static signIn(data,req,res) {
    userSession = req.session;
    console.log(data)
    
    if(userSession.username){
      res.send("You'r already logged");
    }else{
      User
        .findAll({
          where: {
            nickname: data.nickname,
            password: data.password
          }
        })
        .then(result => {
          if(result){
            userSession.username = result.nickname;      
            res.redirect('/logged');
          }else{
            res.redirect('/login');
          }
        })
    }
  }

  static signUp(data,req,res){
    userSession = req.session;
    
    if(req.sesssion.username){
      res.send("You're logged in, please logout to register");
    }else{
      // insert
      sequelize
        .sync()
        .then(() => {
          User.create({
            nickname: data.nickname,
            email: data.email,
            password: data.password,
            fullname: data.fullname
          })
        })
      userSession.username = data.nickname;
      res.rediret('/logged');
      // res.send("Successfully registered");
    }
  }

  static signInPage(req, res) {
    if (req.session.username) {
      res.redirect('/logged')
      return;
    }
    res.render('../view/signIn.ejs')
  }

  static signUpPage(req, res) {
    if (req.session.username) {
      res.redirect('/logged')
      return;
    }
    res.render('../view/signUp.ejs')
  }

  static loggedPage(req, res) {
    if (!req.session.username) {
      res.redirect('/signIn')
      return;
    }
    res.render('../view/logged.ejs')
  }
}

module.exports = userModel;
