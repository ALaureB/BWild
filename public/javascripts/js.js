// Effet machine à écrire homepage
$('#welcome').typeIt({
     strings: 'Hello #username, welcome to the WCS social network !',
     speed: 70,
     autoStart: true
});

// Fil Instragram
var userFeed = new Instafeed({
  get: 'user',
  userId: '6369074261',
  clientId: '2186825f840e4751a339cf2cf1d89c22',
  accessToken: '6369074261.1677ed0.60c538061e2041569ee70078fe62a017',
  resolution: 'standard_resolution',
  template: '<a href="{{link}}" target="_blank" id="{{id}}"><img src="{{image}}" /></a>',
  sortBy: 'most-recent',
  limit: 5,
  links: true
});
userFeed.run();