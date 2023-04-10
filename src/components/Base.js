import CustomNavbar from "./CustomNavbar";

const Base = ({title="Welcome to our website",children}) => {
  return (
    <div>
    <CustomNavbar />
    <div className="container-fluid">
      {children}
      
  </div></div>
  )
}
export default Base;
