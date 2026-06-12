import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ThankYou() {
  return (
    <>
      <Header />

      <main
        className="section"
        style={{
          maxWidth: "800px",
          margin: "80px auto",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h1>Thank You!</h1>

        <p
          style={{
            fontSize: "18px",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          Your information has been received successfully.
          A member of our team will contact you shortly.
        </p>

        <a href="/" className="btn">
          Return Home
        </a>
      </main>

      <Footer />
    </>
  );
}
