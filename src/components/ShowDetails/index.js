import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import SanitizedHTML from "react-sanitized-html";

import { getCurrentShow } from "../../store/actions/shows";
import Layout from "../Layout";
import "./show-details.scss";

export function ShowDetails({ getShow, show }) {
  const { id } = useParams();
  const { image, name, summary, type, genres } = show || {};

  useEffect(() => {
    getShow(id);
  }, [id, getShow]);

  return (
    <Layout>
      <div className="show__details">
        {show && (
          <>
            <div className="show__image">
              <img src={image?.original} alt="show" />
            </div>

            <h1 className="show__title">{name}</h1>

            <SanitizedHTML
              className="show__description"
              allowedAttributes={{ a: ["href"] }}
              allowedTags={["a", "p", "em", "i", "strong", "span"]}
              html={summary}
            />

            <span className="show__type">
              <strong>Type:</strong> {type}
            </span>

            <span className="show__genres">
              <strong>Genres:</strong>
              {genres && genres.join(", ")}
            </span>
          </>
        )}
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    show: state.currentShow,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShow: (id) => dispatch(getCurrentShow(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDetails);
