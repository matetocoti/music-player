import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense ,lazy} from "react";
import DefaultLayout from "../layouts/DefaultLayout";


const Home = lazy(() => import("../pages/Home"));
const Player = lazy(() => import("../pages/Player"));
const SaveSong = lazy(() => import("../pages/SaveSong"));

const classNameContent = "text-center text-2xl font-bold mt-10";

const NotFound = () => <h2 className={classNameContent}>404 - Not Found</h2>;
const Loading = () => <h2 className={classNameContent}>Loading...</h2>;


const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/player/:id" element={<Player />} />
            <Route path="/save-song" element={<SaveSong />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;