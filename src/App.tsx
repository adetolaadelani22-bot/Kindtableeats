import React, { Suspense, lazy } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { RoleSwitcherBanner } from "./components/common/RoleSwitcherBanner";
import { ToastContainer } from "./components/common/ToastContainer";

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
const CartDrawer = lazy(() => import("./components/cart/CartDrawer").then((module) => ({ default: module.CartDrawer })));
const MealDetailModal = lazy(() => import("./components/modal/MealDetailModal").then((module) => ({ default: module.MealDetailModal })));
const AuthModal = lazy(() => import("./components/auth/AuthModal").then((module) => ({ default: module.AuthModal })));

const AppContent: React.FC = () => {
  const { currentRoute, portalMode } = useApp();

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

  if (portalMode === "seller") {
    return (
      <div className="min-h-screen flex flex-col bg-[#FFF9F3] text-[#202522] selection:bg-[#B86B4B]/20 selection:text-[#B86B4B]">
        <header className="border-b border-[#F2DCC7] bg-[#FFF7F1]/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#B86B4B] to-[#8B4A2D] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md ring-2 ring-[#F8E7DC]">
                S
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-[#B86B4B] font-bold">Seller Portal</div>
                <div className="font-serif text-xl font-bold text-[#202522]">KindTable Kitchen</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5A473B]">
              <button
                onClick={() => window.location.href = "https://adetolaadelani22-bot.github.io/Kindtableeats/"}
                className="rounded-xl border border-[#F2DCC7] bg-[#FFF2E6] px-3 py-2 hover:bg-[#F7E2D0] transition-colors"
              >
                View Customer Site
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center text-sm font-medium uppercase tracking-[0.2em] text-[#B86B4B]/70">Loading seller portal...</div>}>
            {renderCurrentView()}
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <ToastContainer />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5EF] text-[#202522] selection:bg-[#24483A]/20 selection:text-[#24483A]">
      <RoleSwitcherBanner />
      <header className="border-b border-[#EDE5D8] bg-[#F8F5EF]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#24483A] to-[#193329] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md ring-2 ring-[#E6F0EC]">
              K
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-[#24483A] font-bold">Customer Portal</div>
              <div className="font-serif text-xl font-bold text-[#202522]">KindTableEats</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#6D716C]">
            <span className="rounded-full bg-[#EDE5D8] px-2.5 py-1">Fresh meals</span>
            <span className="rounded-full bg-[#EDE5D8] px-2.5 py-1">Verified cooks</span>
          </div>
        </div>
      </header>
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

      <Suspense fallback={null}>
        <CartDrawer />
        <MealDetailModal />
        <AuthModal />
      </Suspense>
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
