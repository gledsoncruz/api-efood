var express = require('express');

module.exports = function(app){

	var userCtrl = app.controllers.userCtrl;
	var loginCtrl = app.controllers.loginCtrl;
	var categoriaCtrl = app.controllers.categoriaCtrl;
	var estabelecimentoCtrl = app.controllers.estabelecimentoCtrl;
	var itemCtrl = app.controllers.itemCtrl;
	var pedidoCtrl = app.controllers.pedidoCtrl;

	var router = express.Router();
    app.use('/efood/api', router);

	router.route('/signup')
	   .post(userCtrl.save);

	router.route('/login')
	  .post(loginCtrl.authenticate);

	//TOKEN REQUIRED ZONE!!!!
	router.use(loginCtrl.validateJWT);

	router.route('/me')
	   .get(function(req, res){
	   	//console.log('response: '+ req);
		res.json(req.decoded);
	});

	// AUTHORIZATION ZONE
	//router.use(loginCtrl.authorize);

	router.route('/users/:id')
	  .get(loginCtrl.authorize, userCtrl.findById)
	  .delete(loginCtrl.authorize, userCtrl.delete)
	  .put(userCtrl.update);

	router.route('/users/estabelecimentos/:id')
	  .get(estabelecimentoCtrl.findByUserId);

	router.route('/users')
	  .get(loginCtrl.authorize,userCtrl.findAll);

	//CATEGORIAS

	router.route('/categorias')
	  .get(categoriaCtrl.findAll)
	  .post(categoriaCtrl.save);

	router.route('/categorias/:id')
	  .get(categoriaCtrl.findById)
	  .delete(categoriaCtrl.delete)
	  .put(categoriaCtrl.update);

	  //ESTABELECIMENTOS

	router.route('/estabelecimentos')
	  .get(estabelecimentoCtrl.findAll)
	  .post(estabelecimentoCtrl.save);

	router.route('/estabelecimentos/:id')
	  .get(estabelecimentoCtrl.findById)
	  .delete(estabelecimentoCtrl.delete)
	  .put(estabelecimentoCtrl.update);

	app.use(function(req,res){
	    res.status(404).send({message: 'Erro 404: Rota não encontrada'});
	});

}
