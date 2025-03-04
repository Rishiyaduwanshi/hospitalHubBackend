const adminApprovalEmailTemplate = (adminName, adminEmail, approveUrl) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
    <h2 style="color: #ff9800;">Admin Approval Request</h2>
    <p><strong>New Admin Signup Request:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${adminName}</li>
      <li><strong>Email:</strong> ${adminEmail}</li>
    </ul>
    <p>Click the button below to approve this admin:</p>
    <a href="${approveUrl}" style="display: inline-block; background: #28a745; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Approve ${adminName}</a>
    <p>If you did not request this, please ignore this email.</p>
    <p>Best Regards,</p>
    <p><strong>HospitalHub System</strong></p>
  </div>
`;

export default adminApprovalEmailTemplate;
