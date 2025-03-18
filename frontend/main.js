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
const functionApi ="https://azureresumeapi.azurewebsites.net/api/ResumeCounter?code=X-Gw-8_mgPaPEN3D1fjf0zVPo4i2B-y7EEIahnvy5_IFAzFukZIvhA==";

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