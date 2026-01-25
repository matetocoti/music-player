import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense ,lazy} from "react";
// Lazy load the Home component
const Home = lazy(() => import("../pages/Home"));


const NotFound = () => <h2>404 - Not Found</h2>;
const Loading = () => <h2>Loading...</h2>;



const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Home />} ></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
