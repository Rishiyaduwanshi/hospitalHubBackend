const signupEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #007bff;">Welcome to HospitalHub, ${name}!</h2>
    <p>Thank you for signing up as an admin.</p>
    <p>Your request is under review. Once approved by the administrator, you will receive another email with login instructions.</p>
    <p><strong>Note:</strong> If you did not request this, please ignore this email.</p>
    <p>Best Regards,</p>
    <p><strong>HospitalHub Team</strong></p>
  </div>
`;

export default signupEmailTemplate;