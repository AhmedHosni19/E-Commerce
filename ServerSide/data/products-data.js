let products = [
  // Category 1: Audio & Headphones
  { id: 1, title: "Wireless Headphones", subTitle: "Noise Cancelling", description: "Premium noise cancelling headphones with 30-hour battery life.", price: 99, image: "Images/headphone.jpeg", category: "Audio" },
  { id: 2, title: "Bluetooth Speaker", subTitle: "Portable Bass", description: "Compact speaker with powerful bass and long battery life.", price: 79, image: "Images/speaker.jpeg", category: "Audio" },
  { id: 3, title: "Noise Cancelling Mic", subTitle: "Studio Quality", description: "Professional-grade microphone for studio-quality recordings.", price: 99, image: "Images/mic.jpg", category: "Audio" },
  { id: 4, title: "Gaming Headset", subTitle: "Surround Sound", description: "Immersive gaming headset with surround sound technology.", price: 129, image: "Images/headset.jpg", category: "Audio" },
  { id: 5, title: "Mechanical Keyboard", subTitle: "Blue Switches", description: "High-performance mechanical keyboard with blue switches.", price: 89, image: "Images/keyboard.jpeg", category: "Audio" },
  { id: 6, title: "WireLess Mouse", subTitle: "Red Switches", description:"Ergonomic wireless mouse with red switches for precise control.", price: 89, image:"Images/WireLessMouse.jpeg", category:"Audio" },
  { id: 7, title: "Mouse Pad XL", subTitle: "RGB Lighting", description: "Large mouse pad with customizable RGB lighting.", price: 29, image: "Images/mousepad.jpeg", category: "Audio" },
  { id: 8, title: "Gaming Mouse", subTitle: "RGB Optical", description: "High-precision gaming mouse with RGB optical sensor.", price: 49, image: "Images/mouse.jpeg", category: "Audio" },
  { id: 9, title: "Portable Projector", subTitle: "HD Mini", description: "Compact HD projector for home entertainment.", price: 249, image: "Images/projector.jpeg", category: "Audio" },
  { id: 10, title: "VR Headset", subTitle: "Immersive Experience", description:"Advanced VR headset for immersive virtual reality experiences.", price: 299, image: "Images/vr.jpeg", category: "Audio" },

  // Category 2: Computers & Accessories
  { id: 11, title: "Laptop", subTitle: "Core-i5 Processor", price: 899, image: "Images/laptop.jpeg", category: "Computers" },
  { id: 12, title: "Monitor", subTitle: "27-inch Full HD", description: "High-quality monitor with 27-inch full HD display.", price: 179, image: "Images/monitor1.jpeg", category:"Computers" },
  { id: 13, title:"Monitor Stand", subTitle:"Adjustable Height", description:"Adjustable monitor stand for ergonomic setup.", price :49 , image:"Images/stand2.jpeg" , category:"Computers"},
  { id :14 , title : 'USB-C Hub', subTitle : '6 in 1 Adapter', description:'6-in-1 USB-C hub with multiple ports.', price :39 , image:'Images/hub1.jpeg' , category:'Computers'},
  { id: 15, title: "External SSD", subTitle: "1TB Fast Storage", description: "Fast external SSD with 1TB storage capacity.", price: 129, image: "Images/ssd.jpg", category: "Computers" },
  { id: 16, title: "Webcam", subTitle: "1080p HD", description: "HD webcam for video conferencing and streaming.", price: 59, image: "Images/webcam.jpg", category: "Computers" },
  { id: 17, title: "Graphic Tablet", subTitle: "Pen Included", description:"Graphic tablet with pressure-sensitive pen for digital art.", price: 129, image: "Images/tablet2.jpeg", category: "Computers" },
  { id: 18, title: "Smartphone", subTitle: "64GB Storage", description:"Latest smartphone with advanced features and large storage capacity.", price: 699, image: "Images/phone1.jpeg", category: "Computers" },
  { id: 19, title: "Tablet", subTitle: "10-inch Display", description:"Tablet with a large touchscreen display and powerful performance.", price: 399, image: "Images/tablet1.jpeg", category: "Computers" },
  { id: 20, title: "Gamepad", subTitle: "Wireless Controller", description:"Wireless gamepad for enhanced gaming experience.", price: 59, image: "Images/gamepad1.jpeg", category:"Computers"},

  // Category 3: Smart Home & Gadgets
  { id :21 , title : 'Smart Watch', subTitle : 'Heart Rate Monitor', description:'Smartwatch with heart rate monitoring and fitness tracking.', price :149 , image:'Images/watch.jpeg' , category:'Smart Home'},
  { id: 22, title: "Smart Light Bulb", subTitle: "Color Changing", description:"Smart light bulb with adjustable color temperature.", price: 19, image: "Images/bulb1.jpeg", category: "Smart Home" },
  { id: 23, title: "Smart Plug", subTitle: "WiFi Outlet", description:"WiFi-enabled smart plug for remote control of electrical devices.", price: 19, image: "Images/plug1.jpeg", category: "Smart Home" },
  { id: 24, title: "Smart Thermostat", subTitle: "WiFi Enabled", description:"Smart thermostat with WiFi connectivity and programmable settings.", price: 129, image: "Images/thermostat1.jpeg", category: "Smart Home" },
  { id: 25, title: "Smart Lock", subTitle: "Keyless Entry", description:"Smart lock with keyless entry and mobile app control.", price: 149, image: "Images/lock1.jpeg", category: "Smart Home" },
  { id: 26, title: "Security Camera", subTitle: "1080p WiFi", description:"Security camera with HD WiFi streaming and night vision.", price: 79, image: "Images/security1.jpeg", category: "Smart Home" },
  { id: 27, title: "Robot Vacuum", subTitle: "Auto Cleaning", description:"Robot vacuum with automatic cleaning and scheduling features.", price: 229, image: "Images/vacuum1.jpeg", category: "Smart Home" },
  { id: 28, title: "Wireless Charger", subTitle: "Fast Charging", description:"Fast wireless charger compatible with multiple devices.", price: 25, image: "Images/charger1.jpeg", category:"Smart Home"},
  { id :29 , title : 'Electric Scooter', subTitle : '20mph Max', description:'Electric scooter with maximum speed of 20mph.', price :399 , image:'Images/scooter1.jpeg' , category:'Smart Home'},
  { id :30 , title : 'Fitness Tracker', subTitle : 'Step Counter', description:'Fitness tracker that counts steps and monitors activity.', price :49 , image:'Images/tracker1.jpeg' , category:'Smart Home'},

  // Category 4: Gaming Gear
  { id: 31, title: "Gaming Console", subTitle: "Next Gen", description:"Latest gaming console with enhanced graphics and performance.", price: 499, image: "Images/console1.jpeg", category: "Gaming" },
  
  { id: 32, title: "VR Controller", subTitle: "Motion Tracking", description:"VR controller with precise motion tracking capabilities.", price: 99, image: "Images/vrcontroller1.jpeg", category: "Gaming" },
  { id: 33, title: "Racing Wheel", subTitle: "Sim Racing", description:"High-end racing wheel for immersive sim racing experience.", price: 199, image: "Images/wheel1.jpg", category: "Gaming" },
  { id: 34, title: "Gaming Chair", subTitle: "Ergonomic", description:"Ergonomic gaming chair with lumbar support and adjustable features.", price: 199, image: "Images/chair1.jpeg", category: "Gaming" },
  { id: 35, title: "Gaming Desk", subTitle: "LED Lighting", description:"Modern gaming desk with built-in LED lighting and storage.", price: 299, image: "Images/desk1.jpg", category: "Gaming" },
  { id: 36, title: "Laptop Stand", subTitle: "Aluminum Adjustable", description:"Adjustable aluminum laptop stand for improved ergonomics.", price: 35, image: "Images/stand.jpeg", category: "Gaming" },
  { id: 37, title: "Mouse Pad XL", subTitle: "RGB Lighting", description:"XL mouse pad with RGB lighting for enhanced gaming experience.", price: 29, image: "Images/mousepad.jpeg", category: "Gaming" },
  { id: 38, title: "Action Camera", subTitle: "Waterproof", description:"Waterproof action camera with high-quality video recording.", price: 199, image: "Images/camera1.jpeg", category: "Gaming" },
  { id: 39, title: "Drone", subTitle: "4K Camera", description:"Drone with 4K camera and advanced flight capabilities.", price: 499, image: "Images/Drone.png", category: "Gaming" },
  { id: 40, title: "Smart Scale", subTitle: "Body Metrics", description:"Smart scale that tracks body metrics and health data.", price: 39, image: "Images/scale1.jpeg", category: "Gaming" },

  // Category 5: Home & Lifestyle
  { id: 41, title: "Desk Lamp", subTitle: "LED Adjustable", description:"Adjustable LED desk lamp for improved workspace lighting.", price: 35, image: "Images/lamps1.jpg", category: "Home" },
  { id: 42, title: "Air Purifier", subTitle: "HEPA Filter", description:"Air purifier with HEPA filter for clean indoor air.", price: 129, image: "Images/purifier1.jpeg", category: "Home" },
  { id: 43, title: "Coffee Maker", subTitle: "Automatic", description:"Automatic coffee maker with programmable settings.", price: 79, image: "Images/coffee1.jpeg", category:"Home"},
  { id: 45, title: "Electric Kettle", subTitle: "Fast Boil", description:"Fast electric kettle with quick heating and safety features.", price: 29, image: "Images/kettle1.jpeg", category: "Home" },
  { id: 46, title: "Hair Dryer", subTitle: "Ionic Technology", description:"Hair dryer with ionic technology for reduced damage.", price: 49, image: "Images/hairdryer1.jpeg", category: "Home" },
  { id: 47, title: "Electric Toothbrush", subTitle: "Rechargeable", description:"Rechargeable electric toothbrush with multiple cleaning modes.", price: 59, image: "Images/toothbrush1.jpg", category: "Home" },
  { id: 48, title: "Water Bottle Smart", subTitle: "Tracks Hydration", description:"Smart water bottle that tracks hydration levels and reminds you to drink.", price: 25, image: "Images/bottle1.jpeg", category: "Home" },
  { id: 49, title: "Mat", subTitle: "Non-Slip", description:"Non-slip mat for improved grip and safety in the home.", price: 35, image: "Images/mat1.jpeg", category: "Home" },
  { id: 50, title: "E-Reader", subTitle: "6-inch Display", description:"E-reader with a comfortable 6-inch display for reading.", price: 89, image: "Images/ereader1.jpeg", category: "Home" }
];