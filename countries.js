//this is the error message branch :)
class CountryGuide {

    #valuesOfAllData;

    getAllData() {
        this.addResourceOfData('all');
    }
    getSearchData() {
        this.addResourceOfData('name');
    }

    async addResourceOfData(name) {
        let data;

        try {

            let country_name = document.querySelector('[data_searchBox]').value;
            let response = await fetch(`https://restcountries.com/v3.1/${name}/${country_name}`);

            if (response.status === 404) {

                document.querySelector('[data_wrapper_1]').innerHTML =
                    `<div id='errorBox'>
                <div id='Err'>ERROR</div>
                <div id='messErr'>Oops! Please enter valid country</div>
                <button id='btnOk'>TRY AGAIN</button>
                </div>
                `;

                let btnOk = document.querySelector('#btnOk');
                btnOk.addEventListener('click', () => {
                    document.querySelector('#errorBox').style.display = "none";
                    document.querySelector('[data_searchBox]').focus();
                });

            } else {

                data = await response.json();

                document.querySelector('[data_wrapper_1]').innerHTML = "";

                this.#valuesOfAllData = data;

                data.forEach(element => {
                    this.createHTMLelements(element);
                });
            }

        } catch (error) {
            document.querySelector('[data_wrapper_1]').innerText = 'Error';
        }
    }

    createHTMLelements(data) {

        let container_1 = document.createElement('div');
        container_1.setAttribute('class', 'container_1');
        container_1.innerHTML =
            `
            <div id='details'>
                <img src = '${data.flags.png}'>
                <div><span id='name'>${data.name.common}</span></div>
                <div>Capital: ${data.capital}</div>
                <div>Region: ${data.region}</div>                        
                <div>Population: ${data.population}</div>
            </div>
        `;

        document.querySelector('[data_wrapper_1]').appendChild(container_1);

        container_1.addEventListener('click', () => {
            this.moreinfo(data);
        })
    }

    #flag = true;
    moreinfo(data) {

        let container_2 = document.querySelector('[ data_wrapper_2]');
        let moreInfoCard = document.querySelector('[data_wrapper_2]');

        if (this.#flag) {
            moreInfoCard.style.display = "block";
            container_2.innerHTML =
                `
            <div class='moreinfo'>
                <div id="moreinfo_details">
                    <img src = '${data.flags.png}'>
                    <div><span id='name'>${data.name.common}</span></div>
                    <div>Official name: ${data.name.official}</Official></div>
                    <div>Capital: ${data.capital}</div>
                    <div>Region: ${data.region}</div>                        
                    <div>Population: ${data.population}</div>
                    <div>Languages: ${Object.values(data.languages)}</div>
                    <div>Timezones: ${data.timezones}</div>
                </div>
            </div>
        `;

            document.querySelector('[data_wrapper_1]').classList.add('blurEffect');
            document.querySelector('header').classList.add('blurEffect');
            this.#flag = false;
        }

        moreInfoCard.addEventListener('click', () => {

            document.querySelector('.moreinfo').classList.add('ending_animation');
            document.querySelector('[data_wrapper_1]').classList.remove('blurEffect');
            document.querySelector('header').classList.remove('blurEffect');

            setTimeout(() => {
                moreInfoCard.style.display = "none";
            }, 400);

            this.#flag = true;
        })
    }

    selectOption(e) {

        document.querySelector('[data_wrapper_1]').innerHTML = "";

        this.#valuesOfAllData.filter((element) => {
            if (element.region === e.target.value) {
                this.createHTMLelements(element);
            }
            else if (e.target.value === "All") {
                this.createHTMLelements(element);
            }
        })
    }

    sortingCountries() {

        document.querySelector('[data_wrapper_1]').innerHTML = "";

        this.#valuesOfAllData.sort((a, b) => {

            let str1 = a.name.common.split('')[0];
            let str2 = b.name.common.split('')[0];

            let fLetter = str1.charCodeAt(0);
            let sLetter = str2.charCodeAt(0);

            return fLetter - sLetter;
        })

        this.#valuesOfAllData.forEach((element) => {
            this.createHTMLelements(element);
        })
    }
}

let obj = new CountryGuide();
obj.getAllData();

let search = document.querySelector('[data_searchBtn]');
search.addEventListener('click', () => {
    obj.getSearchData();
})

let select = document.querySelector('[data_select]');
select.addEventListener('change', (e) => {
    obj.selectOption(e);
})

let sort = document.querySelector('[data-sort]');
sort.addEventListener('click', () => {
    obj.sortingCountries();
})