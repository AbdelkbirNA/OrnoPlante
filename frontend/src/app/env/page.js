// pages/env-info.jsx (ou .js)

export default function EnvInfo() {
  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>Informations sur l'environnement</h1>
      <p>
        <strong>Variable d'environnement NEXT_PUBLIC_API :</strong>
      </p>
      <pre
        style={{
          background: "#f0f0f0",
          padding: 10,
          borderRadius: 5,
          maxWidth: 600,
          wordWrap: "break-word",
        }}
      >
        {process.env.NEXT_PUBLIC_API || "Variable NEXT_PUBLIC_API non définie"}
      </pre>
      <p>
        Cette URL est utilisée pour les appels API dans l'application frontend.
      </p>
    </div>
  );
}
