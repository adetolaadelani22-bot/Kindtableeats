import React, { Suspense, lazy } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { RoleSwitcherBanner } from "./components/common/RoleSwitcherBanner";
import { ToastContainer } from "./components/common/ToastContainer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { MealDetailModal } from "./components/modal/MealDetailModal";
import { AuthModal } from "./components/auth/AuthModal";

const Home = lazy(() => import("./pages/Home").then((module) => ({ default: module.Home })));
const DiscoverPage = lazy(() => import("./components/marketplace/DiscoverPage").then((module) => ({ default: module.DiscoverPage })));
const KitchenProfilePage = lazy(() => import("./components/kitchen/KitchenProfilePage").then((module) => ({ default: module.KitchenProfilePage })));
const KitchensDirectoryPage = lazy(() => import("./components/pages/KitchensDirectoryPage").then((module) => ({ default: module.KitchensDirectoryPage })));
const StoriesPage = lazy(() => import("./components/pages/StoriesPage").then((module) => ({ default: module.StoriesPage })));
const ImpactPage = lazy(() => import("./components/pages/ImpactPage").then((module) => ({ default: module.ImpactPage })));
const ContactPage = lazy(() => import("./components/pages/ContactPage").then((module) => ({ default: module.ContactPage })));
const BecomeACookPage = lazy(() => import("./components/cook-onboarding/BecomeACookPage").then((module) => ({ default: module.BecomeACookPage })));
const CheckoutPage = lazy(() => import("./components/checkout/CheckoutPage").then((module) => ({ default: module.CheckoutPage })));
const OrderTrackingPage = lazy(() => import("./components/tracking/OrderTrackingPage").then((module) => ({ default: module.OrderTrackingPage })));
const CustomerDashboard = lazy(() => import("./components/dashboard/CustomerDashboard").then((module) => ({ default: module.CustomerDashboard })));
const SellerDashboard = lazy(() => import("./components/dashboard/SellerDashboard").then((module) => ({ default: module.SellerDashboard })));
const AuthPage = lazy(() => import("./components/auth/AuthPage").then((module) => ({ default: module.AuthPage })));

const AppContent: React.FC = () => {
  const { currentRoute } = useApp();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case "home":
        return <Home />;
      case "discover":
      case "meals":
        return <DiscoverPage />;
      case "kitchen":
      case "kitchen-detail":
        return <KitchenProfilePage />;
      case "kitchens":
        return <KitchensDirectoryPage />;
      case "stories":
        return <StoriesPage />;
      case "impact":
      case "about":
        return <ImpactPage />;
      case "contact":
        return <ContactPage />;
      case "become-a-cook":
        return <BecomeACookPage />;
      case "checkout":
        return <CheckoutPage />;
      case "order-tracking":
        return <OrderTrackingPage />;
      case "customer-dashboard":
      case "customer-orders":
        return <CustomerDashboard />;
      case "seller-dashboard":
      case "seller-orders":
      case "seller-menu":
      case "seller-earnings":
      case "seller-verification":
        return <SellerDashboard />;
      case "login":
      case "register":
        return <AuthPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#202522] selection:bg-[#24483A]/20 selection:text-[#24483A]">
      <RoleSwitcherBanner />
      <Navbar />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center text-sm font-medium uppercase tracking-[0.2em] text-[#24483A]/70">
              Loading experience...
            </div>
          }
        >
          {renderCurrentView()}
        </Suspense>
      </main>

      <Footer />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <MealDetailModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
