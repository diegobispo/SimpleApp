function imputDataControl($scope,$http){
 console.log('imputDataControl');

 $http.get('/api/getImputData').success(function(imputDataItens){
  console.log('DATA: ' + imputDataItens);
  $scope.imputDataItens = imputDataItens;  
 })
}

function monControl($scope,$http){
 console.log('monControl');

 $http.get('/api').success(function(data){
  console.log('DATA: ' + data);
  $scope.artistas = data;
 })
}