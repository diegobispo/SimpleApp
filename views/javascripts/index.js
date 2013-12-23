function monControl($scope,$http){
 console.log('monControl');

 $http.get('/api').success(function(data){
  console.log('DATA: ' + data);
  $scope.artistas = data;  
 })
}