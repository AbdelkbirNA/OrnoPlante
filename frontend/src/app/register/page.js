import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "Inscription - OrnoPlante",
  description: "Inscrivez-vous sur OrnoPlante pour accéder à toutes les fonctionnalités.",
};

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <RegisterClient />
    </div>
  );
}
