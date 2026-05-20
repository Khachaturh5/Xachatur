
const name = "Xacho"
const  craft = 'mars'

function  nametexst(name,craft){
   return name  +" is currently abrosd the "+craft 
}
console.log(nametexst(name,craft));

const issPosition= {
   latitude: "178",
   longitude: "85"

}
console.log(issPosition.latitude);
console.log(issPosition.longitude);
console.log(issPosition);

const asteroid =[
   {name: "2024 ABI", diameter: 120,hazardous: false},
     {name: "2024 CD2", diameter: 45,hazardous: true},
       {name: "2024 EF3", diameter: 890,hazardous: false},
         {name: "2024 GH4", diameter: 120,hazardous: true}
   
]
 const names = asteroid.map(asteroid => asteroid.name);
 console.log(names);
 const Hazardous = asteroid.filter( asteroid =>asteroid.hazardous  === true);
 console.log(Hazardous);
 const Diameter = asteroid.slice(0,2);
 console.log(Diameter);
 
 
 