import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "controleLTD@gmail.com",
    subject: "Thanks for joining Controle!",
    text: `Hello ${name},
        
        Welcome to Controle!
        
        We hope you will find your next role as soon as possible,
        
        Controle`,
  });
};

export const sendJobIsRemovedEmail = (email, name, title, company) => {
  sgMail.send({
    to: email,
    from: "controleLTD@gmail.com",
    subject: "Thanks for joining Controle!",
    text: `Hello ${name},
        
        Unfortunately, The role: ${title} at ${company} is no longer exist
        
        We hope you will find your next role as soon as possible,
        
        Controle`,
  });
};
