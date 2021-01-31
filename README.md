# MCO2

# Web App Link

### [Heroku](https://olist-advdb-mco2.herokuapp.com/)

# Members

- Alba, Axel
- Intatano, Nick
- Sison, Danielle Kirsten
- Uy, Andilyn
- Velasco, Dan John

# Dataset

### [Kaggle](https://www.kaggle.com/olistbr/brazilian-ecommerce?select=olist_orders_dataset.csv)

### [SQL Version](https://drive.google.com/file/d/1mjm5xCUcmxBu3JhpqU1KciseGw6SuRkf/view?usp=sharing)

# Queries

## Roll-up

```
SELECT sl.seller_state AS "State", p.product_category_name AS "Product Category", sl.seller_id AS "Seller ID", sum(s.unit_sales) AS "Total Unit Sales"
FROM sellers sl INNER JOIN sales s ON sl.seller_id = s.seller_id
INNER JOIN products p ON s.product_id = p.product_id
GROUP BY sl.seller_state, p.product_category_name, sl.seller_id
WITH ROLLUP
```

## Drill-down

```
SELECT p.product_category_name AS "Product Category", QUARTER(s.order_approved_at) AS "QUARTER", c.customer_state AS "STATE", c.customer_city  AS "CITY", sum(s.unit_sales) AS "Total Unit Sales"
FROM sales s
JOIN products p ON s.product_id = p.product_id
JOIN customers c ON s.customer_id = c.customer_id
GROUP BY p.product_category_name, QUARTER(s.order_approved_at), c.customer_state, c.customer_city
WITH ROLLUP;
```

## Slice

```
SELECT QUARTER(s.order_approved_at) AS "quarter", p.product_category_name AS "product category", SUM(s.total_sales) AS "total sales"
FROM sales s
JOIN products p ON s.product_id = p.product_id
WHERE QUARTER(s.order_approved_at) = ?
GROUP BY QUARTER(s.order_approved_at), p.product_category_name
```

## Dice

```
SELECT customer_state, product_category_name, SUM(unit_sales) AS "unit_sales"
FROM sales
JOIN products ON product_id
JOIN orders ON order_id
JOIN customers ON customer_id
WHERE order_status = "delivered" AND product_category = "X"
AND (state = "Y" OR state = "Z")
GROUP BY state, product_category_name
```
