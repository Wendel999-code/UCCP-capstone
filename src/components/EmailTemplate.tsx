export function EmailTemplate(
  firstName: string,
  lastName: string,
  church: string,
  memberID: string
) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.7,
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Welcome, {firstName} {lastName}!
      </h1>

      <p style={{ fontSize: "16px" }}>
        We are pleased to inform you that you are now officially a member of{" "}
        <strong>UCCP {church} Local Church</strong>.
      </p>

      <p style={{ fontSize: "16px", margin: "20px 0 10px" }}>
        Your <strong>Member ID</strong> is:
      </p>

      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          background: "#f5f5f5",
          padding: "10px 15px",
          borderRadius: "6px",
          display: "inline-block",
          userSelect: "all",
          wordBreak: "break-all",
        }}
      >
        {memberID}
      </div>

      <p style={{ fontSize: "16px", marginTop: "20px" }}>
        Please keep your Member ID safe for future reference and any
        church-related activities.
      </p>

      <p style={{ fontSize: "16px" }}>
        We look forward to growing together in faith and service.
      </p>

      <p style={{ fontSize: "16px", marginTop: "30px" }}>
        Blessings,
        <br />
        <strong>UCCP {church} Local Church</strong>
      </p>
    </div>
  );
}
