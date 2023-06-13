import {Spinner} from "react-bootstrap";
import React from "react";

export const LoadingPage = () => (
    <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
);