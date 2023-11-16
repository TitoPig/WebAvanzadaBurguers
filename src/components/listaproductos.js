import React, {useEffect, useState} from "react";
/*import {BotonesInicio} from "./botonesInfo";*/
import {Carrito} from "./carrito";
import {FaArrowLeft, FaPlus} from "react-icons/fa";

export const listaProductos = [
    {
        id: 1,
        nombre: "producto 1",
        categoria: "categoria1",
        precio: 10,
        descripcion: "descripcion del producto 1",
        img: "burguer.jpg",
        topic: []
    },
    {
        id: 2,
        nombre: "producto 2",
        categoria: "categoria2",
        precio: 20,
        descripcion: "descripcion del rpoducto 2",
        img: "topics.jpg",
        topic: []
    }
];

export const Categorias = ()=> {
    let arreglo = [];

    listaProductos.forEach((p)=>{
        arreglo.push(p.categoria);
    });

    let categorias = arreglo.filter((item,index)=>{
        return arreglo.indexOf(item) === index;
    })

    const filtrarProductos = (c)=> {
        let claseProd = document.querySelectorAll(".prod");
        claseProd.forEach((cP)=>{
            cP.classList.add("noshow");
        });
        let mostrar = document.querySelectorAll("." + c);
        if (mostrar) {mostrar.forEach((m)=>{
            m.classList.remove("noshow");
        })}
        let claseCate = document.querySelector(".categorias");
        claseCate.classList.add("noshow");
        let claseBtnVolver = document.querySelector(".contenedorBtnVolverProductos");
        claseBtnVolver.classList.remove("noshow");
    }

    return(
        <>
            <div className="categorias">
                {categorias.map((c, i)=>{
                    return(
                        <>
                            <div className={"cate " + c + ""}> 
                                <a key={i} onClick={()=>filtrarProductos(c)}>{c}</a>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

/*export const Navegacion = ()=> {
    const filtrarProductos = (c)=> {
        let claseProd = document.querySelectorAll(".prod");
        let claseNavs = document.querySelectorAll(".nav");
        claseProd.forEach((cP)=>{
            cP.classList.add("noshow");
        });
        claseNavs.forEach((cN)=>{
            cN.classList.add("noshow");
        });
        let mostrarNav = document.querySelector(".nav" + c);
        mostrarNav.classList.remove("noshow");
        let mostrar = document.querySelectorAll("." + c);
        if (mostrar) {mostrar.forEach((m)=>{
            m.classList.remove("noshow");
        })}
    }

    const filtrarTodos = ()=> {
        let claseProd = document.querySelectorAll(".prod");
        let claseGlobal = document.querySelector(".navTodas");
        claseProd.forEach((cP)=>{
            cP.classList.remove("noshow");
        });
        let mostrarNav = document.querySelectorAll(".nav");
        mostrarNav.forEach((mN)=>{
            mN.classList.add("noshow");
        });
        claseGlobal.classList.remove("noshow");
    }

    return(
        <>
            <div className="navegacion">
                <b className="Categorias">Categoria</b>
                <b className="nav navTodas">/Todas</b>
                {categorias.map((c, i)=>{
                    return(
                        <>
                            <b key={i} className={"nav nav" + c + " noshow"}>/{c}</b>
                        </>
                    )
                })}
            </div>
            <div className="aside">
                <h2>CATEGORIAS</h2>
                {categorias.map((c, i)=>{
                    return(
                        <>
                            <a key={i} className={"cat " + c} onClick={()=> filtrarProductos(c)}>{c}</a>
                        </>
                    )
                })}
                <a className="cat Global" onClick={()=> filtrarTodos()}>Todas</a>
            </div>
        </>
    )
}*/


export const Context = React.createContext([[], ()=>{}, ()=>{}, []]);

export const Productos = ()=> {
    let [visual, setVisual] = useState("");

    useEffect(()=>{
        if (visual != "") {
            let claseInfo = document.querySelector(".info");
            claseInfo.classList.remove("noshow");
            let claseProd = document.querySelectorAll(".prod");
            claseProd.forEach((cP)=>{
                cP.classList.add("noshow");
            });
            let claseBtnVolver = document.querySelector(".contenedorBtnVolverProductos");
            claseBtnVolver.classList.add("noshow");
            let btnVolverInfo = document.querySelector(".contenedorBtnVolverInfo");
            btnVolverInfo.classList.remove("noshow");
            let btnAgregar = document.querySelector(".btnAgregarInfo");
            btnAgregar.classList.remove("noshow");
        }
    },[visual])

    const volverProductos = ()=> {
        setVisual("");
        let claseProd = document.querySelectorAll(".prod");
        claseProd.forEach((cP)=>{
            cP.classList.add("noshow");
        });
        let claseCate = document.querySelector(".categorias");
        claseCate.classList.remove("noshow");
        let claseBtnVolver = document.querySelector(".contenedorBtnVolverProductos");
        claseBtnVolver.classList.add("noshow");
    }

    let [carrito, setCarrito] = useState([]);

    const actualizarVisualCarrito = ()=> {
        return(
            <>
                <Carrito/>
            </>
        )
    }

    const agregarTopic = (t)=> {
        if (visual.topic.includes(t)){
            let indice = visual.topic.indexOf(t);
            visual.topic.splice(indice, 1)
        }
        else {visual.topic.push(t)}
    }

    const btnVolverInfo = (p)=> {
        setVisual("");

        let claseInfo = document.querySelector(".info");
        claseInfo.classList.add("noshow");
        let claseProdAMostrar = document.querySelectorAll("." + p.categoria);
        claseProdAMostrar.forEach((cP)=>{
            cP.classList.remove("noshow");
        });
        let claseBtnVolver = document.querySelector(".contenedorBtnVolverProductos");
        claseBtnVolver.classList.remove("noshow");
        let btnVolverInfo = document.querySelector(".contenedorBtnVolverInfo");
        btnVolverInfo.classList.add("noshow");
        let btnAgregar = document.querySelector(".btnAgregarInfo");
        btnAgregar.classList.add("noshow");
        
    }

    const btnAgregarInfo = (prod)=> {
        let claseCarrito = document.querySelector(".carrito");
        let encontrado = false;
        let nuevoArray = [];
        if (carrito) {carrito.forEach((c)=> {
            if (c.producto === prod) {
                encontrado = true;
                let nuevaCantidad = c.cantidad + 1;
                nuevoArray.push({producto: prod,cantidad: nuevaCantidad});
            }
            else {nuevoArray.push(c)};
            setCarrito(nuevoArray);
        })};
        if (!encontrado) {setCarrito(carrito.concat({producto: prod, cantidad: 1}))};
        claseCarrito.classList.remove("noshow");
        document.querySelectorAll(".checkbox").forEach(function(checkElement) {
            checkElement.checked = false;
        });
    }

    return(
        <>
            <Context.Provider value={[carrito, setCarrito, setVisual]}>
                <div className="main">
                    <div className="btn contenedorBtnVolverProductos noshow" onClick={() => volverProductos()}>
                        <FaArrowLeft/>
                    </div>
                    {listaProductos.map((p, i)=> {
                        return(
                            <> 
                                <div key={i} className={"prod " + p.categoria + " noshow"} onClick={()=> setVisual(p)}>
                                    <img src={p.img} alt={"imagen producto "+ p.nombre}></img>
                                    <h2>{p.nombre}</h2>
                                    <b>{"$"+p.precio}</b>
                                </div>
                            </>
                        )
                    })}
                    <div className="btn contenedorBtnVolverInfo noshow" onClick={()=> btnVolverInfo(visual)}>
                        <FaArrowLeft/>
                    </div>
                    <div className="info noshow">
                        <div className="informacionEscrita">
                            <h2 className="titulo">{visual.nombre}</h2>
                            <div className="descripcion">
                                <p>{visual.descripcion}</p>
                            </div>
                            <form method="get">
                                Selecciona los topics:
                                <br/>
                                <input className="checkbox" name="bacon" type="checkbox" onClick={()=> agregarTopic("bacon")}/>Bacon
                                <br/>
                                <input className="checkbox" name="tomate" type="checkbox" onClick={()=> agregarTopic("tomate")}/>Tomate
                                <br/>
                                <input className="checkbox" name="lechuga" type="checkbox" onClick={()=> agregarTopic("lechuga")}/>Lechuga
                                <br/>
                                <input className="checkbox" name="cebollaC" type="checkbox" onClick={()=> agregarTopic("cebolla caramelizada")}/>Cebolla caramelizada
                                <br/>
                                <input className="checkbox" name="cebollaM" type="checkbox" onClick={()=> agregarTopic("cebolla morada")}/>Cebolla morada
                                <br/>
                                <input className="checkbox" name="champi" type="checkbox" onClick={()=> agregarTopic("champignon")}/>Champignones
                            </form>
                        </div>
                    </div>
                    <div className="btn btnAgregarInfo noshow" onClick={()=> btnAgregarInfo(visual)}>
                        <FaPlus/>
                    </div>
                    {actualizarVisualCarrito()}
                </div>
            </Context.Provider>
        </>
    )
}

export default Productos;