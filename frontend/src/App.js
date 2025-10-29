import React from "react";
import Navbar from "./components/Navbar";
import Navbar2 from "./components/navbar2";
import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import CoinPage from "./components/CoinPage";
import Footer from "./components/Footer";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import { AuthContextProvider } from "./context/AuthContext";
import ConvertComp from "./routes/convert";
import WithDrawComp from "./routes/withdraw";
import TransferComp from "./routes/transfer";
import  SupportComp  from "./routes/support";
import { UserProfileComp } from "./routes/profile";
import IDVerificationForm from "./routes/verification";
import TradeDashboard from "./components/dashboard";
import MartketComp from "./components/crypto";
import Deposit from "./routes/deposit";


function App() {
    const location = useLocation();
  const [data, setData] = useState([])
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true"

  useEffect(()=>{
    axios.get(url)
      .then((response) => {
        setData(response.data)
      })
  },[url])

  return (
    <AuthContextProvider>
      <div className="App">
         {location.pathname === "/" ? <Navbar /> : <Navbar2 />}
        <Routes>
          <Route path="/" element={<Home coins={data}/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/deposit" element={<Deposit/>}/>
          <Route path="/convert" element={<ConvertComp/>}/>
          <Route path="/withdraw" element={<WithDrawComp/>}/>
          <Route path="/transfer" element={<TransferComp/>}/>
          <Route path="/support" element={<SupportComp/>}/>
          <Route path="/profile" element={<UserProfileComp/>}/>
          <Route path="/verification" element={<IDVerificationForm/>}/>
          <Route path="/trade" element={<TradeDashboard/>}/>
          <Route path="/market" element={<MartketComp/>}/>
          <Route path="/coin/:coinId" element={<CoinPage/>}>
            <Route path=":coinId"/>
          </Route>
        </Routes>
     {location.pathname === "/"  &&  <Footer/> }
      </div>
    </AuthContextProvider>
  );
}

export default App;
