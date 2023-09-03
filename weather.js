
const btnElement = document.querySelector('.btn');

const inputElement = document.querySelector('.input');

const displayTitle = document.querySelector('h2');

const apiKey = '00f06710edcf484f936125141230309';

const tempELementC = document.querySelector('.tempElementC');

const tempELementF = document.querySelector('.tempElementF');

const currentCity = document.querySelector('.city');

const currentCountry = document.querySelector('.country');

const currentTime = document.querySelector('.time');

const currentCondition = document.querySelector('.condition');

const image = document.querySelector('.imgLink');

const currentDate = document.querySelector('.date');

btnElement.addEventListener('click' , function(e){

    btnElement.classList.add('btnEffects');

    // console.log(inputElement.value);

    if( inputElement.value === ''){
        alert('Please Enter a Valid Location');
    }

    setTimeout(() => {
       btnElement.classList.remove('btnEffects') 
    }, 200);

    const city = inputElement.value;

    fetchNUpdateUI(city);

    // console.log(city);

    inputElement.value = '';
});


async function fetchNUpdateUI(cityName){

    try{
        let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;
        let response = await fetch(url);
        let json = await response.json();
        // console.log(response);

        if(response.status === 400){
            alert(`${json.error.message}`);
            return;
        }
        const tempInC = json.current.temp_c;

        const tempInF = json.current.temp_f;
        
        const cityVal = json.location.name;

        const currCountry = json.location.country;

        const time = json.location.localtime;

        const currCondition = json.current.condition.text;

        const imageLink = json.current.condition.icon;

        uiChange(tempInF , tempInC , cityVal , currCountry , time , currCondition , imageLink);
        
    }
    catch(err){
        // console.log(err);
    }
}


function uiChange(tempInF , tempInC , cityVal , currCountry , time , currCondition , imageLink){

    const date = time.substring(0,10);

    // date.reverse();

    const timePart = time.substring(11,16);

    tempELementC.innerText = `${tempInC} °C`;

    tempELementF.innerText = `${tempInF} °F`;

    currentCity.innerText = cityVal;

    currentTime.innerText = timePart;

    currentDate.innerText = date;

    currentCountry.innerText = currCountry;

    image.setAttribute('src' , imageLink);

    currentCondition.innerText = currCondition;
}



