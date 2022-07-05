// The main headers where all the text is nested in.
let [workHeader, compHeader] = document.querySelectorAll('.ibm-show')
let criterias = 0 //133

// Open the header drop downs
workHeader.click()
compHeader.click()

// Giving the process elements a chance to load.
setTimeout(iterateProcesses, 1000)


async function iterateProcesses(){
    let processes = document.querySelectorAll('#processes') 

    for(let i = 0; processes[i]; i++){
        // Expand process info
        processes[i].firstChild.firstChild.click()
        // Wait/sleep until expanded drop down loads
        await new Promise(resolve => setTimeout(resolve, 100))

        let popupLink = document.querySelector('.ibm-popup-link')

        // If Comp, open Assesment Criteria link
        if(popupLink){
            // Open criteria pop up
            popupLink.click()
        }
        // Collaps process info
        processes[i].firstChild.firstChild.click()

    }

}

function traverseCriteriaList(){
    let criteriaList = document.querySelector('assessment-criteria ul').children
    let closeBtn = document.querySelector("a.ibm-close-link.ibm-fright")

    for(let i = 0; criteriaList[i]; i++){
        console.log(criteriaList[i].innerHTML, criterias)
        criterias++
    }

    // Close criteria pop up
    closeBtn.click()

}

// Select the node that will be observed for mutations
const targetNode = document.querySelector("div.modal.fade")
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
// Callback function to execute when mutations are observed
// Thinking about making this an async function???
const callback = function(mutationList) {
    for(const mutation of mutationList) {
        if (mutation.type === "childList"){
            console.log("OPEN")
            traverseCriteriaList()
            break
        } else if (mutation.attributeName === "style" && mutation.target.ariaHidden === "true"){
            console.log("CLOSED")
            // continue iterating through processes
            break
        }      
    }
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(targetNode, config);
