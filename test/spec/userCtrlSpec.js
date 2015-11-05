describe("AuthCtrl", function() {

	var $scope;

	beforeEach(function(){
		module('efood');
		inject(function($injector){
			$scope = $injector.get("$rootScope").$new();
		});
	});

	it("O usuario deve estar logado para acessar o sistema", inject(function($controller){
		$controller('AuthCtrl', {"$scope" : $scope});
		expect($scope.currentUser).toBeUndefined();
	}));


});