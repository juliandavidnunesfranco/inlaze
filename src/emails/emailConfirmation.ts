interface Props {
    username?: string;
    email?: string;
    token?: string;
}

export const emailConfirmation = ({ username, email, token }: Props) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Confirmación de creación de cuenta</title>
        </head>
        <body style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <h1 style="color: #0070c0;">¡Welcome to inLaze!!</h1>
          <p>Estimado/a, ${username}</p>
          <p>Le escribimos para confirmar que su cuenta ha sido creada con éxito. Ahora puede acceder a nuestro sistema.</p>
          <p>A continuación se muestra un enlace para confirmar su correo electrónico y poder acceder.</p>
          <ul>
            <li><strong>Enlace:</strong><a href="http://localhost:3000/confirmation?email=${email}&token=${token}" target="_blank">Confirmar correo electrónico</a></li>
          </ul>
          <p>Por favor, mantenga esta información en un lugar seguro y no la comparta con nadie.</p>
          <p>Si tiene alguna pregunta o necesita ayuda para comenzar, no dude en ponerse en contacto con nuestro equipo de soporte </p>
          <p>¡Gracias por unirse a nuestra canal!</p>
          <p>Saludos cordiales,</p>
          <p>El equipo de inLaze.</p>
        </body>
      </html>
    `;
};
