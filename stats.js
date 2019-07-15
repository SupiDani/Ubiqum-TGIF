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
