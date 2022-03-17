import { connection } from '../database.js';

export async function createUrl(req, res) {
   function randomKey(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     return result;
   }
   const {link} = req.body
   const shortUrl = randomKey(8)


   try{

      await connection.query(`
      INSERT INTO 
         urls("shortUrl", "url")
      VALUES ($1, $2)
      `, [shortUrl, link])
      res.send(shortUrl).status(201)
   

   } catch(error) {
      console.log(error);
      return res.sendStatus(500);
   }

}

