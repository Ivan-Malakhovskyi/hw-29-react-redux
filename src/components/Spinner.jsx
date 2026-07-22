import { Hourglass } from "react-loader-spinner";

export const Spinner = ({ width = 80, height = 80 }) => {
  return (
    <Hourglass
      visible={true}
      height={height}
      width={width}
      ariaLabel="hourglass-loading"
      wrapperStyle={{
        display: "flex",
        margin: "0 auto",
      }}
      wrapperClass=""
      colors={["#306cce", "#72a1ed"]}
    />
  );
};
