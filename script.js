function updateLimit(value) {
    const display = document.getElementById("limit-value");
    display.textContent = "$" + Number(value).toLocaleString();
}

function updateDetails(cardNo) {
    const details = document.getElementById("card-details");

    if (cardNo === 1) {
        details.innerHTML = `
        <div class="detail-item"><span>Card Type</span><strong>Visa</strong></div>
        <div class="detail-item"><span>Card Number</span><strong>•••• 4532</strong></div>
        <div class="detail-item"><span>Expiry Date</span><strong>12/26</strong></div>
        <div class="detail-item"><span>Status</span><span class="status-active">Active</span></div>
        `;
        document.getElementById("toggle1").checked = false;
    } else if (cardNo === 2) {
        details.innerHTML = `
        <div class="detail-item"><span>Card Type</span><strong>Visa</strong></div>
        <div class="detail-item"><span>Card Number</span><strong>•••• 8901</strong></div>
        <div class="detail-item"><span>Expiry Date</span><strong>08/25</strong></div>
        <div class="detail-item"><span>Status</span><span class="status-active">Active</span></div>
        `;
        document.getElementById("toggle1").checked = false;
    } else if (cardNo === 3) {
        details.innerHTML = `
        <div class="detail-item"><span>Card Type</span><strong>Visa</strong></div>
        <div class="detail-item"><span>Card Number</span><strong>•••• 2156</strong></div>
        <div class="detail-item"><span>Expiry Date</span><strong>03/27</strong></div>
        <div class="detail-item"><span>Status</span><span class="status-frozen">Frozen</span></div>
        `;
        document.getElementById("toggle1").checked = true;
    }
}

function handleDisplay(cardId) {

    // 1. Show correct card
    document.querySelectorAll('.credit-card').forEach(card => {
        card.classList.remove('active');
    });
    document.getElementById(cardId).classList.add('active');

    // 2. Update dots
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.classList.remove('active');
    });

    if (cardId === 'sectioncard1') {
        document.querySelectorAll('.carousel-dot')[0].classList.add('active');
        updateDetails(1);
        currentCard = 1;
    } else if (cardId === 'sectioncard2') {
        document.querySelectorAll('.carousel-dot')[1].classList.add('active');
        updateDetails(2);
        currentCard = 2;
    } else {
        document.querySelectorAll('.carousel-dot')[2].classList.add('active');
        updateDetails(3);
        currentCard = 3;
    }
}

// initialize first card correctly
updateDetails(1);

let currentCard = 1;

function prevCard() {
    currentCard--;
    if (currentCard < 1) currentCard = 3;
    handleDisplay('sectioncard' + currentCard);
}

function nextCard() {
    currentCard++;
    if (currentCard > 3) currentCard = 1;
    handleDisplay('sectioncard' + currentCard);
}

function toggleFreeze() {
    const card = document.getElementById('sectioncard' + currentCard);
    const toggle = document.getElementById('toggle1');
    const details = document.getElementById("card-details");

    if (toggle.checked) {
        // ADD frozen effect
        card.classList.add('frozen');

        // ADD overlay if not present
        if (!card.querySelector('.card-frozen-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'card-frozen-overlay';
            overlay.innerHTML = '<span>Card Frozen</span>';
            card.appendChild(overlay);
        }

        // update status
        details.innerHTML = details.innerHTML.replace(
            /status-active/g,
            'status-frozen'
        ).replace(
            /Active/g,
            'Frozen'
        );

    } else {
        // REMOVE frozen effect
        card.classList.remove('frozen');

        // REMOVE overlay
        const overlay = card.querySelector('.card-frozen-overlay');
        if (overlay) overlay.remove();

        // update status
        details.innerHTML = details.innerHTML.replace(
            /status-frozen/g,
            'status-active'
        ).replace(
            /Frozen/g,
            'Active'
        );
    }
}

function showTransactions(sectionId) {
    // hide all
    document.getElementById("sectionAll-transactions").style.display = "none";
    document.getElementById("sectionIncome-transactions").style.display = "none";
    document.getElementById("sectionExpense-transactions").style.display = "none";

    // show selected
    document.getElementById(sectionId).style.display = "block";

    // remove active from all tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // add active to correct tab (SAFE way)
    if (sectionId === "sectionAll-transactions") {
        document.querySelectorAll('.filter-tab')[0].classList.add('active');
    } else if (sectionId === "sectionIncome-transactions") {
        document.querySelectorAll('.filter-tab')[1].classList.add('active');
    } else {
        document.querySelectorAll('.filter-tab')[2].classList.add('active');
    }
}

function setActiveNav(index) {
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.bottom-nav-item')[index].classList.add('active');
}

function switchPage(pageId, clickedItem) {
    // hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // show selected page
    document.getElementById(pageId).style.display = 'block';

    // update active nav
    document.querySelectorAll('.bottom-nav-item')
        .forEach(item => item.classList.remove('active'));

    clickedItem.classList.add('active');
}

function openDashboard() {
    display('sectionPage-dashboard');
}
window.onload = function() {
    openDashboard();
};

window.onload = function() {
    showTransactions('sectionAll-transactions');
};

window.onload = function() {
    switchPage('sectionPage-dashboard', document.querySelectorAll('.bottom-nav-item')[0]);
};

function setActiveNav(clickedItem) {
    document.querySelectorAll('.bottom-nav-item')
        .forEach(item => item.classList.remove('active'));

    clickedItem.classList.add('active');
}