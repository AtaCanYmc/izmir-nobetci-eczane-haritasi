import PharmacyPage from "./pages/pharmacy/pharmacyPage.tsx";
import {HelmetProvider} from "react-helmet-async";

function App() {
    return (
        <>
            <HelmetProvider>
                <PharmacyPage/>
            </HelmetProvider>
        </>
    )
}

export default App
