import requests,json,time
from bs4 import BeautifulSoup
from mailgun import *
import os.path
huge_arr = []
output = 'st_louis_university_data.json'
names_arr = ["Michael", "Christopher", "Matthew", "Joshua", "Tyler", "Brandon", "Jacob", "Daniel", "Nicholas", "Andrew", "Joseph", "Zachary", "David", "James", "John", "Ryan", "Austin", "Anthony", "William", "Justin", "Robert", "Alexander", "Jonathan", "Kyle", "Cody", "Kevin", "Thomas", "Aaron", "Jordan", "Eric", "Benjamin", "Dylan", "Samuel", "Steven", "Christian", "Jose", "Brian", "Adam", "Timothy", "Nathan", "Richard", "Patrick", "Charles", "Sean", "Jesse", "Jason", "Jeremy", "Mark", "Stephen", "Alex", "Juan", "Cameron", "Travis", "Taylor", "Jeffrey", "Dustin", "Luis", "Trevor", "Connor", "Caleb", "Devin", "Evan", "Jared", "Paul", "Kenneth", "Bryan", "Hunter", "Gabriel", "Dakota", "Logan", "Mitchell", "Carlos", "Corey", "Ian", "Marcus", "Gregory", "Derek", "Nathaniel", "Scott", "Jesus", "Blake", "Garrett", "Bradley", "Edward", "Dalton", "Shawn", "Peter", "Antonio", "Ethan", "Seth", "Luke", "Shane", "Victor", "Miguel", "Lucas", "Tanner", "Adrian", "Spencer", "Erik", "Vincent", "Dillon", "Cory", "Isaac", "Angel", "Alejandro", "Jake", "Brett", "Joel", "Alec", "George", "Cole", "Jorge", "Eduardo", "Chase", "Raymond", "Casey", "Devon", "Wesley", "Ricardo", "Francisco", "Colton", "Oscar", "Troy", "Colin", "Mason", "Keith", "Jack", "Dominic", "Chad", "Brendan", "Phillip", "Donald", "Elijah", "Johnathan", "Martin", "Derrick", "Ronald", "Cristian", "Xavier", "Julian", "Frank", "Mario", "Manuel", "Alan", "Omar", "Henry", "Edgar", "Andre", "Clayton", "Bryce", "Grant", "Collin", "Javier", "Jonathon", "Darius", "Douglas", "Levi", "Jeremiah", "Noah", "Sergio", "Hector", "Roberto", "Andres", "Nicolas", "Johnny", "Jackson", "Gary", "Philip", "Isaiah", "Curtis", "Drew", "Ivan", "Brady", "Fernando", "Edwin", "Hayden", "Dennis", "Cesar", "Allen", "Zachery", "Ruben", "Maxwell", "Jalen", "Marco", "Erick", "Randy", "Mathew", "Brent", "Pedro", "Tony", "Max", "Jerry", "Preston", "Riley", "Calvin", "Larry", "Wyatt", "Craig", "Raul", "Colby", "Darren", "Rafael", "Carl", "Jeffery", "Ricky", "Louis", "Tevin", "Jaime", "Albert", "Jimmy", "Trey", "Kristopher", "Marc", "Skyler", "Damian", "Chance", "Forrest", "Harrison", "Kaleb", "Julio", "Alberto", "Dallas", "Sebastian", "Trenton", "Conner", "Armando", "Alexis", "Gerardo", "Gage", "Emmanuel", "Danny", "Zackary", "Micheal", "Shaquille", "Russell", "Lawrence", "Diego", "Parker", "Dominique", "Jamal", "Abraham", "Terry", "Joe", "Rodney", "Jonah", "Micah", "Kody", "Arthur", "Landon", "Walter", "Deandre", "Todd", "Marcos", "Bobby", "Billy", "Gavin", "Andy", "Lance", "Avery", "Nolan", "Donovan", "Jay", "Nickolas", "Roger", "Enrique", "Josue", "Randall", "Trent", "Ramon", "Branden", "Jon", "Morgan", "Arturo", "Alfredo", "Terrance", "Jessie", "Malcolm", "Devonte", "Damien", "Marvin", "Gustavo", "Israel", "Marquis", "Gerald", "Jamie", "Giovanni", "Kendall", "Miles", "Johnathon", "Eddie", "Willie", "Theodore", "Damon", "Maurice", "Reginald", "Lorenzo", "Josiah", "Lee", "Frederick", "Salvador", "Demetrius", "Dominick", "Eli", "Bryant", "Conor", "Zackery", "Roy", "Devante", "Malik", "Quinton", "Ross", "Tyrone", "Marshall", "Dean", "Carson", "Tommy", "Ernesto", "Elias", "Ty", "Zachariah", "Terrence", "Harley", "Dante", "Shaun", "Zane", "Fabian", "Pablo", "Brock", "Brennan", "Kelvin", "Bruce", "Darrell", "Wayne", "Rene", "Denzel", "Terrell", "Brenden", "Jerome", "Francis", "Drake", "Braden", "Brendon", "Nelson", "Quentin", "Steve", "Angelo", "Myles", "Chandler", "Franklin", "Neil", "Melvin", "Tucker", "Lane", "Clay", "Ashton", "Simon", "Darian", "Guillermo", "Desmond", "Liam", "Ronnie", "Orlando", "Trevon", "Weston", "Dale", "Mackenzie", "Devan", "Byron", "Leonard", "Oliver", "Ismael", "Eugene", "Darryl", "Daquan", "Kendrick", "Leonardo", "Roman", "Esteban", "Emanuel", "Emilio", "Karl", "Geoffrey", "Darien", "Keegan", "Stanley", "Warren", "Kenny", "Rodolfo", "Saul", "Felix", "Quinn", "Ernest", "Keenan", "Graham", "Beau", "Stefan", "Clinton", "Skylar", "Abel", "Corbin", "Moises", "Sterling", "Davon", "Griffin", "Ray", "Kyler", "Jarrett", "Deshawn", "Dwayne", "Glenn", "Joey", "Kurt", "Wade", "Kameron", "Sam", "Alvin", "Harry", "Cedric", "Hugo", "Felipe", "Leon", "Tylor", "Carter", "Davis", "Gilberto", "Jaquan", "Jermaine", "Allan", "Rashad", "Jakob", "Reid", "Alfonso", "Jordon", "Lukas", "Elliot", "Dane", "Sheldon", "Cooper", "Rudy", "Harold", "Aidan", "Kristian", "Reed", "Braxton", "Jarred", "Gilbert", "Noel", "Marquise", "Javon", "Tyrell", "Nikolas", "Tristan", "Demarcus", "Owen", "Jarvis", "Clarence", "Ramiro", "Rogelio", "Elliott", "Stephan", "Ali", "Leo", "Rolando", "Stuart", "Darnell", "Justice", "Alonzo", "Bryson", "Sawyer", "Tomas", "Quincy", "Brody", "Deon", "Jarrod", "Alfred", "Donte", "Charlie", "Nigel", "Marlon", "Ariel", "Keaton", "Deonte", "Kurtis", "Chris", "Noe", "Roderick", "Lewis", "Clint", "Ralph", "Rodrigo", "Tre", "Jayson", "Garret", "Bret", "Bernard", "Damion", "Barry", "Derick", "Mitchel", "Nathanael", "Tyson", "Austen", "Blaine", "Kory", "Shannon", "Clifford", "Payton", "Markus", "Sidney", "Julius", "Santiago", "Duncan", "Grayson", "Kelly", "Brad", "Efrain", "Raheem", "Earl", "Mauricio", "Kirk", "Dequan", "Vicente", "Howard", "Baby", "Darion", "Dashawn", "Heath", "Khalil", "Lamar", "Dorian", "Stephon", "Perry", "Walker", "Wilson", "Ahmad", "Shelby", "Dwight", "Humberto", "Adan", "Isiah", "Tyree", "Dion", "Jaylen", "Kareem", "Peyton", "Carlton", "Dexter", "Daryl", "Antoine", "Osvaldo", "Gordon", "Moses", "Terence", "Addison", "Gunnar", "Jaron", "Colten", "Kasey", "Leroy", "Alvaro", "Uriel", "Chaz", "Juwan", "Amir", "Korey", "Courtney", "Jace", "Jamar", "Norman", "Shayne", "Roland", "Salvatore", "Brice", "Glen", "Lonnie", "Brenton", "Leonel", "Darrius", "Davonte", "Deion", "Anton", "Fredrick", "Mohammad", "Freddy", "Travon", "Brayden", "Adolfo", "Issac", "Toby", "Darrin", "Cade", "Coleman", "Dimitri", "Solomon", "Deven", "Quintin", "Cullen", "Jamel", "Kent", "Dillan", "Agustin", "Frankie", "Holden", "Kristofer", "Coty", "Joaquin", "Jean", "Reynaldo", "Conrad", "Devonta", "Ben", "Neal", "Mohammed", "Ezekiel", "Lloyd", "Mike", "Nathanial", "Everett", "Lamont", "Guadalupe", "Milton", "Aron", "Cortez", "Dandre", "Rigoberto", "Tracy", "Kane", "Vernon", "Cornelius", "Jaden", "Nestor", "Houston", "Malachi", "Clark", "Clifton", "Rick", "Arnold", "Marcel", "Hakeem", "Ignacio", "Ahmed", "Irvin", "Tate", "Brooks", "Duane", "Dusty", "Darin", "Deangelo", "Gerard", "Raphael", "Fred", "Jaleel", "Colt", "Rickey", "Forest", "German", "Maximilian", "Reece", "Trever", "Will", "Reuben", "Bennett", "Shaquan", "Winston", "Bradford", "Gino", "Ladarius", "Brennen", "Jairo", "Jamison", "Mohamed", "Bernardo", "Ezequiel", "Herbert", "Jimmie", "Kerry", "Madison", "Raymundo", "Brandyn", "Estevan", "Kieran", "Don", "Aubrey", "Keon", "Robin", "Heriberto", "Jameson", "Kade", "Zechariah", "Jovan", "Thaddeus", "Antwan", "Jefferson", "Dillion", "Jonas", "Ezra", "Rory", "Akeem", "Pierce", "Codey", "Loren", "Darrion", "Freddie", "Paris", "Sammy", "Ulises", "Arron", "Dylon", "Hassan", "Cordell", "Johnnie", "Kaden", "Kolby", "Moshe", "Kai", "Brandan", "Jeff", "Rashawn", "Vaughn", "Irving", "Khalid", "Gene", "Santos", "Cruz", "Davion", "Javonte", "Dakotah", "Gonzalo", "Jasper", "Leslie", "Caden", "Kolton", "Donavan", "Stewart", "Jamarcus", "Lester", "Nico", "Pierre", "Guy", "Sage", "Zakary", "Grady", "Jackie", "Jamil", "Dana", "Donnell", "Donnie", "Shea", "August", "Royce", "Dayton", "Infant", "Isaias", "Jerrod", "Keanu", "Nick", "Benito", "Bo", "Camron", "Jade", "Jaylon", "Myron", "Herman", "Bradly", "Cyrus", "Darrian", "Erich", "Jabari", "Bailey", "Keven", "Lincoln", "Rhett", "Codie", "Garrison", "Jarod", "Deondre", "Elvis", "Montana", "Reese", "Tobias", "Vance", "Devyn", "Floyd", "Octavio", "Elmer", "Junior", "Gregorio", "Fidel", "Quinten", "Alexandro", "Josef", "Aric", "Daulton", "Elisha", "Savon", "Adonis", "Dewayne", "Jamaal", "Rico", "Asa", "Dan", "Bronson", "Camden", "Rocky", "Dario", "Tayler", "Trace", "Ari", "Cristopher", "Jim", "Amos", "Anderson", "Erin", "Josh", "Tory", "Hugh", "Jessy", "Shyheim", "Stetson", "Tyron", "Austyn", "Deshaun", "Dondre", "Jacoby", "Rex", "Harvey", "Kelsey", "Emmett", "Leland", "Justyn", "Kadeem", "Kellen", "Markell", "Menachem", "Efren", "Marquez", "Misael", "Ted", "Unknown", "Cecil", "Justus", "Markel", "Rasheed", "Alton", "Blair", "Abram", "Ellis", "Lionel", "Edgardo", "Jayden", "Khari", "Dallin", "Dawson", "Denver", "Jevon", "Tyquan", "Rusty", "Niko", "Sonny", "Trayvon", "Alonso", "Davin", "Hernan", "Muhammad", "Remington", "Augustus", "Benny", "Daron", "Mikel", "Silas", "Valentin", "Wendell", "Antony", "Clyde", "Gunner", "Ibrahim", "Kelby", "Kevon", "Talon", "Galen", "Najee", "Asher", "Barrett", "Jess", "Jody", "Jorden", "Demetri", "Devontae", "Lyle", "Maximillian", "Auston", "Coby", "Marques", "Orion", "Sherman", "Alexandre", "Bryon", "Chester", "Ryne", "Storm", "Turner", "Cain", "Dionte", "Kegan", "Aldo", "Andreas", "Isidro", "Jaylin", "Titus", "Cristobal", "Giancarlo", "Dalvin", "Edmund", "Kelton", "Randolph", "Trae", "Brant", "Broderick", "Chadwick", "Chaim", "Darrien", "Jerrell", "Kennedy", "Carlo", "Hans", "Layne", "River", "Domenic", "Kendal", "Kenton", "Tavon", "Codi", "Julien", "Ulysses", "Alek", "Destin", "Eliseo", "Kole", "Marty", "Otis", "Rodrick", "Tyrin", "Darwin", "Justen", "Shelton", "Kirby", "Randal", "Tariq", "Jacques", "Ryder", "Dakoda", "Demarco", "Axel", "Ervin", "Greg", "Tyshawn", "Wilfredo", "Ashley", "Cale", "Demonte", "Mikal", "Syed", "Sylvester", "Eliezer", "Male", "Samson", "Nicklaus", "Pete", "Shay", "Waylon", "Westley", "Darrick", "Garry", "Dejuan", "Eddy", "Genaro", "Maverick", "Morris", "Samir", "Schuyler", "Armani", "Demario", "Desean", "Garett", "Kahlil", "Maximiliano", "Spenser", "Bryton", "Dontae", "Jerald", "Jonatan", "Lazaro", "Luther", "Nikko", "Abdul", "Brannon", "Francesco", "Dominque", "Kenyon", "Mickey", "Jessica", "Ashley", "Emily", "Samantha", "Sarah", "Taylor", "Brittany", "Amanda", "Elizabeth", "Megan", "Nicole", "Kayla", "Rachel", "Lauren", "Stephanie", "Hannah", "Jennifer", "Alexis", "Victoria", "Danielle", "Amber", "Courtney", "Jasmine", "Rebecca", "Morgan", "Alyssa", "Brianna", "Alexandra", "Kelsey", "Katherine", "Melissa", "Kimberly", "Michelle", "Allison", "Tiffany", "Haley", "Mary", "Chelsea", "Christina", "Shelby", "Anna", "Abigail", "Sara", "Heather", "Erin", "Laura", "Maria", "Kaitlyn", "Andrea", "Olivia", "Madison", "Jordan", "Marissa", "Brooke", "Kristen", "Natalie", "Erica", "Katelyn", "Vanessa", "Shannon", "Miranda", "Kelly", "Paige", "Crystal", "Jacqueline", "Cassandra", "Gabrielle", "Briana", "Lindsey", "Katie", "Sierra", "Alexandria", "Julia", "Emma", "Mariah", "Sydney", "Amy", "Caitlin", "Kathryn", "Jenna", "Angela", "Savannah", "Alicia", "Catherine", "Breanna", "Destiny", "Jamie", "Monica", "Brittney", "Erika", "Whitney", "Madeline", "Kaitlin", "Caroline", "Alexa", "Molly", "Sabrina", "Diana", "Cheyenne", "Meghan", "Leah", "Mackenzie", "Grace", "Christine", "Cynthia", "Margaret", "Lindsay", "Angelica", "Michaela", "Veronica", "Bianca", "Holly", "Kristina", "Gabriela", "Kristin", "Bethany", "Autumn", "Casey", "Hailey", "Melanie", "Brenda", "Brandi", "Lisa", "Rachael", "Desiree", "Kendra", "April", "Karen", "Julie", "Kathleen", "Leslie", "Dominique", "Natasha", "Kara", "Patricia", "Hayley", "Bailey", "Carly", "Cassidy", "Karina", "Summer", "Tori", "Ana", "Nancy", "Ariel", "Marisa", "Tara", "Alejandra", "Caitlyn", "Claire", "Adriana", "Rebekah", "Alison", "Kaylee", "Chloe", "Raven", "Jocelyn", "Kylie", "Valerie", "Gabriella", "Jade", "Audrey", "Katrina", "Krystal", "Ariana", "Deanna", "Dana", "Mikayla", "Meagan", "Diamond", "Sandra", "Kassandra", "Jasmin", "Bridget", "Monique", "Angel", "Daisy", "Chelsey", "Kendall", "Ashlee", "Felicia", "Krista", "Joanna", "Khadijah", "Sophia", "Yesenia", "Mallory", "Lydia", "Mercedes", "Jazmin", "Jillian", "Mckenzie", "Kirsten", "Gina", "Jazmine", "Cindy", "Priscilla", "Claudia", "Makayla", "Alisha", "Evelyn", "Aaliyah", "Kiara", "Anne", "Cierra", "Ashleigh", "Colleen", "Ciara", "Lacey", "Allyson", "Tabitha", "Denise", "Abby", "Brandy", "Zoe", "Guadalupe", "Ellen", "Marina", "Faith", "Cristina", "Linda", "Isabella", "Nichole", "Karla", "Jaclyn", "Jessie", "Amelia", "Rosa", "Mayra", "Meredith", "Carolyn", "Maggie", "Hope", "Asia", "Naomi", "Hanna", "Clarissa", "Daniela", "Carmen", "Justine", "Tessa", "Tatiana", "Wendy", "Isabel", "Katlyn", "Tamara", "Maya", "Kasey", "Kiana", "Alexus", "Raquel", "Aubrey", "Bria", "Candace", "Teresa", "Tiara", "Ashlyn", "Kelsie", "Celeste", "Alissa", "Britney", "Katelynn", "Theresa", "Kelli", "Nina", "Tyler", "Renee", "Carolina", "Jacquelyn", "Genesis", "Ruby", "Cara", "Susan", "Heidi", "Miriam", "Carrie", "Jordyn", "Janet", "Brenna", "Ebony", "Jenny", "Arianna", "Gloria", "Toni", "Ashton", "Cecilia", "Camille", "Esther", "Tiana", "Martha", "Charlotte", "Candice", "Aimee", "Madeleine", "Virginia", "Tia", "Savanna", "Elena", "Vivian", "Marie", "Selena", "Angelina", "Imani", "Carissa", "Cassie", "Dakota", "Adrianna", "Lillian", "Alexia", "Logan", "Ruth", "Darian", "Janelle", "Barbara", "Mikaela", "Mia", "Harley", "Sharon", "Stacy", "Sadie", "Helen", "Nikki", "Kierra", "Anastasia", "Tayler", "Kellie", "Hunter", "Nicolette", "Stacey", "Shayla", "Tierra", "Elise", "Liliana", "Robin", "Alana", "Carla", "Annie", "Shawna", "Rose", "Valeria", "Ann", "Shanice", "Callie", "Christian", "Devin", "Karissa", "Eva", "Melinda", "Lorena", "Riley", "Pamela", "Kate", "Paola", "Chelsie", "Deborah", "Brianne", "Aliyah", "Melody", "Adrienne", "Elisabeth", "Tina", "Justice", "Larissa", "Sonia", "Kylee", "Francesca", "Marisol", "Tanya", "Jane", "Chasity", "Devon", "Alyson", "Tania", "Sasha", "Esmeralda", "Natalia", "Kenya", "Breana", "Kira", "Macy", "Regina", "Alaina", "Donna", "Mckenna", "Brooklyn", "Kristine", "Destinee", "Kali", "Josephine", "Leticia", "Lily", "Bryanna", "Randi", "Juliana", "Christy", "Tracy", "Meaghan", "Kari", "Precious", "Makenzie", "Kyla", "Paula", "Skylar", "Serena", "Kyra", "India", "Maranda", "Rachelle", "Selina", "Taryn", "Frances", "Carley", "Kaitlynn", "Emilee", "Sophie", "Tiffani", "Ciera", "Arielle", "Irene", "Abbey", "Shayna", "Alice", "Celina", "Cortney", "Kourtney", "Sylvia", "Joy", "Kristy", "Brittani", "Peyton", "Alma", "Clara", "Kailey", "Daniella", "Kaila", "Cheyanne", "Kayleigh", "Jaime", "Johanna", "Josie", "Mariana", "Tanisha", "Kristi", "Chandler", "Payton", "Sidney", "Elaine", "Maritza", "Allie", "Robyn", "Anissa", "Carina", "Michele", "Christa", "Madelyn", "Marlene", "Jeanette", "Kiera", "Angelique", "Marilyn", "Cristal", "Nadia", "Noelle", "Janae", "Haylee", "Yvette", "Katharine", "Micaela", "Tasha", "Trisha", "Ericka", "Lucy", "Talia", "Nora", "Lori", "Elisa", "Haleigh", "Katarina", "Chantel", "Blanca", "Kaleigh", "Yvonne", "Iris", "Avery", "Dalia", "Simone", "Margarita", "Jada", "Sofia", "Paris", "Viviana", "Corinne", "Edith", "Lyndsey", "Carol", "Maribel", "Moriah", "Kelley", "Desirae", "Shaina", "Stefanie", "Gianna", "Susana", "Alanna", "Stephany", "Tianna", "Casandra", "Judith", "Laurel", "Misty", "Emilie", "Itzel", "Kadijah", "Sandy", "Delaney", "Charity", "Ivy", "Kaley", "Kelsi", "Kiersten", "Perla", "Tess", "Bridgette", "Kennedy", "Lizbeth", "Chanel", "Dallas", "Alexandrea", "Hallie", "Yolanda", "Bonnie", "Jill", "Kaylin", "Kassidy", "Yasmin", "Kaylyn", "Julianna", "Kathy", "Mollie", "Lena", "Diane", "Norma", "Nia", "Alisa", "Rochelle", "Julianne", "Araceli", "Isabelle", "Dorothy", "Leanna", "Anita", "Rocio", "Breanne", "Paulina", "Beatriz", "Carlie", "Genevieve", "Lacy", "Karli", "Suzanne", "Alina", "Janice", "Sheila", "Halie", "Alysha", "Hillary", "Kelsea", "Keri", "Charlene", "Kaylie", "Antoinette", "Cayla", "Fatima", "Rosemary", "Katelin", "Karly", "Jacklyn", "Sally", "Ashlie", "Shana", "Alex", "Corina", "Dawn", "Zhane", "Eleanor", "Rhiannon", "Maegan", "Noemi", "Dulce", "Ashlynn", "Skyler", "Lexus", "Eliza", "Shirley", "Connie", "Karlie", "Lea", "Lucia", "Roxanne", "Shelbi", "Joyce", "Sade", "Tonya", "Juanita", "Savanah", "Mara", "Nathalie", "Beverly", "Eileen", "Kasandra", "Mckayla", "Regan", "Giselle", "Rikki", "Karlee", "Keisha", "Ryan", "Elaina", "Yadira", "Heaven", "Jesse", "Shantel", "Clare", "Reyna", "Aisha", "Kacie", "Abbie", "Kalyn", "Shanna", "Katy", "Bobbie", "Cameron", "Loren", "Kerri", "Brook", "Darlene", "Hailee", "Kori", "Georgia", "Rebeca", "Thalia", "Angie", "Kerry", "Annette", "Yasmine", "Luz", "Lucero", "Blair", "Latisha", "Montana", "Shauna", "Mariela", "Alayna", "Cora", "Tammy", "Leanne", "Tyra", "Jena", "Tabatha", "Carli", "Jodi", "Katlin", "Silvia", "Brittni", "Clarisa", "Darby", "Iesha", "Justina", "Aurora", "Rita", "Antonia", "Stacie", "Beth", "Kala", "Ali", "Demi", "Ayanna", "Christie", "Janessa", "Christen", "Cheryl", "Bobbi", "Debra", "Ella", "Skye", "Kiley", "Sonya", "Stevie", "Maureen", "Myranda", "Tatyana", "Celia", "Cori", "Denisha", "Jaqueline", "Octavia", "Eden", "Madalyn", "Lauryn", "Baby", "Jennie", "Arlene", "Halle", "Karley", "Reagan", "Maura", "Brandie", "Aspen", "Kristian", "Devan", "Fabiola", "Jayme", "Latasha", "Melina", "Racheal", "Domonique", "Gladys", "Gwendolyn", "Jenifer", "Micah", "Carlee", "Destiney", "Lesley", "Helena", "Lara", "Leigh", "Mikala", "Shea", "Joanne", "Ashly", "Christiana", "Janie", "Joselyn", "Sarai", "Shyanne", "Kristyn", "Yazmin", "Brionna", "Gretchen", "Shelly", "Breonna", "Daphne", "Kacey", "Shakira", "Destini", "Brittanie", "Hali", "Hollie", "Krysta", "Yessenia", "Audra", "Ava", "Ayana", "Dayana", "Elyse", "Mandy", "Betty", "Dianna", "Mindy", "Ingrid", "Kenia", "Lizette", "Kristie", "Maddison", "Berenice", "Brielle", "Emerald", "Kendal", "Kirstin", "Kortney", "Shelbie", "Allyssa", "Juana", "Jackie", "Danica", "Essence", "Jalisa", "Kianna", "Magdalena", "Maricela", "Roxana", "Dayna", "Janette", "Salina", "Jaimie", "Jana", "Lynn", "Trinity", "Gabriel", "Shaniqua", "Alesha", "Jessika", "Kaela", "Liana", "Joelle", "Terri", "Devyn", "Sage", "Staci", "Addison", "Terra", "Ellie", "Graciela", "Macey", "Zana", "Bryana", "Katerina", "Tricia", "Stormy", "Aileen", "Lacie", "Patrice", "Athena", "Belinda", "Celine", "Elisha", "Elissa", "Kailyn", "Phoebe", "Ayla", "Julissa", "Kailee", "Alysia", "Deja", "Nadine", "Traci", "Judy", "Maira", "Sherry", "Jessi", "Nataly", "Myra", "Olga", "Adrian", "Constance", "Kalie", "Alycia", "Billie", "Martina", "Marlena", "Catalina", "Christin", "Lexi", "Britany", "Griselda", "Ivette", "Marisela", "Kaycee", "Kayley", "Scarlett", "Kaci", "Alessandra", "Brea", "Breann", "Cecelia", "Jazmyn", "Irma", "Jami", "Kia", "Alysa", "Austin", "Chantal", "Asha", "Elsa", "Keely", "Tracey", "Kaylynn", "Pauline", "Ashanti", "Corey", "Kenzie", "Beatrice", "Bridgett", "Layla", "Noel", "Alecia", "Dina", "Kimberlee", "Iliana", "Leandra", "Sarina", "Janay", "Latoya", "Marlee", "Ashely", "Bailee", "Melisa", "Aja", "Anjelica", "Hana", "Katlynn", "Kayli", "Sydnee", "Yaritza", "Haylie", "Nikole", "Nohely", "Eboni", "Laken", "Lorraine", "Marley", "Kimberley", "Mai", "Makenna", "Emilia", "Jamila", "Tiffanie", "Damaris", "Fiona", "Princess", "Rylee", "Macie", "Marcella", "Vanesa", "Dylan", "Nikita", "Mariam", "Maxine", "Alena", "Chaya", "Jasmyn", "Joana", "Tyesha", "Aubree", "Carson", "Lyndsay", "Susanna", "Viridiana", "Eunice", "Giovanna", "Patience", "Monika", "Katheryn", "Lourdes", "Tiarra", "Yasmeen", "Aleah", "Chantelle", "Kristal", "Mattie", "Ricki", "Cydney", "Geneva", "Joann", "Lexie", "Mariel", "Amie", "Dominque", "Lissette", "Tanesha", "China", "Denisse", "Shyann", "Valentina", "Danyelle", "Drew", "Jerrica", "Laurie", "Leilani", "Paloma", "Janine", "Leann", "Lizeth", "Reina", "Rhonda", "Blake", "Kinsey", "Kirstie", "Leeann", "Porsha", "Valencia", "Janell", "Lana", "Malia", "Michael", "Andria", "Caitlynn", "Danika", "Elyssa", "Janel", "Jodie", "London", "Tatum", "Tiera", "Adilene", "Annamarie", "Darcy", "Jean", "Jessenia", "Kathrine", "Isis", "Kallie", "Marjorie", "Tatianna", "Betsy", "Eliana", "Fallon", "Leila", "Lidia", "Lynette"]
last_name_progress_check_output = 'last_name_progres.json'
last_names_arr = ['a','b','c','d','e','f','z','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
def scrape_data():
	url = 'http://wustl.edu/cgi-bin/directory/index-2012.pl?name='+names+' '+last_names_info+'&email=&phone='
	soup = BeautifulSoup(requests.get(url).text)
	time.sleep(5)

	main_wrapper = soup.find('div', attrs ={'class':'results'})
	a_link = main_wrapper.findAll('a')
	for a_link_href in a_link:
		profile_url = 'http://wustl.edu'+a_link_href['href']
		profile_soup = BeautifulSoup(requests.get(profile_url).text)
		profile_main_wrapper = profile_soup.findAll('div', attrs = {'class':'entry clearfix'})
		for second_wrapper in profile_main_wrapper:
			name = second_wrapper.findAll('span', attrs = {'class':'dd'})[0]
			email = second_wrapper.findAll('span', attrs = {'class':'dd'})
			for email_a_link in email:
				a_link_info = email_a_link.findAll('a')
				for name_text,email_text in zip(name,a_link_info):
					dictionary = {}
					name = name_text.split(' ')
					dictionary['first_name'] = name[0]
					dictionary['last_name'] = name[-1]
					dictionary['name'] = name_text
					dictionary['email'] = email_text.string
					huge_arr.append(dictionary)
		
			add_students_to_mailing_list('Saint Louis University',huge_arr)

			with open(output,'wb') as outfile:
				json.dump(huge_arr,outfile,indent = 4)
			last_names = names
			with open(last_name_progress_check_output,'wb') as last_name_info:
				json.dump(last_names,last_name_info,indent=4)	

if __name__ == "__main__":
	try:
		if os.path.exists(output):
			with open(last_name_progress_check_output) as index_number:

						load_json = json.load(index_number)
						index_number = names_arr.index(load_json)
						print "File does exist, continuning from index#",index_number
						for names in names_arr[index_number:]:
							for last_names_info in last_names_arr:
								try:
									try:
										try:
											try:
												scrape_data()
												with open(output) as outfile:
													data_info = json.load(output)
												data_info.update(dictionary)	
												with open(output) as outfile:
													json.dump(outfile)
												if huge_arr == 100:
												
													print "100 Emails scraped out of %i students" %TOTAL_STUDENT_VAR	
											except requests.exceptions.ConnectTimeout:
												continue
										except requests.exceptions.ConnectionError:
											continue	

									except requests.exceptions.ReadTimeout:
										continue		
								except requests.exceptions.HTTPError:
									continue					
	except:
		print "re-running the file"
		for names in names_arr:
			for last_names_info in last_names_arr:
				try:
					try:
						try:
							try:
								scrape_data()	
							except requests.exceptions.ConnectTimeout:
								continue
						except requests.exceptions.ConnectionError:
							continue	

					except requests.exceptions.ReadTimeout:
						continue		
				except requests.exceptions.HTTPError:
					continue	