import PharmacyPage from "./pages/pharmacy/pharmacyPage.tsx";
import {HelmetProvider} from "react-helmet-async";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                <PharmacyPage/>
            </HelmetProvider>
        </QueryClientProvider>
    )
}

export default App
