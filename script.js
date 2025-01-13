const denominationsDiv = document.getElementById('denominations');
const totalDiv = document.getElementById('total');
const copyButton = document.getElementById('copyButton');
const clearButton = document.getElementById('clearButton');
const themeToggle = document.getElementById('themeToggle');

const defaultDenominations = [5000, 1000, 500, 100, 50, 20, 75, 10,];
let denominationsData = [];

function initializeDenominations() {
    denominationsData = defaultDenominations.map(value => ({ value, quantity: 0 }));
    renderDenominations();
}

function updateTotal() {
    let total = 0;
    denominationsData.forEach(d => {
        total += d.value * d.quantity;
    });
    totalDiv.textContent = `Rs ${total.toFixed(0)}`;
}

function renderDenominations() {
    denominationsDiv.innerHTML = "";
    denominationsData.forEach(d => {
        const div = document.createElement('div');
        div.className = "denomination";
        div.innerHTML = `
            <label>${d.value}</label>
            <input type="number" value="${d.quantity}" min="0">
            <span class="result">= Rs 0</span>
        `;
        const input = div.querySelector('input');
        const result = div.querySelector('.result');

        input.addEventListener('input', () => {
            d.quantity = parseInt(input.value) || 0;
            const subtotal = d.value * d.quantity;
            result.textContent = `= Rs ${subtotal.toFixed(0)} `;
            updateTotal();
        }); 

        denominationsDiv.appendChild(div);
    });
    updateTotal();
}

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(totalDiv.textContent).then(() => {
        alert("Total copied to clipboard!");
    });
});

clearButton.addEventListener('click', () => {
    denominationsData.forEach(d => d.quantity = 0);
    renderDenominations();
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

initializeDenominations();