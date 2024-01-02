import { useState, useEffect } from "react";
import "./Tareas_module.css";

const Tareas = () => {
  const [contenido, setContenido] = useState("");
  const [tareas, setTareas] = useState([]);
  const [checks, setChecks] = useState([]);

 
  
  useEffect(() => {
    const storedTareas = localStorage.getItem("tareas");
    const storedChecks = localStorage.getItem("checks");

    if (storedTareas && storedChecks) {
      setTareas(JSON.parse(storedTareas));
      setChecks(JSON.parse(storedChecks));
    }
  }, []);

  // Actualizar el almacenamiento local cuando tareas o checks cambian
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    localStorage.setItem("checks", JSON.stringify(checks));
  }, [tareas, checks]);
  

  const Agregar = () => {
    setTareas([...tareas, contenido]);
    setChecks([...checks, false]);  
    setContenido("");
  };

  const Borrar = (indice) => {
    const nuevasTareas = tareas.filter((_, i) => i !== indice);
    const nuevosChecks = checks.filter((_, i) => i !== indice);
    setTareas(nuevasTareas);
    setChecks(nuevosChecks);
  };

  const CambiarCheck = (indice) => {
    const nuevosChecks = [...checks];
    nuevosChecks[indice] = !nuevosChecks[indice];
    setChecks(nuevosChecks);
  };

  return (
    <>
      <input
        className="i1"
        type="text"
        onChange={(e) => setContenido(e.target.value)}
        value={contenido}
        placeholder="Ingresa tu tarea"
      />
      <button className="btn" onClick={Agregar}>
        Agregar
      </button>
      {tareas.map((valor, indice) => (
        <div className="div1" key={indice}>
          <p className={`p1 ${checks[indice] ? "tachado" : ""}`}>{valor}</p>
          <input
            type="checkbox"
            checked={checks[indice]}
            onChange={() => CambiarCheck(indice)}
          />
          <button onClick={() => Borrar(indice)} className="btn black">
            Borrar
          </button>
        </div>
      ))}
    </>
  );
};

export default Tareas;
