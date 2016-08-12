angular.module('uguru.rest')
.factory('Major', ['Restangular', function(Restangular) {
    var Major;
    Major = {
        get: function() {
            return Restangular
                .one('departments').get();
        },
        getGeneral: function() {
            return generalMajors;
        }
    };
    return Major;
}]);

var generalMajors = [
        {
        "id": 1,
        "name": "Aerospace Engineering"
    },
    {
        "id": 2,
        "name": "African American Studies"
    },
    {
        "id": 3,
        "name": "African and Middle Eastern Studies"
    },
    {
        "id": 4,
        "name": "African Languages"
    },
    {
        "id": 5,
        "name": "American Indian Studies"
    },
    {
        "id": 6,
        "name": "American Literature and Culture"
    },
    {
        "id": 7,
        "name": "Ancient Near East and Egyptology"
    },
    {
        "id": 8,
        "name": "Anthropology"
    },
    {
        "id": 10,
        "name": "Arabic"
    },
    {
        "id": 11,
        "name": "Architectural Studies"
    },
    {
        "id": 12,
        "name": "Art"
    },
    {
        "id": 13,
        "name": "Art History"
    },
    {
        "id": 14,
        "name": "Asian American Studies"
    },
    {
        "id": 15,
        "name": "Asian Humanities"
    },
    {
        "id": 16,
        "name": "Asian Religions"
    },
    {
        "id": 17,
        "name": "Asian Studies"
    },
    {
        "id": 18,
        "name": "Astrophysics"
    },
    {
        "id": 19,
        "name": "Atmospheric, Oceanic and Environmental Sciences"
    },
    {
        "id": 20,
        "name": "Biochemistry"
    },
    {
        "id": 21,
        "name": "Bioengineering"
    },
    {
        "id": 22,
        "name": "Biology"
    },
    {
        "id": 23,
        "name": "Biophysics"
    },
    {
        "id": 24,
        "name": "Business Economics"
    },
    {
        "id": 25,
        "name": "Central and East European Languages and Cultures"
    },
    {
        "id": 26,
        "name": "Chemical Engineering"
    },
    {
        "id": 27,
        "name": "Chemistry"
    },
    {
        "id": 28,
        "name": "Chemistry, General"
    },
    {
        "id": 29,
        "name": "Chemistry/Materials Science"
    },
    {
        "id": 30,
        "name": "Chicana and Chicano Studies"
    },
    {
        "id": 31,
        "name": "Chinese"
    },
    {
        "id": 32,
        "name": "Civil Engineering"
    },
    {
        "id": 33,
        "name": "Classical Civilization"
    },
    {
        "id": 34,
        "name": "Cognitive Science"
    },
    {
        "id": 35,
        "name": "Communication Studies"
    },
    {
        "id": 36,
        "name": "Comparative Literature"
    },
    {
        "id": 37,
        "name": "Computational and Systems Biology "
    },
    {
        "id": 38,
        "name": "Computer Science"
    },
    {
        "id": 39,
        "name": "Computer Science and Engineering"
    },
    {
        "id": 40,
        "name": "Dance"
    },
    {
        "id": 41,
        "name": "Design and Media Arts"
    },
    {
        "id": 42,
        "name": "Earth and Environmental Science"
    },
    {
        "id": 43,
        "name": "Ecology, Behavior, and Evolution"
    },
    {
        "id": 44,
        "name": "Economics"
    },
    {
        "id": 45,
        "name": "Electrical Engineering"
    },
    {
        "id": 46,
        "name": "English"
    },
    {
        "id": 47,
        "name": "Environmental Science"
    },
    {
        "id": 48,
        "name": "Ethnomusicology"
    },
    {
        "id": 49,
        "name": "European Studies"
    },
    {
        "id": 50,
        "name": "Film and Television"
    },
    {
        "id": 51,
        "name": "French"
    },
    {
        "id": 52,
        "name": "French and Linguistics"
    },
    {
        "id": 53,
        "name": "Gender Studies"
    },
    {
        "id": 54,
        "name": "Geography"
    },
    {
        "id": 55,
        "name": "Geography/Environmental Studies"
    },
    {
        "id": 56,
        "name": "Geology"
    },
    {
        "id": 57,
        "name": "Geology/Engineering Geology"
    },
    {
        "id": 58,
        "name": "Geology/Paleobiology"
    },
    {
        "id": 59,
        "name": "Geophysics/Applied Geophysics"
    },
    {
        "id": 60,
        "name": "Geophysics/Geophysics and Space Physics"
    },
    {
        "id": 61,
        "name": "German"
    },
    {
        "id": 62,
        "name": "Global Studies"
    },
    {
        "id": 63,
        "name": "Greek"
    },
    {
        "id": 64,
        "name": "Greek and Latin"
    },
    {
        "id": 65,
        "name": "History"
    },
    {
        "id": 66,
        "name": "Human Biology and Society"
    },
    {
        "id": 67,
        "name": "Human Biology and Society"
    },
    {
        "id": 68,
        "name": "International Development Studies"
    },
    {
        "id": 69,
        "name": "Iranian Studies"
    },
    {
        "id": 70,
        "name": "Italian"
    },
    {
        "id": 71,
        "name": "Italian and Special Fields"
    },
    {
        "id": 72,
        "name": "Japanese"
    },
    {
        "id": 73,
        "name": "Jewish Studies"
    },
    {
        "id": 74,
        "name": "Korean"
    },
    {
        "id": 75,
        "name": "Latin"
    },
    {
        "id": 76,
        "name": "Latin American Studies"
    },
    {
        "id": 77,
        "name": "Linguistics"
    },
    {
        "id": 78,
        "name": "Linguistics and Anthropology"
    },
    {
        "id": 79,
        "name": "Linguistics and Asian Languages and Cultures"
    },
    {
        "id": 80,
        "name": "Linguistics and Computer Science"
    },
    {
        "id": 81,
        "name": "Linguistics and English"
    },
    {
        "id": 82,
        "name": "Linguistics and French"
    },
    {
        "id": 83,
        "name": "Linguistics and Italian"
    },
    {
        "id": 84,
        "name": "Linguistics and Philosophy"
    },
    {
        "id": 85,
        "name": "Linguistics and Psychology"
    },
    {
        "id": 86,
        "name": "Linguistics and Scandinavian Languages"
    },
    {
        "id": 87,
        "name": "Linguistics and Spanish"
    },
    {
        "id": 88,
        "name": "Linguistics, Applied"
    },
    {
        "id": 89,
        "name": "Marine Biology"
    },
    {
        "id": 90,
        "name": "Materials Engineering"
    },
    {
        "id": 91,
        "name": "Mathematics"
    },
    {
        "id": 92,
        "name": "Mathematics, Applied"
    },
    {
        "id": 93,
        "name": "Mathematics/Applied Science"
    },
    {
        "id": 94,
        "name": "Mathematics/Atmospheric and Oceanic Sciences"
    },
    {
        "id": 95,
        "name": "Mathematics/Economics"
    },
    {
        "id": 96,
        "name": "Mathematics, Financial Actuarial"
    },
    {
        "id": 97,
        "name": "Mathematics for Teaching"
    },
    {
        "id": 98,
        "name": "Mathematics of Computation"
    },
    {
        "id": 99,
        "name": "Mechanical Engineering"
    },
    {
        "id": 100,
        "name": "Microbiology, Immunology, and Molecular Genetics"
    },
    {
        "id": 101,
        "name": "Middle Eastern Studies"
    },
    {
        "id": 102,
        "name": "Molecular, Cell, and Developmental Biology"
    },
    {
        "id": 103,
        "name": "Music"
    },
    {
        "id": 104,
        "name": "Music History"
    },
    {
        "id": 105,
        "name": "Neuroscience"
    },
    {
        "id": 106,
        "name": "Nursing"
    },
    {
        "id": 107,
        "name": "Philosophy"
    },
    {
        "id": 108,
        "name": "Physics"
    },
    {
        "id": 109,
        "name": "Physiological Science"
    },
    {
        "id": 110,
        "name": "Political Science"
    },
    {
        "id": 111,
        "name": "Portuguese"
    },
    {
        "id": 112,
        "name": "Psychobiology"
    },
    {
        "id": 113,
        "name": "Psychology"
    },
    {
        "id": 114,
        "name": "Religion, Study of"
    },
    {
        "id": 115,
        "name": "Russian Language and Literature"
    },
    {
        "id": 116,
        "name": "Russian Studies"
    },
    {
        "id": 117,
        "name": "Scandinavian Languages and Cultures"
    },
    {
        "id": 118,
        "name": "Sociology"
    },
    {
        "id": 119,
        "name": "Spanish"
    },
    {
        "id": 120,
        "name": "Spanish and Community and Culture"
    },
    {
        "id": 121,
        "name": "Spanish and Linguistics"
    },
    {
        "id": 122,
        "name": "Spanish and Portuguese"
    },
    {
        "id": 123,
        "name": "Statistics"
    },
    {
        "id": 124,
        "name": "Theater"
    },
    {
        "id": 125,
        "name": "World Arts and Cultures"
    },
    {
        "id": 126,
        "name": "Undeclared Engineering"
    },
    {
        "id": 127,
        "name": "Individual Field of Concentration"
    }
]