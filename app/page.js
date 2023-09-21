'use client';
import React from "react";
import TableEvents from "./components/TableEvents";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2x1 font-semibold mb-4">Sistema De Eventualidades</h1>
      <TableEvents />
    </div>
  )
}

export default Home