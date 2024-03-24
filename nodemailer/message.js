export const message = (email, verificationToken) => {
  return {
    from: process.env.OWNER_MAIL,
    to: email,
    subject: "Hello ✔",
    text: `to verify your account go for this link ${process.env.SERVER_LINK}/api/users/verify/${verificationToken}`,
    html: `<b>to verify your account go for this  <a href="${process.env.SERVER_LINK}/api/users/verify/${verificationToken}">link</a></b>`,
  };
};
