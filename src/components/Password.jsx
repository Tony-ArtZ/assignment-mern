import React from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

const Password = ({ name, label, error, Icon, onChange, disabled }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const TogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {/* <label className="">{label}</label> */}
      <div className="flex items-center hover:shadow-glow gap-2 transition-all border-4 border-light mb-2 bg-mid-dark rounded-full w-full h-12 p-2 pl-4">
        <Icon className="text-light text-xl" />
        <input
          placeholder={label}
          name={name}
          onChange={onChange}
          disabled={disabled}
          id={name}
          type={showPassword ? "text" : "password"}
          // onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent w-full outline-none"
        />
        <button onClick={TogglePassword}>
          {showPassword ? (
            <FaEyeSlash className="text-light text-xl" />
          ) : (
            <FaEye className="text-light text-xl" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

Password.PropTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  Icon: PropTypes.elementType.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
export default Password;
