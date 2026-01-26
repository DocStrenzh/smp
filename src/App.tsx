import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ScrollToTop from "./sections/ScrollToTop";
import ScrollButton from "./components/ScrollButton";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicePage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import ContactPage from "./pages/ContactPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import CartPage from "./pages/cart/CartPage";
import CatalogPage from "./pages/cart/CatalogPage";
import CatalogCategoryPage from "./pages/CatalogCategoryPage";

import CompanyLayout from "./layouts/CompanyLayout";
import CompanyPage from "./pages/CompanyPage";
import CompanyEmployeesPage from "./pages/company/CompanyEmployeePage";
import CompanyPartnersPage from "./pages/company/CompanyPartnersPage";
import ReviewsPage from "./pages/company/ReviewsPage";
import CompanyCertificatesPage from "./pages/company/CompanyCertificatesPage";
import RequisitesPage from "./pages/company/RequisitesPage";
import FaqPage from "./pages/company/FaqPage";
import Gallery from "./pages/company/Gallery";

import { AuthProvider } from "./auth/AuthProvider";
import { QuickActionsProvider } from "./components/QuickActionProvider";
import {CartProvider} from "./cart/CartProvider";
import {CatalogProvider} from "./catalog/CatalogProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QuickActionsProvider>
        <CatalogProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <ScrollButton />

              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailsPage />} />
                  <Route path="/contacts" element={<ContactPage />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/catalog" element={<CatalogPage />} />
                  <Route
                    path="/catalog/:categorySlug"
                    element={<CatalogCategoryPage />}
                  />
                  <Route path="company/*" element={<CompanyLayout />}>
                    <Route index element={<CompanyPage />} />
                    <Route path="employees" element={<CompanyEmployeesPage />} />
                    <Route path="partners" element={<CompanyPartnersPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                    <Route
                      path="certificates"
                      element={<CompanyCertificatesPage />}
                    />
                    <Route path="requisites" element={<RequisitesPage />} />
                    <Route path="faq" element={<FaqPage />} />
                    <Route path="gallery" element={<Gallery />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </CatalogProvider>
      </QuickActionsProvider>
    </AuthProvider>
  );
};

export default App;
