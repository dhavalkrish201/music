import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);

  const history = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history("/login");
    return () => clearInterval(interval);
  }, [count, history]);

  return (
    <div>
      <h6>Logout you in {count} seconds</h6>
    </div>
  );
};

export default LoadingToRedirect;
