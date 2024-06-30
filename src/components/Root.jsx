import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import BottomNavigation from "./BottomNavigation";

function RootLayout() {
  return (
    <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
        <BottomNavigation />
    </>
    
  )
}

export default RootLayout