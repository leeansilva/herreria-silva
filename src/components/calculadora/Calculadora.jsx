import React, { useEffect, useState } from "react";
import { Button, Input } from "@chakra-ui/react";

export default function Calculadora() {
  const [resultado, setResultado] = useState(0);
  const [precioI, setPrecioI] = useState(0);
  const [metrosI, setMetrosI] = useState(0);
  const [materialI, setMaterialI] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  //Que se pueda guardar el presupuesto en un localStorage, que reciba nombre del presupuesto
  //Que se pueda guardar como pdf
  //Que diga la cantidad de barras, aunque sean algunas por la mitad y que diga que la cantidad de barras redondeado.
  //Porque ahora esta dividiendo y multiplicando por numeros decimales.


  const calcularPresupuesto = (precio, metros, material) => {
    if (precio !== undefined && metros !== undefined && material !== "") {
      if (metros <= 6) {
        setResultado("Con una barra alcanza.");
      } else {
        setResultado(`El total de ${material} es de $${(metros / 6) * precio}`);
      }
    }
  };

  useEffect(() => {
    calcularPresupuesto(precioI, metrosI, materialI);
  }, [precioI, metrosI, materialI]);

  const agregarAlCarrito = () => {
    if (resultado !== "" && resultado !== "Con una barra alcanza." && materialI !== "") {
      const nuevoMaterial = { nombre: materialI, metros: metrosI, precio: precioI };
      setCarrito([...carrito, nuevoMaterial]);
      setTotal(total + (metrosI / 6) * precioI);
      // Limpiar los campos después de agregar al carrito
      setMaterialI("");
      setMetrosI(0);
      setPrecioI(0);
      setResultado(0);
    }
  };

  const eliminarDelCarrito = (index) => {
    const materialEliminado = carrito[index];
    setTotal(total - (materialEliminado.metros / 6) * materialEliminado.precio);
    const nuevoCarrito = carrito.filter((item, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  return (
    <>
      <h1>Herreria</h1>
      <form>
        <p>Ingrese el material</p>
        <Input
          value={materialI}
          onChange={(e) => setMaterialI(e.target.value)}
          type="text"
        />
        <p>Ingrese metros</p>
        <Input
          value={metrosI}
          onChange={(e) => setMetrosI(e.target.value)}
          type="number"
        />
        <p>Ingrese precio por barra</p>
        <Input
          value={precioI}
          onChange={(e) => setPrecioI(e.target.value)}
          type="number"
        />
      </form>
      <h3>{resultado}</h3>
      <Button onClick={agregarAlCarrito}>Agregar material</Button>
      <h2>Carrito:</h2>
      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {item.nombre} - {item.metros} metros - ${item.precio * (item.metros / 6)}
            <Button onClick={() => eliminarDelCarrito(index)}>Eliminar</Button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
    </>
  );
}
