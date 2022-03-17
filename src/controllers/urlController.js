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

export async function getUrl(req,res){
   const { shortUrl } = req.params;
   try {
      const result = await connection.query(`
            SELECT * FROM urls
            WHERE "shortUrl" = $1`,
            [shortUrl]
            );
  
      if (result.rowCount === 0) {
        return res.sendStatus(404);
      }
      res.status(200).send(result.rows[0]);
    } catch (error) {
      res.sendStatus(500);
    }
}