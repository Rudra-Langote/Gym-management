import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "RR Fitness",
  description: "Unlock your full potential with our state-of-the-art gym, designed to help you achieve strength, endurance, and peak performance. Whether you're a beginner or an athlete, we offer personalized training, top-notch equipment, and a supportive community to guide you on your fitness journey. Join us today and take the first step towards a healthier, stronger you!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}