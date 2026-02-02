import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense ,lazy} from "react";
import DefaultLayout from "../layouts/DefaultLayout";

const YTPlayer = lazy(() => import("../components/YTPlayer"))

const Home = lazy(() => import("../pages/Home"));
const Player = lazy(() => import("../pages/Player"));


const videoId: string = "rAn-AWXtHv0"

const NotFound = () => <h2>404 - Not Found</h2>;
const Loading = () => <h2>Loading...</h2>;

const Test = () => (
  <YTPlayer videoId={videoId}/>
);




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/player/:id" element={<Player />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/test" element={<Test />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;