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
            eventoList: [...alumno.eventoList, eventoInput],
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
    <div className="m-5 ml-48">
      <h2 className="text-xl font-semibold mb-4">
        Registros de Eventualidades
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 border mx-3 text-gray-900"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          className="p-2 border mx-3 text-gray-900"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Curso"
          className="p-2 border mx-3 text-gray-900"
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
      <table className="table-auto w-4/5">
        <thead>
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Apellidos</th>
            <th className="border px-4 py-2">Curso</th>
            <th className="border px-4 py-2">Eventualidades</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno, index) => (
            <tr key={index} className="border">
              <td className="border px-4 py-2">{alumno.name}</td>
              <td className="border px-4 py-2">{alumno.apellido}</td>
              <td className="border px-4 py-2">{alumno.curso}</td>
              <td className="border px-4 py-2">{alumno.events}</td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteAlumno(index)}
                >
                  Eliminar
                </button>
                <button
                  className="ml-2 text-blue-600 hover:underline"
                  onClick={() => handleOpenModal(alumno)}
                >
                  Agregar Eventualidad
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
            <div>
              {/* evento que mapea la lista de eventos */}
              {selectedAlumno.eventoList.map((evento, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 mb-2 text-black"
                >
                  <span>{evento}</span>
                </div>
              ))}
            </div>
            <textarea
              type="text"
              placeholder="Evento"
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
