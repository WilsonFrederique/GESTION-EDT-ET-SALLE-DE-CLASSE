import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Dashboard/DashboardIndex";
import Header from "./components/Header/Header";
import SidBar from "./components/SidBar/SidBar";
import SignUp from "./pages/SignUp/SignUp";
import Message from "./pages/Message/Message";

import Enseignants from "./pages/Enseignants/Enseignants";
import EnseignantsFRM from "./pages/EnseignantsFRM/EnseignantsFRM";
import EnseignantsDetail from "./pages/Enseignants/Components/EnseignantsDetail/EnseignantsDetail";

import Niveaux from "./pages/Formations/Niveaux/Niveaux";
import NiveauxFrm from "./pages/FormationsFRM/NiveauxFrm/NiveauxFrm";

import Parcours from "./pages/Formations/Parcours/Parcours";
import ParcoursFrm from "./pages/FormationsFRM/ParcoursFrm/ParcoursFrm";

import NiveauL1 from "./pages/EtudiantsList/NiveauL1/NiveauL1";
import NiveauL2 from "./pages/EtudiantsList/NiveauL2/NiveauL2";
import NiveauL3 from "./pages/EtudiantsList/NiveauL3/NiveauL";
import NiveauM1 from "./pages/EtudiantsList/NiveauM1/NiveauM1";
import NiveauM2 from "./pages/EtudiantsList/NiveauM2/NiveauM2";
import EtudiantsFrm from "./pages/EtudiantsFRM/EtudiantsFrm";

import ListesL1EDT from "./pages/EDT/ListesL1EDT/ListesLEDT";
import ListesL2EDT from "./pages/EDT/ListesL2EDT/ListesL2EDT";
import ListesL3EDT from "./pages/EDT/ListesL3EDT/ListesL3EDT";
import ListesM1EDT from "./pages/EDT/ListesM1EDT/ListesM1EDT";
import ListesM2EDT from "./pages/EDT/ListesM2EDT/ListesM2EDT";
import ListesTousEDT from "./pages/EDT/ListesTousEDT/ListesTousEDT";
import EdtFrm from "./pages/EdtFRM/EdtFrm";

import MatiersListe from "./pages/MatiersListe/MatiersListe";
import MatiersFrm from "./pages/MatiersFRM/MatiersFrm";

import SalleListe from "./pages/SalleListe/SalleListe";
import SalleFRM from "./pages/SalleFRM/SalleFRM";

import CreneauxListe from "./pages/CreneauxListe/CreneauxListe";
import CreneauxFrm from "./pages/CreneauxFRM/CreneauxFrm";
import CreneauxDirectFrm from "./pages/CreneauxFRM/CreneauxDirectFrm";

import NiveauTous from "./pages/EtudiantsList/NiveauTous/NiveauTous";

import Notifications from "./pages/Notifications/Notifications";

import Parametres from "./pages/Parametres/Parametres";

const MyContext = createContext();

