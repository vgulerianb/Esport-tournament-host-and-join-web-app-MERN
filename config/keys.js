module.exports = {
    mongodb: {
        dev: {
            host: process.env.mongo_host,
            port: process.env.mongo_port,
            database: process.env.mongo_database,
            username: process.env.mongo_username,
            password: process.env.mongo_password,
            host_1: process.env.mongo_host,
            port_1: process.env.mongo_port,
            host_2: process.env.mongo_host,
            port_2: process.env.mongo_port,
            replicaSet: process.env.mongo_replicaSet
        },
    },
    mailgun: {
        apiKey: process.env.mailgun_key,
        domain: process.env.mailgun_domain
    }
};