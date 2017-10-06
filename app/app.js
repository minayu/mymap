// 店舗名
var info = [];
// 店舗住所
var address = [];
//　クエリ
var query;
var connection = require('./mysqlConnection');

// モジュール読み込み
var client = require('cheerio-httpcli');

query = 'DELETE FROM store_name';
connection.query(query, function(err, rows) {});
query = 'ALTER TABLE store_name AUTO_INCREMENT = 1';
connection.query(query, function(err, rows) {});
query = 'DELETE FROM store_address';
connection.query(query, function(err, rows) {});
query = 'ALTER TABLE store_address AUTO_INCREMENT = 1';
connection.query(query, function(err, rows) {});

// スクレイピング開始
client.fetch('https://location.am-all.net/alm/location?gm=77&at=12', {}, function (err, $, res) {
	// 記事のタイトルを取得　（店舗名）
	$('.store_name').each(function() {
		info.push($(this).text());
	}); 

	console.log(info[0]);

	for (var i = 0; i < info.length; i++) {
		var query = 'INSERT INTO store_name (name) VALUES ("' + info[i] + '")';
	    connection.query(query, function(err, rows) {});	
    }
});

client.fetch('https://location.am-all.net/alm/location?gm=77&at=12', {}, function (err, $, res) {

    // 記事のタイトルを取得（店舗住所）
	$('.store_address').each(function() {
		address.push($(this).text());
	}); 
	console.log(address[0]);

	for (var i = 0; i < address.length; i++) {
		var query = 'INSERT INTO store_address (address) VALUES ("' + address[i] + '")';
	    connection.query(query, function(err, rows) {});	
    }
});

// console.log('読み込み完了?');