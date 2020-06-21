import React, { Fragment } from "react";
import PropTypes from "prop-types";
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

Breadcrumb.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};
