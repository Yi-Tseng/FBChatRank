var async = require('async');

var graph = require('fbgraph');

async.waterfall(
    [
        function(callback){
			graph.get('100000129701748', function(err, data){
				callback(null, data);
			});
        },
        function(arg1, callback){
			console.log(arg1);
            graph.get('100002433986153', function(err, data){
				callback(null, data);
			});
        },
    ],
    function(err, res){
		console.log(res);
    }
);