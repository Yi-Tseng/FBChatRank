var crypto = require('crypto');
var graph = require('fbgraph');


exports.index = function(req, res){
	
	var md5sum = crypto.createHash('md5');
	md5sum.update('my salt' + Math.random());
	state = md5sum.digest('hex');

	req.session.csrf = state;

	var authUrl = graph.getOauthUrl({
		"client_id":'564323293603907',
		"redirect_uri":'http://takeshi.tw:3000/fblogin',
		"scope":"read_mailbox",
		"state":state});
	res.redirect(authUrl);

};

exports.login = function(req, res){
	if(!req.query.state) {

		res.redirect('http://takeshi.tw:3000');
	} else if(!req.query.code) {

		res.redirect('http://takeshi.tw:3000');
	} else if(req.query.error) {

		res.redirect('http://takeshi.tw:3000');
	} else {

		var state = req.query.state;
		
		if(state == req.session.csrf){
			graph.authorize({
				"client_id":'564323293603907',
				"redirect_uri":'http://takeshi.tw:3000/fblogin',
				"client_secret":'安安，不能給你喔',
				"code":req.query.code
			}, function (err, facebookRes) {
				if(facebookRes.access_token){
					graph.setAccessToken(facebookRes.access_token);
					var fbid = 0;
					graph.get("me", function(err, data){
						if(!err && data){
							fbid = data.id;

							var q = "SELECT thread_id, message_count, recent_authors, viewer_id FROM thread WHERE folder_id = 0 ORDER BY message_count DESC";
							graph.fql(q, function(err, mres){
								var data = mres.data;
								res.render('index', {data:data});
							});
						}
					});

					
				} else {
					res.redirect('http://takeshi.tw:3000');
				}
				
			});
		} else {
			res.redirect('http://takeshi.tw:3000');
		}
	}
};
