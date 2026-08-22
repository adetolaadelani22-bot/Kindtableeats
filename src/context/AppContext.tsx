import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  Cook, 
  Meal, 
  CartItem, 
  Order, 
  Review, 
  SellerApplication, 
  NotificationItem, 
  ViewRoute, 
  UserRole,
  DietaryPreference,
  MealCategory,
  OrderStatus,
  SelectedCustomization,
  Currency,
  CurrencyConfig,
  SavedPaymentMethod
} from "../types";
import { 
  INITIAL_COOKS, 
  INITIAL_MEALS, 
  INITIAL_REVIEWS, 
  INITIAL_ORDERS, 
  INITIAL_APPLICATIONS, 
  INITIAL_NOTIFICATIONS,
  GLOBAL_CURRENCIES,
  INITIAL_SAVED_PAYMENT_METHODS
} from "../data/mockData";

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: "success" | "info" | "warning";
}

interface AppContextType {
  // Navigation
  currentRoute: ViewRoute;
  setCurrentRoute: (route: ViewRoute) => void;
  selectedCookId: string | null;
  setSelectedCookId: (id: string | null) => void;
  selectedMealId: string | null;
  setSelectedMealId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  navigateToKitchen: (cookId: string) => void;
  navigateToMeal: (mealId: string) => void;
  navigateToOrder: (orderId: string) => void;

  // Role & Auth
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: "login" | "register";
  setAuthMode: (mode: "login" | "register") => void;
  currentUser: {
    name: string;
    email: string;
    avatar: string;
    role: UserRole;
    favoriteCookIds: string[];
    memberSince: string;
  };

  // Currency & Internationalization
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  currentCurrencyConfig: CurrencyConfig;
  formatPrice: (amountInGbp: number) => string;

  // Saved Payment Methods
  savedPaymentMethods: SavedPaymentMethod[];
  addSavedPaymentMethod: (method: Omit<SavedPaymentMethod, "id">) => void;
  removeSavedPaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (meal: Meal, quantity?: number, instructions?: string, selectedCustomizations?: SelectedCustomization[]) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartCount: number;

  // Data
  cooks: Cook[];
  meals: Meal[];
  reviews: Review[];
  orders: Order[];
  applications: SellerApplication[];
  notifications: NotificationItem[];

  // Data Actions
  placeOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addMeal: (mealData: Omit<Meal, "id" | "rating" | "reviewCount">) => void;
  updateMeal: (mealId: string, mealData: Partial<Meal>) => void;
  toggleMealPause: (mealId: string) => void;
  deleteMeal: (mealId: string) => void;
  addReview: (reviewData: Omit<Review, "id" | "date" | "verifiedPurchase">) => void;
  submitCookApplication: (appData: Omit<SellerApplication, "id" | "status" | "submittedAt">) => void;
  approveApplication: (appId: string) => void;
  approveCookApplication: (appId: string) => void;
  rejectApplication: (appId: string) => void;
  rejectCookApplication: (appId: string) => void;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: MealCategory;
  setSelectedCategory: (cat: MealCategory) => void;
  selectedDietary: DietaryPreference[];
  toggleDietary: (diet: DietaryPreference) => void;
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  sortBy: "popular" | "rating" | "price-asc" | "price-desc";
  setSortBy: (sort: "popular" | "rating" | "price-asc" | "price-desc") => void;

  // Modals & Popups
  activeMealModal: Meal | null;
  setActiveMealModal: (meal: Meal | null) => void;

  // Notifications & Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentRoute, setCurrentRouteState] = useState<ViewRoute>("home");
  const [selectedCookId, setSelectedCookId] = useState<string | null>(null);
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Role State
  const [userRole, setUserRole] = useState<UserRole>("customer");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Currency State
  const [currency, setCurrency] = useState<Currency>("USD");

  // Saved Payment Methods
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<SavedPaymentMethod[]>(INITIAL_SAVED_PAYMENT_METHODS);

