// import { postToBackend } from './fetch'

const [workHeader, compHeader] = document.querySelectorAll('.ibm-show')
// Keeps track of comps so that they can then be sent to backend.
const data = [];

// Open the header drop downs
workHeader.click()
compHeader.click()

// Giving the process elements a chance to load before beginning the traversal
setTimeout(traverseProcesses, 100)


// This wouldn't run everytime. Only on the first time, and whenever the DB changes.
// Maybe use somehing like the Distill extension to track any changes to the webpage.
async function traverseProcesses(){
    const processes = document.querySelectorAll('#processes') 

    // Change this to a forEach or something more readable
    for(let i = 0; i < processes.length; i++){

        // Gathering data to be sent to DB
        const title = processes[i].innerText;
        const processPack = {
            "id": processes[i].firstChild.id,
            "title": title.substring(0, title.indexOf('\n')),
            "criteria": []
        };

        processes[i].firstChild.firstChild.click()

        // Wait until expanded drop down loads
        await new Promise(resolve => setTimeout(resolve, 100));

        const popupLink = document.querySelector('.ibm-popup-link');
        if(popupLink){
            popupLink.click();
            // Wait for modal to open
            await new Promise(waitForLoad)
            traverseCriteriaList(processPack);
        }
        data.push(processPack);

        // Collapse process info
        processes[i].firstChild.firstChild.click()
    }
    // Move this to another file, maybe index.js
    postToBackend(data);
    // Temp fix to the vertical scrolling bar dissapearing after script.
    document.querySelector("body").style['overflow'] = 'auto';
}

function traverseCriteriaList(processPack){
    let criteriaList = document.querySelector('assessment-criteria ul').children;
    let closeBtn = document.querySelector("a.ibm-close-link.ibm-fright");

    for(let i = 0; criteriaList[i]; i++){
        processPack["criteria"].push(criteriaList[i].innerHTML);
        console.log(criteriaList[i].innerHTML, criteria);
        criteria++;
    }
    // Close criteria pop up
    closeBtn.click()
}

// Make this function more dynamic to recognize both 
// open and close modal mutations correctly.
    // I could observe the <body>'s classList if I want to close instead
    // Pass in open or close as arguments?
function waitForLoad(resolve){
    const targetNode = document.querySelector("div.modal.fade");
    const config = { attributes: true, childList: true, subtree: true };

    const callback = function(mutationList) {
        for(const mutation of mutationList) {
            if (mutation.type === "childList"){
                // Smelly code with the constant connection and disconnection?
                    // The reason why I connect/disconnect for every modal
                    // is to prevent the callback from getting called when the modal closes.
                observer.disconnect();
                resolve();
                break;
            };      
        };
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
}
