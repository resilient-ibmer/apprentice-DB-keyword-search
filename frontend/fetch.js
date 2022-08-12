const baseUrl = "http://localhost:3001"


async function testConnection(){
    let response = await fetch(baseUrl);

    let result = await response.json();

    console.log(result);
}


async function postToBackend(data){
      
    let response = await fetch(baseUrl + "/processes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    });
    
    let result = await response.json();
    alert(result.message);
}