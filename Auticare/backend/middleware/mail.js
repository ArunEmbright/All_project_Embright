require("dotenv/config");
const mail ={
    variable : (req, res, next) => {
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
          );
    
          oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN,
          });

    }
}
module.exports = mail