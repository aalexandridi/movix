import AppContent from "@/components/layout/AppContent";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <AppContent>{children}</AppContent>
      <Footer />
    </>
  );
}
