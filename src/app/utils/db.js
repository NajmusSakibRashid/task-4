import sql from 'mssql';

const config = {
    user: process.env.NEXT_PUBLIC_USER,
    password: process.env.NEXT_PUBLIC_PASSWORD,
    server: process.env.NEXT_PUBLIC_SERVER,
    database: process.env.NEXT_PUBLIC_DATABASE,
    port: parseInt(process.env.NEXT_PUBLIC_PORT),
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

let pool=null;

export async function getConnection() {
    if (pool) {
        return pool;
    }
    try {
        pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.log(error);
        return null;
    }
}