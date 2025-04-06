// Inventory management functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for inventory actions
    const addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', openAddItemModal);
    }

    const importBtn = document.getElementById('import-btn');
    if (importBtn) {
        importBtn.addEventListener('click', openImportModal);
    }

    // Initialize inventory table
    loadInventoryItems();
});

// Function to load inventory items
function loadInventoryItems() {
    // Fetch inventory items from the server
    fetch('/api/inventory')
        .then(response => response.json())
        .then(data => {
            const inventoryTableBody = document.getElementById('inventory-table-body');
            inventoryTableBody.innerHTML = ''; // Clear existing rows

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">${item.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${item.sku}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${item.quantity}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${item.location}</td>
                    <td class="px-6 py-4 whitespace-nowrap">${item.status}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <button class="text-blue-600 hover:text-blue-900" onclick="editItem('${item.id}')">Edit</button>
                        <button class="text-red-600 hover:text-red-900" onclick="deleteItem('${item.id}')">Delete</button>
                    </td>
                `;
                inventoryTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading inventory items:', error));
}

// Function to open the add item modal
function openAddItemModal() {
    // Logic to open modal for adding a new item
    console.log('Open add item modal');
}

// Function to open the import modal
function openImportModal() {
    // Logic to open modal for importing items
    console.log('Open import modal');
}

// Function to edit an item
function editItem(itemId) {
    // Logic to edit an item
    console.log('Edit item with ID:', itemId);
}

// Function to delete an item
function deleteItem(itemId) {
    // Logic to delete an item
    console.log('Delete item with ID:', itemId);
}