const uploadsUrl = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000";

const productImages = {
  "dry maize grain": "/category-images/maize.jpg",
  "nambale beans": "/category-images/beans.jpg",
  "fresh tomatoes": "/category-images/tomatoes.jpg",
  "white maize": "/category-images/maize.jpg",
  "local chicken eggs": "/category-images/eggs.jpg",
  "broiler chicken": "/category-images/broiler-chicken.jpg",
  "arabica coffee beans": "/category-images/arabica-coffee.jpg",
  "matooke bunches": "/category-images/plantain.jpg",
  "passion fruits": "/category-images/passionfruit.jpg",
  "fresh cow milk": "/category-images/milk.jpg"
};

const categoryImages = {
  maize: "/category-images/maize.jpg",
  beans: "/category-images/beans.jpg",
  matooke: "/category-images/plantain.jpg",
  coffee: "/category-images/coffee.jpg",
  milk: "/category-images/milk.jpg",
  poultry: "/category-images/poultry.jpg",
  vegetables: "/category-images/vegetables.jpg",
  fruits: "/category-images/fruits.jpg"
};

export function getProductImage(product) {
  if (product.image) {
    return `${uploadsUrl}${product.image}`;
  }

  const productName = product.product_name?.trim().toLowerCase();
  if (productName && productImages[productName]) {
    return productImages[productName];
  }

  const categoryName = product.category_name?.trim().toLowerCase();
  return categoryImages[categoryName] || categoryImages.fruits;
}