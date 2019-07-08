let allStates = [];
let allStatesfiltered;
let dropdown = document.getElementById("dropdown");

createTable("congress-data", data);
document.write(allStates);
console.log(allStates)
createDropdown()
console.log(allStates)
console.log(allStatesfiltered)

function createTable(x ,data) {
    let members = data.results[0].members;
    let tbody = document.getElementById("tbody");
    
    
    for (let i = 0; i < members.length; i++) {
                  
        let tr = document.createElement("tr");
        let count = document.createElement("td");
        count.textContent = i+1;
        let name = document.createElement("td");
        name.textContent = members[i].last_name + ", " + members[i].first_name + " ";
        name.append(members[i].middle_name||"");
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

function createDropdown(x ,data) {
    let dropdown = document.getElementById("dropdown");
    allStates.sort(function(a, b){
        var v = a.toLowerCase();
        var w = b.toLowerCase();
        if (v < w) {return -1;}
        if (v > w) {return 1;}
        return 0;
    });
    for (let i=0; i < allStates.length; i++) {
        var allStatesfiltered = allStates.filter(function(i){

            return allStates[i] == allStates[i+1];
    
        });
        
        if(allStates[i] == allStates[i+1]){
            delete allStates[i];
        }
    }
    /*var allStatesfiltered = allStates.filter(function(i){

        return allStates[i] == allStates[i+1];

    });  */
    document.write(allStates);
    document.write(allStatesfiltered);


    
    /*for (let i = 0; i < members.length; i++) {
                  
        let tr = document.createElement("tr");
        let count = document.createElement("td");
        count.textContent = i+1;
        let name = document.createElement("td");
        name.textContent = members[i].last_name + ", " + members[i].first_name + " ";
        name.append(members[i].middle_name||"");
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
    */
}




