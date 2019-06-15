const emailButton = (buttonText, buttonLink) => `
<table role="presentation" 
  border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
<tbody>
  <tr>
    <td align="left">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
        <tbody>
          <tr>
            <td> <a href="${buttonLink}" target="_blank">${buttonText}</a> </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table>
`;

export default emailButton;
