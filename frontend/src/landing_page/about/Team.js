import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center">People</h1>
      </div>

      <div
        className="row p-3 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-3 text-center">
          <img
            src="media/RutujaBhavar.png.jpeg"
            alt="Rutuja Bhavar"
            style={{ borderRadius: "100%", width: "50%" }}
          />
          <h4 className="mt-5">RUTUJA BHAVAR</h4>
          <h6>Founder</h6>
        </div>

        <div className="col-6 p-3">
          <p>
            Rutuja bootstrapped and founded Zerodha-Stock Trading Platform in
            2026 to overcome the hurdles faced during the journey of building a
            modern stock trading platform.
          </p>

          <p>
            Passionate about web development, MERN Stack, and building
            user-friendly applications.
          </p>

          <p>Playing basketball is her zen.</p>

          <p>
            Connect on{" "}
            <a href="https://www.linkedin.com/in/rutujabhavar06/">
              LinkedIn
            </a>{" "}
            /{" "}
            <a href="https://github.com/rutujabhavar">
              GitHub
            </a>{" "}
            /{" "}
            <a href="mailto:rutujabhavar95@gmail.com">
              Gmail
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
