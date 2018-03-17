var studies = require('./studies.js');
var db = require('./db.js');
var mock_votes = require('../test_data/votes.json');

var votes = require('./votes.js');


votes.findOne = function(dict, cb){
	var key = Object.keys(dict)[0];
//	console.log(key);
	var value = dict[key].val;
//	console.log(value);
//	console.log('key = ' + key + '; value = ' + value);
	for(var m_i in mock_votes){
		console.log( " key = " +  mock_votes[m_i][key]);
		console.log( " val =  " + value);
		if(mock_votes[m_i][key] == value){
			cb(null, mock_votes[m_i]);
		};
	};
};


votes.find = function(dict){
	console.log(25);
	var input_keys = Object.keys(dict);
	var values = [];
	var result = [];
	//console.log(key);
	for(var i = 0; i < input_keys.length; i++){
		if(typeof dict[input_keys[i]] === 'object' && dict[input_keys[i]] !== null){		
			values.push(dict[input_keys[i]].val);
		}
		else{
			values.push(dict[input_keys[i]]);			
		}
	}

	console.log("values at 39 ");
	console.log(values);
	console.log(input_keys);

	//	console.log(value);
	//	console.log('key = ' + key + '; value = ' + value);
	for(var m_i = 0; m_i < mock_votes.length; m_i++){
		var study = mock_votes[m_i];
		for(var i=0; i < input_keys.length; i++){
			if(study[input_keys[i]] == values[i]){
				console.log("this is equal" + values[i]);
				console.log(study);
				console.log(mock_votes[m_i]);
				if( i == ((input_keys.length)-1)){
					result.push(mock_votes[m_i]);
					console.log(result);
				}
			}
		}
		if(m_i == (mock_votes.length - 1)){
			console.log("there is a result");
			//console.log(result);
			return {
				toArray:  function(cb){
					cb(null, result);
				}
			};
		}
	};
};






votes.find.prototype.toArray = function(input){
	console.log("inside our toArray");
	console.log(input);
	return input;
};


votes.update = function(identifier, value){
	var identifier_key = Object.keys(identifier)[0];
	//	console.log(key);
	if(typeof identifier[identifier_key] === 'object' && identifier[identifier_key] !== null){
		var identifier_value = identifier[identifier_key].val;
	}
	else{
		var identifier_value = identifier[identifier_key];
	}

	var set_or_unset = Object.keys(value)[0];
	if(set_or_unset.toString() == '$set'){
		var key_to_be_set = Object.keys(value[set_or_unset])[0];
		var val_to_be_set = value[set_or_unset][key_to_be_set];
	}

	for(var m_i in mock_votes){
		if(mock_votes[m_i][identifier_key] == identifier_value){
			mock_votes[m_i][key_to_be_set] = val_to_be_set;
		}
		if(m_i == (mock_votes.length)-1){
			fs.writeFile("../test_data/votes.json", mock_votes, function(err){
				if(err){
					return console.log(err);
				}

				console.log("the file was saved!");
			});
		}
	}
};

module.exports = votes;
