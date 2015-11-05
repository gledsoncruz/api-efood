var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Categoria = app.models.categoria;
	var controller = {};

	controller.findAll = function(req, res){
		Categoria.find(function(err, categorias) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(categorias);
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Categoria.findOne({'_id' :id}, function(err, categoria){
			if (err){
				//return res.json(401, err.message)
				return res.status(401).json({message: 'Categoria não encontrada'})
			}
			return res.json(categoria);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		Categoria.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Erro ao alterar registro.'});
				}

				return res.status(202).json({success: true, message: 'Alterado com sucesso'})
			});
	}

	controller.save = function(req, res){
		var dados = {
		    "descricao" : sanitize(req.body.descricao),

		};

		Categoria.create(dados, function(err, categoria){
			if (err){
				return res.send(err);
			}

			return res.send(categoria);
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		Categoria.remove({'_id' :id}, function(err, categoria){
			if (err){
				res.status(401).json({message: 'Erro ao excluir categoria'})
			}
			res.json({message: 'Categoria deletado com sucesso'})
		})
	}


	return controller;

}