import mongoose, { MongooseError } from 'mongoose';

export const connect = async (): Promise<void> => {
   try {
      await mongoose.connect(process.env.DB_CONN_STRING as string);
      console.log('connected to database');
   } catch (err) {
      if (err instanceof MongooseError) {
         console.log(err.message);
      }
   }
};
