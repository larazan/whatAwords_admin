import React, { Component, useState } from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import route from "./route";

const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="leading-normal tracking-normal " id="main-body">
        <div className="flex flex-wrap">
          <Sidebar sidebarOpen={sidebarOpen} />

          <div
            className={`w-full bg-gray-100 pl-0 lg:pl-64 overflow-y min-h-screen ${sidebarOpen ? 'overlay' : ''}`}
            id="main-content"
          >
            <Navbar setSidebarOpen={setSidebarOpen} />

            <div className="min-h-screen p-6 bg-gray-100 mb-20 ">
              {props.children}
              <Switch>
                {getRoutes(route)}
                <Redirect from="*" to="/admin/index" />
              </Switch>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
