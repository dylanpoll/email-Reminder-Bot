export function htmlEmailBody( TimeLeft : string, Name: string | undefined, Class: string | undefined ){
	let emailBodyTemplate: string = `
		<!DOCTYPE html>
		<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width,initial-scale=1">
			<meta name="x-apple-disable-message-reformatting">
			<title></title>
			<!--[if mso]>
			<noscript>
				<xml>
					<o:OfficeDocumentSettings>
						<o:PixelsPerInch>96</o:PixelsPerInch>
					</o:OfficeDocumentSettings>
				</xml>
			</noscript>
			<![endif]-->
			<style>
				table, td, div, h1, p {font-family: Arial, sans-serif;}
			</style>
		</head>
		<body style="margin:0;padding:0;">
				<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
					<tr>
						<td align="center" style="padding:0;">
							<table role="presentation" style="width:1280px; height:720px; border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;background-image: url('https://static.bandainamcoent.eu/high/elden-ring/elden-ring/00-page-setup/elden-ring-new-header-mobile.jpg');  background-repeat: no-repeat;">
								<tr>
									<td style="padding:36px 30px 42px 30px;">
										<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
											<tr>
												<td style="padding:0 0 36px 0;color:#153643;">
													<h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
													` + Name + `.... You..You.. The ` + Class + `..... There.... Are.... ` + TimeLeft + ` ... Days ... remaining ........ The countdown continues.....
													</h1>								
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</div>
		</body>
		</html>
		`;
	return(emailBodyTemplate);
}