import React from 'react';

import {BrowserRouter, Routes, Route} from "react-router-dom"; 


// import dos componentes de página 
import HomePage from "./components/HomePage/HomePage"; 
import TipoEvento from './components/TipoEvento/TipoEvento';
import EventosPage from "./components/EventosPage/EventosPage"; 
import LoginPage from "./components/LoginPage/Login"; 
import TestePage from "./components/TestePage/TestePage"; 

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'; 


const Rotas = () => {
    return (
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route element={<HomePage />} path= '/' exact />
            <Route element={<TipoEvento />} path='/tipo-eventos' />
            <Route element={<EventosPage />} path='/eventos' />
            <Route element={<LoginPage />} path='/login' />
             <Route element={<TestePage/>} path='/testes' />
            </Routes>
            <Footer/>
            </BrowserRouter>
    );
};

export default Rotas;