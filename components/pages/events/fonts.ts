import { Inter, Poppins } from "next/font/google";

// Loaded once and shared by every events component.
export const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700", "800"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });
