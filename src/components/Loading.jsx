import Lottie from "lottie-react";
import animation from "../animation/9844-loading-40-paperplane.json";

const Loading = () => {
  return (
    <>
      <div className="flex min-h-[100vh] items-center justify-center">
        <Lottie animationData={animation} loop={true} autoplay={true} />
      </div>
    </>
  );
};

export default Loading;
