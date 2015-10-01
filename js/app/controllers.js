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
    $scope.data = dataProvider.data;

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
            gpa: isNaN(parseInt( $scope.newGpa )) ? 0 : parseInt( $scope.newGpa )
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

                $scope.gpaAverage = (sum / $scope.data[ $scope.activeTab ].students.length).toFixed(2);
            }
            else {

                $scope.gpaAverage = 0;
            }
        }
    }

} ] );