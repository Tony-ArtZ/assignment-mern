import PropTypes from "prop-types";

const Input = ({ name, type, label, error, Icon, onChange, disabled }) => {
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
          type={type}
          // onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent w-full outline-none"
        />
      </div>
      {error && <p className="text-red-500 text-sm pl-2">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  Icon: PropTypes.elementType.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
