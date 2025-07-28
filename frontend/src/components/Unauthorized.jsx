"use client";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Accès refusé</h1>
        <p className="text-gray-700 mb-2">Vous n'avez pas l'autorisation d'accéder à cette page.</p>
        <p className="text-sm text-gray-500">Veuillez vous connecter avec un compte administrateur.</p>
      </div>
    </div>
  );
}
