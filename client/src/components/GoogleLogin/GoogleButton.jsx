import googleLogo from '../../assets/google-logo.png';
import { getGoogleOAuthURL } from '../../util/googleOAuth';

const GoogleLogin = ({ text }) => {
  return (
    <>
      <div className='pt-8'>
        <button className='bg-blue-500 text-center text-lg border-2 border-blue-500'>
          <a href={getGoogleOAuthURL()}>
            <div className='flex items-center'>
              <div className='border-r-2 border-blue-500 p-2 bg-white'>
                <img className='h-8 w-8' src={googleLogo} alt='google logo' />
              </div>

              <div className='p-2 text-white'>
                <h1 className='h-full w-auto'>{text}</h1>
              </div>
            </div>
          </a>
        </button>
      </div>
    </>
  );
};

export default GoogleLogin;
