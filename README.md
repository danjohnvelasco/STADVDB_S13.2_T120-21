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
SELECT c.customer_state AS "State", QUARTER(o.order_purchase_timestamp) AS "Quarter Of Purchase", p.product_category_name AS "Product Category", sum(s.unit_sales) AS "Unit Sales"
FROM customers c
INNER JOIN sales s ON c.customer_id = s.customer_id
INNER JOIN products p ON s.product_id = p.product_id
INNER JOIN orders o ON s.order_id = o.order_id
WHERE YEAR(o.order_purchase_timestamp) = ?
GROUP BY c.customer_state, QUARTER(o.order_purchase_timestamp), p.product_category_name
WITH ROLLUP
ORDER BY c.customer_state ASC, QUARTER(o.order_purchase_timestamp) ASC, sum(s.unit_sales) DESC;
```

## Drill-down

```
SELECT c.customer_city AS "City", MONTH(o.order_purchase_timestamp) AS "Month Of Purchase", p.product_category_name AS "Product Category", sum(s.unit_sales) AS "Unit Sales"
FROM customers c
INNER JOIN sales s ON c.customer_id = s.customer_id
INNER JOIN products p ON s.product_id = p.product_id
INNER JOIN orders o ON s.order_id = o.order_id
WHERE c.customer_state = ?
AND YEAR(o.order_purchase_timestamp) = ?
GROUP BY c.customer_city, MONTH(o.order_purchase_timestamp), p.product_category_name
WITH ROLLUP;
```

## Slice

```
SELECT c.customer_city AS "City", QUARTER(o.order_purchase_timestamp) AS "Quarter Of Purchase", p.product_category_name AS "Product Category", sum(s.unit_sales) AS "Unit Sales"
FROM customers c
INNER JOIN sales s ON c.customer_id = s.customer_id
INNER JOIN products p ON s.product_id = p.product_id
INNER JOIN orders o ON s.order_id = o.order_id
WHERE YEAR(o.order_purchase_timestamp) = ?
AND c.customer_city = ?
GROUP BY c.customer_city, QUARTER(o.order_purchase_timestamp), p.product_category_name
WITH ROLLUP;
```

## Dice

```

```
