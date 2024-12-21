async function loadDrugs() {
    const response = await fetch('tableData.json');
    const drugs = await response.json();
    const drugList = document.getElementById('drug-list');

    drugs.forEach(drug => {
        const drugItem = document.createElement('div');
        drugItem.innerHTML = `<h2>${drug.name}</h2><p>品牌: ${drug.brandName || '无'}</p><p>制造商: ${drug.manufacturer}</p>`;
        drugList.appendChild(drugItem);
    });
}

window.onload = loadDrugs;

function searchDrug() {
    const query = document.getElementById('search').value.toLowerCase();
    const drugItems = document.querySelectorAll('#drug-list > div');

    drugItems.forEach(item => {
        const name = item.querySelector('h2').innerText.toLowerCase();
        item.style.display = name.includes(query) ? 'block' : 'none';
    });
}
