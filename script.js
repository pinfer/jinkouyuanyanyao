async function loadDrugs() {
    const response = await fetch('tableData.json');
    const drugs = await response.json();
    const drugList = document.getElementById('drug-list');

    // 将药品数据存储在全局变量中，以便搜索时使用
    window.drugsData = drugs;

    drugs.forEach(drug => {
        const drugItem = document.createElement('div');
        drugItem.innerHTML = `<h2>${drug.name}</h2><p>品牌: ${drug.brandName || '无'}</p><p><a href="#" onclick="showManufacturerDrugs('${drug.manufacturer}')">${drug.manufacturer}</a></p>`;
        drugList.appendChild(drugItem);
    });
}

window.onload = loadDrugs;

function searchDrug() {
    const query = document.getElementById('search').value.toLowerCase();
    const drugItems = document.querySelectorAll('#drug-list > div');

    drugItems.forEach(item => {
        const name = item.querySelector('h2').innerText.toLowerCase();
        const brand = item.querySelector('p').innerText.toLowerCase();
        const manufacturer = item.querySelectorAll('p')[1].innerText.toLowerCase(); // 获取制造商信息

        // 检查名称、品牌和制造商是否包含查询字符串
        item.style.display = name.includes(query) || brand.includes(query) || manufacturer.includes(query) ? 'block' : 'none';
    });
}

function showManufacturerDrugs(manufacturer) {
    const manufacturerDrugs = window.drugsData.filter(drug => drug.manufacturer === manufacturer);
    const manufacturerDrugList = document.getElementById('manufacturer-drugs');
    
    manufacturerDrugList.innerHTML = ''; // 清空之前的内容

    manufacturerDrugs.forEach(drug => {
        const drugItem = document.createElement('div');
        drugItem.innerHTML = `<h3>${drug.name}</h3><p>品牌: ${drug.brandName || '无'}</p>`;
        manufacturerDrugList.appendChild(drugItem);
    });

    document.getElementById('drug-list').style.display = 'none'; // 隐藏主药品列表
    document.getElementById('manufacturer-drug-list').style.display = 'block'; // 显示制造商药品列表
}

function goBack() {
    document.getElementById('manufacturer-drug-list').style.display = 'none'; // 隐藏制造商药品列表
    document.getElementById('drug-list').style.display = 'block'; // 显示主药品列表
}
