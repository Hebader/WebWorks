# WebWorks -grupp 8.


På våran hemsida behöver man logga in för att komma åt sidor som (projects, my data, timereports, employees och timelogging). När man loggar in sparas användarnamn, lösenord och PrivteId i localstorage. My data kommer man åt genom sitt PrivteId som är registrerat i notion. Är man utloggad kan man endast komma åt sidan med kontakt formuläret, samt första sidan som är home. 
 

Server koden: Vi har tre funktoner  där vi använt oss av post för att hämta data från notion (databas1, databas2, databas3). Vi har även en patch på timespan för att kunna uppdatera data till notion. I våran login funktion har vi använt Client för att autentisera användaren som loggar in. 


Frontend koden: I Components har vi alla filer med kod som reutnerar api data till servern. I pages anropar vi alla filer så det blir synligt på varje sida på hemsidan.
