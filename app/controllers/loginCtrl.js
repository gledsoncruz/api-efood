var jsonwebtoken = require('jsonwebtoken');
var efoodToken = '562666bbbccc36f42a84c9fd562667d8bccc36f42a84c9ff';

module.exports = function(app){

	var User = app.models.user;
	var controller = {};

	function createToken(user){

		var token = jsonwebtoken.sign({
			id: user._id,
			nome: user.nome,
			email: user.email,
			role: user.role,
			bloqueado: user.bloqueado
		}, efoodToken, {
			expiresIn: 1440
		});

		return token;
	}

	controller.authorize = function(req, res, next){

		var id = req.decoded.id;
		//console.log(id);
		User.findOne({_id: id}).select('role permissions').exec(function (err, user){
			if (err) throw err;
			if (user.role === 'admin'){
				next();
			} else {
				console.log(err);
				res.status(403).send({success: false, message: 'Unauthorized'});
			}
			/*
			for (i = 0; i < user.permissions.length; i++){
				console.log(user.permissions[i]);
			}*/

		});
	}

	controller.authenticate = function(req, res){

		var email = req.body.email || '';
		var password = req.body.password || '';

		if (email == '' || password == '') {
		    return res.sendStatus(401);
		}

		User.findOne({email: email, $or:[ {role: 'gerente'}, {role: 'admin'}]}).select('nome email password role bloqueado').exec(function (err, user) {

			if (err) throw err;

			if(!user){
				res.send({message: 'User doenst exist'});
			} else if (!user.bloqueado){
				//console.log(user);
				var validPassword = user.comparePassword(req.body.password);

				if (!validPassword){
					res.send({message: 'User or password doenst exists'})
				} else {
					var token = createToken(user);

					res.json({
						success: true,
						message: 'Successfuly login !',
						token: token
					})
				}
			} else {
				res.send({ message: 'Usuário bloqueado, entre em contato com o administrador'})
			}
		});
	}

	controller.validateJWT = function(req, res, next){
		//console.log('Validate jwt');

		var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
		//console.log('API-Token: ' +token);
		if (token){
			jsonwebtoken.verify(token, efoodToken, function(err, decoded){
				//console.log('Token: ' +token);
				if (err){
					res.status(403).send({success: false, message: 'Failed authenticate user'});
				} else {
					req.decoded = decoded;
					//console.log(req.decoded);
					next();
				}
			});
		} else {

			res.status(403).send({success: false, message: 'No token provided'});
		}

	}

	return controller;

}


