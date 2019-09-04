import emailStyles from './emailStyles';
import emailButton from './emailButton';
import emailFooter from './emailFooter';

const emailTemplate = (
  title,
  preheadertext,
  user,
  emailContent,
  buttontext,
  buttonLink,
) => `
<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${title}</title>
    ${emailStyles()}
  </head>
  <body class="">
    <span class="preheader">${preheadertext}</span>
    <table role="presentation"
      border="0" cellpadding="0" cellspacing="0" class="body">
      <tr>
        <td>&nbsp;</td>
        <td class="container">
          <div class="content">

            <!-- START CENTERED WHITE CONTAINER -->
            <table role="presentation" class="main">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper">
                  <table role="presentation"
                    border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p>Hello ${user || 'Awesome'}!</p>
                        <p>${emailContent || ''}</p>
                        ${
                          buttontext !== undefined
                            ? emailButton(buttontext, buttonLink)
                            : ''
                        }
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table>
            <!-- END CENTERED WHITE CONTAINER -->

            <!-- START FOOTER -->
              ${emailFooter()}
            <!-- END FOOTER -->

          </div>
        </td>
        <td>&nbsp;</td>
      </tr>
    </table>
  </body>
</html>
`;

export default emailTemplate;
