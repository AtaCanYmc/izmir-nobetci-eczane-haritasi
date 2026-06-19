import PharmacyPage from "./pages/pharmacy/pharmacyPage.tsx";
import {HelmetProvider} from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

import { InstallPWAPrompt } from "./components/InstallPWAPrompt.tsx";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <HelmetProvider>
                    <PharmacyPage/>
                    <InstallPWAPrompt />
                </HelmetProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
