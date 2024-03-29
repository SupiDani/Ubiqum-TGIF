// Define General variables:

let allStates = [];
let allStatesfiltered;
let dropdown = document.getElementById("dropdown");
let members = data.results[0].members;
let setFilters = [];
let selection = [members];
let selectedState = ["All"];
let filterByParty = [
  document.getElementById("R"),
  document.getElementById("D"),
  document.getElementById("I")
];

// There were some issues with the checkbox on loading. workaround:

checkDefaultParty();

// Load all data:

paintData();

// Create Dropbown:

createDropdown();

// Run Filter:

runFilter();

// Function to check status checkbox

function checkDefaultParty() {
  filterByParty.forEach(option => {
    if ((option.checked = true)) {
      setFilters.push(option.id);
    }
  });
}

// create table for members of

function createTable(members) {
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
    tr.append(count, name, party, state, seniority, voteswithparty);
    tbody.appendChild(tr);

    allStates.push(members[i].state);
  }
}

function createDropdown() {
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
  var allStatesfiltered = ["All"];
  for (let i = 0; i < allStates.length; i++) {
    if (allStates[i] != allStates[i + 1]) {
      allStatesfiltered.push(allStates[i]);
    }
  }

  // create dorpdown list

  for (let i = 0; i < allStatesfiltered.length; i++) {
    let a = document.createElement("a");
    let linkText = document.createTextNode(allStatesfiltered[i]);
    a.appendChild(linkText);
    a.href = "#";
    a.className = "dropdown-item";

    dropdown.append(a);
  }
}

function runFilter() {
  let filterByStates = dropdown.childNodes;

  // Filter for States

  for (let i = 0; i < filterByStates.length; i++) {
    filterByStates[i].addEventListener("click", setFilterState);
    function setFilterState() {
      let showDropStates = document.getElementById("dropStates");
      showDropStates.innerHTML = filterByStates[i].firstChild.textContent;
      selectedState = [];
      selectedState.push(filterByStates[i].firstChild.textContent);
      setFilter();
    }
  }

  // Filter for Party

  for (let i = 0; i < filterByParty.length; i++) {
    filterByParty[i].addEventListener("click", setFilter);
  }
  function setFilter() {
    setFilters = [];
    if (filterByParty[0].checked) {
      setFilters.push("R");
    }
    if (filterByParty[1].checked) {
      setFilters.push("D");
    }
    if (filterByParty[2].checked) {
      setFilters.push("I");
    }
    paintData();
  }
}

//  Print table

function paintData() {
  selection = [];
  members.forEach(member => {
    if (selectedState == "All") {
      setFilters.forEach(setFilter => {
        if (member.party == setFilter) {
          selection.push(member);
        }
      });
    } else {
      setFilters.forEach(setFilter => {
        if (member.party == setFilter && member.state == selectedState) {
          selection.push(member);
        }
      });
    }
  });
  tbody.innerHTML = "";
  createTable(selection);
}

/*let template = "";
for (let index = 0; index < array.length; index++) {
  const element = array[index];
}
*/
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

/*let statistics = {
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
*/
