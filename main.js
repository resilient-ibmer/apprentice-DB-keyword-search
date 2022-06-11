// The main headers where all the text is nested in.
let [workHeader, compHeader] = document.querySelectorAll('.ibm-show')
let popupWindow = document.querySelector('assessment-criteria')
let processes;

// Open the header drop downs
workHeader.click()
compHeader.click()

// Giving the elements a chance to load, otherwise it will only get part of the processes.
setTimeout(iterateProcesses, 1000)


function iterateProcesses(){
    processes = document.querySelectorAll('#processes')

    for(let i = 0; processes[i]; i++){

        setTimeout(() => {
            // Expand process info
            processes[i].firstChild.firstChild.click()
            
            // If Comp, open Assesment Criteria link
            if(document.querySelector('.ibm-popup-link')){
                // Open criteria pop up
                document.querySelector('.ibm-popup-link').click()
    
                // Wait for popup window to finish loading
                popupWindow.addEventListener("transitionend", traverseCriteriaList)
    
            }

        }, 1000)

    }

}

function traverseCriteriaList(){
    let criteriaList = document.querySelector('assessment-criteria ul').children

    for(let i = 0; criteriaList[i]; i++){
        console.log(criteriaList[i].innerHTML)
    }

    // Close criteria pop up
    popupWindow.querySelector('a').click()

}
