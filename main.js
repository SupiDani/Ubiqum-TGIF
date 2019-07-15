let allStates = [];
let allStatesfiltered;
let dropdown = document.getElementById("dropdown");
let members = data.results[0].members;

createTable("congress-data", data);
//document.write(allStates);
console.log(allStates);
createDropdown();
console.log(allStates);
console.log(allStatesfiltered);

// create table for members of

function createTable(x, data) {
  let tbody = document.getElementById("tbody");

  for (let i = 0; i < members.length; i++) {
    let tr = document.createElement("tr");

    let count = document.createElement("td");
    count.textContent = i + 1;
    let name = document.createElement("td");
    let nameLink = document.createElement("a");
    let linkText = document.createTextNode(
      members[i].last_name +
        ", " +
        members[i].first_name +
        " " +
        (members[i].middle_name || "")
    );
    nameLink.href = members[i].url;
    nameLink.appendChild(linkText);
    name.appendChild(nameLink);
    let party = document.createElement("td");
    party.textContent = members[i].party;
    let state = document.createElement("td");
    state.textContent = members[i].state;
    let seniority = document.createElement("td");
    seniority.textContent = members[i].seniority;
    let voteswithparty = document.createElement("td");
    voteswithparty.textContent = members[i].votes_with_party_pct;
    tr.append(count, name, party, state, seniority, voteswithparty); //tbody.appendChild(tr);
    //a.append(count, name, party, state, seniority, voteswithparty);
    //tr.appendChild(a);

    allStates.push(members[i].state);
    //a.href = "#";
    //a.className = "tr";
  }
}

function createDropdown(x, data) {
  let dropdown = document.getElementById("dropdown");
  allStates.sort(function(a, b) {
    var v = a.toLowerCase();
    var w = b.toLowerCase();
    if (v < w) {
      return -1;
    }
    if (v > w) {
      return 1;
    }
    return 0;
  });

  // create list with states
  var allStatesfiltered = [];
  for (let i = 0; i < allStates.length; i++) {
    if (allStates[i] != allStates[i + 1]) {
      allStatesfiltered.push(allStates[i]);
    }
  }

  // create dorpdown list

  for (let i = 0; i < allStatesfiltered.length; i++) {
    //let li = document.createElement("li");
    //li.textContent = allStatesfiltered[i];
    //let a = document.createElement("a");
    //let linkText = allStatesfiltered[i];
    //a.appendChild(linkText);
    //a.href = "#";
    //a.class="dropdown-item";
    let a = document.createElement("a");
    let linkText = document.createTextNode(allStatesfiltered[i]);
    a.appendChild(linkText);
    a.href = "#";
    a.className = "dropdown-item";

    dropdown.append(a);

    //dropdown.append(li);
  }
}

let template = "";
for (let index = 0; index < array.length; index++) {
  const element = array[index];
}

// create Table the easy way:

// 1. get element: //

/* var members = data.results[0].members;
console.log(members);
​
let table = document.getElementById('myTable');
​
// a) create elemente via html //

// let template = '';
// for (let i = 0; i < members.length; i++) {
// 	template += `
//    <tr>
//     <td><a href="${members[i].url}">${members[i].first_name} ${members[i]
// 		.middle_name || ''} </a></td>
//     <td>${members[i].party}</td>
//     <td>${members[i].state}</td>
//     <td>${members[i].seniority}</td>
//     <td>${members[i].party}</td>
//   </tr>
//   `;
// }
// table.innerHTML = template;


// b) create element by inserting cells //
​/*
members.forEach(member => {
	let row = document.createElement('tr');
	row.insertCell().textContent = member.first_name;
	row.insertCell().textContent = member.party;
	row.insertCell().textContent = member.state;
	row.insertCell().textContent = member.seniority;
	table.append(row);
}); 

*/

// create statistics

let statistics = {
  reps: 0,
  rep_votes: 0,
  dems: 0,
  dem_votes: 0,
  inds: 0,
  ind_votes: 0
};

calcStats();
paintTable();

function calcStats() {
  members.forEach(member => {
    if (member.party == "R") {
      statistics.reps++;
      statistics.rep_votes += member.votes_with_party_pct;
    }
    if (member.party == "D") {
      statistics.dems++;
      statistics.dem_votes += member.votes_with_party_pct;
    }
    if (member.party == "I") {
      statistics.inds++;
      statistics.ind_votes += member.votes_with_party_pct;
    }
  });

  statistics.totalAvgR = statistics.rep_votes / statistics.reps;
  statistics.totalAvgD = statistics.dem_votes / statistics.dems;
  statistics.totalAvgI = statistics.ind_votes / statistics.inds;
}

function paintTable() {
  document.getElementById("numbReps").innerHTML = statistics.reps;
  document.getElementById("votesReps").innerHTML = statistics.totalAvgR.toFixed(
    2
  );
  document.getElementById("numbDems").innerHTML = statistics.dems;
  document.getElementById("votesDems").innerHTML = statistics.totalAvgD.toFixed(
    2
  );
  document.getElementById("numbInds").innerHTML = statistics.inds;
  document.getElementById("votesInds").innerHTML = statistics.totalAvgI.toFixed(
    2
  );
}
