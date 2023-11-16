import {FaBars} from "react-icons/fa";
import { useEffect, useState } from "react";

export const Header = ()=> {
    let [menu, setMenu] = useState(false);

    useEffect(()=> {
        let claseMenu = document.querySelector(".menuAbierto");
        if (!menu) claseMenu.classList.add("noshow")
        else claseMenu.classList.remove("noshow");
    }, [menu])

    return(
        <>
            <div className="header">
                <div className="barras">
                    <a className="menu">
                        <FaBars onClick={()=> setMenu(!menu)}/>
                    </a>
                </div>
                <img className="pic logo" src="logo.png"/>
            </div>
            <div className="menuAbierto noshow">
                <ul>
                    <li>
                        Contacto
                    </li>
                    <li>
                        Sobre nosotros
                    </li>
                </ul>
            </div>
        </>
    )
} 