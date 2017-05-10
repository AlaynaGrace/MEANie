var myApp = angular.module( 'myApp', [] );
myApp.controller( 'WhereMyPeeps', function( $http ){ //['$http'] was taken out
  var vm = this;
  vm.addRecord = function(){
    var objectToSend ={
      //took out the equal signs and replaced them with colons
      name: vm.nameIn,
      location: vm.locationIn,
    };
    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    }).then(function mySuccess(response){
      // console.log(response);
      vm.getRecords();
      vm.nameIn ='';
      vm.locationIn='';
    }, function myBad(response){
      console.log(response.statusText);
    });

  };

  vm.getRecords = function(){
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then( function mySuccess( response ){
      vm.allTheRecords = response.data;
      console.log( vm.allTheRecords );
    }, function myError( response ){
      console.log( response.statusText );
    });
  };
  vm.getRecords();

  vm.deleteRecord = function(id){
    console.log('delete',id);
    
    $http({
      method: 'DELETE',
      url: '/deleteRecord/' + id,
    }).then(function mySuccess(response){
      vm.getRecords();
    }, function myBad(response){
      console.log(response);
    });
  };
});
