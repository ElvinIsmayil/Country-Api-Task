const BASE_URL = "https://restcountries.com/v3.1/name/";
const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

if (countryName) {
    fetch(`${BASE_URL}${countryName}?fullText=true`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch country data");
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const country = data[0];

                
                document.getElementById("country-flag").src = country.flags.png;
                document.getElementById("name").textContent = country.name.common;
                document.getElementById("nativeName").textContent = 
                    country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A";
                document.getElementById("population").textContent = country.population.toLocaleString();
                document.getElementById("region").textContent = country.region;
                document.getElementById("subregion").textContent = country.subregion;
                document.getElementById("capital").textContent = country.capital ? country.capital[0] : "N/A";
                document.getElementById("tld").textContent = country.tld ? country.tld.join(", ") : "N/A";
                document.getElementById("currencies").textContent = 
                    country.currencies ? Object.values(country.currencies)[0].name : "N/A";
                document.getElementById("languages").textContent = 
                    country.languages ? Object.values(country.languages).join(", ") : "N/A";

                
                const borderDiv = document.getElementById("borders");
                const countryBorders = country.borders; 

                if (countryBorders && countryBorders.length > 0) {
                    borderDiv.innerHTML = `<p class="mb-1"><strong>Border countries:</strong></p>`; 
                    countryBorders.forEach(async (borderCode) => {
                        try {
                            
                            let response = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
                            let borderCountry = await response.json();

                            let borderName = borderCountry[0].name.common; 

                            
                            let button = document.createElement("button");
                            button.className = "shadow btn btn-light border-0 p-2 w-auto m-1";
                            button.innerText = borderName;
                            button.onclick = () => openCountryDetail(borderName); 

                            borderDiv.appendChild(button);
                        } catch (error) {
                            console.error(`Error fetching border ${borderCode}:`, error);
                        }
                    });
                } else {
                    borderDiv.innerHTML = `<p>No bordering countries</p>`; 
                }
            }
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
        });
} else {
    console.error("No country name found in URL.");
}

function openCountryDetail(name) {
    window.location.href = `detail.html?name=${encodeURIComponent(name)}`; 
}
