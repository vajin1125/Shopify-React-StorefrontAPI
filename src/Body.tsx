import React from "react"
import { Route, Routes, Outlet } from "react-router-dom"
import { GoogleOAuthProvider } from "@react-oauth/google"

// Providers
import { FetchAndEnsureCustomerSession } from "src/modules/customerSessionProvider"
import { FetchAndEnsureAdminSession } from "src/modules/adminSessionProvider"
import { ShopifyCartItemCount } from "src/modules/cartItemCountProvider"

// Admin Side.
import { Layout as AdminLayout } from "src/components/adminLayout"
import { AuthenticationLayout as AdminAuthenticationLayout } from "src/components/adminAuthenticationLayout"
import { ProductList } from "src/pages/admin/productList"
import { ProductDetail as AdminProductDetail } from "src/pages/admin/productDetail"

// Maker Side.
// import { Layout as MakerLayout } from "src/components/makerLayout"
// import { MakerOrderDetail } from "src/pages/maker/orderDetail"
// import { MakerOrderList } from "src/pages/maker/orderList"

// User Side.
import { Layout as UserLayout } from "src/components/client/layout"
import { AuthenticationLayout as ClientAuthenticationLayout } from "src/components/client/authenticationLayout"
import { SignIn } from "src/pages/client/auth/signin"
import { AccountSettings } from "src/pages/client/mypage/account_settings"
import { MyPage } from "src/pages/client/mypage"
import { Top } from "src/pages/client/top"
import { Purchase } from "src/pages/client/purchase"
import { PurchaseCompletion } from "src/pages/client/purchaseCompletion"
import { Contact } from "src/pages/client/contact"
import { TermOfUse } from "src/pages/client/termOfUse"
import { PrivacyPolicy } from "src/pages/client/privacyPolicy"
import { Cart } from "src/pages/client/cart"
import { PurchaseHistory } from "src/pages/client/purchaseHistory"
import { ProductDetail as CustomerProductDetail } from "./pages/client/productDetail"
// import { ForgotPassword } from "src/pages/client/auth/forgotPassword"
// import { ResetPassword } from "src/pages/client/auth/resetPassword"
import { UserList } from "./pages/admin/userList"
import { UserDetail } from "./pages/admin/userDetail"
import { MakerList } from "./pages/admin/makerlist"
import { PaymentMethod } from "src/pages/client/mypage/paymentMethod"
import { DepartmentList } from "./pages/admin/departmentList"
import { AdminList } from "./pages/admin/adminlist"
import { Search } from "src/pages/client/search"
import { Notification } from "src/pages/client/mypage/notification"
import { ActOnTransaction } from "src/pages/client/actOnTransaction"
import { SignIn as AdminSignIn } from "src/pages/admin/auth/signin"
import { OrderList } from "./pages/admin/orderlist"
import { DepositHistory } from "./pages/admin/depositHistory"

export function Body() {
  return (
    <Routes>
      <Route
        element={
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
            <FetchAndEnsureAdminSession>
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </FetchAndEnsureAdminSession>
          </GoogleOAuthProvider>
        }
      >
        <Route
          element={
            <AdminAuthenticationLayout>
              <Outlet />
            </AdminAuthenticationLayout>
          }
        >
          {/* (Page 21) Product List */}
          <Route path="/admin/product" element={<ProductList />} />
          {/* (Page 22) Product Detail */}
          <Route path="/admin/product/:id" element={<AdminProductDetail />} />
          {/* (Page 37) User List */}
          <Route path="/admin/user" element={<UserList />} />
          {/* (Page 38) User Detail */}
          <Route path="/admin/user/:id" element={<UserDetail />} />
          {/* (Page 42 Maker List) */}
          <Route path="/admin/maker" element={<MakerList />} />
          {/* (Page 39 Department List) */}
          <Route path="/admin/department" element={<DepartmentList />} />
          {/* (Page 23 Admin List) */}
          <Route path="/admin/admin" element={<AdminList />} />
          {/* (Page 17 Order List) */}
          <Route path="/admin/order" element={<OrderList />} />
          {/* (Page 49 Depository History) */}
          <Route path="/admin/deposit" element={<DepositHistory />} />
        </Route>
        {/* (Page 47 Admin SignIn) */}
        <Route path="/admin/signin" element={<AdminSignIn />} />
      </Route>
      {/* <Route
        element={
          <MakerLayout>
            <Outlet />
          </MakerLayout>
        }
      > */}
      {/* (Page 24) Order List */}
      {/* <Route path="/maker/order" element={<MakerOrderList />} /> */}
      {/* (Page 25) Order Detail  */}
      {/* <Route path="/maker/order/:id" element={<MakerOrderDetail />} /> */}
      {/* </Route> */}
      <Route
        element={
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
            <FetchAndEnsureCustomerSession>
              <ShopifyCartItemCount>
                <UserLayout>
                  <Outlet />
                </UserLayout>
              </ShopifyCartItemCount>
            </FetchAndEnsureCustomerSession>
          </GoogleOAuthProvider>
        }
      >
        <Route
          element={
            <ClientAuthenticationLayout>
              <Outlet />
            </ClientAuthenticationLayout>
          }
        >
          {/* (Page 03) My Page Top */}
          <Route path="/mypage" element={<MyPage />} />
          {/* (Page 04) Profile Setting in MyPage for Student / Teacher */}
          <Route path="/mypage/account-settings" element={<AccountSettings />} />
          {/* (Page 05) Payment Method in MyPage  */}
          <Route path="/mypage/payment-method" element={<PaymentMethod />} />
          <Route path="/mypage/notification" element={<Notification />} />
          {/* (Page 07) Cart */}
          <Route path="/cart" element={<Cart />} />
          {/* (Page 08) Step1 of Purchase  */}
          <Route path="/purchase" element={<Purchase />} />
          {/* (Page 09) Step2 of Purchase  */}
          <Route path="/purchase-complete" element={<PurchaseCompletion />} />
          {/* (Page 10) Product Detail */}
          <Route path="/product/:id" element={<CustomerProductDetail />} />
          <Route path="/purchase-history" element={<PurchaseHistory />} />
        </Route>
        {/* (Page 01) Login for Student / Teacher and (Page 32) Login for Graduate */}
        <Route path="/signin" element={<SignIn />} />
        {/* (Page 02) Top */}
        <Route path="/" element={<Top />} />
        {/* (Page 12) Term of Use */}
        <Route path="/term-of-use" element={<TermOfUse />} />
        {/* (Page 13) Privacy Policy */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/act-on-transaction" element={<ActOnTransaction />} />
        {/* (Page 14) Contact */}
        <Route path="/contact" element={<Contact />} />
        {/* (Page 33) Forgot Password for Graduate  */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        {/* (Page 34) Reset Password for Graduate  */}
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Route>
      <Route
        element={
          <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}>
            <FetchAndEnsureCustomerSession>
              <ShopifyCartItemCount>
                <Outlet />
              </ShopifyCartItemCount>
            </FetchAndEnsureCustomerSession>
          </GoogleOAuthProvider>
        }
      >
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  )
}
