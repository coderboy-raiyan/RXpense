import images from "assets";
import { BsArrowRightCircleFill } from "react-icons/bs";

function Banner() {
    return (
        <section className="border-general relative -mt-6 w-full overflow-hidden overflow-x-clip border-b bg-slate-50 bg-gradient-to-t from-slate-50 to-slate-100 lg:h-screen">
            <div
                style={{ backgroundImage: `url(${images.bannerBg})` }}
                className="mx-4 flex flex-col items-center justify-between py-10 md:mx-auto lg:mx-auto lg:h-full lg:max-w-6xl lg:flex-row lg:py-0"
            >
                {/* left side */}
                <div className="w-full space-y-6 md:w-2/4 lg:w-2/4">
                    <h1 className="text-4xl font-semibold !leading-[60px] text-gray-800 lg:text-5xl">
                        The <span className="text-[#FF6584] underline">Expense Tracker</span> <br />{" "}
                        that works for you
                    </h1>
                    <p className="font-bold text-gray-800">Track all your expenses here...</p>
                    <button
                        className="flex items-center rounded border-2 border-indigo-600 bg-indigo-600 py-2 px-4 text-white transition hover:bg-indigo-100 hover:text-indigo-600"
                        type="button"
                    >
                        Get Stated <BsArrowRightCircleFill className="ml-2 text-xl" />
                    </button>
                </div>
                {/* Right side */}
                <div className="mb-4 w-full space-y-4 md:w-2/4 lg:mb-0 lg:w-2/4">
                    <img className="w-[620px] object-contain" src={images?.bannerVector} alt="" />
                </div>
            </div>
        </section>
    );
}

export default Banner;
