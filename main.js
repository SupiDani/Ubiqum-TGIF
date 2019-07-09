let allStates = [];
let allStatesfiltered;
let dropdown = document.getElementById("dropdown");

createTable("congress-data", data);
//document.write(allStates);
console.log(allStates)
createDropdown()
console.log(allStates)
console.log(allStatesfiltered)


// create table for members of

function createTable(x ,data) {
    let members = data.results[0].members;
    let tbody = document.getElementById("tbody");
    
    
    for (let i = 0; i < members.length; i++) {
                  
        let a = document.createElement("a");
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
        //a.append(count, name, party, state, seniority, voteswithparty);
        //tr.appendChild(a);
        tbody.appendChild(tr);
        allStates.push(members[i].state);
        //a.href = "#";
        //a.className = "tr";   
    } 
    
}

// create State dropdown menu

function createDropdown(x ,data) {
    let dropdown = document.getElementById("dropdown");
    allStates.sort(function(a, b){
        var v = a.toLowerCase();
        var w = b.toLowerCase();
        if (v < w) {return -1;}
        if (v > w) {return 1;}
        return 0;
    });

    // create list with states
    var allStatesfiltered = []; 
    for (let i=0; i < allStates.length; i++) {
        

        if(allStates[i] != allStates[i+1]){
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




