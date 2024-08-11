const loadPhone = async (searchValue, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phoneContainer');

    // For Empty Result
    if(phones.length === 0){
        phoneContainer.innerHTML = `
        <h1 class="text-4xl fixed top-[55%]">oppsss!!!!!!!! no result found</h1>
        `
    }

    // Show More Section
    const showMoreSection = document.getElementById('showMoreSection');
    
    // Condition for showing the "Show More" button
    if(phones.length > 15 && !isShowAll){
        showMoreSection.classList.remove('hidden');
    } else {
        showMoreSection.classList.add('hidden');
    }

    // check how many content will be showed
    if(!isShowAll) {
        phones = phones.slice(0, 15);
    }

    // For loader
    toggleLoadingSpinner(false);
    
    // creating div and input the innerHTML for single phones
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 w-full shadow border border-black border-black`;
        phoneCard.innerHTML = `
        <figure><img class="mt-5" src="${phone.image}" alt="phones"/></figure>
        <div class="card-body text-center">
            <h2 class="card-title justify-center">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="modalHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
}

// By default Page shows the iphone
loadPhone('iphone');

// For Modal
const modalHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    const phoneDetails = document.getElementById('phoneDetails');
    phoneDetails.innerHTML = `
    <div class="flex justify-center  rounded-xl p-4 bg-lime-50"><img src="${phone.image}" alt="phoneImage"></div>
    <div class="mt-2">
    <h2 class="text-3xl">${phone.name}</h2>
    <p>The readable content of a page when looking at its layout.</p>
    <h4><span class="font-bold">ChipSet: </span>${phone.mainFeatures.chipSet}</h4>
    <h4><span class="font-bold">Storage & Memory: </span>${phone.mainFeatures.memory}</h4>
    <h4><span class="font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</h4>
    <h4><span class="font-bold">Sensors: </span>${phone.mainFeatures.sensors[0]}</h4>
    <h4><span class="font-bold">GPS: </span>${phone.data?.gps || 'Not Available'}</h4>
    <h4><span class="font-bold">Release data: </span>${phone.releaseDate}</h4>
    <h4><span class="font-bold">Brand: </span>${phone.brand}</h4>
    </div>
    `;
    displayModal.showModal();
}  

// Search Function
const searchPhones = (isShowAll) => {
    toggleLoadingSpinner(true);
    const phoneContainer = document.getElementById('phoneContainer');
    phoneContainer.innerHTML = "";
    const inputField = document.getElementById('inputField');
    const fieldValue = inputField.value;
    loadPhone(fieldValue, isShowAll);
}

const handleShowAll = () => {
    searchPhones(true);
}

// Function For Loader
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loadingSpinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}