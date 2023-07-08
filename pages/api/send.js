export default async function send(req, res) {
  const { email, message } = req.body

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: 'diegoandress717@gmail.com', 
            }
          ],
          subject: `Nuevo mensaje de - ${email}`
        }
      ],
      from: {
        email: 'diegoandress717@outlook.com',
      },
      content: [
        {
          type: 'text/plain',
          value: message
        }
      ]
    })
  });

  if (response.ok) {
    res.status(200).send('Message sent successfully.')
  } else {
    console.log(await response.text())
    res.status(400).send('Message not sent.')
  }
}