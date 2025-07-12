import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Star, Heart, Search, Menu, X, ArrowRight, Zap, Shield, Truck, Headphones, ChevronLeft, ChevronRight, Filter, Grid, List, Eye, GitCompare as Compare, Trash2, Plus, Minus, Bell, User, MapPin, Clock, Award, TrendingUp, Package, CreditCard, RefreshCw, Sparkles, Gift, Tag, MessageCircle } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
  discount?: number;
  description: string;
  features: string[];
  inStock: number;
  brand: string;
  colors: string[];
}

interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
}

interface Notification {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning';
}

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const heroSlides = [
    {
      title: "Black Friday Mega Sale",
      subtitle: "Up to 70% off on premium electronics and fashion",
      image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Shop Sale",
      badge: "Limited Time"
    },
    {
      title: "New Arrivals Collection",
      subtitle: "Discover the latest trends in tech and lifestyle",
      image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Explore New",
      badge: "Just Launched"
    },
    {
      title: "Premium Home Essentials",
      subtitle: "Transform your space with luxury home products",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Shop Home",
      badge: "Best Sellers"
    },
    {
      title: "Fitness & Wellness",
      subtitle: "Achieve your health goals with premium equipment",
      image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      cta: "Get Fit",
      badge: "Trending"
    }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "AirPods Pro Max Wireless",
      price: 549.99,
      originalPrice: 699.99,
      rating: 4.9,
      reviews: 3847,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Electronics",
      isNew: true,
      discount: 21,
      description: "Premium wireless headphones with active noise cancellation and spatial audio technology.",
      features: ["Active Noise Cancellation", "Spatial Audio", "20-hour battery", "Premium materials"],
      inStock: 15,
      brand: "Apple",
      colors: ["Space Gray", "Silver", "Sky Blue", "Pink", "Green"]
    },
    {
      id: 2,
      name: "Premium Leather Messenger Bag",
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.7,
      reviews: 2156,
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Fashion",
      isTrending: true,
      discount: 24,
      description: "Handcrafted genuine leather messenger bag with multiple compartments and laptop sleeve.",
      features: ["Genuine Leather", "Laptop Compartment", "Multiple Pockets", "Adjustable Strap"],
      inStock: 8,
      brand: "Bellroy",
      colors: ["Brown", "Black", "Tan", "Navy"]
    },
    {
      id: 3,
      name: "Smart Fitness Watch Pro",
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 4521,
      image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Electronics",
      isNew: true,
      isTrending: true,
      discount: 25,
      description: "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life.",
      features: ["Heart Rate Monitor", "GPS Tracking", "7-day Battery", "Water Resistant"],
      inStock: 22,
      brand: "Garmin",
      colors: ["Black", "White", "Rose Gold", "Blue"]
    },
    {
      id: 4,
      name: "Modern Desk Lamp with Wireless Charging",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.6,
      reviews: 1342,
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Home",
      discount: 31,
      description: "Sleek LED desk lamp with built-in wireless charging pad and adjustable brightness.",
      features: ["Wireless Charging", "LED Technology", "Adjustable Brightness", "Touch Controls"],
      inStock: 12,
      brand: "Philips",
      colors: ["White", "Black", "Silver"]
    },
    {
      id: 5,
      name: "Organic Cotton Premium T-Shirt",
      price: 34.99,
      originalPrice: 49.99,
      rating: 4.5,
      reviews: 2847,
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Fashion",
      isTrending: true,
      discount: 30,
      description: "Sustainably made organic cotton t-shirt with perfect fit and premium comfort.",
      features: ["Organic Cotton", "Sustainable", "Perfect Fit", "Breathable"],
      inStock: 45,
      brand: "Patagonia",
      colors: ["White", "Black", "Navy", "Gray", "Olive"]
    },
    {
      id: 6,
      name: "Insulated Steel Water Bottle",
      price: 29.99,
      originalPrice: 39.99,
      rating: 4.7,
      reviews: 3156,
      image: "https://images.pexels.com/photos/3766226/pexels-photo-3766226.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Sports",
      discount: 25,
      description: "Double-wall insulated stainless steel bottle that keeps drinks cold for 24 hours.",
      features: ["24hr Cold", "12hr Hot", "Leak Proof", "BPA Free"],
      inStock: 67,
      brand: "Hydro Flask",
      colors: ["Blue", "Pink", "Black", "White", "Green"]
    },
    {
      id: 7,
      name: "Gaming Mechanical Keyboard",
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.8,
      reviews: 1876,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Electronics",
      isNew: true,
      discount: 20,
      description: "RGB backlit mechanical keyboard with customizable keys and tactile switches.",
      features: ["RGB Backlight", "Mechanical Switches", "Programmable", "Gaming Optimized"],
      inStock: 18,
      brand: "Corsair",
      colors: ["Black", "White"]
    },
    {
      id: 8,
      name: "Yoga Mat Premium Non-Slip",
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.6,
      reviews: 2234,
      image: "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=600",
      category: "Sports",
      discount: 29,
      description: "Extra thick yoga mat with superior grip and eco-friendly materials.",
      features: ["Non-Slip Surface", "Extra Thick", "Eco-Friendly", "Easy to Clean"],
      inStock: 34,
      brand: "Manduka",
      colors: ["Purple", "Blue", "Pink", "Black", "Green"]
    }
  ];

  const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];
  const brands = [...new Set(products.map(p => p.brand))];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Delivery",
      description: "Same-day delivery in metro cities, 2-day nationwide"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "256-bit SSL encryption with multiple payment options"
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns with free pickup"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "Premium products with manufacturer warranty"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const addToCart = (product: Product, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === selectedColor);
      if (existing) {
        const updated = prev.map(item =>
          item.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        addNotification(`Updated ${product.name} quantity in cart`);
        return updated;
      }
      addNotification(`Added ${product.name} to cart`);
      return [...prev, { ...product, quantity: 1, selectedColor }];
    });
  };

  const removeFromCart = (productId: number, selectedColor?: string) => {
    setCart(prev => prev.filter(item => !(item.id === productId && item.selectedColor === selectedColor)));
    addNotification('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: number, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId && item.selectedColor === selectedColor
        ? { ...item, quantity }
        : item
    ));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(productId);
      const product = products.find(p => p.id === productId);
      addNotification(
        isAdding ? `Added ${product?.name} to wishlist` : `Removed ${product?.name} from wishlist`,
        isAdding ? 'success' : 'info'
      );
      return isAdding
        ? [...prev, productId]
        : prev.filter(id => id !== productId);
    });
  };

  const toggleCompare = (productId: number) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        addNotification('Removed from comparison', 'info');
        return prev.filter(id => id !== productId);
      }
      if (prev.length >= 3) {
        addNotification('Maximum 3 products can be compared', 'warning');
        return prev;
      }
      const product = products.find(p => p.id === productId);
      addNotification(`Added ${product?.name} to comparison`);
      return [...prev, productId];
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesRating = product.rating >= minRating;
    
    return matchesCategory && matchesSearch && matchesPrice && matchesBrand && matchesRating;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      case 'popular': return b.reviews - a.reviews;
      default: return 0;
    }
  });

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const favoriteProducts = products.filter(p => favorites.includes(p.id));
  const compareProducts = products.filter(p => compareList.includes(p.id));

  const ProductCard = ({ product }: { product: Product }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${viewMode === 'list' ? 'flex' : ''}`}>
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
        <img
          src={product.image}
          alt={product.name}
          className={`object-cover group-hover:scale-110 transition-transform duration-500 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'}`}
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Trending</span>
            </span>
          )}
          {product.discount && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => toggleFavorite(product.id)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110"
          >
            <Heart 
              className={`w-5 h-5 ${
                favorites.includes(product.id) 
                  ? 'fill-red-500 text-red-500' 
                  : 'text-gray-600'
              }`} 
            />
          </button>
          <button
            onClick={() => toggleCompare(product.id)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110"
          >
            <Compare 
              className={`w-5 h-5 ${
                compareList.includes(product.id) 
                  ? 'text-blue-500' 
                  : 'text-gray-600'
              }`} 
            />
          </button>
          <button
            onClick={() => setShowQuickView(product)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white shadow-lg flex items-center justify-center text-xs text-gray-600">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-600 font-semibold">{product.brand}</span>
          <span className="text-sm text-gray-500 flex items-center space-x-1">
            <Package className="w-4 h-4" />
            <span>{product.inStock} left</span>
          </span>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          {product.discount && (
            <span className="text-green-600 font-semibold">
              Save ${(product.originalPrice! - product.price).toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          <button className="px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300">
            <Gift className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 ${
              notification.type === 'success' ? 'bg-green-500/90 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500/90 text-white' :
              'bg-blue-500/90 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    eShop Dynamic
                  </span>
                  <div className="text-xs text-gray-500">Premium Store</div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Home</a>
              <a href="#shop" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Shop</a>
              <a href="#categories" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Categories</a>
              <a href="#deals" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Deals</a>
              <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">Contact</a>
            </div>

            {/* Search & Actions */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsCompareOpen(true)}
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <Compare className="w-6 h-6" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {compareList.length}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-purple-600 transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </span>
                )}
              </button>

              <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                <User className="w-6 h-6" />
              </button>

              <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-2">
                <a href="#home" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</a>
                <a href="#shop" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Shop</a>
                <a href="#categories" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Categories</a>
                <a href="#deals" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Deals</a>
                <a href="#contact" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                {heroSlides[currentSlide].badge}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              {heroSlides[currentSlide].subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl">
                <span>{heroSlides[currentSlide].cta}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-white rounded-full' 
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose eShop Dynamic?</h2>
            <p className="text-xl text-gray-600">Experience the future of online shopping</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Filters & Controls */}
      <section id="categories" className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>

              <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {isFilterOpen && (
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="font-semibold mb-3">Brands</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedBrands([...selectedBrands, brand]);
                            } else {
                              setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h4 className="font-semibold mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                        />
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm">& up</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setPriceRange([0, 500]);
                      setSelectedBrands([]);
                      setMinRating(0);
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Products Section */}
      <section id="shop" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Trending Products'}
            </h2>
            <p className="text-xl text-gray-600">
              {sortedProducts.length} products found
            </p>
          </div>

          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange([0, 500]);
                  setSelectedBrands([]);
                  setMinRating(0);
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Stay in the Loop</h2>
            <p className="text-xl text-purple-100 mb-8">
              Get exclusive deals, new arrivals, and insider updates delivered to your inbox
            </p>
          </div>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe Now
            </button>
          </div>
          <p className="text-purple-200 text-sm mt-4">
            Join 50,000+ subscribers. No spam, unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="text-white w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-bold">eShop Dynamic</span>
                  <div className="text-sm text-gray-400">Premium Store</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your premier destination for cutting-edge products, exceptional service, and unbeatable prices. 
                Experience the future of online shopping with our curated collection of premium items.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <User className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Heart className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><ArrowRight className="w-4 h-4" /><span>About Us</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><ArrowRight className="w-4 h-4" /><span>Contact</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><ArrowRight className="w-4 h-4" /><span>FAQ</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><ArrowRight className="w-4 h-4" /><span>Shipping Info</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><ArrowRight className="w-4 h-4" /><span>Returns</span></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Categories</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><Tag className="w-4 h-4" /><span>Electronics</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><Tag className="w-4 h-4" /><span>Fashion</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><Tag className="w-4 h-4" /><span>Home & Garden</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><Tag className="w-4 h-4" /><span>Sports</span></a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center space-x-2"><Tag className="w-4 h-4" /><span>Beauty</span></a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>123 Commerce Street<br />Tech City, TC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Headphones className="w-5 h-5 text-purple-400" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2025 eShop Dynamic. All rights reserved. | Privacy Policy | Terms of Service
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <Shield className="w-8 h-8 text-gray-400" />
                <Award className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Shopping Cart ({cartItemsCount})</h2>
                <button onClick={() => setIsCartOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedColor}`} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.selectedColor && (
                            <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                          )}
                          <p className="text-purple-600 font-semibold">${item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1, item.selectedColor)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1, item.selectedColor)}
                              className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedColor)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-purple-600">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Sidebar */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsWishlistOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Wishlist ({favorites.length})</h2>
                <button onClick={() => setIsWishlistOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {favoriteProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your wishlist is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {favoriteProducts.map((product) => (
                      <div key={product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{product.name}</h3>
                          <p className="text-purple-600 font-semibold">${product.price}</p>
                          <button
                            onClick={() => addToCart(product)}
                            className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full mt-2 hover:bg-purple-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compare Sidebar */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsCompareOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold">Compare Products ({compareList.length}/3)</h2>
                <button onClick={() => setIsCompareOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {compareProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <Compare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No products to compare</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {compareProducts.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
                          <div className="flex-1">
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-purple-600 font-semibold text-lg">${product.price}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                            </div>
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Brand: {product.brand}</p>
                              <p className="text-sm text-gray-600">Stock: {product.inStock}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCompare(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowQuickView(null)} />
          <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowQuickView(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div>
                <img
                  src={showQuickView.image}
                  alt={showQuickView.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              
              <div>
                <div className="mb-4">
                  <span className="text-sm text-purple-600 font-semibold">{showQuickView.brand}</span>
                  <h2 className="text-3xl font-bold text-gray-900 mt-1">{showQuickView.name}</h2>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(showQuickView.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">
                    {showQuickView.rating} ({showQuickView.reviews.toLocaleString()} reviews)
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6">{showQuickView.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {showQuickView.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${showQuickView.price}
                    </span>
                    {showQuickView.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        ${showQuickView.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{showQuickView.inStock} in stock</span>
                  </span>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      addToCart(showQuickView);
                      setShowQuickView(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => toggleFavorite(showQuickView.id)}
                    className="px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(showQuickView.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 z-40"
      >
        <ArrowRight className="w-6 h-6 transform -rotate-90" />
      </button>
    </div>
  );
};

export default App;