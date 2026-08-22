export type Currency = 
  | "USD" 
  | "GBP" 
  | "EUR" 
  | "NGN" 
  | "CAD" 
  | "JPY" 
  | "AUD" 
  | "KES" 
  | "GHS" 
  | "BRL";

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  name: string;
  flag: string;
  rateToUsd: number; // 1 USD = rate units
}

export type DietaryPreference = 
  | "Halal" 
  | "Vegan" 
  | "Gluten-Free" 
  | "Nut-Free" 
  | "Dairy-Free" 
  | "Vegetarian" 
  | "High-Protein";

export type MealCategory = 
  | "All"
  | "West African" 
  | "Nigerian" 
  | "Caribbean & Jerk"
  | "East Asian & Noodles"
  | "Latin & Oaxacan"
  | "Mediterranean & Levant"
  | "South Asian Masala"
  | "East African Swahili"
  | "Universal Soul Food"
  | "Plant-Forward" 
  | "Nourishing Soups" 
  | "Comfort Bakes" 
  | "Weekend Feasts" 
  | "Breakfast Bowls"
  | "Healthy & Fresh"
  | "Desserts & Bakes"
  | "Build Your Own";

export interface SavedPaymentMethod {
  id: string;
  type: "card" | "applepay" | "googlepay" | "paypal" | "klarna" | "bank_transfer" | "mobile_money" | "crypto" | "cash";
  title: string;
  subtitle: string;
  last4?: string;
  brand?: string; // "visa" | "mastercard" | "amex" | "verve" | "discover" | "unionpay"
  expiry?: string;
  isDefault?: boolean;
  iconName?: string;
  details?: Record<string, string>;
}

export interface MealCustomizationOption {
  id: string;
  name: string;
  price: number; // 0 for included, >0 for add-on
  calories?: number;
  dietary?: DietaryPreference[];
  description?: string;
  isDefault?: boolean;
}

export interface MealCustomizationGroup {
  id: string;
  title: string;
  description?: string;
  type: "single" | "multiple";
  required: boolean;
  minSelections?: number;
  maxSelections?: number;
  options: MealCustomizationOption[];
}

export interface SelectedCustomization {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface Meal {
  id: string;
  cookId: string;
  cookName: string;
  cookAvatar: string;
  kitchenName: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: MealCategory;
  imageUrl: string;
  preparationTime: string; // e.g. "35-45 mins"
  portionsAvailable: number;
  dietary: DietaryPreference[];
  ingredients: string[];
  allergens: string[];
  calories?: number;
  pickupAvailable: boolean;
  deliveryAvailable: boolean;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isCommunityFavorite?: boolean;
  isNew?: boolean;
  isPaused?: boolean;
  isCustomizable?: boolean;
  customizationGroups?: MealCustomizationGroup[];
}

export interface Cook {
  id: string;
  name: string;
  avatar: string;
  heroImage: string;
  kitchenName: string;
  location: string;
  distance: string;
  rating: number;
  reviewsCount: number;
  specialty: string;
  story: string;
  quote: string;
  hygieneRating: string; // "5/5 Food Hygiene Rating"
  verificationStatus: "verified" | "pending" | "under_review";
  badges: string[];
  memberSince: string;
  mealsServed: number;
  responseTime: string;
  familyNote: string;
  pickupAddress: string;
  openingHours: string;
  foodSafetyCertNo: string;
  payoutAccount: string;
}

export interface CartItem {
  id: string; // unique item id based on meal + customizations
  meal: Meal;
  quantity: number;
  selectedCustomizations?: SelectedCustomization[];
  unitPrice: number; // base price + sum(customizations)
  specialInstructions?: string;
}

export type OrderStatus = 
  | "received" 
  | "accepted" 
  | "cooking" 
  | "ready" 
  | "out_for_delivery" 
  | "delivered" 
  | "cancelled";

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  time: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  fulfillmentType: "delivery" | "pickup";
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  cookTip: number;
  total: number;
  status: OrderStatus;
  cookId: string;
  kitchenName: string;
  cookName: string;
  cookAvatar: string;
  cookPhone: string;
  orderTime: string;
  estimatedDeliveryTime: string;
  timeline: OrderTimelineStep[];
  paymentStatus: "paid" | "pending" | "failed";
  paymentMethod: string;
  notesToCook?: string;
}

export interface Review {
  id: string;
  cookId: string;
  mealId?: string;
  mealName?: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface SellerApplication {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  kitchenName: string;
  city: string;
  neighborhood: string;
  specialties: string[];
  foodCertNumber: string;
  idDocumentName: string;
  story: string;
  signatureDish: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  payoutInfo: {
    bankName: string;
    accountNumber: string;
    holderName: string;
  };
}

export interface NotificationItem {
  id: string;
  type: "order" | "verification" | "payout" | "message" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

export type ViewRoute = 
  | "home" 
  | "discover" 
  | "meals" 
  | "kitchens" 
  | "kitchen-detail" 
  | "meal-detail" 
  | "how-it-works" 
  | "become-a-cook" 
  | "about" 
  | "stories" 
  | "contact" 
  | "cart" 
  | "checkout" 
  | "order-tracking" 
  | "customer-dashboard" 
  | "customer-orders" 
  | "seller-dashboard" 
  | "seller-orders" 
  | "seller-menu" 
  | "seller-messages" 
  | "seller-earnings" 
  | "seller-verification"
  | "login"
  | "register";

export type UserRole = "customer" | "seller";
