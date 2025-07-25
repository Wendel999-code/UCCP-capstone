export function EmailTemplate(
  firstName: string,
  lastName: string,
  church: string,
  memberID: string
) {
  return (
    <div className="font-sans leading-relaxed text-neutral-800 max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-5">
        Welcome, {firstName} {lastName}!
      </h1>

      <p className="text-base mb-4">
        We are pleased to inform you that you are now officially a member of{" "}
        <strong>
          United Church of Christ in the Philippines {church} Local Church
        </strong>
        .
      </p>

      <p className="text-base mb-2">
        Your <strong>Member ID</strong> is:
      </p>

      <div className="text-lg font-bold bg-neutral-100 px-4 py-2 rounded-md inline-block select-all break-words">
        {memberID}
      </div>

      <p className="text-base mt-5">
        Please keep your Member ID safe for future reference and any
        church-related activities.
      </p>

      <p className="text-base mt-4">
        We look forward to growing together in faith and service.
      </p>

      <p className="text-base mt-8">
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
  return (
    <>
      <div className="font-serif text-neutral-900 max-w-md mx-auto p-6 leading-relaxed">
        <h1 className="font-bold text-xl mb-4">Certificate Ready for Pickup</h1>

        <p className="text-base mb-3">
          Dear{" "}
          <strong>
            {firstName} {lastName}
          </strong>
          ,
        </p>

        <p className="text-base mb-3">
          We are pleased to inform you that your{" "}
          <strong>requested baptismal certificate</strong> is now{" "}
          <strong className="text-green-600">ready for pickup</strong> at your
          United Church of Christ in the Philippines,{" "}
          <strong>{brgy} Local Church Office</strong>.
        </p>

        <p className="text-base mb-3">
          Please bring a valid ID when claiming your certificate for
          verification purposes.
        </p>

        <p className="text-base mb-3">
          If you have any questions or need further assistance, feel free to
          contact us.
        </p>

        <p className="text-base mb-3">
          Thank you, and may God bless you and your family abundantly.
        </p>

        <p className="text-base mt-6">
          Blessings,
          <br />
          <strong>UCCP {brgy} Local Church</strong>
        </p>
      </div>
    </>
  );
}

export function SendID(memberID: string) {
  return (
    <>
      <div className="font-serif text-neutral-900 max-w-md mx-auto p-6 leading-relaxed">
        <h3 className="font-bold text-xl mb-4"> Your Member ID :</h3>

        <h2 className="text-base mb-3">
          <br /> <strong>{memberID}</strong>
        </h2>

        <p className="text-base mb-3">
          If you have any questions or need further assistance, feel free to
          contact us.
        </p>

        <p className="text-base mb-3">
          Thank you, and may God bless you and your family abundantly.
        </p>

        <p className="text-base mt-6">
          Blessings,
          <br />
          <strong>United Church of Christ in the Philippines</strong>
        </p>
      </div>
    </>
  );
}
