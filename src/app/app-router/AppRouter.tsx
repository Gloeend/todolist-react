import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {lazyImportPage} from "@shared/lib";

const Home = lazyImportPage("home");

export const AppRouter = () => {
  return <Routes>
      <Route path="" element={
        <Suspense fallback={<span>loading...</span>}>
          <Home/>
        </Suspense>
      } index/>
    </Routes>
}