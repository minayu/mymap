//mysql接続
var connection = require('./app/mysqlConnection.js');
//　クエリ
// var query;
connection.query('SELECT na.id, na.name, ad.address FROM store_name na, store_address ad WHERE na.id = ad.id;', function (err, rows, fields) {
  if (err) { console.log('err: ' + err); } 
  console.log('name: ' + rows[0].name);
  console.log('address: ' + rows[0].addre);
  markerData[0]['name'] = rows[0].name;
  markerData[0]['address'] = rows[0].address;
});

var map;
var marker = [];
var infoWindow = [];
var geocoder;
var increment = 0;
var markerData = [ // マーカーを立てる場所名・緯度・経度
  {
       name: 'ウェアハウス 入谷店',
    address: '東京都足立区入谷7-8-11',
    	lat: 0,
		lng: 0
  }, {
       name: 'ウェアハウス 保木間店',
    address: '東京都足立区保木間1-1-19',
    	lat: 0,
		lng: 0
  }, {
       name: 'セガ竹の塚',
    address: '東京都足立区竹の塚6-8-6',
    	lat: 0,
		lng: 0

  }
];

// ピン作成
function initMap() {
    var mapLatLng = new google.maps.LatLng({lat: 35.709026, lng: 139.731992}); // 緯度経度のデータ作成(デフォルト:東京)
    map = new google.maps.Map(document.getElementById('sample'), {
      center: mapLatLng, // 地図の中心を指定
      zoom: 12 // 地図のズームを指定
    });
    doSomethingLoop(markerData.length,0);

}

// ピンをマップにセットする
function setPing() {
    // 住所から緯度経度のデータを作成
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'address': markerData[increment]['address']
    }, function(results, status) { // 結果
        if (status === google.maps.GeocoderStatus.OK) { // ステータスがOKの場合
            var locate = results[0].geometry.location; // マーカーの位置情報を設定
            markerData[increment -1]['lat'] = locate.lat();
            markerData[increment -1]['lng'] = locate.lng();
                        console.log(locate.lat());
                        console.log(locate.lng());
            marker[increment] = new google.maps.Marker({
                position: locate, // マーカーを立てる位置を指定
                map: map // マーカーを立てる地図を指定
            });
            
            infoWindow[increment] = new google.maps.InfoWindow({ // 吹き出しの追加
                content: '<div class="sample">' + markerData[increment -1]['name'] + '</div>' // 吹き出しに表示する内容
            });
            
            markerEvent(increment); // マーカーにイベントを追加
        } else { // 失敗した場合
            alert(status);
        }
    }); 
}

// setPingを遅延させながらループ(APIリクエスト制限にかかるため)
function doSomethingLoop(maxCount, i) {
  if (i < maxCount) {
    setPing();
    setTimeout(function(){doSomethingLoop(maxCount, ++i);}, 500);
    increment++;
  }
}

// マーカーにイベントを追加
function markerEvent(i) {
    marker[i].addListener('mouseover', function() { // マーカーをマウスオーバーしたとき
      infoWindow[i].open(map, marker[i]); // 吹き出しの表示
  });
      marker[i].addListener('mouseout', function() { // マーカーをマウスアウトしたとき
      infoWindow[i].close(map, marker[i]); // 吹き出しの非表示
  });
}