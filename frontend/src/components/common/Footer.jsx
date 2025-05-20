import React from "react";
import { FooterLink2 } from "../../../data/footer-links";
import { ImGithub, ImLinkedin2 } from "react-icons/im";

// footer data
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="bg-[#2E3D40] mx-7 rounded-3xl mb-10">
      <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-[#CBD5D6] leading-6 mx-auto relative py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-[#3C4F52]">

          {/* Section 1 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-[#3C4F52] pl-3 lg:pr-5 gap-3">
            <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
              <div className="flex flex-col items-center justify-between gap-3">
                <span className="text-2xl font-extrabold tracking-wide text-[#F1F1F1]">NerdForge</span>
              </div>
              <h1 className="text-[#F1F1F1] font-bold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2">
                {['About', 'Careers', 'Affiliates'].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="text-[14px] text-[#CBD5D6]"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>
              {/* social icons */}
              <div className="flex gap-3 text-lg">
                <ImGithub className="text-[#A1E3D8]" />
                <ImLinkedin2 className="text-[#A1E3D8]" />
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-[#F1F1F1] font-bold text-[16px]">Resources</h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] text-[#CBD5D6]"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>

              <h1 className="text-[#F1F1F1] font-bold text-[16px] mt-7">
                Support
              </h1>
              <div className="text-[14px] text-[#CBD5D6] mt-2">
                Help Center
              </div>
            </div>

            <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
              <h1 className="text-[#F1F1F1] font-bold text-[16px]">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] text-[#CBD5D6]"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>
              <h1 className="text-[#F1F1F1] font-bold text-[16px] mt-7">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="text-[14px] text-[#CBD5D6]"
                    >
                      {ele}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[35%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-[#F1F1F1] font-bold text-[16px]">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] text-[#CBD5D6]"
                        >
                          {link.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* bottom footer */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-[#CBD5D6] mx-auto pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex">
            {BottomFooter.map((ele, ind) => {
              return (
                <div
                  key={ind}
                  className={`${
                    BottomFooter.length - 1 === ind ? "" : "border-r border-[#3C4F52] "
                  } px-3 text-[#CBD5D6]`}
                >
                  {ele}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;