"use client";
import React from "react";
import TableEvents from "./components/TableEvents";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <h1 className="text-2x1 font-semibold mb-4 m-5">
        Sistema De Eventualidades
      </h1>
      <TableEvents />
    </div>
  );
};

export default Home;
