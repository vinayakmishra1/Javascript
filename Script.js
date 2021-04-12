
// Task 1 :- Creation of an array
var personName = ["michael", "joey", "nicholas", "robert", "steven"];


// Task2 :- Make an api GET request for all 5 persons to the url https://api.nationalize.io/?name={personName}

let request = new XMLHttpRequest();
request.open("GET", "https://api.nationalize.io/?name[]=michael&name[]=joey&name[]=nicholas&name[]=robert&name[]=steven");
request.send();

/* Task3 :- The response is an array of objects with the name and array of country objects with country objects 
           with country_id and probability.*/

request.onload = () => {
  if (request.status === 200) {
    var a = JSON.parse(request.response);
    // console.log(a.length);console.log(a);
    let arr = [];
    let uarr = [];
    let ans = [];
    let obj = [];

    //console.log(a[0].country); 
    var country;
    var number_of_peoples = 0;
    for (var j = 0; j < a.length; j++) {

      var name = a[j].name;
      var array = a[j].country;

      var max = Math.max.apply(Math, array.map(function (o) { return o.probability; }))

      for (var i = 0; i < array.length; i++) {
        if (max === array[i].probability) {
          country = array[i].country_id;
          if (!uarr.includes(country)) { uarr.push(country); }
        }
      }
      arr.push({ name, country });
    }

    // Printing an array of objects with name of the person and country with most probability

    console.log(arr);


    // Task4 :- Print an array of objects with country name and number of peoples in the country 

    for (let i = 0; i < uarr.length; i++) {
      obj[i] = 0;
      number_of_peoples = 0;
      for (let j = 0; j < arr.length; j++) { if (uarr[i] === arr[j].country) { obj[i] += 1; } }
    }

    for (let i in uarr) {
      ans.push({ country: uarr[i], number_of_peoples: obj[i] })
    }
    
    console.log(ans);
  }


  else {
    console.log(`error ${request.status} ${request.status}`);
  }



}
