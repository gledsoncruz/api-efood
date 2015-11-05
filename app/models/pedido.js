var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var PedidoSchema = new Schema({
		user: [{
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		}],
		item: [{
			type: mongoose.Schema.ObjectId,
			ref: 'Item'
		}],
		quant: {
			type: Number,
			default: 0,
			required: true
		},
		cancelado: {
			type: Boolean,
			required: true,
			default: false
		},
		dtaPedido: {
			type: Date, //admin, gerente, funcionario, appuser
			default: Date.now

		}
	});

	return mongoose.model('Pedido', PedidoSchema);

};