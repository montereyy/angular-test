/**
 * Describing main controller
 */
testApp.controller( 'mainCtrl', [ '$scope', '$log', 'dataProvider', function ( $scope, $log, dataProvider ) {

    /**
     * Set by default active tab to 0
     *
     * @type {number}
     */
    $scope.activeTab = 0;

    /**
     * Our data holder
     *
     * @type {Array}
     */
    $scope.data = dataProvider.dataTabs;

    countAverage();

    /**
     * Changes active tab
     *
     * @param key
     */
    $scope.changeActive = function ( key ) {

        $scope.activeTab = key;
        countAverage();
    };

    /**
     * Add student to the data function
     */
    $scope.addStudent = function () {

        $scope.data[ $scope.activeTab ].students.push( {
            name: $scope.newName,
            gpa: isNaN( parseInt( $scope.newGpa ) ) ? 0 : parseInt( $scope.newGpa )
        } );

        $scope.newName = $scope.newGpa = '';

        countAverage();
    };

    /**
     * Remove student from our data
     *
     * @param index
     */
    $scope.removeStudent = function ( index ) {

        $scope.data[ $scope.activeTab ].students.splice( index, 1 );

        countAverage();
    };

    /**
     * Adding grade to our data
     */
    $scope.addGrade = function () {

        $scope.data.push(
            {
                name: 'New grade',
                students: []
            } );

        $scope.activeTab = $scope.data.length - 1;

        countAverage();
    };

    /**
     * Remove grade from our data
     */
    $scope.removeGrade = function ( index ) {

        $scope.data.splice( index, 1 );

        changeActiveTabRemove();

        countAverage();
    };

    /**
     * Changing active tab to available
     */
    function changeActiveTabRemove() {

        $scope.activeTab -= 1;
        if ( typeof $scope.data[ $scope.activeTab ] === 'undefined' ) {

            $scope.activeTab += 2;
            if ( typeof $scope.data[ $scope.activeTab ] === 'undefined' ) {

                $scope.activeTab = $scope.data.length - 1;

                if ( typeof $scope.data[ $scope.activeTab ] === 'undefined' ) {

                    $scope.activeTab = - 1;
                }
            }
        }
    }

    /**
     * Changing the average of the gpa
     */
    function countAverage() {

        if ( typeof $scope.data[ $scope.activeTab ] !== 'undefined' ) {
            if ( $scope.data[ $scope.activeTab ].students.length > 0 ) {

                var sum = 0;
                angular.forEach( $scope.data[ $scope.activeTab ].students, function ( student, key ) {
                    sum += student.gpa;
                    $log.debug( student.gpa );
                } );

                $scope.gpaAverage = (sum / $scope.data[ $scope.activeTab ].students.length).toFixed( 2 );
            }
            else {

                $scope.gpaAverage = 0;
            }
        }
    }

    /**
     * Bind our scope data with service
     */
    $scope.$watch( 'gpaAverage', function ( newValue, oldValue ) {

        dataProvider.gpaAverage = newValue;
    } );

} ] );

testApp.controller( 'dominoCtrl', [ '$scope', '$log', '$timeout', 'dataProvider', function ( $scope, $log, $timeout, dataProvider ) {

    /**
     * Get the dots data for dominos
     *
     * @type {{1: string[], 2: string[], 3: string[], 4: string[], 5: string[], 6: string[]}}
     */
    $scope.dots = dataProvider.dataDomino;

    /**
     * Average gpa from mainCtrl
     *
     * @type {*|number}
     */
    $scope.gpaAverage = dataProvider.gpaAverage;

    /**
     * Initialize domino object
     *
     * @type {{}}
     */
    $scope.domino = {};

    /**
     * Initialize in progress flag, needed for hidding elements during existing rotation
     *
     * @type {boolean}
     */
    $scope.inProgress = false;

    /**
     * Rotate domino, updated to prevent controlls for rotating again from showing
     *
     * @param deg
     */
    $scope.rotate = function ( deg ) {

        $scope.inProgress = true;

        $scope.domino.currentDegree += deg;

        $timeout( function () {

            $scope.inProgress = false;
        }, $scope.domino.durationTransition * 1000 );
    };

    /**
     * Set new domino randomly
     */
    $scope.newDomino = function () {

        $scope.domino = {
            half1: $scope.half1 = (parseInt( Math.random() * 6 ) % 6) + 1,
            half2: $scope.half2 = (parseInt( Math.random() * 6 ) % 6) + 1,
            currentDegree: 0,
            rotationSpeed: 100,
            size: 100,
            durationTransition: 1,
            height: dataProvider.defaultDominoSize.height,
            width: dataProvider.defaultDominoSize.width,
            dotHeight: dataProvider.defaultDominoSize.dotHeight,
            containerHeight: dataProvider.defaultDominoSize.containerHeight
        };
    };

    /**
     * Add watcher for domino.rotationSpeed
     */
    $scope.$watch( 'domino.rotationSpeed', function ( newValue, oldValue ) {

        if ( newValue !== oldValue ) {

            calculateRotationSpeed( newValue );
        }
    } );

    /**
     * Add watcher for domino.size
     */
    $scope.$watch( 'domino.size', function ( newValue, oldValue ) {

        if ( newValue !== oldValue ) {

            $scope.domino.height = (dataProvider.defaultDominoSize.height / (100 / newValue)).toFixed( 1 );
            $scope.domino.width = (dataProvider.defaultDominoSize.width / (100 / newValue)).toFixed( 1 );
            $scope.domino.dotHeight = (dataProvider.defaultDominoSize.dotHeight / (100 / newValue)).toFixed( 1 );
            $scope.domino.containerHeight = (dataProvider.defaultDominoSize.containerHeight + $scope.domino.height / 2).toFixed( 1 );
        }
    } );

    /**
     * Calculate transition duration based on the rotationSpeed
     */
    function calculateRotationSpeed( newValue ) {

        $scope.domino.durationTransition = ( 100 / (newValue ? newValue : 1)).toFixed( 1 );
    }

} ] );