"use client";
import React, { useState } from "react";

export default function TableEvents() {
  const [alumnos, setAlumnos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [curso, setCurso] = useState("");
  const [selectedAlumno, setSelectedAlumno] = useState(null);
  const [eventoInput, setEventoInput] = useState("");
  const [eventosCount, setEventosCount] = useState({});
  const [eventoList, setEventoList] = useState([]);

  const handleAddAlumno = () => {
    if (nombre.trim() && apellido.trim() && curso.trim()) {
      const newAlumno = {
        name: nombre,
        apellido: apellido,
        curso: curso,
        events: 0,
        eventoList: [],
      };
      setAlumnos([...alumnos, newAlumno]);
      setEventosCount((prevCount) => ({ ...prevCount, [nombre]: 0 }));
      setNombre("");
      setApellido("");
      setCurso("");
    }
  };

  //metodo para agregar eventualidades
  const addEvent = () => {
    const now = new Date();
    const date = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    //metodo para agregar eventualidades si se escribe algo e impedir guardado vacio
    if (eventoInput.trim() !== "" && selectedAlumno) {
      const updatedAlumnos = alumnos.map((alumno) => {
        if (
          alumno.name === selectedAlumno.name &&
          alumno.apellido === selectedAlumno.apellido &&
          alumno.curso === selectedAlumno.curso
        ) {
          return {
            ...alumno,
            events: alumno.events + 1,
            eventoList: [
              ...alumno.eventoList,
              { evento: eventoInput, fecha: date },
            ],
          };
        }
        return alumno;
      });
      setAlumnos(updatedAlumnos);
      setEventoInput("");
      handleCloseModal();
    }
  };

  const handleDeleteAlumno = (index) => {
    const alumnoName = alumnos[index].name;
    const updatedAlumnos = alumnos.filter((_, i) => i !== index);
    setAlumnos(updatedAlumnos);
  };

  const handleOpenModal = (alumnos) => {
    setSelectedAlumno(alumnos);
    setEventoInput("");
  };

  const handleCloseModal = () => {
    setSelectedAlumno(null);
    setEventoInput("");
  };

  return (
    <div className="m-1 ml-40">
      <h2 className="text-xl font-semibold mb-4">
        Registros de Eventualidades
      </h2>
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 rounded mx-3 text-gray-900"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="p-2 rounded mx-3 text-gray-900"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Curso"
          className="p-2 rounded  mx-3 text-gray-900"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddAlumno}
        >
          Agregar Alumno
        </button>
      </div>
      <table className="border-separate rounded border border-slate-500 w-4/5">
        <thead>
          <tr>
            <th className="border rounded border-slate-300 py-2 ...">Nombre</th>
            <th className="border rounded border-slate-300 ...">Apellidos</th>
            <th className="border rounded border-slate-300 ...">Curso</th>
            <th className="border rounded border-slate-300 ...">Eventualidades</th>
            <th className="border rounded border-slate-300 ...">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno, index) => (
            <tr key={index} className="border">
              <td className="border rounded border-slate-700 px-4 py-2 text-center">{alumno.name}</td>
              <td className="border rounded border-slate-700 px-4 py-2 text-center ... ">{alumno.apellido}</td>
              <td className="border rounded border-slate-700 px-4 py-2 text-center ... ">{alumno.curso}</td>
              <td className="border rounded border-slate-700 px-4 py-2 text-center ...">{alumno.events}</td>
              <td className="border rounded border-slate-700 px-4 py-2 flex items-center justify-center">
                <button
                  className="bg-red-600 px-4 py-1 rounded hover:underline flex items-center mr-2"
                  onClick={() => handleDeleteAlumno(index)}
                >
                  Eliminar
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
                </button>
                <button
                  className="bg-green-600 rounded px-4 py-1 text-white hover:underline flex items-center ml-2"
                  onClick={() => handleOpenModal(alumno)} 
                >
                  Ver / Agregar Eventualidad
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/*Ventana Modal*/}
      {selectedAlumno && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded p-4 max-w-3xl w-full">
            <h3 className="text-xl font-semibold mb-4 text-black">
              Eventos de {selectedAlumno.name} {selectedAlumno.apellido}
            </h3>
            <div className="grid grid-flow-col flex-col gap-1 mb-4 overflow-y-auto h-80 text-black">
              {/* evento que mapea la lista de eventos */}
              <div className="flex flex-col  ...">
                {selectedAlumno.eventoList.map((evento, index) => (
                  <div key={index}>
                    <div className="border rounded px-4 py-2 mb-3">
                      <p className="text-left align-middle">{evento.evento}</p>
                      <p className="text-right align-middle font-sans italic">
                        Fecha: {evento.fecha}
                      </p>
                    </div>
                  </div>                          
              ))}
            </div>
            </div>
            <textarea
              type="text"
              placeholder="Ingresar evento"
              className="p-2 border rounded mr-2 w-full text-black"
              value={eventoInput}
              onChange={(e) => setEventoInput(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cerrar
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                onClick={() => addEvent(alumnos.indexOf(selectedAlumno))}
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
