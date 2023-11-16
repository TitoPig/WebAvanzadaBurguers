/*import { BotonesCarrito } from "./botonesInfo";*/
import React, {useContext, useEffect} from "react";
import { Context } from "./listaproductos";
import { FaShoppingCart, FaArrowLeft, FaCheck, FaTrashAlt } from "react-icons/fa";

export function Carrito() {

    const [carrito, setearCarrito, setearVisual] = useContext(Context);

    const abrirCarritoVisual = ()=> {
        let claseCarritoVisual = document.querySelector(".carritoVisual");
        if (claseCarritoVisual) claseCarritoVisual.classList.remove("noshow");
        let claseCarrito = document.querySelector(".carrito");
        if (claseCarrito) claseCarrito.classList.add("noshow");
        let claseInfo = document.querySelector(".info");
        claseInfo.classList.add("noshow");
        let claseProd = document.querySelectorAll(".prod");
        if (claseProd) {claseProd.forEach((cP)=>{
            cP.classList.add("noshow");
        })};
        let btnAgregar = document.querySelector(".btnAgregarInfo");
        btnAgregar.classList.add("noshow");
        let contenedorBtnVolverInfo = document.querySelector(".contenedorBtnVolverInfo");
        contenedorBtnVolverInfo.classList.add("noshow"); 
        let btnVolverCarrito = document.querySelector(".btnVolverCarrito");
        btnVolverCarrito.classList.remove("noshow");
        let btnCarrito = document.querySelector(".btnCarrito");
        btnCarrito.classList.remove("noshow");
    }
    
    const sacarTotal = ()=> {
        let total = 0;
        if (carrito.length > 0){
            carrito.forEach((cP)=>{
                total += (cP.producto.precio * cP.cantidad);
            });
        }
        return total
    }

    const cantidadCarrito = ()=> {
        let cantidadCarrito = 0;
        carrito.map((cP)=> {
            cantidadCarrito += cP.cantidad;
        });
        return cantidadCarrito
    }

    const borrarProducto = (prod)=> {
        let nuevoArray = [];
        carrito.map((cP)=> {
            if (cP.producto === prod) {
                let nuevaCantidad = cP.cantidad - 1;
                if (nuevaCantidad != 0) {nuevoArray.push({producto: prod, cantidad: nuevaCantidad})}
            }
            else {nuevoArray.push(cP)};
        });
        setearCarrito(nuevoArray);

        if (nuevoArray.length == 0) {
            setearVisual("");
        };

        if (nuevoArray.length === 0){
            btnVolverCarrito();
            let claseCarrito = document.querySelector(".carrito");
            if (claseCarrito) claseCarrito.classList.add("noshow");
        } 
    }
    
    useEffect(()=>{
    }, [carrito]);

    const btnVolverCarrito = ()=> {
        let claseCarritoVisual = document.querySelector(".carritoVisual");
        if (claseCarritoVisual) claseCarritoVisual.classList.add("noshow");
        let claseCarrito = document.querySelector(".carrito");
        if (claseCarrito) claseCarrito.classList.remove("noshow");
        let btnVolverCarrito = document.querySelector(".btnVolverCarrito");
        btnVolverCarrito.classList.add("noshow");
        let btnCarrito = document.querySelector(".btnCarrito");
        btnCarrito.classList.add("noshow");
        let claseCate = document.querySelector(".categorias");
        claseCate.classList.remove("noshow");

        setearVisual("");
    }

    const btnConfirmarCarrito = (carrito)=> {
        let texto = "Pedido:%0D%0A";
        carrito.forEach((pC)=>{
            texto += "Producto:%20" + pC.producto.nombre + "%20Descripcion:%20" + pC.producto.descripcion + "%20Precio:%20$" + pC.producto.precio + "%0D%0A";
        });
        texto += "Total:%20" + sacarTotal() + "";
        return "https://api.whatsapp.com/send?phone=5493517559057&text=" + texto
    }

    return(
        <>
            <div className="carrito noshow" onClick={()=> abrirCarritoVisual()}>
                <div><FaShoppingCart/><sup className="cantidad">{cantidadCarrito()}</sup></div>
            </div>
            <div className="btn btnVolverCarrito noshow" onClick={()=> btnVolverCarrito()}>
                <FaArrowLeft/>
            </div>
            <div className="carritoVisual noshow">
                <h2 className="tituloCarrito">PEDIDO</h2>
                <ul className="listaGrande">
                    {carrito.map((cP)=>{
                        return(
                            <>
                                <li className="lineaCarrito productoCarrito" id={cP.producto.id}>
                                    <ul className="listaLinea">
                                        <li className="primerRow"><p>{cP.producto.nombre}</p></li>
                                        <li className="segundaRow"><p>{cP.producto.descripcion}</p></li>
                                        <li><p>x{cP.cantidad}</p></li>
                                        <li><p>c/u${cP.producto.precio}</p></li>
                                        <li><p>${cP.cantidad * cP.producto.precio}</p></li>
                                        <li className="quitarRow">
                                            <a className="quitar" id={"q" + cP.producto.id} onClick={()=> borrarProducto(cP.producto)}>
                                                <FaTrashAlt/>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        )
                    })}
                </ul>
                <div className="lineaFinal">
                    <b className="total">TOTAL</b>
                    <b>${sacarTotal()}</b>
                </div>
            </div>
            <div className="btn btnCarrito noshow" onClick={()=> btnConfirmarCarrito(carrito)}>
                <FaCheck/>
            </div>
        </>
    )
}