// elementID => queryMatches
const mactches = {};

function searchProcesses(processes, query){
    processes.forEach(process => {
        const {elementID, title, criteria} = process;
        // replace query with a case insensitive RegEx that searches for query
        const match = title.search(query);

        if (match){
            mactches[elementID] = 1;
        };

        if (criteria.length > 0){
            searchCriteria(elementID, criteria, query);
        };

    });
};

function searchCriteria(processID, criteria, query){
    criteria.forEach(criterion => {
        const match = criterion.search(query);
        
        if (match){
            mactches[processID]++;
        };

    });
};