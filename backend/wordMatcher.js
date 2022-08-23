
function run(processes, query){
    const matches = {};
    searchProcesses();

    function searchProcesses(){
        processes.forEach(process => {
            const {elementID, title, criteria} = process;
            // replace query argument with a case insensitive RegEx that searches for query
            const match = title.search(query);
    
            if (queryMatch(match)){
                matches[elementID] = 1;
            };
            if (criteria.length > 0){
                searchCriteria(elementID, criteria, query);
            };
        });
    };
    
    function searchCriteria(processID, criteria, query){ 
        criteria.forEach(criterion => {
            const match = criterion.search(query);
            
            if (queryMatch(match)){
                if (matches[processID]){
                    matches[processID]++;
                } else{
                    matches[processID] = 1;
                };
            };
            
        });
    };
    
    function queryMatch(match){
        if (match !== -1){
            return true;
        } else{
            return false;
        };
    };
    
    return matches;
};



exports.run = run;