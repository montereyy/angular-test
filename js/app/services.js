/**
 * Creates angular custom service for providing data
 */
testApp.service( 'dataProvider', function () {

    var self = this;

    this.data = [
        {
            name: 'Grade 8A',
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
            name: 'Grade 9A',
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
} );