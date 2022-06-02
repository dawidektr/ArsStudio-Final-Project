import { lazy, Suspense } from "react";
import {Routes,Route} from "react-router-dom";  
const LoginPage = lazy(()=>import("../Pages/LoginPage")) ;
const RegisterPage = lazy(()=>import("../Pages/RegisterPage")) ;
const PrivateRoute = lazy(()=>import("../Components/PrivateRoute"))
const AdminPage = lazy(()=>import("../Pages/AdminPage"))
const AddPage = lazy(()=>import("../Pages/AddPage"))
const EditPage = lazy(()=>import("../Pages/EditPage"))

const Page = () => {
  return (
    <Suspense fallback={<div>Wczytywanie...</div>}>
        <Routes>
          <Route path='/' element={<PrivateRoute userRole={['admin','user']}/>}  >
            <Route path="/" exact  element={<AdminPage />}/>
            <Route path="/add"   element={<AddPage />}/>
            
            </Route>
          
            <Route path='/edit' element={<PrivateRoute userRole={['admin']}/>}  >
            <Route path="/edit/:id"   element={<EditPage />}/>
            </Route>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes> 

        </Suspense>
  );
};

export default Page;
