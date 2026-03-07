const legenditems = [
    { category: 'Cafe', icon: 'cafe' },
    { category: 'Restaurant', icon: 'restaurant' },
    { category: 'Study Spot', icon: 'star' },
];

const legend = document.getElementById('legend');


legenditems.forEach(({category, icon}) => {
    const row = document.createElement('div');
    const iconSymbol = document.createElement('span');
    
    iconSymbol.className = 'legend-icon';
    iconSymbol.textContent = icon;

    const text = document.createElement('span');
    text.textContent = category;

    row.append(iconSymbol, text);
    legend.appendChild(row);
});