## 📦 What the Function Does
`calculateTotal` computes the **total cost** of a list of items and optionally applies a percentage discount.

---

## 🔧 Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `Array` of objects | Each object must have:<br>• `price` – numeric unit price<br>• `qty` – numeric quantity |
| `discountParam` | `Number` | Discount percentage (e.g., `10` for 10 %). Ignored if ≤ 0. |

---

## 📤 Return Value
- **Number** – the final amount after summing all line items and subtracting any discount.

---

## 🛠️ Step‑by‑Step Logic

1. **Initialize accumulator**  
   ```js
   let total = 0;
   ```
   Starts the running total at zero.

2. **Iterate through every item**  
   ```js
   for (let i = 0; i < items.length; i++) {
       total += items[i].price * items[i].qty;
   }
   ```
   - Multiply each item's `price` by its `qty`.  
   - Add the result to `total`.  
   - After the loop, `total` equals the sum of *price × quantity* for all items.

3. **Apply discount if requested**  
   ```js
   if (discountParam > 0) {
       total = total - (total * (discountParam / 100));
   }
   ```
   - Checks that the discount is a positive number.  
   - Calculates the discount amount: `total * (discountParam / 100)`.  
   - Subtracts that amount from the current `total`.

4. **Result**  
   The function ends (the missing `return total;` is implied) with the final amount ready for display, invoicing, or further processing.

---

## 🚀 Quick Example

```js
const cart = [
  { price: 20, qty: 2 }, // $40
  { price: 15, qty: 1 }  // $15
];
const final = calculateTotal(cart, 10); // 10 % discount
// total before discount = 55
// discount = 5.5
// final = 49.5
```

---

## 📝 Key Takeaways for Beginners
- **Looping** (`for`) lets you handle an arbitrary number of items.  
- **Multiplication** (`price * qty`) gives the line‑item cost.  
- **Conditional discount** runs only when a positive percentage is supplied.  
- The function returns a **single numeric value** that represents the payable amount.  # frontVIBE
