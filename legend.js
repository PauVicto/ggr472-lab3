//Legend items with category and corresponding icon paths (added png's matching icons on map)
const legenditems = [
    { category: 'Cafe', icon: 'icons/cafe-icon.png' }, //Category: Cafe, Icon: cafe png file
    { category: 'Restaurant', icon: 'icons/restaurant-icon.png' }, //category: Restaurant, Icon: restaurant png file
    { category: 'Study Spot', icon: 'icons/star-icon.png' }, //Category: Study Spot, Icon: star png file
];

//Select HTML element with id 'legend' from index.html to add legend items to
const legend = document.getElementById('legend');

//create legend entries for each category with corresponding icon and text, and add to legend element
legenditems.forEach(({ category, icon }) => {
    const row = document.createElement('div'); //Create a new div element for each legend item 
    const iconSymbol = document.createElement('img'); //create an <img> element to display the icon

    iconSymbol.className = 'legend-icon'; //Apply the CSS class "legend-icon" from CSS for icon formats
    iconSymbol.src = icon; //Set icon image source to corresponding icon path for category

    const text = document.createElement('span'); //Create <span> element to display the category name
    text.textContent = category; //Insert category text (Vic's Spots) into the <span> element

    row.append(iconSymbol, text); //Add icon and text to legend 
    legend.appendChild(row); //Add the completed legend row to legent container in HTML
});