export default function App() {
  // Initialisation des états avec localStorage
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme !== null ? savedTheme === 'light' : true;
  });

  const [isOpenNav, setIsOpenNav] = useState(() => {
    try {
      const saved = localStorage.getItem('isOpenNav');
      return saved === "true"; // Assure que c’est bien un booléen
    } catch {
      return false;
    }
  });

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Gestion du thème
  useEffect(() => {
    const themeClass = themeMode ? 'light' : 'dark';
    const oppositeClass = themeMode ? 'dark' : 'light';
    
    document.body.classList.remove(oppositeClass);
    document.body.classList.add(themeClass);
    localStorage.setItem('themeMode', themeClass);
  }, [themeMode]);


  // Gestion du resize de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeNav = () => {
    setIsOpenNav(false);
    localStorage.setItem('isOpenNav', "false");
  };
  
  const openNav = () => {
    setIsOpenNav(true);
    localStorage.setItem('isOpenNav', "true");
  };
  
  const toggleNav = () => {
    setIsOpenNav(prev => {
      const newState = !prev;
      localStorage.setItem('isOpenNav', newState.toString());
      return newState;
    });
  };

  const toggleTheme = () => {
    setThemeMode(prev => !prev);
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode: toggleTheme,
    windowWidth,
    isOpenNav,
    setIsOpenNav,
    toggleNav,
    openNav,
    closeNav
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
              <div 
                className={`sidebarOverlay d-none ${isOpenNav && 'show'}`} 
                onClick={closeNav}
              />
              <div 
                className={`sidebarWrapper ${isToggleSidebar ? "toggle" : ""} ${isOpenNav ? 'open' : ''}`}
              >
                <SidBar />
              </div>
            </>
          )}

          <div className={`content ${isHideSidebarAndHeader && 'full'} ${isToggleSidebar && "toggle"}`}>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/message" element={<Message />} />

              <Route path="/enseignants" element={<Enseignants />} />
              <Route path="/enseignantsFRM" element={<EnseignantsFRM />} />
              <Route path="/modifierEnseignantsFRM/:cinEns" element={<EnseignantsFRM />} />
              <Route path="/enseignants/details/:cinEns" element={<EnseignantsDetail />} />

              <Route path="/niveaux" element={<Niveaux />} />
              <Route path="/niveauxFrm" element={<NiveauxFrm />} />
              <Route path="/modifierNiveauxFrm/:IDNiveaux" element={<NiveauxFrm />} />
              
              <Route path="/parcours" element={<Parcours />} />
              <Route path="/parcoursFrm" element={<ParcoursFrm />} />
              <Route path="/modifierParcoursFrm/:IDParcours" element={<ParcoursFrm />} />

              <Route path="/niveauL1" element={<NiveauL1 />} />              
              <Route path="/niveauL2" element={<NiveauL2 />} />
              <Route path="/niveauL3" element={<NiveauL3 />} />
              <Route path="/niveauM1" element={<NiveauM1 />} />
              <Route path="/niveauM2" element={<NiveauM2 />} />
              <Route path="/niveauTous" element={<NiveauTous />} />
              <Route path="/etudiantsFrm" element={<EtudiantsFrm />} />
              <Route path="/modifierEtudiantsFrm/:Matricule" element={<EtudiantsFrm />} />

              <Route path="/listesL1EDT" element={<ListesL1EDT />} />
              <Route path="/listesL2EDT" element={<ListesL2EDT />} />
              <Route path="/listesL3EDT" element={<ListesL3EDT />} />
              <Route path="/listesM1EDT" element={<ListesM1EDT />} />
              <Route path="/listesM2EDT" element={<ListesM2EDT />} />
              <Route path="/listesTousEDT" element={<ListesTousEDT />} />
              <Route path="/edtFrm" element={<EdtFrm />} />
              <Route path="/modifierEdtFrm/:IDEdt" element={<EdtFrm />} />

              <Route path="/matiersListe" element={<MatiersListe />} />
              <Route path="/matiereFrm" element={<MatiersFrm />} />
              <Route path="/modifierMatiereFrm/:IDMatiere" element={<MatiersFrm />} />

              <Route path="/salleListe" element={<SalleListe />} />
              <Route path="/salleListe/details/:IDSalle" element={<SalleListe />} />
              <Route path="/salleFRM" element={<SalleFRM />} />
              <Route path="/modifierSalleFRM/:IDSalle" element={<SalleFRM />} />

              <Route path="/creneauxListe" element={<CreneauxListe />} />
              <Route path="/creneauxFrm" element={<CreneauxFrm />} />
              <Route path="/modifierCreneauxFrm/:IDCreneaux" element={<CreneauxFrm />} />
              <Route path="/creneauxDirectFrm" element={<CreneauxDirectFrm />} />

              <Route path="/notifications" element={<Notifications />} />

              <Route path="/parametres" element={<Parametres />} />

            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export { MyContext };