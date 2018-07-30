//create and expost configuration variables

//container for all enviroments

const enviroments = {}

enviroments.staging = {
 'httpPort':3000,
 'httpsPort':3001,
 'envName':'staging'
}

enviroments.production = {
 'httpPort':5000,
 'httpsPort':5001,
 'envName':'production'
} 

//determiner shick enviroment was passed as a command line argument

const currentEnviroment=typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : ''

//check that the current enviroment is one of env above if not default to staging

const enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging

module.exports = enviromentToExport
