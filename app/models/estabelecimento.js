var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var EstabelecimentoSchema = new Schema({

		user: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		cnpj: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		tipo: {
			type: String,
			required: true
		},
		ativo: {
			type: Boolean,
			default: false
		}
	});

	return mongoose.model('Estabelecimento', EstabelecimentoSchema);

};