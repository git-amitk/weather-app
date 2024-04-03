
const btn = document.getElementById("search");
const cityname = document.getElementById("cityname");
const temp = document.getElementById("temp");
const time = document.getElementById("time");
const locate = document.getElementById("location");

const input = document.getElementById("input");
async function search(cityname) {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=539f2d0205cb44e4b6c192919232107&q=${cityname}&aqi=yes`);
    return await promise.json();
}

btn.addEventListener("click", async function () {
    const value = input.value;
    const result = await search(value);
    cityname.innerText = `${result.location.name}, ${result.location.region},${result.location.country}`;
    temp.innerText = `${result.current.temp_c}`;
    time.innerText = `${result.location.localtime}`;

});
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for live location
async function gotlocation(loc) {
    const result = await gotdata(loc.coords.latitude, loc.coords.longitude);
    cityname.innerText = `${result.location.name}, ${result.location.region},${result.location.country}`;
    temp.innerText = `${result.current.temp_c}`;
    time.innerText = `${result.location.localtime}`;

}
function notgotlocation() {
    return "there was a issue";
}


locate.addEventListener("click", async function () {
    navigator.geolocation.getCurrentPosition(gotlocation, notgotlocation);
})
async function gotdata(lat, long) {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=539f2d0205cb44e4b6c192919232107&q=${lat},${long}&aqi=yes`);
    return await promise.json();
}


// http://api.weatherapi.com/v1/current.json?key=539f2d0205cb44e4b6c192919232107&q=Jalandhar&aqi=yes