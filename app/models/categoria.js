var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function(){

	var CategoriaSchema = new Schema({

		descricao: {
			type: String,
			required: true
		},
		updated_at: {
			type: Date,
			default: Date.now
		},
		created_at: {
			type: Date,
			default: Date.now
		}

	});

	CategoriaSchema.pre('update', function() {
	  this.update({},{ $set: { updated_at: new Date() } });
	});

	return mongoose.model('Categoria', CategoriaSchema);

};