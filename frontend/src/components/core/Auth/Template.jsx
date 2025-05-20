import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
import Img from './../../common/Img';

function Template({ title, description1, description2, image, formType }) {
  // const { loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl min-h-screen">
        {/* Left Side: Illustration */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 p-8 md:p-12">
          <Img
            src={image}
            alt={formType}
            className={'object-contain w-[90%] h-[350px] md:h-[420px]'}
          />
        </div>
        {/* Right Side: Form */}
        <div className="flex-1 flex items-center justify-center bg-white p-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">{title}</h1>
            <p className="text-base md:text-lg text-gray-500 mb-8">
              {description1} <span className="font-bold italic text-yellow-500">{description2}</span>
            </p>
            <div className="w-full">
              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Template