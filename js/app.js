var oModul = angular.module('oModul', ['ngRoute']);

oModul.config(function($routeProvider)
{
	$routeProvider.when('/',{
		tamplateUrl: 'index.html'
	});
	$routeProvider.when('/naslovna',
	{
		templateUrl: './predlosci/naslovna.html',
		controller: 'naslovnicaKontroler'
	});
	$routeProvider.when('/taskovi',
	{
		templateUrl: './predlosci/taskovi.html',
		controller: 'taskKontroler'
	});
	$routeProvider.when('/trgovina',
	{
		templateUrl: './predlosci/trgovina.html',
		controller: 'trgovinaKontroler'
	});
	$routeProvider.otherwise({
		template: 'Greska.'
	});
});

oModul.controller('naslovnicaKontroler', function($scope)
{
	$scope.pozdravnaPoruka = 'Nalazimo se na naslovnoj stranici.';
});
oModul.controller('taskKontroler', function($scope)
{
	$scope.oZadaci = [
		{
			id: 1,
			name: 'Proučiti predložak'
		},
		{
			id: 2,
			name: 'Položiti blic'
		},
		{
			id: 3,
			name: 'Riješiti obavezne zadatke'
		}
	];
	$scope.Dodaj = function()
	{
		var len = $scope.oZadaci.length - 1;
		if(len == -1)
		{
			var newID = 1;
		}
		else
		{
			var newID = $scope.oZadaci[len].id + 1;
		}
		$scope.oZadaci.push(
		{
			id: newID,
			name: $scope.noviZadatak
		});
	}
	$scope.Obrisi = function(id)
	{
		var nIndexForDelete = -1;
		for(var i=0; i<$scope.oZadaci.length; i++)
		{
			if(id == $scope.oZadaci[i].id)
			{
				nIndexForDelete = i;
			}
		}
		if(nIndexForDelete != -1)
		{
			$scope.oZadaci.splice(nIndexForDelete, 1);
		}
	}
});
oModul.controller('trgovinaKontroler', function($scope)
{
	var cijena= 0;
	$scope.oProizvodi = [
		{
			id: 1,
			name: 'Mlijeko',
			cijena : 10,
			kolicina : 11
		},
		{
			id: 2,
			name: 'Kruh',
			cijena : 6,
			kolicina : 100
		},
		{
			id: 3,
			name: 'Pecivo',
			cijena : 3,
			kolicina : 1000
		}
	];
	$scope.oKosarica = [];
	$scope.DodajuKos = function(oProizvod)
	{
		var found =0;
		for (var i=0;i<$scope.oKosarica.length;i++)
		{
			if (oProizvod.id == $scope.oKosarica[i].id){
				found = 1;
			}
		}
		if (found == 0)
		{
			$scope.oKosarica.push(
			{
				id: oProizvod.id,
				name: oProizvod.name,
				cijena: oProizvod.cijena,
				kolicina: oProizvod.kolicina,
				ukupnacijena: 0
			});
		}
	}
	$scope.Provjeri = function(oProizvod){
		cijena=0;
		for (var i=0;i<$scope.oKosarica.length;i++){
			if (oProizvod.kolicina > $scope.oKosarica[i].kolicina && oProizvod.oProd.id == $scope.oKosarica[i].id){
				this.kolicina=$scope.oKosarica[i].kolicina;
			}
		}
			for (var i=0;i<$scope.oKosarica.length;i++){
				if (oProizvod.oProd.id == $scope.oKosarica[i].id){
					$scope.oKosarica[i].ukupnacijena = $scope.oKosarica[i].cijena * oProizvod.kolicina;
				}
			}
			for (var i=0;i<$scope.oKosarica.length;i++){
				cijena = cijena + $scope.oKosarica[i].ukupnacijena;
				angular.element(document.querySelector('#cifra')).html(cijena);
			}
	}
});
