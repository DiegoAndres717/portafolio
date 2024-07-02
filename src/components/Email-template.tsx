import * as React from 'react';
import { Html, Container, Head, Body, Button,Img,Heading, Text, Hr, Section } from '@react-email/components';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<FormData>> = ({ name, email, message }) => {
 
  
  return (
    <>
    <Html lang="es">
      <Container style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Head>
          <Img src='https://app.cursofuturosresidentes.com/wp-content/uploads/2024/03/WALLPAPER_ALMUS_Mesa-de-trabajo-2.png' width="100%" />
          <title>Intranet</title>
        </Head>
       
       
        <Body style={{marginBottom:'10px', marginTop:'10px'}}>
          {/* bg-[#533A87] py-2 px-4 rounded-full  */}
          <Section>
            <Heading style={{fontSize:'12px', color:'black', margin:'0'}} as="h6">{`Asunto: ${'subject'}`},</Heading>
            
            {/* Enviar Hola a RH */ } 
            <Heading style={{fontSize:'12px', color:'black', margin:'0'}} as="h6">{`Hola,`}</Heading> 
            <Hr style={{backgroundColor: 'black'}} />
          </Section>
          <Section> 
            <Text style={{fontSize:'12px', color:'black', margin:'0'}} >{`${'firstName'} te informa que tu solicitud de  fue aceptada`}</Text>
            <Text style={{fontSize:'12px', color:'black'}}>{`Recuerda que puedes revisar el estado de tus solicitudes ingresando al siguiente enlace`}</Text>
            <Button style={{ color: "white", fontSize: '12px', borderRadius: '9999px', padding: '8px 20px', backgroundColor: '#533A87', textDecoration: 'none', display: 'inline-block' }}
             href={process.env.NEXTAUTH_URL}>Ingresar</Button>
          </Section>
          <Section>
            <Text style={{fontSize:'12px', color:'black'}} >{`Sentire Taller SAS `}</Text>
          </Section>
        </Body>
        
      </Container>
    </Html>
    </>
)};