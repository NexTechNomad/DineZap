# Restaurant Digital Ordering System

## 🎨 Color Scheme
- **Primary Purple**: `#7C3AED` (Violet-600)
- **Secondary Colors**: 
  - Gold/Amber: `#F59E0B` (Amber-500) - for CTAs and highlights
  - Dark Purple: `#5B21B6` (Violet-800) - for headers
  - Light Purple: `#EDE9FE` (Violet-100) - for backgrounds
  - Slate Gray: `#64748B` (Slate-500) - for text
  - White: `#FFFFFF` - for cards and content

## 📱 System Overview

### Core Components
1. **Customer Mobile App** (React PWA)
2. **Kitchen Display** (React Web App)
3. **Restaurant Dashboard** (React Admin Panel)
4. **Backend API** (Express.js + Socket.io)
5. **Database** (MongoDB with Mongoose)

---

## 🗂️ Database Schema (Mongoose Models)

### Restaurant Model
```javascript
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true }, // pizza-palace
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  settings: {
    tablesCount: { type: Number, default: 20 },
    acceptOrders: { type: Boolean, default: true },
    estimatedWaitTime: { type: Number, default: 15 } // minutes
  },
  subscription: {
    plan: { type: String, enum: ['basic', 'premium'], default: 'basic' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    nextBilling: Date
  }
}, { timestamps: true });
```

### Menu Model
```javascript
const menuSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  categories: [{
    name: String, // "Appetizers", "Main Course"
    items: [{
      name: { type: String, required: true },
      description: String,
      price: { type: Number, required: true },
      image: String, // URL to image
      available: { type: Boolean, default: true },
      prepTime: { type: Number, default: 15 }, // minutes
      tags: [String] // ["vegetarian", "spicy", "gluten-free"]
    }]
  }]
}, { timestamps: true });
```

### Order Model
```javascript
const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true }, // PZP-240608-001
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  tableNumber: { type: Number, required: true },
  items: [{
    name: String,
    price: Number,
    quantity: Number,
    modifications: String, // "No onions, extra cheese"
    totalPrice: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'cooking', 'ready', 'served', 'cancelled'],
    default: 'pending'
  },
  customerPhone: String, // Optional for notifications
  specialInstructions: String,
  timestamps: {
    ordered: { type: Date, default: Date.now },
    startedCooking: Date,
    ready: Date,
    served: Date
  }
}, { timestamps: true });
```

### Table Model
```javascript
const tableSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  tableNumber: { type: Number, required: true },
  qrCode: { type: String, required: true }, // Generated QR code data
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'reserved'],
    default: 'available'
  },
  currentOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
});
```

---

## 🛣️ Backend API Routes (Express.js)

### Authentication Routes
```javascript
// auth.js routes
POST   /api/auth/restaurant/register  // Restaurant signup
POST   /api/auth/restaurant/login     // Restaurant login
POST   /api/auth/restaurant/logout    // Restaurant logout
GET    /api/auth/restaurant/me        // Get current restaurant info
```

### Restaurant Management Routes
```javascript
// restaurant.js routes
GET    /api/restaurants/:slug         // Get restaurant by slug
PUT    /api/restaurants/:id           // Update restaurant settings
GET    /api/restaurants/:id/analytics // Get restaurant analytics
POST   /api/restaurants/:id/tables    // Create/update tables
```

### Menu Management Routes
```javascript
// menu.js routes
GET    /api/restaurants/:slug/menu    // Get public menu (for customers)
GET    /api/restaurants/:id/menu/admin// Get menu for editing (admin)
PUT    /api/restaurants/:id/menu      // Update entire menu
POST   /api/restaurants/:id/menu/items// Add menu item
PUT    /api/restaurants/:id/menu/items/:itemId // Update menu item
DELETE /api/restaurants/:id/menu/items/:itemId // Delete menu item
```

### Order Management Routes
```javascript
// orders.js routes
POST   /api/orders                    // Customer places order
GET    /api/orders/:orderId           // Get specific order (customer tracking)
GET    /api/restaurants/:id/orders    // Get all orders for restaurant
PUT    /api/orders/:orderId/status    // Update order status (kitchen)
GET    /api/restaurants/:id/orders/today // Today's orders
GET    /api/restaurants/:id/orders/analytics // Order analytics
```

