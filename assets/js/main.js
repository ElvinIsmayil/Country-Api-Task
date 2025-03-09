const BASE_URL = "https://restcountries.com/v3.1/all";
const countriesContainer = document.getElementById("countries");
const searchInput = document.querySelector(".form-control[type='search']");

let allCountries = []; 

function showSpinner() {
    document.getElementById("spinner-container").classList.add("show");
}

function hideSpinner() {
    setTimeout(() => {
        document.getElementById("spinner-container").classList.remove("show");
    }, 1500);
}

function fetchCountries() {
    showSpinner();

    fetch(BASE_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error occurred when trying to get response!");
            }
            return response.json();
        })
        .then(data => {
            allCountries = data; 
            displayCountries(data); 
        })
        .catch(error => {
            console.error(error);
            countriesContainer.innerHTML = `<p style="color: red;">Failed to load data. Please try again.</p>`;
        })
        .finally(() => {
            hideSpinner();
        });
}

function displayCountries(countries) {
    let content = "";

    countries.forEach(card => {
        const countryName = encodeURIComponent(card.name.common);

        content += `
            <div class="col-md-6 col-lg-3">
                <div class="card shadow">
                    <a href="./detail.html?name=${countryName}">
                        <img src="${card.flags.png}" style="width: 287px; height: 170px;" class="card-img-top" alt="Flag of ${card.name.common}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title mb-3">${card.name.common}</h5>
                        <p class="card-text mb-1">Population: ${card.population.toLocaleString()}</p>
                        <p class="card-text mb-1">Region: ${card.region}</p>
                        <p class="card-text mb-1">Capital: ${card.capital ? card.capital[0] : "N/A"}</p>
                    </div>
                </div>
            </div>`;
    });

    countriesContainer.innerHTML = content;
}

function searchCountries() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm)
    );

    displayCountries(filteredCountries);
}

searchInput.addEventListener("input", searchCountries);

document.addEventListener("DOMContentLoaded", fetchCountries);
