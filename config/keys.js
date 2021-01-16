module.exports = {
    mongodb: {
        dev: {
            host: process.env.mongo_host,
            port: process.env.mongo_port,
            database: process.env.mongo_,
            username: process.env.mongo_,
            password: process.env.mongo_,
            host_1: process.env.mongo_,
            port_1: process.env.mongo_,
            host_2: process.env.mongo_,
            port_2: process.env.mongo_,
            replicaSet: process.env.mongo_
        },
    },
    mailgun: {
        apiKey: process.env.mailgun_key,
        domain: process.env.mailgun_domain
    }
};