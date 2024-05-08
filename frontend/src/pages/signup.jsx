import React from "react";

const SignUp = () => {
  return (
    <div>
      <div className="w-[1440px] h-[1024px] relative bg-neutral-900">
        <div className="w-[82px] h-[65px] left-[1026px] top-[61px] absolute justify-center items-center inline-flex" />
        <div className="w-[450px] h-[60px] left-[842px] top-[310px] absolute rounded-md border border-white/opacity-60" />
        <div className="w-[450px] h-[60px] left-[842px] top-[202px] absolute rounded-md border border-white/opacity-60" />
        <div className="w-[450px] h-[60px] left-[840px] top-[525px] absolute rounded-md border border-white/opacity-60" />
        <div className="w-[450px] h-[60px] left-[840px] top-[417px] absolute rounded-md border border-white/opacity-60" />
        <div className="left-[842px] top-[272px] absolute text-white text-xl font-medium">
          Email
        </div>
        <div className="left-[842px] top-[164px] absolute text-white text-xl font-medium ">
          Username
        </div>
        <div className="left-[841px] top-[487px] absolute text-white text-xl font-medium">
          Confirm Password
        </div>
        <div className="left-[841px] top-[379px] absolute text-white text-xl font-medium">
          Password
        </div>
        <div className="w-[450px] h-[60px] left-[842px] top-[609px] absolute">
          <div className="w-[450px] h-[60px] left-0 top-0 absolute bg-sky-500 rounded-md" />
          <div className="w-[450px] h-[60px] left-0 top-0 absolute text-center text-white text-2xl font-medium">
            Sign up
          </div>
        </div>
        <div className="w-[450px] h-[60px] left-[848px] top-[801px] absolute">
          <div className="w-[450px] h-[60px] left-0 top-0 absolute rounded-md border border-white" />
          <div className="w-[412px] h-[60px] left-[38px] top-0 absolute text-center text-white text-2xl font-medium">
            Sign up with Google
          </div>
        </div>
        <div className="w-[566px] h-[394px] left-[74px] top-[314px] absolute" />
        <div className="w-[453px] left-[838px] top-[689px] absolute text-center">
          <span style="text-white text-2xl font-medium">
            Already have an account?{" "}
          </span>
          <span style="text-sky-400 text-2xl font-semibold">
            Login
          </span>
        </div>
        <div className="left-[1044px] top-[745px] absolute text-center text-white/opacity-60 text-2xl font-medium">
          OR
        </div>
        <div className="w-[140px] h-[0px] left-[1108px] top-[762px] absolute border-2 border-white/opacity-60"></div>
        <div className="w-[140px] h-[0px] left-[869px] top-[762px] absolute border-2 border-white/opacity-60"></div>
        <img
          className="w-[52px] h-[52px] left-[900px] top-[805px] absolute"
          src="https://via.placeholder.com/52x52"
        />
      </div>
    </div>
  );
};

export default SignUp;
