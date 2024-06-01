import React from "react";
import { router } from "./router";
import { RouterProvider, createHashRouter } from "react-router-dom";

type Props = {};

const Routers = createHashRouter(router)

function App ({}: Props){
  return <RouterProvider router={Routers} />;
};


export default App;
