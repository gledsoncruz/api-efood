var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var User = app.models.user;
	var loginCtrl = app.controllers.loginCtrl;
	var controller = {};

	controller.findAll = function(req, res){
		User.find(function(err, users) {
		    if (err) {
		      return res.send(err);
		    }
		    res.json(users);
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		User.findOne({'_id' :id}, function(err, user){
			if (err){
				return res.status(401).json({message: 'Usuário não encontrado'})
			}
			return res.json(user);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		User.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Error updated.'});
				}
				return res.status(202).json({success: true, message: 'User has been updated'})
			});
	}

	controller.save = function(req, res){
		var dados = {
			"cpf" : sanitize(req.body.cpf),
		    "nome" : sanitize(req.body.nome),
		    "dtaNasc" : sanitize(req.body.dtaNasc),
		    "genero" : sanitize(req.body.genero),
		    "email" : sanitize(req.body.email),
		    "password" : sanitize(req.body.password),
		    "role" : sanitize(req.body.role)
		};

		User.create(dados, function(err, user){
			if (err){
				if (err.code == 11000)
					return res.status(401).json({ success: false, message: 'Email or cpf already exists.'});
				else
					return res.send(err);
			}
			//var token = loginCtrl.createToken(user);

			return res.json({
				success: true,
				message: 'User has been created !'
				//token: token
			})
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		User.remove({'_id' :id}, function(err, user){
			if (err){
				res.status(401).json({message: 'Error delete user'})
			}
			res.json({message: 'User has been deleted'})
		})
	}


	return controller;

}