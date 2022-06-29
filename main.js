// The main headers where all the text is nested in.
let [workHeader, compHeader] = document.querySelectorAll('.ibm-show')

// Open the header drop downs
workHeader.click()
compHeader.click()

// Am I going to have to do this with Promises???

// Giving the elements a chance to load.
setTimeout(iterateProcesses, 1000)


function iterateProcesses(){
    let processes = document.querySelectorAll('#processes')
    let popupWindow = document.querySelector('assessment-criteria div')
    // Wait for popup window to finish loading
     popupWindow.addEventListener("DOMContentLoaded", traverseCriteriaList)
    // let popupWindow = document.querySelector('div.modal')

    for(let i = 0; processes[i]; i++){
        // Make this an event to when the drop downs open
        setTimeout(() => {
            console.log("inside timeout", i)
            // Expand process info
            processes[i].firstChild.firstChild.click()
            
            // If Comp, open Assesment Criteria link
            if(document.querySelector('.ibm-popup-link')){
                // Open criteria pop up
                document.querySelector('.ibm-popup-link').click()
            }

        }, 1000)

    }

}


function traverseCriteriaList(){
    let criteriaList = document.querySelector('assessment-criteria ul').children
    console.log('hit')

    for(let i = 0; criteriaList[i]; i++){
        console.log(criteriaList[i].innerHTML)
    }

    // Close criteria pop up
    popupWindow.querySelector('a').click()

}

// Select the node that will be observed for mutations
const targetNode = document.querySelector('assessment-criteria div')

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationList) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationList) {
        console.log(mutation)
        if(mutation.target.ariaHidden === "false" && mutation.attributeName === "aria-hidden"){
            console.log("open")
            return
        } else {
            console.log("closed")
            return
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// TODO: Find specific conditions that only trigger the mutation once in open or close
// * Deeper target node, make it one of the child elements