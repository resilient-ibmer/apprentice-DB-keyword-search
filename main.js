// The main headers where all the text is nested in.
let [workHeader, compHeader] = document.querySelectorAll('.ibm-show')
let processes;

// Open the header drop downs
workHeader.click()
compHeader.click()

// Giving the elements a chance to load, otherwise it will only get part of the processes.
setTimeout(iterateProcesses, 1000)


function iterateProcesses(){
    processes = document.querySelectorAll('#processes')

    // Iterate though all the processes
    for(let i = 0; processes[i]; i++){
        console.log(processes[i], i) 
        // Collapse info in that process
        processes[i].firstChild.firstChild.click()      
    }

}