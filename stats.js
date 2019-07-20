let members = data.results[0].members;

// create statistics

let statistics = {
  reps: 0,
  rep_votes: 0,
  dems: 0,
  dem_votes: 0,
  inds: 0,
  ind_votes: 0
};

let dummy = [];

let votesBest = [];
let votesWorst = [];

let percentileLow = 0.1;
let percentileUp = 0.9;
let tableWorst = document.getElementById("lessEngaged");
let tableBest = document.getElementById("mostEngaged");

// call funcitons general stats

calcStats();
paintTableOverallStats();

// Call functions performance

// need to build 1 loop for each criteria
criteria = ["missed_votes_pct"];

members.sort(function(a, b) {
  return a[criteria[0]] - b[criteria[0]];
});

calcPercentile(percentileLow, members, votesBest, dummy);

calcPercentile(percentileUp, members, dummy, votesWorst);

includeEquals(percentileLow, members, votesBest, dummy);

includeEquals(percentileUp, members, dummy, votesWorst);

createHtmlElement(votesBest, tableBest);

createHtmlElement(votesWorst, tableWorst);

// functions general stats

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

function paintTableOverallStats() {
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

// functions performance

function calcPercentile(percentile, people, listBest, listWorst) {
  if (percentile <= 0.5) {
    for (let i = 0; i < percentile * people.length; i++) {
      listBest.push(people[i]);
    }
  } else {
    for (let i = people.length - 1; i > percentile * people.length; i--) {
      listWorst.push(people[i]);
    }
  }
}

function includeEquals(percentile, people, listBest, listWorst) {
  if (percentile <= 0.5) {
    people.forEach(person => {
      if (
        listBest[listBest.length - 1].missed_votes == person.missed_votes &&
        listBest.includes(person) === false
      ) {
        listBest.push(person);
      }
    });
  } else {
    people.forEach(person => {
      if (
        listWorst[listWorst.length - 1].missed_votes == person.missed_votes &&
        listWorst.includes(person) === false
      ) {
        listWorst.push(person);
      }
    });
  }
}

console.log(members);
console.log(members);
console.log(votesBest);
console.log(votesWorst);

// a) create elemente via html //
function createHtmlElement(list, table) {
  let template = "";
  for (let i = 0; i < list.length; i++) {
    template += `
      <tr>
       <td><a href="${list[i].url}">${list[i].last_name}, ${
      list[i].first_name
    } ${list[i].middle_name || ""} </a></td>
       <td>${list[i].missed_votes}</td>
       <td>${list[i].missed_votes_pct}</td>
     `;
  }
  table.innerHTML = template;
}