### Customer Routes
```javascript
// customer.js routes
GET    /api/menu/:restaurantSlug/table/:tableNumber // Customer scans QR
POST   /api/orders/track              // Customer order tracking
GET    /api/restaurants/:slug/info    // Restaurant info for customers
```

---

## 🔄 Complete User Flow

### 1. Restaurant Onboarding Flow

**Step 1: Registration**
```
/restaurant/signup
- Business name, email, password
- Restaurant address, phone
- Number of tables
```

**Step 2: Menu Setup**
```
/dashboard/menu/setup
- Add categories (Starters, Mains, Desserts)
- Add items with photos, prices, descriptions
- Set availability and prep times
```

**Step 3: Table Setup**
```
/dashboard/tables
- Confirm number of tables
- Generate QR codes for each table
- Download/print QR code stickers
```

**Step 4: Kitchen Setup**
```
/dashboard/kitchen
- Setup kitchen tablet URL: /kitchen/:restaurantSlug
- Test order flow
- Train staff on system
```

### 2. Customer Ordering Flow

**Step 1: QR Scan**
```
Customer scans QR → Redirects to:
/menu/:restaurantSlug/table/:tableNumber

Example: /menu/pizza-palace/table/12
```

**Step 2: Menu Browsing**
```javascript
// Load restaurant menu and table info
const MenuPage = () => {
  const { restaurantSlug, tableNumber } = useParams();
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    fetchMenu(restaurantSlug);
  }, []);
  
  return (
    <div className="bg-violet-50 min-h-screen">
      <Header restaurant={restaurant} table={tableNumber} />
      <MenuCategories menu={menu} onAddToCart={addToCart} />
      <Cart items={cart} onCheckout={handleCheckout} />
    </div>
  );
};
```

**Step 3: Order Placement**
```javascript
const placeOrder = async (orderData) => {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantSlug,
        tableNumber,
        items: cart,
        totalAmount: calculateTotal(cart),
        customerPhone: phone, // optional
        specialInstructions: instructions
      })
    });
    
    const order = await response.json();
    
    // Redirect to order tracking
    router.push(`/order/${order.orderId}/track`);
  } catch (error) {
    showError('Failed to place order');
  }
};
```

**Step 4: Order Tracking**
```
/order/:orderId/track
- Real-time status updates via WebSocket
- Estimated completion time
- Option to call restaurant
```

### 3. Kitchen Workflow

**Kitchen Display App: `/kitchen/:restaurantSlug`**

```javascript
const KitchenDisplay = () => {
  const [orders, setOrders] = useState([]);
  const { restaurantSlug } = useParams();
  
  useEffect(() => {
    // Connect to WebSocket for real-time orders
    const socket = io();
    
    socket.emit('join-kitchen', restaurantSlug);
    
    socket.on('new-order', (order) => {
      setOrders(prev => [...prev, order]);
      playOrderSound();
    });
    
    // Load existing pending orders
    fetchPendingOrders();
  }, []);
  
  const updateOrderStatus = async (orderId, status) => {
    await fetch(`/api/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  };
  
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-100">
      {orders.map(order => (
        <OrderCard 
          key={order.orderId}
          order={order}
          onStatusChange={updateOrderStatus}
        />
      ))}
    </div>
  );
};
```

---

## 🔌 WebSocket Integration (Socket.io)

### Server Setup
```javascript
// server.js
const io = require('socket.io')(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Kitchen joins their restaurant room
  socket.on('join-kitchen', (restaurantSlug) => {
    socket.join(`kitchen-${restaurantSlug}`);
  });
  
  // Customer joins order tracking room
  socket.on('join-order-tracking', (orderId) => {
    socket.join(`order-${orderId}`);
  });
  
  // New order placed
  socket.on('new-order', (orderData) => {
    // Save order to database
    // Emit to kitchen
    io.to(`kitchen-${orderData.restaurantSlug}`).emit('new-order', orderData);
  });
  
  // Order status updated
  socket.on('order-status-update', (data) => {
    // Update database
    // Notify customer
    io.to(`order-${data.orderId}`).emit('status-update', data);
  });
});
```

### Client WebSocket Usage
```javascript
// Customer order tracking
useEffect(() => {
  const socket = io();
  
  socket.emit('join-order-tracking', orderId);
  
  socket.on('status-update', (data) => {
    setOrderStatus(data.status);
    if (data.status === 'ready') {
      showNotification('Your order is ready!');
    }
  });
  
  return () => socket.disconnect();
}, [orderId]);
```

---

## 🎯 Frontend Structure

### Project Structure
```
src/
├── components/
│   ├── common/
│   │   ├── Header.jsx
│   │   ├── Button.jsx
│   │   └── LoadingSpinner.jsx
│   ├── customer/
│   │   ├── MenuDisplay.jsx
│   │   ├── CartSidebar.jsx
│   │   └── OrderTracking.jsx
│   ├── kitchen/
│   │   ├── OrderCard.jsx
│   │   └── KitchenDisplay.jsx
│   └── restaurant/
│       ├── Dashboard.jsx
│       ├── MenuEditor.jsx
│       └── Analytics.jsx
├── pages/
│   ├── menu/
│   │   └── [restaurantSlug]/
│   │       └── table/
│   │           └── [tableNumber].jsx
│   ├── kitchen/
│   │   └── [restaurantSlug].jsx
│   ├── dashboard/
│   │   ├── index.jsx
│   │   ├── menu.jsx
│   │   ├── orders.jsx
│   │   └── analytics.jsx
│   └── order/
│       └── [orderId]/
│           └── track.jsx
├── styles/
│   └── globals.css (Tailwind)
├── utils/
│   ├── api.js
│   ├── socket.js
│   └── helpers.js
└── hooks/
    ├── useSocket.js
    ├── useOrder.js
    └── useMenu.js
