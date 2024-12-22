
// const wherAmI= function (lat, lang) {
//     fetch(`https://geocode.xyz/${lat},${lang}?geoit=json`).then(res=>{
//         const contentType = res.headers.get('content-type')
//         console.log(contentType);
//         const data= res.json();
//         return data
                
//     }).then(res=>{
//         console.log(res);
        
//     })

    
    
// }
const container= document.querySelector(".container");
const render= function(data){
    const html= `<div class="card">
        <div class="card_img">
            <img src="${data.flags.png}" alt="">
        </div>
        <h3 class="country">${data.name}</h3>
        <h2 class="region">${data.region}</h2>
        <h2 class="population">${data.population}</h2>
        <h2 class="language">${data.languages[0].name}</h2>
        <h2 class="currencie">${data.currencies[0].name}</h2>
      </div>`
    container.insertAdjacentHTML("afterbegin",html)
}

const wherAmI= function (lat, lang) {
    fetch(`https://geocode.xyz/${lat},${lang}?geoit=xml&auth=337256604341157631159x92715`).then(res=>{
        const contentType = res.headers.get('content-type')
        console.log(contentType);
        const data= res.text();
        return data
                
    }).then(res=>{
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res,"text/xml");

        console.log("parsed data",xmlDoc);
        const country = xmlDoc.querySelector("country").textContent
        const city = xmlDoc.querySelector("city").textContent
        console.log(`you are in ${city}, ${country}`);
        return fetch(`https://restcountries.com/v2/name/${country}`).then(res=>{
            const data= res.json();
            return data
            
        }).then(res=>{
           const [data]= res
           console.log("destructuring  data ",data);
           render(data);
        })
        
    })

    
    
}


wherAmI(52.508,13.381);
wherAmI(19.037,72.873);
wherAmI(-33.933,18.474);
wherAmI(-33.933,18.474);
