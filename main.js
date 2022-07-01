// The main headers where all the text is nested in.
let [workHeader, compHeader] = document.querySelectorAll('.ibm-show')

// Open the header drop downs
workHeader.click()
compHeader.click()

// Giving the process elements a chance to load.
setTimeout(iterateProcesses, 1000)


function iterateProcesses(){
    let processes = document.querySelectorAll('#processes') 

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
const targetNode = document.querySelector("div.modal.fade")
// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
// Callback function to execute when mutations are observed
const callback = function(mutationList) {
    for(const mutation of mutationList) {
        console.log(mutation)
        if (mutation.type === "childList"){
            console.log("OPEN")
            break
        } else if (mutation.attributeName === "style" && mutation.target.ariaHidden === "true"){
            console.log("CLOSED")
            break
        }      
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(targetNode, config);

// TODO: Find specific mutations that trigger only when modal content is fully loaded
    // document.querySelector("div.loading") => for when modal content fully loaded