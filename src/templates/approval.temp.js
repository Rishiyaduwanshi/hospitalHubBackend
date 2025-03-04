
const approvalEmailTemplate = (name, loginUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #28a745;">Congratulations, ${name}! 🎉</h2>
    <p>Your admin account has been approved.</p>
    <p>You can now log in to your account using the link below:</p>
    <a href="${loginUrl}" style="display: inline-block; background: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Login Now</a>
    <p>If you have any issues, please contact support.</p>
    <p>Best Regards,</p>
    <p><strong>HospitalHub Team</strong></p>
  </div>
`;

export default approvalEmailTemplate;


