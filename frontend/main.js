// window.addEventListener('DOMContentLoaded',(event)=>{
//     getVisitCount();
// });
// const functionApi='http://localhost:7072/api/ResumeCounter';

// const getVisitCount =()=>{

//     let count = 30;
//     fetch(functionApi).then(response=>{
//         return response.json()
//     }).then(response=>{
//         console.log("Website called function API.");
//         count = response.count;
//         document.getElementById("counter").innerText = count;
//     }).catch(function(error){
//         console.log(error);
//     });
//     return count;
// }

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM fully loaded and parsed");
    getVisitCount();
});

// const functionApi = 'http://localhost:7072/api/ResumeCounter';
const functionApi ="resumeapiyogdeep.azurewebsites.net"
// "https://resumeapiyogdeep.azurewebsites.net/api/ResumeCounter?code=JDnKptYRJSCJxCkYO3iUwYaz-zIY4h5VvORHW8Z1Iz53AzFuFxVHuw=="
const getVisitCount = () => {
    console.log("Calling function API:", functionApi);
    fetch(functionApi).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    }).then(response => {
        console.log("API response:", response);
        const count = response.count;
        document.getElementById("counter").innerText = count;
    }).catch(function(error) {
        console.error("Error fetching counter:", error);
    });
}