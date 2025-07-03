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

export function UpdatesCertificate(
  firstName: string,
  lastName: string,
  brgy: string
) {
  const message = `
  <div
    style="
      font-family: Arial, sans-serif;
      line-height: 1.7;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    "
  >
    <h1 style="font-size: 22px; margin-bottom: 20px;">
      Certificate Ready for Pickup
    </h1>

    <p style="font-size: 16px;">
      Dear <strong>${firstName} ${lastName}</strong>,
    </p>

    <p style="font-size: 16px;">
      We are pleased to inform you that your <strong>requested baptismal certificate</strong> is now <strong style="color: #16a34a;">ready for pickup</strong> at your United Church of Christ in the Philippines, <strong>${brgy} Local Church Office</strong>.
    </p>

    <p style="font-size: 16px;">
      Please bring a valid ID when claiming your certificate for verification purposes.
    </p>

    <p style="font-size: 16px;">
      If you have any questions or need further assistance, feel free to contact us.
    </p>

    <p style="font-size: 16px;">
      Thank you, and may God bless you and your family abundantly.
    </p>

    <p style="font-size: 16px; margin-top: 30px;">
      In Christ,
      <br />
      <strong>United Church of Christ in the Philippines</strong>
    </p>
  </div>
  `;

  return message;
}
