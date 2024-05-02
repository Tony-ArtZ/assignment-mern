import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loader = ({ height, width }) => {
  return (
    <Oval
      visible={true}
      height={height}
      secondaryColor="#7b337d"
      strokeWidth={4}
      color="#210535"
      width={width}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass="flex justify-center items-center"
    />
  );
};
Loader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Loader;
