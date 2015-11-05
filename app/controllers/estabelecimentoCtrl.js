var sanitize = require('mongo-sanitize');
module.exports = function(app){

	var Estabelecimento = app.models.estabelecimento;
	var controller = {};

	controller.findAll = function(req, res){
		Estabelecimento.find(function(err, estabelecimentos) {
		    if (err) {
		      return res.send(err);
		    }

		    res.json(estabelecimentos);
		});
	}

	controller.findById = function(req, res){
		var id = sanitize(req.params.id);
		Estabelecimento.findOne({'_id' :id}).populate('user').exec(function(err, estabelecimento){
			if (err){
				//return res.json(401, err.message)
				return res.status(401).json({message: 'Estabelecimento não encontrado'})
			}
			return res.json(estabelecimento);
		});
	}

	controller.findByUserId = function(req, res){
		var id = sanitize(req.params.id);
		Estabelecimento.find({'user' :id}, function(err, estabelecimentos){
			if (err){
				//return res.json(401, err.message)
				return res.status(401).json({message: 'Estabelecimento não encontrado'})
			}
			return res.json(estabelecimentos);
		});
	}

	controller.update = function(req, res){
		var id = sanitize(req.params.id);
		var updates = req.body;
		Estabelecimento.update({"_id" :id}, req.body,
			function(err){
				if (err){
					return res.json({ success: false, message: 'Erro ao alterar registro.'});
				}

				return res.status(202).json({success: true, message: 'Alterado com sucesso'})
			});
	}

	controller.save = function(req, res){
		var dados = {
			"user" : req.decoded.id,
		    "cnpj" : sanitize(req.body.cnpj),
		    "responsavel" : sanitize(req.body.responsavel),
		    "tipo" : sanitize(req.body.tipo)

		};

		Estabelecimento.create(dados, function(err, estabelecimento){
			if (err){
				return res.send(err);
			}

			return res.send(estabelecimento);
		});
	}

	controller.delete = function(req, res){
		var id = sanitize(req.params.id);
		Estabelecimento.remove({'_id' :id}, function(err, estabelecimento){
			if (err){
				res.status(401).json({message: 'Erro ao excluir estabelecimento'})
			}
			res.json({message: 'Estabelecimento deletado com sucesso'})
		})
	}


	return controller;

}