/**
 * Creates angular custom service for providing data
 */
testApp.service( 'dataProvider', function () {

    /**
     * Link to this, just in case
     */
    var self = this;

    /**
     * Data for tabs
     *
     * @type {*[]}
     */
    this.dataTabs = [
        {
            name: '8A',
            students: [
                {
                    name: 'Vasya pupkin',
                    gpa: 4.8
                },
                {
                    name: 'Petya Vasechkin',
                    gpa: 3.2
                }
            ]
        },
        {
            name: '9A',
            students: [
                {
                    name: 'Oleksandr Vorobiov',
                    gpa: 1.1
                },
                {
                    name: 'Ivan Grodov',
                    gpa: 2.2
                }
            ]
        }
    ];

    /**
     * Data for domino
     *
     * @type {{1: string[], 2: string[], 3: string[], 4: string[], 5: string[], 6: string[]}}
     */
    this.dataDomino = {
        1: [ 'center' ],
        2: [ 'top right', 'bottom left' ],
        3: [ 'top right', 'bottom left', 'center' ],
        4: [ 'top right', 'top left', 'bottom left', 'bottom right' ],
        5: [ 'top right', 'top left', 'bottom left', 'bottom right', 'center' ],
        6: [ 'top right', 'top left', 'bottom left', 'bottom right', 'middle right', 'middle left' ]
    };
} );