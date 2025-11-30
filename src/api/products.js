// returns a promise that resolves after a short delay to simulate network
const mockProducts = [
  {
    id: 1,
    name: "Premium Leather Office Bag",
    price: 2499,
    images: [
      "https://f.nooncdn.com/p/pzsku/Z60927CF937597CF1CD0DZ/45/_/1735207238/7fa4e708-83de-4a4c-a399-793e7f0a97a9.jpg?width=800",
      "https://f.nooncdn.com/p/pzsku/Z60927CF937597CF1CD0DZ/45/_/1735207227/b5c474fa-1fbf-4084-b7fa-357cd6a99fa3.jpg?width=800",
      "https://f.nooncdn.com/p/pzsku/Z60927CF937597CF1CD0DZ/45/_/1735207227/9c64bdfb-30b7-47ae-b61b-d669e5e19ca1.jpg?width=800"
    ],
    video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "Handcrafted full-grain leather office bag designed for professionals who value durability, style, and functionality.",
    highlights: [
      "100% Genuine Leather",
      "Fits up to 15.6 inch laptop",
      "Water-resistant inner lining",
      "Premium YKK zippers",
      "Detachable shoulder strap"
    ],
    specifications: {
      material: "Full-grain Leather",
      capacity: "18 Liters",
      dimensions: "42cm x 30cm x 12cm",
      weight: "1.2 Kg",
      compartments:
        "3 Main Compartments + Laptop Sleeve + 2 Zip Pockets + Pen Holders"
    },
    careInstructions:
      "Use leather conditioner every 6 months. Wipe with dry cloth. Keep away from long sunlight exposure.",
    warranty: "1 Year Manufacturing Warranty",
    deliveryInfo: "Delivered in 3–5 business days across India.",
    ratings: 4.5,
    tags: ["Leather", "Office", "Bag", "Premium"]
  },

  {
    id: 2,
    name: "Sports Running Shoes",
    price: 1899,
    images: [
      "https://a.nooncdn.com/mpcms/EN0002/assets/7564ea73-3329-4288-826b-ff5ba19a9cd1.gif",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/188541e5-de83-4f72-8b26-105d0f7d1868/NIKE+GATO+LV8.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f2b411aa-747a-4c6f-bb22-e05504fe5b62/NIKE+GATO+LV8.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a81acc69-4e8a-4cd8-a6dd-266e13fdd29c/NIKE+GATO+LV8.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/537778de-b77d-4719-9988-52e2c0f57dc0/NIKE+GATO+LV8.png"
    ],
    video: "",
    description:
      "Lightweight and breathable running shoes designed for comfort and high-performance sports activity.",
    highlights: [
      "Breathable mesh upper",
      "Ultra-lightweight design",
      "Anti-slip rubber sole",
      "Shock-absorption cushions"
    ],
    specifications: {
      material: "Mesh + EVA Foam",
      weight: "350g",
      sizesAvailable: "6–11",
      soleMaterial: "Rubber"
    },
    careInstructions: "Hand wash only. Air dry. Do not bleach.",
    warranty: "6 Months Warranty",
    deliveryInfo: "Delivered in 4–6 business days.",
    ratings: 4.3,
    tags: ["Shoes", "Running", "Sports"]
  },

  {
    id: 3,
    name: "Wireless Bluetooth Headphones",
    price: 2999,
    images: [
      "https://a.nooncdn.com/mpcms/EN0001/assets/748191bf-0a92-4523-ac43-2a210b91545f.gif",
      "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_14_M?$productIntroPlatemobile$&fmt=png-alpha",
      "https://sony.scene7.com/is/image/sonyglobalsolutions/WH1000XM6_Product_intro_15_M?$productIntroPlatemobile$&fmt=png-alpha",
    ],
    video: "",
    description:
      "High-fidelity wireless headphones with deep bass, noise reduction, and long-lasting 32-hour battery life.",
    highlights: [
      "Active noise cancellation",
      "32-hour battery backup",
      "Fast charging support",
      "Deep bass boost",
      "Soft memory-foam cushions"
    ],
    specifications: {
      driverSize: "40mm",
      battery: "32 Hours Playback",
      connectivity: "Bluetooth 5.3",
      chargingTime: "1.5 Hours"
    },
    careInstructions: "Clean with dry cloth. Avoid moisture. Store in case.",
    warranty: "1 Year Brand Warranty",
    deliveryInfo: "Delivered in 2–4 business days.",
    ratings: 4.6,
    tags: ["Headphones", "Electronics", "Bluetooth"]
  },

  {
    id: 4,
    name: "Stainless Steel Water Bottle (1L)",
    price: 799,
    images: [
      "https://f.nooncdn.com/p/pnsku/N47964873A/45/_/1747911280/4f192f70-3101-43cc-ab86-22063f9afc6f.jpg?width=800",
      "https://f.nooncdn.com/p/v1622725789/N47964873A_2.jpg?width=800",
      "https://f.nooncdn.com/p/v1622725790/N47964873A_4.jpg?width=800"
    ],
    video: "",
    description:
      "Durable stainless-steel water bottle with double-wall insulation to keep beverages hot or cold for hours.",
    highlights: [
      "Double-wall insulation",
      "Rust-free stainless steel",
      "Leak-proof design",
      "BPA-free material"
    ],
    specifications: {
      capacity: "1000 ml",
      material: "304 Stainless Steel",
      insulation: "Hot (12 hrs) / Cold (18 hrs)",
      weight: "420g"
    },
    careInstructions:
      "Hand wash only. Do not microwave. Store with lid open.",
    warranty: "No Warranty",
    deliveryInfo: "Delivered in 3–5 business days.",
    ratings: 4.2,
    tags: ["Bottle", "Kitchen", "Steel"]
  },

  {
    id: 5,
    name: "Wooden Table Lamp",
    price: 1599,
    images: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1585412727339-54e4c64a79b4?w=800"
    ],
    video: "",
    description:
      "A beautifully crafted wooden table lamp that adds a warm and modern touch to your living space.",
    highlights: [
      "Solid oak wood base",
      "Warm LED bulb included",
      "Hand-finished craftsmanship",
      "Energy-efficient design"
    ],
    specifications: {
      material: "Solid Oak Wood",
      bulbType: "Warm LED (included)",
      cableLength: "1.5 meters",
      height: "32 cm"
    },
    careInstructions: "Wipe with a soft cloth. Keep away from moisture.",
    warranty: "6 Months Warranty",
    deliveryInfo: "Delivered within 5–7 business days.",
    ratings: 4.4,
    tags: ["Lamp", "Home Decor", "Wood"]
  }
];


function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

export const fetchProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockProducts;
};

export const fetchProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockProducts.find(p => p.id === id);
};
