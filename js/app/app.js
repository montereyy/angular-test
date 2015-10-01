/**
 * Creates angular module
 *
 * @type {module}
 */
var testApp = angular.module( 'testApp', [ 'ovts', 'ngRoute' ] );

testApp.config( [ '$routeProvider', function ( $routeProvider ) {

    $routeProvider

        .when( '/', {
            templateUrl: 'views/home.html',
            controller: 'mainCtrl'
        } )

        .when( '/domino', {
            templateUrl: 'views/domino.html',
            controller: 'dominoCtrl'
        } )

        .otherwise( {
            redirectTo: '/'
        } );
} ] );