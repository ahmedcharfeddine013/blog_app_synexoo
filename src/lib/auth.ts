import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions : NextAuthOptions ={
    providers : [
        CredentialsProvider({
            name : 'Credentials',
            credentials : {
                email : {label : 'E-mail', type : 'text', placeholder : 'jleazh@gmail.com'},
                password : {label : 'Password' , type : 'text'}
            },
            async authorize (credentials, ,req) {
                const user 
            }
        })
    ]
}