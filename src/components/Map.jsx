import React from "react";

const Map = () => {
  return (
    <section>
      <div className="container-fluid p-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!..." // replace with full map link
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Map;
