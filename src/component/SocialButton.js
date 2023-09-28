import SocialLogin from "react-social-login";


function SocialButton(){

   // const { children, triggerLogin, ...props } = this.props;

    return (
      <button onClick={triggerLogin}>
        {children}
      </button>
    );
  
}

export default SocialButton;