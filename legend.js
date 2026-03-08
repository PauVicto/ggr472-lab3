const legenditems = [
    { category: 'Cafe', icon: 'icons/cafe-icon.png' },
    { category: 'Restaurant', icon: 'icons/restaurant-icon.png' },
    { category: 'Study Spot', icon: 'icons/star-icon.png' },
];

const legend = document.getElementById('legend');


legenditems.forEach(({category, icon}) => {
    const row = document.createElement('div');
    const iconSymbol = document.createElement('img');
    
    iconSymbol.className = 'legend-icon';
    iconSymbol.src = icon;

    const text = document.createElement('span');
    text.textContent = category;

    row.append(iconSymbol, text);
    legend.appendChild(row);
});