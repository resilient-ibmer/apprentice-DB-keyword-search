App Functionality
- User should be able to enter a word
- App should highlight all the instances of that keyword 
    - Since everything is nested, there should be some sort of bubbling up and class changing to signify where the highlighted  word is
    
-  Flow of the app should be:
        - Enter the keyword
        - Send request to backend where you would iterate through processes
        - From the backend, return an object containing the processes and ids that contain that keyword
        - Once the response is received from the backend, open the processes that contain the keyword and highlight them
