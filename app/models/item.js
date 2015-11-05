var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var ItemSchema = new Schema({

		estabelecimento: [{
			type: mongoose.Schema.ObjectId,
			ref: 'Estabelecimento'
		}],
		categoria: [{
			type: mongoose.Schema.ObjectId,
			ref: 'Categoria'
		}],
		descricao: {
			type: String,
			required: true
		},
		precoUni: {
			type: Number,
			required: true
		},
		disponivel: {
			type: Boolean,
			default: false
		},
		img: {
			type: String
		},
		desconto: {
			type: Number,
			default: 0.0
		}
	});

	return mongoose.model('Item', ItemSchema);

};