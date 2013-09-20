var express = require('express');
var graph = require('fbgraph');

var q = "SELECT thread_id, message_count, recent_authors FROM thread WHERE folder_id = 0 ORDER BY message_count DESC";
graph.fql(q, function(err, mres){
						
});

var authUrl = graph.getOauthUrl({
		"client_id":'630955786916364',
		"redirect_uri":'http://localhost:3000/fblogin',
		"scope":"read_mailbox",
		"state":state});
res.redirect(authUrl);


