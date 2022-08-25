let matches;

function searchProcesses(processes, matchString){
    // So that matches from previous requests are not sent
    matches = {};
    processes.forEach(process => {
        const {htmlId, title, criteria} = process;

        if ( queryMatch(title, matchString) ){
            matches[htmlId] = 1;
        };
        if (criteria.length > 0){
            searchCriteria(htmlId, criteria, matchString);
        };
    });
    return matches;
};

function searchCriteria(processID, criteria, matchString){ 
    criteria.forEach(criterion => {
        if ( queryMatch(criterion, matchString) ){
            if (matches[processID]){
                matches[processID]++;
            } else{
                matches[processID] = 1;
            };
        };
        
    });
};

function queryMatch(string, matchString){
    if (string.toLowerCase().indexOf(matchString) != -1){
        return true;
    } else{
        return false;
    }
};

exports.searchProcesses = searchProcesses;