```

### Key Components

**MenuDisplay Component**
```javascript
const MenuDisplay = ({ menu, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      {menu.categories.map(category => (
        <div key={category.name} className="mb-8">
          <h3 className="text-xl font-bold text-violet-800 mb-4">
            {category.name}
          </h3>
          <div className="grid gap-4">
            {category.items.map(item => (
              <MenuItem 
                key={item._id}
                item={item}
                onAddToCart={() => onAddToCart(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
```

**OrderCard Component (Kitchen)**
```javascript
const OrderCard = ({ order, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 border-amber-300';
      case 'cooking': return 'bg-violet-100 border-violet-300';
      case 'ready': return 'bg-green-100 border-green-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };
  
  return (
    <div className={`p-4 rounded-lg border-2 ${getStatusColor(order.status)}`}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg">Table {order.tableNumber}</h3>
        <span className="text-sm text-gray-600">
          {formatTime(order.timestamps.ordered)}
        </span>
      </div>
      
      <div className="mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.quantity}x {item.name}</span>
            <span>${item.totalPrice}</span>
          </div>
        ))}
      </div>
      
      {order.specialInstructions && (
        <div className="mb-4 p-2 bg-yellow-50 rounded">
          <strong>Special:</strong> {order.specialInstructions}
        </div>
      )}
      
      <div className="flex gap-2">
        {order.status === 'pending' && (
          <button 
            onClick={() => onStatusChange(order.orderId, 'cooking')}
            className="flex-1 bg-violet-600 text-white px-4 py-2 rounded font-medium"
          >
            Start Cooking
          </button>
        )}
        {order.status === 'cooking' && (
          <button 
            onClick={() => onStatusChange(order.orderId, 'ready')}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded font-medium"
          >
            Mark Ready
          </button>
        )}
      </div>
    </div>
  );
};
```

---

## 🚀 Deployment & Setup

### Environment Variables
```
# .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant-orders
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://yourfrontend.com
SOCKET_PORT=5001
```

### Package.json Dependencies
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^6.5.0",
    "socket.io": "^4.5.0",
    "cors": "^2.8.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.5",
    "qrcode": "^1.5.3"
  }
}
```

### Deployment Steps
1. **Database Setup**: MongoDB Atlas or local MongoDB
2. **Backend Deployment**: Railway, Render, or Heroku
3. **Frontend Deployment**: Vercel or Netlify
4. **Domain Setup**: Custom domain with SSL
5. **QR Code Generation**: Generate unique QR codes for each table

---

## 💰 Pricing & Business Model

### Subscription Tiers
- **Basic**: $39/month - Up to 20 tables, basic analytics
- **Premium**: $79/month - Unlimited tables, advanced analytics, custom branding
- **Per-Order**: $19/month + $0.25 per order

### Revenue Projections
- 50 restaurants × $50 average = $2,500/month
- 100 restaurants × $50 average = $5,000/month
- 200 restaurants × $50 average = $10,000/month

This system provides a complete digital ordering solution that restaurants can implement immediately with minimal technical barriers.