  // Cart State with LocalStorage resilience
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("kte_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Domain Data State
  const [cooks, setCooks] = useState<Cook[]>(INITIAL_COOKS);
  const [meals, setMeals] = useState<Meal[]>(INITIAL_MEALS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [applications, setApplications] = useState<SellerApplication[]>(INITIAL_APPLICATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<MealCategory>("All");
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("🌍 Universe (All Worldwide Cities)");
  const [maxPrice, setMaxPrice] = useState<number>(35);
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "price-asc" | "price-desc">("popular");

  // Active Meal Detail Modal
  const [activeMealModal, setActiveMealModal] = useState<Meal | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem("kte_cart", JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  // Current currency configuration
  const currentCurrencyConfig = GLOBAL_CURRENCIES.find(c => c.code === currency) || GLOBAL_CURRENCIES[0];

  // Universal format price helper
  const formatPrice = (amountInBase: number): string => {
    // Base prices in dataset are calibrated around ~1.0 GBP = 1.28 USD
    // We convert from base (GBP 1.0) to USD, then to target currency
    const inUsd = amountInBase * 1.28;
    const targetAmount = inUsd / currentCurrencyConfig.rateToUsd;
    
    if (currency === "NGN" || currency === "JPY" || currency === "KES") {
      return `${currentCurrencyConfig.symbol}${Math.round(targetAmount).toLocaleString()}`;
    }
    return `${currentCurrencyConfig.symbol}${targetAmount.toFixed(2)}`;
  };

  // Saved Payment Methods Helpers
  const addSavedPaymentMethod = (method: Omit<SavedPaymentMethod, "id">) => {
    const newMethod: SavedPaymentMethod = {
      ...method,
      id: "pm-" + Math.random().toString(36).substr(2, 9)
    };
    if (newMethod.isDefault) {
      setSavedPaymentMethods(prev => [...prev.map<SavedPaymentMethod>(m => ({ ...m, isDefault: false })), newMethod]);
    } else {
      setSavedPaymentMethods(prev => [newMethod, ...prev]);
    }
    addToast({
      title: "Payment method saved",
      message: `${newMethod.title} is now ready for 1-click checkout.`,
      type: "success"
    });
  };

  const removeSavedPaymentMethod = (id: string) => {
    setSavedPaymentMethods(prev => prev.filter(m => m.id !== id));
    addToast({
      title: "Payment method removed",
      type: "info"
    });
  };

  const setDefaultPaymentMethod = (id: string) => {
    setSavedPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    addToast({
      title: "Default payment updated",
      type: "success"
    });
  };

  // Current Mock User based on Role
  const currentUser = {
    customer: {
      name: "Hannah Wright",
      email: "hannah.wright@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      role: "customer" as UserRole,
      favoriteCookIds: ["cook-amara", "cook-claudette"],
      memberSince: "March 2024"
    },
    seller: {
      name: "Amara Okafor",
      email: "amara.okafor@kindtableeats.org",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      role: "seller" as UserRole,
      favoriteCookIds: [],
      memberSince: "March 2024"
    },
  }[userRole];

  const setCurrentRoute = (route: ViewRoute) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToKitchen = (cookId: string) => {
    setSelectedCookId(cookId);
    setCurrentRoute("kitchen-detail");
  };

  const navigateToMeal = (mealId: string) => {
    setSelectedMealId(mealId);
    const foundMeal = meals.find((m) => m.id === mealId);
    if (foundMeal) {
      setActiveMealModal(foundMeal);
    }
  };

  const navigateToOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentRoute("order-tracking");
  };

  const addToast = (toast: Omit<ToastMessage, "id">) => {
    const id = "toast-" + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart logic
  const addToCart = (
    meal: Meal, 
    quantity = 1, 
    instructions = "", 
    selectedCustomizations?: SelectedCustomization[]
  ) => {
    // Generate unique identifier based on meal ID + sorted customization choices
    const customKey = selectedCustomizations && selectedCustomizations.length > 0
      ? selectedCustomizations
          .map((c) => `${c.groupId}:${c.optionId}`)
          .sort()
          .join("|")
      : "";

    const itemId = customKey ? `${meal.id}--${customKey}` : `${meal.id}`;
    const extraPrice = selectedCustomizations?.reduce((sum, c) => sum + c.price, 0) || 0;
    const unitPrice = meal.price + extraPrice;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { 
                ...item, 
                quantity: item.quantity + quantity, 
                specialInstructions: instructions || item.specialInstructions 
              }
            : item
        );
      }
      return [
        ...prev, 
        { 
          id: itemId, 
          meal, 
          quantity, 
          unitPrice, 
          selectedCustomizations: selectedCustomizations || [], 
          specialInstructions: instructions 
        }
      ];
    });

    const isCustomized = selectedCustomizations && selectedCustomizations.length > 0;
    addToast({
      title: isCustomized ? "Custom dish added to basket" : "Added to basket",
      message: `${quantity}x ${meal.name.slice(0, 32)}... (£${(unitPrice * quantity).toFixed(2)})`,
      type: "success"
    });
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + (item.unitPrice ?? item.meal.price) * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Dietary filter toggle
  const toggleDietary = (diet: DietaryPreference) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  // Order Placement
  const placeOrder = (orderData: Partial<Order>): Order => {
    const cookId = cart[0]?.meal.cookId || "cook-amara";
    const cook = cooks.find((c) => c.id === cookId) || cooks[0];
    const orderNumber = "KTE-" + Math.floor(1000 + Math.random() * 9000);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

    const newOrder: Order = {
      id: "ord-" + Math.random().toString(36).substring(2, 9),
      orderNumber,
      customerName: orderData.customerName || currentUser.name,
      customerPhone: orderData.customerPhone || "+44 7700 900124",
      customerEmail: orderData.customerEmail || currentUser.email,
      deliveryAddress: orderData.deliveryAddress || "18 Camberwell Grove, SE5 8RE",
      fulfillmentType: orderData.fulfillmentType || "delivery",
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee: orderData.fulfillmentType === "pickup" ? 0 : 2.50,
      serviceFee: 1.50,
      cookTip: orderData.cookTip || 3.00,
      total:
        cartSubtotal +
        (orderData.fulfillmentType === "pickup" ? 0 : 2.50) +
        1.50 +
        (orderData.cookTip || 3.00),
      status: "received",
      cookId: cook.id,
      kitchenName: cook.kitchenName,
      cookName: cook.name,
      cookAvatar: cook.avatar,
      cookPhone: "+44 7700 900881",
      orderTime: `Today at ${timeString}`,
      estimatedDeliveryTime: "in 35-45 minutes",
      timeline: [
        { status: "received", label: "Order Received", description: `Sent directly to ${cook.kitchenName}`, time: timeString, completed: true, current: true },
        { status: "accepted", label: "Cook Confirmed", description: `${cook.name} confirms fresh prep`, time: "Pending", completed: false },
        { status: "cooking", label: "In Kitchen Cooking", description: "Crafted with fresh ingredients", time: "Pending", completed: false },
        { status: "ready", label: "Packaged & Ready", description: "Sealed in eco-friendly container", time: "Pending", completed: false },
        { status: "out_for_delivery", label: "Courier Dispatched", description: "Direct community delivery", time: "Pending", completed: false },
        { status: "delivered", label: "Arrived & Enjoyed", description: "Food served warm with care", time: "Pending", completed: false }
      ],
      paymentStatus: "paid",
      paymentMethod: orderData.paymentMethod || "Card ending •••• 4242",
      notesToCook: orderData.notesToCook || ""
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Add seller notification
    setNotifications((prev) => [
      {
        id: "notif-" + Date.now(),
        type: "order",
        title: `New order ${newOrder.orderNumber}`,
        message: `${newOrder.customerName} ordered ${newOrder.items.length} items (£${newOrder.total.toFixed(2)})`,
        timestamp: "Just now",
        read: false
      },
      ...prev
    ]);

    addToast({
      title: "Order placed successfully!",
      message: `Your order #${newOrder.orderNumber} was sent to ${cook.name}`,
      type: "success"
    });

    return newOrder;
  };

  // Update order status for seller testing.
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

        const statusIndexMap: Record<OrderStatus, number> = {
          received: 0,
          accepted: 1,
          cooking: 2,
          ready: 3,
          out_for_delivery: 4,
          delivered: 5,
          cancelled: -1
        };

        const targetIdx = statusIndexMap[status];

        const updatedTimeline = ord.timeline.map((step, idx) => {
          if (idx <= targetIdx) {
            return {
              ...step,
              completed: true,
              current: idx === targetIdx,
              time: step.time === "Pending" ? timeStr : step.time
            };
          }
          return {
            ...step,
            completed: false,
            current: false
          };
        });

        return {
          ...ord,
          status,
          timeline: updatedTimeline
        };
      })
    );

    addToast({
      title: "Order status updated",
      message: `Order #${orderId} moved to ${status.replace(/_/g, " ")}`,
      type: "info"
    });
  };

  // Menu Management
  const addMeal = (mealData: Omit<Meal, "id" | "rating" | "reviewCount">) => {
    const newMeal: Meal = {
      ...mealData,
      id: "meal-" + Math.random().toString(36).substring(2, 9),
      rating: 5.0,
      reviewCount: 1,
      isNew: true
    };
    setMeals((prev) => [newMeal, ...prev]);
    addToast({
      title: "Dish added to menu",
      message: `${newMeal.name} is now available in your kitchen`,
      type: "success"
    });
  };

  const updateMeal = (mealId: string, mealData: Partial<Meal>) => {
    setMeals((prev) =>
      prev.map((m) => (m.id === mealId ? { ...m, ...mealData } : m))
    );
    addToast({
      title: "Dish updated",
      message: "Your menu changes have been saved",
      type: "success"
    });
  };

  const toggleMealPause = (mealId: string) => {
    setMeals((prev) =>
      prev.map((m) =>
        m.id === mealId ? { ...m, isPaused: !m.isPaused } : m
      )
    );
  };

  const deleteMeal = (mealId: string) => {
    setMeals((prev) => prev.filter((m) => m.id !== mealId));
    addToast({
      title: "Dish removed",
      message: "The dish has been removed from your active menu",
      type: "info"
    });
  };

  // Review
  const addReview = (reviewData: Omit<Review, "id" | "date" | "verifiedPurchase">) => {
    const newReview: Review = {
      ...reviewData,
      id: "rev-" + Date.now(),
      date: "Just now",
      verifiedPurchase: true
    };
    setReviews((prev) => [newReview, ...prev]);
    addToast({
      title: "Thank you for your review!",
      message: "Your feedback supports our home cook community",
      type: "success"
    });
  };

  // Seller Onboarding
  const submitCookApplication = (appData: Omit<SellerApplication, "id" | "status" | "submittedAt">) => {
    const newApp: SellerApplication = {
      ...appData,
      id: "app-" + Math.floor(100 + Math.random() * 900),
      status: "pending",
      submittedAt: "Just now"
    };
    setApplications((prev) => [newApp, ...prev]);
    addToast({
      title: "Application submitted!",
      message: "Our verification team will review your food safety documents within 24 hours.",
      type: "success"
    });
  };

  const approveApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "approved" } : app))
    );
    addToast({
      title: "Cook Approved",
      message: "Verification badge issued & kitchen welcome pack sent",
      type: "success"
    });
  };

  const approveCookApplication = (appId: string) => {
    approveApplication(appId);
  };

  const rejectApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "rejected" } : app))
    );
    addToast({
      title: "Application Rejected",
      message: "Feedback notes sent to applicant",
      type: "info"
    });
  };

  const rejectCookApplication = (appId: string) => {
    rejectApplication(appId);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedCookId,
        setSelectedCookId,
        selectedMealId,
        setSelectedMealId,
        selectedOrderId,
        setSelectedOrderId,
        navigateToKitchen,
        navigateToMeal,
        navigateToOrder,
        userRole,
        setUserRole,
        isAuthenticated,
        setIsAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        currentUser,
        currency,
        setCurrency,
        currentCurrencyConfig,
        formatPrice,
        savedPaymentMethods,
        addSavedPaymentMethod,
        removeSavedPaymentMethod,
        setDefaultPaymentMethod,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartSubtotal,
        cartCount,
        cooks,
        meals,
        reviews,
        orders,
        applications,
        notifications,
        placeOrder,
        updateOrderStatus,
        addMeal,
        updateMeal,
        toggleMealPause,
        deleteMeal,
        addReview,
        submitCookApplication,
        approveApplication,
        approveCookApplication,
        rejectApplication,
        rejectCookApplication,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedDietary,
        toggleDietary,
        selectedLocation,
        setSelectedLocation,
        maxPrice,
        setMaxPrice,
        sortBy,
        setSortBy,
        activeMealModal,
        setActiveMealModal,
        toasts,
        addToast,
        removeToast,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
