const express = require('express');
const router = express.Router();

// Sample inventory data
let inventoryItems = [
    { id: '1', name: 'Premium Widget', sku: 'WID-001', quantity: 42, location: 'Warehouse A', status: 'In Stock' },
    { id: '2', name: 'Basic Widget', sku: 'WID-002', quantity: 15, location: 'Warehouse B', status: 'Low Stock' },
];

// Get all inventory items
router.get('/', (req, res) => {
    res.json(inventoryItems);
});

// Add a new inventory item
router.post('/', (req, res) => {
    const newItem = { id: Date.now().toString(), ...req.body };
    inventoryItems.push(newItem);
    res.status(201).json(newItem);
});

// Update an inventory item
router.put('/:id', (req, res) => {
    const itemId = req.params.id;
    const index = inventoryItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        inventoryItems[index] = { id: itemId, ...req.body };
        res.json(inventoryItems[index]);
    } else {
        res.status(404).send('Item not found');
    }
});

// Delete an inventory item
router.delete('/:id', (req, res) => {
    const itemId = req.params.id;
    inventoryItems = inventoryItems.filter(item => item.id !== itemId);
    res.status(204).send();
});

module.exports = router;