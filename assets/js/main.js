const BASE_URL = " https://restcountries.com/v3.1/name";

function getAllData(endpoint){
    fetch(`${BASE_URL}/${endpoint}`).then((response) =>{
        if(!response.ok){
            throw new Error("Error occured when trying to get response!")
        }
        return response.json()
    }).then((data)=>{
        console.log(data)
    }).catch((error) =>{
        console.log(error)
    })

}

getAllData("azerbaijan")