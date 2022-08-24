function run(processes, matchString){
    const matches = {};
    searchProcesses();

    function searchProcesses(){
        processes.forEach(process => {
            const {htmlId, title, criteria} = process;
    
            if ( queryMatch(title, matchString) ){
                matches[htmlId] = 1;
            };
            if (criteria.length > 0){
                searchCriteria(htmlId, criteria, matchString);
            };
        });
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

    return matches;
};

exports.run = run;