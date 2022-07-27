// The main headers where all the text is nested in.
let [workHeader, compHeader] = document.querySelectorAll('.ibm-show')
let criterias = 0 //133

// Open the header drop downs
workHeader.click()
compHeader.click()

// Giving the process elements a chance to load.
setTimeout(traverseProcesses, 100)

async function traverseProcesses(){
    let processes = document.querySelectorAll('#processes') 

    for(let i = 0; i < processes.length; i++){
        console.log("Process #", i)
        // Expand process info
        processes[i].scrollIntoView()
        processes[i].firstChild.firstChild.click()
        // Wait until expanded drop down loads
        await new Promise(resolve => setTimeout(resolve, 100))

        let popupLink = document.querySelector('.ibm-popup-link')
        if(popupLink){
            popupLink.click()
            await new Promise(waitForLoad)
        }
        // Collapse process info
        processes[i].firstChild.firstChild.click()
    }
    document.querySelector("body").style['overflow'] = 'auto'
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

function waitForLoad(resolve){
    // Select the node that will be observed for mutations
    const targetNode = document.querySelector("div.modal.fade")
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };
    // Callback function to execute when mutations are observed
    const callback = function(mutationList) {
        for(const mutation of mutationList) {
            if (mutation.type === "childList"){
                traverseCriteriaList()
                observer.disconnect()
                resolve()
                break
            }      
        }
    };
    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}
