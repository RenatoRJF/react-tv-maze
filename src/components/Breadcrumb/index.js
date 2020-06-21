import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./breadcrumb.scss";

export default function Breadcrumb({ routes }) {
  return (
    <div className="breadcrumb">
      {Array.isArray(routes) &&
        routes.map(({ name, path }, i) => (
          <Fragment key={name}>
            {i !== 0 && ">"}

            <Link to={path} key={name}>
              {name}
            </Link>
          </Fragment>
        ))}
    </div>
  );
}
